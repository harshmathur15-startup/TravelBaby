---
name: a11y-audit
description: Deep accessibility audit — WCAG AA compliance, keyboard navigation, screen reader patterns, ARIA validation.
---

# Accessibility Audit Skill

Deep accessibility audit beyond what /lighthouse catches. Tests WCAG 2.1 AA compliance at the code level — keyboard traps, ARIA misuse, focus management, color contrast, and screen reader experience.

## Usage

`/a11y-audit` — audit all components and pages
`/a11y-audit <file>` — audit a specific component or page
`/a11y-audit --interactive` — focus on interactive elements only (forms, buttons, modals)

## Workflow

Run all checks in parallel.

### 1. Keyboard Navigation [CRITICAL]

| Check | How | Target |
|---|---|---|
| Tab order | Check for `tabindex` values > 0 | No positive tabindex — natural DOM order only |
| Keyboard traps | Check modals/dropdowns for escape handlers | Every overlay closeable with Escape |
| Focus visible | Grep for `:focus` or `:focus-visible` styles | Every interactive element has visible focus |
| Skip navigation | Check layout for skip-to-content link | Present as first focusable element |
| Enter/Space activation | Buttons and links respond to keyboard | No click-only handlers without `onKeyDown` |
| Custom controls | `<div onclick>` without `role` and `tabindex` | Use semantic elements or add ARIA |

### 2. ARIA Patterns [CRITICAL]

| Check | How | Target |
|---|---|---|
| Roles match behavior | Elements with `role` behave as expected | `role="button"` must be focusable + activatable |
| Labels on interactive elements | Grep `<button>`, `<a>`, `<input>` for accessible names | Every control has visible text, `aria-label`, or `aria-labelledby` |
| Live regions | Dynamic content updates announce to screen readers | Toast/alert uses `role="alert"` or `aria-live` |
| Landmark regions | Page has `<main>`, `<nav>`, `<header>`, `<footer>` | All present in layout |
| Aria-hidden misuse | `aria-hidden="true"` on focusable elements | Never hide focusable content |
| Required fields | Form inputs with validation have `aria-required` | Present on required fields |
| Error messages | Form errors linked to inputs via `aria-describedby` | Programmatic association |
| Expanded/collapsed | Accordions/dropdowns use `aria-expanded` | State communicated to screen readers |

### 3. Visual & Color [WARNING]

| Check | How | Target |
|---|---|---|
| Color contrast (text) | Check CSS custom properties for text/background pairs | WCAG AA: 4.5:1 normal, 3:1 large text |
| Color contrast (UI) | Check button, input border, icon colors against backgrounds | 3:1 minimum |
| Color-only information | Check for status indicators using only color | Never color-only — add icon, text, or pattern |
| Dark mode contrast | If dark mode exists, check dark theme pairs too | Same ratios as light mode |
| Text resizing | Check for `px` font sizes that prevent scaling | Use `rem` or `em`, not `px` for text |
| Motion | Check for animations without `prefers-reduced-motion` | Respect user preference |

### 4. Forms [CRITICAL]

| Check | How | Target |
|---|---|---|
| Labels | Every `<input>` has a `<label>` with `for` or wrapping | Programmatic label association |
| Placeholder ≠ label | Placeholder text not used as the only label | Label always visible |
| Error states | Invalid inputs have `aria-invalid="true"` | Programmatic error state |
| Error messages | Error text associated via `aria-describedby` | Screen reader announces error |
| Autocomplete | Common fields use `autocomplete` attribute | `name`, `email`, `tel`, `address` etc. |
| Fieldset/legend | Related inputs grouped with `<fieldset>` + `<legend>` | Radio groups, address blocks |

### 5. Images & Media [WARNING]

| Check | How | Target |
|---|---|---|
| Alt text on images | Every `<img>` has `alt` attribute | Descriptive alt, not filename |
| Decorative images | Decorative images have `alt=""` and `role="presentation"` | Not announced by screen reader |
| SVG accessibility | Inline SVGs have `<title>` or `aria-label` | Accessible name present |
| Video captions | `<video>` has `<track>` for captions | Captions available |
| Audio alternatives | Audio content has transcript | Transcript linked |

### 6. Semantic HTML [WARNING]

| Check | How | Target |
|---|---|---|
| Heading hierarchy | h1 → h2 → h3, no skipped levels | Logical outline |
| Single h1 | Exactly one `<h1>` per page | One main heading |
| Lists for lists | Repeated items use `<ul>`/`<ol>` | Not `<div>` chains |
| Tables for data | Tabular data uses `<table>` with `<th>` | Not `<div>` grid |
| Language attribute | `<html lang="en">` present | Correct language |
| Page title | `<title>` present and descriptive | Unique per page |

## Output Format

```
## Accessibility Audit Report

**Scope:** <project or file>
**Standard:** WCAG 2.1 AA
**Date:** <current date>

### Score

| Category | Score | Findings |
|---|---|---|
| Keyboard Navigation | X/100 | Y issues |
| ARIA Patterns | X/100 | Y issues |
| Visual & Color | X/100 | Y issues |
| Forms | X/100 | Y issues |
| Images & Media | X/100 | Y issues |
| Semantic HTML | X/100 | Y issues |
| **Overall** | **X/100** | |

### CRITICAL Findings (blocks WCAG AA)

| # | Category | Issue | File:Line | Impact | Fix |
|---|---|---|---|---|---|
| 1 | Keyboard | Button not focusable | Hero.astro:34 | Can't activate via keyboard | Add `tabindex="0"` or use `<button>` |

### WARNING Findings

| # | Category | Issue | File:Line | Fix |
|---|---|---|---|---|
| 1 | Color | Contrast ratio 3.8:1 on muted text | global.css:42 | Darken `--color-text-muted` |

### Quick Wins
| # | Fix | Files Affected | Effort |
|---|---|---|---|
| 1 | Add skip-nav link to BaseLayout | 1 file | 5 min |
| 2 | Add aria-label to icon buttons | 4 files | 10 min |

### Summary
X issues — Y critical, Z warning. Overall WCAG AA compliance: PASS/PARTIAL/FAIL.
```

## Scoring

- Each category starts at 100
- CRITICAL: -25 per issue (keyboard and ARIA issues block users entirely)
- WARNING: -10 per issue
- Floor at 0
- Overall = weighted average: Keyboard 25%, ARIA 25%, Forms 20%, Visual 15%, Images 10%, Semantic 5%

## Edge Cases

- **No forms:** Skip section 4, note "No forms found"
- **No images:** Skip section 5
- **No dark mode:** Skip dark mode contrast check
- **CSS-in-JS:** Check inline styles and Tailwind classes, not just CSS files
- **Astro components:** Check both `.astro` template and any client-side JS
- **Third-party components:** Flag but note "third-party — may need upstream fix"

## Instructions

- CRITICAL findings = someone cannot use the site at all (keyboard user, screen reader user)
- WARNING findings = degraded experience but still usable
- Always provide the specific fix, not just "add accessibility"
- For color contrast, calculate the actual ratio if possible (use CSS custom property values)
- Don't flag server-rendered content as missing ARIA when the HTML output is correct
- Group similar issues — "6 buttons missing aria-label" not 6 separate findings
- Quick wins section is the most valuable output — low-effort, high-impact fixes first
