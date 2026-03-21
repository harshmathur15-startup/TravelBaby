---
name: ask
description: Before implementing a feature, surface all ambiguities and unknowns. Prevents building the wrong thing.
---

# Ask Skill

The most expensive mistake in software is building the wrong thing.
Run this before implementing any non-trivial feature — forces clarity before a single line of code.

## Usage
`/ask <feature description>`

Examples:
- `/ask add billing recalculation when plan changes mid-cycle`
- `/ask order approval workflow`
- `/ask vendor payment with tax deduction`

## Workflow

1. Read `CLAUDE.md` for project domain and conventions
2. Read domain-specific rule files (if any) for compliance context
3. Read any related spec in `./specs/` if it exists
4. Analyze the feature and generate questions across all categories

## Output Format

```
## Ambiguity Report: <Feature Name>

### Must Answer Before Writing Code
*These block implementation — no guessing allowed*

- [ ] <critical question 1>
- [ ] <critical question 2>

### Should Clarify (But Can Assume Defaults)
*Implementation can proceed with stated assumptions — confirm later*

- [ ] <question> *(Assuming: <default assumption>)*
- [ ] <question> *(Assuming: <default assumption>)*

### Edge Cases to Handle
*Known edge cases that need explicit decisions*

- [ ] What happens when <edge case>?
- [ ] Who can <action> — any role restrictions?
- [ ] What's the undo/rollback behavior?

### Compliance / Regulatory Flags
*Domain-specific — flag anything that touches regulatory or compliance requirements*

- [ ] <compliance question if relevant>

### Suggested Defaults
*Reasonable assumptions Claude will use if you say "proceed"*

| Question | Assumed Answer |
|---|---|
| <question> | <assumption> |

---
**Blockers:** X questions need answers before coding.
**Can proceed with assumptions:** Y questions have reasonable defaults.
```

## Instructions
- "Must Answer" questions are true blockers — never assume an answer for these
- "Should Clarify" questions have safe defaults stated explicitly — user can override
- Always include edge cases around: empty states, concurrent users, permissions, rollback
- For domain features: always check if it touches a financial calculation, compliance rule, or sensitive record
- End by asking: "Answer the blockers and I'll start the spec + implementation."
- If the user says "proceed" — use the stated defaults and note them in the spec
