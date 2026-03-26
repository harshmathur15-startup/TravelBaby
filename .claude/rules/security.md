# Product-specific rules (globals inherited from ~/.claude/rules/)
<!-- Last reviewed: 2026-03-26 (S29) -->

## Secrets & Configuration
- Lock file (`package-lock.json`) must be committed and reviewed on changes

## Input & Output
- Use parameterized Prisma queries — never raw string SQL with user input
- Sanitize all user-generated content before rendering — prevent XSS

## Authentication & Authorization
- Require CSRF tokens on all state-changing requests

## Audit Logging
- All user actions logged (see `schemas/audit-log.md`)
- All agent actions logged separately with full reasoning chain
- Audit log is immutable — never delete, only append
