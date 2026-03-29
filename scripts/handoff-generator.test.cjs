/**
 * Tests for handoff-generator.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/handoff-generator.test.js
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'handoff-generator.cjs');
const TEST_DIR = path.join(__dirname, '__test_handoff_gen_tmp');

function runScript(cwd, env = {}) {
  const fullEnv = { ...process.env, ...env };
  try {
    const stdout = execSync(`node "${SCRIPT_PATH}"`, {
      encoding: 'utf8',
      timeout: 15000,
      cwd,
      env: fullEnv,
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
}

function teardownTestDir() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

describe('handoff-generator.cjs', () => {

  before(() => {
    teardownTestDir();
  });

  after(() => {
    teardownTestDir();
  });

  describe('with tool.log and MEMORY.md present', () => {
    const memFile = path.join(TEST_DIR, 'test-memory.md');

    before(() => {
      setupTestDir();
      // Create tool.log
      const claudeDir = path.join(TEST_DIR, '.claude');
      fs.mkdirSync(claudeDir, { recursive: true });
      const lines = [];
      for (let i = 0; i < 10; i++) {
        lines.push(`2026-03-21T10:0${i}:00 | Read | /some/file-${i}.ts | exit:0`);
      }
      lines.push('2026-03-21T10:11:00 | Edit | /some/edited.ts | exit:0');
      lines.push('2026-03-21T10:12:00 | Write | /some/written.ts | exit:0');
      fs.writeFileSync(path.join(claudeDir, 'tool.log'), lines.join('\n') + '\n');

      // Create test MEMORY.md
      fs.writeFileSync(memFile, '# Test Memory\n\nSome project state.\n');
    });

    after(() => {
      teardownTestDir();
    });

    it('should create handoff markdown file', () => {
      runScript(TEST_DIR, { MEMORY_PATH: memFile });
      const handoffDir = path.join(TEST_DIR, 'thoughts', 'handoffs');
      assert.ok(fs.existsSync(handoffDir), 'handoffs directory should exist');
      const files = fs.readdirSync(handoffDir).filter(f => f.startsWith('handoff-') && f.endsWith('.md'));
      assert.ok(files.length > 0, 'Should create at least one handoff markdown');
      const content = fs.readFileSync(path.join(handoffDir, files[0]), 'utf8');
      assert.ok(content.includes('Auto-Handoff'), 'Should include Auto-Handoff header');
      assert.ok(content.includes('Recent Tool Activity'), 'Should include tool activity section');
      assert.ok(content.includes('MEMORY.md Snapshot'), 'Should include memory snapshot section');
    });

    it('should create session-state.json with valid JSON', () => {
      runScript(TEST_DIR, { MEMORY_PATH: memFile });
      const statePath = path.join(TEST_DIR, 'thoughts', 'handoffs', 'session-state.json');
      assert.ok(fs.existsSync(statePath), 'session-state.json should exist');
      const content = fs.readFileSync(statePath, 'utf8');
      let parsed;
      assert.doesNotThrow(() => { parsed = JSON.parse(content); }, 'Should be valid JSON');
    });

    it('session-state.json should contain expected fields', () => {
      runScript(TEST_DIR, { MEMORY_PATH: memFile });
      const statePath = path.join(TEST_DIR, 'thoughts', 'handoffs', 'session-state.json');
      const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
      assert.ok('timestamp' in state, 'Should have timestamp field');
      assert.ok('sessionType' in state, 'Should have sessionType field');
      assert.ok('files_modified' in state, 'Should have files_modified field');
      assert.ok('tool_count' in state, 'Should have tool_count field');
      assert.ok('structural_changes' in state, 'Should have structural_changes field');
      assert.ok('last_tools' in state, 'Should have last_tools field');
      assert.ok(Array.isArray(state.files_modified), 'files_modified should be an array');
      assert.ok(typeof state.tool_count === 'number', 'tool_count should be a number');
      assert.ok(state.tool_count > 0, 'tool_count should reflect log lines');
    });

    it('should include memory content in handoff', () => {
      runScript(TEST_DIR, { MEMORY_PATH: memFile });
      const handoffDir = path.join(TEST_DIR, 'thoughts', 'handoffs');
      const files = fs.readdirSync(handoffDir).filter(f => f.startsWith('handoff-') && f.endsWith('.md'));
      const content = fs.readFileSync(path.join(handoffDir, files[files.length - 1]), 'utf8');
      assert.ok(content.includes('Test Memory'), 'Should include memory content');
    });

    it('should append to tool.log', () => {
      const logBefore = fs.readFileSync(path.join(TEST_DIR, '.claude', 'tool.log'), 'utf8');
      runScript(TEST_DIR, { MEMORY_PATH: memFile });
      const logAfter = fs.readFileSync(path.join(TEST_DIR, '.claude', 'tool.log'), 'utf8');
      assert.ok(logAfter.length > logBefore.length, 'tool.log should grow after run');
      assert.ok(logAfter.includes('PRE-COMPACT'), 'Should log PRE-COMPACT entry');
    });
  });

  describe('when tool.log is missing', () => {
    before(() => {
      setupTestDir();
      // No .claude directory
    });

    after(() => {
      teardownTestDir();
    });

    it('should handle missing tool.log gracefully when .claude dir exists', () => {
      // .claude dir exists but tool.log does not — script reads "no tool.log" fallback
      const claudeDir = path.join(TEST_DIR, '.claude');
      fs.mkdirSync(claudeDir, { recursive: true });
      const memFile = path.join(TEST_DIR, 'mem.md');
      fs.writeFileSync(memFile, '# Mem\n');
      const result = runScript(TEST_DIR, { MEMORY_PATH: memFile });
      assert.equal(result.exitCode, 0, 'Should exit cleanly when .claude dir exists but tool.log is absent');
    });

    it('should still create handoff file when tool.log is missing', () => {
      teardownTestDir();
      setupTestDir();
      // Ensure .claude dir exists for appendFileSync at end of script
      fs.mkdirSync(path.join(TEST_DIR, '.claude'), { recursive: true });
      const memFile = path.join(TEST_DIR, 'mem.md');
      fs.writeFileSync(memFile, '# Mem\n');
      runScript(TEST_DIR, { MEMORY_PATH: memFile });
      const handoffDir = path.join(TEST_DIR, 'thoughts', 'handoffs');
      assert.ok(fs.existsSync(handoffDir), 'handoffs directory should exist');
      const files = fs.readdirSync(handoffDir).filter(f => f.startsWith('handoff-'));
      assert.ok(files.length > 0, 'Should create handoff even without tool.log');
    });
  });

  describe('when MEMORY.md is missing', () => {
    before(() => {
      setupTestDir();
      const claudeDir = path.join(TEST_DIR, '.claude');
      fs.mkdirSync(claudeDir, { recursive: true });
      fs.writeFileSync(path.join(claudeDir, 'tool.log'), '2026-03-21T10:00:00 | Read | /f.ts | exit:0\n');
    });

    after(() => {
      teardownTestDir();
    });

    it('should handle missing MEMORY.md via MEMORY_PATH override', () => {
      const fakePath = path.join(TEST_DIR, 'nonexistent-memory.md');
      const result = runScript(TEST_DIR, { MEMORY_PATH: fakePath });
      assert.ok(result.exitCode === 0 || result.exitCode === null, 'Should not crash');
    });

    it('should include "no memory" fallback in handoff', () => {
      teardownTestDir();
      setupTestDir();
      const claudeDir = path.join(TEST_DIR, '.claude');
      fs.mkdirSync(claudeDir, { recursive: true });
      fs.writeFileSync(path.join(claudeDir, 'tool.log'), '2026-03-21T10:00:00 | Read | /f.ts | exit:0\n');
      const fakePath = path.join(TEST_DIR, 'nonexistent-memory.md');
      runScript(TEST_DIR, { MEMORY_PATH: fakePath });
      const handoffDir = path.join(TEST_DIR, 'thoughts', 'handoffs');
      const files = fs.readdirSync(handoffDir).filter(f => f.startsWith('handoff-') && f.endsWith('.md'));
      const content = fs.readFileSync(path.join(handoffDir, files[0]), 'utf8');
      assert.ok(content.includes('no memory'), 'Should include "no memory" fallback');
    });
  });
});
