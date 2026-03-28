// Session Start Hook — auto-loads project context at session begin
// Lightweight version of /kickoff — loads handoff + git state only

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Find most recent handoff
const handoffDir = 'thoughts/handoffs';
let lastHandoff = 'No previous handoff found.';
if (fs.existsSync(handoffDir)) {
  const files = fs.readdirSync(handoffDir)
    .filter(f => f.startsWith('handoff-') && f.endsWith('.md'))
    .sort()
    .reverse();
  if (files.length > 0) {
    try {
      const content = fs.readFileSync(path.join(handoffDir, files[0]), 'utf8');
      lastHandoff = content.split('\n').slice(0, 15).join('\n');
    } catch (e) {
      lastHandoff = 'Could not read handoff file.';
    }
  }
}

// 2. Recent git log (5 entries, one-line format)
let gitLog = 'git not available';
try {
  gitLog = execSync('git log --oneline -5 2>/dev/null', {
    encoding: 'utf8',
    timeout: 5000,
  }).trim();
} catch (e) {
  // git not available or not a repo
}

// 3. Git status (short format)
let gitStatus = 'git not available';
try {
  gitStatus = execSync('git status --short 2>/dev/null', {
    encoding: 'utf8',
    timeout: 5000,
  }).trim();
  if (!gitStatus) gitStatus = 'Working tree clean';
} catch (e) {
  // git not available
}

// Output to stdout — appears in conversation context
const brief = [
  '--- Session Context (auto-loaded) ---',
  'Recent commits:',
  gitLog.split('\n').slice(0, 5).map(l => '  ' + l).join('\n'),
  'Working tree: ' + gitStatus.split('\n').slice(0, 5).join(', '),
  'Last handoff:',
  lastHandoff,
  '---',
].join('\n');

process.stdout.write(brief);
