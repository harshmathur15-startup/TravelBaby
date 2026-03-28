---
name: commit
description: Generate a well-structured git commit message based on staged changes.
disable-model-invocation: true
---

# Commit Skill

Generate a conventional commit message for staged changes.

## Commit Types

| Type | When to Use |
|---|---|
| feat | New feature |
| fix | Bug fix |
| refactor | Code change with no feature/fix |
| test | Adding or updating tests |
| docs | Documentation changes |
| chore | Build process, tooling, config |
| perf | Performance improvement |
| style | Formatting, whitespace |

## Format

```
<type>(<scope>): <short summary>

<optional body — what and why, not how>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

## Instructions
1. Run `git diff --staged` to see staged changes
2. Identify the change type and affected scope
3. Write a concise summary (max 72 chars)
4. Add body only if the change needs context
5. Stage and commit: `git commit -m "..."`
