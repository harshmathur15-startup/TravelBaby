/**
 * Tests for session-start.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/session-start.test.cjs
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'session-start.cjs');
const TEST_DIR = path.join(__dirname, '__test_session_tmp');

function runScriptInDir(cwd) {
  try {
    const output = execSync(`node "${SCRIPT_PATH}"`, {
      encoding: 'utf8',
      timeout: 15000,
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

describe('session-start.cjs', () => {

  before(() => {
    teardownTestDir();
  });

  after(() => {
    teardownTestDir();
  });

  describe('when run in the project root (git repo)', () => {
    it('should output session context to stdout', () => {
      const result = runScriptInDir(path.join(__dirname, '..'));
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.length > 0, 'Should produce output');
    });

    it('should include Session Context header in output', () => {
      const result = runScriptInDir(path.join(__dirname, '..'));
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Session Context'), 'Should include Session Context header');
    });

    it('should include Recent commits section', () => {
      const result = runScriptInDir(path.join(__dirname, '..'));
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Recent commits'), 'Should include Recent commits section');
    });

    it('should include Working tree section', () => {
      const result = runScriptInDir(path.join(__dirname, '..'));
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Working tree'), 'Should include Working tree section');
    });

    it('should include Last handoff section', () => {
      const result = runScriptInDir(path.join(__dirname, '..'));
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Last handoff'), 'Should include Last handoff section');
    });
  });

  describe('when run in a temp directory (no git, no handoffs)', () => {
    before(() => {
      setupTestDir();
    });

    after(() => {
      teardownTestDir();
    });

    it('should handle missing thoughts/handoffs directory', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('No previous handoff found'), 'Should report no handoff');
    });

    it('should handle missing git (non-repo directory)', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('git not available'), 'Should report git not available');
    });

    it('should still include Session Context header', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Session Context'), 'Should include header even without git');
    });
  });

  describe('when handoff files exist', () => {
    before(() => {
      setupTestDir();
      const handoffDir = path.join(TEST_DIR, 'thoughts', 'handoffs');
      fs.mkdirSync(handoffDir, { recursive: true });
      fs.writeFileSync(
        path.join(handoffDir, 'handoff-2026-03-20.md'),
        '# Handoff 2026-03-20\n\nDid some work.\nFixed bugs.\n',
        'utf8'
      );
      fs.writeFileSync(
        path.join(handoffDir, 'handoff-2026-03-21.md'),
        '# Handoff 2026-03-21\n\nLatest session work.\nMore progress.\n',
        'utf8'
      );
    });

    after(() => {
      teardownTestDir();
    });

    it('should load the most recent handoff', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Latest session work'), 'Should show content from most recent handoff');
      assert.ok(!result.output.includes('Did some work'), 'Should not show older handoff content');
    });
  });
});
