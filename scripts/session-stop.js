// Session Stop Hook — saves state when session ends
// Auto-generates handoff + cost estimate + console.log check
// Simplified from handoff-generator.js and cost-tracker.js (#gap3)

const fs = require('fs');
const path = require('path');

const now = new Date();
const ts = now.toLocaleString('sv', { timeZone: 'Asia/Kolkata' })
  .replace(' ', 'T')
  .replace(/:/g, '-');

// 1. Generate handoff file
const handoffDir = 'thoughts/handoffs';
try { fs.mkdirSync(handoffDir, { recursive: true }); } catch (e) {}

const toolLogPath = '.claude/tool.log';
let log = '';
if (fs.existsSync(toolLogPath)) {
  const lines = fs.readFileSync(toolLogPath, 'utf8').split('\n');
  log = lines.slice(-30).join('\n');
}

const handoff = [
  `# Session-End Handoff ${ts}`,
  '',
  '## Recent Activity (last 30 tool calls)',
  '```',
  log || 'No tool activity recorded.',
  '```',
  '',
].join('\n');

const handoffPath = path.join(handoffDir, `handoff-${ts}.md`);
fs.writeFileSync(handoffPath, handoff);

// 2. Cost estimation (simplified)
const logLines = log.split('\n').filter(l => l.trim());
const totalCalls = logLines.length;
// Sonnet pricing: $3/M input, $15/M output — estimate 500 in, 1000 out per call
const estInputCost = (totalCalls * 500 * 3) / 1000000;
const estOutputCost = (totalCalls * 1000 * 15) / 1000000;
const estCost = Math.round((estInputCost + estOutputCost) * 100) / 100;

try { fs.mkdirSync('thoughts', { recursive: true }); } catch (e) {}
const costEntry = JSON.stringify({
  date: now.toISOString().split('T')[0],
  tool_calls: totalCalls,
  est_cost_usd: estCost,
  source: 'session-stop',
});
fs.appendFileSync('thoughts/costs.jsonl', costEntry + '\n');

// 3. Console.log check on modified files
const editLines = logLines.filter(l => /\bEdit\b|\bWrite\b/.test(l));
const modifiedFiles = [...new Set(editLines.map(l => {
  const parts = l.split('|').map(p => p.trim());
  return parts.length >= 3 ? parts[2] : null;
}).filter(Boolean).filter(f => f.match(/\.(ts|tsx|js|jsx)$/)))];

const consoleWarnings = [];
for (const f of modifiedFiles.slice(0, 15)) {
  try {
    const content = fs.readFileSync(f, 'utf8');
    const matches = content.match(/console\.(log|debug|info)\(/g);
    if (matches) {
      consoleWarnings.push(`  ${path.basename(f)}: ${matches.length} console statement(s)`);
    }
  } catch (e) {
    // File might not exist or be unreadable
  }
}

// Output to stderr (informational)
const summary = [`Session saved: ${handoffPath}`];
summary.push(`Cost estimate: $${estCost} (${totalCalls} tool calls)`);

if (consoleWarnings.length > 0) {
  summary.push('WARNING — console statements in modified files:');
  summary.push(...consoleWarnings);
}

process.stderr.write(summary.join('\n') + '\n');
