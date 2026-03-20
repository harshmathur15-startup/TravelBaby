// Session Tracker — PostToolUse hook (replaces inline tool.log writer)
// Writes structured JSONL to .claude/sessions/<date>.jsonl
// Also maintains backward-compatible .claude/tool.log (#gap5)

const fs = require('fs');

let buffer = '';
process.stdin.on('data', chunk => buffer += chunk);
process.stdin.on('end', () => {
  let data;
  try {
    data = JSON.parse(buffer);
  } catch (e) {
    process.exit(0);
  }

  const now = new Date();
  const date = now.toISOString().split('T')[0];

  // 1. Write structured JSONL entry
  const sessionDir = '.claude/sessions';
  try { fs.mkdirSync(sessionDir, { recursive: true }); } catch (e) {}

  const toolName = data.tool_name || 'unknown';
  const target = (data.tool_input && (data.tool_input.file_path || data.tool_input.command || data.tool_input.pattern || '')) || '';
  const exitCode = data.exit_code || 0;

  const entry = {
    ts: now.toISOString(),
    tool: toolName,
    target: target.substring(0, 200),
    exit: exitCode,
  };

  fs.appendFileSync(`${sessionDir}/${date}.jsonl`, JSON.stringify(entry) + '\n');

  // 2. Backward-compatible tool.log (one-liner)
  const logTs = now.toLocaleString('sv', { timeZone: 'Asia/Kolkata' }).replace(' ', 'T');
  const logLine = `${logTs} | ${toolName} | ${target.substring(0, 80)} | exit:${exitCode}\n`;
  fs.appendFileSync('.claude/tool.log', logLine);

  process.exit(0);
});
