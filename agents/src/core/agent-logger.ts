import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import type { AgentOutput, AgentRunLog } from './types';

const AGENT_STATUS_FILE = 'agent-status.json';
const HEARTBEAT_INTERVAL_MS = 5_000;

export class AgentLogger {
  constructor(
    private readonly agentId: string,
    private readonly role: string,
    private readonly model: string,
    private readonly triggeredBy: string,
  ) {}

  logProgress(runId: string, iteration: number, status: string): void {
    this.writeLog(
      JSON.stringify({ agentId: this.agentId, runId, iteration, status, timestamp: new Date().toISOString() }),
      'agent.log'
    );
  }

  logRun<TResult>(
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

  logApprovalRequired(toolName: string, input: Record<string, unknown>): void {
    this.writeLog(
      JSON.stringify({ event: 'HUMAN_APPROVAL_REQUIRED', toolName, input }),
      'agent.log'
    );
  }

  logToolCall(runId: string, toolName: string, input: unknown): void {
    this.writeLog(
      JSON.stringify({ event: 'TOOL_CALL', traceId: runId, tool: toolName, input }),
      'agent.log'
    );
  }

  logWriteScopeViolation(toolName: string, runId: string): void {
    this.writeLog(
      JSON.stringify({ event: 'WRITE_SCOPE_VIOLATION', tool: toolName, runId }),
      'agent.log'
    );
  }

  private writeLog(entry: string, file: string): void {
    try {
      appendFileSync(file, entry + '\n');
    } catch {
      // Never throw from logging
    }
  }

  // ─── Heartbeat — written every 5s so /agent-catalog can show "Active" ──────

  writeHeartbeat(runId: string, iteration: number, status: 'active' | 'completed' | 'failed'): void {
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

  startHeartbeat(runId: string, getIteration: () => number): ReturnType<typeof setInterval> {
    return setInterval(
      () => this.writeHeartbeat(runId, getIteration(), 'active'),
      HEARTBEAT_INTERVAL_MS
    );
  }
}
