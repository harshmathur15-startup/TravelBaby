/**
 * Tests for file-protection.js
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/file-protection.test.js
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { spawn } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'file-protection.js');

function runScript(filePath) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [SCRIPT_PATH], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => { stdout += data.toString(); });
    child.stderr.on('data', (data) => { stderr += data.toString(); });

    child.on('close', (code) => {
      resolve({ exitCode: code, output: stdout, stderr });
    });

    const input = JSON.stringify({ tool_input: { file_path: filePath } });
    child.stdin.write(input);
    child.stdin.end();
  });
}

describe('file-protection.js', () => {

  describe('PROTECTED_PATTERNS — should block with exit 2', () => {
    it('should exit 2 when editing .env file', async () => {
      const result = await runScript('/project/.env');
      assert.equal(result.exitCode, 2);
      assert.ok(result.stderr.includes('BLOCKED'), 'Should output BLOCKED message');
    });

    it('should exit 2 when editing .claude/settings.json', async () => {
      const result = await runScript('/project/.claude/settings.json');
      assert.equal(result.exitCode, 2);
      assert.ok(result.stderr.includes('BLOCKED'), 'Should output BLOCKED message');
    });

    it('should exit 2 when editing node_modules/ path', async () => {
      const result = await runScript('/project/node_modules/lodash/index.js');
      assert.equal(result.exitCode, 2);
      assert.ok(result.stderr.includes('BLOCKED'), 'Should output BLOCKED message');
    });

    it('should exit 2 when editing package-lock.json', async () => {
      const result = await runScript('/project/package-lock.json');
      assert.equal(result.exitCode, 2);
      assert.ok(result.stderr.includes('BLOCKED'), 'Should output BLOCKED message');
    });
  });

  describe('normal files — should allow with exit 0', () => {
    it('should exit 0 for a normal .ts file', async () => {
      const result = await runScript('/project/src/app.ts');
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 for a normal .js file', async () => {
      const result = await runScript('/project/src/utils/helper.js');
      assert.equal(result.exitCode, 0);
    });
  });

  describe('WARN_PATTERNS — should warn but allow', () => {
    it('should warn (stderr) but exit 0 for CLAUDE.md', async () => {
      const result = await runScript('/project/CLAUDE.md');
      assert.equal(result.exitCode, 0);
      assert.ok(result.stderr.includes('NOTICE'), 'Should output NOTICE warning');
      assert.ok(result.stderr.includes('CLAUDE.md'), 'Warning should mention the file');
    });

    it('should warn (stderr) but exit 0 for .claude/rules/*.md', async () => {
      const result = await runScript('/project/.claude/rules/security.md');
      assert.equal(result.exitCode, 0);
      assert.ok(result.stderr.includes('NOTICE'), 'Should output NOTICE warning');
    });
  });
});
