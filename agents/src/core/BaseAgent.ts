import Anthropic from '@anthropic-ai/sdk';
import { randomUUID } from 'crypto';
import { AgentLogger } from './agent-logger';
import type {
  AgentConfig, AgentInput, AgentModel, AgentOutput, AgentTool,
  Guardrail, HumanInputMode, StepCallback,
} from './types';

// Re-export for consumers that import from BaseAgent
export { AGENT_MODELS } from './types';
export type {
  AgentConfig, AgentInput, AgentModel, AgentOutput, AgentRunLog,
  AgentTool, Guardrail, HumanInputMode, ReasoningStep, StepCallback, StepEvent,
} from './types';

// ─── BaseAgent ─────────────────────────────────────────────────────────────────

export abstract class BaseAgent<TInput extends AgentInput, TResult> {
  protected readonly agentId: string;
  protected readonly role: string;
  protected readonly goal: string;
  protected readonly model: AgentModel;
  protected readonly maxIterations: number;
  protected readonly maxExecutionTimeMs: number;
  protected readonly confidenceThreshold: number;
  protected readonly humanInputMode: HumanInputMode;
  protected readonly writeScope: Set<string>;
  protected readonly guardrails: Guardrail[];
  protected readonly onStep?: StepCallback;
  protected readonly triggeredBy: string;
  protected readonly client: Anthropic;
  protected readonly logger: AgentLogger;

  constructor(config: AgentConfig) {
    this.agentId = config.agentId;
    this.role = config.role;
    this.goal = config.goal;
    this.model = config.model;
    this.maxIterations = config.maxIterations ?? 10;
    this.maxExecutionTimeMs = config.maxExecutionTimeMs ?? 120_000;
    this.confidenceThreshold = config.confidenceThreshold ?? 0.75;
    this.humanInputMode = config.humanInputMode ?? 'ON_FINANCIAL_WRITE';
    this.writeScope = new Set(config.writeScope ?? []);
    this.guardrails = config.guardrails ?? [];
    this.onStep = config.onStep;
    this.triggeredBy = config.triggeredBy ?? 'system';
    this.client = new Anthropic();
    this.logger = new AgentLogger(this.agentId, this.role, this.model, this.triggeredBy);
  }

  // ─── Abstract interface — each agent implements these ──────────────────────

  abstract getSystemPrompt(): string;
  abstract getTools(): AgentTool[];
  abstract executeTool(name: string, input: Record<string, unknown>): Promise<unknown>;
  abstract parseOutput(messages: Anthropic.MessageParam[]): AgentOutput<TResult>;

  protected async requestHumanApproval(
    toolName: string,
    input: Record<string, unknown>
  ): Promise<boolean> {
    this.logger.logApprovalRequired(toolName, input);
    return false;
  }

  // ─── Main entry point ──────────────────────────────────────────────────────

  async execute(input: TInput): Promise<AgentOutput<TResult>> {
    const runId = randomUUID();
    const startTime = Date.now();
    let iteration = 0;
    const totalTokens = { input: 0, output: 0, cacheHit: 0 };

    const messages: Anthropic.MessageParam[] = [
      { role: 'user', content: input.task },
    ];

    for (const g of this.guardrails) {
      const { passed, reason } = await g.check(input);
      if (!passed) {
        return this.fail(`Guardrail "${g.name}" blocked: ${reason}`, 'guardrail', startTime, totalTokens);
      }
    }

    const apiTools: Anthropic.Tool[] = this.getTools().map(t => ({
      name: t.name,
      description: t.description,
      input_schema: t.inputSchema,
    }));

    let lastOutput: AgentOutput<TResult> | null = null;
    const heartbeat = this.logger.startHeartbeat(runId, () => iteration);
    this.logger.writeHeartbeat(runId, 0, 'active');

    const loopPromise = async (): Promise<AgentOutput<TResult>> => {
      while (iteration < this.maxIterations) {
        iteration++;
        this.logger.logProgress(runId, iteration, 'running');

        const response = await this.callWithRetry(() =>
          this.client.messages.create({
            model: this.model,
            max_tokens: 4_000,
            system: [{ type: 'text', text: this.getSystemPrompt(), cache_control: { type: 'ephemeral' } }],
            tools: apiTools,
            messages,
          })
        );

        totalTokens.input += response.usage.input_tokens;
        totalTokens.output += response.usage.output_tokens;
        const cacheTokens = 'cache_read_input_tokens' in response.usage
          ? (response.usage.cache_read_input_tokens as number)
          : 0;
        totalTokens.cacheHit += cacheTokens ?? 0;

        messages.push({ role: 'assistant', content: response.content });

        await this.onStep?.({
          agentId: this.agentId,
          runId,
          iteration,
          action: response.stop_reason ?? 'unknown',
          tokenUsage: response.usage,
          durationMs: Date.now() - startTime,
          timestamp: new Date().toISOString(),
        });

        if (response.stop_reason === 'end_turn') {
          lastOutput = this.parseOutput(messages);
          break;
        }

        if (response.stop_reason === 'tool_use') {
          const toolUseBlocks = response.content.filter(
            (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
          );
          const toolResults = await Promise.all(
            toolUseBlocks.map(block => this.handleSingleToolCall(block, runId))
          );
          messages.push({ role: 'user', content: toolResults });
        }
      }

      if (iteration >= this.maxIterations && !lastOutput) {
        this.logger.logProgress(runId, iteration, 'max_iterations_exceeded');
        return this.fail(`Max iterations (${this.maxIterations}) exceeded`, 'max_iterations', startTime, totalTokens);
      }

      if (lastOutput && lastOutput.confidence < this.confidenceThreshold) {
        lastOutput.requiresHumanApproval = true;
        lastOutput.approvalReason =
          `Confidence ${lastOutput.confidence.toFixed(2)} below threshold ${this.confidenceThreshold}`;
      }

      this.logger.logProgress(runId, iteration, 'completed');
      this.logger.logRun(runId, input, lastOutput!, startTime, totalTokens);
      clearInterval(heartbeat);
      this.logger.writeHeartbeat(runId, iteration, 'completed');
      return lastOutput!;
    };

    try {
      const timeoutPromise = new Promise<AgentOutput<TResult>>(resolve =>
        setTimeout(() => {
          clearInterval(heartbeat);
          this.logger.writeHeartbeat(runId, iteration, 'failed');
          resolve(this.fail('Execution timeout', 'timeout', startTime, totalTokens));
        }, this.maxExecutionTimeMs)
      );
      return await Promise.race([loopPromise(), timeoutPromise]);
    } catch (err) {
      clearInterval(heartbeat);
      this.logger.writeHeartbeat(runId, iteration, 'failed');
      this.logger.logProgress(runId, iteration, 'failed');
      const output = this.fail(
        err instanceof Error ? err.message : 'Unknown error',
        'error', startTime, totalTokens
      );
      this.logger.logRun(runId, input, output, startTime, totalTokens);
      return output;
    }
  }

  // ─── Single tool call handler ──────────────────────────────────────────────

  private async handleSingleToolCall(
    block: Anthropic.ToolUseBlock,
    runId: string
  ): Promise<Anthropic.ToolResultBlockParam> {
    const tool = this.getTools().find(t => t.name === block.name);

    if (tool?.isWrite && !this.writeScope.has(block.name)) {
      this.logger.logWriteScopeViolation(block.name, runId);
      return { type: 'tool_result', tool_use_id: block.id, is_error: true, content: `Write tool "${block.name}" not in approved write scope` };
    }

    if (tool?.isWrite && this.needsApproval(tool)) {
      const approved = await this.requestHumanApproval(block.name, block.input as Record<string, unknown>);
      if (!approved) {
        return { type: 'tool_result', tool_use_id: block.id, is_error: true, content: 'Human approval denied' };
      }
    }

    this.logger.logToolCall(runId, block.name, block.input);

    try {
      const result = await this.callWithRetry(() =>
        this.executeTool(block.name, block.input as Record<string, unknown>)
      );
      return { type: 'tool_result', tool_use_id: block.id, content: JSON.stringify(result) };
    } catch (err) {
      return { type: 'tool_result', tool_use_id: block.id, is_error: true, content: err instanceof Error ? err.message : 'Tool execution failed' };
    }
  }

  // ─── HITL approval check ─────────────────────────────────────────────────────

  private needsApproval(tool: AgentTool): boolean {
    if (this.humanInputMode === 'ALWAYS') return true;
    if (this.humanInputMode === 'NEVER') return false;
    // ON_FINANCIAL_WRITE: only require approval for financial write tools
    return Boolean(tool.isFinancial);
  }

  // ─── Retry with exponential backoff (1s, 2s, 4s) ──────────────────────────

  private async callWithRetry<T>(fn: () => Promise<T>, attempt = 0): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= 2) throw err;
      const delayMs = Math.pow(2, attempt) * 1_000;
      await new Promise(resolve => setTimeout(resolve, delayMs));
      return this.callWithRetry(fn, attempt + 1);
    }
  }

  // ─── Graceful degradation ──────────────────────────────────────────────────

  private fail(
    reason: string,
    stopReason: AgentOutput['stopReason'],
    startTime: number,
    tokenUsage: AgentOutput['tokenUsage']
  ): AgentOutput<TResult> {
    return {
      success: false,
      confidence: 0,
      reasoning: [{ iteration: 0, thought: reason, timestamp: new Date().toISOString() }],
      tokenUsage,
      durationMs: Date.now() - startTime,
      stopReason,
      error: reason,
      requiresHumanApproval: true,
      approvalReason: reason,
    };
  }
}
