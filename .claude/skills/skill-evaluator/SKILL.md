---
name: skill-evaluator
description: Auto-suggests which skills to activate based on the current prompt, file paths, and intent. Inspired by ChrisWiles/claude-code-showcase.
auto_trigger: true
---

# Skill Evaluator

Analyzes the current prompt and suggests the most relevant skills to invoke. Runs automatically — not manually.

Inspired by [ChrisWiles/claude-code-showcase](https://github.com/ChrisWiles/claude-code-showcase) skill evaluation system. Adapted for this project's 52+ skills.

## Scoring System

Each skill match scores points based on detection method:

| Method | Weight | Example |
|---|---|---|
| Directory match | 5 | Editing `agents/src/` → suggest `/agent-catalog` |
| Path pattern | 4 | Editing `*.test.ts` → suggest `/test` |
| Intent pattern | 4 | "is this secure" → suggest `/security-scan` |
| Keyword pattern | 3 | "deploy" in prompt → suggest `/deploy` |
| Keyword exact | 2 | "prisma" → suggest `/data-model` |

**Threshold:** Only suggest skills scoring >= 3 points.
**Max suggestions:** 3 skills per prompt.

## Skill Rules

### Workflow Skills

| Skill | Keywords | Path patterns | Intent patterns |
|---|---|---|---|
| `/commit` | commit, push, staged | — | "ready to commit", "save changes" |
| `/review` | review, check, quality | `*.ts`, `*.tsx` (after edit) | "look at this", "anything wrong" |
| `/test` | test, coverage, assert | `*.test.ts`, `*.test.tsx` | "does this work", "add tests" |
| `/deploy` | deploy, production, release | `docker-compose.yml`, `ci.yml` | "ship it", "go live" |
| `/spec` | feature, requirements, acceptance | `specs/*.md` | "I want to build", "new feature" |
| `/scaffold` | create, generate, boilerplate | — | "new module", "set up" |
| `/pr` | pull request, PR, merge | — | "open a PR", "ready for review" |

### Quality Skills

| Skill | Keywords | Path patterns | Intent patterns |
|---|---|---|---|
| `/security-scan` | security, vulnerability, XSS, SQL injection | `auth/`, `middleware/` | "is this safe", "audit" |
| `/health` | health, dead code, TODO, lint | — | "clean up", "what's broken" |
| `/drift` | drift, diverge, architecture | `CLAUDE.md` | "are we on track", "what changed" |
| `/debug` | bug, error, broken, failing | — | "why is this", "not working" |

### Data & API Skills

| Skill | Keywords | Path patterns | Intent patterns |
|---|---|---|---|
| `/data-model` | schema, model, table, prisma | `prisma/`, `*.prisma` | "add a table", "data model" |
| `/api-doc` | API, endpoint, OpenAPI, swagger | `routes/`, `controllers/` | "document the API" |
| `/migrate` | migration, alter, column | `prisma/migrations/` | "change the schema" |
| `/load-test` | load, performance, k6, stress | `routes/` | "can it handle", "how fast" |

### Planning Skills

| Skill | Keywords | Path patterns | Intent patterns |
|---|---|---|---|
| `/ask` | unclear, ambiguous, what if | — | "before we build", "questions" |
| `/spec` | spec, requirements, criteria | `specs/` | "define this feature" |
| `/Planning` | plan, architecture, design | — | "how should we", "approach" |
| `/decisions` | decision, ADR, why did we | `decisions/` | "let's decide", "tradeoff" |
| `/what-next` | next, priority, what should | — | "what now", "what's next" |
| `/diagram` | diagram, flow, ERD, mermaid | — | "show me the architecture" |

### Agent Skills

| Skill | Keywords | Path patterns | Intent patterns |
|---|---|---|---|
| `/agent-catalog` | agents, catalog, registry | `agents/` | "what agents exist" |
| `/observe-agent` | observe, monitor, running | `agent-status.json` | "what's running", "agent status" |
| `/agent-activity` | activity, think, act | — | "what did the agent do" |

### Session Skills

| Skill | Keywords | Path patterns | Intent patterns |
|---|---|---|---|
| `/kickoff` | start, begin, context | — | First message of session |
| `/wrap` | done, end, wrap up | — | "that's it for today", "let's stop" |
| `/save-context` | context, tokens, long | — | "getting long", "save context" |
| `/save` | save, export, download | — | "save this table" |
| `/rewind` | undo, revert, rewind | — | "take that back", "undo" |

### Assessment Skills

| Skill | Keywords | Path patterns | Intent patterns |
|---|---|---|---|
| `/level` | level, score, assess | — | "how am I doing", "rate me" |
| `/benchmark` | benchmark, compare, top | — | "compare to best", "where do I stand" |
| `/glevel` | global, public, github setups | — | "compare globally" |
| `/rate` | rate, quality, setup | — | "rate this project" |

### Reporting Skills

| Skill | Keywords | Path patterns | Intent patterns |
|---|---|---|---|
| `/report` | report, status, progress | — | "where are we", "brief me" |
| `/standup` | standup, daily, yesterday | — | "what did I do" |
| `/changelog` | changelog, release notes | — | "what changed" |
| `/retro` | retro, reflection, improve | — | "what went well" |
| `/why` | why, history, reason | — | "why was this built" |

## How It Works

When this skill auto-triggers on a user prompt:

1. **Parse the prompt** — extract keywords, detect intent patterns
2. **Check file context** — if the user has a file open or just edited something, match path patterns
3. **Score each skill** — sum up weights from all matching methods
4. **Filter** — only skills >= 3 points
5. **Rank** — top 3 by score

## Output Format

When skills score above threshold, prepend a subtle suggestion before the main response:

```
💡 **Relevant:** `/security-scan` (8pts — editing auth middleware + "is this safe")
```

If no skills score >= 3, say nothing — do not clutter the response.

## Instructions
- This skill triggers automatically — never show it as a manual option
- Maximum 3 suggestions per prompt — usually 1 is enough
- Never suggest a skill that's already running in the current message
- The suggestion is ONE line — never a table or long explanation
- If the user is clearly in the middle of a task, don't interrupt with suggestions
- Score keywords case-insensitively
- Intent patterns are fuzzy — match the spirit, not exact words
