---
name: save-context
description: Check context usage and recommend the best action to save tokens. Use when conversation feels long or slow.
---

# Save Context Skill

Check the current context usage and recommend the right action.

## Step 1: Check Usage
Run `/context` to see current token usage.

## Step 2: Recommend Action

| Usage | Recommendation | Command |
|---|---|---|
| < 30% | No action needed | — |
| 30-60% | Consider compacting if switching topics | `/compact` |
| 60-80% | Compact now to stay performant | `/compact` |
| > 80% | Clear context or start a new session | `/clear` |

## Step 3: Apply the Right Technique

| Situation | Best Action |
|---|---|
| Switching to a new unrelated task | `/clear` — full reset |
| Same task, conversation getting long | `/compact` — summarize history |
| Heavy research or exploration needed | Ask Claude to use `context: fork` (subagent) |
| Repeated slow responses | `/compact` then `/context` to verify |

## Tips
- Always `/clear` between unrelated tasks
- Use `/compact` proactively — don't wait until context is full
- Skills with `user-invocable: false` load silently and save tokens
- Subagents with `context: fork` protect your main context from heavy work
