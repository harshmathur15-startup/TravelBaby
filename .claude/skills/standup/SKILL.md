---
name: standup
description: Generate a daily standup summary from git log and current todos.
---

# Standup Skill

Generate a ready-to-paste standup update — no manual writing.

## Workflow

1. Run `git log --since="yesterday" --oneline --author="$(git config user.name)"` to get yesterday's commits
2. Run `git log --since="midnight" --oneline --author="$(git config user.name)"` to get today's commits so far
3. Check for any open todos or in-progress items (look for TODO comments or a todos.md if present)
4. Check for any open PRs: `gh pr list --author="@me" --state=open` (skip if gh not available)
5. Compose the standup

## Output Format

```
**Yesterday**
- <commit summary 1>
- <commit summary 2>

**Today**
- <planned work based on open todos / PRs>

**Blockers**
- None  ← or list any if found
```

## Instructions
- Keep each bullet to one line — no technical jargon
- Group related commits into a single bullet (e.g. 3 commits on auth → "Implemented JWT auth flow")
- If no commits found, say "No commits — planning/setup day"
- Never fabricate work — only report what git shows
- Output is ready to paste into Slack/Teams/email — no extra explanation needed
