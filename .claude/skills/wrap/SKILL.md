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

**Skills Gap Check**
- <list skills that should have run based on what was changed, but didn't>
- "All covered" if no gaps
```

## Skills Gap Check (part of wrap output)

Before wrapping, check what was changed this session against what skills ran:

| What Happened | Expected Skill | Ran? |
|---|---|---|
| New code written | /test | Check git log for test runs |
| New pages added | /lighthouse, /a11y-audit | Check if mentioned in session |
| API endpoints changed | /security-scan | Check if mentioned |
| CMS schemas changed | /cms-sync | Check if mentioned |
| Dependencies updated | /test (verify) | Check if tests ran after |
| Approaching deployment | /prod-ready | Check if mentioned |

Report only genuine gaps — if the session was planning/research with no code, skip this section. Max 3 gaps — the most important ones only.

## MEMORY.md Update

After printing the summary, update `MEMORY.md`:
- Update "Project Status" to reflect current state
- Add any new architectural decisions to "Key Architectural Decisions"
- Update "Critical Build Order" if items were completed
- Remove stale entries

## Instructions
- Keep the summary under 20 lines — this is a snapshot, not a report
- "Next Session Should Start With" must be ONE specific thing — not a list
- Always update MEMORY.md — that's the most important part of this skill
- If no commits were made (planning/research session), still capture decisions and next step
- End with: "Memory updated. Pick up next session with `/kickoff`."
