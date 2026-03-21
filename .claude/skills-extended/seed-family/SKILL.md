---
name: seed-family
description: Scaffold all 3 agent families for a new product — Governance, Research, and Build structure with product-specific names.
---

# Seed Family Skill

Create the Three-Family Architecture for a new product. Every product gets 3 families: Governance (watches), Research (specs), Build (executes).

## Usage

`/seed-family` — interactive setup
`/seed-family <project-path>` — seed at a specific project path

## The Three-Family Pattern

```
┌─────────────────────────────────────────────┐
│  GOVERNANCE FAMILY (4 dedicated agents)     │
│  Always present. Never carries domain work. │
│  Watches both families below.               │
├─────────────────────────────────────────────┤
│  RESEARCH FAMILY          BUILD FAMILY      │
│  (Superior)               (Reports to       │
│  Specs + vetting          Research)          │
│  Persists across          Created at code    │
│  all phases               phase              │
└─────────────────────────────────────────────┘
```

### Governance Family (4 agents, from Template pattern)

| Role | Skill | Active When | Template Origin |
|------|-------|-------------|-----------------|
| Blueprint Architect | /blueprint | Always | Petra |
| Debt Scanner | /debt | Code phase onward | Ivy |
| Drift + Integrity | /watch, /pulse | Code phase onward | Ada |
| Accountability | /mother | Always | Lena |

### Research Family (6 agents, spec phase)

| Role | Owns |
|------|------|
| Problem + Positioning | specs/01-problem-statement.md |
| Market + Competitive | specs/02-market-research.md |
| Business Analyst | specs/03-brd.md (Numbers Bible) |
| Product Analyst | specs/04-prd.md + cross-spec consistency |
| Research Agent | Deep research briefs |
| Synthesis Agent | Cross-agent patterns |

### Build Family (created at code phase)

Build agents are product-specific — their roles depend on what's being built. Created when code phase starts, not at seed time.

## Workflow

### Step 1 — Confirm Project

If no path given, ask: "Which project?" Verify the path exists and has a CLAUDE.md.

### Step 2 — Name the Agents

Generate names for Governance (4) and Research (6) families. Follow naming convention:
- Warm, short, human, mostly female
- Unique across ALL projects (check Kira, Template, Template-Website, and all product families)
- Never reuse names

Present for approval:

```
Proposed families for <project>:

GOVERNANCE:
| Role | Name |
|------|------|
| Blueprint Architect | <name> |
| Debt Scanner | <name> |
| Drift + Integrity | <name> |
| Accountability | <name> |

RESEARCH:
| Role | Name |
|------|------|
| Problem + Positioning | <name> |
| Market + Competitive | <name> |
| Business Analyst | <name> |
| Product Analyst | <name> |
| Research Agent | <name> |
| Synthesis Agent | <name> |

Approve these names, or suggest changes?
```

Wait for confirmation before proceeding.

### Step 3 — Generate Governance Family

Create:
```
agents/family-governance/
  registry.md
  board.md
  board-archive.md
  <name-1>/profile.md  (Blueprint)
  <name-2>/profile.md  (Debt)
  <name-3>/profile.md  (Drift)
  <name-4>/profile.md  (Accountability)
```

Registry includes:
- Activation rules (which agents are active in which phase)
- Execution order (sequential: benchmark → debt → drift → accountability)
- Relationship to other families (independent, watches both)
- Outcome Rule

### Step 4 — Generate Research Family

Create:
```
agents/family-research/
  registry.md
  board.md
  board-archive.md
  <name-1>/profile.md  (Problem)
  <name-2>/profile.md  (Market)
  <name-3>/profile.md  (BRD)
  <name-4>/profile.md  (PRD)
  <name-5>/profile.md  (Research)
  <name-6>/profile.md  (Synthesis)
```

Registry includes:
- Sequential spec execution: Problem → Market → BRD → PRD
- Research routing rules
- Cross-spec consistency check (PRD agent's final job)
- Numbers Bible designation (BRD)
- Review checkpoints (when Research vets Build output)
- Superior authority over Build Family

### Step 5 — Prepare Build Family Placeholder

Create:
```
agents/family-build/
  registry.md  (placeholder — "Build Family created at code phase")
  board.md
  board-archive.md
```

Do NOT create build agent profiles — they're product-specific and designed when code phase starts.

### Step 6 — Update .gitignore

Verify these patterns exist:
```
agents/family-governance/board.md
agents/family-governance/board-archive.md
agents/family-governance/**/profile.md
agents/family-research/board.md
agents/family-research/board-archive.md
agents/family-research/**/profile.md
agents/family-build/board.md
agents/family-build/board-archive.md
agents/family-build/**/profile.md
```

### Step 7 — Summary

```
## Families Created

**Project:** <name>

### Governance (4 agents)
| Name | Role | Active |
|------|------|--------|
| <name> | Blueprint Architect | Always |
| <name> | Debt Scanner | Code phase |
| <name> | Drift + Integrity | Code phase |
| <name> | Accountability | Always |

### Research (6 agents)
| Name | Role |
|------|------|
| <name> | Problem + Positioning |
| <name> | Market + Competitive |
| <name> | Business Analyst (BRD) |
| <name> | Product Analyst (PRD) |
| <name> | Research Agent |
| <name> | Synthesis Agent |

### Build
Placeholder created. Agents designed at code phase.

**Session flow:** Research → Build → Governance
**First run:** `/kickoff` will activate Research Family for spec writing.
```

## Instructions

- Never reuse agent names across projects
- Always wait for name approval before generating files
- Profiles start empty — agents earn learnings through runs
- Governance agents NEVER carry domain work
- Research is always superior to Build
- Build Family is product-specific — don't template it beyond the placeholder
- If the project already has agent families, ask before overwriting
