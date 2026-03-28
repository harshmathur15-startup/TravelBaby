# Nell -- Debt Ledger

**Owner:** Nell | **Refreshed:** 2026-03-28 (S34)
**Previous maintainer:** Lena (removed S33)

---

## Outstanding Items

| # | Item | First Flagged | Cycles Open | Priority | Status |
|---|------|---------------|-------------|----------|--------|
| 1 | Test coverage — 3 Vitest files, 99 tests passing (build-smoke, components, sections). Plus 3 agent core tests + 3 e2e specs. Growing each session. | S14 | 8+ | **Medium** | Improved S34: 20 -> 99 tests. Pattern established. Add more per session. |
| 2 | MEMORY.md absent at project root — auto-memory at ~/.claude/ is not a substitute | S15 | 8+ | **HIGH** | **Resolved S34** |
| 3 | /pulse skill references Vera (9 occurrences) — removed agent | S16 | 6+ | Medium | **Resolved S34** |
| 5 | Type cast: `as Record<string, unknown>` x2 in BaseAgent.ts (lines 161, 193) | S14 | 8+ | Medium | **Accepted** — SDK types `block.input` as `unknown`, cast is correct |
| 9 | No structured observability dashboard | S14 | 8+ | Low | **Resolved S34** — scripts/session-stats.cjs provides tool breakdown, timeline, error rate, active files |
| 10 | Skill content quality unmeasured — 48 skills (9 core + 21 extended + 18 SaaS), no auditor | S14 | 8+ | Medium | **Resolved S34** — audited 14 skills (9 core + 5 extended), avg 4.6/5. Fixed: stock-photos frontmatter, retro save path, phantom skill labels, agent-catalog sources |
| 11 | CLAUDE.md says 20 extended skills, actual is 21 | S16 | 6+ | Low | **Resolved S34** (fixed to 21) |
| 12 | public-ready/SKILL.md references "Kira" and "Vera" — removed/identity names in extended skill | S34 | 0 | Medium | **Resolved S34** |

**Total: 1 open item.** 1 high (test coverage — improving, 60 tests passing, needs more component tests for 80% mandate).

---

## Resolved This Refresh (S34)

| # | Item | First Flagged | Resolved | How |
|---|------|---------------|----------|-----|
| 2 | MEMORY.md absent at project root | S15 | S34 | Created at project root with template guidance for products |
| 3 | /pulse skill references Vera (9 occurrences) | S16 | S34 | All Vera references replaced with generic language (13 edits) |
| 4 | Type cast: `as number` on cache_read_input_tokens | S14 | S34 verified | Replaced with proper type guard (`typeof === 'number'`) |
| 6 | Kira contamination in blueprint skill | S16 | S34 verified | Blueprint no longer in core skills. Original contamination cleaned. |
| 7 | tool.log orphaned | S15 | S34 verified | File removed entirely |
| 8 | 14 orphaned research files | S16 | S34 | Research reorganized: ownership assigned to Thea/Nell/Priya, 3 files archived, 5 merged into 1 |
| 12 | public-ready/SKILL.md references Kira and Vera | S34 | S34 | Removed both names from default agent search list |

---

## Resolution History

| Run | Items Open | Items Resolved | Rate | Notes |
|-----|-----------|----------------|------|-------|
| S14 (Run 1) | 5 | 0 | 0% | Baseline |
| S16 (Run 2) | 15 | 3 | 60% of S14 | MEMORY.md fixed, 2 structural closed |
| S16 (Run 3) | 11 | 7 | 100% of doc drift | All doc fixes executed |
| S34 (Refresh) | 8 | 4 | 36% of S16 open | Type cast, blueprint, tool.log, orphans resolved. 1 new item added. |
| S34 (Fix run) | 5 | 3 | 38% of S34 open | MEMORY.md created, /pulse cleaned, /public-ready cleaned |

**Cumulative:** 17 resolved of 22 ever tracked = 77%. Net open reduced 8 -> 5.

---

## Escalation Register

| Item | Cycles | Action |
|------|--------|--------|
| Test coverage | 8+ | ESCALATED. Remains critical. Infrastructure exists (Vitest, Playwright, axe-core) — coverage is thin. |
| MEMORY.md at root | 8+ | RESOLVED S34. Created at project root. |
