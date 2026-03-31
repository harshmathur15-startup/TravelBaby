# Jaya — Downstream Adoption Report (S40)
Date: 2026-03-31
Products scanned: Zimyo (d:/AI/Zimyo)

## Component Adoption

### UI Primitives (13 in template)

| Component | Template | Zimyo | Status |
|-----------|----------|-------|--------|
| Badge | Yes | Yes | overridden (hardcoded border-radius `4px` instead of `var(--radius-full)`) |
| Button | Yes | Yes | overridden (removed `outline` variant, different hover behavior, added scoped CSS transitions, different focus styles) |
| Card | Yes | Yes | as-is |
| CommandLauncher | Yes | No | ignored |
| Container | Yes | Yes | as-is |
| Input | Yes | Yes | as-is |
| LanguagePicker | Yes | No | ignored |
| Pagination | Yes | No | ignored |
| PortableTextRenderer | Yes | Yes | as-is |
| PreferenceToggles | Yes | No | ignored |
| SectionHeading | Yes | Yes | overridden (minor — hardcoded hex values mixed with tokens) |
| Skeleton | Yes | No | ignored |
| ThemeToggle | Yes | Yes | as-is |

**Summary:** 8/13 adopted (62%). 5 as-is, 3 overridden, 5 ignored.

### Section Components (37 .astro in template)

| Component | Template | Zimyo | Status |
|-----------|----------|-------|--------|
| Navbar | Yes | Yes | overridden (brand logo, different imports, product-specific nav structure) |
| NavbarMega | Yes | No | ignored |
| NavMobile | Yes | Yes | overridden (brand-specific) |
| Hero | Yes | Yes | overridden (completely rewritten — CMS props, Image component, product copy) |
| HeroSplit | Yes | No | ignored |
| HeroMinimal | Yes | No | ignored |
| HeroTrustBar | Yes | Yes | overridden |
| Features | Yes | Yes | overridden |
| Stats | Yes | Yes | overridden |
| Testimonials | Yes | Yes | as-is (minor) |
| PricingCards | Yes | Yes | as-is |
| PricingCard | Yes | Yes | overridden |
| PricingAddons | Yes | Yes | as-is |
| FAQ | Yes | Yes | overridden (CSS-only accordion, JSON-LD, CMS fallback pattern) |
| CtaSection | Yes | Yes | overridden |
| Footer | Yes | Yes | overridden (brand-specific) |
| FooterNewsletter | Yes | Yes | overridden |
| BentoGrid | Yes | No | ignored |
| ComparisonTable | Yes | Yes | as-is |
| ComparisonCell | Yes | Yes | as-is |
| CompetitorCards | Yes | No | ignored |
| CompetitorSummary | Yes | Yes | overridden |
| AIAgents | Yes | Yes | overridden (heavily — Zimyo-specific agent showcase) |
| ContactInfo | Yes | Yes | overridden |
| HowItWorks | Yes | Yes | overridden |
| Industries | Yes | Yes | overridden |
| Integrations | Yes | Yes | as-is |
| TeamGrid | Yes | Yes | as-is |
| ModuleShowcase | Yes | Yes | overridden |
| AddOns | Yes | Yes | as-is |
| DetailedComparison | Yes | Yes | as-is |
| ProductHero | Yes | Yes | overridden |
| ProductFeatures | Yes | Yes | overridden |
| ProductModules | Yes | Yes | overridden |
| ProductBenefits | Yes | Yes | overridden |
| ProductUseCases | Yes | Yes | overridden |
| ProductFAQ | Yes | Yes | overridden |

**Summary:** 33/37 adopted (89%). 10 as-is, 23 overridden, 4 ignored.

### Zimyo-Only Components (not in template)

| Component | Purpose |
|-----------|---------|
| AgentPageHero | AI agent landing hero |
| AgentBenefits | Agent value proposition |
| AgentCapabilities | Agent feature grid |
| AgentDeepDive | Agent technical detail |
| AgentFAQ | Agent-specific FAQ |
| AgentHitl | Human-in-the-loop section |
| AgentUseCases | Agent use case cards |
| AgentWorkflow | Agent workflow visualization |

**8 product innovations** — all in the AI agents vertical.

## Design Token Usage

| Metric | Count |
|--------|-------|
| Design token references (`var(--color-*`) | 379 |
| Hardcoded hex values | 92 |
| Token adoption rate | ~80% |

**Breakdown:**
- UI primitives: strong token usage (Badge, Button, Card, Input all use tokens)
- Legacy sections (from template): mostly tokens
- New Agent-* components: heaviest hardcoding (27 of 92 hex values are in Agent-* files)
- CSS files (navbar.css, footer.css, nav-mobile.css): moderate hardcoding

**Verdict:** Template design system is well-adopted for inherited components. New product-specific components tend to bypass tokens — suggests the token set may not cover all brand needs, or the authoring pattern for new components doesn't enforce token discipline.

## Schema Adoption

### Sanity Schemas (20 in template)

| Schema | Template | Zimyo | Status |
|--------|----------|-------|--------|
| siteSettings | Yes | Yes | inherited |
| page | Yes | Yes | inherited |
| blogPost | Yes | Yes | inherited |
| author | Yes | Yes | inherited |
| pricingPlan | Yes | Yes | inherited |
| testimonial | Yes | Yes | inherited |
| faqItem | Yes | Yes | inherited |
| richTextPage | Yes | Yes | inherited |
| addOn | Yes | Yes | inherited |
| aboutPage | Yes | Yes | inherited |
| featuresPage | Yes | Yes | inherited |
| comparePage | Yes | Yes | inherited |
| productPage | Yes | Yes | inherited |
| hero (object) | Yes | Yes | inherited |
| featureGrid (object) | Yes | Yes | inherited |
| statsSection (object) | Yes | Yes | inherited |
| ctaBlock (object) | Yes | Yes | inherited |
| comparisonTable (object) | Yes | Yes | inherited |
| logoCloud (object) | Yes | Yes | inherited |
| seoMeta (object) | Yes | Yes | inherited |

**Summary:** 20/20 inherited (100%). Zero replaced.

### Zimyo-Only Schema

| Schema | Purpose |
|--------|---------|
| aiAgent | AI agent document type (name, slug, capabilities, use cases) |

**1 product innovation** — `aiAgent` document type for the agent marketplace pages.

## Skill Activation

### Core Skills (22 in template — all active by default)
Zimyo has all 22 core skills active.

### Extended Skills (24 in template — opt-in)
Zimyo activated **all 24** extended skills (moved to `.claude/skills/`):
lighthouse, upgrade-deps, cleanup, agent-activity, agent-list, seo-audit, cms-sync, a11y-audit, assess, quality-judge, pulse, agent-catalog, debt, cost, public-ready, map, Planning, hooks, readiness-gate, refactor, review-pipeline, spec, standup, blueprint (note: blueprint not found in Zimyo — 23/24)

**Correction:** Zimyo has 23/24 extended skills. `blueprint` not present.

### SaaS Skills (20 in template — opt-in)
Zimyo activated **all 20** SaaS skills:
api-doc, data-model, debug, deploy, env-check, migrate, scaffold, security-scan, seed-database, ux-review, prod-ready, edge-case-check, incident, load-test, onboard, observe-agent, prompt-optimize, watch, drift (note: `drift` and `diagram` from saas may overlap with core)

**Correction:** Zimyo has `watch` from SaaS. The SaaS `diagram` skill may overlap with the core `diagram` skill — Zimyo appears to have the core version only.

### Zimyo-Only Skills
| Skill | Not in any template tier |
|-------|--------------------------|
| review (product-specific) | May be overridden version of core review |

**Summary:** Zimyo activated nearly every available skill — 22 core + 23 extended + 19 SaaS = 64 of 66 available.

## Key Findings

### Consistent Overrides (template should fix)
1. **Button component**: Zimyo removed the `outline` variant and rewrote hover/focus — template Button may be too opinionated on interaction patterns. Consider making hover behavior configurable.
2. **Badge border-radius**: Hardcoded `4px` instead of `var(--radius-full)` — suggests full-round badges don't fit all brands. Consider a `rounded` prop.
3. **Hero component**: Completely rewritten — template Hero uses config imports, Zimyo uses CMS props with fallbacks. The CMS-first pattern (props with fallback) is superior and should be adopted upstream.
4. **FAQ component**: Zimyo added JSON-LD structured data and CSS-only accordion — template FAQ is missing both. These are universal improvements.
5. **Product-* components**: All 6 overridden — these are too generic in template to be useful as-is. Products need to inject brand identity here.

### Ignored Components (template should question)
1. **CommandLauncher** — complex, possibly premature for products not yet needing command palette
2. **LanguagePicker** — only relevant for i18n-enabled products
3. **Pagination** — not needed until blog/listing pages grow
4. **Skeleton** — loading states not yet a priority
5. **PreferenceToggles** — niche utility
6. **BentoGrid** — design pattern not adopted
7. **HeroSplit, HeroMinimal** — products pick one Hero style and customize it
8. **NavbarMega** — products use simpler nav
9. **CompetitorCards** — replaced by CompetitorSummary pattern

### Product Innovations (flag for Priya)
1. **8 Agent-* section components** — entire AI agent vertical built from scratch. If other products need agent showcases, these should be extracted upstream.
2. **aiAgent Sanity schema** — reusable document type for AI agent pages.
3. **CMS prop fallback pattern** — `{items || DEFAULTS}` used across Zimyo components. More robust than template's config-only approach.
4. **JSON-LD in FAQ** — structured data for SEO, should be template-level.

### Design Token Discipline
- 80% adoption rate is good but the 92 hardcoded hex values (concentrated in Agent-* and CSS files) suggest new component authoring doesn't enforce token usage
- Recommendation: add a lint rule or hook that flags hardcoded color values in `.astro` and `.css` files

### Skill Adoption
- Zimyo activated 97% of available skills (64/66) — suggests the skill tiers are useful but the "opt-in" friction of moving files is low enough that products just activate everything. Consider whether the extended/SaaS separation adds value or just creates a step.
