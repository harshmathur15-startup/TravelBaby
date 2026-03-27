// Session Tracker — PostToolUse hook
// Writes one-line entries to .claude/tool.log

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
  const toolName = data.tool_name || 'unknown';
  const target = (data.tool_input && (data.tool_input.file_path || data.tool_input.command || data.tool_input.pattern || '')) || '';
  const exitCode = data.exit_code || 0;

  const logTs = now.toLocaleString('sv', { timeZone: 'Asia/Kolkata' }).replace(' ', 'T');
  const logLine = `${logTs} | ${toolName} | ${target.substring(0, 80)} | exit:${exitCode}\n`;
  fs.appendFileSync('.claude/tool.log', logLine);

  process.exit(0);
});
