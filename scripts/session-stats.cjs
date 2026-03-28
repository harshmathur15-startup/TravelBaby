/**
 * Session Stats — Observability dashboard from tool.log
 *
 * Reads .claude/tool.log and produces a structured summary:
 *   - Tool usage breakdown (count per tool)
 *   - Session timeline (first/last activity, duration)
 *   - Error rate (exit codes != 0)
 *   - Most active files (by edit/read count)
 *
 * Usage:
 *   node scripts/session-stats.cjs              # current session
 *   node scripts/session-stats.cjs --all        # all sessions in log
 *   node scripts/session-stats.cjs --date 2026-03-28  # specific date
 */

const fs = require('fs')
const path = require('path')

const LOG_PATH = path.join(__dirname, '..', '.claude', 'tool.log')

function parseArgs() {
  const args = process.argv.slice(2)
  if (args.includes('--all')) return { mode: 'all' }
  const dateIdx = args.indexOf('--date')
  if (dateIdx !== -1 && args[dateIdx + 1]) return { mode: 'date', date: args[dateIdx + 1] }
  return { mode: 'today' }
}

function parseLine(line) {
  // Format: TIMESTAMP | TOOL | TARGET | exit:CODE
  const match = line.match(/^(\S+)\s*\|\s*(\w+)\s*\|\s*(.+?)(?:\s*\|\s*exit:(\d+))?$/)
  if (!match) return null
  return {
    timestamp: match[1],
    tool: match[2],
    target: match[3].trim(),
    exitCode: match[4] ? parseInt(match[4], 10) : 0,
  }
}

function filterEntries(entries, opts) {
  if (opts.mode === 'all') return entries
  const date = opts.mode === 'date' ? opts.date : new Date().toISOString().slice(0, 10)
  return entries.filter(e => e.timestamp.startsWith(date))
}

function analyze(entries) {
  if (entries.length === 0) {
    console.log('Session Stats — No Data')
    console.log('=======================')
    console.log('No tool.log entries found for the selected period.')
    return
  }

  // Tool breakdown
  const toolCounts = {}
  let errors = 0
  const fileTouched = {}

  for (const e of entries) {
    toolCounts[e.tool] = (toolCounts[e.tool] || 0) + 1
    if (e.exitCode !== 0) errors++

    // Track file touches (Edit, Read, Write targets)
    if (['Edit', 'Read', 'Write'].includes(e.tool)) {
      const file = e.target.split('|')[0].trim()
      fileTouched[file] = (fileTouched[file] || 0) + 1
    }
  }

  // Timeline
  const first = entries[0].timestamp
  const last = entries[entries.length - 1].timestamp

  // Sort tools by count
  const sortedTools = Object.entries(toolCounts).sort((a, b) => b[1] - a[1])

  // Top files
  const sortedFiles = Object.entries(fileTouched).sort((a, b) => b[1] - a[1]).slice(0, 10)

  // Output
  console.log('Session Stats')
  console.log('=============')
  console.log('Period: ' + first.slice(0, 10) + ' to ' + last.slice(0, 10))
  console.log('First activity: ' + first)
  console.log('Last activity: ' + last)
  console.log('Total tool calls: ' + entries.length)
  console.log('Errors: ' + errors + ' (' + (entries.length > 0 ? ((errors / entries.length) * 100).toFixed(1) : 0) + '%)')
  console.log('')
  console.log('Tool Breakdown:')
  for (const [tool, count] of sortedTools) {
    const bar = '█'.repeat(Math.ceil((count / entries.length) * 30))
    console.log('  ' + tool.padEnd(12) + ' ' + String(count).padStart(4) + '  ' + bar)
  }

  if (sortedFiles.length > 0) {
    console.log('')
    console.log('Most Active Files:')
    for (const [file, count] of sortedFiles) {
      console.log('  ' + String(count).padStart(3) + 'x  ' + file)
    }
  }
}

// Main
if (!fs.existsSync(LOG_PATH)) {
  console.log('Session Stats — No Log')
  console.log('======================')
  console.log('No .claude/tool.log found. Session tracking hook may not be active.')
  process.exit(0)
}

const opts = parseArgs()
const lines = fs.readFileSync(LOG_PATH, 'utf8').split('\n').filter(Boolean)
const entries = lines.map(parseLine).filter(Boolean)
const filtered = filterEntries(entries, opts)
analyze(filtered)
