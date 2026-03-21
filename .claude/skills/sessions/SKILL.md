---
name: sessions
description: Session awareness — see what other active sessions are doing right now, set focus, clean up stale sessions.
---

# Sessions Skill — Cross-Session Awareness

Shows what all active sessions are doing. Heartbeats are written automatically by the PostToolUse hook — this skill reads them.

## Data Location

`~/.claude/signals/sessions/session-<PID>.json` — one file per active session.

## Commands

### `/sessions`
List all active sessions.

1. Read all `session-*.json` files in `~/.claude/signals/sessions/`
2. For each file:
   - Parse JSON
   - Calculate age = now - lastHeartbeat
   - If age > 5 minutes: move to `sessions/archive/`, skip from display
   - Otherwise: include in active list
3. Display table:

| PID | Project | Branch | Focus | Last Tool | Heartbeat | Tools |
|-----|---------|--------|-------|-----------|-----------|-------|
| 16020 | MyApp | master | building API | Edit | 30s ago | 47 |
| 8844 | Reach | feat/seo | API routes | Bash | 2m ago | 112 |

4. Mark current session with `*` prefix on PID
5. If only one session (this one): "Solo session — no other instances running."

### `/sessions focus <text>`
Set what this session is working on, visible to other sessions.

1. Read this session's heartbeat file (match by `$PPID` or find the file with matching PID)
2. If text contains `type:<value>` (e.g., `type:build`):
   - Extract the type value (must be one of: `build`, `calibration`, `pressure`, `research`, `maintenance`)
   - Update `sessionType` field in heartbeat JSON
   - Remove the `type:<value>` part from remaining text
3. Update `focus` field with the remaining text (if any)
4. Write back
5. Confirm: "Focus set: <text>" and/or "Session type: <type>"

### `/sessions check`
Mid-session health check for the current session.

1. Read this session's heartbeat file (match by current session ID)
2. Calculate session duration (now - startedAt)
3. Display:

```
Session Health — <duration>
Tools: <toolCount> | Errors: <errors> | Blocked: <blocked>
Focus: <focus or "not set">
```

4. If errors > 5 or blocked > 2: flag "Elevated error rate — consider reviewing recent actions"

### `/sessions clean`
Force-clean all stale sessions.

1. Read all session files
2. For each with lastHeartbeat > 5 minutes ago: move to `sessions/archive/`
3. Report: "Cleaned X stale sessions."

## Integration

- `/kickoff` shows active sessions at the end of the brief
- `/wrap` deletes this session's heartbeat file (deregister)
- Heartbeats auto-update on every tool use via PostToolUse hook

## Staleness Rules
- 5 minutes without heartbeat = stale
- Stale files move to `~/.claude/signals/sessions/archive/`
- Archive files older than 24 hours can be deleted by `/sessions clean`
