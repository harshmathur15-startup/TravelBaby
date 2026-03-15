# Rank Rules Skill

Score and rank the project's Claude Code rules against top-tier standards.

## Workflow

Read all of the following in parallel:

1. `.claude/rules/` — all project rule files (read each one)
2. `CLAUDE.md` — project-level instructions
3. `~/.claude/rules/` — global rules (for overlap detection)
4. `~/.claude/projects/<project>/memory/MEMORY.md` — for context

## Scoring Criteria

For each rule file, evaluate on 5 dimensions:

- **Lines** — length (under 200 is good, under 50 is concise)
- **Path-Scoped** — does it use frontmatter `paths:` to limit when it loads?
- **Verifiable** — are rules specific with numbers/thresholds, or vague ("write clean code")?
- **Domain-Specific** — does it encode project-specific knowledge, not just generic best practices?
- **Completeness** — does it cover the key concerns for its area?

Score each rule out of 10.

## Output Format

```
| # | Rule | Lines | Path-Scoped | Verifiable | Domain-Specific | Score |
|---|---|---|---|---|---|---|
| 1 | ... | ... | Yes/No | Yes/Partially/No | Yes/Partially/No | X/10 |

**Overall: X/Y — Nth percentile**

**Strengths**
- <3 specific things that beat most setups>

**Gaps**
- <real gaps only — missing scopes, missing rule files, vague rules>
```

## Instructions
- Read every rule file — don't skip any
- Be honest — no inflated scores
- Check for overlap between project rules and global rules — flag redundancy
- Only flag gaps that are real and actionable
- Keep output under 30 lines
- Lead with math and percentages per user preference
