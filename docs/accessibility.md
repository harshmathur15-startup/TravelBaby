# Accessibility Statement

## Compliance Level

This template targets **WCAG 2.1 Level AA** conformance. All pages are tested with axe-core (Playwright e2e) across 6 page types.

## What's Built In

### Semantic HTML
- All pages use `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>` landmarks
- Headings follow a logical hierarchy (single `<h1>` per page)
- Lists use `role="list"` / `role="listitem"` for AT compatibility

### Keyboard Navigation
- Skip link ("Skip to main content") on every page
- All interactive elements are focusable with visible focus rings (`focus:ring-2`)
- Mobile menu closes on Escape key
- Tab order follows visual layout

### ARIA
- 155+ ARIA attributes across 35+ component files
- `aria-labelledby` on all section components
- `aria-label` on navigation, social links, icon-only buttons
- `aria-hidden="true"` on decorative elements (icons, shimmer skeletons)
- `aria-expanded` / `aria-controls` on mobile menu toggle
- `aria-checked` on pricing toggle radio buttons
- `aria-invalid` + `aria-describedby` on form error states

### Motion & Preferences
- `prefers-reduced-motion: reduce` disables all animations (CSS + JS)
- `prefers-color-scheme` detected for initial theme
- Dark mode toggle persists preference in localStorage

### Images
- All `<img>` tags have `alt` text
- Decorative images use `aria-hidden="true"`
- Explicit `width` and `height` prevent layout shift (CLS < 0.1)

### Color & Contrast
- Design token system ensures consistent contrast ratios
- Dark mode tested for readability
- No information conveyed by color alone

## Automated Testing

- **axe-core** via Playwright e2e (WCAG 2.1 AA ruleset, 6 pages)
- **ESLint jsx-a11y** plugin catches violations at lint time
- **Lighthouse** CI checks accessibility score (target: 90+)

## Known Limitations

- No high-contrast mode toggle (dark mode only)
- Screen reader testing has not been performed with VoiceOver or NVDA
- i18n pages do not yet have `hreflang` tags
- No automated color contrast ratio checker built in

## For Products

When customizing this template:
1. Run `npm run test:e2e` after changes — axe-core will catch regressions
2. Keep `alt` text meaningful, not decorative ("Team photo of engineering leads" not "image")
3. New interactive components need `focus:ring-2` and keyboard handlers
4. Test with keyboard-only navigation before shipping
