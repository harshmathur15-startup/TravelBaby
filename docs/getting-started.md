# Getting Started

From clone to building in 10 minutes.

> **Note:** The template includes SaaS boilerplate code (auth, multi-tenancy, RBAC, React client, Prisma schema, BullMQ). This code is being battle-tested in products and extracted back. Run `npm install && npm run dev` to verify the stack works after cloning — if it doesn't, the infrastructure gaps are being actively closed (see `research/roadmap.md`).

## 1. Clone and Configure

```bash
# Clone the template into your new project
git clone <template-repo-url> my-project
cd my-project

# Remove template's git history and start fresh
rm -rf .git
git init

# Install dependencies and start infrastructure
cp .env.example .env          # edit with your actual values
npm install
docker compose up -d           # starts PostgreSQL + Redis
npx prisma migrate dev
npx prisma db seed
```

Verify everything works:

```bash
npm run dev                    # frontend + backend start
```

## 2. Fill In CLAUDE.md

Open `CLAUDE.md`. Everything above the `<!-- PRODUCT -->` marker is template documentation — leave it.

Below the marker, replace the placeholders:
- `[Your Project Name]` — your product name
- `[What this product does]` — one paragraph
- `[Your feature list]` — core features
- `[Your product's agent family]` — agents you'll build

The tech stack, project structure, and conventions are already filled in.

## 3. Know Your 13 Core Skills

These work out of the box:

| Start a session | `/kickoff` |
|---|---|
| **End a session** | `/wrap` |
| **Plan before building** | `/planning` |
| **Commit changes** | `/commit` |
| **Create a PR** | `/pr` |
| **Run tests** | `/test` |
| **Review code** | `/review` |
| **Debug a problem** | `/debug` |
| **Deploy** | `/deploy` |
| **Save context** | `/save-context` |
| **Search past sessions** | `/recall` |
| **Status report** | `/report` |
| **Daily standup** | `/standup` |

See [skill-tiers.md](skill-tiers.md) for the full list of 59 skills.

## 4. Understand What Runs Automatically

8 hooks fire without you doing anything:

- **Session start:** loads your last handoff and git state
- **Before bash:** blocks destructive commands (rm -rf, git push --force)
- **Before file edits:** warns on protected files (CLAUDE.md, .env, rules)
- **Before compaction:** saves a handoff so context survives
- **After file edits:** runs prettier + quality gate (typecheck, console.log detection)
- **After any tool:** logs to session tracker
- **Session end:** saves memory and cost estimate

## 5. Understand the Rules

8 rule files in `.claude/rules/`. The AI reads these automatically. Key constraints:

- **300-line file cap** — split if longer
- **80% test coverage mandate** — for your product code
- **No `any` or `ts-ignore`** — TypeScript strict mode
- **One responsibility per function** — 40-line function cap
- **Validate at boundaries** — Zod for API inputs, trust internal code
- **Never hardcode secrets** — always use `process.env`

Full rules: `.claude/rules/general.md`, `security.md`, `backend.md`, `frontend.md`, `database.md`, `performance.md`, `testing.md`, `agents.md`

## 6. Build Your Agent Family (Optional)

The template uses a 4-agent family for self-maintenance. Your product can use the same pattern for different purposes.

The pattern:
```
agents/family/
  registry.md     — who they are, execution order
  board.md        — shared notes between agents (50-line cap)
  board-archive.md — resolved notes
  <agent>/profile.md — expertise, learnings, failure modes
```

Steps:
1. Read `agents/family/registry.md` for the format
2. Define 3-5 agents for YOUR product's needs (not the template's)
3. Give each agent a skill trigger (e.g., `/audit` runs your auditor)
4. Define execution order based on dependencies

Don't copy the template's agents (Petra, Ivy, Ada, Lena) — they audit the template, not your product. Build agents for what YOUR product needs.

## 7. Clean Up Template Artifacts

Before your first commit:

```bash
# Remove template's self-audit data
rm -rf research/

# Remove template session artifacts
rm -rf thoughts/

# Remove example agent (after you've read it)
rm -rf agents/examples/

# Optionally remove template's agent family (if building your own)
rm -rf agents/family/petra agents/family/ivy agents/family/ada
rm -rf agents/family/lena
```

Keep `agents/family/registry.md` as a format reference.

## 8. Start Building

```bash
npm run dev                    # start the app
```

```
/kickoff     # loads context
/planning    # plan before coding
# ... build ...
/commit      # when ready
/wrap        # end of session
```

## Need Less? See Slim Mode

If 59 skills feels heavy, see [slim-mode.md](slim-mode.md) for a minimal setup: just hooks, rules, and 13 core skills.
