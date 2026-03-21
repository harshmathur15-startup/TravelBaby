---
name: prod-ready
description: Pre-deployment checklist — verifies env, build, security, performance, and infrastructure before going to production.
---

# Prod Ready Skill

Verify a project is ready for production deployment. Different from /public-ready (open-source readiness) — this checks operational readiness.

## Usage

`/prod-ready` — run all checks, output to conversation
`/prod-ready --save` — write report to `prod-ready-report.md`

## Severity Levels

| Level | Meaning | Verdict Effect |
|---|---|---|
| BLOCKER | Cannot deploy — missing env vars, build fails, critical vulnerabilities | NO-GO |
| WARNING | Should fix before deploy — missing tests, no rate limiting, no error tracking | CONDITIONAL |
| INFO | Best practice gap — no impact on launch | Does not block |

One BLOCKER = NO-GO. Only WARNINGs = CONDITIONAL. Clean = GO.

## Checks

Run all checks in parallel where possible.

### 1. Environment Variables [BLOCKER]

Read `.env.example` to get the full list. Verify:
- [ ] `.env` exists and has all required variables set
- [ ] No placeholder values remain (`your-xxx-here`, `changeme`, `TODO`)
- [ ] `NODE_ENV` is set to `production` (or production config exists)
- [ ] Database URL points to production DB (not localhost)
- [ ] All API keys are present (not empty strings)

Never log actual values — only check presence and basic shape.

### 2. Build [BLOCKER]

```bash
npm run build 2>&1
```

- [ ] Build completes without errors
- [ ] No TypeScript errors (`tsc --noEmit` if not part of build)
- [ ] Output directory exists (`dist/`, `build/`, or `.astro/`)
- [ ] No `console.log` in production code (Grep source, exclude tests and scripts)

### 3. Security [BLOCKER/WARNING]

Run `/security-scan` mentally against the codebase. Check:
- [ ] No hardcoded secrets in source (BLOCKER)
- [ ] `npm audit` shows no critical/high vulnerabilities (BLOCKER)
- [ ] Auth middleware on all protected routes (BLOCKER)
- [ ] CORS configured for production origins only — not `*` (WARNING)
- [ ] Rate limiting on auth endpoints (WARNING)
- [ ] Security headers set: CSP, HSTS, X-Frame-Options (WARNING)
- [ ] HTTPS enforced (WARNING)

### 4. Database [BLOCKER/WARNING]

Only if Prisma/database is used:
- [ ] All migrations are generated and committed (BLOCKER)
- [ ] No pending `prisma migrate dev` changes (BLOCKER)
- [ ] Seed script exists and runs without errors (WARNING)
- [ ] Indexes on frequently queried columns (WARNING)
- [ ] No raw SQL queries — all through Prisma (WARNING)

### 5. Error Handling [WARNING]

- [ ] Global error handler exists (Express `app.use((err, req, res, next)`)
- [ ] Errors return generic messages to client — no stack traces
- [ ] Unhandled rejection handler: `process.on('unhandledRejection')`
- [ ] Uncaught exception handler: `process.on('uncaughtException')`
- [ ] 404 handler for unknown routes

### 6. Logging & Monitoring [WARNING]

- [ ] Structured logger exists (not raw `console.log`)
- [ ] Request logging middleware active
- [ ] Error logging captures stack traces server-side
- [ ] Health check endpoint exists (`/health` or `/api/health`)
- [ ] Agent actions logged (if agents are used)

### 7. Performance [WARNING/INFO]

- [ ] Static assets have cache headers or fingerprinted filenames
- [ ] Images optimized (no raw PNGs > 500KB in `/public`)
- [ ] No N+1 queries (check Prisma `include` usage)
- [ ] Background jobs use BullMQ, not inline async (if applicable)
- [ ] Lighthouse score > 90 for frontend (INFO — manual check)

### 8. Infrastructure [WARNING/INFO]

- [ ] `package.json` has `start` script for production
- [ ] `.dockerignore` exists if Dockerfile present (WARNING)
- [ ] CI/CD pipeline exists (`.github/workflows/`) (WARNING)
- [ ] README has deployment instructions (INFO)
- [ ] Backup strategy documented for database (INFO)

### 9. TODOs & Temporary Code [WARNING]

Grep source files for:
```
TODO|FIXME|HACK|XXX|TEMP|PLACEHOLDER
```

Exclude `node_modules/`, `dist/`, lock files. Report each with file:line and the comment text. More than 5 TODOs = WARNING.

## Output Format

```
## Production Readiness Report

**Project:** <name>
**Branch:** <current branch>
**Date:** <current date>
**Commit:** <short hash>

### Summary

| Check | Status | Findings |
|---|---|---|
| Environment | PASS/FAIL | X issues |
| Build | PASS/FAIL | X errors |
| Security | PASS/FAIL | X issues |
| Database | PASS/FAIL | X issues |
| Error Handling | PASS/WARN | X gaps |
| Logging | PASS/WARN | X gaps |
| Performance | PASS/WARN | X items |
| Infrastructure | PASS/WARN | X items |
| TODOs | PASS/WARN | X found |

### BLOCKER Findings
<numbered list with file:line, or "None">

### WARNING Findings
<numbered list, or "None">

### INFO Findings
<numbered list, or "None">

### Verdict: GO / CONDITIONAL / NO-GO
<one-sentence rationale>

**Before deploying, fix:**
<numbered remediation steps>
```

## Edge Cases

- **Static site only (no server):** Skip checks 4 (database), 5 (error handling), 6 (logging). Note "Static site — server checks skipped."
- **No CI/CD:** Don't block — just note as INFO
- **Monorepo:** Run build and audit per package
- **No tests:** Flag as WARNING, not BLOCKER — some projects launch without tests (not ideal, but real)

## Instructions

- Run checks in parallel where possible
- Never log or display actual env values or secrets
- Build check runs the actual build — don't guess
- If build takes > 2 minutes, note "Build in progress" and continue other checks
- Limit TODO output to first 10 — summarize rest as "+N more"
- The verdict is the most important line — make it clear and actionable
