---
name: rewind
description: Undo the last file action Claude took — restores the previous state
user_invocable: true
---

# Rewind Skill

Undo the last file-modifying action Claude took in this session.

## Workflow

1. Read `.claude/tool.log` — find the most recent `Edit` or `Write` entry
2. Identify the file path from the log entry
3. Check if the file is tracked by git:
   - **If git repo exists:** run `git diff <file>` to show what changed, then `git checkout -- <file>` to restore
   - **If no git repo:** check if the file existed before (was it a Write creating a new file, or an Edit modifying existing?)
     - **New file (Write):** delete it
     - **Modified file (Edit):** cannot restore without git — warn the user

4. If the tool.log has no recent Edit/Write entries, say: "Nothing to rewind."

## Output Format

```
## Rewind

**Undid:** <action type> on <file_path>
**Restored to:** <previous state — git HEAD / deleted new file>
```

## Instructions
- Only rewind ONE action — the most recent file modification
- Always show what will be undone BEFORE doing it — get confirmation
- Never rewind non-file actions (Bash commands, searches)
- If the last action was a memory update, warn: "This will rewind a memory update. Confirm?"
- If no git and file was edited (not created), say: "Cannot rewind without git. No backup available."
