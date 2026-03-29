---
name: diagram
description: Generate Mermaid architecture diagrams from the codebase — system overview, data flow, or ERD.
---

# Diagram Skill

Scan the codebase and produce a Mermaid diagram. Makes invisible structure visible.

## Usage
`/diagram` — system overview (default)
`/diagram erd` — entity-relationship diagram from Prisma schema
`/diagram flow <feature>` — data flow for a specific feature
`/diagram agents` — agent interaction diagram

## Workflow

### Default (system overview)
1. Glob `server/src/**/*.ts` to identify routes, services, controllers
2. Glob `agents/**/*.ts` to identify agents
3. Glob `client/src/**/*.tsx` to identify major pages/components
4. Produce a `graph TD` Mermaid diagram showing: Client → API → Services → DB/Redis/Agents

### ERD (`/diagram erd`)
1. Read `prisma/schema.prisma`
2. Extract models, fields, and relations
3. Produce an `erDiagram` Mermaid diagram

### Flow (`/diagram flow <feature>`)
1. Find files related to the feature using Grep
2. Trace the request path from route → controller → service → DB
3. Produce a `sequenceDiagram` showing the full flow

### Agents (`/diagram agents`)
1. Glob `agents/**/*.ts`
2. Identify agent classes, triggers, and tools used
3. Produce a `graph LR` showing agent relationships and triggers

## Output Format
- Print the Mermaid diagram in a ```mermaid code block
- Save to `./docs/diagrams/<type>-diagram.md`
- After the diagram, add a 3-bullet plain-English summary of what it shows

## Instructions
- Keep diagrams readable — max 20 nodes for overview diagrams
- Group related nodes (e.g. all services in a subgraph)
- Use short labels — no full file paths as node names
- If a relevant file doesn't exist yet (greenfield), say so and diagram the intended architecture from CLAUDE.md instead
