// Recycle Guard — PreToolUse hook on Bash
// Backs up files before any rm/unlink command executes.
// Runs BEFORE bash-blocker. Backup-then-allow strategy:
// copies to .recycle/ (or .recycled/ for memory), then exits 0 to let the command proceed.

const fs = require('fs')
const path = require('path')

const PROJECT_ROOT = path.resolve(__dirname, '..')
const RECYCLE_DIR = path.join(PROJECT_ROOT, '.recycle')
const MANIFEST_PATH = path.join(RECYCLE_DIR, 'manifest.jsonl')

// Regenerable directories — no value in recycling
const SKIP_PATTERNS = [
  /node_modules\//,
  /\/dist\//,
  /\.astro\//,
  /\.recycle\//,
  /package-lock\.json$/,
  /\.recycled\//,
]

// Memory directory pattern — these go to .recycled/ sibling instead of .recycle/
const MEMORY_PATH_PATTERN = /[/\\]\.claude[/\\]projects[/\\][^/\\]+[/\\]memory[/\\]/

/**
 * Parse file paths targeted by an rm or unlink command.
 * Handles: rm file, rm -rf dir, rm file1 file2, unlink file
 * Does NOT handle: piped commands, subshells, globs (those are rare in hook context).
 */
function parseDeleteTargets(cmd) {
  const targets = []

  // Match rm commands
  const rmMatch = cmd.match(/\brm\s+(.+)/i)
  if (rmMatch) {
    const args = rmMatch[1].trim().split(/\s+/)
    for (const arg of args) {
      // Skip flags (anything starting with -)
      if (arg.startsWith('-')) continue
      // Skip shell operators
      if (['&&', '||', ';', '|', '>', '>>', '<'].includes(arg)) break
      targets.push(arg)
    }
  }

  // Match unlink commands
  const unlinkMatch = cmd.match(/\bunlink\s+(.+)/i)
  if (unlinkMatch) {
    const args = unlinkMatch[1].trim().split(/\s+/)
    for (const arg of args) {
      if (arg.startsWith('-')) continue
      if (['&&', '||', ';', '|'].includes(arg)) break
      targets.push(arg)
    }
  }

  return targets
}

/**
 * Resolve a target path to absolute, handling relative paths from the command's working directory.
 */
function resolveTarget(target, cwd) {
  if (path.isAbsolute(target)) return target
  return path.resolve(cwd || PROJECT_ROOT, target)
}

function shouldSkip(filePath) {
  const normalized = filePath.replace(/\\/g, '/')
  return SKIP_PATTERNS.some(p => p.test(normalized))
}

function isMemoryPath(filePath) {
  return MEMORY_PATH_PATTERN.test(filePath)
}

function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-')
}

/**
 * Recycle a single file. Returns the recycle path or null if skipped.
 */
function recycleFile(absolutePath, reason) {
  if (!fs.existsSync(absolutePath)) return null
  if (shouldSkip(absolutePath)) return null

  const stat = fs.statSync(absolutePath)

  if (isMemoryPath(absolutePath)) {
    return recycleMemoryFile(absolutePath, reason)
  }

  const ts = getTimestamp()
  const relativePath = path.relative(PROJECT_ROOT, absolutePath)
  const dir = path.dirname(relativePath)
  const basename = path.basename(relativePath)
  const recycledName = `${ts}--${basename}`

  const targetDir = path.join(RECYCLE_DIR, dir)
  fs.mkdirSync(targetDir, { recursive: true })

  const recyclePath = path.join(targetDir, recycledName)

  if (stat.isDirectory()) {
    fs.cpSync(absolutePath, recyclePath, { recursive: true })
  } else {
    fs.copyFileSync(absolutePath, recyclePath)
  }

  appendManifest(relativePath, recyclePath, reason)
  return recyclePath
}

/**
 * Recycle a memory file to .recycled/ sibling directory.
 */
function recycleMemoryFile(absolutePath, reason) {
  const dir = path.dirname(absolutePath)
  const recycledDir = path.join(dir, '.recycled')
  fs.mkdirSync(recycledDir, { recursive: true })

  const ts = getTimestamp()
  const basename = path.basename(absolutePath)
  const recyclePath = path.join(recycledDir, `${ts}--${basename}`)

  const stat = fs.statSync(absolutePath)
  if (stat.isDirectory()) {
    fs.cpSync(absolutePath, recyclePath, { recursive: true })
  } else {
    fs.copyFileSync(absolutePath, recyclePath)
  }

  appendManifest(absolutePath, recyclePath, reason)
  return recyclePath
}

function appendManifest(originalPath, recyclePath, reason) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true })
  const entry = JSON.stringify({
    path: originalPath.replace(/\\/g, '/'),
    recyclePath: recyclePath.replace(/\\/g, '/'),
    recycledAt: new Date().toISOString(),
    reason,
  })
  fs.appendFileSync(MANIFEST_PATH, entry + '\n')
}

// --- Hook entry point ---

let buffer = ''
process.stdin.on('data', chunk => (buffer += chunk))
process.stdin.on('end', () => {
  let data
  try {
    data = JSON.parse(buffer)
  } catch {
    process.exit(0)
  }

  const cmd = (data.tool_input && data.tool_input.command) || ''

  // Only intercept commands that delete files
  if (!/\b(rm|unlink)\b/i.test(cmd)) {
    process.exit(0)
  }

  const targets = parseDeleteTargets(cmd)
  if (targets.length === 0) {
    process.exit(0)
  }

  // Resolve working directory — hooks run from project root
  const cwd = PROJECT_ROOT
  let recycledCount = 0

  for (const target of targets) {
    const absolutePath = resolveTarget(target, cwd)
    try {
      const result = recycleFile(absolutePath, `rm via bash: ${cmd.substring(0, 200)}`)
      if (result) {
        recycledCount++
        process.stderr.write(`RECYCLED: ${path.basename(absolutePath)} → ${path.relative(PROJECT_ROOT, result)}\n`)
      }
    } catch (err) {
      // Backup failure should not block the command — log and continue
      process.stderr.write(`RECYCLE WARNING: Failed to back up ${absolutePath}: ${err.message}\n`)
    }
  }

  if (recycledCount > 0) {
    process.stderr.write(`${recycledCount} file(s) backed up to recycle bin before deletion.\n`)
  }

  // Exit 0 — allow the rm command to proceed (file is backed up)
  process.exit(0)
})
