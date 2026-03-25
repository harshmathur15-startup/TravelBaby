# Skill Ownership Map

Every domain skill needs an agent owner. Every agent needs a family.
Toolbox skills are shared infrastructure — used by all agents, owned by none.

## The Rule

- **Domain skills** produce reports, require expertise, track trends. They need an owner.
- **Toolbox skills** are workflow verbs — commit, test, debug. Everyone uses them. No owner needed.

## Toolbox Skills (shared, no owner)

| Skill | What It Is |
|-------|-----------|
| /kickoff | Session start ritual |
| /wrap | Session end ritual |
| /commit | Git commit |
| /pr | Pull request |
| /save-context | Context management |
| /save | Export table to file |
| /recall | Search past conversations |
| /Planning | Plan before coding |
| /sessions | Session awareness |
| /signal | Cross-session communication |
| /hooks | Reference documentation |
| /test | Run tests |
| /debug | Debugging workflow |
| /retro | Weekly retrospective |
| /changelog | Generate changelog |
| /why | Institutional memory |
| /report | Project status report |
| /standup | Daily standup summary |
| /assess | Skill recommender |
| /track-manager | Project tracking |

**20 toolbox skills.** Any agent in any family can invoke these.

## Governance Family — 14 domain skills

| Agent Role | Skills | Rationale |
|------------|--------|-----------|
| Benchmark | /blueprint | Compares product against Template |
| Debt | /debt, /health, /cleanup, /upgrade-deps | Finding rot, removing it, keeping dependencies current |
| Drift | /watch, /drift, /pulse, /env-check | Verifying reality matches claims, environment is sound |
| Accountability | /mother, /quality-judge, /review-pipeline, /what-next, /cost | Enforcing quality, tracking progress, managing cost |

## Research Family — 8 domain skills

| Agent Role | Skills | Rationale |
|------------|--------|-----------|
| Problem | /ask, /map | Surfaces unknowns, explores codebase before building |
| Market | — | Spec writing is the job itself; no slash command needed |
| BRD | /data-model, /diagram | Translates business requirements into technical structure |
| PRD | /spec, /readiness-gate, /decisions, /edge-case-check | Writes specs, gates builds, logs decisions, catches boundaries |

Note: Market agent has no skills — its deliverable IS the spec. Not every agent needs a slash command. The rule says no orphan agents (must belong to a family), not that every agent must own a skill.

## Build Family — 23 domain skills

Assigned by example phase. Products reassign based on their actual build agents.

| Agent Role (example) | Skills | Rationale |
|---------------------|--------|-----------|
| Infrastructure | /scaffold, /cms-sync, /onboard | Project setup, CMS wiring, developer onboarding |
| Design Lead | /ux-review, /a11y-audit | Visual quality, accessibility |
| Page Builder | /lighthouse, /seo-audit | Page performance, discoverability |
| Quality | /refactor, /review | Code restructuring, code review |
| Platform | /api-doc, /security-scan, /load-test, /migrate, /seed-database | Backend quality, security, data, performance |
| Launch & Ops | /deploy, /prod-ready, /public-ready, /incident | Deployment, production readiness, incident response |
| Agent Engineer | /prompt-optimize, /observe-agent, /agent-activity, /agent-catalog, /agent-list | AI agent tooling, observability |

## Totals

| Category | Count |
|----------|-------|
| Toolbox (shared) | 20 |
| Governance (domain) | 14 |
| Research (domain) | 8 |
| Build (domain) | 23 |
| **Total** | **65** |

No orphan skills. No orphan agents. Toolbox skills are explicitly shared — not unowned, but communal.
