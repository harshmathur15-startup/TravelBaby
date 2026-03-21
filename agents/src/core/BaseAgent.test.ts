import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { BaseAgent, AGENT_MODELS } from './BaseAgent';
import type {
  AgentConfig, AgentInput, AgentOutput, AgentTool,
} from './types';

// ─── Minimal concrete subclass for testing ─────────────────────────────────

class TestAgent extends BaseAgent<AgentInput, string> {
  getSystemPrompt(): string {
    return 'You are a test agent.';
  }

  getTools(): AgentTool[] {
    return [];
  }

  async executeTool(_name: string, _input: Record<string, unknown>): Promise<unknown> {
    return { ok: true };
  }

  parseOutput(): AgentOutput<string> {
    return {
      success: true,
      result: 'test-result',
      confidence: 0.95,
      reasoning: [],
      tokenUsage: { input: 0, output: 0, cacheHit: 0 },
      durationMs: 0,
      stopReason: 'end_turn',
    };
  }

  // Expose protected members for testing
  get _maxIterations() { return this.maxIterations; }
  get _maxExecutionTimeMs() { return this.maxExecutionTimeMs; }
  get _confidenceThreshold() { return this.confidenceThreshold; }
  get _humanInputMode() { return this.humanInputMode; }
  get _writeScope() { return this.writeScope; }
  get _guardrails() { return this.guardrails; }
  get _triggeredBy() { return this.triggeredBy; }
  get _agentId() { return this.agentId; }
  get _role() { return this.role; }
  get _goal() { return this.goal; }
  get _model() { return this.model; }

  // Mirror private needsApproval logic for direct testing
  checkNeedsApproval(tool: AgentTool): boolean {
    if (this._humanInputMode === 'ALWAYS') return true;
    if (this._humanInputMode === 'NEVER') return false;
    return Boolean(tool.isFinancial);
  }

  // Expose private callWithRetry
  async testCallWithRetry<T>(fn: () => Promise<T>): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any).callWithRetry(fn);
  }

  // Expose private fail
  testFail(reason: string, stopReason: AgentOutput['stopReason']): AgentOutput<string> {
    const startTime = Date.now();
    const tokens = { input: 0, output: 0, cacheHit: 0 };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any).fail(reason, stopReason, startTime, tokens);
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function makeConfig(overrides: Partial<AgentConfig> = {}): AgentConfig {
  return {
    agentId: 'test-agent',
    role: 'Test Runner',
    goal: 'Run tests',
    model: AGENT_MODELS.CLASSIFICATION,
    ...overrides,
  };
}

function makeTool(overrides: Partial<AgentTool> = {}): AgentTool {
  return {
    name: 'test_tool',
    description: 'A test tool',
    inputSchema: { type: 'object' as const, properties: {} },
    isWrite: false,
    isIdempotent: true,
    ...overrides,
  };
}

let tempDir: string;
let originalCwd: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'base-agent-test-'));
  originalCwd = process.cwd();
  process.chdir(tempDir);
});

afterEach(() => {
  process.chdir(originalCwd);
  rmSync(tempDir, { recursive: true, force: true });
});

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('BaseAgent', () => {
  describe('constructor defaults', () => {
    it('should set maxIterations to 10 by default', () => {
      const agent = new TestAgent(makeConfig());
      assert.equal(agent._maxIterations, 10);
    });

    it('should set maxExecutionTimeMs to 120000 by default', () => {
      const agent = new TestAgent(makeConfig());
      assert.equal(agent._maxExecutionTimeMs, 120_000);
    });

    it('should set confidenceThreshold to 0.75 by default', () => {
      const agent = new TestAgent(makeConfig());
      assert.equal(agent._confidenceThreshold, 0.75);
    });

    it('should set humanInputMode to ON_FINANCIAL_WRITE by default', () => {
      const agent = new TestAgent(makeConfig());
      assert.equal(agent._humanInputMode, 'ON_FINANCIAL_WRITE');
    });

    it('should set triggeredBy to system by default', () => {
      const agent = new TestAgent(makeConfig());
      assert.equal(agent._triggeredBy, 'system');
    });

    it('should set writeScope to empty set by default', () => {
      const agent = new TestAgent(makeConfig());
      assert.equal(agent._writeScope.size, 0);
    });

    it('should set guardrails to empty array by default', () => {
      const agent = new TestAgent(makeConfig());
      assert.equal(agent._guardrails.length, 0);
    });

    it('should apply provided overrides', () => {
      const agent = new TestAgent(makeConfig({
        maxIterations: 5,
        confidenceThreshold: 0.9,
        humanInputMode: 'ALWAYS',
        writeScope: ['write_file'],
        triggeredBy: 'user',
      }));
      assert.equal(agent._maxIterations, 5);
      assert.equal(agent._confidenceThreshold, 0.9);
      assert.equal(agent._humanInputMode, 'ALWAYS');
      assert.ok(agent._writeScope.has('write_file'));
      assert.equal(agent._triggeredBy, 'user');
    });

    it('should store agentId, role, goal, and model from config', () => {
      const agent = new TestAgent(makeConfig({
        agentId: 'my-agent',
        role: 'Scanner',
        goal: 'Scan things',
        model: AGENT_MODELS.REASONING,
      }));
      assert.equal(agent._agentId, 'my-agent');
      assert.equal(agent._role, 'Scanner');
      assert.equal(agent._goal, 'Scan things');
      assert.equal(agent._model, AGENT_MODELS.REASONING);
    });
  });

  describe('needsApproval logic', () => {
    it('should return true when humanInputMode is ALWAYS', () => {
      const agent = new TestAgent(makeConfig({ humanInputMode: 'ALWAYS' }));
      assert.equal(agent.checkNeedsApproval(makeTool({ isWrite: true, isFinancial: false })), true);
    });

    it('should return false when humanInputMode is NEVER', () => {
      const agent = new TestAgent(makeConfig({ humanInputMode: 'NEVER' }));
      assert.equal(agent.checkNeedsApproval(makeTool({ isWrite: true, isFinancial: true })), false);
    });

    it('should return true for financial tools in ON_FINANCIAL_WRITE mode', () => {
      const agent = new TestAgent(makeConfig({ humanInputMode: 'ON_FINANCIAL_WRITE' }));
      assert.equal(agent.checkNeedsApproval(makeTool({ isWrite: true, isFinancial: true })), true);
    });

    it('should return false for non-financial tools in ON_FINANCIAL_WRITE mode', () => {
      const agent = new TestAgent(makeConfig({ humanInputMode: 'ON_FINANCIAL_WRITE' }));
      assert.equal(agent.checkNeedsApproval(makeTool({ isWrite: true, isFinancial: false })), false);
    });

    it('should return false when isFinancial is undefined in ON_FINANCIAL_WRITE mode', () => {
      const agent = new TestAgent(makeConfig({ humanInputMode: 'ON_FINANCIAL_WRITE' }));
      assert.equal(agent.checkNeedsApproval(makeTool({ isWrite: true })), false);
    });
  });

  describe('callWithRetry', () => {
    it('should return result on first success', async () => {
      const agent = new TestAgent(makeConfig());
      const result = await agent.testCallWithRetry(async () => 'ok');
      assert.equal(result, 'ok');
    });

    it('should retry on failure and succeed on second attempt', async () => {
      const agent = new TestAgent(makeConfig());
      let attempts = 0;
      const result = await agent.testCallWithRetry(async () => {
        attempts++;
        if (attempts < 2) throw new Error('transient');
        return 'recovered';
      });
      assert.equal(result, 'recovered');
      assert.equal(attempts, 2);
    });

    it('should throw after 3 failed attempts', async () => {
      const agent = new TestAgent(makeConfig());
      let attempts = 0;
      await assert.rejects(
        () => agent.testCallWithRetry(async () => {
          attempts++;
          throw new Error('persistent failure');
        }),
        { message: 'persistent failure' }
      );
      assert.equal(attempts, 3);
    });
  });

  describe('fail', () => {
    it('should return a failed AgentOutput with correct structure', () => {
      const agent = new TestAgent(makeConfig());
      const output = agent.testFail('Something broke', 'error');

      assert.equal(output.success, false);
      assert.equal(output.confidence, 0);
      assert.equal(output.stopReason, 'error');
      assert.equal(output.error, 'Something broke');
      assert.equal(output.requiresHumanApproval, true);
      assert.equal(output.approvalReason, 'Something broke');
      assert.ok(output.durationMs >= 0);
      assert.equal(output.reasoning.length, 1);
      assert.equal(output.reasoning[0].iteration, 0);
      assert.equal(output.reasoning[0].thought, 'Something broke');
      assert.ok(output.reasoning[0].timestamp);
    });

    it('should set correct stopReason for timeout', () => {
      const agent = new TestAgent(makeConfig());
      const output = agent.testFail('Timed out', 'timeout');
      assert.equal(output.stopReason, 'timeout');
    });

    it('should set correct stopReason for guardrail', () => {
      const agent = new TestAgent(makeConfig());
      const output = agent.testFail('Blocked', 'guardrail');
      assert.equal(output.stopReason, 'guardrail');
    });
  });

  describe('guardrail blocking via execute', () => {
    it('should block execution when a guardrail fails', async () => {
      const agent = new TestAgent(makeConfig({
        guardrails: [{
          name: 'test-guard',
          check: async () => ({ passed: false, reason: 'Input is invalid' }),
        }],
      }));

      const output = await agent.execute({ task: 'do something' });

      assert.equal(output.success, false);
      assert.equal(output.stopReason, 'guardrail');
      assert.ok(output.error?.includes('test-guard'));
      assert.ok(output.error?.includes('Input is invalid'));
    });

    it('should pass guardrails and proceed to execution when all pass', async () => {
      const agent = new TestAgent(makeConfig({
        guardrails: [{
          name: 'always-pass',
          check: async () => ({ passed: true }),
        }],
      }));

      const output = await agent.execute({ task: 'test' });
      // Mock SDK returns end_turn, so parseOutput runs — not guardrail-blocked
      assert.notEqual(output.stopReason, 'guardrail');
    });
  });
});
