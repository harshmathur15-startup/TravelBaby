// Session Stop Hook — cost estimate
// Console.log detection handled by quality-gate.cjs (PostToolUse)

const fs = require('fs');

const now = new Date();

const toolLogPath = '.claude/tool.log';
let log = '';
if (fs.existsSync(toolLogPath)) {
  const lines = fs.readFileSync(toolLogPath, 'utf8').split('\n');
  log = lines.slice(-30).join('\n');
}

// Cost estimation
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

process.stderr.write(`Cost estimate: $${estCost} (${totalCalls} tool calls)\n`);
