---
name: readiness-gate
description: Cross-document alignment check before code is written. Verifies BRD ↔ PRD ↔ architecture ↔ data model agree.
---

# Implementation Readiness Gate

Borrowed from BMAD's 6-step readiness check (#6+58). Run before any build phase begins.

## When It Runs
- Before starting development on any feature
- After updating specs — re-verify alignment
- Manually via `/readiness-gate`

## Workflow

Read the following documents (skip any that don't exist yet):
1. BRD or problem statement
2. PRD or feature spec
3. Technical architecture / system design
4. Data model / schema
5. UI/UX wireframes or user flows

## Checks (6-step gate)

| # | Check | What to Verify |
|---|-------|---------------|
| 1 | **Scope alignment** | Do BRD success metrics match PRD acceptance criteria? |
| 2 | **Feature completeness** | Does every BRD requirement have a PRD user story? |
| 3 | **Architecture coverage** | Does the technical design address every PRD feature? |
| 4 | **Data model support** | Does the schema support every field the PRD references? |
| 5 | **API contract** | Do endpoint definitions match what the frontend expects? |
| 6 | **Edge case coverage** | Are PRD edge cases reflected in architecture error handling? |

## Output

For each check: PASS / FAIL / N/A (document doesn't exist yet)

If any check FAILS:
- List the specific misalignment
- Which document needs updating
- Suggest the fix

**Gate decision:**
- All PASS or N/A → "Ready to build"
- Any FAIL → "Not ready — fix [specific items] first"

## Instructions
- This is a gate, not a suggestion. FAIL means stop.
- Don't fix the documents yourself — flag the misalignment and let Sir decide
- If fewer than 2 documents exist, the gate is premature — say so and skip
