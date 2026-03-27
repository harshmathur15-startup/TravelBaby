/**
 * Tests for memory-integrity.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/memory-integrity.test.js
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'memory-integrity.cjs');

// Create a temporary directory structure for isolated testing
const TEST_DIR = path.join(__dirname, '__test_memory_tmp');
const TEST_MEMORY_DIR = path.join(TEST_DIR, 'memory');

function runScript(memoryDir) {
  try {
    const output = execSync(`node "${SCRIPT_PATH}"`, {
      env: { ...process.env, MEMORY_DIR: memoryDir },
      encoding: 'utf8',
      timeout: 10000,
    });
    return { exitCode: 0, output };
  } catch (err) {
    return { exitCode: err.status, output: err.stdout || '', stderr: err.stderr || '' };
  }
}

function setupMemoryDir() {
  fs.mkdirSync(TEST_MEMORY_DIR, { recursive: true });
}

function teardownMemoryDir() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

function writeMemoryIndex(content) {
  fs.writeFileSync(path.join(TEST_MEMORY_DIR, 'MEMORY.md'), content, 'utf8');
}

function writeMemoryFile(firtame, content) {
  fs.writeFileSync(path.join(TEST_MEMORY_DIR, firtame), content, 'utf8');
}

describe('memory-integrity.cjs', () => {

  before(() => {
    teardownMemoryDir();
  });

  after(() => {
    teardownMemoryDir();
  });

  describe('when MEMORY.md is missing', () => {
    it('exits with code 1 and reports FAIL', () => {
      const nonexistent = path.join(TEST_DIR, 'no_such_dir');
      const result = runScript(nonexistent);
      assert.equal(result.exitCode, 1);
      assert.ok(
        result.stderr.includes('FAIL') || result.output.includes('FAIL'),
        'Should report FAIL when MEMORY.md is missing'
      );
    });
  });

  describe('when MEMORY.md exists with no links', () => {
    before(() => {
      setupMemoryDir();
      writeMemoryIndex('# Memory\n\nNo links here.\n');
    });

    after(() => {
      teardownMemoryDir();
    });

    it('exits with code 0 and shows healthy output', () => {
      const result = runScript(TEST_MEMORY_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Memory Integrity Check'), 'Should print header');
      assert.ok(result.output.includes('Indexed files: 0'), 'Should report 0 indexed files');
      assert.ok(result.output.includes('All clear'), 'Should report all clear');
    });
  });

  describe('when MEMORY.md references a file that exists with valid frontmatter', () => {
    before(() => {
      setupMemoryDir();
      writeMemoryIndex('# Memory\n\n- [Test File](test_file.md) -- a test\n');
      writeMemoryFile('test_file.md', [
        '---',
        'name: test_file',
        'description: A test memory file',
        'type: test',
        '---',
        '',
        'This is the body content.',
      ].join('\n'));
    });

    after(() => {
      teardownMemoryDir();
    });

    it('exits with code 0 and reports 1 indexed file', () => {
      const result = runScript(TEST_MEMORY_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Indexed files: 1'), 'Should find 1 indexed file');
      assert.ok(result.output.includes('Issues: 0'), 'Should report 0 issues');
    });
  });

  describe('when MEMORY.md references a missing file', () => {
    before(() => {
      setupMemoryDir();
      writeMemoryIndex('# Memory\n\n- [Ghost](ghost_file.md) -- does not exist\n');
    });

    after(() => {
      teardownMemoryDir();
    });

    it('exits with code 1 and reports MISSING issue', () => {
      const result = runScript(TEST_MEMORY_DIR);
      assert.equal(result.exitCode, 1);
      assert.ok(result.output.includes('[MISSING]'), 'Should flag missing file');
      assert.ok(result.output.includes('ghost_file.md'), 'Should name the missing file');
    });
  });

  describe('when an orphaned file exists on disk but not in index', () => {
    before(() => {
      setupMemoryDir();
      writeMemoryIndex('# Memory\n\nNo links.\n');
      writeMemoryFile('orphan.md', '---\nname: orphan\ndescription: lost\ntype: test\n---\nBody.\n');
    });

    after(() => {
      teardownMemoryDir();
    });

    it('exits with code 0 and reports orphaned file', () => {
      const result = runScript(TEST_MEMORY_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Orphaned: 1'), 'Should detect 1 orphan');
      assert.ok(result.output.includes('orphan.md'), 'Should name the orphaned file');
    });
  });

  describe('when a file has incomplete frontmatter', () => {
    before(() => {
      setupMemoryDir();
      writeMemoryIndex('# Memory\n\n- [Bad FM](bad_fm.md) -- incomplete\n');
      writeMemoryFile('bad_fm.md', '---\nname: bad\n---\nSome body.\n');
    });

    after(() => {
      teardownMemoryDir();
    });

    it('reports INCOMPLETE_FRONTMATTER but exits 0 (non-critical)', () => {
      const result = runScript(TEST_MEMORY_DIR);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('[INCOMPLETE_FRONTMATTER]'), 'Should flag incomplete frontmatter');
      assert.ok(result.output.includes('description'), 'Should name missing fields');
    });
  });

  describe('when a file is empty', () => {
    before(() => {
      setupMemoryDir();
      writeMemoryIndex('# Memory\n\n- [Empty](empty.md) -- empty file\n');
      writeMemoryFile('empty.md', '');
    });

    after(() => {
      teardownMemoryDir();
    });

    it('exits with code 1 and reports EMPTY issue', () => {
      const result = runScript(TEST_MEMORY_DIR);
      assert.equal(result.exitCode, 1);
      assert.ok(result.output.includes('[EMPTY]'), 'Should flag empty file');
    });
  });

  describe('output format', () => {
    before(() => {
      setupMemoryDir();
      writeMemoryIndex('# Memory\n\nNo links.\n');
    });

    after(() => {
      teardownMemoryDir();
    });

    it('prints expected header and summary lines', () => {
      const result = runScript(TEST_MEMORY_DIR);
      const lines = result.output.split('\n');
      assert.ok(lines[0].includes('Memory Integrity Check'), 'First line is header');
      assert.ok(lines[1].includes('====='), 'Second line is separator');
      assert.ok(lines.some(l => l.startsWith('Indexed files:')), 'Has indexed count');
      assert.ok(lines.some(l => l.startsWith('Files on disk:')), 'Has disk count');
      assert.ok(lines.some(l => l.startsWith('Orphaned:')), 'Has orphan count');
      assert.ok(lines.some(l => l.startsWith('Issues:')), 'Has issues count');
    });
  });
});
