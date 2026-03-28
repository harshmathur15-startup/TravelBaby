---
name: spec
description: Turn a one-line feature description into a full spec — acceptance criteria, edge cases, API contract, and data model.
---

# Spec Skill

Convert a vague feature request into a buildable spec before writing any code.

## Usage
`/spec <feature description>`

Example: `/spec add tax recalculation when billing amount changes mid-cycle`

## Workflow

1. Read `CLAUDE.md` to understand project domain and conventions
2. Read relevant rule files (e.g. `.claude/rules/backend.md` and any domain-specific rules) for domain context
3. Draft the full spec

## Output Format

Save the spec to `./specs/<kebab-case-feature-name>.md` and display it.

```markdown
# Spec: <Feature Name>

## Overview
[1-2 sentences: what this feature does and why it's needed]

## Acceptance Criteria
- [ ] <testable criterion 1>
- [ ] <testable criterion 2>
- [ ] <testable criterion 3>

## Out of Scope
- <what this explicitly does NOT cover>

## API Contract
### Endpoint
`METHOD /api/v1/<resource>`

### Request
```json
{ "field": "type" }
```

### Response
```json
{ "field": "type" }
```

### Error Cases
| Status | Condition |
|---|---|
| 400 | ... |
| 422 | ... |

## Data Model Changes
[New fields, tables, or migrations required]

## Edge Cases
- <edge case 1 and how to handle it>
- <edge case 2 and how to handle it>

## Dependencies
[Other features, services, or data this depends on]

## Test Plan
- [ ] Unit: <what to unit test>
- [ ] Integration: <what to integration test>
- [ ] Manual: <what to verify manually>
```

## Instructions
- Always save the spec to `./specs/` before displaying
- Be specific — vague acceptance criteria are useless
- Every edge case must have a stated handling strategy, not just a mention
- If the feature touches tax or compliance requirements, call out regulatory requirements explicitly
- Do not write any code — spec only
