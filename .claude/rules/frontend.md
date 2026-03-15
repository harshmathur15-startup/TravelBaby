---
paths:
  - "client/**/*.ts"
  - "client/**/*.tsx"
---

# Frontend Standards

## Components
- React 18+ functional components only — no class components
- Component file structure: imports → types/interfaces → component → export default
- One component per file unless tightly coupled (e.g. parent + sub-item)
- No business logic in components — move to custom hooks or services

## State & Data
- Zustand for global state — no prop drilling beyond 2 levels
- Custom hooks in `hooks/` — never define hooks inside component files
- All API calls go through a typed fetch wrapper — never raw `fetch` in components
- Avoid `useEffect` for derived state — compute it inline or with `useMemo`

## UI & Styling
- Tailwind CSS for all styling — no inline styles, no CSS modules
- Loading, error, and empty states required for every data-fetching component
- Forms use controlled components with Zod validation on submit
- Accessibility: all interactive elements need `aria-label`, all images need `alt`

## Bundle & Performance
- No large library imports without checking tree-shaking (e.g. `import { x } from 'lib'` not `import lib from 'lib'`)
- Lazy-load routes and heavy components with `React.lazy`
- No `console.log` left in committed code
