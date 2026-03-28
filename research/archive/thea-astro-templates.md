# Astro Template Ecosystem — Deep Research

Sage | 2026-03-24 | 25 templates analyzed | Sources: GitHub API, astro.build/themes, community directories

## Scoring Rubric

| Dimension | /20 | What It Measures |
|-----------|-----|------------------|
| App Code | /20 | Component architecture, TypeScript, code quality, page count, feature richness |
| Docs | /20 | README quality, setup guide, configuration docs, inline comments, examples |
| Tests | /20 | Unit tests, e2e tests, CI pipeline, linting, type checking |
| Agent Governance | /20 | AGENTS.md, CLAUDE.md, MCP config, AI-ready structure, contribution guides |
| Spawn Ready | /20 | How fast a new project can launch from this — env setup, customization, CMS swap |

---

## Template Directory

### 1. Starlight (withastro/starlight)
- **URL**: https://github.com/withastro/starlight
- **Stars**: 8,165
- **Category**: Documentation
- **Components**: Search (Pagefind), sidebar nav, code blocks, tabs, cards, steps, badges, icons, hero/splash
- **CMS**: MDX / Markdown (content collections)
- **Pages**: Configurable (docs structure, splash landing)
- **SEO**: Sitemap, OG tags, structured data
- **Dark Mode**: Yes (built-in toggle)
- **i18n**: Full (i18next-powered, fallback content, translation notices)
- **Accessibility**: Strong (keyboard nav, ARIA, semantic HTML, skip links)
- **Test Coverage**: Unit tests (__tests__) + E2E tests (__e2e__) + CI
- **Last Commit**: 2026-03-24 (active daily)
- **Score**: **78/100** — App Code: 18 | Docs: 20 | Tests: 18 | Agent Gov: 6 | Spawn: 16

### 2. AstroWind (onwidget/astrowind)
- **URL**: https://github.com/onwidget/astrowind
- **Stars**: 5,526
- **Category**: Marketing / SaaS / Landing Page / Blog
- **Components**: Hero, Features, FAQs, Pricing, Testimonials, Stats, Steps, CTA, Blog cards
- **CMS**: MDX / Markdown (content collections)
- **Pages**: ~15+ (Home, Services, Pricing, About, Contact, Terms, Privacy, Blog, SaaS landing, Startup landing, Personal)
- **SEO**: Sitemap, robots.txt, OG tags, structured data, canonical URLs
- **Dark Mode**: Yes + RTL support
- **i18n**: Partial (RTL-ready, community i18n forks exist)
- **Accessibility**: Good (semantic HTML, ARIA labels)
- **Test Coverage**: None (no test directory, ESLint + Prettier only)
- **Last Commit**: 2025-08-19 (7 months stale)
- **Score**: **55/100** — App Code: 17 | Docs: 14 | Tests: 4 | Agent Gov: 2 | Spawn: 18

### 3. AstroPaper (satnaing/astro-paper)
- **URL**: https://github.com/satnaing/astro-paper
- **Stars**: 4,374
- **Category**: Blog
- **Components**: Blog cards, tag system, fuzzy search, breadcrumbs, social share, TOC
- **CMS**: Markdown / MDX (content collections)
- **Pages**: ~8 (Home, Blog, Tags, Search, About, 404, individual posts)
- **SEO**: Sitemap, robots.txt, OG images (Satori), canonical, RSS feed
- **Dark Mode**: Yes (system + toggle)
- **i18n**: None (community fork exists: astro-paper-i18n)
- **Accessibility**: Strong (screen-reader tested with VoiceOver + TalkBack, semantic HTML, ARIA)
- **Test Coverage**: None (ESLint + type checking only)
- **Last Commit**: 2026-01-13
- **Score**: **52/100** — App Code: 15 | Docs: 16 | Tests: 3 | Agent Gov: 2 | Spawn: 16

### 4. Astroship (surjithctly/astroship)
- **URL**: https://github.com/surjithctly/astroship
- **Stars**: 1,909
- **Category**: Startup / Marketing / Landing Page
- **Components**: Hero, Features grid, Pricing table, Testimonials, CTA, Navbar, Footer, Contact form
- **CMS**: Markdown (content collections)
- **Pages**: ~6 (Home, About, Blog, Contact, Pricing, 404)
- **SEO**: Sitemap, RSS, OG tags
- **Dark Mode**: No
- **i18n**: No
- **Accessibility**: Basic (semantic HTML)
- **Test Coverage**: None
- **Last Commit**: 2025-03-14 (12 months stale)
- **Score**: **40/100** — App Code: 12 | Docs: 12 | Tests: 2 | Agent Gov: 2 | Spawn: 12

### 5. Astro Cactus (chrismwilliams/astro-theme-cactus)
- **URL**: https://github.com/chrismwilliams/astro-theme-cactus
- **Stars**: 1,559
- **Category**: Blog / Personal
- **Components**: Blog posts, Notes, Pagefind search, TOC, Webmentions, OG image gen (Satori), Expressive Code
- **CMS**: Markdown / MDX (content collections)
- **Pages**: ~6 (Home, Blog, Notes, About, 404)
- **SEO**: Sitemap, robots.txt, RSS, OG images, Web App Manifest
- **Dark Mode**: Yes (Dracula dark / GitHub light)
- **i18n**: No
- **Accessibility**: Good (semantic HTML, ARIA, responsive)
- **Test Coverage**: None (ESLint + Prettier)
- **Last Commit**: 2026-03-23 (active)
- **Score**: **50/100** — App Code: 15 | Docs: 14 | Tests: 3 | Agent Gov: 2 | Spawn: 16

### 6. Astrofy (manuelernestog/astrofy)
- **URL**: https://github.com/manuelernestog/astrofy
- **Stars**: 1,333
- **Category**: Portfolio
- **Components**: CV timeline, Project cards, Store section, Blog, RSS
- **CMS**: Markdown (content collections)
- **Pages**: ~7 (Home, CV, Projects, Store, Blog, 404)
- **SEO**: Sitemap, RSS, OG tags
- **Dark Mode**: Yes
- **i18n**: No
- **Accessibility**: Basic
- **Test Coverage**: None
- **Last Commit**: 2024-07-04 (20 months stale)
- **Score**: **34/100** — App Code: 11 | Docs: 10 | Tests: 1 | Agent Gov: 2 | Spawn: 10

### 7. ScrewFast (mearashadowfax/ScrewFast)
- **URL**: https://github.com/mearashadowfax/ScrewFast
- **Stars**: 1,289
- **Category**: Business / SaaS / Documentation
- **Components**: Navbar (+ mega menu), Hero, Features, Pricing, Testimonials, FAQ, CTA, Tabs, GSAP animations, Starlight docs integration
- **CMS**: Markdown (content collections)
- **Pages**: ~12+ (Home, Services, Products, Blog, Docs [Starlight], Contact, 404)
- **SEO**: Sitemap, OG tags, structured data
- **Dark Mode**: Yes
- **i18n**: Yes (multi-language support)
- **Accessibility**: Good (semantic HTML, Preline UI accessibility)
- **Test Coverage**: None
- **Last Commit**: 2026-03-23 (active)
- **Score**: **54/100** — App Code: 17 | Docs: 14 | Tests: 2 | Agent Gov: 3 | Spawn: 18

### 8. Accessible Astro Starter (incluud/accessible-astro-starter)
- **URL**: https://github.com/incluud/accessible-astro-starter
- **Stars**: 1,135
- **Category**: Blog / Portfolio / Starter
- **Components**: 35+ accessible components (forms, modals, accordions, carousels, media), skip-link nav, color contrast checker, preference toggles
- **CMS**: Markdown / MDX (content collections)
- **Pages**: ~8 (Home, Blog, Portfolio, Contact, 404, MDX example)
- **SEO**: Sitemap, OG tags, semantic HTML
- **Dark Mode**: Yes + high contrast mode + reduced motion toggle
- **i18n**: No
- **Accessibility**: Elite (WCAG 2.2 AA, EAA compliant, Atkinson Hyperlegible font, screen-reader tested)
- **Test Coverage**: ESLint configured, no unit/e2e tests
- **Last Commit**: 2026-03-08 (active)
- **Agent Governance**: Has AGENTS.md file (AI-ready project structure)
- **Score**: **58/100** — App Code: 16 | Docs: 14 | Tests: 4 | Agent Gov: 10 | Spawn: 14

### 9. Astroplate (zeon-studio/astroplate)
- **URL**: https://github.com/zeon-studio/astroplate
- **Stars**: 1,044
- **Category**: Multipurpose / Blog / Starter
- **Components**: Hero, Features, Testimonials, Blog, CTA, Newsletter, Search
- **CMS**: Markdown / MDX (content collections)
- **Pages**: ~10 (Home, About, Blog, Contact, 404, Tags, Categories, Search, Authors)
- **SEO**: Sitemap, RSS, OG tags, SEO metadata config
- **Dark Mode**: Yes
- **i18n**: Yes (multilingual variant available)
- **Accessibility**: Basic (semantic HTML)
- **Test Coverage**: None (ESLint + Prettier)
- **Last Commit**: 2026-03-14 (active)
- **Score**: **48/100** — App Code: 14 | Docs: 12 | Tests: 3 | Agent Gov: 2 | Spawn: 17

### 10. Astro Boilerplate (ixartz/Astro-boilerplate)
- **URL**: https://github.com/ixartz/Astro-boilerplate
- **Stars**: 907
- **Category**: Portfolio / Blog / Starter
- **Components**: Hero, Blog cards, Project cards, Navbar, Footer, Pagination
- **CMS**: Markdown (content collections)
- **Pages**: ~5 (Home, Blog, Projects, About, 404)
- **SEO**: Sitemap, RSS
- **Dark Mode**: No
- **i18n**: No
- **Accessibility**: Basic
- **Test Coverage**: Husky + Lint-Staged + Commitlint + ESLint + Prettier (no unit/e2e)
- **Last Commit**: 2025-08-31
- **Score**: **42/100** — App Code: 12 | Docs: 12 | Tests: 5 | Agent Gov: 2 | Spawn: 11

### 11. Astro Nano (markhorn-dev/astro-nano)
- **URL**: https://github.com/markhorn-dev/astro-nano
- **Stars**: 835
- **Category**: Portfolio / Blog (minimal)
- **Components**: Blog list, Project list, minimal nav
- **CMS**: Markdown / MDX (content collections)
- **Pages**: ~5 (Home, Blog, Projects, Work, 404)
- **SEO**: Sitemap, RSS, OG tags
- **Dark Mode**: Yes (system + manual)
- **i18n**: No
- **Accessibility**: Basic (semantic HTML)
- **Test Coverage**: None
- **Last Commit**: 2025-06-16
- **Score**: **36/100** — App Code: 10 | Docs: 10 | Tests: 1 | Agent Gov: 2 | Spawn: 13

### 12. Odyssey Theme (treefarmstudio/odyssey-theme)
- **URL**: https://github.com/treefarmstudio/odyssey-theme
- **Stars**: 765
- **Category**: Business / Marketing
- **Components**: Hero, Features, Blog, Contact form, Theme switcher, Landing page sections
- **CMS**: Markdown (content collections)
- **Pages**: ~8 (Home, Blog, Company, Landing pages x2, Contact, 404)
- **SEO**: Sitemap, OG tags
- **Dark Mode**: Yes (CSS-variable theme switcher)
- **i18n**: No
- **Accessibility**: Basic
- **Test Coverage**: None
- **Last Commit**: 2024-10-16 (17 months stale)
- **Score**: **36/100** — App Code: 13 | Docs: 10 | Tests: 1 | Agent Gov: 2 | Spawn: 10

### 13. Astro Landing Page (mhyfritz/astro-landing-page)
- **URL**: https://github.com/mhyfritz/astro-landing-page
- **Stars**: 671
- **Category**: Landing Page
- **Components**: Hero, Features, Pricing, CTA, Footer, responsive images
- **CMS**: None (static)
- **Pages**: 1 (single landing page)
- **SEO**: OG tags, meta tags
- **Dark Mode**: Yes
- **i18n**: No
- **Accessibility**: Basic (semantic HTML, responsive)
- **Test Coverage**: None
- **Last Commit**: 2024-11-24 (16 months stale)
- **Score**: **30/100** — App Code: 8 | Docs: 8 | Tests: 1 | Agent Gov: 2 | Spawn: 11

### 14. Astro Ink (one-aalam/astro-ink)
- **URL**: https://github.com/one-aalam/astro-ink
- **Stars**: 592
- **Category**: Blog
- **Components**: Blog cards, Tag system, Theme switcher (Svelte), Netlify CMS admin panel, Pagination
- **CMS**: Netlify CMS + Markdown
- **Pages**: ~5 (Home, Blog, Tags, About, 404)
- **SEO**: Sitemap, RSS, OG tags
- **Dark Mode**: Yes (6+ color modes via Tailwind)
- **i18n**: No
- **Accessibility**: Basic
- **Test Coverage**: None
- **Last Commit**: 2025-11-03
- **Score**: **35/100** — App Code: 11 | Docs: 10 | Tests: 1 | Agent Gov: 2 | Spawn: 11

### 15. Astro Micro (trevortylerlee/astro-micro)
- **URL**: https://github.com/trevortylerlee/astro-micro
- **Stars**: 497
- **Category**: Blog (minimal)
- **Components**: Pagefind search, Giscus comments, Blog list, RSS, theme toggle
- **CMS**: Markdown / MDX (content collections)
- **Pages**: ~4 (Home, Blog, Projects, 404)
- **SEO**: Sitemap, RSS, OG tags
- **Dark Mode**: Yes (system + light + dark)
- **i18n**: No
- **Accessibility**: Good (fork of Nano with accessibility improvements)
- **Test Coverage**: None
- **Last Commit**: 2025-11-15
- **Score**: **38/100** — App Code: 11 | Docs: 10 | Tests: 1 | Agent Gov: 2 | Spawn: 14

### 16. Dante (JustGoodUI/dante-astro-theme)
- **URL**: https://github.com/JustGoodUI/dante-astro-theme
- **Stars**: 478
- **Category**: Blog / Portfolio
- **Components**: Blog cards, Project gallery, Newsletter form (Mailchimp/Formspree/ConvertKit), Tag system, Hero
- **CMS**: Markdown / MDX (content collections)
- **Pages**: ~6 (Home, Blog, Projects, About, Tags, 404)
- **SEO**: Sitemap, RSS, OG tags
- **Dark Mode**: Yes
- **i18n**: No
- **Accessibility**: Good (semantic HTML, ARIA)
- **Test Coverage**: None
- **Last Commit**: 2026-03-24 (active)
- **Score**: **42/100** — App Code: 13 | Docs: 12 | Tests: 1 | Agent Gov: 2 | Spawn: 14

### 17. Brutal (ElianCodes/brutal)
- **URL**: https://github.com/ElianCodes/brutal
- **Stars**: 453
- **Category**: Blog / Personal (Neobrutalism)
- **Components**: Blog cards, Navigation, Footer, Color palette, Layout components
- **CMS**: Markdown (content collections)
- **Pages**: ~4 (Home, Blog, About, 404)
- **SEO**: Sitemap, RSS, OG tags
- **Dark Mode**: No (neobrutalist single-theme design)
- **i18n**: No
- **Accessibility**: Basic
- **Test Coverage**: None
- **Last Commit**: 2026-03-12
- **Score**: **32/100** — App Code: 10 | Docs: 10 | Tests: 1 | Agent Gov: 2 | Spawn: 9

### 18. Foxi (oxygenna-themes/foxi-astro-theme)
- **URL**: https://github.com/oxygenna-themes/foxi-astro-theme
- **Stars**: 257
- **Category**: SaaS / Marketing
- **Components**: Hero, Features, Pricing, Testimonials, FAQ, Blog (MDX), Contact, CTA
- **CMS**: MDX + JSON data files
- **Pages**: ~8 (Home, Features, Pricing, Contact, Blog, About, 404)
- **SEO**: SEO-friendly, PageSpeed 100/100
- **Dark Mode**: Yes
- **i18n**: No
- **Accessibility**: Basic (semantic HTML)
- **Test Coverage**: None
- **Last Commit**: 2026-03-24 (active)
- **Score**: **42/100** — App Code: 14 | Docs: 10 | Tests: 1 | Agent Gov: 2 | Spawn: 15

### 19. Sanity Template Astro Clean (sanity-io/sanity-template-astro-clean)
- **URL**: https://github.com/sanity-io/sanity-template-astro-clean
- **Stars**: 171
- **Category**: Blog / CMS Starter
- **Components**: Blog posts, Sanity Studio embedded, Image handling (Sanity CDN)
- **CMS**: Sanity (official integration)
- **Pages**: ~3 (Home, Blog, Post detail)
- **SEO**: Basic (OG tags via Sanity)
- **Dark Mode**: No
- **i18n**: No
- **Accessibility**: Basic
- **Test Coverage**: None
- **Last Commit**: 2026-03-22 (active)
- **Score**: **34/100** — App Code: 10 | Docs: 10 | Tests: 1 | Agent Gov: 2 | Spawn: 11

### 20. Stablo Astro (web3templates/stablo-astro)
- **URL**: https://github.com/web3templates/stablo-astro
- **Stars**: 167
- **Category**: Blog
- **Components**: Blog cards, Author profiles, Category pages, Minimal nav
- **CMS**: MDX (content collections, Sanity in Next.js version)
- **Pages**: ~5 (Home, Blog, About, Authors, 404)
- **SEO**: Sitemap, OG tags
- **Dark Mode**: Yes
- **i18n**: No
- **Accessibility**: Basic
- **Test Coverage**: None
- **Last Commit**: 2024-08-04 (19 months stale)
- **Score**: **30/100** — App Code: 10 | Docs: 8 | Tests: 1 | Agent Gov: 2 | Spawn: 9

### 21. Sendit (CloudCannon/sendit-astro-template)
- **URL**: https://github.com/CloudCannon/sendit-astro-template
- **Stars**: 129
- **Category**: Marketing / Business
- **Components**: Hero, Features, Pricing, Blog, CTA, Testimonials, Contact, Image optimization, Theme switcher
- **CMS**: CloudCannon (visual editing) + Markdown
- **Pages**: ~8 (Home, About, Blog, Pricing, Contact, Landing pages)
- **SEO**: Sitemap, OG tags, SEO-optimized
- **Dark Mode**: Yes (dynamic theming)
- **i18n**: No
- **Accessibility**: Good (built-in a11y features)
- **Test Coverage**: None
- **Last Commit**: 2026-03-05
- **Score**: **40/100** — App Code: 13 | Docs: 10 | Tests: 1 | Agent Gov: 2 | Spawn: 14

### 22. Ovidius (JustGoodUI/ovidius-astro-theme)
- **URL**: https://github.com/JustGoodUI/ovidius-astro-theme
- **Stars**: 113
- **Category**: Blog
- **Components**: Blog cards, Newsletter form, Tag system, Hero, Social links
- **CMS**: Markdown / MDX (content collections)
- **Pages**: ~4 (Home, Blog, Tags, About)
- **SEO**: Sitemap, RSS, OG tags
- **Dark Mode**: Yes
- **i18n**: No
- **Accessibility**: Good (semantic HTML)
- **Test Coverage**: None
- **Last Commit**: 2025-11-04
- **Score**: **34/100** — App Code: 10 | Docs: 10 | Tests: 1 | Agent Gov: 2 | Spawn: 11

### 23. Netlify Astro Sanity Starter (netlify-templates/astro-sanity-starter)
- **URL**: https://github.com/netlify-templates/astro-sanity-starter
- **Stars**: 84
- **Category**: Landing Page / CMS Starter
- **Components**: Hero, Features, Sanity Studio, Image CDN
- **CMS**: Sanity
- **Pages**: ~2 (Home, dynamic pages from Sanity)
- **SEO**: Basic
- **Dark Mode**: No
- **i18n**: No
- **Accessibility**: Basic
- **Test Coverage**: None
- **Last Commit**: 2026-03-23 (active)
- **Score**: **28/100** — App Code: 8 | Docs: 8 | Tests: 1 | Agent Gov: 2 | Spawn: 9

### 24. Cooper (GladTek/Cooper)
- **URL**: https://github.com/GladTek/Cooper
- **Stars**: 19
- **Category**: SaaS / Blog / Docs / Portfolio (full boilerplate)
- **Components**: UI Atoms (Button, Badge), Sections (Hero, CTA, PricingTable), Layout (Header, Footer, SEO), Blog (BlogCard, ChangelogItem), Common (ThemeToggle, LanguagePicker, CookieConsent)
- **CMS**: Markdown / MDX (content collections)
- **Pages**: ~12+ (Home, Blog, Docs, Changelog, Portfolio, Pricing, About, Contact, Privacy, Terms)
- **SEO**: Sitemap, OG tags, structured SEO component
- **Dark Mode**: Yes
- **i18n**: Yes (type-safe translations, language picker)
- **Accessibility**: Good (semantic HTML, ARIA, keyboard nav)
- **Test Coverage**: Unknown (new repo)
- **Last Commit**: 2026-03-10 (active)
- **Score**: **46/100** — App Code: 16 | Docs: 10 | Tests: 2 | Agent Gov: 2 | Spawn: 16

### 25. Astro x Strapi Starter (VirtusLab-Open-Source/astro-strapi-starter)
- **URL**: https://github.com/VirtusLab-Open-Source/astro-strapi-starter
- **Stars**: 10
- **Category**: Blog / CMS Starter
- **Components**: Blog posts, Strapi blocks, shadcn/ui components, Dark/Light toggle
- **CMS**: Strapi (with astro-strapi-loader)
- **Pages**: ~3 (Home, Blog, Post detail)
- **SEO**: Good (zero-JS default, near-perfect Lighthouse)
- **Dark Mode**: Yes (system preference detection)
- **i18n**: No (Strapi supports it server-side)
- **Accessibility**: Good (shadcn/ui accessibility)
- **Test Coverage**: Unknown
- **Last Commit**: 2026-03-21 (active)
- **Score**: **32/100** — App Code: 10 | Docs: 8 | Tests: 1 | Agent Gov: 2 | Spawn: 11

---

## Summary Rankings

| Rank | Template | Stars | Score /100 | Strongest Dimension |
|------|----------|-------|------------|---------------------|
| 1 | Starlight | 8,165 | **78** | Tests (18) + Docs (20) |
| 2 | Accessible Astro Starter | 1,135 | **58** | Agent Gov (10) — has AGENTS.md |
| 3 | AstroWind | 5,526 | **55** | Spawn Ready (18) |
| 4 | ScrewFast | 1,289 | **54** | App Code (17) + Spawn (18) |
| 5 | AstroPaper | 4,374 | **52** | Docs (16) + Accessibility |
| 6 | Astro Cactus | 1,559 | **50** | App Code (15) — feature-rich blog |
| 7 | Astroplate | 1,044 | **48** | Spawn Ready (17) — i18n variant |
| 8 | Cooper | 19 | **46** | App Code (16) — batteries-included |
| 9 | Astro Boilerplate | 907 | **42** | Tests (5) — Husky + lint-staged |
| 10 | Dante | 478 | **42** | App Code (13) — newsletter forms |
| 11 | Foxi | 257 | **42** | App Code (14) — SaaS focus |
| 12 | Astroship | 1,909 | **40** | Spawn Ready (12) — startup ready |
| 13 | Sendit | 129 | **40** | App Code (13) — visual editing |
| 14 | Astro Micro | 497 | **38** | Spawn Ready (14) — search + comments |
| 15 | Astro Nano | 835 | **36** | Spawn Ready (13) — ultra-minimal |
| 16 | Odyssey | 765 | **36** | App Code (13) — theme switcher |
| 17 | Astro Ink | 592 | **35** | CMS integration (Netlify CMS) |
| 18 | Astrofy | 1,333 | **34** | App Code (11) — CV/store sections |
| 19 | Ovidius | 113 | **34** | Clean blog foundation |
| 20 | Sanity Astro Clean | 171 | **34** | CMS — official Sanity starter |
| 21 | Brutal | 453 | **32** | Design — unique neobrutalist style |
| 22 | Astro x Strapi | 10 | **32** | CMS — Strapi integration |
| 23 | Stablo Astro | 167 | **30** | Design — clean blog aesthetic |
| 24 | Astro Landing Page | 671 | **30** | Simplicity — single-page focus |
| 25 | Netlify Sanity Starter | 84 | **28** | CMS — Netlify + Sanity combo |

---

## Key Findings

### Ecosystem Gaps
1. **Tests are nearly absent.** Only Starlight has real test coverage. Every other template ships zero tests. This is the single biggest gap in the ecosystem.
2. **Agent governance is nonexistent.** Only Accessible Astro Starter ships an AGENTS.md. No template has CLAUDE.md, MCP configs, or AI-ready project structure.
3. **i18n is rare.** Only Starlight, ScrewFast, Astroplate (variant), and Cooper offer built-in i18n. Most templates are English-only.
4. **CMS integration is fragmented.** Sanity and Strapi have dedicated starters, but most top templates use plain Markdown/MDX with no headless CMS wiring.
5. **Accessibility varies wildly.** Accessible Astro Starter and Starlight lead. Most templates have basic semantic HTML at best.

### What Would Score 90+
A template that combines:
- Starlight-level test coverage (unit + e2e + CI)
- AstroWind-level page/component richness
- Accessible Astro Starter-level WCAG compliance
- Full AGENTS.md + CLAUDE.md + structured AI governance
- Built-in CMS adapter pattern (swap Sanity/Contentful/Strapi via config)
- Type-safe i18n out of the box
- One-command spawn with env validation

### CMS Landscape
| CMS | Notable Templates | Integration Quality |
|-----|-------------------|---------------------|
| Sanity | Sanity Astro Clean, Netlify Sanity Starter | Official plugin (@sanity/astro), strong |
| Strapi | Astro x Strapi Starter | Loader package, emerging |
| Contentful | starter-astro-bookshelf | GraphQL API, basic |
| CloudCannon | Sendit | Visual editing, solid |
| Netlify CMS | Astro Ink | Legacy, deprecated in favor of Decap |
| MDX/Markdown | All others | Native Astro content collections |
| Keystatic | Atlas (not scored — paid) | Emerging, git-based |

### Template Maturity Tiers

**Tier 1 — Production-Grade** (score 50+): Starlight, Accessible Astro, AstroWind, ScrewFast, AstroPaper, Cactus
**Tier 2 — Solid Starter** (score 40-49): Astroplate, Cooper, Boilerplate, Dante, Foxi, Astroship, Sendit
**Tier 3 — Minimal/Niche** (score <40): Everything else — useful for specific needs but not production-ready out of the box

---

*Research by Sage | Confidence: High (85%) on star counts and features, Medium (70%) on test coverage claims — verified via GitHub API where possible*
