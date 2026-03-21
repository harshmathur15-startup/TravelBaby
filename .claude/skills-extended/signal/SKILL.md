---
name: signal
description: Cross-session communication — send messages, check inbox, kill stuck sessions, or leave notes for the next session.
---

# Signal Skill — Cross-Session Communication

File-based inbox at `~/.claude/signals/` that lets sessions communicate.

## Commands

### `/signal check`
Read and act on pending messages in `~/.claude/signals/inbox.jsonl`.

1. Read `inbox.jsonl`
2. For each message:
   - `kill` — find the target PID, force-kill it, report result
   - `note` — display the note to the user
   - `status` — display what another session reported
   - `abort` — if targeted at this session's PID, stop current task
3. Move processed messages to `processed.jsonl`
4. If inbox is empty, say so

### `/signal send <type> <payload>`
Write a message to the inbox for other sessions to pick up.

1. Get current PID: `echo $PPID` or `powershell -Command "(Get-Process -Id $PID).Id"`
2. Append one JSON line to `~/.claude/signals/inbox.jsonl`:
   ```json
   {"ts": "<ISO timestamp>", "from": <PID>, "to": "all", "type": "<type>", "payload": "<payload>"}
   ```
3. Confirm message written

### `/signal kill <PID>`
Immediately force-kill a stuck session.

1. Run `taskkill //F //PID <PID>` (Windows) or `kill -9 <PID>` (Unix)
2. Log the kill to `inbox.jsonl` as a `kill` type message
3. Report result

### `/signal status`
Report what this session is doing, so other sessions can see it.

1. Get current PID
2. Append status message to `inbox.jsonl`
3. Confirm

### `/signal sessions`
List all running Claude Code sessions.

1. Run `tasklist | grep -i claude` (Windows) or `ps aux | grep claude` (Unix)
2. Display PID, start time, and memory usage
3. Flag which PID is likely this session (newest or matching `$PPID`)

## Integration with /kickoff
When `/kickoff` runs, it should also run `/signal check` to pick up any messages left by a previous session.

## File Paths
- Inbox: `~/.claude/signals/inbox.jsonl`
- Processed: `~/.claude/signals/processed.jsonl`
