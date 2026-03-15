---
name: scaffold
description: Generate boilerplate for a new feature — route, controller, service, and test files in one go.
disable-model-invocation: true
---

# Scaffold Skill

Generate all standard files for a new feature based on the project's conventions.

## What Gets Generated
| File | Location | Purpose |
|---|---|---|
| Router | `server/src/routes/<name>.routes.ts` | Express route definitions |
| Controller | `server/src/controllers/<name>.controller.ts` | Request handling, response shaping |
| Service | `server/src/services/<name>.service.ts` | Business logic |
| Types | `shared/src/types/<name>.types.ts` | Shared TypeScript interfaces |
| Tests | `server/src/services/<name>.service.test.ts` | Unit tests for the service |

## Conventions to Follow
- Controller calls service — never DB directly
- Service returns typed data — controller maps to API response shape `{ success, data, error, meta }`
- All inputs validated with Zod at the controller level
- Service methods are async and throw typed errors
- Test file includes: happy path, validation failure, not found case

## Instructions
1. Ask for the feature name if not provided (e.g. `billing`, `customer`, `order`)
2. Ask for the main operations needed (e.g. list, get, create, update, delete)
3. Generate all files with proper TypeScript types and imports
4. Add the router to `server/src/app.ts`
5. List all created files at the end
