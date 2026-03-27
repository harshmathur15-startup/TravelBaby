---
name: api-doc
description: Read Express routes and generate an OpenAPI 3.0 spec. Keeps API docs in sync with code.
---

# API Doc Skill

Scan Express route files and generate an OpenAPI 3.0 YAML spec automatically.

## Usage
`/api-doc` — generate full OpenAPI spec from all routes
`/api-doc <resource>` — generate spec for a single resource (e.g. `/api-doc orders`)

## Workflow

1. Glob `server/src/routes/**/*.ts` to find all route files
2. For each route file, read and extract:
   - HTTP method + path
   - Zod schema (request body, query params)
   - Response shape from controller/service return types
   - Auth middleware (determines `security` field)
3. Generate OpenAPI 3.0 YAML
4. Save to `./docs/openapi.yaml`

## Output Format

```yaml
openapi: 3.0.3
info:
  title: <Project Name> API
  version: 1.0.0
  description: Auto-generated from source. Do not edit manually.

servers:
  - url: /api/v1

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

paths:
  /resource:
    get:
      summary: List resources
      security:
        - bearerAuth: []
      parameters: []
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Resource'
        '401':
          description: Unauthorized
```

## Instructions
- Infer response schemas from TypeScript return types or Zod schemas where visible
- Mark endpoints with auth middleware as `security: [bearerAuth: []]`
- If a route has no Zod validation, note it as `# TODO: add input validation`
- Do not invent fields — only document what exists in the code
- If routes don't exist yet (greenfield), say so and offer to generate a skeleton spec from CLAUDE.md features instead
