---
name: recall
description: Search all past conversations — find what was said, decided, or built across any session.
---

# Recall Skill — Searchable Conversation History

Search across all past session transcripts to find what was discussed, decided, or built.

## Commands

### `/recall <query>`
Search all past conversations for a keyword or phrase.

1. Search `~/.claude/projects/<project-slug>/*.jsonl` files for the query
2. Display results table showing session ID, role, and context snippet
3. If results reference a decision or action, note which session it came from

### `/recall <query> --project <slug>`
Search a different project's conversation history.

Example: `/recall "API routes" --project d--AI-Reach`

### `/recall <query> --limit <n>`
Increase result limit (default 10).

## When to Use

- "Did we discuss X?" — search for it
- "When was Y decided?" — find the session and context
- "What was decided about Z?" — locate the decision
- Before making claims about past conversations — verify first

## Data Source

Transcripts live at `~/.claude/projects/<slug>/*.jsonl`. Each session is one file. Messages include full conversation content.

## Limitations

- Text search only — no semantic/embedding search
- Large transcripts may be slow on first scan
- Only searches message content, not tool inputs/outputs
