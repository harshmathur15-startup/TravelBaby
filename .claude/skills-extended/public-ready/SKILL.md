---
name: public-ready
description: Audit any repo for public/open-source readiness — secrets, PII, identity leaks, session artifacts, git history, dependencies.
---

# Public Ready Skill

Audit a repository before making it public or open-source. Catches secrets, PII, identity references, session artifacts, and dependency vulnerabilities.

## Usage

`/public-ready` — audit current repo, output to conversation
`/public-ready --save` — audit and write report to `public-ready-report.md`
`/public-ready --fix-gitignore` — audit and append missing patterns to `.gitignore`

## Severity Levels

| Level | Meaning | Verdict Effect |
|---|---|---|
| CRITICAL | Blocks release — secrets, credentials, PII | NO-GO |
| WARNING | Should fix — identity leaks, session artifacts, .gitignore gaps | CONDITIONAL |
| INFO | Nice to have — dependency advisories, stale config | Does not block |

One CRITICAL = NO-GO. Only WARNINGs = CONDITIONAL. Only INFO or clean = GO.

## Checks

Run checks 1-5 and 7-8 in parallel. Check 6 can also run in parallel.

### 1. Secrets Scan [CRITICAL]

Grep source files for secret patterns. Exclude `node_modules/`, `dist/`, `.git/`, lock files.

| Pattern | Catches |
|---|---|
| `(api[_-]?key\|secret[_-]?key\|access[_-]?token\|auth[_-]?token)\s*[:=]\s*['"][^'"]{8,}` | Hardcoded API keys and tokens |
| `(password\|passwd\|pwd)\s*[:=]\s*['"][^'"]+['"]` | Hardcoded passwords |
| `(mongodb(\+srv)?:\/\/\|postgres(ql)?:\/\/\|mysql:\/\/\|redis:\/\/)` | Connection strings |
| `(sk-[a-zA-Z0-9]{20,}\|ghp_[a-zA-Z0-9]{36}\|gho_[a-zA-Z0-9]{36}\|glpat-[a-zA-Z0-9-]{20,})` | Known token formats (OpenAI, GitHub, GitLab) |
| `AKIA[0-9A-Z]{16}` | AWS access key IDs |
| `-----BEGIN (RSA\|DSA\|EC\|OPENSSH) PRIVATE KEY-----` | Private keys |
| `Bearer\s+[a-zA-Z0-9._\-]{20,}` | Bearer tokens |

Exclude `.env.example`, test fixtures with obvious dummy values (`test-key`, `fake-token`, `xxx`), lock files.
Never print actual secret values — truncate to first 4 chars + `***`.

### 2. PII Scan [CRITICAL]

| Pattern | Catches |
|---|---|
| `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}` | Email addresses (exclude `noreply@`, `example.com`, `test.com`) |
| `C:\\Users\\[^\\]+`, `/home/[^/]+`, `/Users/[^/]+` | Hardcoded user paths |
| `\b\d{3}[-.]?\d{3}[-.]?\d{4}\b` | Phone numbers |

Also: read `CLAUDE.md` or `MEMORY.md` if they exist — extract personal names, company names, internal references. Use those as additional search terms. If neither exists, note "No project memory found — manual PII review recommended."

Redact PII in output — initials or `[REDACTED]`.

### 3. Identity Leak Scan [WARNING]

Check for AI partnership artifacts that should stay private.

**Agent names to search:** Read `agents/family/registry.md` if it exists — extract registered names. Also search defaults: Thea, Nell, Priya, Sage.

| Pattern | Catches |
|---|---|
| `\b<AgentName>\b` (case-sensitive, each name) | Agent references in source |
| `journal\.md\|evolution\.md\|board\.md\|board-archive\.md` | Partnership artifact references |
| `\bSir\b` in comments/strings (not variable names) | Relationship term leaks |
| `personality\|archetype\|partnership` in `.md` files (not skill definitions) | Identity language |
| `feedback_.*\.md` | Feedback memory file references |

Exclude: agent family directory itself, CLAUDE.md, skill definitions (these legitimately reference agents).

### 4. Session Artifacts [WARNING]

Glob for files that should never ship publicly:

| Pattern | What |
|---|---|
| `.claude/sessions/**` | Session data |
| `.claude/tool.log` | Tool execution log |
| `thoughts/handoffs/**` | Session handoffs |
| `thoughts/breadcrumbs/**` | Session breadcrumbs |
| `**/session-state.json` | Session state snapshots |
| `research/sage-graph.json` | Knowledge graph |
| `**/nora-ledger.md` | Quality ledger |
| `agents/family/board.md` | Agent board |
| `agents/family/board-archive.md` | Archived agent notes |
| `agents/family/**/profile.md` | Agent profiles |
| `**/MEMORY.md` | Memory files |

Check if each exists in the working tree. If found, report path.

### 5. .env Exposure [CRITICAL]

| Check | How |
|---|---|
| `.env` tracked | `git ls-files .env` |
| `.env.local` tracked | `git ls-files .env.local` |
| `.env.*.local` tracked | `git ls-files '*.env.*.local'` |
| `.env.example` has real values | Read it, flag values that aren't placeholders (`your-xxx-here`, `changeme`, empty, `<description>`) |

### 6. Git History Scan [CRITICAL/WARNING]

Search last 50 commits for sensitive content.

```bash
# Check for previously committed sensitive files
git log --all -50 --diff-filter=A --name-only --pretty=format:""

# Search commit messages for leaks
git log --all -50 --pretty=format:"%h %s"

# Search diffs for secrets (limit to 4 terms for performance)
git log --all -50 -p -S "password" --diff-filter=D -- "*.ts" "*.js" "*.json" "*.md"
# Repeat for: "secret", "api_key", "token"
```

Grep output for API keys, tokens, passwords, personal names, company names, user paths.

If secrets found in history: note that `git filter-branch` or BFG Repo-Cleaner is required — they can't be removed by deleting the file.

### 7. .gitignore Coverage [WARNING]

Read `.gitignore` and verify these patterns are present:

| Required Pattern | Why |
|---|---|
| `.env` | Secrets |
| `.env.local` | Local secrets |
| `node_modules/` | Dependencies (if package.json exists) |
| `.claude/sessions/` | Session data |
| `.claude/tool.log` | Tool log |
| `thoughts/handoffs/` | Handoff files |
| `agents/family/board.md` | Agent board |
| `agents/family/board-archive.md` | Agent board archive |
| `**/MEMORY.md` | Memory files |
| `coverage/` | Test coverage |
| `dist/` or `build/` | Build output |
| `.DS_Store` | OS files |

If `--fix-gitignore` was passed, append missing patterns under `# Added by /public-ready`.

### 8. Dependency Audit [INFO]

Only if `package.json` exists:

```bash
npm audit --json 2>/dev/null
```

Report vulnerabilities by severity. If npm unavailable, note "run manually."
For non-npm projects (check `requirements.txt`, `Cargo.toml`, `go.mod`), note the package manager and recommend manual audit.

## Output Format

```
## Public-Ready Audit Report

**Repository:** <name from git remote or directory>
**Branch:** <current branch>
**Date:** <current date>
**Commit:** <short hash>

### Summary

| Check | Status | Findings |
|---|---|---|
| Secrets | PASS/FAIL | X |
| PII | PASS/FAIL | X |
| Identity Leaks | PASS/WARN | X |
| Session Artifacts | PASS/WARN | X |
| .env Exposure | PASS/FAIL | X |
| Git History | PASS/FAIL | X |
| .gitignore | PASS/WARN | X missing |
| Dependencies | PASS/INFO | X vulns |

### CRITICAL Findings
<numbered list with file:line, or "None">

### WARNING Findings
<numbered list, or "None">

### INFO Findings
<numbered list, or "None">

### Suggested .gitignore Additions
<patterns, or "No additions needed">

### Verdict: GO / CONDITIONAL / NO-GO
<one-sentence rationale>

**To fix CRITICAL issues:**
<numbered remediation steps with specific commands>
```

## Edge Cases

- **No git:** Skip check 6, note "Not a git repo — history scan skipped"
- **No npm:** Skip check 8 gracefully
- **Large repos:** Limit Grep to first 20 matches per pattern, note "truncated — X total"
- **False positives:** Still report, append "(likely false positive)"
- **Monorepo:** Run `npm audit` in each directory with a `package.json`

## Instructions

- Run checks in parallel where possible
- Never print actual secrets — truncate to 4 chars + `***`
- Never print full PII — redact
- Limit to 20 findings per category — summarize rest as "+N more"
- The verdict line is the most important output — make it unambiguous
- If `--save`, write report to `public-ready-report.md` in repo root
- For full historical audit, recommend `trufflehog` or `gitleaks` in the report footer
