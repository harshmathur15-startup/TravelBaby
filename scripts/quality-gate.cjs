// Quality Gate Hook — PostToolUse on Edit/Write
// Detects console.log statements in modified TS/TSX files

const fs = require('fs');

let buffer = '';
process.stdin.on('data', chunk => buffer += chunk);
process.stdin.on('end', () => {
  const data = JSON.parse(buffer);
  const filePath = data.tool_input && (data.tool_input.file_path || '');

  if (!filePath.match(/\.(ts|tsx|js|jsx)$/)) {
    process.exit(0);
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const consoleMatches = content.match(/console\.(log|debug|info)\(/g);
    if (consoleMatches && consoleMatches.length > 0) {
      process.stderr.write('WARNING: ' + consoleMatches.length + ' console statement(s) in ' + filePath.split(/[/\\]/).pop() + ' — remove before commit.\n');
    }
  } catch (e) {
    // File might not exist yet or be unreadable — skip
  }

  process.exit(0);
});
