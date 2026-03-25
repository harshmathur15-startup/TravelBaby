/**
 * Search conversation history across all past sessions.
 *
 * Usage: node scripts/search-history.js --query <text> [--project <slug>] [--limit <n>]
 *
 * Scans JSONL transcript files in ~/.claude/projects/<slug>/
 * Returns matching messages with session ID, role, and context snippet.
 *
 * If --project is omitted, auto-detects from current working directory.
 */

const fs = require('fs');
const path = require('path');

function detectProject() {
  const parts = process.cwd().replace(/\\/g, '/').split('/').filter(Boolean);
  const drive = parts[0].replace(':', '').toLowerCase();
  const rest = parts.slice(1).join('-');
  return drive + '--' + rest;
}

function parseArgs(argv) {
  const args = { query: '', project: detectProject(), limit: 10 };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--query' && argv[i + 1]) args.query = argv[++i];
    else if (argv[i] === '--project' && argv[i + 1]) args.project = argv[++i];
    else if (argv[i] === '--limit' && argv[i + 1]) args.limit = parseInt(argv[++i], 10);
    else if (!args.query) args.query = argv[i];
  }
  return args;
}

function extractText(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .filter(c => c.type === 'text')
      .map(c => c.text)
      .join('\n');
  }
  return '';
}

function snippetAround(text, query, radius) {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, radius * 2);
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  let snippet = text.slice(start, end).replace(/\n/g, ' ').trim();
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';
  return snippet;
}

function run() {
  const args = parseArgs(process.argv);
  if (!args.query) {
    console.error('Usage: node search-history.js --query <text> [--project <slug>] [--limit <n>]');
    process.exit(1);
  }

  const home = process.env.USERPROFILE || process.env.HOME;
  const projectDir = path.join(home, '.claude', 'projects', args.project);

  if (!fs.existsSync(projectDir)) {
    console.error('Project directory not found: ' + projectDir);
    process.exit(1);
  }

  const files = fs.readdirSync(projectDir)
    .filter(f => f.endsWith('.jsonl'))
    .map(f => ({
      name: f,
      path: path.join(projectDir, f),
      mtime: fs.statSync(path.join(projectDir, f)).mtimeMs
    }))
    .sort((a, b) => b.mtime - a.mtime);

  const results = [];
  const queryLower = args.query.toLowerCase();

  for (const file of files) {
    const sessionId = file.name.replace('.jsonl', '').slice(0, 8);
    const lines = fs.readFileSync(file.path, 'utf8').trim().split('\n');

    for (const line of lines) {
      let d;
      try { d = JSON.parse(line); } catch (e) { continue; }

      if (!d.message || !d.message.content) continue;
      const role = d.message.role;
      if (role !== 'user' && role !== 'assistant') continue;

      const text = extractText(d.message.content);
      if (!text.toLowerCase().includes(queryLower)) continue;

      results.push({
        session: sessionId,
        role,
        snippet: snippetAround(text, args.query, 100),
        file: file.name
      });

      if (results.length >= args.limit) break;
    }
    if (results.length >= args.limit) break;
  }

  if (results.length === 0) {
    console.log('No matches for "' + args.query + '" across ' + files.length + ' sessions.');
    return;
  }

  console.log('Found ' + results.length + ' matches across ' + files.length + ' sessions:\n');
  console.log('Session  | Role      | Snippet');
  console.log('---------|-----------|--------');
  for (const r of results) {
    const roleTag = r.role === 'user' ? 'User     ' : 'Assistant';
    console.log(r.session + ' | ' + roleTag + ' | ' + r.snippet.slice(0, 120));
  }
}

run();
