# Mira — Drift & Integrity Report (S38)
Date: 2026-03-30
Status: 7 findings (4 drift, 2 stale, 1 wrong)

## CLAUDE.md Audit

| Section | Claimed | Actual | Status |
|---------|---------|--------|--------|
| UI primitives | 13 | 13 | PASS |
| Section components | 28 | 28 | PASS |
| Pages (.astro) | 18 | 18 | PASS |
| Route generators | 4 | 4 | PASS |
| CMS document types | 8 | 8 | PASS |
| CMS object types | 7 | 7 | PASS |
| Core Skills | 16 | 22 | DRIFT |
| Extended Skills | 24 | 24 | PASS |
| SaaS Skills | 18 | 20 | DRIFT |
| Hooks | 11 | 13 | DRIFT |
| Scripts | 24 | 24 | PASS |
| Rules (active) | 5 | 5 | PASS |
| Rules (SaaS) | 3 | 3 | PASS |
| Rules (total files) | 8 | 8 | PASS |
| Agents | 3 | 5 | DRIFT |
| Astro version | 6 | ^6.0.8 | PASS |
| Tailwind CSS version | 4 | ^4.2.2 | PASS |

### Drift Details

**Core Skills (claimed 16, actual 22):**
Directories in `.claude/skills/`: ask, changelog, commit, decisions, diagram, kickoff, pr, recall, recycle, report, retro, review, save-context, save, sessions, signal, stock-photos, techstack, test, what-next, why, wrap. Six skills not counted in CLAUDE.md: commit, pr, sessions, signal, stock-photos, test (or some combination was added after the count was last updated).

**SaaS Skills (claimed 18, actual 20):**
Directories in `.claude/skills-saas/`: 20 dirs. Two extra: diagram, watch (or others added since last count).

**Hooks (claimed 11, actual 13):**
CLAUDE.md lists 11 hooks in the table. settings.json contains 13 command entries: SessionStart(4), PreToolUse/Bash(2), PreToolUse/Edit|Write(1), PreCompact(1), PostToolUse/Edit|Write(2), PostToolUse/.*(1), Stop(2). The two missing from the table: `drift-check.cjs capture` (Stop) and `session-stop.cjs` vs `session-start.cjs` — the "Cost estimate" row may be session-stop.cjs, but `drift-check.cjs capture` at Stop and `drift-check.cjs verify` at SessionStart are separate hook entries that map to one table row ("Check protected file drift"). The mismatch is between 11 described behaviors and 13 command entries.

**Agents (claimed 3, actual 5):**
CLAUDE.md lists Thea, Nell, Priya. Registry now also includes Mira and Anvi (added S38). CLAUDE.md was not updated to reflect 5 agents.

## Component Name Verification

### UI Primitives (13 claimed, 13 found)

| Listed Component | File Found | Status |
|-----------------|------------|--------|
| Badge | src/components/ui/Badge.astro | PASS |
| Button | src/components/ui/Button.astro | PASS |
| Card | src/components/ui/Card.astro | PASS |
| CommandLauncher | src/components/ui/CommandLauncher.astro | PASS |
| Container | src/components/ui/Container.astro | PASS |
| Input | src/components/ui/Input.astro | PASS |
| LanguagePicker | src/components/ui/LanguagePicker.astro | PASS |
| Pagination | src/components/ui/Pagination.astro | PASS |
| PortableTextRenderer | src/components/ui/PortableTextRenderer.astro | PASS |
| PreferenceToggles | src/components/ui/PreferenceToggles.astro | PASS |
| SectionHeading | src/components/ui/SectionHeading.astro | PASS |
| Skeleton | src/components/ui/Skeleton.astro | PASS |
| ThemeToggle | src/components/ui/ThemeToggle.astro | PASS |

### Section Components (28 claimed, 28 found)

| Listed Component | File Found | Status |
|-----------------|------------|--------|
| Navbar | src/components/sections/Navbar.astro | PASS |
| NavbarMega | src/components/sections/NavbarMega.astro | PASS |
| NavMobile | src/components/sections/NavMobile.astro | PASS |
| Hero | src/components/sections/Hero.astro | PASS |
| HeroSplit | src/components/sections/HeroSplit.astro | PASS |
| HeroMinimal | src/components/sections/HeroMinimal.astro | PASS |
| HeroTrustBar | src/components/sections/HeroTrustBar.astro | PASS |
| Features | src/components/sections/Features.astro | PASS |
| Stats | src/components/sections/Stats.astro | PASS |
| Testimonials | src/components/sections/Testimonials.astro | PASS |
| PricingCards | src/components/sections/PricingCards.astro | PASS |
| FAQ | src/components/sections/FAQ.astro | PASS |
| CtaSection | src/components/sections/CtaSection.astro | PASS |
| Footer | src/components/sections/Footer.astro | PASS |
| FooterNewsletter | src/components/sections/FooterNewsletter.astro | PASS |
| BentoGrid | src/components/sections/BentoGrid.astro | PASS |
| ComparisonTable | src/components/sections/ComparisonTable.astro | PASS |
| ComparisonCell | src/components/sections/ComparisonCell.astro | PASS |
| CompetitorCards | src/components/sections/CompetitorCards.astro | PASS |
| AIAgents | src/components/sections/AIAgents.astro | PASS |
| ContactInfo | src/components/sections/ContactInfo.astro | PASS |
| HowItWorks | src/components/sections/HowItWorks.astro | PASS |
| Integrations | src/components/sections/Integrations.astro | PASS |
| TeamGrid | src/components/sections/TeamGrid.astro | PASS |
| ModuleShowcase | src/components/sections/ModuleShowcase.astro | PASS |
| AddOns | src/components/sections/AddOns.astro | PASS |
| DetailedComparison | src/components/sections/DetailedComparison.astro | PASS |
| PricingCard | src/components/sections/PricingCard.astro | PASS |

## Docs Audit

| Doc | Exists | References Valid | Status |
|-----|--------|-----------------|--------|
| docs/getting-started.md | Yes | References .env.example (exists) | PASS |
| docs/saas-upgrade.md | Yes | — | PASS |
| docs/products.md | Yes | — | PASS |
| docs/skill-tiers.md | Yes | — | PASS |
| docs/inheritance.md | Yes | — | PASS |
| docs/roadmap.md | Yes | — | STALE |

Note: `docs/roadmap.md` was flagged in memory as "moved to Template project, needs audit" — may contain outdated content.

## Hook Health

| Hook Event | Script Path | Exists | Status |
|------------|-------------|--------|--------|
| SessionStart | scripts/session-start.cjs | Yes | PASS |
| SessionStart | scripts/memory-integrity.cjs | Yes | PASS |
| SessionStart | scripts/drift-check.cjs verify | Yes | PASS |
| SessionStart | scripts/component-validation.cjs | Yes | PASS |
| PreToolUse (Bash) | scripts/recycle-guard.cjs | Yes | PASS |
| PreToolUse (Bash) | scripts/bash-blocker.cjs | Yes | PASS |
| PreToolUse (Edit\|Write) | scripts/file-protection.cjs | Yes | PASS |
| PreCompact | scripts/handoff-generator.cjs | Yes | PASS |
| PostToolUse (Edit\|Write) | scripts/prettier-format.cjs | Yes | PASS |
| PostToolUse (Edit\|Write) | scripts/quality-gate.cjs | Yes | PASS |
| PostToolUse (.*) | scripts/session-tracker.cjs | Yes | PASS |
| Stop | scripts/session-stop.cjs | Yes | PASS |
| Stop | scripts/drift-check.cjs capture | Yes | PASS |

All 13 hook commands reference scripts that exist on disk.

## Agent Registry

| Agent | Dir Exists | Profile Exists | Listed in Registry | Status |
|-------|-----------|----------------|-------------------|--------|
| Thea | Yes | Yes | Yes | PASS |
| Nell | Yes | Yes | Yes | PASS |
| Priya | Yes | Yes | Yes | PASS |
| Mira | Yes | Yes | Yes | PASS |
| Anvi | Yes | Yes | Yes | PASS |

Registry lists 5 agents. CLAUDE.md lists 3. Board.md and board-archive.md exist.

## Protected Files

All 12 files listed in `.claude/protected-files.json` exist on disk. No missing references.

## Rule Alignment

All 8 rule files exist in `.claude/rules/`:
- general.md, security.md, frontend.md, performance.md, testing.md (active — 5)
- backend.md, database.md, agents.md (SaaS — 3)

Rules reference patterns that exist (scripts/, Prisma conventions, Astro components). No broken references found.

## Recommendations

Ordered by severity:

1. **CLAUDE.md — Core Skills count: update 16 to 22** (DRIFT)
   Six skills were added without updating the count. Also update the description to reflect full list.

2. **CLAUDE.md — SaaS Skills count: update 18 to 20** (DRIFT)
   Two skills were added without updating the count.

3. **CLAUDE.md — Agents count: update 3 to 5** (DRIFT)
   Mira and Anvi were added in S38 but CLAUDE.md still says "3 | Thea (benchmark), Nell (debt), Priya (upstream extraction)". Should read "5 | Thea (benchmark), Nell (debt), Priya (upstream), Mira (drift), Anvi (quality)".

4. **CLAUDE.md — Hooks count: update 11 to 13** (DRIFT)
   The hooks table describes 11 behaviors but settings.json has 13 command entries. Either update the count to 13 or add the missing two rows to the table (drift-check capture at Stop, and session-start vs session-stop as separate entries).

5. **docs/roadmap.md — audit needed** (STALE)
   Flagged in memory as moved from another project. May contain outdated or irrelevant content.

6. **Agent directory casing inconsistency** (WRONG)
   Thea, Nell, Priya use PascalCase dirs. Anvi, Mira use lowercase. Should be consistent — convention says PascalCase for agent dirs per registry pattern.
