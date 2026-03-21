# Skill Tiers

57 skills organized by when you need them.

## Core (13) — Every product, from day 1

| Skill | What It Does |
|-------|-------------|
| `/kickoff` | Start-of-session — loads memory, commits, specs, primes context |
| `/wrap` | End-of-session — summarizes work, updates memory, sets next context |
| `/commit` | Generate well-structured git commit from staged changes |
| `/pr` | Create a pull request — branch, push, open PR with description |
| `/test` | Run tests, check coverage, fix failures |
| `/review` | Review code for quality, bugs, security, conventions |
| `/debug` | Structured debugging — reproduce, isolate, fix |
| `/planning` | Analyze before coding — break tasks into steps, verify with tests |
| `/deploy` | Production deployment — pre-checks, migrations, rollback plan |
| `/save-context` | Check context usage, recommend best action to save tokens |
| `/recall` | Search all past conversations across sessions |
| `/report` | Project status report — what's built, what's left, progress |
| `/standup` | Daily standup summary from git log and todos |

## Extended (28) — Opt-in, based on project needs

### Specification & Design
| Skill | What It Does |
|-------|-------------|
| `/spec` | One-line feature -> full spec with acceptance criteria, edge cases |
| `/data-model` | Product requirements -> Prisma schema |
| `/scaffold` | Generate boilerplate — route, controller, service, test files |
| `/ask` | Surface ambiguities and unknowns before building |
| `/diagram` | Mermaid architecture diagrams from codebase |
| `/api-doc` | Express routes -> OpenAPI 3.0 spec |

### Quality & Security
| Skill | What It Does |
|-------|-------------|
| `/health` | Scan for long files, console.logs, dead imports, coverage gaps |
| `/security-scan` | Deep security audit of a file, route, or diff |
| `/quality-judge` | 8-dimension code evaluation with auto-remediation tasks |
| `/review-pipeline` | Multi-phase review — quality, architecture, security, performance |
| `/readiness-gate` | Cross-document alignment check (BRD <-> PRD <-> architecture) |
| `/ux-review` | React component accessibility and UX review |

### Infrastructure & Data
| Skill | What It Does |
|-------|-------------|
| `/incident` | Structured incident response — triage, root cause, postmortem |
| `/load-test` | API route -> k6 load test script |
| `/migrate` | Prisma migration workflow — create, review, deploy |
| `/seed-database` | Generate realistic test data for PostgreSQL |
| `/env-check` | Verify all required environment variables are set |

### Workflow & Context
| Skill | What It Does |
|-------|-------------|
| `/retro` | Weekly retrospective from git log and notes |
| `/decisions` | Log an architectural decision (ADR) |
| `/why` | Explain WHY a file/function was built the way it was |
| `/what-next` | Recommend highest-priority next task |
| `/save` | Save a table from conversation to a file |
| `/onboard` | New developer setup checklist |
| `/sessions` | See active sessions, set focus, clean stale ones |
| `/signal` | Cross-session communication — messages, inbox, notes |
| `/changelog` | Generate CHANGELOG.md from git history |
| `/level` | Full project setup assessment across 6 layers |
| `/track-manager` | Track-based project management with parallel work streams |
| `/pulse` | Measure 5 workflow health signals (memory, hooks, velocity, context, tests) |
| `/sister` | Cross-agent synthesis — read all agent outputs, find patterns, measure family health |

## Template-Only (4) — For maintaining the template, not for products

| Skill | Agent | What It Does |
|-------|-------|-------------|
| `/blueprint` | Petra | Benchmark template against best Claude Code setups worldwide |
| `/debt` | Ivy | Scan for technical debt, prioritize by severity |
| `/watch` | Ada | Verify CLAUDE.md accuracy, file integrity, infrastructure health |
| `/mother` | Lena | Audit file quality, execute cleanup, track accountability |

## Utility (12) — Specialized tools

| Skill | What It Does |
|-------|-------------|
| `/cost` | Analyze tool.log for token costs and efficiency |
| `/dashboard` | Session metrics from structured JSONL logs |
| `/assemble` | Detect project stack, recommend skills and agents |
| `/wave-execute` | Dependency-aware parallel task execution |
| `/map` | Codebase exploration — architecture, patterns, dependencies |
| `/drift` | Compare codebase against CLAUDE.md architecture plan |
| `/hooks` | Hooks reference documentation |
| `/level-shipping` | Shipping readiness assessment |
| `/agent-activity` | All agent activity in think/act/observe format |
| `/agent-list` | Agents run in current session |
| `/agent-catalog` | All agents configured in project |
| `/observe-agent` | Real-time agent observability |
