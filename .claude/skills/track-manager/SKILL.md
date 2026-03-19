---
name: track-manager
description: Track-based project management with checkpoints and resumable state. Manages parallel work streams.
---

# Track Manager

Borrowed from wshobson's Conductor (#2). Manages multiple parallel work tracks with dependencies, checkpoints, and resumable state.

## When It Runs
- `/track-manager` — show all tracks and their status
- `/track-manager create <name>` — create a new work track
- `/track-manager checkpoint` — save progress on current track

## Concepts

**Track** — an independent work stream (e.g., "auth system", "payment integration", "admin dashboard"). Each track has its own state, progress, and checkpoints.

**Checkpoint** — a saved state within a track. Captures: what's done, what's next, blockers, files modified. Resumable by a fresh session without context.

**Dependencies** — tracks can declare `blocked_by: [track-name]`. Blocked tracks show as waiting.

## State File

`thoughts/tracks.json`:
```json
{
  "tracks": [
    {
      "name": "auth-system",
      "status": "in_progress",
      "created": "2026-03-19",
      "checkpoints": [
        { "date": "2026-03-19", "summary": "JWT + refresh token implemented", "next": "Add password reset flow", "files": ["server/auth/..."] }
      ],
      "blocked_by": [],
      "progress": "60%"
    }
  ]
}
```

## Workflow

1. Read `thoughts/tracks.json` (create if missing)
2. Show track status table
3. Execute requested action (create/checkpoint/status)
4. Update state file

## Instructions
- Tracks are for multi-phase product builds, not for partnership work
- Each checkpoint must be resumable by a fresh session
- Progress percentage is estimated, not exact — round to nearest 10%
- Blocked tracks are surfaced prominently
