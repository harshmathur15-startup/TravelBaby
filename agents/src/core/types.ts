import Anthropic from '@anthropic-ai/sdk';

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
  isFinancial?: boolean;    // financial tools trigger ON_FINANCIAL_WRITE approval
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
export interface AgentRunLog {
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
