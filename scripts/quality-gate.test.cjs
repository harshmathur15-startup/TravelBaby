/**
 * Tests for quality-gate.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/quality-gate.test.js
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { fork } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'quality-gate.cjs');
const TEST_DIR = path.join(__dirname, '__test_quality_tmp');

function runScript(filePath) {
  return new Promise((resolve) => {
    const child = fork(SCRIPT_PATH, [], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
      silent: true,
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

function runScriptWithInput(inputObj) {
  return new Promise((resolve) => {
    const child = fork(SCRIPT_PATH, [], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
      silent: true,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => { stdout += data.toString(); });
    child.stderr.on('data', (data) => { stderr += data.toString(); });

    child.on('close', (code) => {
      resolve({ exitCode: code, output: stdout, stderr });
    });

    child.stdin.write(JSON.stringify(inputObj));
    child.stdin.end();
  });
}

describe('quality-gate.cjs', () => {

  before(() => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
  });

  after(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  describe('non-TS files — should exit 0 immediately', () => {
    it('should exit 0 for .js file', async () => {
      const result = await runScript('/project/src/helper.js');
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 for .md file', async () => {
      const result = await runScript('/project/README.md');
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 for .json file', async () => {
      const result = await runScript('/project/package.json');
      assert.equal(result.exitCode, 0);
    });
  });

  describe('TS files — should exit 0 (warns but does not block)', () => {
    it('should exit 0 for .ts file even if tsc is unavailable', async () => {
      const testFile = path.join(TEST_DIR, 'test.ts');
      fs.writeFileSync(testFile, 'const x: string = "hello";\n', 'utf8');
      const result = await runScript(testFile);
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 for .tsx file', async () => {
      const testFile = path.join(TEST_DIR, 'test.tsx');
      fs.writeFileSync(testFile, 'const App = () => <div />;\n', 'utf8');
      const result = await runScript(testFile);
      assert.equal(result.exitCode, 0);
    });
  });

  describe('missing file_path', () => {
    it('should handle missing file_path gracefully', async () => {
      const result = await runScriptWithInput({ tool_input: {} });
      // Empty string does not match .ts/.tsx, so exits 0
      assert.equal(result.exitCode, 0);
    });
  });

  describe('console.log detection', () => {
    it('should warn about console.log in TS file via stderr', async () => {
      const testFile = path.join(TEST_DIR, 'noisy.ts');
      fs.writeFileSync(testFile, 'const x = 1;\nconsole.log("debug");\nconsole.debug("test");\n', 'utf8');
      const result = await runScript(testFile);
      assert.equal(result.exitCode, 0);
      assert.ok(result.stderr.includes('WARNING'), 'Should warn about console statements');
      assert.ok(result.stderr.includes('2 console statement'), 'Should count both console calls');
    });
  });
});
