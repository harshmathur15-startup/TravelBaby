/**
 * Drift Check — Generic Rule File Integrity
 *
 * Computes SHA-256 hashes of protected project files and detects
 * unauthorized changes between sessions.
 *
 * Protected files are defined in .claude/protected-files.json.
 * Each project configures its own list after cloning.
 *
 * Modes:
 *   capture — save current hashes as the known-good baseline
 *   verify  — compare current hashes against baseline, flag drift
 *
 * Usage:
 *   node scripts/drift-check.js capture
 *   node scripts/drift-check.js verify
 *
 * Exit codes:
 *   0 — all clear (or capture succeeded)
 *   1 — configuration error
 *   2 — drift detected
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const projectRoot = path.resolve(__dirname, '..');
const CONFIG_FILE = path.join(projectRoot, '.claude', 'protected-files.json');
const BASELINE_FILE = path.join(projectRoot, '.claude', 'drift-baseline.json');

function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error('No protected-files.json found at .claude/protected-files.json');
    console.error('Create one with a "files" array of {key, path} entries.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
}

function resolvePath(filePath) {
  if (path.isAbsolute(filePath)) return filePath;
  return path.resolve(projectRoot, filePath);
}

function hashFile(filePath) {
  const resolved = resolvePath(filePath);
  if (!fs.existsSync(resolved)) {
    return { exists: false, hash: null };
  }
  const content = fs.readFileSync(resolved, 'utf8');
  return {
    exists: true,
    hash: crypto.createHash('sha256').update(content).digest('hex'),
  };
}

function capture() {
  const config = loadConfig();
  const checksums = {};
  const timestamp = new Date().toISOString();

  for (const entry of config.files) {
    const result = hashFile(entry.path);
    if (result.exists) {
      checksums[entry.key] = {
        hash: result.hash,
        path: entry.path,
        captured: timestamp,
      };
    }
  }

  const output = {
    version: 1,
    captured: timestamp,
    fileCount: Object.keys(checksums).length,
    checksums,
  };

  fs.writeFileSync(BASELINE_FILE, JSON.stringify(output, null, 2));
  console.log('Drift Check — Baseline Captured');
  console.log('===============================');
  console.log('Files hashed: ' + output.fileCount);
  console.log('Config: .claude/protected-files.json');
  console.log('Baseline: .claude/drift-baseline.json');
  console.log('Timestamp: ' + timestamp);
}

function verify() {
  if (!fs.existsSync(BASELINE_FILE)) {
    console.log('Drift Check — No Baseline');
    console.log('=========================');
    console.log('Run "node scripts/drift-check.js capture" first.');
    process.exit(1);
  }

  const config = loadConfig();
  const baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
  const drifted = [];
  const missing = [];
  const added = [];
  const unchanged = [];

  for (const entry of config.files) {
    const current = hashFile(entry.path);
    const saved = baseline.checksums[entry.key];

    if (!saved) {
      if (current.exists) added.push(entry.key);
      continue;
    }

    if (!current.exists) {
      missing.push(entry.key);
      continue;
    }

    if (current.hash !== saved.hash) {
      drifted.push(entry.key);
    } else {
      unchanged.push(entry.key);
    }
  }

  console.log('Drift Check — Verification');
  console.log('==========================');
  console.log('Baseline from: ' + baseline.captured);
  console.log('Files checked: ' + (drifted.length + missing.length + unchanged.length));
  console.log('Unchanged: ' + unchanged.length);
  console.log('Drifted: ' + drifted.length);
  console.log('Missing: ' + missing.length);
  if (added.length > 0) console.log('New (not in baseline): ' + added.length);

  if (drifted.length > 0) {
    console.log('\nDRIFT DETECTED:');
    drifted.forEach(f => console.log('  ! ' + f + ' — hash changed since baseline'));
  }

  if (missing.length > 0) {
    console.log('\nMISSING FILES:');
    missing.forEach(f => console.log('  x ' + f + ' — existed at baseline, gone now'));
  }

  if (drifted.length === 0 && missing.length === 0) {
    console.log('\nNo drift detected. All files intact.');
  }

  if (drifted.length > 0 || missing.length > 0) {
    process.exit(2);
  }
}

// CLI
const mode = process.argv[2];
if (mode === 'capture') {
  capture();
} else if (mode === 'verify') {
  verify();
} else {
  console.log('Usage: node scripts/drift-check.js <capture|verify>');
  console.log('  capture — save current file hashes as baseline');
  console.log('  verify  — compare current files against baseline');
  console.log('\nProtected files configured in .claude/protected-files.json');
  process.exit(1);
}
