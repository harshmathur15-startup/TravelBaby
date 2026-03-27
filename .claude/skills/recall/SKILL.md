---
name: recall
description: Search all past conversations — find what was said, decided, or built across any session.
---

# Recall Skill — Searchable Conversation History

Search across all past session transcripts to find what was discussed, decided, or built.

## Commands

### `/recall <query>`
Search all past conversations for a keyword or phrase.

```bash
node scripts/search-history.cjs --query "<query>"
```

### `/recall <query> --project <slug>`
Search a different project's conversation history.

```bash
node scripts/search-history.cjs --query "<query>" --project <slug>
```

Example: `/recall "API routes" --project d--AI-Reach`

### `/recall <query> --limit <n>`
Increase result limit (default 10).

```bash
node scripts/search-history.cjs --query "<query>" --limit <n>
```

## When to Use

- "Did we discuss X?" — search for it
- "When was Y decided?" — find the session and context
- "What was decided about Z?" — locate the decision
- Before making claims about past conversations — verify first

## Limitations

- Text search only — no semantic/embedding search
- Large transcripts may be slow on first scan
- Only searches message content, not tool inputs/outputs
