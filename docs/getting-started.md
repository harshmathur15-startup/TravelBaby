# Getting Started

From clone to running website in 10 minutes.

## 1. Clone and Install

```bash
git clone <template-repo-url> my-website
cd my-website
rm -rf .git && git init          # fresh git history
npm install
```

## 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Sanity project ID (see step 3).

## 3. Set Up Sanity CMS (Optional)

If you want CMS-managed content:

1. Create a project at [sanity.io](https://www.sanity.io)
2. Copy your project ID into `.env`
3. Run `npx sanity start` to open the Studio

Without Sanity, the site uses placeholder data from components. You can add CMS integration later.

## 4. Start Development

```bash
npm run dev                      # Astro dev server on localhost:4321
```

Visit `http://localhost:4321` — you should see the home page with Hero, Features, Stats, Testimonials, and CTA sections.

## 5. Customize Your Brand

Edit these 4 config files — every page updates automatically:

1. **`src/config/site.ts`** — Brand name, nav links, footer, social media, legal/contact info
2. **`src/config/content.ts`** — Homepage sections (hero, features, stats, pricing, testimonials, FAQ, CTA)
3. **`src/config/pages.ts`** — Individual page content (about, contact, features, pricing, compare)
4. **`src/config/theme.ts`** — Color palette (primary, secondary, accent) and fonts

Then update:
5. **Site URL:** Update `site` in `astro.config.mjs`
6. **Get Started page:** Edit `src/pages/get-started.astro` directly (product-specific)

## 6. Fill In CLAUDE.md

Open `CLAUDE.md`. Under the `## Product: [Your Project Name]` section at the bottom, replace:
- `[Your Project Name]` — your product name
- `[What this product does]` — one paragraph
- `[Your feature list]` — core features
- `[Your product's agent family]` — agents you'll build

## 7. Know Your Core Skills

| Start a session | `/kickoff` |
|---|---|
| **End a session** | `/wrap` |
| **Run tests** | `/test` |
| **Review code** | `/review` |
| **Search past work** | `/recall` |
| **Project status** | `/report` |
| **Weekly reflection** | `/retro` |

## 8. Set Up Agent Families (Optional)

If your product follows the Product Launch Roadmap or will use AI agents:

```bash
mkdir -p agents/families
cp -r agents/scaffolds/governance agents/families/governance
cp -r agents/scaffolds/research agents/families/research
cp -r agents/scaffolds/build agents/families/build
```

Then rename agents — pick warm, short, human names unique to your project. Replace `[RENAME]` and `[Product]` placeholders in each registry and profile. See [inheritance.md](inheritance.md) for details on each family.

Skip this if building a simple static site without agents or a multi-phase roadmap.

## 9. Clean Up Template Artifacts

Before your first commit:

```bash
# Remove template session data and scaffolds
rm -rf research/ thoughts/ agents/examples/ agents/scaffolds/

# Remove template's own agent family (you'll build your own)
rm -rf agents/family/thea agents/family/nell agents/family/priya
rm -f agents/family/board.md agents/family/board-archive.md
```

Then reset `agents/family/registry.md` — replace the template agents with your own. The file structure stays, the content becomes yours.

Safe to remove — these are template-specific artifacts. The originals live in the template repo.

## 10. Recapture Protected File Baselines

After customizing CLAUDE.md and config files, recapture the drift detection baselines so they match your product — not the template:

```bash
node scripts/drift-check.cjs capture
```

This updates `.claude/protected-files.json` with your file hashes. Without this step, drift detection will flag every change you made during setup.

## 11. Run Tests

```bash
npm test                         # vitest unit + component tests
npm run test:scripts             # hook script tests (Node test runner)
npm run test:e2e                 # Playwright e2e (requires browsers)
```

First time running e2e? Install Playwright browsers:

```bash
npx playwright install
```

E2e tests include accessibility audits (axe-core WCAG 2.1 AA) across 6 page types.

## 12. Need a Backend?

If your product needs auth, API endpoints, or a database, see [saas-upgrade.md](saas-upgrade.md) to activate the Express + Prisma + React stack.

## 13. Deploy

```bash
npm run build                    # static HTML in dist/
npm run preview                  # preview the build locally
```

Deploy `dist/` to any static host: Vercel, Netlify, Cloudflare Pages, or your own server.
