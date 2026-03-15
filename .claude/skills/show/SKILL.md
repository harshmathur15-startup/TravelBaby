---
name: show
description: Display all project notes, skills, and conventions in formatted tables
---

# Show Data Skill

If an argument is provided, show only that section. If no argument, show all sections.

## Supported Arguments
- `notes` → show only notes from `./knowledge.md`
- `skills` → show only skills from `./.claude/skills/`
- `conventions` → show only conventions from `./CLAUDE.md`
- `stack` → show only tech stack from `./CLAUDE.md`
- `plan` → show only the current architecture plan
- `<anything>` → read `./<anything>.md` and display its contents
- *(no argument)* → show all sections

## 1. Notes
Read `./knowledge.md` and display in a table.

## 2. Skills
List all skill directories under `.claude/skills/` and display skill name + description in a table.
Read each `SKILL.md` to extract the `description` from the frontmatter.

## 3. Project Conventions
Display key conventions from `./CLAUDE.md` in a table.

## 4. Tech Stack
Display the tech stack from `./CLAUDE.md` in a table.

## 5. Plan
Read the plan file path from `./CLAUDE.md` or `C:\Users\kumar\.claude\projects\<project>\memory\MEMORY.md` — look for a line referencing the plan file path. If no plan file is defined yet, display "No architecture plan created yet."

## Instructions
- Use relative paths: `./knowledge.md`, `./CLAUDE.md`, `./.claude/skills/`
- Use the Read tool to read files
- Use Glob to list skill directories
- Present all data as clean markdown tables
- Respect the argument — only show the requested section
- For any unrecognized argument `<x>`, read `./<x>.md` and display its contents. If the file doesn't exist, say so.
