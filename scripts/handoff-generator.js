// Handoff Generator — PreCompact hook
// Generates two files:
// 1. thoughts/handoffs/handoff-<timestamp>.md — narrative handoff for humans
// 2. thoughts/handoffs/session-state.json — structured state for machines

const fs = require('fs');
const path = require('path');

const ts = new Date().toLocaleString('sv', { timeZone: 'Asia/Kolkata' })
  .replace(' ', 'T').replace(/[:.]/g, '-');

const dir = 'thoughts/handoffs';
try { fs.mkdirSync(dir, { recursive: true }); } catch (e) {}

// Read recent tool activity
const toolLogPath = '.claude/tool.log';
const log = fs.existsSync(toolLogPath)
  ? fs.readFileSync(toolLogPath, 'utf8').split('\n').slice(-30).join('\n')
  : 'no tool.log';

// Read memory snapshot
// Auto-detect memory path from project key, or use env var override
const memPath = process.env.MEMORY_PATH || (function() {
  const home = process.env.HOME || process.env.USERPROFILE;
  const parts = process.cwd().replace(/\\/g, '/').split('/').filter(Boolean);
  const drive = parts[0].replace(':', '').toLowerCase();
  const rest = parts.slice(1).join('-');
  const projectKey = drive + '--' + rest;
  return home.replace(/\\/g, '/') + '/.claude/projects/' + projectKey + '/memory/MEMORY.md';
})();
const mem = fs.existsSync(memPath)
  ? fs.readFileSync(memPath, 'utf8')
  : 'no memory';

// === NARRATIVE HANDOFF (for humans) ===
const handoff = `# Auto-Handoff ${ts}

## Recent Tool Activity (last 30)
\`\`\`
${log}
\`\`\`

## MEMORY.md Snapshot
${mem}
`;
fs.writeFileSync(`${dir}/handoff-${ts}.md`, handoff);

// === STRUCTURED STATE (for machines) ===
// Extract what we can from tool.log
const logLines = log.split('\n').filter(l => l.trim());
const editedFiles = logLines
  .filter(l => l.includes('Edit') || l.includes('Write'))
  .map(l => {
    const match = l.match(/(?:Edit|Write)\s*\|\s*(.+?)(?:\s*\||\s*$)/);
    return match ? match[1].trim() : null;
  })
  .filter(Boolean);

const uniqueFiles = [...new Set(editedFiles)];

// Detect structural changes
const structuralPatterns = [/\.claude\/skills\//, /\.claude\/rules\//, /\.claude\/settings/, /CLAUDE\.md/];
const structuralChanges = logLines
  .filter(l => l.includes('Edit') || l.includes('Write'))
  .filter(l => structuralPatterns.some(p => p.test(l)));

// Read session type from heartbeat if available
let sessionType = 'unknown';
const sessionsDir = path.join(process.env.HOME || process.env.USERPROFILE, '.claude/signals/sessions');
try {
  const sessionFiles = fs.readdirSync(sessionsDir).filter(f => f.startsWith('session-') && f.endsWith('.json'));
  for (const sf of sessionFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(sessionsDir, sf), 'utf8'));
    if (data.status === 'active' && data.sessionType) {
      sessionType = data.sessionType;
      break;
    }
  }
} catch (e) {}

const sessionState = {
  timestamp: new Date().toISOString(),
  sessionType,
  handoff_file: `${dir}/handoff-${ts}.md`,
  files_modified: uniqueFiles.slice(-10),
  structural_changes: structuralChanges.length,
  tool_count: logLines.length,
  last_tools: logLines.slice(-5).map(l => {
    const parts = l.split('|').map(p => p.trim());
    return { time: parts[0] || '', tool: parts[1] || '', target: parts[2] || '' };
  })
};

fs.writeFileSync(`${dir}/session-state.json`, JSON.stringify(sessionState, null, 2));

// Log the handoff
fs.appendFileSync(toolLogPath,
  new Date().toLocaleString('sv', { timeZone: 'Asia/Kolkata' }).replace(' ', 'T')
  + ' | PRE-COMPACT | handoff saved to ' + dir + '/handoff-' + ts + '.md'
  + ' + session-state.json\n'
);

// Warn about structural changes
if (structuralChanges.length > 0) {
  process.stderr.write(
    'WARNING: ' + structuralChanges.length
    + ' structural changes detected this session. Run /wrap to update MEMORY.md before context is lost.\n'
  );
}
