import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { AgentLogger } from './agent-logger';

let tempDir: string;
let originalCwd: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'agent-logger-test-'));
  originalCwd = process.cwd();
  process.chdir(tempDir);
});

afterEach(() => {
  process.chdir(originalCwd);
  rmSync(tempDir, { recursive: true, force: true });
});

describe('AgentLogger', () => {
  describe('constructor', () => {
    it('should create a logger instance without throwing', () => {
      const logger = new AgentLogger('test-agent', 'tester', 'claude-haiku-4-5-20251001', 'system');
      assert.ok(logger instanceof AgentLogger);
    });
  });

  describe('logProgress', () => {
    it('should append a JSON line to agent.log', () => {
      const logger = new AgentLogger('agent-1', 'tester', 'claude-haiku-4-5-20251001', 'manual');
      logger.logProgress('run-abc', 1, 'running');

      const content = readFileSync(join(tempDir, 'agent.log'), 'utf8');
      const entry = JSON.parse(content.trim());

      assert.equal(entry.agentId, 'agent-1');
      assert.equal(entry.runId, 'run-abc');
      assert.equal(entry.iteration, 1);
      assert.equal(entry.status, 'running');
      assert.ok(entry.timestamp);
    });

    it('should append multiple entries on separate lines', () => {
      const logger = new AgentLogger('agent-1', 'tester', 'claude-haiku-4-5-20251001', 'manual');
      logger.logProgress('run-1', 1, 'running');
      logger.logProgress('run-1', 2, 'running');

      const lines = readFileSync(join(tempDir, 'agent.log'), 'utf8').trim().split('\n');
      assert.equal(lines.length, 2);
    });
  });

  describe('logRun', () => {
    it('should write a structured AgentRunLog entry', () => {
      const logger = new AgentLogger('agent-2', 'auditor', 'claude-sonnet-4-6', 'cron');
      const startTime = Date.now() - 500;
      const mockOutput = {
        success: true,
        confidence: 0.9,
        reasoning: [],
        tokenUsage: { input: 100, output: 50, cacheHit: 10 },
        durationMs: 500,
        stopReason: 'end_turn' as const,
      };

      logger.logRun('run-xyz', { task: 'audit' }, mockOutput, startTime, { input: 100, output: 50, cacheHit: 10 });

      const content = readFileSync(join(tempDir, 'agent.log'), 'utf8');
      const entry = JSON.parse(content.trim());

      assert.equal(entry.agentId, 'agent-2');
      assert.equal(entry.runId, 'run-xyz');
      assert.equal(entry.action, 'execute');
      assert.equal(entry.modelUsed, 'claude-sonnet-4-6');
      assert.equal(entry.triggeredBy, 'cron');
      assert.equal(entry.tokenUsage.input, 100);
      assert.ok(entry.durationMs >= 0);
      assert.ok(entry.timestamp);
    });
  });

  describe('logApprovalRequired', () => {
    it('should log a HUMAN_APPROVAL_REQUIRED event', () => {
      const logger = new AgentLogger('agent-3', 'writer', 'claude-haiku-4-5-20251001', 'system');
      logger.logApprovalRequired('delete_record', { id: '123' });

      const content = readFileSync(join(tempDir, 'agent.log'), 'utf8');
      const entry = JSON.parse(content.trim());

      assert.equal(entry.event, 'HUMAN_APPROVAL_REQUIRED');
      assert.equal(entry.toolName, 'delete_record');
      assert.deepEqual(entry.input, { id: '123' });
    });
  });

  describe('logToolCall', () => {
    it('should log a TOOL_CALL event with traceId', () => {
      const logger = new AgentLogger('agent-4', 'scanner', 'claude-haiku-4-5-20251001', 'system');
      logger.logToolCall('run-111', 'read_file', { path: '/tmp/test' });

      const content = readFileSync(join(tempDir, 'agent.log'), 'utf8');
      const entry = JSON.parse(content.trim());

      assert.equal(entry.event, 'TOOL_CALL');
      assert.equal(entry.traceId, 'run-111');
      assert.equal(entry.tool, 'read_file');
    });
  });

  describe('logWriteScopeViolation', () => {
    it('should log a WRITE_SCOPE_VIOLATION event', () => {
      const logger = new AgentLogger('agent-5', 'enforcer', 'claude-haiku-4-5-20251001', 'system');
      logger.logWriteScopeViolation('unauthorized_write', 'run-222');

      const content = readFileSync(join(tempDir, 'agent.log'), 'utf8');
      const entry = JSON.parse(content.trim());

      assert.equal(entry.event, 'WRITE_SCOPE_VIOLATION');
      assert.equal(entry.tool, 'unauthorized_write');
      assert.equal(entry.runId, 'run-222');
    });
  });

  describe('writeHeartbeat', () => {
    it('should create agent-status.json with agent entry', () => {
      const logger = new AgentLogger('agent-hb', 'monitor', 'claude-haiku-4-5-20251001', 'system');
      logger.writeHeartbeat('run-hb', 3, 'active');

      const content = JSON.parse(readFileSync(join(tempDir, 'agent-status.json'), 'utf8'));

      assert.ok(content['agent-hb']);
      assert.equal(content['agent-hb'].agentId, 'agent-hb');
      assert.equal(content['agent-hb'].role, 'monitor');
      assert.equal(content['agent-hb'].runId, 'run-hb');
      assert.equal(content['agent-hb'].iteration, 3);
      assert.equal(content['agent-hb'].status, 'active');
      assert.ok(content['agent-hb'].timestamp);
    });

    it('should preserve existing entries when adding a new agent', () => {
      const logger1 = new AgentLogger('agent-a', 'role-a', 'claude-haiku-4-5-20251001', 'system');
      const logger2 = new AgentLogger('agent-b', 'role-b', 'claude-haiku-4-5-20251001', 'system');

      logger1.writeHeartbeat('run-a', 1, 'active');
      logger2.writeHeartbeat('run-b', 2, 'active');

      const content = JSON.parse(readFileSync(join(tempDir, 'agent-status.json'), 'utf8'));
      assert.ok(content['agent-a']);
      assert.ok(content['agent-b']);
    });

    it('should update status to completed', () => {
      const logger = new AgentLogger('agent-done', 'worker', 'claude-haiku-4-5-20251001', 'system');
      logger.writeHeartbeat('run-done', 5, 'active');
      logger.writeHeartbeat('run-done', 5, 'completed');

      const content = JSON.parse(readFileSync(join(tempDir, 'agent-status.json'), 'utf8'));
      assert.equal(content['agent-done'].status, 'completed');
    });
  });

  describe('startHeartbeat', () => {
    it('should return an interval that can be cleared', () => {
      const logger = new AgentLogger('agent-int', 'runner', 'claude-haiku-4-5-20251001', 'system');
      let iteration = 0;
      const interval = logger.startHeartbeat('run-int', () => iteration);

      assert.ok(interval);
      clearInterval(interval);
    });
  });
});
