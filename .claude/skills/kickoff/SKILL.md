---
name: kickoff
description: Start-of-session ritual — reads memory, recent commits, open specs, and primes Claude with full project context.
---

# Kickoff Skill

Run this at the start of every session. Eliminates the "catch me up" overhead.

## Workflow

Read all of the following in parallel:

1. `./CLAUDE.md` — project overview and conventions
2. `~/.claude/projects/<project>/memory/MEMORY.md` — persistent learnings
3. `git log --oneline -10` — last 10 commits (what was recently built)
4. `git status` — any uncommitted changes
5. `git stash list` — any stashed work
6. `./specs/` — list any spec files present (read titles only)
7. Any open PRs: `gh pr list --state=open` (skip if gh not available)
8. `.claude/tool.log` — last 5 lines (what tools ran recently)
9. `./thoughts/handoffs/` — read the most recent handoff file (if exists) — this is the last session's state snapshot saved before compaction

## Output Format

Print a structured session brief — keep it concise:

---

### Session Brief

**Project:** <name from CLAUDE.md>
**Status:** <one line from MEMORY.md project status>

**Recent Work** *(last 10 commits)*
- <grouped summary — not raw commit list>

**Uncommitted Changes**
- <files changed, or "Working tree clean">

**Open Specs**
- <list of spec files in ./specs/, or "None">

**Open PRs**
- <PR titles, or "None / gh not available">

**Last Session Handoff**
- <key state from latest handoff file, or "No handoff found">

**Suggested starting point:**
<Based on recent commits + open specs + git status + handoff, recommend what to work on next — one clear sentence>

---

## Upstream Extraction (runs in background)

While presenting the session brief, spawn ONE general-purpose background agent named **Priya** with these instructions:

```
You are Priya — the upstream extractor. Your job: scan products built from this
template for generic patterns worth pulling back — across the FULL STACK, not
just the Claude Code harness.

Scan: d:/AI/Zimyo
Template: d:/AI/_template-website

PHASE 1 — PLAN (always do this first):
1. Verify access: run `ls d:/AI/Zimyo` and `git log --oneline -5` in the product
2. Inventory BOTH repos across all layers:

   HARNESS LAYER:
   - Skills: ls .claude/skills/
   - Hooks, scripts, rules: ls .claude/rules/, scripts/
   - Agent families: ls agents/

   WEBSITE LAYER:
   - Components/layouts: ls src/components/, src/layouts/, src/pages/
   - CMS schemas: ls sanity/schemas/ or similar
   - Utilities/helpers: ls src/utils/, src/lib/, src/helpers/
   - Middleware: ls src/middleware/, server/middleware/
   - Config files: astro.config, tailwind.config, tsconfig, etc.
   - API routes: ls src/pages/api/ or server/routes/
   - Types/interfaces: ls shared/, src/types/
   - Public assets patterns: ls public/
   - SEO patterns: sitemaps, meta, robots, structured data
   - Build/deploy: Dockerfile, CI configs, deploy scripts

3. Show the delta — items in product that are NOT in template, per layer

PHASE 2 — EVALUATE:
4. For each delta item, ask: "Is this generic (any website benefits) or product-specific?"
5. Generic candidates get flagged as "upstream innovation"
6. Group by layer (harness vs website) so it's clear what strengthens the template's
   developer tooling vs what strengthens the template's website foundation

IMPORTANT: Template gets the PATTERN, not the product's implementation.
- Strip product-specific logic (business rules, API keys, product names, branding)
- Extract the reusable mechanism (component pattern, schema structure, config approach)
- Document what to adapt, not what to copy
- Website patterns matter MORE than harness patterns — prioritize accordingly

If Zimyo doesn't exist yet or has no commits, return: "No upstream candidates — product not started."

Output format:
1. Plan summary: inventory of both repos per layer, with counts and delta
2. Two tables of upstream candidates — one per layer:

   WEBSITE LAYER:
   | Innovation | Found In | Generic? | Template Adaptation | Effort |

   HARNESS LAYER:
   | Innovation | Found In | Generic? | Template Adaptation | Effort |

RETURN FORMAT: Plan summary first, then the tables (or "No upstream candidates").
```

Iteration cap: 10 | Write scope: none (report only)

IMPORTANT: After Priya returns, verify at least one finding before presenting. If her result seems empty or suspicious, investigate before publishing.

After Priya returns, append her findings to the session brief under **Upstream Candidates** (or skip if "No upstream candidates").

## Instructions
- Read files in parallel for speed
- Do NOT read every spec file in full — just list their names/titles
- The "Suggested starting point" is the most valuable line — make it specific and actionable
- If MEMORY.md has a Critical Build Order, reference it in the suggestion
- Keep the whole output under 30 lines (excluding upstream table) — this is a brief, not a report
- After output, say: "Ready. What are we building?"
