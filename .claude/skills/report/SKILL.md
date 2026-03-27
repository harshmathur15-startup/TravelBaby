---
name: report
description: Generate a project status report — what's built, what's left, progress vs plan. For briefing yourself or others after a break.
---

# Report Skill

Generates a clear project status snapshot. Use after a break, before a planning session, or to brief a stakeholder.

## Usage
`/report` — full status report
`/report brief` — 5-line executive summary only
`/report <audience>` — tailored for: `dev`, `pm`, `stakeholder`

## Workflow

1. Read `CLAUDE.md` — intended features and architecture
2. Read `MEMORY.md` — current status
3. Run `git log --oneline -20` — what's been committed
4. Glob `src/components/**`, `src/pages/**`, `sanity/schemas/**` — what actually exists
5. Glob `./specs/*.md` — read each for implementation status
6. Compare intended (CLAUDE.md features) vs actual (git log + file structure)

## Output Format

```markdown
# Project Status Report
**Generated:** YYYY-MM-DD
**Project:** <name>

## Executive Summary
[2-3 sentences: where the project stands, what's next, any blockers]

## Progress

### Website Layer
| Component | Count | Status |
|---|---|---|
| Pages | X | list |
| UI Primitives | X | list |
| Section Components | X | list |
| CMS Schemas | X | list |

### Harness Layer
| Layer | Count | Status |
|---|---|---|
| Skills | X | list |
| Rules | X | |
| Scripts | X | |
| Hooks | X | |
| Agents | X | |

## What's Been Built
- <list of completed, committed work>

## What's In Progress
- <uncommitted changes or partial implementations>

## Blockers
- <anything blocking progress, or "None">

## Next Milestone
[The next meaningful chunk of work that could be demo'd or reviewed]
```

## Audience Variants
- **`/report dev`**: include file structure, tech debt, harness details
- **`/report pm`**: features only, no technical detail, status in plain English
- **`/report stakeholder`**: executive summary + website features + next milestone only

## Instructions
- Never invent progress — only report what git log and file structure confirm
- If project is greenfield, say so clearly
