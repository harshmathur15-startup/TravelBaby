# AGENTS.md — Cross-Tool AI Governance

This file provides project context for any AI coding assistant (Cursor, Copilot, Windsurf, Gemini CLI, etc.). For Claude Code specifically, see [CLAUDE.md](CLAUDE.md).

## Project

Static marketing site with optional CMS. Astro 6 + TypeScript + Tailwind CSS 4 + Sanity.

## Structure

```
src/pages/           — Astro pages (.astro, .mdx)
src/components/ui/   — Reusable UI primitives (Badge, Button, Card, etc.)
src/components/sections/ — Page sections (Hero, Features, Pricing, etc.)
src/config/          — Site, content, and theme configuration
src/styles/          — Global CSS with design tokens
src/lib/             — Utilities, Sanity client, blog data
sanity/              — CMS schemas and desk structure
public/              — Static assets, _headers, robots.txt
e2e/                 — Playwright E2E tests
```

## Conventions

- **TypeScript strict mode** — no `any`, no `ts-ignore`
- **Named exports** over default exports
- **Components:** PascalCase. **Utilities/hooks:** camelCase. **Constants:** UPPER_SNAKE_CASE
- **Max file length:** 300 lines — split if longer
- **Design tokens** via CSS custom properties in `src/styles/global.css`
- **Fonts** self-hosted via Astro Fonts API (`astro.config.mjs`)
- **Config-driven:** site identity in `src/config/site.ts`, content in `content.ts`, colors in `theme.ts`

## Do

- Validate all user input at system boundaries (Zod preferred)
- Use semantic HTML and ARIA attributes on interactive elements
- Keep components single-responsibility
- Run `npm run build` after changes to verify no regressions
- Follow existing patterns — read before writing

## Do Not

- Hardcode secrets — use environment variables
- Commit `.env` files — only `.env.example`
- Add dependencies without justification
- Use `localStorage` for auth tokens
- Skip TypeScript types or use `any`
- Modify protected files without confirmation: `CLAUDE.md`, `AGENTS.md`, `.claude/rules/`

## Testing

- **Unit:** `npm run test` (Vitest)
- **E2E:** `npm run test:e2e` (Playwright)
- Mock all external dependencies in unit tests

## AI Agent Rules

If building or modifying AI agents in this project:
- Every agent needs an iteration cap (default: 10)
- Agents return results to orchestrator — never act beyond scope
- Write scope must be explicitly listed (read-only by default)
- Human-in-the-loop required for irreversible actions
- All agent actions must be logged for auditability
