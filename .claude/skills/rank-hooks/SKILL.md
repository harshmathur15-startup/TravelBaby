# Rank Hooks Skill

Score and rank the project's Claude Code hooks against top-tier standards.

## Workflow

Read all of the following in parallel:

1. `.claude/settings.json` — project hooks
2. `~/.claude/settings.json` — global hooks (if any)
3. `~/.claude/projects/<project>/memory/MEMORY.md` — for context on hook history

## Scoring Criteria

For each hook, evaluate:

- **Usefulness** — does it prevent real problems or automate real friction?
- **Implementation** — is it robust, or fragile/hardcoded?
- **Coverage** — does it catch the right events?
- **Uniqueness** — is this something most users don't have?

Score each hook out of 10.

## Output Format

```
| # | Hook | Event | What It Does | Score |
|---|---|---|---|---|
| 1 | ... | ... | ... | X/10 |

**Overall: X/50 — Nth percentile**

**Strengths**
- <what beats most setups — be specific>

**Gaps**
- <what would push score higher — only real gaps, not hypothetical>
```

## Instructions
- Be honest — no inflated scores
- Compare against what top 0.01% users actually do with hooks
- Only flag gaps that aren't already covered by other mechanisms (permissions, deny lists, etc.)
- Keep output under 25 lines
- Lead with math and percentages per user preference
