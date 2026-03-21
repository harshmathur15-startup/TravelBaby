# Slim Mode

Minimal product setup. Just the essentials — hooks, rules, and 13 core skills.

## When to Use Slim Mode

- Small projects or prototypes
- You want Claude Code assistance without the full agent infrastructure
- You'll add skills later as the project grows

## What You Keep

- **8 hooks** — safety, formatting, session tracking (these always run)
- **8 rules** — code standards (these always apply)
- **9 scripts** — hook execution (required by hooks)
- **13 core skills** — kickoff, wrap, commit, pr, test, review, debug, planning, deploy, save-context, recall, report, standup
- **Config files** — .gitignore, .prettierrc, tsconfig.json, eslint.config.js, docker-compose.yml

## What You Remove

```bash
# Remove template agent family
rm -rf agents/family/

# Remove template reports
rm -rf research/

# Remove template session data
rm -rf thoughts/

# Remove agent core code (only needed if building agent system)
rm -rf agents/src/

# Remove template-only skills
rm -rf .claude/skills/blueprint
rm -rf .claude/skills/debt
rm -rf .claude/skills/watch
rm -rf .claude/skills/pulse
rm -rf .claude/skills/sister
rm -rf .claude/skills/mother

# Remove extended skills you don't need (optional)
# Review docs/skill-tiers.md and keep what fits your project
```

## What You Still Get

Even in slim mode, every session:
- Starts with context loaded (session-start hook)
- Blocks dangerous bash commands (bash blocker hook)
- Protects sensitive files (file-protection hook)
- Auto-formats code (prettier hook)
- Checks code quality (quality-gate hook)
- Tracks session activity (session-tracker hook)
- Saves context on compaction (handoff-generator hook)
- Saves memory on exit (session-stop hook)

And you can:
- `/kickoff` to start with full context
- `/commit` for clean git messages
- `/review` for code quality checks
- `/test` for test management
- `/deploy` for production readiness
- `/wrap` to end cleanly

## Growing Beyond Slim

When your project needs more:
1. Check [skill-tiers.md](skill-tiers.md) for Extended skills
2. Add individual skills: just keep their directory in `.claude/skills/`
3. Build an agent family when you have multiple specs or documents (see [getting-started.md](getting-started.md#6-build-your-agent-family-optional))
