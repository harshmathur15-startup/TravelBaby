---
name: quality-judge
description: 8-dimension code quality evaluation with auto-remediation task generation. Scores code, creates fix tasks on failure.
---

# Quality Judge

Borrowed from ccswarm's LLM Quality Judge (#65). Evaluates code on 8 dimensions and generates remediation tasks when quality fails.

## When It Runs
- After any significant implementation (feature, refactor)
- Manually via `/quality-judge <path>`
- As part of `/review-pipeline` (optional deep mode)

## Dimensions (0-100 each)

| # | Dimension | What It Measures |
|---|-----------|-----------------|
| 1 | **Correctness** | Does it do what was asked? Matches spec/acceptance criteria? |
| 2 | **Completeness** | Are all cases handled? Edge cases? Error paths? |
| 3 | **Readability** | Can another developer understand it without explanation? |
| 4 | **Maintainability** | Can it be modified without breaking other things? |
| 5 | **Security** | OWASP top 10 compliance? Input validation? Auth? |
| 6 | **Performance** | Obvious inefficiencies? N+1? Missing indexes? |
| 7 | **Test Coverage** | Are the critical paths tested? Edge cases? |
| 8 | **Convention** | Follows project conventions? Naming? Structure? Patterns? |

## Scoring

- **90-100:** Excellent — ship it
- **70-89:** Good — minor improvements possible but not blocking
- **50-69:** Needs work — specific issues must be addressed
- **Below 50:** Significant rework needed

**Overall score** = weighted average: Correctness 20%, Security 20%, Completeness 15%, Test Coverage 15%, Readability 10%, Maintainability 10%, Performance 5%, Convention 5%.

## Auto-Remediation

For any dimension scoring below 70, generate a specific fix task:

```
REMEDIATION: [Dimension] scored [X]/100
File: [path]
Issue: [specific problem]
Fix: [concrete action to take]
Priority: [HIGH if <50, MEDIUM if 50-69]
```

## Output

```
## Quality Judge — [date]

| Dimension | Score | Verdict |
|-----------|-------|---------|
| Correctness | XX | one-line |
| ... | ... | ... |

**Overall: XX/100**
**Remediation tasks: N**

### Tasks Generated
1. [task description]
2. [task description]
```

## Instructions
- Read the actual code — don't score from descriptions or commit messages
- Every score below 70 MUST have a specific remediation task
- Security below 70 is always HIGH priority
- Be honest — inflated scores hide real issues
