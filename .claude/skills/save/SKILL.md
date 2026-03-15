---
name: save
description: Save a table from the conversation to a file. Use when the user wants to export or download a table.
---

# Save Table Skill

Save a markdown table or data from the conversation to a file the user can open.

## Workflow

1. Ask the user which table they want to save (if not already clear from context)
2. Always save as CSV unless the user explicitly specifies a different format — never ask
3. Ask for file name/location if not specified — default to `./research/<descriptive-name>.<ext>`
4. Write the file using the correct format

## Supported Formats

| Format | Best For | Extension |
|---|---|---|
| CSV | Excel, Google Sheets | `.csv` |
| Markdown | VS Code, Notion, GitHub | `.md` |
| JSON | Developers, APIs | `.json` |

## Format Rules

### CSV
- First row = headers
- Wrap values containing commas or quotes in double quotes
- Escape internal double quotes as `""`

### Markdown
- Use standard pipe table syntax
- Include header separator row (`|---|---|`)

### JSON
- Array of objects
- Keys = column headers (camelCase)

## Instructions
- If the table has many columns, prefer CSV over JSON
- Always confirm the file path with the user before saving
- After saving, show the full file path as a clickable link
- If the file already exists, ask before overwriting
