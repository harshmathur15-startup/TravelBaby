/**
 * Tests for search-history.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/search-history.test.cjs
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'search-history.cjs');
const TEST_DIR = path.join(__dirname, '__test_search_tmp');
const FAKE_HOME = path.join(TEST_DIR, 'fakehome');
const PROJECT_SLUG = 'test--project';
const PROJECT_DIR = path.join(FAKE_HOME, '.claude', 'projects', PROJECT_SLUG);

function runScript(args, env) {
  const extraEnv = { ...process.env, USERPROFILE: FAKE_HOME, HOME: FAKE_HOME, ...env };
  try {
    const output = execSync(`node "${SCRIPT_PATH}" ${args}`, {
      encoding: 'utf8',
      timeout: 10000,
      cwd: TEST_DIR,
      env: extraEnv,
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

function setup() {
  fs.mkdirSync(PROJECT_DIR, { recursive: true });
}

function teardown() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

function writeJsonl(filename, messages) {
  const lines = messages.map(m => JSON.stringify(m)).join('\n');
  fs.writeFileSync(path.join(PROJECT_DIR, filename), lines, 'utf8');
}

describe('search-history.cjs', () => {

  before(() => { teardown(); });
  after(() => { teardown(); });

  describe('no query provided', () => {
    before(() => { setup(); });
    after(() => { teardown(); });

    it('should exit 1 with usage message', () => {
      const result = runScript(`--project ${PROJECT_SLUG}`, {});
      assert.equal(result.exitCode, 1);
      assert.ok(
        result.stderr.includes('Usage') || result.output.includes('Usage'),
        'Should show usage'
      );
    });
  });

  describe('project directory not found', () => {
    before(() => {
      fs.mkdirSync(FAKE_HOME, { recursive: true });
    });
    after(() => { teardown(); });

    it('should exit 1 when project dir does not exist', () => {
      const result = runScript('--query hello --project nonexistent--slug', {});
      assert.equal(result.exitCode, 1);
      assert.ok(
        result.stderr.includes('not found') || result.output.includes('not found'),
        'Should report directory not found'
      );
    });
  });

  describe('no matching messages', () => {
    before(() => {
      setup();
      writeJsonl('session-abc.jsonl', [
        { message: { role: 'user', content: 'tell me about cats' } },
        { message: { role: 'assistant', content: 'cats are great' } },
      ]);
    });
    after(() => { teardown(); });

    it('should report no matches', () => {
      const result = runScript(`--query "zzz_nomatch" --project ${PROJECT_SLUG}`, {});
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('No matches'), 'Should report no matches');
    });
  });

  describe('matching messages found', () => {
    before(() => {
      setup();
      writeJsonl('session-abc12345.jsonl', [
        { message: { role: 'user', content: 'deploy the pricing page' } },
        { message: { role: 'assistant', content: 'I will deploy the pricing page now' } },
        { message: { role: 'user', content: 'thanks' } },
      ]);
    });
    after(() => { teardown(); });

    it('should find and display matching messages', () => {
      const result = runScript(`--query "pricing" --project ${PROJECT_SLUG}`, {});
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Found'), 'Should report matches found');
      assert.ok(result.output.includes('pricing'), 'Should include the matched term in output');
    });

    it('should show role labels in output', () => {
      const result = runScript(`--query "pricing" --project ${PROJECT_SLUG}`, {});
      assert.ok(result.output.includes('User') || result.output.includes('Assistant'), 'Should show role');
    });
  });

  describe('content as array of blocks', () => {
    before(() => {
      setup();
      writeJsonl('session-def67890.jsonl', [
        {
          message: {
            role: 'assistant',
            content: [
              { type: 'text', text: 'The migration script handles' },
              { type: 'text', text: ' database upgrades safely' },
            ],
          },
        },
      ]);
    });
    after(() => { teardown(); });

    it('should extract text from content array blocks', () => {
      const result = runScript(`--query "migration" --project ${PROJECT_SLUG}`, {});
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Found'), 'Should find match in array content');
      assert.ok(result.output.includes('migration'), 'Should include the term');
    });
  });

  describe('limit flag', () => {
    before(() => {
      setup();
      const messages = [];
      for (let i = 0; i < 20; i++) {
        messages.push({ message: { role: 'user', content: `searchterm message ${i}` } });
      }
      writeJsonl('session-limit1234.jsonl', messages);
    });
    after(() => { teardown(); });

    it('should respect the --limit flag', () => {
      const result = runScript(`--query "searchterm" --project ${PROJECT_SLUG} --limit 3`, {});
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Found 3'), 'Should limit to 3 results');
    });
  });

  describe('malformed JSONL lines', () => {
    before(() => {
      setup();
      const content = 'not valid json\n{"message":{"role":"user","content":"findme here"}}\n{broken\n';
      fs.writeFileSync(path.join(PROJECT_DIR, 'session-bad.jsonl'), content, 'utf8');
    });
    after(() => { teardown(); });

    it('should skip bad lines and still find valid matches', () => {
      const result = runScript(`--query "findme" --project ${PROJECT_SLUG}`, {});
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Found 1'), 'Should find 1 match despite bad lines');
    });
  });
});
