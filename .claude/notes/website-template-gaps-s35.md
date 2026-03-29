# Website Template Gaps — From Kira S35 Triple Benchmark

Benchmark: Kira Website Template scored 127/140 (#1), but behind on 3 dimensions.

## Where We're Behind

### D1: Build Quality (18/20, ixartz leads at 19)
- **No git hooks** — need Husky + lint-staged for pre-commit linting/formatting
- **No strict TypeScript in .astro files** — Astro components aren't .tsx

### D5: Testing (17/20, ixartz leads at 18)
- **No Storybook** for component documentation and visual testing
- **No Percy/visual regression in CI** — Playwright visual tests exist but no CI-integrated regression service
- E2E exists (6 Playwright specs) but coverage is thin vs ixartz's full stack

### D7: Clone-to-Running (16/20, ixartz and AstroWind lead at 17)
- **No Sanity seed data** — CMS requires manual Sanity account setup, some pages render empty
- **No Sanity integration tests** — no tests verifying CMS queries return expected data
- **No one-click deploy** — no Netlify/Vercel deploy buttons

## What Would Close Each Gap

| Gap | Fix | Impact |
|-----|-----|--------|
| Git hooks | Add Husky + lint-staged | D1: 18→19 |
| Sanity seed data | Create seed script or sample dataset | D7: 16→18 |
| Sanity tests | Test CMS queries return expected schema/data | D7: 16→18 |
| One-click deploy | Add Vercel/Netlify deploy buttons + env guide | D7: 16→18 |
| Storybook | Add Storybook with component stories | D5: 17→19 |

Fixing seed data + git hooks alone would move total from 127 to ~131.

## CMS Verification Rule (from Kira feedback)

When work touches CMS-driven content, the build passing is NOT the completion signal. Must also verify live Sanity data.

After any change involving CMS schemas, queries, or content rendering — query Sanity live before declaring complete:
1. Do CMS documents exist for the types we depend on?
2. Do field values match what the code expects?
3. Are references between documents consistent?

The build only proves the code compiles — the CMS is half the system.

---

*Source: d:/AI/Kira/research/scout-triple-benchmark-s35.md + memory/feedback_cms_verification.md*
*Fix in Template first — products inherit.*
