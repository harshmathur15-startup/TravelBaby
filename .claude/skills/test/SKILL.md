---
name: test
description: Run tests, check coverage, and fix failures. Use when writing or verifying tests.
disable-model-invocation: true
---

# Test Skill

## Workflow
1. Run the full test suite: `npm run test`
2. Check coverage: `npm run test:coverage`
3. If failures exist — read the failing test, understand the expectation, fix the code (not the test unless the test is wrong)
4. Re-run until all pass

## Coverage Thresholds
| Type | Minimum |
|---|---|
| Statements | 80% |
| Branches | 75% |
| Functions | 80% |
| Lines | 80% |

## Test Types
| Type | Tool | Location |
|---|---|---|
| Unit | Vitest | `**/*.test.ts` |
| Component | React Testing Library | `**/*.test.tsx` |
| Integration | Vitest | `**/*.integration.test.ts` |

## Instructions
- Never delete or weaken a test to make it pass — fix the source code
- If a test is genuinely wrong, explain why before changing it
- New features must include tests before marking complete
- Run `npm run test:watch` during active development
