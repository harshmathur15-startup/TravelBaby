/**
 * Tests for recycle-guard.cjs
 *
 * Uses Node's built-in test runner (node:test) — no external dependencies.
 * Run: node --test scripts/recycle-guard.test.cjs
 *
 * Uses child_process.fork (not spawn) to avoid PATH resolution issues
 * on Windows sandboxed environments where spawn can't find node.exe.
 */

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const path = require('path')
const { fork } = require('child_process')

const SCRIPT_PATH = path.join(__dirname, 'recycle-guard.cjs')

function runScript(command) {
  return new Promise(resolve => {
    const child = fork(SCRIPT_PATH, [], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
      silent: true,
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', data => {
      stdout += data.toString()
    })
    child.stderr.on('data', data => {
      stderr += data.toString()
    })

    child.on('close', code => {
      resolve({ exitCode: code, output: stdout, stderr })
    })

    const input = JSON.stringify({ tool_input: { command } })
    child.stdin.write(input)
    child.stdin.end()
  })
}

function runScriptRaw(rawInput) {
  return new Promise(resolve => {
    const child = fork(SCRIPT_PATH, [], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
      silent: true,
    })

    let stderr = ''
    child.stderr.on('data', data => {
      stderr += data.toString()
    })

    child.on('close', code => {
      resolve({ exitCode: code, stderr })
    })

    child.stdin.write(rawInput)
    child.stdin.end()
  })
}

describe('recycle-guard.cjs', () => {
  describe('non-delete commands — should pass through', () => {
    it('should exit 0 for ls', async () => {
      const result = await runScript('ls -la')
      assert.equal(result.exitCode, 0)
      assert.ok(!result.stderr.includes('RECYCLED'))
    })

    it('should exit 0 for git status', async () => {
      const result = await runScript('git status')
      assert.equal(result.exitCode, 0)
    })

    it('should exit 0 for npm install', async () => {
      const result = await runScript('npm install lodash')
      assert.equal(result.exitCode, 0)
    })
  })

  describe('skip patterns', () => {
    it('should not recycle node_modules files', async () => {
      const result = await runScript('rm node_modules/lodash/index.js')
      assert.equal(result.exitCode, 0)
      assert.ok(!result.stderr.includes('RECYCLED'))
    })

    it('should not recycle dist/ files', async () => {
      const result = await runScript('rm -rf /project/dist/bundle.js')
      assert.equal(result.exitCode, 0)
      assert.ok(!result.stderr.includes('RECYCLED'))
    })
  })

  describe('invalid input', () => {
    it('should exit 0 on malformed JSON', async () => {
      const result = await runScriptRaw('not json at all')
      assert.equal(result.exitCode, 0)
    })

    it('should exit 0 on empty command', async () => {
      const result = await runScript('')
      assert.equal(result.exitCode, 0)
    })
  })

  describe('rm with nonexistent files', () => {
    it('should exit 0 when target does not exist', async () => {
      const result = await runScript('rm /tmp/does-not-exist-abc123.txt')
      assert.equal(result.exitCode, 0)
      assert.ok(!result.stderr.includes('RECYCLED'))
    })
  })
})
