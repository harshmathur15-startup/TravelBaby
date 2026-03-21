# Technical Debt Report -- Template
**Agent:** Ivy | **Run:** 2026-03-21 | **Type:** Third Run

---

## Summary Table

| Category | Count | Critical | High | Medium | Low |
|----------|-------|----------|------|--------|-----|
| TODOs / FIXMEs | 0 | 0 | 0 | 0 | 0 |
| Long files (>300 lines) | 0 | 0 | 0 | 0 | 0 |
| Type safety escapes | 2 | 0 | 0 | 2 | 0 |
| Missing tests (TS source) | 3 | 0 | 1 | 2 | 0 |
| Missing tests (scripts) | 0 | 0 | 0 | 0 | 0 |
| Orphaned research files | 8 | 0 | 0 | 1 | 7 |
| Orphaned skills | 2 | 0 | 1 | 1 | 0 |
| Console statements (scripts) | 17 | 0 | 0 | 0 | 17 |
| Duplicate logic | 1 | 0 | 0 | 1 | 0 |
| Fragile parsing | 1 | 0 | 0 | 0 | 1 |
| **TOTAL** | **34** | **0** | **2** | **7** | **25** |

---

## Comparison to Last Run (33 items)

| Item | Last Run | This Run | Status |
|------|----------|----------|--------|
| DEBT-03 Script test coverage | 1/9 | 9/9 | RESOLVED. All 9 scripts now have test files. 66 tests total. |
| DEBT-04 TS source test coverage | 0/3 | 0/3 | UNCHANGED. Still zero test files in agents/src/. |
| DEBT-01 Type cast cache_read_input_tokens | medium | -- | RESOLVED. The `as number` cast at line 113 is gone; `addTokens()` now uses `as Record<string, unknown>` with a `typeof === 'number'` guard (line 193-195). Runtime-safe. |
| DEBT-02 Type cast block.input | medium | medium | UNCHANGED. `block.input as Record<string, unknown>` at line 161. Single occurrence now (was 2 -- handleSingleToolCall merged into handleToolCall). |
| DEBT-05 Console statements | 17 | 17 | STABLE. Convention-compliant per general.md exception. |
| DEBT-06 Duplicate path logic | medium | medium | UNCHANGED. session-stop.js and handoff-generator.js still duplicate timestamp + handoff logic. |
| DEBT-07 Fragile date parsing | low | low | UNCHANGED. cost-tracker.js:28 still uses positional regex. |
| DEBT-08 CLAUDE.md counts | CLEAN | DRIFT | CLAUDE.md now references 4 agents, 59 skills. Agents on disk: 4 profiles. Skills on disk: 59. But /pulse and /sister skills still reference Vera and Aria (removed agents). |
| NEW: Orphaned research files | -- | 8 files | 8 research files belong to removed agents (Vera, Aria, Cleo, Nora, Sage, Scout, Mira). |
| NEW: Orphaned skills | -- | 2 skills | /pulse (Vera) and /sister (Aria) invoke agents that no longer exist in the family. |

**Net movement:** 2 items resolved (script tests, one type cast), 2 new categories added (orphaned research, orphaned skills). Critical: still 0. High: 3 -> 2. Total: 33 -> 34. The character of the debt shifted from "missing tests" to "post-restructure cleanup" -- the codebase got healthier but the family slim left artifacts.

---

## Debt Items

### DEBT-01 -- Type cast: block.input as Record
- **File:** `agents/src/core/BaseAgent.ts:161`
- **Severity:** medium
- **Category:** types
- **Effort:** quick-fix
- **Detail:**
  ```ts
  const toolInput = block.input as Record<string, unknown>;
  ```
  The SDK types `block.input` as `unknown` on `ToolUseBlock`. The cast to `Record<string, unknown>` is reasonable for JSON tool inputs but bypasses type checking. Consider a Zod parse or runtime `typeof` check.
- **Risk:** Low in practice -- Claude API always returns JSON objects for tool input. But the contract is unverified at runtime.

### DEBT-02 -- Type cast: response.usage as Record
- **File:** `agents/src/core/BaseAgent.ts:193`
- **Severity:** medium
- **Category:** types
- **Effort:** quick-fix
- **Detail:**
  ```ts
  const usage = response.usage as Record<string, unknown>;
  totals.cacheHit += typeof usage.cache_read_input_tokens === 'number'
    ? usage.cache_read_input_tokens : 0;
  ```
  This is the improved version of the old `as number` cast. The `typeof` guard makes it runtime-safe. Still a cast at the SDK boundary. This is the acceptable pattern for accessing non-standard SDK properties -- mark as "accepted risk" and revisit after Anthropic SDK upgrades.
- **Risk:** Very low. Runtime-safe. The only risk is if the SDK changes the property name.

### DEBT-03 -- Missing tests: 3 TS source files
- **Files:** `agents/src/core/BaseAgent.ts` (242 lines), `agent-logger.ts` (103 lines), `types.ts` (102 lines)
- **Severity:** high
- **Category:** testing
- **Effort:** task (2-4h)
- **Detail:** Zero test files exist in agents/src/. The execute loop, retry logic, HITL approval, write scope enforcement, heartbeat, and logging are all untested. TDD Gate (#66) in general.md mandates test evidence for testable agent code. types.ts is mostly interfaces (low test value), but BaseAgent.ts and agent-logger.ts contain testable logic.
- **Priority:** BaseAgent.ts first (core logic: `needsApproval()`, `callWithRetry()`, `addTokens()`, `fail()`, write scope enforcement, confidence threshold). Then agent-logger.ts (file I/O side effects).
- **Escalation note:** This is the 3rd consecutive run flagging this item. Per the Outcome Rule, if it survives Run 4 unacted, escalate to Lena with a deadline.

### DEBT-04 -- Orphaned skills: /pulse and /sister reference removed agents
- **Files:** `.claude/skills/pulse/SKILL.md`, `.claude/skills/sister/SKILL.md`
- **Severity:** high
- **Category:** dead references
- **Effort:** quick-fix
- **Detail:** The family was slimmed from 8 to 4 agents in S16. Vera and Aria were removed. But:
  - `/pulse` still says "Spawn ONE agent named Vera" and writes to `research/vera-report.md` and `research/vera-history.csv`
  - `/sister` still says "Spawn ONE agent named Aria" and writes to `research/aria-synthesis.md` and `research/aria-history.csv`
  These skills will still work mechanically (they spawn subagents with those names), but they contradict the registry which lists only Petra, Ivy, Ada, and Lena. A product inheriting this template gets orphaned skills that reference non-family agents.
- **Fix options:**
  1. Update skills to reference current family members (Ada could absorb /pulse signals, Lena could absorb /sister synthesis)
  2. Keep as standalone skills but remove family references and agent names
  3. Delete them -- their signals are "checked manually when needed" per the board
- **Risk:** Medium. Products inheriting the template get confusing contradictions between the registry and the skills.

### DEBT-05 -- Orphaned research files (8 files)
- **Severity:** medium (aggregate) / low (individual)
- **Category:** cleanup
- **Effort:** quick-fix
- **Detail:** 8 research files belong to agents removed in S16:
  1. `research/vera-report.md` -- Vera (removed)
  2. `research/vera-history.csv` -- Vera (removed)
  3. `research/vera-reflection-s14.md` -- Vera (removed)
  4. `research/aria-synthesis.md` -- Aria (removed)
  5. `research/aria-synthesis-s14.md` -- Aria (removed)
  6. `research/aria-history.csv` -- Aria (removed)
  7. `research/aria-reflection-s14.md` -- Aria (removed)
  8. `research/cleo-reflection-s14.md` -- Cleo (merged into Ada)
  Additionally, these untracked files exist but aren't on the main branch yet:
  - `research/nora-reflection-s14.md` -- Nora (merged into Lena)
  - `research/nora-history.csv` -- Nora (removed)
  - `research/nora-quality-audit.md` -- Nora (removed)
  - `research/sage-reflection-s14.md` -- Sage (never in this family)
  - `research/scout-reflection-s14.md` -- Scout (never in this family)
  - `research/mira-reflection-s14.md` -- Mira (never in this family)
- **Risk:** Low per file. Products are told to "delete research/" when inheriting. But for the template itself, these are noise.

### DEBT-06 -- Console statements in scripts (17 actual calls)
- **Files:** `component-validation.js` (3), `cost-tracker.js` (2), `memory-integrity.js` (12)
- **Severity:** low
- **Category:** convention-compliant
- **Effort:** none
- **Detail:** Convention gap resolved by rule exception in general.md. Hook scripts use stdout/stderr as their output channel. No action needed. Tracked for completeness.

### DEBT-07 -- Duplicate path-detection logic
- **Files:** `scripts/session-stop.js:8-11`, `scripts/handoff-generator.js:9-10`
- **Severity:** medium
- **Category:** complexity
- **Effort:** quick-fix
- **Detail:** Both scripts implement timestamp generation (`toLocaleString` + regex replace) and handoff directory creation. session-stop.js is a "simplified version" of handoff-generator.js (comment line 3). They run in different hooks (Stop vs PreCompact) and write to the same `thoughts/handoffs/` directory.
- **Risk:** Low -- duplicate handoff files are harmless but noisy. The real cost is maintaining the same logic in two places.

### DEBT-08 -- Fragile date-parsing regex in cost-tracker.js
- **File:** `scripts/cost-tracker.js:28`
- **Severity:** low
- **Category:** complexity
- **Effort:** quick-fix
- **Detail:**
  ```js
  const time = new Date(timeMatch[1].replace(/-/g, (m, i) => i > 9 ? ':' : m));
  ```
  Positional index arithmetic to reconstruct ISO timestamps. If session-tracker.js changes its format, this silently produces invalid Date objects.

---

## Scan Details

| Scan | Result |
|------|--------|
| TODOs/FIXMEs/HACKs | 0 matches across all .ts/.js files |
| Files > 300 lines | 0 (BaseAgent.ts: 242, memory-integrity.js: 156, handoff-generator.js: 110) |
| Files > 500 lines | 0 |
| `@ts-ignore` / `@ts-expect-error` / `eslint-disable` | 0 |
| `as` type casts in .ts files | 2 (BaseAgent.ts:161, 193). Down from 3 -- line 113 cast eliminated. |
| `any` type in .ts files | 0 |
| Scripts with test files | 9/9. All tested. 66 tests total. |
| TS source files with tests | 0/3. Unchanged. |
| Skills on disk | 59 |
| Agent profiles on disk | 4 (petra, ivy, ada, lena) |
| Agents in registry | 4 |
| CLAUDE.md agent count | 4 -- matches |
| Orphaned skills (/pulse, /sister) | 2 -- reference removed agents Vera and Aria |
| Orphaned research files | 8 committed + 6 untracked = 14 total |
| Console statement calls in scripts (non-test) | 17 (component-validation: 3, cost-tracker: 2, memory-integrity: 12) |
| Hooks configured | 8 (per CLAUDE.md) |
| Hook scripts on disk | 9 present |
| MCP servers configured | 2 (context7, sequential-thinking) |
| package.json | Not present (correct -- template by design) |
| Function length violations (>40 lines) | 0. Longest: `runLoop()` at 39 lines. |
| Dead code / unreferenced exports | None in TS source |

---

## Top 3 Recommendations

**1. Clean up orphaned skills: /pulse and /sister (DEBT-04)**
These skills reference agents (Vera, Aria) that no longer exist in the family. Products inheriting the template get contradictory signals. Decide: absorb into Ada/Lena, make standalone, or delete. This is the highest-priority item because it affects every product that inherits.

**2. Test coverage for BaseAgent.ts and agent-logger.ts (DEBT-03)**
Third consecutive run flagging this. The core agent infrastructure has zero test coverage. Every product inherits this untested code. Write unit tests for: `needsApproval()`, `callWithRetry()`, `addTokens()`, `fail()`, write scope enforcement, confidence threshold. Mock the Anthropic client.

**3. Clean orphaned research files (DEBT-05)**
14 files (8 committed, 6 untracked) belong to agents that no longer exist. Quick cleanup -- delete or archive. Reduces noise for anyone browsing research/.

---

## Outcome (Outcome Rule)

**What changed because of my last run?**
- Script test coverage went from 1/9 to 9/9 (66 tests total). The highest-effort item from Run 2 is fully resolved.
- Type cast at BaseAgent.ts:113 was eliminated -- `addTokens()` now uses a runtime `typeof` guard instead of `as number`. Down from 3 casts to 2.
- BaseAgent.ts shrank further: 259 -> 242 lines. `handleSingleToolCall()` was merged into `handleToolCall()`, eliminating one of the two `block.input` casts.
- Family was slimmed from 8 to 4 agents, which resolved some structural complexity but introduced a new debt category (orphaned skills and research files).

**What am I doing differently this run?**
- Added orphaned skills and orphaned research files as scan categories -- the family restructure created a new type of debt that Run 2 couldn't have caught.
- Rechecked function lengths now that BaseAgent was refactored again (all clean, longest is `runLoop()` at 39 lines).
- Escalation warning added to DEBT-03 (TS source tests) -- 3rd consecutive run. Outcome Rule requires escalation if Run 4 finds it unresolved.

---

*Ivy -- Technical Debt Scanner | d:/AI/_template | 2026-03-21*
