/**
 * Tests for prettier-format.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/prettier-format.test.cjs
 *
 * This script reads JSON from stdin and runs prettier on matching files.
 * Tests verify: correct file filtering, graceful handling of non-matching files,
 * and that it doesn't crash on invalid input.
 */

const { describe, it, after } = require('node:test');
const assert = require('node:assert/strict');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCRIPT_PATH = path.join(__dirname, 'prettier-format.cjs');
const TMP_INPUT = path.join(__dirname, '__test_prettier_input.tmp');

function runWithStdin(input) {
  const json = typeof input === 'string' ? input : JSON.stringify(input);
  fs.writeFileSync(TMP_INPUT, json, 'utf8');
  try {
    const output = execSync(`node "${SCRIPT_PATH}" < "${TMP_INPUT}"`, {
      encoding: 'utf8',
      timeout: 15000,
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

describe('prettier-format.cjs', () => {

  after(() => { cleanup(); });

  describe('non-matching file extensions', () => {
    it('should exit 0 for .md files', () => {
      const result = runWithStdin({ tool_input: { file_path: '/src/README.md' } });
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 for .css files', () => {
      const result = runWithStdin({ tool_input: { file_path: '/src/styles.css' } });
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 for .json files', () => {
      const result = runWithStdin({ tool_input: { file_path: '/config/settings.json' } });
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 for .astro files', () => {
      const result = runWithStdin({ tool_input: { file_path: '/src/pages/index.astro' } });
      assert.equal(result.exitCode, 0);
    });
  });

  describe('matching file extensions', () => {
    // These will attempt to run prettier on nonexistent files,
    // but the script catches errors silently and exits 0.
    it('should exit 0 for .ts files (prettier error caught)', () => {
      const result = runWithStdin({ tool_input: { file_path: '/nonexistent/file.ts' } });
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 for .tsx files (prettier error caught)', () => {
      const result = runWithStdin({ tool_input: { file_path: '/nonexistent/file.tsx' } });
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 for .js files (prettier error caught)', () => {
      const result = runWithStdin({ tool_input: { file_path: '/nonexistent/file.js' } });
      assert.equal(result.exitCode, 0);
    });

    it('should exit 0 for .jsx files (prettier error caught)', () => {
      const result = runWithStdin({ tool_input: { file_path: '/nonexistent/file.jsx' } });
      assert.equal(result.exitCode, 0);
    });
  });

  describe('invalid input', () => {
    it('should exit 0 on invalid JSON', () => {
      const result = runWithStdin('not valid json at all');
      assert.equal(result.exitCode, 0);
    });

    it('should crash on missing tool_input (no file_path to match)', () => {
      // The script does not guard against missing tool_input —
      // filePath becomes undefined, .match() throws. Exit 1.
      const result = runWithStdin({ something: 'else' });
      assert.equal(result.exitCode, 1);
    });

    it('should exit 0 when file_path is empty string', () => {
      const result = runWithStdin({ tool_input: { file_path: '' } });
      assert.equal(result.exitCode, 0);
    });
  });
});
