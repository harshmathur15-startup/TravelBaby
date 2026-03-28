// Session Stop Hook — saves state when session ends
// Generates: narrative handoff + structured session-state.json + cost estimate

const fs = require('fs');
const path = require('path');

const now = new Date();
const ts = now.toLocaleString('sv', { timeZone: 'Asia/Kolkata' })
  .replace(' ', 'T')
  .replace(/:/g, '-');

const dir = 'thoughts/handoffs';
try { fs.mkdirSync(dir, { recursive: true }); } catch (e) {}

// Read recent tool activity
const toolLogPath = '.claude/tool.log';
const log = fs.existsSync(toolLogPath)
  ? fs.readFileSync(toolLogPath, 'utf8').split('\n').slice(-30).join('\n')
  : 'No tool activity recorded.';

const logLines = log.split('\n').filter(l => l.trim());

// Read memory snapshot
const memPath = (function () {
  const home = process.env.HOME || process.env.USERPROFILE;
  const parts = process.cwd().replace(/\\/g, '/').split('/').filter(Boolean);
  const drive = parts[0].replace(':', '').toLowerCase();
  const rest = parts.slice(1).join('-');
  const projectKey = drive + '--' + rest;
  return home.replace(/\\/g, '/') + '/.claude/projects/' + projectKey + '/memory/MEMORY.md';
})();
const mem = fs.existsSync(memPath)
  ? fs.readFileSync(memPath, 'utf8')
  : 'No memory file found.';

// === 1. NARRATIVE HANDOFF (for humans) ===
const handoff = `# Session Handoff ${ts}

## Recent Tool Activity (last 30)
\`\`\`
${log}
\`\`\`

## MEMORY.md Snapshot
${mem}
`;
const handoffPath = path.join(dir, `handoff-${ts}.md`);
fs.writeFileSync(handoffPath, handoff);

// === 2. STRUCTURED STATE (for machines) ===
const editedFiles = logLines
  .filter(l => l.includes('Edit') || l.includes('Write'))
  .map(l => {
    const match = l.match(/(?:Edit|Write)\s*\|\s*(.+?)(?:\s*\||\s*$)/);
    return match ? match[1].trim() : null;
  })
  .filter(Boolean);

const uniqueFiles = [...new Set(editedFiles)];

const structuralPatterns = [/\.claude\/skills\//, /\.claude\/rules\//, /\.claude\/settings/, /CLAUDE\.md/];
const structuralChanges = logLines
  .filter(l => l.includes('Edit') || l.includes('Write'))
  .filter(l => structuralPatterns.some(p => p.test(l)));

// Read session type from heartbeat if available
let sessionType = 'unknown';
const sessionsDir = path.join(process.env.HOME || process.env.USERPROFILE, '.claude/signals/sessions');
try {
  const sessionFiles = fs.readdirSync(sessionsDir)
    .filter(f => f.startsWith('session-') && f.endsWith('.json'));
  for (const sf of sessionFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(sessionsDir, sf), 'utf8'));
    if (data.status === 'active' && data.sessionType) {
      sessionType = data.sessionType;
      break;
    }
  }
} catch (e) {}

const sessionState = {
  timestamp: now.toISOString(),
  sessionType,
  handoff_file: handoffPath,
  files_modified: uniqueFiles.slice(-10),
  structural_changes: structuralChanges.length,
  tool_count: logLines.length,
  last_tools: logLines.slice(-5).map(l => {
    const parts = l.split('|').map(p => p.trim());
    return { time: parts[0] || '', tool: parts[1] || '', target: parts[2] || '' };
  })
};

fs.writeFileSync(path.join(dir, 'session-state.json'), JSON.stringify(sessionState, null, 2));

// === 3. COST ESTIMATION ===
const totalCalls = logLines.length;
const estInputCost = (totalCalls * 500 * 3) / 1000000;
const estOutputCost = (totalCalls * 1000 * 15) / 1000000;
const estCost = Math.round((estInputCost + estOutputCost) * 100) / 100;

// === OUTPUT ===
const summary = [`Session saved: ${handoffPath}`];
summary.push(`Cost estimate: $${estCost} (${totalCalls} tool calls)`);

if (structuralChanges.length > 0) {
  summary.push(
    'WARNING: ' + structuralChanges.length
    + ' structural changes detected. Run /wrap to update MEMORY.md before context is lost.'
  );
}

process.stderr.write(summary.join('\n') + '\n');
