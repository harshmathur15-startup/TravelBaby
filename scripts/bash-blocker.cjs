// Bash Blocker — PreToolUse hook on Bash
// Blocks destructive commands before execution

const patterns = [
  /rm\s+(-[a-z]*f[a-z]*\s+|.*--force)/,
  /drop\s+table/,
  /git\s+push\s+.*(-f|--force)/,
  /format\s+c/,
  /find\s+.*-delete/,
  /truncate\s/,
  /mkfs\./,
  /git\s+add\s+.*\.env(?!\.)/,
  /git\s+commit.*\.env(?!\.)/,
  /while\s+(true|1|:)/,
  /gh\s+run\s+watch/,
  /find\s+\/\s/,
];

let buffer = '';
process.stdin.on('data', chunk => buffer += chunk);
process.stdin.on('end', () => {
  let data;
  try {
    data = JSON.parse(buffer);
  } catch (e) {
    process.exit(0);
  }

  const cmd = (data.tool_input && data.tool_input.command || '').toLowerCase();
  const hit = patterns.find(p => p.test(cmd));

  if (hit) {
    process.stderr.write('BLOCKED: Dangerous command detected\n');
    process.exit(2);
  }

  process.exit(0);
});
