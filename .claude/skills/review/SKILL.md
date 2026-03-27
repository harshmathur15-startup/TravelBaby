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
| Security | XSS, exposed secrets, input validation, CSP compliance |
| TypeScript | Strict mode compliance, proper types, no `any` |
| Performance | Unnecessary re-renders, missing lazy loading, bundle size |
| Conventions | PascalCase components, camelCase utilities, file length limits |
| Accessibility | Alt text, aria labels, keyboard navigation |
| SEO | Meta tags, structured data, semantic HTML |

## Output Format

For each issue found:

| Field | Description |
|---|---|
| Severity | Critical / High / Medium / Low |
| File & Line | Location of the issue |
| Issue | Description of the problem |
| Suggestion | How to fix it |

## Adversarial Mandate
- You MUST identify at least 3 issues in every review. "Looks good" is not acceptable output.
- If you genuinely cannot find 3 issues, explain what was checked in each category and why it passed.
- Review with fresh eyes — assume you are seeing this code for the first time, because you are.
- Severity inflation is not the goal — find real issues, even if they are all Low severity.

## Instructions
- Review all files changed in the current task or provided by user
- Group issues by severity
- End with a summary: total issues found, overall quality rating (1-10)
