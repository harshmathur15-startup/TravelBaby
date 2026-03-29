---
name: techstack
description: Detect and report the tech stack of the current project or a given path.
---

# Tech Stack Detection

Run `python scripts/techstack.py [path]` to detect languages, frameworks, and key dependencies.

## Usage

- `/techstack` — scan the current project
- `/techstack d:/AI/Zimyo` — scan a specific path

## Workflow

1. Run `python scripts/techstack.py <path>` (default: current directory)
2. Present the output to Sir as a clean table:
   - **Languages** — sorted by file count descending
   - **Frameworks & Libraries** — with versions from dependency files
3. If Sir asks to compare multiple projects, run the script for each path and present a side-by-side comparison table
