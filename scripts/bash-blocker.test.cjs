/**
 * Tests for bash-blocker.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/bash-blocker.test.cjs
 *
 * This script reads JSON from stdin and blocks destructive bash commands.
 * Exit 0 = allowed, Exit 2 = blocked.
 */

const { describe, it, after } = require('node:test');
const assert = require('node:assert/strict');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCRIPT_PATH = path.join(__dirname, 'bash-blocker.cjs');
const TMP_INPUT = path.join(__dirname, '__test_bash_input.tmp');

function runWithCommand(command) {
  const input = JSON.stringify({ tool_input: { command } });
  fs.writeFileSync(TMP_INPUT, input, 'utf8');
  try {
    const output = execSync(`node "${SCRIPT_PATH}" < "${TMP_INPUT}"`, {
      encoding: 'utf8',
      timeout: 10000,
      shell: true,
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

function runWithRawStdin(raw) {
  fs.writeFileSync(TMP_INPUT, raw, 'utf8');
  try {
    const output = execSync(`node "${SCRIPT_PATH}" < "${TMP_INPUT}"`, {
      encoding: 'utf8',
      timeout: 10000,
      shell: true,
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

function cleanup() {
  if (fs.existsSync(TMP_INPUT)) fs.unlinkSync(TMP_INPUT);
}

describe('bash-blocker.cjs', () => {

  after(() => { cleanup(); });

  describe('safe commands — should be allowed (exit 0)', () => {
    it('should allow git status', () => {
      const result = runWithCommand('git status');
      assert.equal(result.exitCode, 0);
    });

    it('should allow npm install', () => {
      const result = runWithCommand('npm install');
      assert.equal(result.exitCode, 0);
    });

    it('should allow ls -la', () => {
      const result = runWithCommand('ls -la');
      assert.equal(result.exitCode, 0);
    });

    it('should allow git push (without --force)', () => {
      const result = runWithCommand('git push origin main');
      assert.equal(result.exitCode, 0);
    });

    it('should allow cat .env.example', () => {
      const result = runWithCommand('cat .env.example');
      assert.equal(result.exitCode, 0);
    });

    it('should allow node scripts/test.js', () => {
      const result = runWithCommand('node scripts/test.js');
      assert.equal(result.exitCode, 0);
    });

    it('should allow rm without -i flag', () => {
      const result = runWithCommand('rm temp.txt');
      assert.equal(result.exitCode, 0);
    });
  });

  describe('destructive commands — should be blocked (exit 2)', () => {
    it('should block DROP TABLE', () => {
      const result = runWithCommand('psql -c "DROP TABLE users"');
      assert.equal(result.exitCode, 2);
      assert.ok(result.stderr.includes('BLOCKED'), 'Should report blocked');
    });

    it('should block git push --force', () => {
      const result = runWithCommand('git push --force origin main');
      assert.equal(result.exitCode, 2);
    });

    it('should block git push -f', () => {
      const result = runWithCommand('git push -f origin main');
      assert.equal(result.exitCode, 2);
    });

    it('should block format c', () => {
      const result = runWithCommand('format c:');
      assert.equal(result.exitCode, 2);
    });

    it('should block find -delete', () => {
      const result = runWithCommand('find . -name "*.tmp" -delete');
      assert.equal(result.exitCode, 2);
    });

    it('should block truncate', () => {
      const result = runWithCommand('truncate table sessions');
      assert.equal(result.exitCode, 2);
    });

    it('should block mkfs', () => {
      const result = runWithCommand('mkfs.ext4 /dev/sda1');
      assert.equal(result.exitCode, 2);
    });

    it('should block git add .env', () => {
      const result = runWithCommand('git add .env');
      assert.equal(result.exitCode, 2);
    });

    it('should block git commit .env', () => {
      const result = runWithCommand('git commit -m "oops" .env');
      assert.equal(result.exitCode, 2);
    });

    it('should block while true loops', () => {
      const result = runWithCommand('while true; do echo loop; done');
      assert.equal(result.exitCode, 2);
    });

    it('should block while 1 loops', () => {
      const result = runWithCommand('while 1; do echo loop; done');
      assert.equal(result.exitCode, 2);
    });

    it('should block while : loops', () => {
      const result = runWithCommand('while :; do echo loop; done');
      assert.equal(result.exitCode, 2);
    });

    it('should block rm -i (interactive flag)', () => {
      const result = runWithCommand('rm -i file.txt');
      assert.equal(result.exitCode, 2);
    });

    it('should block cp -i (interactive flag)', () => {
      const result = runWithCommand('cp -i src dst');
      assert.equal(result.exitCode, 2);
    });

    it('should block mv -i (interactive flag)', () => {
      const result = runWithCommand('mv -i old new');
      assert.equal(result.exitCode, 2);
    });

    it('should block gh run watch', () => {
      const result = runWithCommand('gh run watch 12345');
      assert.equal(result.exitCode, 2);
    });

    it('should block find / (root search)', () => {
      const result = runWithCommand('find / -name "*.log"');
      assert.equal(result.exitCode, 2);
    });

    it('should not block git add .env.example', () => {
      const result = runWithCommand('git add .env.example');
      assert.equal(result.exitCode, 0);
    });
  });

  describe('invalid input', () => {
    it('should exit 0 on invalid JSON', () => {
      const result = runWithRawStdin('not json');
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 when tool_input is missing', () => {
      const result = runWithRawStdin(JSON.stringify({ other: 'data' }));
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 when command is empty', () => {
      const result = runWithCommand('');
      assert.equal(result.exitCode, 0);
    });
  });
});
