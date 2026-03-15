---
name: kickoff
description: Start-of-session ritual — reads memory, recent commits, open specs, and primes Claude with full project context.
---

# Kickoff Skill

Run this at the start of every session. Eliminates the "catch me up" overhead.

## Workflow

Read all of the following in parallel:

1. `./CLAUDE.md` — project overview and conventions
2. `~/.claude/projects/<project>/memory/MEMORY.md` — persistent learnings
3. `git log --oneline -10` — last 10 commits (what was recently built)
4. `git status` — any uncommitted changes
5. `git stash list` — any stashed work
6. `./specs/` — list any spec files present (read titles only)
7. Any open PRs: `gh pr list --state=open` (skip if gh not available)
8. `.claude/tool.log` — last 5 lines (what tools ran recently)
9. `./thoughts/handoffs/` — read the most recent handoff file (if exists) — this is the last session's state snapshot saved before compaction

## Output Format

Print a structured session brief — keep it concise:

---

### Session Brief

**Project:** <name from CLAUDE.md>
**Status:** <one line from MEMORY.md project status>

**Recent Work** *(last 10 commits)*
- <grouped summary — not raw commit list>

**Uncommitted Changes**
- <files changed, or "Working tree clean">

**Open Specs**
- <list of spec files in ./specs/, or "None">

**Open PRs**
- <PR titles, or "None / gh not available">

**Last Session Handoff**
- <key state from latest handoff file, or "No handoff found">

**Suggested starting point:**
<Based on recent commits + open specs + git status + handoff, recommend what to work on next — one clear sentence>

---

## Instructions
- Read files in parallel for speed
- Do NOT read every spec file in full — just list their names/titles
- The "Suggested starting point" is the most valuable line — make it specific and actionable
- If MEMORY.md has a Critical Build Order, reference it in the suggestion
- Keep the whole output under 30 lines — this is a brief, not a report
- After output, say: "Ready. What are we building?"
