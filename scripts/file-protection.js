// File-Pattern Protection Hook — PreToolUse on Edit/Write
// Reads protection config from .claude/protected-files.json (single source of truth).
// "block" entries are rejected. "warn" entries get a notice. blocked_patterns always reject.

const fs = require('fs')
const path = require('path')

const CONFIG_PATH = path.join(__dirname, '..', '.claude', 'protected-files.json')

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    // No config = no protection. Fail open so the hook doesn't break new projects.
    return { files: [], blocked_patterns: [] }
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
}

let buffer = ''
process.stdin.on('data', chunk => (buffer += chunk))
process.stdin.on('end', () => {
  const data = JSON.parse(buffer)
  const filePath = (data.tool_input && (data.tool_input.file_path || '')).replace(/\\/g, '/')

  const config = loadConfig()

  // Check blocked_patterns first (always block)
  const blockedByPattern = (config.blocked_patterns || []).find(p => new RegExp(p).test(filePath))
  if (blockedByPattern) {
    process.stderr.write(
      'BLOCKED: ' + filePath + ' matches protected pattern. Edit manually if needed.\n',
    )
    process.exit(2)
  }

  // Check file-level protection
  for (const entry of config.files) {
    const entryPath = path.resolve(__dirname, '..', entry.path).replace(/\\/g, '/')
    const normalizedFile = path.resolve(filePath).replace(/\\/g, '/')

    if (normalizedFile === entryPath) {
      if (entry.protection === 'block') {
        process.stderr.write('BLOCKED: ' + filePath + ' is protected. Edit manually if needed.\n')
        process.exit(2)
      }
      if (entry.protection === 'warn') {
        process.stderr.write(
          'NOTICE: Editing structural file ' +
            path.basename(filePath) +
            ' — ensure this is intentional.\n',
        )
      }
      break
    }
  }

  process.exit(0)
})
