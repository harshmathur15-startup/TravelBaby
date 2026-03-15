---
name: sync
description: Compare this project's skills and rules against the master template at d:\AI\_template\ — shows what's drifted or missing.
---

# Sync Skill

Keeps all projects in sync as the template evolves. Run when starting a new project or after updating the template.

## Workflow

1. Glob `.claude/skills/*/SKILL.md` — list current project's skills
2. Glob `d:/AI/_template/.claude/skills/*/SKILL.md` — list template skills
3. Glob `.claude/rules/*.md` — list current project's rules
4. Glob `d:/AI/_template/.claude/rules/*.md` — list template rules
5. Compare the two sets and identify gaps
6. Optionally sync missing items if user confirms

## Output Format

```
## Template Sync Report

### Missing Skills (in template, not in this project)
| Skill | Action |
|---|---|
| /kickoff | Copy from template? |
| /diagram | Copy from template? |

### Extra Skills (in this project, not in template)
| Skill | Note |
|---|---|
| /domain-specific | Project-specific — keep |

### Missing Rules
| Rule | Action |
|---|---|
| database.md | Copy from template? |

### Config Files
| File | Status |
|---|---|
| .github/workflows/ci.yml | Missing in project |
| docker-compose.yml | Missing in project |
| tsconfig.json | Present ✅ |

---
**Summary:** X skills missing, Y rules missing, Z config files missing.
```

After showing the report, ask:
"Copy all missing items from template? (yes / skills only / rules only / no)"

If yes: copy missing skills and rules from `d:/AI/_template/` to the current project.
Never overwrite existing files — only add missing ones.

## Instructions
- Template path is always `d:/AI/_template/` — hardcoded for this setup
- Project-specific skills (e.g. domain-specific rules) in "Extra Skills" are expected — do not flag as problems
- Only copy when user explicitly confirms
- After copying, re-run the comparison to confirm sync succeeded
- Never modify the template from this skill — it's read-only here
