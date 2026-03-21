/**
 * Tests for cost-tracker.js
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/cost-tracker.test.js
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'cost-tracker.js');
const TEST_DIR = path.join(__dirname, '__test_cost_tmp');

function runScriptInDir(cwd) {
  try {
    const output = execSync(`node "${SCRIPT_PATH}"`, {
      encoding: 'utf8',
      timeout: 10000,
      cwd,
    });
    return { exitCode: 0, output, stderr: '' };
  } catch (err) {
    return {
      exitCode: err.status,
      output: err.stdout || '',
      stderr: err.stderr || '',
    };
  }
}

function setupTestDir() {
  fs.mkdirSync(TEST_DIR, { recursive: true });
}

function teardownTestDir() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

describe('cost-tracker.js', () => {

  before(() => {
    teardownTestDir();
  });

  after(() => {
    teardownTestDir();
  });

  describe('when tool.log does not exist', () => {
    before(() => {
      setupTestDir();
      // No .claude/tool.log created
    });

    after(() => {
      teardownTestDir();
    });

    it('should exit 0 with informational message', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('No tool.log found'), 'Should report no tool.log');
    });
  });

  describe('when tool.log is empty', () => {
    before(() => {
      setupTestDir();
      const claudeDir = path.join(TEST_DIR, '.claude');
      fs.mkdirSync(claudeDir, { recursive: true });
      fs.writeFileSync(path.join(claudeDir, 'tool.log'), '', 'utf8');
    });

    after(() => {
      teardownTestDir();
    });

    it('should handle empty tool.log gracefully and write JSONL', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Cost estimate saved'), 'Should save cost estimate');
      assert.ok(result.output.includes('0 tool calls'), 'Should report 0 tool calls');

      const costFile = path.join(TEST_DIR, 'thoughts', 'costs.jsonl');
      assert.ok(fs.existsSync(costFile), 'Should create costs.jsonl');
      const entry = JSON.parse(fs.readFileSync(costFile, 'utf8').trim());
      assert.equal(entry.tool_calls, 0);
      assert.equal(entry.est_cost_usd, 0);
    });
  });

  describe('when tool.log has entries', () => {
    before(() => {
      setupTestDir();
      const claudeDir = path.join(TEST_DIR, '.claude');
      fs.mkdirSync(claudeDir, { recursive: true });
      const logLines = [
        '2026-03-21T10-00-00 | Read | file.ts',
        '2026-03-21T10-01-00 | Edit | file.ts',
        '2026-03-21T10-02-00 | Read | other.ts',
        '2026-03-21T10-03-00 | Write | output.ts',
      ].join('\n');
      fs.writeFileSync(path.join(claudeDir, 'tool.log'), logLines, 'utf8');
    });

    after(() => {
      teardownTestDir();
    });

    it('should parse tool.log and produce JSONL output', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Cost estimate saved'), 'Should save cost estimate');

      const costFile = path.join(TEST_DIR, 'thoughts', 'costs.jsonl');
      assert.ok(fs.existsSync(costFile), 'Should create costs.jsonl');
      const entry = JSON.parse(fs.readFileSync(costFile, 'utf8').trim());
      assert.equal(entry.tool_calls, 4, 'Should count 4 tool calls');
      assert.ok(entry.tools.Read === 2, 'Should count 2 Read calls');
      assert.ok(entry.tools.Edit === 1, 'Should count 1 Edit call');
      assert.ok(entry.tools.Write === 1, 'Should count 1 Write call');
    });

    it('should calculate cost estimates correctly', () => {
      // Clean up from prior test run in this describe block
      const costFile = path.join(TEST_DIR, 'thoughts', 'costs.jsonl');
      if (fs.existsSync(costFile)) fs.unlinkSync(costFile);

      runScriptInDir(TEST_DIR);
      const entry = JSON.parse(fs.readFileSync(costFile, 'utf8').trim());

      // 4 calls * 500 input tokens = 2000 input tokens
      assert.equal(entry.est_input_tokens, 2000, 'Should estimate 2000 input tokens');
      // 4 calls * 1000 output tokens = 4000 output tokens
      assert.equal(entry.est_output_tokens, 4000, 'Should estimate 4000 output tokens');
      // Cost: (2000 * 3 + 4000 * 15) / 1000000 = (6000 + 60000) / 1000000 = 0.066
      assert.equal(entry.est_cost_usd, 0.07, 'Should round cost to 0.07');
    });
  });
});
