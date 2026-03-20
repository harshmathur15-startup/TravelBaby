## Aria — Cross-Agent Synthesis (2026-03-20)

### Family Health: 85/100

| Dimension | Score | Notes |
|-----------|-------|-------|
| Board Activity (35%) | 28/35 | 18 entries, all agents posted, strong cross-referencing via "for:" routing |
| Profile Freshness (25%) | 25/25 | All 6 profiles updated 2026-03-20 — perfect sync |
| Cross-Agent References (25%) | 22/25 | Ivy → Ada, Ada → Vera, Vera → Ivy/Ada — all explicit. Minor gap: Petra has no direct refs into later agents |
| Board Hygiene (15%) | 10/15 | No board-archive.md exists yet; board is at 64 lines (over 50-line cap). Acceptable for first run, but Lena must prune on next session. |

---

### Agent Inputs

| Agent | Latest Report | Key Finding |
|-------|--------------|-------------|
| Petra | research/petra-report.md | Template 62/100, rank #4 of 6. Weakest dimension: Depth (8/20). Top gap: SessionStart hook. 9 actionable improvements identified. |
| Ivy | research/debt-report.md | 29 debt items (1 critical, 2 high). Critical: BaseAgent.ts at 475 lines. High: HITL logic bug (ON_FINANCIAL_WRITE fires for all writes, not financial-only). 0/12 source files have tests. |
| Ada | research/ada-report.md | 87/100 overall. MEMORY.md absent (expected). 2 undocumented hooks in settings.json. All other counts verified clean. |
| Vera | research/vera-report.md | 56/100 overall. Test Coverage 0/100 and Memory Retention 35/100 are the two critical gaps. Hook infrastructure is sound (90/100). |

---

### Connections

**Connection 1 — The Testing Gap is a Credibility Problem (Ivy + Vera + Petra)**

All three agents triangulate the same structural failure from different angles. Ivy reports 0 test files against 12 source files — 9 untested scripts, 0 coverage on BaseAgent.ts. Vera scores Test Coverage at 0/100, the only dimension with a hard zero, and explicitly names it a "credibility problem": the template mandates 80% coverage in testing.md but practices 0%. Petra identifies Depth (8/20) as the template's weakest competitive dimension — and the absence of tested, trusted tooling is part of why. A template that ships with unverified hook scripts cannot honestly tell products "your tooling works." The gap is not just a number — it undermines the template's authority as a baseline. This is the single most consequential gap in the project.

**Connection 2 — The HITL Bug is Invisible Because There's No Test to Catch It (Ivy + Ada + Vera)**

Ivy identifies DEBT-02: `ON_FINANCIAL_WRITE` approves all write tools, not financial-only — a semantic bug making the mode functionally identical to `ALWAYS`. Ada's drift check did not surface this (it checks counts and file existence, not logic). Vera's Hook Health (90/100) measures whether hooks run, not whether their logic is correct. The result: a security-relevant behavior is broken, but the measurement system has no instrument aimed at it. No test would have caught this (Vera/Ivy both confirm 0 tests). The bug exists in a blind spot shared by every measuring agent. Ivy explicitly flagged this for Aria — the convention in agents.md says financial writes require human approval, but the mechanism enforcing that distinction does not exist in code. Convention and implementation are misaligned, and the gap will propagate to every product that extends BaseAgent.

**Connection 3 — Infrastructure Is Sound, Content Is Not (Ada + Vera + Ivy)**

Ada scores Hook Pipeline at 95/100 and confirms all scripts exist on disk. Vera scores Hook Health at 90/100 and confirms tool.log is live with 554 entries, sessions active, handoffs generating. Ivy confirms 0 TODOs, 0 dead skills, 0 dead agents. The plumbing works. What does not work: the logic inside the pipes. BaseAgent.ts is 475 lines with 0 tests and a logic bug. Scripts have 0 test coverage. MEMORY.md does not exist. The template's mechanical shell is healthy; its semantic core is not. This pattern — working infrastructure, untrusted content — is the dominant theme across all four reports. It means the template is ready to be used but not ready to be trusted.

**Connection 4 — Two Undocumented Hooks Create a Maintenance Blind Spot (Ada + Vera + Petra)**

Ada found 8 hook commands in settings.json but CLAUDE.md documents 6. The two undocumented commands (inline prettier formatter, session-tracker.js) run silently on every file edit. Vera deducted 5 points from Hook Health and 10 points from Context Efficiency for the same finding. Petra identifies "no structured observability beyond tool.log" (Depth gap #5) — the undocumented hooks compound this: two hooks produce output with no documentation trail, making session debugging harder. When something breaks in a product derived from this template, the engineer debugging it will not find these hooks in CLAUDE.md. The fix is trivial (update the count and name the hooks), but the pattern — adding hooks without documenting them — is a habit that compounds.

---

### Contradictions

**Ivy (DEBT-09) vs. Petra (board entry):** Petra flagged "CLAUDE.md says 54 skills but disk shows 55" in her board post. Ivy's scan found 59/59 — a match. Ivy explicitly noted the Petra discrepancy is resolved: by the time Ivy ran, CLAUDE.md had been updated to 59. This is not a real contradiction — it is a resolved race condition. No live contradictions found across agent reports.

---

### Blind Spots

**What no agent is measuring:**

1. **Skill content quality.** Ada counts 59 skills and confirms they exist. Ivy confirms none are dead. But no agent reads what the skills actually do. A skill that exists but gives wrong instructions is worse than no skill — it creates false confidence. No agent audits skill accuracy, internal consistency, or whether the instructions match how Claude Code actually works in 2026.

2. **BaseAgent.ts logic correctness beyond the HITL bug.** Ivy flagged DEBT-02 and DEBT-04 (type cast). But the execute loop, retry logic, confidence gate, and write scope enforcement are untested and unread by any agent. These are the behaviors every product inherits. The family has no agent whose job is to verify that agent logic is semantically correct — only Lena enforces quality, but she audits file health, not code logic.

3. **Products-in-production impact.** All four agents measure the template in isolation. No agent asks: "Does any product currently use this template, and if so, does the HITL bug or the untested hook scripts already affect it?" The template is not abstract — it is a live upstream dependency. Product impact is unmeasured.

4. **Hook performance under load.** Vera measures whether hooks run. No agent measures whether they run fast. Petra identifies that the full-tsc typecheck on every file edit will cause 15s delays on large products (Gap #1). This is a future-state concern, not a current measurement. Hook latency under realistic product conditions is a blind spot.

---

### Top 3 Actions

1. **Fix DEBT-02 (HITL logic bug) before any product launch.** Add an `isFinancial` flag to the `AgentTool` interface and update the `ON_FINANCIAL_WRITE` condition in BaseAgent.ts. This is a 30-minute fix with security implications for every product that inherits the base class. It is the only high-severity bug that is also quick to fix. Every day it stays broken, the distinction between "financial approval mode" and "always approve" is a lie the template tells products.

2. **Write tests for BaseAgent.ts and memory-integrity.js first, then remaining scripts.** Start with BaseAgent.ts (the most complex, highest-risk file, and the one containing the HITL bug) and memory-integrity.js (most logic in scripts/). The 0% coverage is not just a metric failure — it means the template's own tooling is unverified. Products that inherit untested tooling inherit the habit of not testing tooling. Close the gap before Session 16.

3. **Document the two undocumented hooks in CLAUDE.md and update hook count from 6 to 8.** Both inline prettier and session-tracker.js appear in settings.json and run on every file edit, but are invisible in documentation. This is a 5-minute fix with zero risk. The undocumented hooks currently deduct points from Ada (accuracy), Vera (hook health, context efficiency), and create maintenance blind spots for product engineers. Fix it first — it clears measurement noise across three agents simultaneously.
