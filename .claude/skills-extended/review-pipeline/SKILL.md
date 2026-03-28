---
name: review-pipeline
description: Multi-phase code review — quality, architecture, security, performance — with scoring and auto-remediation.
---

# Review Pipeline

4-phase code review with 8-dimension scoring and auto-remediation. Runs sequentially.

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

### Phase 3 — Security (checklist depth — for deep targeted audits use `/security-scan`)
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

## Phase Output

| Phase | Status | Issues | Severity |
|-------|--------|--------|----------|
| Quality | PASS/FAIL | count | — |
| Architecture | PASS/FAIL | count | — |
| Security | PASS/FAIL | count | CRITICAL/HIGH/MEDIUM |
| Performance | PASS/FAIL | count | HIGH/MEDIUM/LOW |

For each issue: file path, line number, what's wrong, suggested fix.

## Quality Scoring (after phases)

Score the reviewed code on 8 dimensions (0-100 each):

| # | Dimension | Weight | What It Measures |
|---|-----------|--------|-----------------|
| 1 | Correctness | 20% | Does it do what was asked? Matches spec? |
| 2 | Security | 20% | OWASP top 10 compliance? Input validation? Auth? |
| 3 | Completeness | 15% | All cases handled? Edge cases? Error paths? |
| 4 | Test Coverage | 15% | Critical paths tested? Edge cases? |
| 5 | Readability | 10% | Can another developer understand it? |
| 6 | Maintainability | 10% | Can it be modified without breaking things? |
| 7 | Performance | 5% | Obvious inefficiencies? |
| 8 | Convention | 5% | Follows project conventions? |

**Overall** = weighted average. Thresholds: 90+ Excellent, 70-89 Good, 50-69 Needs Work, <50 Rework.

## Auto-Remediation

For any dimension scoring below 70, generate a fix task:

```
REMEDIATION: [Dimension] scored [X]/100
File: [path]
Issue: [specific problem]
Fix: [concrete action]
Priority: HIGH if <50, MEDIUM if 50-69
```

## Verdict

**APPROVE** / **APPROVE WITH NOTES** / **REQUEST CHANGES**

- CRITICAL security issues = automatic REQUEST CHANGES
- "APPROVE" without notes is not allowed — minimum: APPROVE WITH NOTES

## Adversarial Mandate
- Each phase MUST surface at least 1 finding. Zero findings requires explicit justification.
- You MUST identify at least 3 issues total. "Looks good" is not acceptable.
- Review with fresh eyes — assume you are seeing this code for the first time.
- Be honest — inflated scores hide real issues.

## Instructions
- Run all 4 phases — don't skip any
- Score all 8 dimensions after phases complete
- Security issues are always surfaced, even if other phases pass
- Every score below 70 MUST have a remediation task
- End with: phase table, score table, remediation tasks, verdict
