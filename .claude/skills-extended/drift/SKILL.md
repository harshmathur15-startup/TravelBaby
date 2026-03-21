---
name: drift
description: Compare current codebase against CLAUDE.md architecture plan — flags what has diverged from intended design.
---

# Drift Skill

Catches architectural drift before it becomes technical debt. Run weekly or before a major feature.

## Workflow

1. Read `CLAUDE.md` — extract intended project structure, tech stack, and conventions
2. Read `MEMORY.md` — extract Critical Build Order and Key Architectural Decisions
3. Scan actual codebase structure using Glob
4. Compare intended vs actual across all categories below
5. Flag divergences

## What to Check

### Project Structure
Compare intended directory layout from CLAUDE.md (`/client`, `/server`, `/shared`, `/agents`, `/prisma`) against what actually exists.

### Tech Stack Adherence
- **No WebSocket** — grep for `ws`, `socket.io`, `WebSocket` in source (SSE is the standard)
- **BullMQ for jobs** — any background work not going through BullMQ?
- **Zod validation** — any route handler without Zod input validation?
- **Prisma only** — any raw SQL (`db.query`, `pg.Client`) outside of Prisma?
- **JWT auth** — any alternative auth patterns introduced?

### API Route Convention
Grep all route registrations — any route not following `/api/v1/<resource>`?

### TypeScript Discipline
- Any `any` types? (should be zero)
- Any files missing strict return types on exported functions?

### Agent Auditability
Grep `agents/` — any agent action not calling a log function?

### File Size Convention
Any file over 300 lines? (from `.claude/rules/general.md`)

### Naming Conventions
- Components in `client/src/` — any non-PascalCase?
- Utilities — any non-camelCase?
- Constants — any non-UPPER_SNAKE_CASE?

## Output Format

```
## Drift Report

### Structure  ✅ / ⚠️
- `/agents` directory missing — not started yet

### Tech Stack  ✅ / ⚠️
- Found `socket.io` in package.json — should use SSE instead

### API Routes  ✅ / ⚠️
- `/health` route not under `/api/v1/` — acceptable exception or drift?

### TypeScript  ✅ / ⚠️
- 3 `any` types found (list files)

### Agent Auditability  ✅ / ⚠️
- All agent actions logged ✅

### File Size  ✅ / ⚠️
- billing.service.ts: 412 lines (limit: 300)

### Naming  ✅ / ⚠️
- No violations ✅

---
**Drift Score: X/7 categories clean**
**Verdict:** [On track / Minor drift / Significant drift — address before next feature]
```

## Instructions
- If the project is greenfield with no source files, say "No code yet — run after first implementation session"
- Distinguish between intentional exceptions (document them) and unintentional drift
- Flag drift as High/Medium/Low impact
- End with a concrete recommendation: "Refactor X before adding Y" or "All clean — proceed"
