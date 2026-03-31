# Mira -- Drift & Integrity Report (S40)
Date: 2026-03-31
Status: 2 findings (2 drift, 0 stale, 0 wrong)

## CLAUDE.md Audit

| Section | Claimed | Actual | Status |
|---------|---------|--------|--------|
| UI primitives | 13 | 13 | MATCH |
| Section components | 37 | 37 | MATCH |
| Pages (.astro) | 20 | 20 | MATCH |
| Route generators | 4 | 4 | MATCH |
| Sanity document types | 13 | 13 | MATCH |
| Sanity object types | 7 | 7 | MATCH |
| Core skills | 22 | 22 | MATCH |
| Extended skills | 24 | 24 | MATCH |
| SaaS skills | 20 | 20 | MATCH |
| Rules (.claude/rules/) | 8 | 8 | MATCH |
| Scripts (scripts/) | 31 | 32 | DRIFT -- 32 files on disk (techstack.py added) |
| Agents | 5 | 9 | DRIFT -- registry lists 9 (Thea, Nell, Mira, Anvi, Priya, Jaya, Keya, Tani, Siya) |
| Hooks (settings.json) | 28 | 28 | MATCH |
| Astro version | 6 | ^6.0.8 | MATCH |
| Tailwind version | 4 | ^4.2.2 | MATCH |
| Sanity | yes | ^5.17.1 | MATCH |

## Docs Audit

| Doc File | Issue | Status |
|----------|-------|--------|
| docs/getting-started.md | References `.env.example` -- verified file exists pattern | OK |
| docs/saas-upgrade.md | Describes Express/React/Prisma/BullMQ SaaS stack -- planned, not yet activated | OK (planned) |
| docs/security-headers.md | Present | OK |
| docs/deployment-isr.md | Present | OK |
| docs/deploy-vercel.md | Present | OK |
| docs/deploy-netlify.md | Present | OK |
| docs/deploy-cloudflare.md | Present | OK |
| docs/deploy-render.md | Present | OK |
| docs/slim-mode.md | Present | OK |
| docs/accessibility.md | Present | OK |
| docs/skill-tiers.md | Present | OK |
| docs/products.md | Present | OK |
| docs/deferred-patterns.md | Present | OK |
| docs/roadmap.md | Present | OK |
| docs/spawning-checklist.md | Present | OK |
| docs/inheritance.md | Present | OK |

## Rule Alignment

| Rule | References Valid | Notes |
|------|----------------|-------|
| general.md | Yes | Coding standards, git conventions -- all apply |
| security.md | Yes | Prisma/CSRF references are SaaS-forward but harmless |
| frontend.md | Yes | Astro/Tailwind patterns match stack |
| performance.md | Yes | Prisma/BullMQ sections are SaaS-forward |
| testing.md | Yes | Vitest/Playwright match devDependencies |
| backend.md | Yes | SaaS-only -- correctly scoped |
| database.md | Yes | SaaS-only -- correctly scoped |
| agents.md | Yes | Agent contract rules match registry structure |

## Config Consistency

| Check | Status | Notes |
|-------|--------|-------|
| package.json engines | OK | node >=22.12.0 |
| tsconfig strict mode | OK | extends astro/tsconfigs/strict |
| tsconfig path aliases | OK | @components, @layouts, @lib, @styles, @config, @data |
| astro.config integrations | OK | sitemap, mdx, tailwind via vite plugin |
| astro.config site URL | WARNING | Still set to https://example.com (TODO placeholder) |
| astro.config i18n | OK | en + es locales configured |

## Recommendations

### Priority fixes (drift that misleads users)
1. **CLAUDE.md agents count**: Says "5 agents" but registry has 9. Update to 9 with current names (Thea, Nell, Mira, Anvi, Priya, Jaya, Keya, Tani, Siya).
2. **CLAUDE.md scripts count**: Says "31 scripts" but disk has 32 (techstack.py was added). Update to 32.

### Low-priority (cosmetic)
3. astro.config.mjs still has `https://example.com` placeholder -- expected for template, but worth a comment in getting-started.md (already covered in step 2 of that doc).
