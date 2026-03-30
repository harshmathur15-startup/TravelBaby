/**
 * Tests for session-stats.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/session-stats.test.cjs
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'session-stats.cjs');
const TEST_DIR = path.join(__dirname, '__test_stats_tmp');
const CLAUDE_DIR = path.join(TEST_DIR, '.claude');
const LOG_FILE = path.join(CLAUDE_DIR, 'tool.log');

function runScript(args, cwd) {
  const argStr = args ? ` ${args}` : '';
  try {
    const output = execSync(`node "${SCRIPT_PATH}"${argStr}`, {
      encoding: 'utf8',
      timeout: 10000,
      cwd: cwd || TEST_DIR,
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
  fs.mkdirSync(CLAUDE_DIR, { recursive: true });
}

function teardown() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

function writeLog(lines) {
  fs.writeFileSync(LOG_FILE, lines.join('\n') + '\n', 'utf8');
}

// The script resolves LOG_PATH relative to __dirname (scripts/), so we need
// to place the tool.log where the script expects it: scripts/../.claude/tool.log
// which is the project root. We'll run the script from the project root but
// with a custom log. Since the script hardcodes the path, we need a different
// approach: we'll temporarily create the log in the actual project .claude dir.
// Instead, let's test the internal functions by requiring the parseLine logic.

// Actually the script hardcodes LOG_PATH = path.join(__dirname, '..', '.claude', 'tool.log')
// So it always reads from the real project. We'll work with that constraint by
// testing the script from the actual project root with a temporary log file.

const REAL_LOG = path.join(__dirname, '..', '.claude', 'tool.log');
const BACKUP_LOG = path.join(__dirname, '..', '.claude', 'tool.log.bak');
const PROJECT_ROOT = path.join(__dirname, '..');

function backupLog() {
  if (fs.existsSync(REAL_LOG)) {
    fs.copyFileSync(REAL_LOG, BACKUP_LOG);
  }
}

function restoreLog() {
  if (fs.existsSync(BACKUP_LOG)) {
    fs.copyFileSync(BACKUP_LOG, REAL_LOG);
    fs.unlinkSync(BACKUP_LOG);
  } else if (fs.existsSync(REAL_LOG) && !originalLogExisted) {
    fs.unlinkSync(REAL_LOG);
  }
}

let originalLogExisted = false;

function writeRealLog(lines) {
  fs.mkdirSync(path.dirname(REAL_LOG), { recursive: true });
  fs.writeFileSync(REAL_LOG, lines.join('\n') + '\n', 'utf8');
}

describe('session-stats.cjs', () => {

  before(() => {
    originalLogExisted = fs.existsSync(REAL_LOG);
    backupLog();
  });

  after(() => {
    restoreLog();
  });

  describe('when tool.log does not exist', () => {
    before(() => {
      if (fs.existsSync(REAL_LOG)) fs.unlinkSync(REAL_LOG);
    });

    it('should exit 0 and report no log', () => {
      const result = runScript('', PROJECT_ROOT);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('No Log') || result.output.includes('No .claude/tool.log'),
        'Should report missing log');
    });
  });

  describe('with valid log entries (--all mode)', () => {
    before(() => {
      writeRealLog([
        '2026-03-28T10:00:00Z | Read | src/index.ts | exit:0',
        '2026-03-28T10:05:00Z | Edit | src/index.ts | exit:0',
        '2026-03-28T10:10:00Z | Bash | npm test | exit:1',
        '2026-03-28T10:15:00Z | Read | src/utils.ts | exit:0',
        '2026-03-28T10:20:00Z | Write | src/new.ts | exit:0',
      ]);
    });

    it('should show session stats header', () => {
      const result = runScript('--all', PROJECT_ROOT);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Session Stats'), 'Should print header');
    });

    it('should report total tool calls', () => {
      const result = runScript('--all', PROJECT_ROOT);
      assert.ok(result.output.includes('Total tool calls: 5'), 'Should count 5 calls');
    });

    it('should report errors', () => {
      const result = runScript('--all', PROJECT_ROOT);
      assert.ok(result.output.includes('Errors: 1'), 'Should report 1 error');
    });

    it('should show tool breakdown', () => {
      const result = runScript('--all', PROJECT_ROOT);
      assert.ok(result.output.includes('Tool Breakdown'), 'Should have breakdown section');
      assert.ok(result.output.includes('Read'), 'Should show Read tool');
      assert.ok(result.output.includes('Edit'), 'Should show Edit tool');
      assert.ok(result.output.includes('Bash'), 'Should show Bash tool');
    });

    it('should show most active files', () => {
      const result = runScript('--all', PROJECT_ROOT);
      assert.ok(result.output.includes('Most Active Files'), 'Should have files section');
      assert.ok(result.output.includes('src/index.ts'), 'Should show index.ts as active');
    });
  });

  describe('with --date filter', () => {
    before(() => {
      writeRealLog([
        '2026-03-27T09:00:00Z | Read | old.ts | exit:0',
        '2026-03-28T10:00:00Z | Edit | new.ts | exit:0',
        '2026-03-28T11:00:00Z | Read | new.ts | exit:0',
      ]);
    });

    it('should filter to the specified date only', () => {
      const result = runScript('--date 2026-03-28', PROJECT_ROOT);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Total tool calls: 2'), 'Should count only 2026-03-28 entries');
    });
  });

  describe('with empty log file', () => {
    before(() => {
      writeRealLog([]);
    });

    it('should report no data', () => {
      const result = runScript('--all', PROJECT_ROOT);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('No Data') || result.output.includes('No tool.log entries'),
        'Should report no data');
    });
  });

  describe('with malformed lines', () => {
    before(() => {
      writeRealLog([
        'this is not a valid log line',
        '2026-03-28T10:00:00Z | Read | file.ts | exit:0',
        'another bad line',
      ]);
    });

    it('should skip bad lines and process valid ones', () => {
      const result = runScript('--all', PROJECT_ROOT);
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Total tool calls: 1'), 'Should parse only the valid line');
    });
  });
});
