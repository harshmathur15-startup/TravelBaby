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

## Product Setup Checklist

After cloning:

- [ ] Fill in CLAUDE.md product section
- [ ] Copy `.env.example` to `.env`, fill values
- [ ] Delete `research/` (or keep empty)
- [ ] Delete `thoughts/` (or keep empty)
- [ ] Decide: keep all 57 skills or trim to Core tier
- [ ] Decide: build agent family or skip (see slim-mode.md)
- [ ] Initialize git: `rm -rf .git && git init`
- [ ] First commit: `git add -A && git commit -m "feat: initial project from template"`
