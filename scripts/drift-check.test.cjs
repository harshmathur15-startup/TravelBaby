/**
 * Tests for drift-check.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/drift-check.test.cjs
 *
 * The script resolves paths from __dirname/../.claude/, so tests must
 * work with the real project .claude directory. We backup and restore
 * protected-files.json and drift-baseline.json around each test group.
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'drift-check.cjs');
const PROJECT_ROOT = path.join(__dirname, '..');
const CLAUDE_DIR = path.join(PROJECT_ROOT, '.claude');
const CONFIG_FILE = path.join(CLAUDE_DIR, 'protected-files.json');
const BASELINE_FILE = path.join(CLAUDE_DIR, 'drift-baseline.json');
const CONFIG_BAK = CONFIG_FILE + '.test-bak';
const BASELINE_BAK = BASELINE_FILE + '.test-bak';

// Temp files created during tests
const TEST_FILE_A = path.join(PROJECT_ROOT, '__test_drift_a.tmp');
const TEST_FILE_B = path.join(PROJECT_ROOT, '__test_drift_b.tmp');

let configExisted = false;
let baselineExisted = false;

function backupFiles() {
  configExisted = fs.existsSync(CONFIG_FILE);
  baselineExisted = fs.existsSync(BASELINE_FILE);
  if (configExisted) fs.copyFileSync(CONFIG_FILE, CONFIG_BAK);
  if (baselineExisted) fs.copyFileSync(BASELINE_FILE, BASELINE_BAK);
}

function restoreFiles() {
  if (configExisted) {
    fs.copyFileSync(CONFIG_BAK, CONFIG_FILE);
    fs.unlinkSync(CONFIG_BAK);
  } else if (fs.existsSync(CONFIG_FILE)) {
    fs.unlinkSync(CONFIG_FILE);
  }
  if (baselineExisted) {
    fs.copyFileSync(BASELINE_BAK, BASELINE_FILE);
    fs.unlinkSync(BASELINE_BAK);
  } else if (fs.existsSync(BASELINE_FILE)) {
    fs.unlinkSync(BASELINE_FILE);
  }
  // Clean up temp files
  for (const f of [TEST_FILE_A, TEST_FILE_B]) {
    if (fs.existsSync(f)) fs.unlinkSync(f);
  }
}

function writeConfig(files) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify({ files }, null, 2), 'utf8');
}

function removeConfig() {
  if (fs.existsSync(CONFIG_FILE)) fs.unlinkSync(CONFIG_FILE);
}

function removeBaseline() {
  if (fs.existsSync(BASELINE_FILE)) fs.unlinkSync(BASELINE_FILE);
}

function runScript(mode) {
  const args = mode ? ` ${mode}` : '';
  try {
    const output = execSync(`node "${SCRIPT_PATH}"${args}`, {
      encoding: 'utf8',
      timeout: 10000,
      cwd: PROJECT_ROOT,
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

describe('drift-check.cjs', () => {

  before(() => { backupFiles(); });
  after(() => { restoreFiles(); });

  describe('no arguments', () => {
    before(() => {
      writeConfig([]);
    });

    it('should exit 1 and show usage', () => {
      const result = runScript('');
      assert.equal(result.exitCode, 1);
      assert.ok(result.output.includes('Usage:'), 'Should print usage instructions');
    });
  });

  describe('capture mode', () => {
    before(() => {
      removeBaseline();
      fs.writeFileSync(TEST_FILE_A, 'hello world', 'utf8');
      writeConfig([{ key: 'test-a', path: '__test_drift_a.tmp' }]);
    });

    it('should create baseline file and exit 0', () => {
      const result = runScript('capture');
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('Baseline Captured'), 'Should confirm capture');
      assert.ok(result.output.includes('Files hashed: 1'), 'Should report 1 file hashed');
      assert.ok(fs.existsSync(BASELINE_FILE), 'Baseline file should exist');
    });

    it('should store valid JSON with checksums', () => {
      runScript('capture');
      const baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
      assert.equal(baseline.version, 1);
      assert.equal(baseline.fileCount, 1);
      assert.ok(baseline.checksums['test-a'], 'Should have test-a checksum');
      assert.ok(baseline.checksums['test-a'].hash, 'Should have hash value');
    });
  });

  describe('capture mode — no config file', () => {
    before(() => {
      removeConfig();
      removeBaseline();
    });

    it('should exit 1 when protected-files.json is missing', () => {
      const result = runScript('capture');
      assert.equal(result.exitCode, 1);
      assert.ok(
        result.stderr.includes('No protected-files.json') || result.output.includes('No protected-files.json'),
        'Should report missing config'
      );
    });
  });

  describe('verify mode — no baseline', () => {
    before(() => {
      writeConfig([]);
      removeBaseline();
    });

    it('should exit 1 when no baseline exists', () => {
      const result = runScript('verify');
      assert.equal(result.exitCode, 1);
      assert.ok(result.output.includes('No Baseline'), 'Should report missing baseline');
    });
  });

  describe('verify mode — no drift', () => {
    before(() => {
      fs.writeFileSync(TEST_FILE_A, 'stable content', 'utf8');
      writeConfig([{ key: 'test-a', path: '__test_drift_a.tmp' }]);
      runScript('capture');
    });

    it('should exit 0 and report no drift', () => {
      const result = runScript('verify');
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('No drift detected'), 'Should report no drift');
      assert.ok(result.output.includes('Unchanged: 1'), 'Should show 1 unchanged');
    });
  });

  describe('verify mode — drift detected', () => {
    before(() => {
      fs.writeFileSync(TEST_FILE_A, 'original', 'utf8');
      writeConfig([{ key: 'test-a', path: '__test_drift_a.tmp' }]);
      runScript('capture');
      fs.writeFileSync(TEST_FILE_A, 'modified', 'utf8');
    });

    it('should exit 2 and report drift', () => {
      const result = runScript('verify');
      assert.equal(result.exitCode, 2);
      assert.ok(result.output.includes('DRIFT DETECTED'), 'Should flag drift');
      assert.ok(result.output.includes('test-a'), 'Should name the drifted file key');
    });
  });

  describe('verify mode — missing file', () => {
    before(() => {
      fs.writeFileSync(TEST_FILE_B, 'temp', 'utf8');
      writeConfig([{ key: 'test-b', path: '__test_drift_b.tmp' }]);
      runScript('capture');
      fs.unlinkSync(TEST_FILE_B);
    });

    it('should exit 2 and report missing file', () => {
      const result = runScript('verify');
      assert.equal(result.exitCode, 2);
      assert.ok(result.output.includes('MISSING FILES'), 'Should flag missing');
      assert.ok(result.output.includes('test-b'), 'Should name the missing key');
    });
  });

  describe('verify mode — new file not in baseline', () => {
    before(() => {
      fs.writeFileSync(TEST_FILE_A, 'old', 'utf8');
      writeConfig([{ key: 'test-a', path: '__test_drift_a.tmp' }]);
      runScript('capture');
      // Add a new entry to config after capture
      fs.writeFileSync(TEST_FILE_B, 'new', 'utf8');
      writeConfig([
        { key: 'test-a', path: '__test_drift_a.tmp' },
        { key: 'test-b', path: '__test_drift_b.tmp' },
      ]);
    });

    it('should report new file and exit 0', () => {
      const result = runScript('verify');
      assert.equal(result.exitCode, 0);
      assert.ok(result.output.includes('New (not in baseline): 1'), 'Should report 1 new file');
    });
  });
});
