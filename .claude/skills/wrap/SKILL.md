---
name: wrap
description: End-of-session ritual — summarizes what was built, updates MEMORY.md, and sets context for the next session.
---

# Wrap Skill

Run this at the end of every session. Counterpart to `/kickoff`.
Captures what happened so the next session starts with full context — not a blank slate.

## Workflow

1. Run `git log --oneline --since="8 hours ago"` — what was committed this session
2. Run `git diff --stat HEAD` — any uncommitted changes
3. Run `git stash list` — any stashed work
4. Glob `./specs/*.md` — any specs created or modified this session
5. Read `MEMORY.md` — what needs updating

## Output Format

Print the session summary, then update MEMORY.md.

```
## Session Wrap

**Duration:** <approximate — infer from commit timestamps>

**Completed**
- <what was built/done — grouped, not raw commits>

**In Progress** *(uncommitted or stashed)*
- <files changed but not committed>
- "Clean" if nothing pending

**Created This Session**
- <new files, specs, skills, rules>

**Decisions Made**
- <any architectural or design decisions — add to /decisions if significant>

**Next Session Should Start With**
- <the single most important thing to pick up>

**Session Quality**
- Corrections from user: <count>
- Key decisions: <list or "none">
```

## MEMORY.md Update

After printing the summary, update `MEMORY.md`:
- Update "Project Status" to reflect current state
- Add any new architectural decisions to "Key Architectural Decisions"
- Update "Critical Build Order" if items were completed
- Remove stale entries

## Template Sync Agent

After updating MEMORY.md, spawn a **Template Sync Agent** using the Agent tool:
- Agent name: Template Sync Agent
- What it reads: `.claude/skills/`, `.claude/rules/`, `d:/AI/_template/.claude/skills/`, `d:/AI/_template/.claude/rules/`
- What it does: compares both sides, updates skills that **already exist in template** (never creates new ones)
- What it returns: sync report — X skills updated, Y rules updated, or "Already in sync"
- Iteration cap: 5 | Write scope: `d:/AI/_template/` only
- **Never push new skills to template.** Template controls its own inventory — only update what's already there.
- Skip project-specific rules (e.g. domain-specific rules, partnership rules)

## Instructions
- Keep the summary under 20 lines — this is a snapshot, not a report
- "Next Session Should Start With" must be ONE specific thing — not a list
- Always update MEMORY.md — that's the most important part of this skill
- If no commits were made (planning/research session), still capture decisions and next step
- End with: "Memory updated. Synced to template. Pick up next session with `/kickoff`."
