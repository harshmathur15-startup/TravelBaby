# Slim Mode

Minimal product setup. Just the essentials — hooks, rules, and 9 core skills.

## When to Use Slim Mode

- Small projects or prototypes
- You want Claude Code assistance without the full agent infrastructure
- You'll add skills later as the project grows

## What You Keep

- **10 hooks** — health checks, safety, formatting, session tracking (always run)
- **5 rules** — code standards for static sites (always apply)
- **12 scripts** — hook execution + skill utilities (required by hooks)
- **9 core skills** — kickoff, wrap, test, review, recall, report, retro, signal, stock-photos

## What You Remove

```bash
# Remove template agent family
rm -rf agents/family/

# Remove template reports
rm -rf research/

# Remove template session data
rm -rf thoughts/

# Remove extended skills you don't need (optional)
# Review docs/skill-tiers.md and keep what fits your project
```

## What You Still Get

Even in slim mode, every session:
- Verifies memory integrity (memory-integrity hook)
- Checks for file drift (drift-check hook)
- Validates skills/agents structure (component-validation hook)
- Blocks dangerous bash commands (bash-blocker hook)
- Protects sensitive files (file-protection hook)
- Auto-formats code (prettier hook)
- Detects console.log statements (quality-gate hook)
- Tracks session activity (session-tracker hook)
- Saves handoff on compaction (handoff-generator hook)
- Estimates costs on exit (session-stop hook)

And you can:
- `/kickoff` to start with full context
- `/review` for code quality checks
- `/test` for test management
- `/wrap` to end cleanly

## Growing Beyond Slim

When your project needs more:
1. Check [skill-tiers.md](skill-tiers.md) for Extended and SaaS skills
2. Add individual skills: move their folder from `skills-extended/` to `skills/`
3. Build an agent family when you have multiple specs or documents
