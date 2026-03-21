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

interface TokenAccumulator {
  input: number;
  output: number;
  cacheHit: number;
}

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

  // ─── Main entry point (under 40 lines) ────────────────────────────────────

  async execute(input: TInput): Promise<AgentOutput<TResult>> {
    const runId = randomUUID();
    const startTime = Date.now();
    const tokens: TokenAccumulator = { input: 0, output: 0, cacheHit: 0 };

    for (const g of this.guardrails) {
      const { passed, reason } = await g.check(input);
      if (!passed) return this.fail(`Guardrail "${g.name}" blocked: ${reason}`, 'guardrail', startTime, tokens);
    }

    const heartbeat = this.logger.startHeartbeat(runId, () => 0);
    this.logger.writeHeartbeat(runId, 0, 'active');

    try {
      const result = await Promise.race([
        this.runLoop(input, runId, startTime, tokens),
        this.timeout(runId, startTime, tokens, heartbeat),
      ]);
      clearInterval(heartbeat);
      return result;
    } catch (err) {
      clearInterval(heartbeat);
      this.logger.writeHeartbeat(runId, 0, 'failed');
      const output = this.fail(err instanceof Error ? err.message : 'Unknown error', 'error', startTime, tokens);
      this.logger.logRun(runId, input, output, startTime, tokens);
      return output;
    }
  }

  // ─── Agent loop ───────────────────────────────────────────────────────────

  private async runLoop(
    input: TInput, runId: string, startTime: number, tokens: TokenAccumulator
  ): Promise<AgentOutput<TResult>> {
    const messages: Anthropic.MessageParam[] = [{ role: 'user', content: input.task }];
    const tools: Anthropic.Tool[] = this.getTools().map(t => ({
      name: t.name, description: t.description, input_schema: t.inputSchema,
    }));

    for (let i = 1; i <= this.maxIterations; i++) {
      this.logger.logProgress(runId, i, 'running');
      const response = await this.callWithRetry(() =>
        this.client.messages.create({
          model: this.model, max_tokens: 4_000,
          system: [{ type: 'text', text: this.getSystemPrompt(), cache_control: { type: 'ephemeral' } }],
          tools, messages,
        })
      );

      this.addTokens(tokens, response);
      messages.push({ role: 'assistant', content: response.content });
      await this.emitStep(runId, i, response, startTime);

      if (response.stop_reason === 'end_turn') {
        const output = this.parseOutput(messages);
        if (output.confidence < this.confidenceThreshold) {
          output.requiresHumanApproval = true;
          output.approvalReason = `Confidence ${output.confidence.toFixed(2)} below threshold ${this.confidenceThreshold}`;
        }
        this.logger.logProgress(runId, i, 'completed');
        this.logger.logRun(runId, input, output, startTime, tokens);
        return output;
      }

      if (response.stop_reason === 'tool_use') {
        const results = await this.processToolCalls(response, runId);
        messages.push({ role: 'user', content: results });
      }
    }

    this.logger.logProgress(runId, this.maxIterations, 'max_iterations_exceeded');
    return this.fail(`Max iterations (${this.maxIterations}) exceeded`, 'max_iterations', startTime, tokens);
  }

  // ─── Tool call processing ─────────────────────────────────────────────────

  private async processToolCalls(
    response: Anthropic.Message, runId: string
  ): Promise<Anthropic.ToolResultBlockParam[]> {
    const blocks = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
    );
    return Promise.all(blocks.map(block => this.handleToolCall(block, runId)));
  }

  private async handleToolCall(
    block: Anthropic.ToolUseBlock, runId: string
  ): Promise<Anthropic.ToolResultBlockParam> {
    const tool = this.getTools().find(t => t.name === block.name);
    const toolInput = block.input as Record<string, unknown>;

    if (tool?.isWrite && !this.writeScope.has(block.name)) {
      this.logger.logWriteScopeViolation(block.name, runId);
      return { type: 'tool_result', tool_use_id: block.id, is_error: true, content: `Write tool "${block.name}" not in approved write scope` };
    }

    if (tool?.isWrite && this.needsApproval(tool)) {
      const approved = await this.requestHumanApproval(block.name, toolInput);
      if (!approved) return { type: 'tool_result', tool_use_id: block.id, is_error: true, content: 'Human approval denied' };
    }

    this.logger.logToolCall(runId, block.name, block.input);
    try {
      const result = await this.callWithRetry(() => this.executeTool(block.name, toolInput));
      return { type: 'tool_result', tool_use_id: block.id, content: JSON.stringify(result) };
    } catch (err) {
      return { type: 'tool_result', tool_use_id: block.id, is_error: true, content: err instanceof Error ? err.message : 'Tool execution failed' };
    }
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private needsApproval(tool: AgentTool): boolean {
    if (this.humanInputMode === 'ALWAYS') return true;
    if (this.humanInputMode === 'NEVER') return false;
    return Boolean(tool.isFinancial);
  }

  private addTokens(totals: TokenAccumulator, response: Anthropic.Message): void {
    totals.input += response.usage.input_tokens;
    totals.output += response.usage.output_tokens;
    const usage = response.usage as Record<string, unknown>;
    totals.cacheHit += typeof usage.cache_read_input_tokens === 'number'
      ? usage.cache_read_input_tokens : 0;
  }

  private async emitStep(
    runId: string, iteration: number, response: Anthropic.Message, startTime: number
  ): Promise<void> {
    await this.onStep?.({
      agentId: this.agentId, runId, iteration,
      action: response.stop_reason ?? 'unknown',
      tokenUsage: response.usage,
      durationMs: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  }

  private async callWithRetry<T>(fn: () => Promise<T>, attempt = 0): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= 2) throw err;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1_000));
      return this.callWithRetry(fn, attempt + 1);
    }
  }

  private timeout(
    runId: string, startTime: number, tokens: TokenAccumulator,
    heartbeat: ReturnType<typeof setInterval>
  ): Promise<AgentOutput<TResult>> {
    return new Promise(resolve => setTimeout(() => {
      clearInterval(heartbeat);
      this.logger.writeHeartbeat(runId, 0, 'failed');
      resolve(this.fail('Execution timeout', 'timeout', startTime, tokens));
    }, this.maxExecutionTimeMs));
  }

  private fail(
    reason: string, stopReason: AgentOutput['stopReason'],
    startTime: number, tokenUsage: AgentOutput['tokenUsage']
  ): AgentOutput<TResult> {
    return {
      success: false, confidence: 0,
      reasoning: [{ iteration: 0, thought: reason, timestamp: new Date().toISOString() }],
      tokenUsage, durationMs: Date.now() - startTime, stopReason,
      error: reason, requiresHumanApproval: true, approvalReason: reason,
    };
  }
}
