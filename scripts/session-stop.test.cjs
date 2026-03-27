/**
 * Tests for session-stop.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/session-stop.test.js
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'session-stop.cjs');
const TEST_DIR = path.join(__dirname, '__test_session_stop_tmp');

function runScript(cwd) {
  const result = spawnSync('node', [SCRIPT_PATH], {
    encoding: 'utf8',
    timeout: 15000,
    cwd,
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  return {
    exitCode: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  };
}

function setupTestDir() {
  fs.mkdirSync(TEST_DIR, { recursive: true });
}

function teardownTestDir() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

describe('session-stop.cjs', () => {

  before(() => {
    teardownTestDir();
  });

  after(() => {
    teardownTestDir();
  });

  describe('when tool.log exists', () => {
    before(() => {
      setupTestDir();
      const claudeDir = path.join(TEST_DIR, '.claude');
      fs.mkdirSync(claudeDir, { recursive: true });
      const lines = [];
      for (let i = 0; i < 5; i++) {
        lines.push(`2026-03-21T10:0${i}:00 | Read | /some/file-${i}.ts | exit:0`);
      }
      fs.writeFileSync(path.join(claudeDir, 'tool.log'), lines.join('\n') + '\n');
    });

    after(() => {
      teardownTestDir();
    });

    it('should create handoff file in thoughts/handoffs/', () => {
      runScript(TEST_DIR);
      const handoffDir = path.join(TEST_DIR, 'thoughts', 'handoffs');
      assert.ok(fs.existsSync(handoffDir), 'handoffs directory should exist');
      const files = fs.readdirSync(handoffDir).filter(f => f.startsWith('handoff-') && f.endsWith('.md'));
      assert.ok(files.length > 0, 'Should create at least one handoff file');
    });

    it('should create/append to thoughts/costs.jsonl', () => {
      runScript(TEST_DIR);
      const costsPath = path.join(TEST_DIR, 'thoughts', 'costs.jsonl');
      assert.ok(fs.existsSync(costsPath), 'costs.jsonl should exist');
      const content = fs.readFileSync(costsPath, 'utf8').trim();
      const lines = content.split('\n').filter(l => l.trim());
      assert.ok(lines.length > 0, 'Should have at least one cost entry');
      const entry = JSON.parse(lines[lines.length - 1]);
      assert.ok('date' in entry, 'Cost entry should have date field');
      assert.ok('tool_calls' in entry, 'Cost entry should have tool_calls field');
      assert.ok('est_cost_usd' in entry, 'Cost entry should have est_cost_usd field');
      assert.ok('source' in entry, 'Cost entry should have source field');
      assert.equal(entry.source, 'session-stop');
    });

    it('should include cost estimate in output', () => {
      const result = runScript(TEST_DIR);
      const output = result.stderr || result.stdout;
      assert.ok(output.includes('Cost estimate:'), 'Should include cost estimate line');
      assert.ok(output.includes('$'), 'Should include dollar sign in cost');
      assert.ok(output.includes('tool calls'), 'Should mention tool calls count');
    });

    it('should output summary to stderr', () => {
      const result = runScript(TEST_DIR);
      assert.ok(result.stderr.includes('Session saved:'), 'stderr should include Session saved');
      assert.ok(result.stderr.includes('Cost estimate:'), 'stderr should include Cost estimate');
    });
  });

  describe('when tool.log is missing', () => {
    before(() => {
      setupTestDir();
      // No .claude directory — no tool.log
    });

    after(() => {
      teardownTestDir();
    });

    it('should handle missing tool.log gracefully', () => {
      const result = runScript(TEST_DIR);
      // Script should not crash
      assert.equal(result.exitCode, 0, 'Should exit cleanly');
    });

    it('should still create handoff file', () => {
      runScript(TEST_DIR);
      const handoffDir = path.join(TEST_DIR, 'thoughts', 'handoffs');
      assert.ok(fs.existsSync(handoffDir), 'handoffs directory should exist');
      const files = fs.readdirSync(handoffDir).filter(f => f.startsWith('handoff-'));
      assert.ok(files.length > 0, 'Should create handoff even without tool.log');
    });

    it('should include "No tool activity recorded" in handoff when log is missing', () => {
      // Clean so we get a fresh handoff
      teardownTestDir();
      setupTestDir();
      runScript(TEST_DIR);
      const handoffDir = path.join(TEST_DIR, 'thoughts', 'handoffs');
      const files = fs.readdirSync(handoffDir).filter(f => f.startsWith('handoff-') && f.endsWith('.md'));
      const content = fs.readFileSync(path.join(handoffDir, files[0]), 'utf8');
      assert.ok(content.includes('No tool activity recorded'), 'Should note no activity');
    });

    it('should still create costs.jsonl with zero cost', () => {
      teardownTestDir();
      setupTestDir();
      runScript(TEST_DIR);
      const costsPath = path.join(TEST_DIR, 'thoughts', 'costs.jsonl');
      assert.ok(fs.existsSync(costsPath), 'costs.jsonl should exist');
      const entry = JSON.parse(fs.readFileSync(costsPath, 'utf8').trim().split('\n').pop());
      assert.equal(entry.tool_calls, 0, 'Should have 0 tool calls');
      assert.equal(entry.est_cost_usd, 0, 'Should have $0 cost');
    });
  });
});
