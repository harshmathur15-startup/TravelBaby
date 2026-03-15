---
name: review
description: Review code changes for quality, bugs, security issues, and adherence to project conventions.
---

# Code Review Skill

Perform a thorough code review of the provided code or recent changes.

## Review Checklist

| Category | What to Check |
|---|---|
| Correctness | Logic errors, edge cases, off-by-one errors |
| Security | SQL injection, XSS, exposed secrets, input validation |
| TypeScript | Strict mode compliance, proper types, no `any` |
| Performance | N+1 queries, unnecessary re-renders, missing indexes |
| Conventions | PascalCase components, camelCase utilities, REST routes |
| Error Handling | Proper try/catch, meaningful error messages |
| Agent Logging | All AI agent actions logged for auditability |
| Tests | Adequate test coverage for new logic |

## Output Format

For each issue found:

| Field | Description |
|---|---|
| Severity | Critical / High / Medium / Low |
| File & Line | Location of the issue |
| Issue | Description of the problem |
| Suggestion | How to fix it |

## Instructions
- Review all files changed in the current task or provided by user
- Group issues by severity
- End with a summary: total issues found, overall quality rating (1-10)
- Suggest improvements but respect existing patterns
