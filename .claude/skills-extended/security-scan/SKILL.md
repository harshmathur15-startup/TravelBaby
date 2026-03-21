---
name: security-scan
description: Deep security audit of a file, route, or recent diff. More focused than /review.
---

# Security Scan Skill

Audit code for security vulnerabilities — OWASP Top 10, auth issues, data exposure.

## Usage
`/security-scan` — scan recent git diff
`/security-scan <file>` — scan a specific file
`/security-scan <route>` — scan a specific API route end-to-end (route → controller → service)

## Workflow

1. Determine scope from argument (diff, file, or route)
2. Read all relevant files in scope
3. Check every category below
4. Output findings by severity

## What to Check

### Injection
- [ ] No raw string interpolation in SQL — all queries use Prisma parameterized
- [ ] No `eval()`, `Function()`, or dynamic `require()`
- [ ] Shell commands (if any) sanitize user input — no command injection

### Authentication & Authorization
- [ ] Every route that returns sensitive data checks `req.user` exists
- [ ] Resource ownership verified — not just "is logged in" but "owns this resource" (IDOR check)
- [ ] Role checks happen server-side — client role claims are never trusted
- [ ] JWT validated with proper secret — not `verify()` without error handling

### Data Exposure
- [ ] No passwords, tokens, or secrets in API responses
- [ ] Government IDs, bank account numbers masked in any log statements
- [ ] Error responses show generic message externally — detail only in server logs
- [ ] No stack traces leaked in HTTP responses

### Input Validation
- [ ] All request body/query/params validated with Zod before use
- [ ] Numeric fields have min/max bounds (amounts can't be negative or unreasonably large)
- [ ] String fields have maxLength to prevent oversized inputs

### Secrets & Config
- [ ] No hardcoded secrets, API keys, or credentials in code
- [ ] `.env` values accessed via validated `env.ts`, not raw `process.env`

### Rate Limiting & Abuse
- [ ] Auth endpoints (login, password reset) have rate limiting
- [ ] Bulk operations (billing cycle, mass update) have access control

## Output Format

### Finding: <Short Name>
**Severity:** Critical / High / Medium / Low
**File:** `path/to/file.ts` line X
**Issue:** [What is wrong]
**Risk:** [What an attacker could do]
**Fix:**
```ts
// before
// after
```

---

**Summary:** X findings — Y critical, Z high, W medium, V low.

## Instructions
- Critical = exploitable right now (SQLi, auth bypass, credential exposure)
- High = likely exploitable with some effort
- Medium = weakens security posture
- Low = best practice violation
- Always show a concrete fix, not just "validate input"
- Flag false positives clearly rather than hiding them
