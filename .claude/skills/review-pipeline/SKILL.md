---
name: review-pipeline
description: Multi-phase code review — quality, architecture, security, performance. Each phase catches different issues.
---

# Review Pipeline

Borrowed from wshobson's 5-phase review (#3). Adapted to single-developer workflow — phases run sequentially, not in parallel.

## When It Runs
- Before merging any feature branch
- Manually via `/review-pipeline`
- On PRs before approval

## Phases

### Phase 1 — Code Quality
- TypeScript strict compliance (no `any`, no `ts-ignore`)
- File length under 300 lines
- No dead code, no unused imports
- No `console.log` in committed code
- Naming conventions followed (PascalCase components, camelCase utils)

### Phase 2 — Architecture
- Thin controllers — business logic in services?
- One responsibility per function?
- No premature abstractions?
- Correct layer separation (controller → service → repository)?
- No circular dependencies?

### Phase 3 — Security
- Input validation on all API endpoints (Zod)?
- No hardcoded secrets?
- SQL injection prevention (parameterized queries / ORM)?
- XSS prevention (no `dangerouslySetInnerHTML` without sanitization)?
- IDOR prevention (ownership verified server-side)?
- Auth on all protected routes?

### Phase 4 — Performance
- N+1 query patterns?
- Missing database indexes on frequently queried fields?
- Unnecessary re-renders in React components?
- Large bundle imports (could use tree-shaking)?
- Missing pagination on list endpoints?

## Output Format

| Phase | Status | Issues | Severity |
|-------|--------|--------|----------|
| Quality | PASS/FAIL | count | — |
| Architecture | PASS/FAIL | count | — |
| Security | PASS/FAIL | count | CRITICAL/HIGH/MEDIUM |
| Performance | PASS/FAIL | count | HIGH/MEDIUM/LOW |

**Verdict:** APPROVE / APPROVE WITH NOTES / REQUEST CHANGES

For each issue: file path, line number, what's wrong, suggested fix.

## Adversarial Mandate
- Each phase MUST surface at least 1 finding. A phase with zero findings requires explicit justification of what was checked and why it passed.
- "APPROVE" without notes is not allowed. Minimum: "APPROVE WITH NOTES" explaining what was verified.
- The reviewer must find issues — that is the job. A review that finds nothing has failed at its purpose.

## Instructions
- Run all 4 phases — don't skip any
- Security issues are always surfaced, even if other phases pass
- CRITICAL security issues = automatic REQUEST CHANGES, no exceptions
