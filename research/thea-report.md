# Thea Benchmark Report — 2026-03-31 (Session 38)

**Author:** Thea (Blueprint Architect)
**Previous run:** 2026-03-28 (S34) — score 88/100
**Sage download:** Yes — Scout triple benchmark S35/S37, convention comparison, competitor deep dives
**Confidence:** 85%

---

## Sage's Research Summary

### What Sage/Scout found (directly applicable)

**Scout Triple Benchmark (S35/S37)** scored this template at **127/140** on a 7-dimension rubric (/20 each). Ranked **#1 of 4** website templates, leading ixartz by 26 points. Key scores:
- Build Quality: 18/20
- Components: 19/20
- CMS Integration: 18/20
- SEO: 19/20
- Testing: 17/20
- AI Governance: 20/20
- Clone-to-Running: 16/20

**Competitors identified by Scout:** ixartz (101/140), AstroWind (83/140), Foxi (72/140)

**Convention Comparison (Sage S30):** Compared governance structures of SuperClaude (21K stars), ECC (82K stars), BMAD (41K stars) vs Kira. Key finding: Kira leads on 7 governance dimensions, behind on 5. No competitor has identity-as-governance or communication profiling. ECC's hooks-as-automated-governance (17 hooks enforcing rules at runtime) is the closest pattern to what this template ships.

**What's directly applicable:**
- Scout confirms #1 position in website templates — validated independently of Thea's rubric
- AstroWind stalled (7 months, last push 2025-08-19) — competitive threat is decreasing
- ixartz is the only active competitor with velocity — Scout recommends monitoring
- ECC's 108 skill files and hook-based governance is the closest thing to our AI harness in any project

---

## Current Template Inventory

| Layer | Count | Details |
|-------|-------|---------|
| **Section components** | 35 | Hero (4 variants), Nav (3), Footer (2), Pricing (3), Product (4), Comparison (3), plus Features, Stats, Testimonials, FAQ, CTA, BentoGrid, HowItWorks, Integrations, TeamGrid, ModuleShowcase, AddOns, AIAgents, Industries, ContactInfo, CompetitorSummary |
| **UI primitives** | 13 | Badge, Button, Card, CommandLauncher, Container, Input, LanguagePicker, Pagination, PortableTextRenderer, PreferenceToggles, SectionHeading, Skeleton, ThemeToggle |
| **CSS/TS support files** | 7 | contact-info.css, detailed-comparison.css, footer.css, nav-mobile.css, navbar-scroll.ts, navbar.css, pricing-cards.css |
| **Pages** | 24 | Home, Features, Pricing, About, Contact, Get Started, Blog (3), Compare, Components, Preview, Search, Privacy, Terms, Products (2), i18n (es), 404, 500 |
| **Route generators** | 4 | robots.txt, RSS, manifest.json, OG images |
| **CMS document schemas** | 13 | siteSettings, page, blogPost, author, pricingPlan, testimonial, faqItem, richTextPage, addOn, aboutPage, featuresPage, comparePage, productPage |
| **CMS object schemas** | 7 | hero, featureGrid, statsSection, ctaBlock, comparisonTable, logoCloud, seoMeta |
| **Lib utilities** | 11 | blog-data, comparison-utils, hero-utils, i18n, icons, logger, og-image, portable-text-utils, sanity, slugify + queries/ (7 query modules + index) |
| **Query modules** | 7 | site, pages, pricing, blog, testimonials, faq, products |
| **Unit/integration tests** | 18 | 11 lib tests + 7 query tests |
| **Scripts** | 32 | 16 hook scripts + 14 test files + techstack.py + delivery-check.cjs |
| **Skills (core)** | 22 | test, recall, report, review, signal, stock-photos, retro, commit, pr, save, save-context, sessions, recycle, wrap, techstack, what-next, why, ask, decisions, diagram, changelog, kickoff |
| **Rules** | 8 | general, testing, backend, performance, database, agents, security, frontend |
| **Agents** | 5 | Thea (benchmark), Nell (debt), Mira (drift), Anvi (quality), Priya (upstream) |

**Total components (sections + UI):** 48
**Total pages + routes:** 28
**Total CMS schemas:** 20

---

## Competitive Benchmark

### 10-Dimension Rubric (weights from thea-website-dimensions.md)

| # | Dimension | Weight | Template S38 | Template S34 | Delta | Best Competitor | Their Score | Gap |
|---|-----------|--------|:---:|:---:|:---:|---|:---:|:---:|
| 1 | Visual Design & Polish | /15 | **12** | 12 | = | AstroWind | 13 | -1 |
| 2 | Component & Page Richness | /12 | **12** | 12 | = | AstroWind | 11 | +1 |
| 3 | Performance & Core Web Vitals | /10 | **9** | 9 | = | AstroPaper/Starlight | 9 | 0 |
| 4 | CMS & Content Management | /10 | **10** | 10 | = | -- | 5 | +5 |
| 5 | SEO & Discoverability | /10 | **10** | 10 | = | AstroPaper | 9 | +1 |
| 6 | Customization & DX | /10 | **10** | 10 | = | Starlight | 8 | +2 |
| 7 | Accessibility | /8 | **8** | 8 | = | Accessible Astro | 8 | 0 |
| 8 | Spawn & Setup Speed | /8 | **7** | 7 | = | Starlight | 8 | -1 |
| 9 | Test Coverage & CI | /7 | **6** | 5 | +1 | Starlight | 6 | 0 |
| 10 | AI & Agent Governance | /5 | **5** | 5 | = | -- | 2 | +3 |
| | **TOTAL** | **/100** | **89** | **88** | **+1** | | | |

### Score Change Evidence (S34 to S38)

**D9: Test Coverage 5 to 6 (+1)** — 230 tests now passing (per commit 2eb3209). 18 unit tests for lib + queries. 14 script tests. Playwright E2E (6 files). axe-core WCAG 2.1 AA. This closes the gap with Starlight (previously they led by 1). Still no component-level Storybook-style tests.

**All other dimensions unchanged.** No new visual work, no new pages, no CMS changes, no performance changes, no new i18n work since S34. The S38 session focused on test coverage and audit, not feature development.

### Full Competitor Table (updated)

| Template | Visual | Rich | Perf | CMS | SEO | DX | A11y | Spawn | Test | AI | Total |
|----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **This Template** | **12** | **12** | **9** | **10** | **10** | **10** | **8** | **7** | **6** | **5** | **89** |
| AstroWind | 13 | 11 | 9 | 5 | 8 | 7 | 5 | 7 | 1 | 0 | 66 |
| Starlight | 9 | 6 | 9 | 5 | 8 | 8 | 7 | 8 | 6 | 0 | 66 |
| ScrewFast | 12 | 10 | 8 | 5 | 7 | 6 | 5 | 7 | 0 | 0 | 60 |
| AstroPaper | 8 | 6 | 9 | 5 | 9 | 7 | 7 | 7 | 1 | 0 | 59 |
| Accessible Astro | 8 | 7 | 8 | 5 | 6 | 7 | 8 | 6 | 1 | 2 | 58 |

**Lead over #2 (AstroWind/Starlight): 23 points.** Was 22 in S34. Marginal widening from test improvement.

---

## Overall Score: 89/100

Up from 88/100 in S34. Up from 79/100 at initial assessment (pre-S34 improvements).

### Score trajectory
| Session | Score | Key changes |
|---------|:---:|---|
| S24 (initial) | 79 | Baseline — honest rubric exposed gaps in visual, testing, i18n |
| S34 (Tier 1-3) | 88 | +9: hero variants, ESLint a11y, WCAG docs, preference toggles, Command Launcher, i18n foundation, NavbarMega, slugify |
| S38 (current) | 89 | +1: 230 tests passing, Anvi baseline, Mira drift checks |

---

## Top 5 Gaps to Close (ordered by impact)

### 1. Visual Design & Polish (12/15, -1 vs AstroWind)
**Impact: High.** Visual quality is the #1 filter on every template marketplace. The template is professional but not eye-catching. AstroWind still leads on scroll animations, GSAP-style reveals, and landing page polish.
**What would close it:** Scroll-triggered reveal animations (CSS + IntersectionObserver, no GSAP dependency), gradient mesh hero backgrounds, subtle hover micro-interactions on cards.
**Points available:** +2-3

### 2. Spawn & Setup Speed (7/8, -1 vs Starlight)
**Impact: Medium-High.** Sanity CMS adds inherent setup friction (API keys, dataset creation). Starlight wins because `npm create` gets you running in under 60 seconds.
**What would close it:** Sanity seed data script (sanity-seed.cjs exists but needs content), fallback mock data so the site renders fully without CMS configured.
**Points available:** +1

### 3. i18n & Localization (bonus dimension, currently partial)
**Impact: Medium.** i18n foundation exists (es/index.astro, LanguagePicker, i18n.ts) but is incomplete — no hreflang tags, no locale-aware routing for all pages, RTL not tested.
**What would close it:** hreflang in BaseLayout, locale-prefixed routes for all pages, RTL CSS utilities.
**Points available:** +3-4 on bonus dimension (not counted in /100)

### 4. Product Pages (new dimension — not yet scored)
**Impact: Medium.** Product pages exist (products/index.astro, products/[slug].astro) with 4 dedicated section components (ProductHero, ProductFeatures, ProductBenefits, ProductModules). CMS schema (productPage) supports it. This is a differentiator no competitor has — config-driven multi-product support.
**What would close it:** Already strong. Needs mock data for product pages so they render on fresh clone.

### 5. Competitive Analysis Tools (embedded — no separate score)
**Impact: Low-Medium.** Compare page, ComparisonTable, CompetitorCards, CompetitorSummary, DetailedComparison all exist. This is unique in the ecosystem — no other template ships competitive analysis sections.
**What would close it:** Already strong. Document the pattern in getting-started.md.

---

## What Changed Because of This Run

- **Sage download integrated:** Yes. Scout S35/S37 triple benchmark data, Sage convention comparison, and competitor deep dives all consumed. Scout's 7-dimension /140 rubric cross-validates Thea's 10-dimension /100 rubric — both rank the template #1.
- **New competitors identified:** None new. Sage's competitor set (ixartz, AstroWind, Foxi) overlaps with Thea's (AstroWind, Starlight, ScrewFast, AstroPaper, Accessible Astro). ixartz is the one Sage tracks that Thea should add to the next deep dive — it's the only competitor with active velocity.
- **Score vs last benchmark:** 89/100 (was 88/100 in S34). +1 from test coverage improvements (230 tests passing).
- **Cross-validation with Scout:** Scout scored website template 127/140. Thea scores 89/100. Both place the template at #1 in the ecosystem. The rubrics weight differently (Scout gives AI governance 20/20 at full weight; Thea caps it at 5/100 for honest buyer relevance) but the ranking agrees.

### Remaining honest gaps
| Gap | Points lost | Effort |
|-----|:---:|---|
| Visual animations/polish | 3 | Medium — CSS animations, no GSAP |
| Spawn friction (Sanity setup) | 1 | Low — seed data + mock fallbacks |
| i18n completeness | 0 (bonus) | Medium — hreflang, RTL, routing |
| Component-level unit tests | 1 | Medium — Vitest component tests |
| ixartz not in deep dive roster | -- | Low — add to next benchmark cycle |

---

*Next run should add ixartz to the competitor deep dive roster and close the visual animation gap. The template is mature — incremental improvements, not architectural changes.*
