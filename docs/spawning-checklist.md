# Spawning a Product from Template-website

Step-by-step checklist for creating a new product. Follow in order — each step depends on the previous.

## Prerequisites
- Template-website is up to date (run `/kickoff` in Template first)
- Product name and domain decided

## 1. Clone and Initialize

```bash
git clone <template-repo> <product-name>
cd <product-name>
rm -rf .git && git init
```

## 2. Clean Template Artifacts

```bash
# Remove template-specific agents (they audit the template, not your product)
rm -rf agents/family/

# Remove template research outputs
rm -rf research/

# Remove template session artifacts
rm -rf thoughts/

# Remove example agents
rm -rf agents/examples/
```

## 3. Set Up Agent Families

### Governance (from scaffold)
```bash
cp -r agents/scaffolds/governance agents/family-governance
```

In `agents/family-governance/`:
1. Rename each role directory to your agent's name (warm, short, human, mostly female)
2. In each `profile.md`: replace `[RENAME]` with the agent name, fill in Personality
3. In `registry.md`: replace all `[RENAME]` and `[Product]` placeholders
4. Initialize `board.md` with your family name header

### Research (from scaffold)
```bash
cp -r agents/scaffolds/research agents/family-research
```
Same rename + fill process. Four roles: Problem, Market, BRD, PRD.

### Build (from scaffold)
```bash
cp -r agents/scaffolds/build agents/family-build
```
Define your own build agents mapped to your product roadmap phases.

### Remove scaffolds (optional — keep for reference)
```bash
rm -rf agents/scaffolds/
```

## 4. Wire Governance into Skills

### /kickoff
Open `.claude/skills/kickoff/SKILL.md`:
1. **Remove** the Priya / Upstream Extraction section (that's Template-only)
2. **Uncomment** the Product Governance Cascade section
3. **Replace** all `[Benchmark]`, `[Quick Debt]`, `[Drift]`, `[Accountability]` with your agent names
4. **Replace** `[Product]` with your product name

### /wrap
Open `.claude/skills/wrap/SKILL.md`:
1. **Uncomment** the Governance Trend section
2. **Replace** `[Accountability Agent]` with your accountability agent's name

### /debt, /watch, /blueprint
Any skill that spawns an agent by name — search for `[RENAME]` and replace with your agent name.

## 5. Fill CLAUDE.md

Open `CLAUDE.md`:
1. Replace the template header with your product name
2. Fill the product section below `<!-- PRODUCT -->`:
   - What This Is
   - Tech Stack
   - Project Structure
   - Commands
   - Product Context
   - Agent Families

## 6. Configure Environment

```bash
cp .env.example .env
# Fill in your credentials
```

## 7. Activate Skill Tiers

Skills ship in three tiers:
- **Core** (`.claude/skills/`): Always active — kickoff, wrap, test, etc.
- **Extended** (`.claude/skills-extended/`): Move to `.claude/skills/` to activate
- **SaaS** (`.claude/skills-saas/`): Activate when adding backend (Express, Prisma, auth)

Review `docs/skill-tiers.md` and move the skills you need.

## 8. Capture Baselines

```bash
node scripts/drift-check.cjs capture
```

This snapshots your customized files so drift detection doesn't flag intentional changes.

## 9. Verify

```bash
npm install
npm run dev
```

Then run `/kickoff` in a Claude Code session. Your governance cascade should run and report "No prior findings" for the first session.

## What Transfers vs What You Customize

| Layer | Inherited as-is | Customize |
|-------|----------------|-----------|
| Rules (.claude/rules/) | All 8 files | Add product-specific lines |
| Scripts (scripts/) | All scripts | None needed |
| Hooks (.claude/settings.json) | Full hook config | None needed |
| Skills | Core tier | Activate extended/SaaS, rename agents in governance skills |
| Agents | Scaffold structure | Names, personalities, roadmap mapping |
| CLAUDE.md | Template section (above marker) | Product section (below marker) |
