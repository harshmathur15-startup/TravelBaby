// Quality Gate Hook — PostToolUse on Edit/Write
// Runs typecheck + console.log warning + file length check after every edit.

const { execSync } = require('child_process');
const fs = require('fs');

const FILE_LIMIT = 300;
const COMPONENT_LIMIT = 200;

let buffer = '';
process.stdin.on('data', chunk => buffer += chunk);
process.stdin.on('end', () => {
  const data = JSON.parse(buffer);
  const filePath = data.tool_input && (data.tool_input.file_path || '');

  if (!filePath.match(/\.(ts|tsx|js|jsx|astro)$/)) {
    process.exit(0);
  }

  // Check 1: File length enforcement
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lineCount = content.split('\n').length;
    const isComponent = /components\//.test(filePath) || filePath.match(/\.(tsx|astro)$/);
    const limit = isComponent ? COMPONENT_LIMIT : FILE_LIMIT;

    if (lineCount > limit) {
      process.stderr.write('WARNING: ' + filePath.split(/[/\\]/).pop() + ' is ' + lineCount + ' lines (limit: ' + limit + ') — consider splitting.\n');
    }

    // Check 2: console.log detection (skip scripts/ — they use stdout as output channel)
    if (!filePath.includes('scripts/')) {
      const consoleMatches = content.match(/console\.(log|debug|info)\(/g);
      if (consoleMatches && consoleMatches.length > 0) {
        process.stderr.write('WARNING: ' + consoleMatches.length + ' console statement(s) in ' + filePath.split(/[/\\]/).pop() + ' — remove before commit.\n');
      }
    }
  } catch (e) {
    // File might not exist yet or be unreadable — skip
  }

  // Check 3: TypeScript errors (skip .astro and .js/.jsx files)
  if (filePath.match(/\.(ts|tsx)$/)) {
    try {
      const normalizedPath = filePath.replace(/\\/g, '/');
      execSync('npx tsc --noEmit --pretty "' + normalizedPath + '" 2>&1', {
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: 10000
      });
    } catch (e) {
      const output = (e.stdout || '').toString();
      const fileErrors = output.split('\n').filter(l => l.includes(filePath.replace(/\\/g, '/')));
      if (fileErrors.length > 0) {
        process.stderr.write('TYPE ERROR in ' + filePath.split(/[/\\]/).pop() + ':\n' + fileErrors.slice(0, 3).join('\n') + '\n');
      }
    }
  }

  process.exit(0);
});
