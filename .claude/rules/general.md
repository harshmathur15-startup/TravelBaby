# Product-specific rules (globals inherited from ~/.claude/rules/)
<!-- Last reviewed: 2026-03-26 (S29) -->

## File Discipline
- Import order: external packages → internal modules → relative imports (blank line between each group)
- No `console.log` left in committed code — use the logger utility. Exception: `scripts/` hook scripts use stdout/stderr as their output channel
- No dead code committed — remove unused functions, variables, and imports before committing

## Git & Commits
- TODO comments must include owner: `// TODO(name): description` — or don't commit them

## Code Quality
- No function longer than 40 lines — extract if it grows beyond that
- Avoid nested ternaries — use early returns or explicit if/else
- Prefer `const` over `let` — use `let` only when reassignment is necessary
- Code reviews are adversarial by default — reviewers MUST find issues. "Looks good" is not acceptable. If genuinely clean, explain what was checked

## Build Protocols

### Phase Checkpoints (#11)
Multi-phase builds require explicit approval between phases. Present what was built, get approval, then proceed. No skipping phases — the Product Launch Roadmap sequence is binding.

### Mandatory Learning Recording (#47)
A task is not complete until the learning is recorded. After significant work: what was learned, what would be done differently, what pattern emerged. Gate, not suggestion.

### File Ownership (#60)
During parallel agent work, each file has exactly one owner. Declare ownership before starting. Interface contracts between owners are immutable during a work phase. Conflicts go to the orchestrator.

### HITL Approval Gates (#63)
Irreversible actions require human approval before execution: database migrations, payment processing, user-facing deployments, data deletions. Risk-scored: Low (proceed with log), Medium (confirm before), High (block until explicit approval). Timeout after 10 minutes → escalate, don't auto-proceed.

### Implementation Readiness Gate (#gap7)
Before starting development on any feature, run `/readiness-gate`. Implementation MUST NOT begin until the gate produces a READY verdict. Verdict is recorded in `research/readiness-verdict.md`. NEEDS WORK = fix specs first. NOT READY = escalate. No exceptions.

### TDD Gate (#66)
Agent deliverables that include testable code must include test evidence. No "it works" without proof. Agent contract addition: if the output is code, the output includes test results or a reason why tests aren't applicable.
