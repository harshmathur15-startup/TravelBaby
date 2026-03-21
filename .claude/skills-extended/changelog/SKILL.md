---
name: changelog
description: Generate a formatted CHANGELOG.md from git history.
---

# Changelog Skill

Auto-generate or update CHANGELOG.md from git log. No manual writing.

## Usage
`/changelog` — generate for unreleased commits since last tag
`/changelog v1.2.0` — generate for a specific version tag
`/changelog --full` — regenerate the entire CHANGELOG from all tags

## Workflow

1. Run `git tag --sort=-version:refname | head -5` to see recent tags
2. Run `git log <last-tag>..HEAD --oneline --no-merges` to get unreleased commits
3. Parse commit messages by type (feat, fix, chore, refactor, docs, test)
4. Group into sections and write CHANGELOG entry

## Output Format (Keep-a-Changelog standard)

```markdown
## [Unreleased] — YYYY-MM-DD

### Added
- <feat commits — user-facing description>

### Fixed
- <fix commits — what was broken and now works>

### Changed
- <refactor/chore commits worth noting>

### Security
- <security-related fixes>
```

## Rules
- Write for the **user**, not the developer — "Invoices now include tax breakdown" not "refactor: split invoice renderer"
- Skip noise: test commits, typo fixes, chore: deps unless security-relevant
- Each entry max one line
- If commit message is unclear, use the diff to infer what changed
- Prepend to existing CHANGELOG.md — never overwrite history
- Save to `./CHANGELOG.md`

## Instructions
- If no tags exist, treat the first commit as v0.0.1
- Group squashed commits by feature, not by individual commit
- Flag any breaking changes with a `⚠️ Breaking:` prefix
