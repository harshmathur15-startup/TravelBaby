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
9. `./thoughts/handoffs/` — read the most recent handoff file (if exists)
10. `agents/family/board.md` — read if exists (agent notes from last session)

## Health Checks (run in parallel with reads)

- If `.claude/tool.log` exceeds 5000 lines, trim to last 3000 lines

## Output Format

Print a structured session brief — keep it concise:

---

### Session Brief

**Project:** <name from CLAUDE.md>
**Status:** <one line from MEMORY.md project status>
**Health:** <memory integrity + drift check results, or "All green">

**Website Template's Stack**
| Layer | Count |
|-------|-------|
| Skills | <count dirs in .claude/skills/> |
| Rules | <count files in .claude/rules/> |
| Scripts | <count files in scripts/> |
| Agents | <count dirs in agents/family/> |
| Hooks | <count "command" entries in .claude/settings.json> |
| Research | <count files in research/> |

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

**Skills to run this session:**
<Based on triggers below, recommend 2-5 relevant skills>

---

## Skill Recommendations (part of session brief)

Check these triggers against project state and recommend matching skills:

| Trigger | Skills to Recommend |
|---|---|
| New code since last session (git diff) | /test, /review, /edge-case-check (SaaS) |
| New pages or components added | /lighthouse, /seo-audit, /a11y-audit |
| Sanity schemas changed | /cms-sync |
| Dependencies not checked in 7+ days | /upgrade-deps |
| No /security-scan in last 5 sessions | /security-scan (SaaS) |
| Approaching deployment (roadmap status) | /prod-ready (SaaS), /env-check (SaaS), /public-ready |
| New or updated specs | /readiness-gate |
| Entering a new roadmap phase | /readiness-gate |
| No /cleanup in last 10 sessions | /cleanup |

Keep this section to 2-5 recommendations max. Don't list every skill — only what's relevant NOW.

## Upstream Extraction (runs in background)

While presenting the session brief, spawn ONE general-purpose background agent named **Priya** with these instructions:

```
You are Priya — the upstream extractor. Your job: scan products built from this
template for generic patterns worth pulling back — across the FULL STACK, not
just the Claude Code harness.

DISCOVERY (run before scanning):
1. Template dir: current working directory (auto-detected)
2. Product dirs: scan parent directory for sibling projects that have a CLAUDE.md
   - Run: ls -d ../*/CLAUDE.md 2>/dev/null
   - Exclude: directories starting with _ or . (these are templates, not products)
3. If no products found: return "No upstream candidates — no product projects found."
4. If multiple products found: scan all, report per product.

PHASE 1 — PLAN (always do this first):
1. Discover products using the DISCOVERY steps above
2. For each product found, verify access: run `ls <product-dir>` and `git log --oneline -5`
3. Inventory BOTH repos across all layers:

   HARNESS LAYER:
   - Skills: ls .claude/skills/
   - Hooks, scripts, rules: ls .claude/rules/, scripts/
   - Agent families: ls agents/

   WEBSITE LAYER:
   - Components/layouts: ls src/components/, src/layouts/, src/pages/
   - CMS schemas: ls sanity/schemas/ or similar
   - Utilities/helpers: ls src/utils/, src/lib/, src/helpers/
   - Middleware: ls src/middleware/, server/middleware/
   - Config files: astro.config, tsconfig, etc.
   - API routes: ls src/pages/api/ or server/routes/
   - Types/interfaces: ls shared/, src/types/
   - Public assets patterns: ls public/
   - SEO patterns: sitemaps, meta, robots, structured data
   - Build/deploy: Dockerfile, CI configs, deploy scripts

3. Show the delta — items in product that are NOT in template, per layer

PHASE 2 — EVALUATE:
4. For each delta item, ask: "Is this generic (any website benefits) or product-specific?"
5. Generic candidates get flagged as "upstream innovation"
6. Group by layer (harness vs website)

IMPORTANT: Template gets the PATTERN, not the product's implementation.
- Strip product-specific logic (business rules, API keys, product names, branding)
- Extract the reusable mechanism (component pattern, schema structure, config approach)
- Website patterns matter MORE than harness patterns — prioritize accordingly

If no products found or none have commits, return: "No upstream candidates — no active products."

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

<!-- PRODUCT: Activate the section below after cloning. Replace [RENAME] placeholders with your agent names. Remove this comment and the Priya section above (Priya audits the template, not products). -->

<!--
## [Benchmark] — Blueprint Sync (runs in background)

While presenting the session brief, spawn ONE background agent named **[Benchmark]** with these instructions:

```
You are [Benchmark] — [Product]'s Blueprint Architect. Your job: keep [Product]
current with Template-website. One direction only — what is [Product] missing
that Template has?

Steps:
1. Read Template-website's rules, scripts, skills, and agent framework
2. Read [Product]'s rules, scripts, skills, and agent framework
3. Compare: what does Template-website have that [Product] is missing or behind on?
4. For each gap, assess: is it relevant NOW given [Product]'s current phase?

Skip template-only artifacts (Thea, Nell, Priya profiles, research reports).
Focus on rules, scripts, hooks, skills, agent framework, and config patterns.

Output format (or "Fully synced" if no gaps):

**Missing in [Product]**
| Gap | Category | Relevant Now? | Effort |

RETURN FORMAT: Return ONLY the table or "Fully synced." Nothing else.
```

Iteration cap: 5 | Write scope: none (report only)

## Governance Audit (runs in background at kickoff)

While presenting the session brief, spawn governance agents as background agents alongside [Benchmark]:

### Step 1 — [Benchmark] + [Quick Debt] + [Drift] (parallel)

Spawn THREE background agents simultaneously:

**[Benchmark]** — as defined above (Blueprint Sync).

**[Quick Debt] (changed files only):**
```
You are [Quick Debt] — [Product]'s quick debt scanner. You only scan files changed
since the last session.

Steps:
1. Run: git diff --name-only HEAD~5 — get list of recently changed files
2. For each changed .ts/.tsx/.astro file, check:
   - TODOs without owners
   - File over 300 lines (components over 200)
   - Type escapes: `any`, `ts-ignore`, `ts-expect-error`
3. If no relevant files changed, report "No changes since last session" and stop

Output format:
| File | Issue | Line | Severity |

Then update your profile and append a board entry.
```
Iteration cap: 3 | Write scope: [name]/profile.md, board.md

**[Drift] (integrity check):**
```
You are [Drift] — [Product]'s drift and integrity checker. Verify claims match reality.

Checks:
1. CLAUDE.md accuracy — file counts, directory structure, tech stack claims
2. Hook health — every hook in .claude/settings.json points to a script that exists
3. Protected files — do all files in .claude/protected-files.json actually exist?
4. Agent registries — do all agents listed in registries have profile directories?
5. Rule compliance — do rules reference patterns that actually exist in the codebase?

Output format:
| Check | Status | Evidence |
(PASS/DRIFT/FAIL per check)

Then update your profile and append a board entry.
```
Iteration cap: 5 | Write scope: [name]/profile.md, board.md, research/[name]-report.md

### Step 2 — [Accountability] (after [Quick Debt] + [Drift] complete)

After both return, spawn **[Accountability]**:

```
You are [Accountability] — [Product]'s accountability enforcer.

Read board entries from [Quick Debt] and [Drift] this session.
Compare against prior findings. Score the session.
Flag any item open for 3+ sessions as ESCALATE.
Prune resolved entries from board.md (50-line cap).
Archive old entries to board-archive.md.

Output format:
**Session Governance Score:** <X/100>
**New findings:** <count>
**Recurring (unfixed):** <count>
**Fixed since last run:** <count>
**Escalations:** <list or "None">

Then update your profile.
```
Iteration cap: 5 | Write scope: [name]/profile.md, board.md, board-archive.md, research/[name]-audit.md, research/[name]-ledger.md

After [Accountability] returns, append governance score to the session brief. Surface escalations prominently.
-->

## Instructions
- Launch governance agents in parallel as background agents during brief presentation
- After [Quick Debt] + [Drift] return, launch [Accountability]
- Read files in parallel for speed
- Do NOT read every spec file in full — just list their names/titles
- The "Suggested starting point" is the most valuable line — make it specific and actionable
- Keep the whole output under 30 lines (excluding upstream table) — this is a brief, not a report
- After output, say: "Ready. What are we building?"
