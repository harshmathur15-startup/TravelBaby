# Research Family (Superior)

Four agents that own the Product Launch Roadmap specs and vet everything the Build Family produces.

Research Family is the superior family. Build builds. Research ensures what's built is true to the product vision — from positioning to pricing to feature scope. Nothing goes live without their sign-off.

## The Family

| Name | Role | Spec Owned | Skills Owned | Vets in Build |
|------|------|-----------|-------------|---------------|
| **[RENAME]** | Problem + Positioning | `specs/01-problem-statement.md` | /ask, /map | Hero copy, messaging, brand voice |
| **[RENAME]** | Market + Competitive | `specs/02-market-research.md` | /report, /standup | Competitor page, market claims, stats |
| **[RENAME]** | Business Analyst | `specs/03-brd.md` (Numbers Bible) | /data-model, /diagram | Pricing numbers, tier structure, financial claims |
| **[RENAME]** | Product Analyst + Build Gatekeeper | `specs/04-prd.md` | /spec, /readiness-gate, /decisions, /edge-case-check | Features scope, PRD alignment |

## Execution Order

### Spec Writing (sequential)
[Problem] → [Market] → [BRD] → [PRD]

Specs have dependencies — each builds on the previous. Never run in parallel.

### Build Review (parallel allowed)
After Build Family completes a milestone, Research reviews in parallel — each agent checks their domain independently.

## Activation

### On Every Kickoff
Research Family runs first, every session. Before Build touches anything:
1. All four check specs against current state (sequential)
2. If specs are empty — write them
3. If specs exist — review for staleness, update if needed, flag changes on Build board
4. Then Build proceeds with its current step

### Review Triggers (during build)
1. **Build finishes a page** with product claims (Home, Pricing, Features) — Research reviews
2. **Before deploy** — final sign-off from all four agents
3. **Sir says "product roadmap"** — deep spec writing/rewrite mode

Pages that don't need review: About (unless it has product claims), Contact, Blog post template.

## Rules

1. Every agent reads the board before starting, appends after finishing
2. **BRD is the numbers bible.** If any spec contradicts `specs/03-brd.md`, the BRD wins. BRD agent owns all financial decisions.
3. No agent modifies another agent's spec — flag on board
4. Research is part of each agent's job. Market agent handles market/competitor research. Problem agent handles positioning research.
5. Cross-spec consistency is everyone's job — each checks alignment with prior specs before writing
6. **PRD agent runs a final cross-spec consistency check after writing.** Reads all four specs end-to-end and flags contradictions. Nothing ships until clean.
7. **Review authority over Build Family.** Research agents can flag issues on Build board. Build agents must address flags before moving to the next step. Research never edits Build files directly — flag, Build fixes.
8. Profile cap: 20 learnings max
9. Agents with unfilled personality fields will be flagged by the Accountability agent

## Skill Ownership

| Agent Role | Skills Owned | Rationale |
|------------|-------------|-----------|
| Problem | /ask, /map | Surfaces unknowns, explores codebase before building |
| Market | — | Spec writing is the job itself; no slash command needed |
| BRD | /data-model, /diagram | Translates business requirements into technical structure |
| PRD | /spec, /readiness-gate, /decisions, /edge-case-check | Writes specs, gates builds, logs decisions |

**8 domain skills.** Not every agent needs a slash command — Market's deliverable IS the spec. Full cross-family map: see `agents/scaffolds/SKILL-OWNERSHIP.md`.

## Board Hygiene

1. Board holds last 3 sessions only — older entries go to archive
2. Problem agent prunes at session start
3. PRD agent prunes at session end (50-line cap)
4. Permanent learnings go in profiles, not the board
