# Recycle Bin Skill

List, restore, or purge recycled files and soft-deleted database records.

## Usage

- `/recycle list` — show all recycled items
- `/recycle list --db` — show soft-deleted database records
- `/recycle restore <path>` — restore a file to its original location
- `/recycle purge --older-than 30d` — permanently delete old items (HITL gate)

## Workflow

### /recycle list

1. Read `.recycle/manifest.jsonl` — parse each line, show table
2. Scan `~/.claude/projects/*/memory/.recycled/` for memory files
3. Display:

| Original Path | Recycled At | Age |
|--------------|-------------|-----|

### /recycle list --db

1. For each soft-delete model (Organization, User, Membership):
   - Query `WHERE deletedAt IS NOT NULL`
2. Display:

| Model | ID | Deleted At | Age |
|-------|----|-----------|-----|

### /recycle restore <path>

1. Search manifest for the most recent entry matching `<path>`
2. Copy from recycle location back to original path
3. If original path already exists, ask before overwriting
4. Append restore event to manifest

### /recycle purge --older-than <duration>

**HITL gate required — this is the ONLY legitimate hard-delete path.**

1. Parse duration (e.g., `30d`, `90d`)
2. List all items older than the threshold
3. Show the list and ask for explicit confirmation: "Type YES to permanently delete N items"
4. On confirmation:
   - Delete files from `.recycle/` and `.recycled/`
   - For DB: `DELETE FROM ... WHERE deletedAt < threshold` (actual hard delete)
   - Append purge event to manifest
5. On refusal: abort, no action

## Rules

- Minimum retention: 30 days — `/recycle purge --older-than 7d` is rejected
- Purge always requires explicit confirmation — no `--force` flag
- Restore preserves the recycled copy (belt and suspenders)
- The manifest is append-only — never edit or truncate it

## Instructions

- Always show a summary table, not raw JSONL
- For restore, default to the most recent version if multiple exist
- If `.recycle/manifest.jsonl` doesn't exist, report "Recycle bin is empty"
