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

## Build Protocols

### Phase Checkpoints (#11)
Multi-phase builds require explicit approval between phases. Present what was built, get approval, then proceed. No skipping phases — the Product Launch Roadmap sequence is binding.

### Mandatory Learning Recording (#47)
A task is not complete until the learning is recorded. After significant work: what was learned, what would be done differently, what pattern emerged. Gate, not suggestion. Lena audits.

### File Ownership (#60)
During parallel agent work, each file has exactly one owner. Declare ownership before starting. Interface contracts between owners are immutable during a work phase. Conflicts go to the orchestrator.

### HITL Approval Gates (#63)
Irreversible actions require human approval before execution: database migrations, payment processing, user-facing deployments, data deletions. Risk-scored: Low (proceed with log), Medium (confirm before), High (block until explicit approval). Timeout after 10 minutes → escalate, don't auto-proceed.

### TDD Gate (#66)
Agent deliverables that include testable code must include test evidence. No "it works" without proof. Agent contract addition: if the output is code, the output includes test results or a reason why tests aren't applicable.
