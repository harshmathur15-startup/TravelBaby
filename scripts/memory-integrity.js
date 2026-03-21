/**
 * Memory Integrity Check
 *
 * Verifies that every file indexed in MEMORY.md:
 * 1. Actually exists on disk
 * 2. Has valid frontmatter (name, description, type)
 * 3. Has non-empty content after frontmatter
 *
 * Also checks for orphaned memory files (exist on disk but not in index).
 *
 * Usage: node scripts/memory-integrity.js
 * Called by /kickoff skill at session start.
 */

const fs = require('fs');
const path = require('path');

// Auto-detect memory directory from project key, or use env var override
const MEMORY_DIR = process.env.MEMORY_DIR || (function() {
  const home = process.env.HOME || process.env.USERPROFILE;
  const cwd = process.cwd().replace(/\\/g, '/').replace(/[:]/g, '-').replace(/^-/, '');
  // Convert cwd to Claude project key format: drive letter lowercase, separators become --
  const parts = process.cwd().replace(/\\/g, '/').split('/').filter(Boolean);
  const drive = parts[0].replace(':', '').toLowerCase();
  const rest = parts.slice(1).join('-');
  const projectKey = drive + '--' + rest;
  return home.replace(/\\/g, '/') + '/.claude/projects/' + projectKey + '/memory';
})();
const INDEX_FILE = path.join(MEMORY_DIR, 'MEMORY.md');

function run() {
  if (!fs.existsSync(INDEX_FILE)) {
    console.error('FAIL: MEMORY.md not found at ' + INDEX_FILE);
    process.exit(1);
  }

  const index = fs.readFileSync(INDEX_FILE, 'utf8');
  const issues = [];
  const indexed = [];

  // Extract all file references from MEMORY.md — matches [name](filename.md) pattern
  const linkPattern = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
  let match;
  while ((match = linkPattern.exec(index)) !== null) {
    const label = match[1];
    const ref = match[2];

    // Skip absolute paths (cross-project references)
    if (ref.includes(':')) {
      const absPath = ref.replace(/\//g, '/');
      if (!fs.existsSync(absPath)) {
        issues.push({ type: 'MISSING', file: ref, detail: 'Absolute path not found' });
      }
      continue;
    }

    indexed.push(ref);
    const filePath = path.join(MEMORY_DIR, ref);

    // Check 1: File exists
    if (!fs.existsSync(filePath)) {
      issues.push({ type: 'MISSING', file: ref, detail: 'Indexed but not on disk' });
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8').trim();

    // Check 2: Non-empty
    if (!content) {
      issues.push({ type: 'EMPTY', file: ref, detail: 'File exists but is empty' });
      continue;
    }

    // Check 3: Valid frontmatter
    if (content.startsWith('---')) {
      const fmEnd = content.indexOf('---', 3);
      if (fmEnd === -1) {
        issues.push({ type: 'BAD_FRONTMATTER', file: ref, detail: 'Unclosed frontmatter' });
        continue;
      }

      const fm = content.substring(3, fmEnd);
      const hasName = /^name:/m.test(fm);
      const hasDesc = /^description:/m.test(fm);
      const hasType = /^type:/m.test(fm);

      if (!hasName || !hasDesc || !hasType) {
        const missing = [];
        if (!hasName) missing.push('name');
        if (!hasDesc) missing.push('description');
        if (!hasType) missing.push('type');
        issues.push({ type: 'INCOMPLETE_FRONTMATTER', file: ref, detail: 'Missing: ' + missing.join(', ') });
      }

      // Check for created timestamp on feedback files
      const typeMatch = fm.match(/^type:\s*(.+)/m);
      const hasCreated = /^created:/m.test(fm);
      if (typeMatch && typeMatch[1].trim() === 'feedback' && !hasCreated) {
        issues.push({ type: 'NO_TIMESTAMP', file: ref, detail: 'Feedback memory missing created date' });
      }

      // Check 4: Content after frontmatter
      const body = content.substring(fmEnd + 3).trim();
      if (!body) {
        issues.push({ type: 'NO_BODY', file: ref, detail: 'Has frontmatter but no content' });
      }

      // Check 5: Freshness — only check files that HAVE last_touched (opt-in until migration)
      // Don't flag missing last_touched — 56 files lack it and the noise drowns real issues
      const touchMatch = fm.match(/^last_touched:\s*(.+)/m);
      if (touchMatch) {
        const touched = new Date(touchMatch[1].trim());
        const daysSince = Math.floor((Date.now() - touched.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSince > 30) {
          issues.push({ type: 'STALE', file: ref, detail: 'Last touched ' + daysSince + ' days ago' });
        }
      }
    }
  }

  // Check for orphaned files (on disk but not in index)
  const filesOnDisk = fs.readdirSync(MEMORY_DIR)
    .filter(f => f.endsWith('.md') && f !== 'MEMORY.md');

  const orphaned = filesOnDisk.filter(f => !indexed.includes(f));

  // Output
  console.log('Memory Integrity Check');
  console.log('======================');
  console.log('Indexed files: ' + indexed.length);
  console.log('Files on disk: ' + filesOnDisk.length);
  console.log('Orphaned: ' + orphaned.length);
  console.log('Issues: ' + issues.length);

  if (orphaned.length > 0) {
    console.log('\nOrphaned files (on disk, not in MEMORY.md):');
    orphaned.forEach(f => console.log('  - ' + f));
  }

  if (issues.length > 0) {
    console.log('\nIssues found:');
    issues.forEach(i => console.log('  [' + i.type + '] ' + i.file + ' — ' + i.detail));
  }

  if (issues.length === 0 && orphaned.length === 0) {
    console.log('\nAll clear. Memory is healthy.');
  }

  // Exit with error if critical issues found
  const critical = issues.filter(i => i.type === 'MISSING' || i.type === 'EMPTY');
  if (critical.length > 0) {
    process.exit(1);
  }
}

run();
