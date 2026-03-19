// File-Pattern Protection Hook — PreToolUse on Edit/Write
// Blocks edits to protected file patterns. Configurable per project.
// Borrowed from Roo Code's file-regex permissions (#17+18+19+50)

const PROTECTED_PATTERNS = [
  /\.claude\/settings\.json$/,     // Never edit settings via AI
  /\.claude\/settings\.local\.json$/,
  /\.env$/,                         // Never write secrets
  /\.env\.local$/,
  /node_modules\//,                 // Never touch dependencies
  /package-lock\.json$/,            // Never manually edit lockfile
  /prisma\/migrations\//,           // Never manually edit migrations
];

// Patterns that require explicit confirmation (warn, don't block)
const WARN_PATTERNS = [
  /CLAUDE\.md$/,                    // Project config — changes should be deliberate
  /\.claude\/rules\//,              // Rule changes should be deliberate
  /\.claude\/skills\/.*SKILL\.md$/, // Skill definitions should be deliberate
];

let buffer = '';
process.stdin.on('data', chunk => buffer += chunk);
process.stdin.on('end', () => {
  const data = JSON.parse(buffer);
  const filePath = (data.tool_input && (data.tool_input.file_path || '')).replace(/\\/g, '/');

  const blocked = PROTECTED_PATTERNS.find(p => p.test(filePath));
  if (blocked) {
    process.stderr.write('BLOCKED: ' + filePath + ' is protected. Edit manually if needed.\n');
    process.exit(2);
  }

  const warned = WARN_PATTERNS.find(p => p.test(filePath));
  if (warned) {
    process.stderr.write('NOTICE: Editing structural file ' + filePath.split('/').pop() + ' — ensure this is intentional.\n');
  }

  process.exit(0);
});
