# Keya — Ecosystem Report (S40)
Date: 2026-03-31

## Stack Health Summary

| Dependency | Template Version | Latest | Status | Action Needed? |
|---|---|---|---|---|
| Astro | ^6.0.8 | 6.1.2 | Minor behind | Yes — update to ^6.1.2 |
| Tailwind CSS | ^4.2.2 | 4.2.2 | Current | No |
| @tailwindcss/vite | ^4.2.2 | 4.2.2 | Current | No |
| sanity | ^5.17.1 | ~5.16.0+ | Current major | Check — v5 requires React 19.2 |
| @sanity/client | ^7.20.0 | 7.20.0 | Current | No |
| @sanity/image-url | ^2.0.3 | 2.0.3 | Current | No |
| TypeScript | not pinned (Astro built-in) | 6.0 (2026-03-23) | Watch | See notes |
| Vitest | ^4.1.0 | 4.1.2 | Current | No |
| Playwright | ^1.52.0 | 1.52.x | Current | No |
| Pagefind | ^1.4.0 | 1.4.x | Current | No |
| @astrojs/mdx | ^5.0.2 | 5.x | Current major | No |
| @astrojs/rss | ^4.0.17 | 4.x | Current major | No |
| @astrojs/sitemap | ^3.7.1 | 3.x | Current major | No |

## Astro

**Template: ^6.0.8 | Latest: 6.1.2 (2026-03-30)**

The template is on the correct major (v6) but lags behind by one minor version. Astro 6.1.0 shipped on 2026-03-26 with:

- Built-in Fonts API (stable)
- Content Security Policy API
- Live Content Collections for externally-hosted content
- Vite Environment API integration — dev server now runs exact production runtime
- Experimental Rust compiler (successor to Go-based compiler)
- **Node 22+ required** — template already enforces this via `engines`

v6.1.2 (2026-03-30) patches: `astro preview` ignoring `vite.preview.allowedHosts`, and catch-all routes intercepting static assets with Node adapter in middleware mode.

**Action:** Bump to `^6.1.2`. The caret range `^6.0.8` will resolve to 6.1.2 on fresh install, but explicit bump signals intent and locks the minimum. Evaluate Fonts API and CSP API for adoption — both reduce boilerplate the template currently handles manually.

## Tailwind CSS

**Template: ^4.2.2 | Latest: 4.2.2 (2026-03-18)**

Template is current. Tailwind v4 is a ground-up rewrite with:

- Cascade layers, `@property` registered custom properties, `color-mix()`
- Full builds 5x faster, incremental builds 100x faster
- v4.2.0 added webpack plugin, four new color palettes (mauve, olive, mist, taupe), logical property utilities, inline/block size utilities
- v4.2.2 is a patch release with Vite fixes and utility canonicalization

**Action:** None. Already on latest. Consider adopting the new color palettes if they fit the design system.

## Sanity

**Template: sanity ^5.17.1 | Latest: ~5.16.0+**

Sanity Studio v5 is the current major. Key changes:

- **React 19.2.2+ required** — template does not list React as a direct dependency (Sanity bundles it for Studio), but products using Sanity Studio locally must ensure React 19.2 compatibility
- TypeGen output changes in Sanity CLI — may affect any generated types
- Regular patch releases throughout 2026

@sanity/client at ^7.20.0 is current. @sanity/image-url at ^2.0.3 is current.

**Action:** Verify that `sanity` resolves to >=5.16.0 on install. No breaking changes from 5.17.1 range, but confirm React 19.2 compatibility if Studio is used in-project. Note: the template uses Sanity as a headless CMS (queries only), so Studio React version is only relevant during `sanity dev`.

## TypeScript

**Template: uses Astro's built-in TS | Latest: TypeScript 6.0 (2026-03-23)**

TypeScript 6.0 is the last JavaScript-based compiler release before the Go rewrite (TS 7.0). Key features:

- 40-60% faster incremental rebuilds
- 25% lower peak memory
- 30% faster language service (autocomplete, error checking)
- Improved error messages with suggested fixes
- DOM type updates for Temporal APIs

Astro 6 likely bundles TS 5.x. The template does not pin TypeScript directly — it relies on Astro's bundled version.

**Action:** Watch. Do not independently install TS 6.0 — wait for Astro to officially support it. Monitor Astro release notes for TS 6.0 compatibility.

## Other Dependencies

| Dependency | Template | Status | Notes |
|---|---|---|---|
| @resvg/resvg-js | ^2.6.2 | Current | Used for OG image generation |
| satori | ^0.26.0 | Current | OG image rendering |
| @axe-core/playwright | ^4.11.1 | Current | Accessibility testing |
| eslint-plugin-jsx-a11y | ^6.10.2 | Current | Accessibility linting |

## Product Inheritance Check

**Zimyo (d:/AI/Zimyo)** — the only listed product.

| Dependency | Template | Zimyo | Drift? |
|---|---|---|---|
| astro | ^6.0.8 | ^6.0.8 | No — both behind latest |
| tailwindcss | ^4.2.2 | ^4.2.2 | No |
| @tailwindcss/vite | ^4.2.2 | ^4.2.2 | No |
| @sanity/client | ^7.20.0 | ^7.20.0 | No |
| @sanity/image-url | ^2.0.3 | ^2.0.3 | No |
| @astrojs/mdx | ^5.0.2 | ^5.0.2 | No |
| @astrojs/rss | ^4.0.17 | ^4.0.17 | No |
| @astrojs/sitemap | ^3.7.1 | ^3.7.1 | No |
| vitest | ^4.1.0 | not checked | — |

Zimyo's shared dependencies are in sync with the template. No version drift detected.

## Recommendations

### Urgent (breaking/security)
- None. No security advisories found for current stack.

### Soon (1-2 sessions)
- **Bump Astro to ^6.1.2** — picks up Fonts API, CSP API, and bug fixes. Low risk (minor version).
- **Evaluate Astro Fonts API** — could replace manual font loading in BaseLayout, reducing boilerplate.
- **Propagate Astro bump to Zimyo** after template update.

### Watch (no action yet)
- **TypeScript 6.0** — wait for Astro to officially support it before adopting.
- **TypeScript 7.0 (Go rewrite)** — major ecosystem shift coming. Monitor for Astro/Vite compatibility timeline.
- **Sanity React 19.2 requirement** — only matters if running Studio locally. Confirm on next Sanity-related work.
- **Astro Rust compiler** — still experimental. Could significantly improve build times when stable.
- **Tailwind new colors** (mauve, olive, mist, taupe) — evaluate for design token system if design refresh happens.

---

*Sources: [Astro releases](https://github.com/withastro/astro/releases), [Tailwind CSS releases](https://github.com/tailwindlabs/tailwindcss/releases), [Sanity changelog](https://www.sanity.io/docs/changelog), [TypeScript 6.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-rc/), [Vitest 4.1](https://main.vitest.dev/blog/vitest-4-1)*
