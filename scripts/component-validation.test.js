/**
 * Tests for component-validation.js
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/component-validation.test.js
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'component-validation.js');
const TEST_DIR = path.join(__dirname, '__test_component_tmp');

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

describe('component-validation.js', () => {

  before(() => {
    teardownTestDir();
  });

  after(() => {
    teardownTestDir();
  });

  describe('when skills directory has valid skills with frontmatter', () => {
    before(() => {
      setupTestDir();
      const skillDir = path.join(TEST_DIR, '.claude', 'skills', 'my-skill');
      fs.mkdirSync(skillDir, { recursive: true });
      fs.writeFileSync(path.join(skillDir, 'SKILL.md'), [
        '---',
        'name: my-skill',
        'description: A valid test skill',
        '---',
        '',
        'This skill does things.',
      ].join('\n'), 'utf8');
    });

    after(() => {
      teardownTestDir();
    });

    it('should pass with exit 0 and report all clear', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('all clear'), 'Should report all clear');
      assert.ok(result.output.includes('1 skills'), 'Should count 1 skill');
    });
  });

  describe('when a skill is missing SKILL.md', () => {
    before(() => {
      setupTestDir();
      const skillDir = path.join(TEST_DIR, '.claude', 'skills', 'broken-skill');
      fs.mkdirSync(skillDir, { recursive: true });
      // No SKILL.md created
    });

    after(() => {
      teardownTestDir();
    });

    it('should fail with exit 1 and report missing SKILL.md', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 1);
      assert.ok(result.output.includes('missing SKILL.md'), 'Should report missing SKILL.md');
      assert.ok(result.output.includes('broken-skill'), 'Should name the broken skill');
    });
  });

  describe('when a skill is missing frontmatter', () => {
    before(() => {
      setupTestDir();
      const skillDir = path.join(TEST_DIR, '.claude', 'skills', 'no-fm');
      fs.mkdirSync(skillDir, { recursive: true });
      fs.writeFileSync(path.join(skillDir, 'SKILL.md'), 'Just plain text, no frontmatter.\n', 'utf8');
    });

    after(() => {
      teardownTestDir();
    });

    it('should fail with exit 1 and report missing frontmatter', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 1);
      assert.ok(result.output.includes('missing frontmatter'), 'Should report missing frontmatter');
    });
  });

  describe('when a skill is missing name in frontmatter', () => {
    before(() => {
      setupTestDir();
      const skillDir = path.join(TEST_DIR, '.claude', 'skills', 'no-name');
      fs.mkdirSync(skillDir, { recursive: true });
      fs.writeFileSync(path.join(skillDir, 'SKILL.md'), [
        '---',
        'description: Has description but no name',
        '---',
        '',
        'Body content.',
      ].join('\n'), 'utf8');
    });

    after(() => {
      teardownTestDir();
    });

    it('should fail with exit 1 and report missing name', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 1);
      assert.ok(result.output.includes("missing 'name'"), 'Should report missing name field');
    });
  });

  describe('when a skill contains possible secrets', () => {
    before(() => {
      setupTestDir();
      const skillDir = path.join(TEST_DIR, '.claude', 'skills', 'leaky-skill');
      fs.mkdirSync(skillDir, { recursive: true });
      fs.writeFileSync(path.join(skillDir, 'SKILL.md'), [
        '---',
        'name: leaky-skill',
        'description: Has a secret',
        '---',
        '',
        'Use this key: sk-abcdefghijklmnopqrstuvwxyz1234567890',
      ].join('\n'), 'utf8');
    });

    after(() => {
      teardownTestDir();
    });

    it('should fail with exit 1 and detect possible secret', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 1);
      assert.ok(result.output.includes('POSSIBLE SECRET'), 'Should detect the secret pattern');
    });
  });

  describe('when no skills or agents directories exist', () => {
    before(() => {
      setupTestDir();
      // Empty directory — no .claude/skills or .claude/agents
    });

    after(() => {
      teardownTestDir();
    });

    it('should exit 0 with 0 skills and 0 agents', () => {
      const result = runScriptInDir(TEST_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('all clear'), 'Should report all clear');
      assert.ok(result.output.includes('0 skills'), 'Should count 0 skills');
      assert.ok(result.output.includes('0 agents'), 'Should count 0 agents');
    });
  });
});
