---
name: ux-review
description: Review React components for accessibility, UX issues, and frontend conventions.
---

# UX Review Skill

Audit React components for accessibility gaps, UX anti-patterns, and frontend rule violations.

## Usage
`/ux-review` — review all recently changed components
`/ux-review <file or component name>` — review a specific component

## Workflow

1. If a file is specified, read it directly
2. If no file specified, run `git diff --name-only HEAD~1` and filter for `.tsx` files
3. For each component, check all categories below
4. Output findings grouped by severity

## What to Check

### Accessibility (a11y)
- [ ] All `<img>` have meaningful `alt` text (not just "image" or filename)
- [ ] Interactive elements (`button`, `a`, custom divs with onClick) are keyboard-reachable
- [ ] Form inputs have associated `<label>` (htmlFor matching input id)
- [ ] Color is not the only way to convey information
- [ ] Focus states are visible — not removed with `outline: none` without replacement
- [ ] ARIA attributes are used correctly — no `role="button"` on a `<button>`

### UX Patterns
- [ ] Loading states exist for async operations — no silent hangs
- [ ] Empty states are handled — tables/lists show something useful when empty
- [ ] Error states are user-friendly — no raw error messages exposed
- [ ] Destructive actions (delete, deactivate) require confirmation
- [ ] Forms show validation errors inline, not just on submit
- [ ] Success feedback exists after form submit

### Frontend Conventions (from `.claude/rules/frontend.md`)
- [ ] No business logic in components — moved to hooks or services
- [ ] No direct API calls in components — using custom hooks
- [ ] No hardcoded strings that should be constants
- [ ] Component under 150 lines — split if longer

## Output Format

### <ComponentName>

**Severity: High / Medium / Low**

| Issue | Location | Fix |
|---|---|---|
| Missing alt text on avatar image | line 23 | `alt={employee.name}` |
| onClick on div not keyboard accessible | line 45 | Use `<button>` instead |

**Summary:** X issues found — Y high, Z medium, W low.

## Instructions
- Be specific — always include the line number and the exact fix
- High = broken for keyboard/screen reader users
- Medium = poor UX but functional
- Low = convention violation or minor improvement
- End with a count: "X issues total"
