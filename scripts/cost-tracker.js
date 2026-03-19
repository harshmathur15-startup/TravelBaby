// Per-Session Cost Tracker — estimates token costs from tool.log activity
// Borrowed from ECC (#26). Appends to thoughts/costs.jsonl after each session.
// Usage: node scripts/cost-tracker.js
// Limitations: Claude Code hooks don't expose actual token counts.
// This estimates from tool call count and response types.

const fs = require('fs');

const TOOL_LOG = '.claude/tool.log';
const COST_FILE = 'thoughts/costs.jsonl';

if (!fs.existsSync(TOOL_LOG)) {
  console.log('No tool.log found — nothing to track.');
  process.exit(0);
}

const lines = fs.readFileSync(TOOL_LOG, 'utf8').split('\n').filter(l => l.trim());

// Group into sessions (gap > 2 hours = new session)
const sessions = [];
let current = [];
let lastTime = null;

for (const line of lines) {
  const timeMatch = line.match(/^(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2})/);
  if (!timeMatch) { current.push(line); continue; }

  const time = new Date(timeMatch[1].replace(/-/g, (m, i) => i > 9 ? ':' : m));
  if (lastTime && (time - lastTime) > 2 * 60 * 60 * 1000) {
    if (current.length > 0) sessions.push(current);
    current = [];
  }
  current.push(line);
  lastTime = time;
}
if (current.length > 0) sessions.push(current);

// Estimate cost for the latest session
const latest = sessions[sessions.length - 1] || [];
const toolCounts = {};
for (const line of latest) {
  const toolMatch = line.match(/\|\s*(\w+)\s*\|/);
  if (toolMatch) {
    toolCounts[toolMatch[1]] = (toolCounts[toolMatch[1]] || 0) + 1;
  }
}

// Rough estimate: ~500 input tokens per tool call, ~1000 output tokens per response
// Opus pricing: $15/M input, $75/M output (as of 2025)
const totalCalls = Object.values(toolCounts).reduce((a, b) => a + b, 0);
const estInputTokens = totalCalls * 500;
const estOutputTokens = totalCalls * 1000;
const estCostUsd = (estInputTokens * 15 + estOutputTokens * 75) / 1000000;

const entry = {
  date: new Date().toISOString().split('T')[0],
  tool_calls: totalCalls,
  tools: toolCounts,
  est_input_tokens: estInputTokens,
  est_output_tokens: estOutputTokens,
  est_cost_usd: Math.round(estCostUsd * 100) / 100,
  note: 'Estimates only — Claude Code does not expose actual token counts'
};

try { fs.mkdirSync('thoughts', { recursive: true }); } catch (e) {}
fs.appendFileSync(COST_FILE, JSON.stringify(entry) + '\n');
console.log('Cost estimate saved: ~$' + entry.est_cost_usd + ' (' + totalCalls + ' tool calls)');
