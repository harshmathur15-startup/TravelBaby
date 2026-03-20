// Quality Gate Hook — PostToolUse on Edit/Write
// Runs typecheck + console.log warning after every TS/TSX edit.
// Borrowed from ECC's automated quality gates (#20)
// Template already has prettier via inline hook — this adds typecheck + console.log detection.

const { execSync } = require('child_process');
const fs = require('fs');

let buffer = '';
process.stdin.on('data', chunk => buffer += chunk);
process.stdin.on('end', () => {
  const data = JSON.parse(buffer);
  const filePath = data.tool_input && (data.tool_input.file_path || '');

  if (!filePath.match(/\.(ts|tsx)$/)) {
    process.exit(0);
  }

  // Check 1: TypeScript errors on the edited file
  try {
    const normalizedPath = filePath.replace(/\\/g, '/');
    execSync('npx tsc --noEmit --pretty "' + normalizedPath + '" 2>&1', {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 10000
    });
  } catch (e) {
    const output = (e.stdout || '').toString();
    // Only warn about errors in the specific file edited
    const fileErrors = output.split('\n').filter(l => l.includes(filePath.replace(/\\/g, '/')));
    if (fileErrors.length > 0) {
      process.stderr.write('TYPE ERROR in ' + filePath.split(/[/\\]/).pop() + ':\n' + fileErrors.slice(0, 3).join('\n') + '\n');
    }
  }

  // Check 2: console.log detection in the edited file
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
