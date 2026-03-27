# What Products Inherit

Clear mapping of what transfers from template to product and what doesn't.

## Inherited (copy to product)

| What | Path | Notes |
|------|------|-------|
| All skills | `.claude/skills/` | 59 skills. Consider removing Template-only tier (4 skills) |
| Hook configuration | `.claude/settings.json` | 8 hooks, all functional |
| Hook scripts | `scripts/` | 9 scripts + test files |
| Rules | `.claude/rules/` | 8 domain rules (304 lines total) |
| MCP servers | `.claude/settings.json` | context7, sequential-thinking |
| Documentation | `docs/` | Getting started, skill tiers, this file |
| CLAUDE.md | `CLAUDE.md` | Fill in the product section below the marker |
| Config files | `.gitignore`, `.prettierrc`, `tsconfig.json`, `eslint.config.js` | Standard configs |
| Docker config | `docker-compose.yml` | Development environment |
| Env template | `.env.example` | Fill with your values |

## NOT Inherited (template-only)

| What | Path | Why Not |
|------|------|---------|
| Agent reports | `research/` | Template's self-audit data. Products start with empty research/ |
| Agent family profiles | `agents/family/*/profile.md` | These agents audit the TEMPLATE. Build your own family for your product |
| Board and archive | `agents/family/board.md`, `board-archive.md` | Template's agent coordination. Your agents write their own board |
| Session artifacts | `thoughts/` | Handoffs and cost data from template development sessions |
| Template memory | `~/.claude/projects/*/memory/MEMORY.md` | Auto-created per project. Your product gets its own |

## Inherited as Pattern (copy the format, not the content)

| What | Template Example | Your Product |
|------|-----------------|--------------|
| Agent family structure | `agents/family/registry.md` | Copy format, define your own agents |
| Board protocol | 50-line cap, resolved entries archive | Same protocol, your agents' notes |
| Execution order | Petra -> Ivy -> Ada -> ... -> Lena | Your agents, your order |
| Outcome Rule | "What changed because of my last run?" | Same rule, applied to your agents |
| Agent profiles | `agents/family/petra/profile.md` | Same format: Why I Exist, Expertise, Learnings, Failure Modes, Last Run |
| Governance scaffold | `agents/scaffolds/governance/` | Copy to `agents/families/governance/`, rename agents |
| Research scaffold | `agents/scaffolds/research/` | Copy to `agents/families/research/`, rename agents |
| Build scaffold | `agents/scaffolds/build/` | Copy to `agents/families/build/`, rename agents |

## Agent Family Scaffolds

Three scaffold families in `agents/scaffolds/` that products copy, rename, and customize. The architecture is inherited. The identity is not.

### When Each Family Is Needed

| Family | When | Skip If |
|--------|------|---------|
| Governance | Recommended — health monitoring for any non-trivial product | Simple static sites without agents or multi-phase roadmap |
| Research | Always for products following the Product Launch Roadmap | Product has no specs phase |
| Build | Products with multi-phase builds (5+ steps) | Simple projects with no roadmap |

### How to Use

1. Copy the scaffold directory to your project:
   ```bash
   mkdir -p agents/families
   cp -r agents/scaffolds/governance/ agents/families/governance/
   cp -r agents/scaffolds/research/ agents/families/research/
   cp -r agents/scaffolds/build/ agents/families/build/
   ```
2. Rename generic role directories to your agent names (warm, short, human, mostly female, unique per project)
3. Replace `[RENAME]` and `[Product]` placeholders in registry.md and profiles
4. Fill in agent personalities in each profile.md
5. Wire governance agents into your `/kickoff` and `/wrap` skills (see governance registry for wiring instructions)
6. For Build: copy `_agent-template/profile.md` once per agent, then delete the template directory

### What Each Scaffold Provides

**Governance** — 4 roles predefined (Benchmark, Debt, Drift, Accountability). Execution order wired: Benchmark at kickoff, Debt+Drift parallel at wrap, Accountability after both. Ready to run once renamed.

**Research** — 4 roles mapped to the Product Launch Roadmap (Problem, Market, BRD, PRD). Includes activation rules, spec ownership, review triggers, and the numbers bible pattern. Sequential for writing, parallel for reviewing.

**Build** — Structure only, no predefined agents. Shows how to define graduated/active/queued agents, map phases to agents, and manage handoffs. Products define their own agents based on their roadmap.

## Product Setup Checklist

After cloning:

- [ ] Fill in CLAUDE.md product section
- [ ] Copy `.env.example` to `.env`, fill values
- [ ] Delete `research/` (or keep empty)
- [ ] Delete `thoughts/` (or keep empty)
- [ ] Delete template agents from `agents/family/` (Thea, Nell, Priya)
- [ ] Reset `agents/family/registry.md` with your own agents
- [ ] Decide: keep all skills or trim to Core tier
- [ ] Copy agent scaffolds: `agents/scaffolds/` → `agents/families/`
- [ ] Rename agents in each family registry and profile
- [ ] Wire governance into `/kickoff` and `/wrap`
- [ ] Recapture baselines: `node scripts/drift-check.cjs capture`
- [ ] Initialize git: `rm -rf .git && git init`
- [ ] First commit: `git add -A && git commit -m "feat: initial project from template"`
