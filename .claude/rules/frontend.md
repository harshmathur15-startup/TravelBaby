---
paths:
  - "src/**/*.astro"
  - "src/**/*.ts"
  - "client/**/*.ts"
  - "client/**/*.tsx"
---

# Product-specific rules (globals inherited from ~/.claude/rules/)
<!-- Last reviewed: 2026-03-26 (S29) -->

## Astro Components
- One component per file — PascalCase naming
- Define `interface Props` for all component props
- Use CSS custom properties from `global.css` — never hardcode colors, spacing, or fonts
- Scoped `<style>` blocks for component-specific styles
- Zero JavaScript by default — add `<script>` only when interactivity is required
- Use `class:list` for conditional classes, array `.join(' ')` for composed classes

## Design Tokens
- All visual values come from CSS custom properties in `src/styles/global.css`
- Colors: `var(--color-primary-500)`, spacing: `var(--space-4)`, etc.
- To change the brand: edit token values in `global.css`, not individual components
- Dark mode prepared via `.dark` class on `<html>`

## Accessibility
- All images need `alt` text (use `aria-hidden="true"` for decorative images)
- Use semantic HTML: `<section>`, `<article>`, `<nav>`, `<footer>`
- Focus-visible rings on all interactive elements

## Responsive Design
- Mobile-first: base styles for mobile, `@media (min-width:)` for larger screens
- Breakpoints: 640px (sm), 768px (md), 1024px (lg)
- Container max-width: 1180px (`--container-xl`)

## React Components (SaaS Upgrade)
- React 18+ functional components only — no class components
- Zustand for global state — no prop drilling beyond 2 levels
- Custom hooks in `hooks/` — never define hooks inside component files
- All API calls go through a typed fetch wrapper
- Tailwind CSS for all styling — no inline styles
- Loading, error, and empty states required for every data-fetching component

## Bundle & Performance
- No large library imports without checking tree-shaking
- Lazy-load routes and heavy components
