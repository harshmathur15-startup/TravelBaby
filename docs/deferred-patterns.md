# Deferred Patterns — Build When Needed

Designs for 13 infrastructure patterns borrowed from competitor studies. Each is ready to implement when the triggering condition is met. Consolidated from Kira's borrowing plan (S13 deep review).

---

## #4 Memory Curator
**Trigger:** Memory exceeds 200 files across products
**Source:** Adam + cipher
**What it does:** Automated memory consolidation, staleness detection, semantic dedup. Runs periodically (e.g., every 5th session) to: merge redundant memories, flag stale entries, propose deletions.
**Implementation:** Script or skill that reads all memory files, compares semantically (LLM-powered), and outputs a curation report. Human approves changes — never auto-delete.
**Key constraint:** Must respect "memory files are permanent" rule. Curator proposes, Sir disposes.

---

## #21 Workflow Continuation
**Trigger:** Investigate Claude Code Stop hook capabilities
**Source:** barkain Stop hook
**What it does:** Detects premature session stops when a multi-step plan is incomplete. Injects "continue" or warns.
**Implementation:** Stop hook reads `thoughts/tracks.json` or active plan. If tasks remain incomplete, writes a warning. Note: Claude Code Stop hooks may not support blocking — investigation needed.
**Open question:** Can a Stop hook actually prevent stopping, or only inject a message?

---

## #29 Semantic Memory Search
**Trigger:** Memory exceeds 200 files across products
**Source:** cipher (9 vector backends)
**What it does:** Vector-embedded memory with semantic retrieval. "Find memories related to X" instead of "grep for keyword."
**Implementation options:**
- Lightweight: SQLite with FTS5 (full-text search, no vectors needed)
- Medium: FAISS in-memory with sentence embeddings
- Heavy: Qdrant/ChromaDB (overkill at current scale)
**Recommended start:** SQLite + FTS5. Add vector layer only if FTS5 proves insufficient.

---

## #33 Progressive Context Disclosure
**Trigger:** MEMORY.md exceeds 200-line cap or token budget becomes a concern
**Source:** claude-mem ~10x savings
**What it does:** Inject lightweight index at session start (titles, dates, types). Fetch full content on demand. Reduces token waste.
**Implementation:** Two-file approach: `MEMORY-INDEX.md` (lightweight, always loaded) + individual memory files (loaded when relevant). Index contains one-line descriptions with file paths.
**Note:** Current MEMORY.md 200-line cap already acts as a form of progressive disclosure.

---

## #34 Memory Dedup with LLM
**Trigger:** Memory exceeds 200 files
**Source:** cipher
**What it does:** Before saving a new memory, LLM compares it against existing memories. Decides: ADD (new), UPDATE (merge into existing), DELETE (redundant), NONE (skip).
**Implementation:** Script that takes a proposed memory, reads all existing memories, asks LLM to classify. Human approves the decision.
**Key constraint:** Never auto-delete. Propose changes, human approves.

---

## #39 Knowledge Graph for Memory
**Trigger:** Memory relationships become more important than content (e.g., "which feedback led to which rule change?")
**Source:** cipher
**What it does:** Lightweight relationship layer. Each memory can declare `related_to: [file1.md, file2.md]` and `caused_by: [correction-event]`.
**Implementation:** Add `relationships` field to memory frontmatter. Build a script that renders the graph as markdown or DOT format.
**Minimum viable:** Just the frontmatter field. No graph DB needed.

---

## #40 Branch-Session Mapping
**Trigger:** Multi-branch product development with parallel work
**Source:** claude-mem
**What it does:** Tracks which git branch each session occurred on. Useful for "what was I working on when I made this decision?"
**Implementation:** Enhance activity logger to record `git branch --show-current` at session start. Store in tool.log or a separate session-metadata file.

---

## #49 Three-Layer Agent Identity
**Trigger:** Template agents do quantifiable product work with measurable output
**Source:** gastown
**What it does:** Separates agent identity into 3 layers:
- **Permanent:** Profile, name, expertise, failure modes (survives everything)
- **Work history:** Completed tasks, performance metrics, CV chain (survives session death)
- **Session context:** Current task, working state (ephemeral)
**Implementation:** Extend agent profiles with a `## Work History` section that accumulates task records. Session context lives in board.md (already exists).

---

## #51 4-Tier Merge Conflict Resolution
**Trigger:** Parallel agents on the same codebase produce merge conflicts
**Source:** overstory
**Protocol:**
1. **Clean merge** — no conflicts, auto-merge
2. **Auto-resolve** — trivial conflicts (whitespace, import order), keep incoming
3. **AI-assisted** — semantic conflicts, use LLM to understand intent and merge
4. **Full reimplementation** — irreconcilable conflicts, rewrite the section from specs
**Implementation:** Script that checks merge result, classifies conflicts by tier, and routes accordingly.

---

## #53 Watcher-Watching-Watcher
**Trigger:** Agent count exceeds 10 concurrent
**Source:** gastown (Boot watches Deacon watches Witness watches Polecats)
**What it does:** Multi-tier health monitoring:
- Tier 0: Mechanical daemon (check process alive, 30s interval)
- Tier 1: AI triage (classify stuck vs slow vs blocked)
- Tier 2: Patrol agent (check output quality, not just liveness)
**Implementation:** For Template, start with Tier 0 only — a simple heartbeat check that kills agents exceeding their timeout. Add tiers when agent count justifies complexity.

---

## #67 OTel Trace Propagation
**Trigger:** Observability infrastructure exists (e.g., Grafana, Datadog, Jaeger)
**Source:** hub-team
**What it does:** Pass TRACEPARENT header when spawning agents. All agent work appears as child spans of the parent operation. Enables: "show me everything that happened during this feature build."
**Implementation:** Requires an OTel collector endpoint. Each agent spawn includes a trace context. Results tagged with trace ID.
**Note:** Premature without observability infrastructure. Design only.

---

## #69 Workflow Metrics as Structured Data
**Trigger:** Trending and comparison across sessions becomes important
**Source:** SuperClaude
**What it does:** Convert Vera's signals and Mira's dimensions from markdown reports to JSONL/CSV with timestamps. Enables: "plot memory retention over 20 sessions."
**Implementation:** Vera and Mira already write to CSV history files (vera-history.csv, mira-history.csv). Extend with more dimensions and timestamps. No new infrastructure needed — just richer CSV output.
**Note:** Partially done — Vera has history CSV. Mira needs one.

---

## #70 Sprint Status YAML
**Trigger:** Automation needs to parse project state (CI/CD, dashboards, external tools)
**Source:** BMAD
**What it does:** Machine-readable project state file: `thoughts/sprint.yaml` with current phase, features in progress, blockers, next milestone.
**Implementation:**
```yaml
sprint:
  name: "MVP Phase 1"
  status: in_progress
  started: 2026-03-19
  features:
    - name: auth-system
      status: done
    - name: agent-pipeline
      status: in_progress
      progress: 40%
      blocked_by: []
  next_milestone: "Internal demo"
  blockers: []
```
**Note:** Only useful when external tools consume this file. Until then, markdown works.

---

*Last updated: 2026-03-19 (Session 13)*
*Source: Kira borrowing plan deep review — 19 competitor studies*
