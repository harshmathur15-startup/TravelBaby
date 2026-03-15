import Anthropic from '@anthropic-ai/sdk';
import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import { randomUUID } from 'crypto';

const AGENT_STATUS_FILE = 'agent-status.json';
const HEARTBEAT_INTERVAL_MS = 5_000;

// ─── Model routing ─────────────────────────────────────────────────────────────
export const AGENT_MODELS = {
  CLASSIFICATION: 'claude-haiku-4-5-20251001',  // triage, scoring, extraction
  REASONING: 'claude-sonnet-4-6',               // anomaly detection, compliance
} as const;

export type AgentModel = (typeof AGENT_MODELS)[keyof typeof AGENT_MODELS];

// ─── Human-in-the-loop mode (AutoGen pattern) ──────────────────────────────────
export type HumanInputMode = 'NEVER' | 'ON_FINANCIAL_WRITE' | 'ALWAYS';

// ─── Guardrails ────────────────────────────────────────────────────────────────
export interface Guardrail {
  name: string;
  check: (input: unknown) => Promise<{ passed: boolean; reason?: string }>;
}

// ─── Tool definition ───────────────────────────────────────────────────────────
export interface AgentTool {
  name: string;
  description: string;
  inputSchema: Anthropic.Tool['input_schema'];
  isWrite: boolean;         // write tools require human approval
  isIdempotent: boolean;    // idempotent tools are safe to retry
}

// ─── Step callback (feeds BullMQ job progress) ────────────────────────────────
export interface StepEvent {
  agentId: string;
  runId: string;
  iteration: number;
  action: string;
  toolName?: string;
  tokenUsage?: Anthropic.Usage;
  durationMs: number;
  timestamp: string;
}

export type StepCallback = (event: StepEvent) => void | Promise<void>;

// ─── Agent config ──────────────────────────────────────────────────────────────
export interface AgentConfig {
  agentId: string;
  role: string;            // e.g. "Data Anomaly Detector"
  goal: string;            // e.g. "Flag data anomalies for human review"
  model: AgentModel;
  maxIterations?: number;  // default 10
  maxExecutionTimeMs?: number;
  confidenceThreshold?: number;  // default 0.75 — below triggers human review
  humanInputMode?: HumanInputMode;
  writeScope?: string[];   // explicit list of write-enabled tool names
  guardrails?: Guardrail[];
  onStep?: StepCallback;
  triggeredBy?: string;
}

// ─── Input / Output contracts ──────────────────────────────────────────────────
export interface AgentInput {
  task: string;
  context?: Record<string, unknown>;
  idempotencyKey?: string;
}

export interface ReasoningStep {
  iteration: number;
  thought?: string;
  action?: string;
  observation?: string;
  timestamp: string;
}

export interface AgentOutput<TResult = unknown> {
  success: boolean;
  result?: TResult;
  partialResult?: TResult;
  confidence: number;             // 0–1
  reasoning: ReasoningStep[];
  tokenUsage: { input: number; output: number; cacheHit: number };
  durationMs: number;
  stopReason: 'end_turn' | 'max_iterations' | 'timeout' | 'error' | 'human_abort' | 'guardrail';
  requiresHumanApproval?: boolean;
  approvalReason?: string;
  error?: string;
}

// ─── Run audit log entry ────────────────────────────────────────────────────────
interface AgentRunLog {
  agentId: string;
  runId: string;
  action: 'execute';
  input: unknown;
  output: unknown;
  durationMs: number;
  modelUsed: string;
  tokenUsage: AgentOutput['tokenUsage'];
  timestamp: string;
  triggeredBy: string;
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
  }

  // ─── Abstract interface — each agent implements these ──────────────────────

  /** Compose the full system prompt from role, goal, and constraints */
  abstract getSystemPrompt(): string;

  /** List all tools this agent has access to */
  abstract getTools(): AgentTool[];

  /** Execute a single tool call — return result or throw */
  abstract executeTool(name: string, input: Record<string, unknown>): Promise<unknown>;

  /** Parse the final message history into a typed result with confidence score */
  abstract parseOutput(messages: Anthropic.MessageParam[]): AgentOutput<TResult>;

  /** Domain-specific approval logic — called when humanInputMode requires it */
  protected async requestHumanApproval(
    toolName: string,
    input: Record<string, unknown>
  ): Promise<boolean> {
    // Default: deny + log. Subclasses wire this to the approval API.
    this.writeLog(
      JSON.stringify({ event: 'HUMAN_APPROVAL_REQUIRED', toolName, input }),
      'agent.log'
    );
    return false;
  }

  // ─── Main entry point ──────────────────────────────────────────────────────

  async execute(input: TInput): Promise<AgentOutput<TResult>> {
    const runId = randomUUID();
    const startTime = Date.now();
    let iteration = 0;
    let totalTokens = { input: 0, output: 0, cacheHit: 0 };

    const messages: Anthropic.MessageParam[] = [
      { role: 'user', content: input.task },
    ];

    // ── Guardrail: input validation ─────────────────────────────────────────
    for (const g of this.guardrails) {
      const { passed, reason } = await g.check(input);
      if (!passed) {
        return this.fail(`Guardrail "${g.name}" blocked: ${reason}`, 'guardrail', startTime, totalTokens);
      }
    }

    // ── Tool schema for API ─────────────────────────────────────────────────
    const apiTools: Anthropic.Tool[] = this.getTools().map(t => ({
      name: t.name,
      description: t.description,
      input_schema: t.inputSchema,
    }));

    let lastOutput: AgentOutput<TResult> | null = null;

    // ── Heartbeat — writes active status every 5s ───────────────────────────
    const heartbeat = this.startHeartbeat(runId, () => iteration);
    this.writeHeartbeat(runId, 0, 'active');

    // ── Main loop with wall-clock timeout ──────────────────────────────────
    const loopPromise = async (): Promise<AgentOutput<TResult>> => {
      while (iteration < this.maxIterations) {
        iteration++;
        this.logProgress(runId, iteration, 'running');

        const response = await this.callWithRetry(() =>
          this.client.messages.create({
            model: this.model,
            max_tokens: 4_000,
            system: [
              {
                type: 'text',
                text: this.getSystemPrompt(),
                // Prompt caching — system prompt is static per run
                cache_control: { type: 'ephemeral' },
              },
            ],
            tools: apiTools,
            messages,
          })
        );

        // Track token usage
        totalTokens.input += response.usage.input_tokens;
        totalTokens.output += response.usage.output_tokens;
        totalTokens.cacheHit += (response.usage as Record<string, number>).cache_read_input_tokens ?? 0;

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

        // ── Done ───────────────────────────────────────────────────────────
        if (response.stop_reason === 'end_turn') {
          lastOutput = this.parseOutput(messages);
          break;
        }

        // ── Tool use ───────────────────────────────────────────────────────
        if (response.stop_reason === 'tool_use') {
          const toolUseBlocks = response.content.filter(
            (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
          );

          // Execute tool calls in parallel (Anthropic best practice)
          const toolResults = await Promise.all(
            toolUseBlocks.map(block => this.handleSingleToolCall(block, runId))
          );

          messages.push({ role: 'user', content: toolResults });
        }
      }

      if (iteration >= this.maxIterations && !lastOutput) {
        this.logProgress(runId, iteration, 'max_iterations_exceeded');
        return this.fail(
          `Max iterations (${this.maxIterations}) exceeded`,
          'max_iterations',
          startTime,
          totalTokens
        );
      }

      // ── Confidence gate ────────────────────────────────────────────────
      if (lastOutput && lastOutput.confidence < this.confidenceThreshold) {
        lastOutput.requiresHumanApproval = true;
        lastOutput.approvalReason =
          `Confidence ${lastOutput.confidence.toFixed(2)} below threshold ${this.confidenceThreshold}`;
      }

      this.logProgress(runId, iteration, 'completed');
      this.logRun(runId, input, lastOutput!, startTime, totalTokens);
      clearInterval(heartbeat);
      this.writeHeartbeat(runId, iteration, 'completed');
      return lastOutput!;
    };

    // Race: agent loop vs wall-clock timeout
    try {
      const timeoutPromise = new Promise<AgentOutput<TResult>>(resolve =>
        setTimeout(() => {
          clearInterval(heartbeat);
          this.writeHeartbeat(runId, iteration, 'failed');
          resolve(this.fail('Execution timeout', 'timeout', startTime, totalTokens));
        }, this.maxExecutionTimeMs)
      );
      return await Promise.race([loopPromise(), timeoutPromise]);
    } catch (err) {
      clearInterval(heartbeat);
      this.writeHeartbeat(runId, iteration, 'failed');
      this.logProgress(runId, iteration, 'failed');
      const output = this.fail(
        err instanceof Error ? err.message : 'Unknown error',
        'error',
        startTime,
        totalTokens
      );
      this.logRun(runId, input, output, startTime, totalTokens);
      return output;
    }
  }

  // ─── Single tool call handler ──────────────────────────────────────────────

  private async handleSingleToolCall(
    block: Anthropic.ToolUseBlock,
    runId: string
  ): Promise<Anthropic.ToolResultBlockParam> {
    const tool = this.getTools().find(t => t.name === block.name);

    // Write scope enforcement
    if (tool?.isWrite && !this.writeScope.has(block.name)) {
      const msg = `Write tool "${block.name}" not in approved write scope`;
      this.writeLog(JSON.stringify({ event: 'WRITE_SCOPE_VIOLATION', tool: block.name, runId }), 'agent.log');
      return { type: 'tool_result', tool_use_id: block.id, is_error: true, content: msg };
    }

    // Human approval for write tools
    if (tool?.isWrite) {
      const needsApproval =
        this.humanInputMode === 'ALWAYS' ||
        (this.humanInputMode === 'ON_FINANCIAL_WRITE' && tool.isWrite);

      if (needsApproval) {
        const approved = await this.requestHumanApproval(
          block.name,
          block.input as Record<string, unknown>
        );
        if (!approved) {
          return {
            type: 'tool_result',
            tool_use_id: block.id,
            is_error: true,
            content: 'Human approval denied',
          };
        }
      }
    }

    this.writeLog(
      JSON.stringify({ event: 'TOOL_CALL', traceId: runId, tool: block.name, input: block.input }),
      'agent.log'
    );

    try {
      const result = await this.callWithRetry(() =>
        this.executeTool(block.name, block.input as Record<string, unknown>)
      );
      return {
        type: 'tool_result',
        tool_use_id: block.id,
        content: JSON.stringify(result),
      };
    } catch (err) {
      // is_error: true — correct Anthropic pattern; model sees and self-corrects
      return {
        type: 'tool_result',
        tool_use_id: block.id,
        is_error: true,
        content: err instanceof Error ? err.message : 'Tool execution failed',
      };
    }
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

  // ─── Logging ───────────────────────────────────────────────────────────────

  private logProgress(runId: string, iteration: number, status: string): void {
    this.writeLog(
      JSON.stringify({ agentId: this.agentId, runId, iteration, status, timestamp: new Date().toISOString() }),
      'agent.log'
    );
  }

  private logRun(
    runId: string,
    input: unknown,
    output: AgentOutput<TResult>,
    startTime: number,
    tokenUsage: AgentOutput['tokenUsage']
  ): void {
    const log: AgentRunLog = {
      agentId: this.agentId,
      runId,
      action: 'execute',
      input,
      output,
      durationMs: Date.now() - startTime,
      modelUsed: this.model,
      tokenUsage,
      timestamp: new Date().toISOString(),
      triggeredBy: this.triggeredBy,
    };
    this.writeLog(JSON.stringify(log), 'agent.log');
  }

  private writeLog(entry: string, file: string): void {
    try {
      appendFileSync(file, entry + '\n');
    } catch {
      // Never throw from logging
    }
  }

  // ─── Heartbeat — written every 5s so /agent-catalog can show "Active" ──────

  private writeHeartbeat(runId: string, iteration: number, status: 'active' | 'completed' | 'failed'): void {
    try {
      let registry: Record<string, unknown> = {};
      try {
        registry = JSON.parse(readFileSync(AGENT_STATUS_FILE, 'utf8'));
      } catch {
        // File doesn't exist yet — start fresh
      }
      registry[this.agentId] = {
        agentId: this.agentId,
        role: this.role,
        runId,
        iteration,
        status,
        timestamp: new Date().toISOString(),
      };
      writeFileSync(AGENT_STATUS_FILE, JSON.stringify(registry, null, 2));
    } catch {
      // Never throw from heartbeat
    }
  }

  private startHeartbeat(runId: string, getIteration: () => number): ReturnType<typeof setInterval> {
    return setInterval(
      () => this.writeHeartbeat(runId, getIteration(), 'active'),
      HEARTBEAT_INTERVAL_MS
    );
  }
}
