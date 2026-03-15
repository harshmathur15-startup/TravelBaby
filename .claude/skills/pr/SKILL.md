---
name: pr
description: Create a pull request — branch, commit staged changes, push, and open PR with a clear description.
disable-model-invocation: true
---

# PR Skill

## Workflow
1. Check current branch: `git branch --show-current`
2. If on `main`/`master`, create a feature branch: `git checkout -b <type>/<short-description>`
3. Stage changes if not already staged: `git add <files>`
4. Commit using `/commit` conventions
5. Push branch: `git push -u origin <branch>`
6. Open PR: `gh pr create --title "<title>" --body "<body>"`

## PR Title Format
`<type>(<scope>): <short summary>` — same as commit format, max 72 chars

## PR Body Template
```
## What
[What this PR does in 1-2 sentences]

## Why
[Why this change is needed]

## How
[Key implementation decisions, if non-obvious]

## Testing
- [ ] Unit tests pass
- [ ] Manual testing done
- [ ] No regressions
```

## Branch Naming
| Type | Pattern |
|---|---|
| Feature | `feat/<short-name>` |
| Bug fix | `fix/<issue-or-description>` |
| Refactor | `refactor/<area>` |
| Chore | `chore/<task>` |

## Instructions
- Never push directly to `main` or `master`
- Always run tests before opening a PR
- Link related issues in the PR body if applicable
