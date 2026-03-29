/**
 * Tests for session-tracker.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/session-tracker.test.js
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'session-tracker.cjs');
const TEST_DIR = path.join(__dirname, '__test_session_tracker_tmp');

function runScript(cwd, stdinData) {
  try {
    const stdout = execSync(`node "${SCRIPT_PATH}"`, {
      encoding: 'utf8',
      timeout: 15000,
      cwd,
      input: stdinData,
    });
    return { exitCode: 0, stdout, stderr: '' };
  } catch (err) {
    return {
      exitCode: err.status,
      stdout: err.stdout || '',
      stderr: err.stderr || '',
    };
  }
}

function setupTestDir() {
  fs.mkdirSync(TEST_DIR, { recursive: true });
  fs.mkdirSync(path.join(TEST_DIR, '.claude'), { recursive: true });
}

function teardownTestDir() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

describe('session-tracker.cjs', () => {

  before(() => {
    teardownTestDir();
  });

  after(() => {
    teardownTestDir();
  });

  describe('with valid JSON input', () => {
    before(() => {
      setupTestDir();
    });

    after(() => {
      teardownTestDir();
    });

    it('should create JSONL entry in .claude/sessions/<date>.jsonl', () => {
      const input = JSON.stringify({
        tool_name: 'Read',
        tool_input: { file_path: '/some/test/file.ts' },
        exit_code: 0,
      });
      runScript(TEST_DIR, input);
      const sessionsDir = path.join(TEST_DIR, '.claude', 'sessions');
      assert.ok(fs.existsSync(sessionsDir), 'sessions directory should exist');
      const files = fs.readdirSync(sessionsDir).filter(f => f.endsWith('.jsonl'));
      assert.ok(files.length > 0, 'Should create a JSONL file');
      const content = fs.readFileSync(path.join(sessionsDir, files[0]), 'utf8').trim();
      const entry = JSON.parse(content.split('\n').pop());
      assert.ok('ts' in entry, 'Entry should have ts field');
      assert.ok('tool' in entry, 'Entry should have tool field');
      assert.ok('target' in entry, 'Entry should have target field');
      assert.ok('exit' in entry, 'Entry should have exit field');
      assert.equal(entry.tool, 'Read');
      assert.equal(entry.target, '/some/test/file.ts');
      assert.equal(entry.exit, 0);
    });

    it('should append to .claude/tool.log', () => {
      setupTestDir();
      const input = JSON.stringify({
        tool_name: 'Edit',
        tool_input: { file_path: '/project/src/index.ts' },
        exit_code: 0,
      });
      runScript(TEST_DIR, input);
      const logPath = path.join(TEST_DIR, '.claude', 'tool.log');
      assert.ok(fs.existsSync(logPath), 'tool.log should exist');
      const content = fs.readFileSync(logPath, 'utf8');
      assert.ok(content.includes('Edit'), 'tool.log should include tool name');
      assert.ok(content.includes('/project/src/index.ts'), 'tool.log should include target');
      assert.ok(content.includes('exit:0'), 'tool.log should include exit code');
    });

    it('JSONL entry should have ts, tool, target, exit fields', () => {
      teardownTestDir();
      setupTestDir();
      const input = JSON.stringify({
        tool_name: 'Bash',
        tool_input: { command: 'npm test' },
        exit_code: 1,
      });
      runScript(TEST_DIR, input);
      const sessionsDir = path.join(TEST_DIR, '.claude', 'sessions');
      const files = fs.readdirSync(sessionsDir).filter(f => f.endsWith('.jsonl'));
      const entry = JSON.parse(fs.readFileSync(path.join(sessionsDir, files[0]), 'utf8').trim());
      assert.equal(entry.tool, 'Bash');
      assert.equal(entry.target, 'npm test');
      assert.equal(entry.exit, 1);
      // ts should be an ISO string
      assert.ok(entry.ts.includes('T'), 'ts should be ISO format');
    });
  });

  describe('with invalid JSON input', () => {
    before(() => {
      setupTestDir();
    });

    after(() => {
      teardownTestDir();
    });

    it('should handle invalid JSON gracefully (exit 0, no crash)', () => {
      const result = runScript(TEST_DIR, 'this is not valid json {{{');
      assert.equal(result.exitCode, 0, 'Should exit 0 on invalid JSON');
    });

    it('should not create files on invalid JSON', () => {
      teardownTestDir();
      setupTestDir();
      runScript(TEST_DIR, '<<<not json>>>');
      const sessionsDir = path.join(TEST_DIR, '.claude', 'sessions');
      // sessions directory may or may not exist — if it does, it should be empty
      if (fs.existsSync(sessionsDir)) {
        const files = fs.readdirSync(sessionsDir);
        assert.equal(files.length, 0, 'Should not create JSONL files on bad input');
      }
    });
  });

  describe('truncation behavior', () => {
    before(() => {
      setupTestDir();
    });

    after(() => {
      teardownTestDir();
    });

    it('should truncate long targets to 200 chars in JSONL', () => {
      teardownTestDir();
      setupTestDir();
      const longPath = '/very/long/' + 'a'.repeat(300) + '.ts';
      const input = JSON.stringify({
        tool_name: 'Read',
        tool_input: { file_path: longPath },
        exit_code: 0,
      });
      runScript(TEST_DIR, input);
      const sessionsDir = path.join(TEST_DIR, '.claude', 'sessions');
      const files = fs.readdirSync(sessionsDir).filter(f => f.endsWith('.jsonl'));
      const entry = JSON.parse(fs.readFileSync(path.join(sessionsDir, files[0]), 'utf8').trim());
      assert.ok(entry.target.length <= 200, `JSONL target should be <= 200 chars, got ${entry.target.length}`);
    });

    it('should truncate long targets to 80 chars in tool.log', () => {
      teardownTestDir();
      setupTestDir();
      const longPath = '/very/long/' + 'b'.repeat(300) + '.ts';
      const input = JSON.stringify({
        tool_name: 'Read',
        tool_input: { file_path: longPath },
        exit_code: 0,
      });
      runScript(TEST_DIR, input);
      const logPath = path.join(TEST_DIR, '.claude', 'tool.log');
      const content = fs.readFileSync(logPath, 'utf8').trim();
      // The target portion between the pipes should be <= 80 chars
      const parts = content.split('|').map(p => p.trim());
      // parts: [timestamp, tool_name, target, exit:code]
      const targetInLog = parts[2];
      assert.ok(targetInLog.length <= 80, `tool.log target should be <= 80 chars, got ${targetInLog.length}`);
    });
  });
});
