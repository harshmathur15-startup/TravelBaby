# Technical Debt Report — Template
**Agent:** Ivy | **Run:** 2026-03-20 | **Type:** First Run

---

## Summary Table

| Category | Count | Critical | High | Medium | Low |
|----------|-------|----------|------|--------|-----|
| TODOs / FIXMEs | 0 | 0 | 0 | 0 | 0 |
| Long files (>300 lines) | 1 | 1 | 0 | 0 | 0 |
| Type safety escapes | 1 | 0 | 1 | 0 | 0 |
| Missing tests | 9 | 0 | 0 | 9 | 0 |
| Dead code / dead refs | 0 | 0 | 0 | 0 | 0 |
| Console statements (scripts) | 16 | 0 | 0 | 0 | 16 |
| Logic bugs | 1 | 0 | 1 | 0 | 0 |
| Stale pricing data | 1 | 0 | 0 | 1 | 0 |
| **TOTAL** | **29** | **1** | **2** | **10** | **16** |

---

## Quick Wins (< 30 min each)

| # | File | Issue | Effort |
|---|------|-------|--------|
| QW-1 | `agents/src/core/BaseAgent.ts:226` | Type cast `as Record<string, number>` for cache token access — replace with SDK's typed property once available | quick-fix |
| QW-2 | `scripts/session-stop.js:41` | Pricing comment says "Opus" but model is Sonnet — stale cost estimate calculation | quick-fix |
| QW-3 | `scripts/cost-tracker.js:49` | Pricing comment says "Opus: $15/$75" but template uses Sonnet — wrong model in estimate note | quick-fix |

---

## Top 10 Debt Items

### DEBT-01 — BaseAgent.ts exceeds 300-line limit
- **File:** `agents/src/core/BaseAgent.ts`
- **Lines:** 475 (limit: 300, critical threshold: 500)
- **Severity:** critical
- **Category:** complexity
- **Effort:** task (1-4h)
- **Detail:** File is 475 lines — 58% over the 300-line limit. Contains: type definitions (lines 1-106), abstract class with constructor (107-138), `execute()` main loop (169-308), `handleSingleToolCall()` (312-370), retry logic (374-383), fail helper (387-404), logging methods (408-443), heartbeat (447-474). Split into: `BaseAgent.types.ts` (interfaces/enums), `BaseAgent.ts` (class only, ~280 lines). Below the 500-line critical threshold but approaching it.
- **Risk:** Every product that extends BaseAgent imports this monolith. Any edit risks cross-concern conflicts. Harder to test individual concerns.

### DEBT-02 — Logic bug: ON_FINANCIAL_WRITE approval fires for ALL write tools
- **File:** `agents/src/core/BaseAgent.ts:327-329`
- **Severity:** high
- **Category:** complexity / security
- **Effort:** quick-fix (< 30min)
- **Detail:** The approval check reads:
  ```ts
  const needsApproval =
    this.humanInputMode === 'ALWAYS' ||
    (this.humanInputMode === 'ON_FINANCIAL_WRITE' && tool.isWrite);
  ```
  `tool.isWrite` is always true at this point (line 326 already checked `tool?.isWrite`). The `ON_FINANCIAL_WRITE` mode is supposed to limit approval to *financial* write tools, but the current condition fires for ALL write tools when mode is `ON_FINANCIAL_WRITE`. Either a dedicated `isFinancial` flag is needed on `AgentTool`, or the condition is effectively the same as `ALWAYS` — making `ON_FINANCIAL_WRITE` a meaningless distinction.
- **Risk:** Every product using this base class inherits broken human-in-the-loop semantics. Financial tools get no special treatment.

### DEBT-03 — All 9 scripts have zero test coverage
- **Files:** All files in `scripts/`
- **Severity:** medium (× 9)
- **Category:** testing
- **Effort:** project (> 4h total; ~30-60min per script)
- **Detail:** None of the 9 scripts have a corresponding `.test.js` or `.test.ts` file. These scripts are hooks — they run on every file edit, every session start/stop, every pre-compact. Untested hook logic that misbehaves silently degrades every session. Priority order for coverage:
  1. `memory-integrity.js` — most logic, highest risk (156 lines)
  2. `handoff-generator.js` — path detection logic can misfire (109 lines)
  3. `session-stop.js` — runs on every stop, reads/writes multiple files (83 lines)
  4. `quality-gate.js` — typecheck integration (47 lines)
  5. Remaining 5: lower complexity but still untested

### DEBT-04 — Type cast workaround for cache token access
- **File:** `agents/src/core/BaseAgent.ts:226`
- **Severity:** high
- **Category:** types
- **Effort:** quick-fix
- **Detail:**
  ```ts
  totalTokens.cacheHit += (response.usage as Record<string, number>).cache_read_input_tokens ?? 0;
  ```
  This casts `response.usage` to bypass TypeScript type checking. The SDK likely has `cache_read_input_tokens` on the extended usage type. Should use the proper SDK type or a narrowing check.
- **Risk:** If SDK type changes, this silently breaks at runtime. No compile-time safety.

### DEBT-05 — Console statements in scripts (16 total)
- **Files:** `scripts/component-validation.js` (3), `scripts/cost-tracker.js` (2), `scripts/memory-integrity.js` (11)
- **Severity:** low
- **Category:** cleanup
- **Effort:** quick-fix (per file)
- **Detail:** 16 console.log/error/warn statements across 3 scripts. Convention (general.md rule) is "no console.log in committed code — use the logger utility." However, these are CLI scripts that run as hooks — their output IS the output mechanism (stdout/stderr). No logger utility exists in the template. The rule conflicts with the script design pattern.
  - **Actionable:** Exempt hook scripts explicitly in the convention rule, or route through stderr consistently (as session-stop and quality-gate already do). This is a convention gap, not a runtime bug.

### DEBT-06 — Stale pricing model in cost estimation
- **Files:** `scripts/cost-tracker.js:49`, `scripts/session-stop.js:41-43`
- **Severity:** medium
- **Category:** cleanup
- **Effort:** quick-fix
- **Detail:** Both files use Opus pricing ($15/M input, $75/M output) in comments and calculations. The template's BaseAgent routes to Sonnet ($3/$15) and Haiku ($0.25/$1.25). Cost estimates are 3-5x inflated when presented to the user. The estimates are already labeled approximate, but the wrong pricing model compounds the error.

### DEBT-07 — session-stop.js and handoff-generator.js share duplicate path-detection logic
- **Files:** `scripts/session-stop.js:8-11`, `scripts/handoff-generator.js:9-10`
- **Severity:** medium
- **Category:** complexity
- **Effort:** quick-fix
- **Detail:** Both scripts implement the same timestamp generation and handoff directory path. session-stop.js was created as a "simplified version" of handoff-generator.js (comment on line 3), but they run in different hooks (Stop vs PreCompact) and produce overlapping handoff files in the same directory. Risk: handoff files from both hooks can collide if a session ends immediately after a compact.

### DEBT-08 — BaseAgent.ts: no test coverage for the base class
- **File:** `agents/src/core/BaseAgent.ts`
- **Severity:** medium
- **Category:** testing
- **Effort:** task (1-4h)
- **Detail:** The only TypeScript source file has no test file. The execute loop, retry logic, confidence gate, write scope enforcement, and HITL approval logic are all untested. Rule: TDD Gate (#66) in general.md requires test evidence for testable agent code.

### DEBT-09 — CLAUDE.md skill count is accurate (59 listed = 59 on disk)
- **Status:** CLEAN — no drift here
- **Note:** Petra flagged "54 says 54, disk says 55" on the previous version. The current CLAUDE.md says 59 and disk shows 59 directories. This item is resolved.

### DEBT-10 — cost-tracker.js: date-parsing regex is fragile
- **File:** `scripts/cost-tracker.js:28`
- **Severity:** low
- **Category:** complexity
- **Effort:** quick-fix
- **Detail:**
  ```js
  const time = new Date(timeMatch[1].replace(/-/g, (m, i) => i > 9 ? ':' : m));
  ```
  This replaces hyphens with colons based on character index position to reconstruct an ISO timestamp. If the timestamp format ever changes (session-tracker.js writes `2026-03-20T14-35-22`), the regex may silently produce an invalid Date. The replace should use a named group or explicit slice, not positional index arithmetic.

---

## Trend

**First run — no previous report to compare.**

Baseline established:
- Total debt items: 29
- Critical: 1
- High: 2
- Medium: 10
- Low: 16
- Scripts with test coverage: 0/9 (0%)
- Source files with test coverage: 0/1 (0%)

---

## Recommendations

**Priority 1 — Fix before next product launch:**
1. **DEBT-02** (logic bug in HITL) — silent semantic failure, quick to fix. Add `isFinancial` flag to `AgentTool` interface or rename mode.
2. **DEBT-04** (type cast) — 30 minutes, removes a silent runtime risk.

**Priority 2 — Fix in next sprint:**
3. **DEBT-01** (BaseAgent.ts split) — Extract types to `BaseAgent.types.ts`. Class stays coherent, file length drops to ~280 lines.
4. **DEBT-06** (pricing model) — Update both scripts to Sonnet pricing. Improves cost signal accuracy.

**Priority 3 — Address before scaling:**
5. **DEBT-03** (missing script tests) — Start with memory-integrity.js. Every script that runs as a hook has no safety net.
6. **DEBT-08** (BaseAgent test file) — Required by TDD Gate rule (#66) in general.md.

**Structural note for Aria:**
The ON_FINANCIAL_WRITE bug (DEBT-02) and the missing `isFinancial` property on AgentTool may also surface as an Ada drift item — the agents.md rule says "any action that modifies financial data requires explicit human approval" but the mechanism to enforce this distinction does not exist in code. Convention and implementation are misaligned.

---

## Scan Details

| Scan | Result |
|------|--------|
| TODOs/FIXMEs/HACKs | 0 matches across all source files |
| Files > 300 lines | 1 (BaseAgent.ts: 475 lines) |
| Files > 500 lines | 0 |
| Type escapes (`as any`, `@ts-ignore`, `eslint-disable`) | 1 (`as Record<string, number>` in BaseAgent.ts:226) |
| Scripts with test files | 0/9 |
| TypeScript source with tests | 0/1 |
| Skills in CLAUDE.md vs disk | 59 vs 59 — match |
| Agent profiles in registry vs disk | 6 vs 6 — match (petra, ivy, ada, vera, aria, lena) |
| Console statements in scripts | 16 (component-validation: 3, cost-tracker: 2, memory-integrity: 11) |
| Hooks configured | 5 hooks (SessionStart, PreToolUse×2, PostToolUse×2, PreCompact, Stop) |
| Hook scripts exist on disk | All 9 referenced scripts present |
| MCP servers configured | 2 (context7, sequential-thinking) |

---

*Ivy — Technical Debt Scanner | d:/AI/_template | 2026-03-20*
