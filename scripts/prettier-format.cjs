// Prettier Format — PostToolUse hook on Edit/Write
// Auto-formats TS/TSX/JS/JSX files after edits

const { execSync } = require('child_process');

let buffer = '';
process.stdin.on('data', chunk => buffer += chunk);
process.stdin.on('end', () => {
  let data;
  try {
    data = JSON.parse(buffer);
  } catch (e) {
    process.exit(0);
  }

  const filePath = data.tool_input && (data.tool_input.file_path || '');
  if (!filePath.match(/\.(ts|tsx|js|jsx)$/)) {
    process.exit(0);
  }

  try {
    execSync('npx prettier --write ' + JSON.stringify(filePath), {
      stdio: 'ignore',
      timeout: 10000,
    });
  } catch (e) {
    // Prettier not installed or file not found — skip silently
  }

  process.exit(0);
});
