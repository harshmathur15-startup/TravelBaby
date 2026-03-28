---
name: hooks
description: Reference documentation for Claude Code hook lifecycle events and configuration.
---

# Hooks Reference

Hooks are shell commands that fire automatically at lifecycle events.
Configure in `.claude/settings.json` under `"hooks"`.

## Lifecycle Hooks

| Hook | When it fires | Use for |
|---|---|---|
| `PreToolUse` | Before any tool runs | Block dangerous commands (exit code 2 to block) |
| `PostToolUse` | After a tool completes | Auto-format code after edits |
| `PostToolUseFailure` | After a tool fails | Log errors, send alerts |
| `SessionStart` | On session start | Inject context, load environment |
| `SessionEnd` | On session end | Cleanup, save state |
| `InstructionsLoaded` | After /compact | Re-inject context lost during compaction |
| `PreCompact` | Before summarization | Save important state before context reduction |
| `SubagentStart` | When subagent starts | Configure subagent environment |
| `SubagentStop` | When subagent stops | Collect subagent results |
| `Stop` | When Claude stops | Trigger next steps in workflow |
| `TaskCompleted` | When task finishes | Notify team, trigger CI/CD |
| `WorktreeCreate` | When worktree created | Custom VCS integration |
| `WorktreeRemove` | When worktree removed | Cleanup isolated branches |

## Hook Types

| Type | Description |
|---|---|
| `command` | Run a shell script |
| `prompt` | Single-turn LLM evaluation |
| `agent` | Multi-turn agent with tool access |
| `http` | POST to external service |

## Blocking Example

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{ "type": "command", "command": "check-safe.sh" }]
    }]
  }
}
```

Exit code `2` = blocked. Exit code `0` = allowed.
