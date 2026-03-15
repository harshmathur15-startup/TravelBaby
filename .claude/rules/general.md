# General Standards

## Naming & Structure
- TypeScript strict mode everywhere — no `any`, no implicit returns
- Components use PascalCase, utilities use camelCase, constants use UPPER_SNAKE_CASE
- API routes follow REST: `/api/v1/<resource>`
- Environment variables in `.env` — never committed, always documented in `.env.example`
- Prefer explicit over implicit — no magic numbers, name your constants

## File Discipline
- Max 300 lines per file — split into smaller modules if exceeded
- No dead code committed — remove unused functions, variables, and imports before committing
- Import order: external packages → internal modules → relative imports (blank line between each group)
- No `console.log` left in committed code — use the logger utility

## Git & Commits
- Commit message format: `<type>(<scope>): <summary>` — see `/commit` skill
- One logical change per commit — don't bundle unrelated changes
- TODO comments must include owner: `// TODO(name): description` — or don't commit them

## Code Quality
- All AI agent actions logged for auditability
- No function longer than 40 lines — extract if it grows beyond that
- Avoid nested ternaries — use early returns or explicit if/else
- Prefer `const` over `let` — use `let` only when reassignment is necessary
