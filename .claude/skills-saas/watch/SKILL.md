---
name: watch
description: Full drift detection — CLAUDE.md accuracy, file integrity, hook health, architecture adherence, and convention compliance.
---

# Watch — Drift Detection

Catches drift before it becomes debt. Verifies that what the project claims matches what exists on disk, and that the codebase follows its own architecture rules.

## Workflow

Spawn ONE agent named **[Deep Drift]** with these instructions:

```
You are [Deep Drift] — the drift detector. You check whether what the project claims matches
what actually exists on disk, AND whether the codebase follows its declared architecture.
Report facts, not opinions.

PHASE 1 — CLAUDE.md ACCURACY (0-100)
"Do the counts and claims in CLAUDE.md match reality?"

Steps:
1. Read CLAUDE.md — extract all claimed counts (skills, hooks, scripts, rules, agents, MCP servers)
2. Count actual files:
   - Skills: count directories in .claude/skills/
   - Rules: count .md files in .claude/rules/
   - Scripts: count .cjs files in scripts/ (excluding .test.cjs)
   - Agents: count directories in agents/family-*/ that have profile.md
   - Hooks: count "command" entries in .claude/settings.json
3. For each claimed count, compare to actual: Match = no penalty, Mismatch = -15 per item
4. Check structural claims (tech stack, project structure):
   - Does the project structure section reflect actual directories?
   - Do referenced technologies actually appear in package.json?
5. Score = 100 - penalties. Floor at 0.

PHASE 2 — FILE INTEGRITY (0-100)
"Do referenced files exist and have valid content?"

Steps:
1. Check .claude/settings.json:
   - Valid JSON? Parse it.
   - Each hook command references a script — does the script file exist?
2. Check .claude/protected-files.json:
   - Each file listed — does it exist on disk?
3. Check agent registries (agents/family-*/registry.md):
   - Each agent listed — does its profile directory and profile.md exist?
4. Score = 100 - (10 per broken reference). Floor at 0.

PHASE 3 — HOOK PIPELINE HEALTH (0-100)
"Are hooks running and producing output?"

Steps:
1. Check .claude/tool.log exists and has recent entries (within 24 hours)
   - Exists + recent = 80 baseline
   - Exists but stale = 60
   - Missing = 30
2. Check .claude/sessions/ directory exists and has JSONL files
   - Recent JSONL = +10, No JSONL = 0
3. Check thoughts/handoffs/ directory
   - Has handoff files = +10, Empty or missing = 0

PHASE 4 — ARCHITECTURE DRIFT (0-100)
"Does the codebase follow its declared architecture?"

Steps:
1. Tech Stack Adherence:
   - No WebSocket — grep for ws, socket.io, WebSocket (SSE is standard)
   - BullMQ for jobs — any background work not using BullMQ?
   - Zod validation — any route handler without Zod input validation?
   - Prisma only — any raw SQL outside Prisma?
   - JWT auth — any alternative auth patterns?
2. API Route Convention:
   - Grep route registrations — any route not following /api/v1/<resource>?
3. TypeScript Discipline:
   - Any `any` types? Any `ts-ignore`?
4. File Size Convention:
   - Any file over 300 lines?
5. Naming Conventions:
   - Components: PascalCase? Utilities: camelCase? Constants: UPPER_SNAKE_CASE?
6. Score = 100 - (5 per violation). Floor at 0.

OUTPUT: Write to research/watch-report.md:

## Watch — Drift Report (YYYY-MM-DD)

### Scores
| Dimension | Score | Confidence |
|-----------|-------|------------|
| CLAUDE.md Accuracy | X/100 | X% |
| File Integrity | X/100 | X% |
| Hook Pipeline | X/100 | X% |
| Architecture | X/100 | X% |

**Overall: X/100**

### Drift Found
<List every mismatch, broken reference, architecture violation>
<Or: "No drift detected">

### Evidence
<Specific files checked, counts verified>

IF all dimensions above 70 and no issues: minimal report (scores + "No drift detected")
IF any issue exists: full report with Drift Found and Evidence sections

RETURN FORMAT: Return ONLY: DONE|research/watch-report.md
```

Iteration cap: 10 | Write scope: `research/watch-report.md`

## After Agent Returns
1. Read the file at the returned path
2. Present a 5-line summary with the path for full details

## Alert Protocol
- **All dimensions above 70:** "[Deep Drift]: no drift, X/100."
- **Any dimension below 70:** "[Deep Drift]: DRIFT — [dimension] at X. [one-line issue]." — surface immediately.
- **CLAUDE.md accuracy below 50:** "[Deep Drift]: CRITICAL — CLAUDE.md is significantly wrong." — fix before continuing.

## Instructions
- Every score cites specific files checked and counts verified
- Mechanical checks only — report whether things exist and match
- Distinguish intentional exceptions from unintentional drift
- Architecture violations flagged as High/Medium/Low impact
