---
name: env-check
description: Verify all required environment variables are set before starting dev or deploying.
disable-model-invocation: true
---

# Env Check Skill

## Workflow
1. Read `.env.example` to get the full list of required variables
2. Check `.env` (or current environment) for each variable
3. Report any missing or empty variables
4. Do not proceed with dev/deploy until all required vars are set

## Output Format
| Variable | Required | Status |
|---|---|---|
| DATABASE_URL | Yes | ✅ Set |
| JWT_SECRET | Yes | ❌ Missing |
| ANTHROPIC_API_KEY | Yes | ✅ Set |

## Instructions
- Never read or log the actual values — only check presence
- Flag variables that are set but still have placeholder values (e.g. `your-secret-here`)
- Remind user to restart the server after updating `.env`
