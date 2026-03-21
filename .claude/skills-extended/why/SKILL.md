---
name: why
description: Explain WHY a file or function was built the way it was — reads git log, commit messages, and related specs for institutional memory.
---

# Why Skill

Answers "why did we do it this way?" in seconds. Solves the institutional memory problem.

## Usage
`/why <file or function name>`

Examples:
- `/why server/src/services/tax.service.ts`
- `/why calculateTax`
- `/why agents/BillingAgent.ts`

## Workflow

1. Find the file using Glob (if partial name given)
2. Read the file to understand current implementation
3. Run `git log --follow --oneline -- <filepath>` to see commit history
4. Run `git log --follow -p -- <filepath>` for the last 3 meaningful commits (see what changed and when)
5. Run `git log --oneline --all --grep="<function/feature name>"` to find related commits
6. Check `./specs/` for any spec file related to this feature
7. Check `.claude/rules/` for any rule that governs this pattern
8. Synthesize the answer

## Output Format

```
## Why: <file or function name>

### What it does
<1-2 sentences on current behavior>

### Why it's built this way
<The core reasoning — design decision, constraint, or requirement that drove the implementation>

### History
| Date | Change | Commit |
|---|---|---|
| YYYY-MM-DD | Initial implementation | abc1234 |
| YYYY-MM-DD | Changed X because Y | def5678 |

### Related spec
<Link to spec file if found, or "No spec found — implementation predates spec discipline">

### Governing rule
<Which rule file covers this pattern, e.g. ".claude/rules/billing.md — monetary values in smallest currency unit">

### What NOT to change
<Based on history and commits, flag anything that would break if changed naively>
```

## Instructions
- If no git history exists (greenfield), say "No history yet — file was just created"
- Focus on the WHY not the WHAT — the code explains the what
- If the commit messages are uninformative ("fix stuff"), read the diff to infer intent
- The "What NOT to change" section is the most valuable — highlight hidden dependencies
