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

1. **Colors:** Edit `src/styles/global.css` — replace the indigo/slate/amber palette with your brand colors
2. **Fonts:** Change `--font-heading` and `--font-body` in `global.css` and update the Google Fonts import
3. **Logo:** Replace the text "Brand" in `Navbar.astro` and `Footer.astro` with your logo
4. **Content:** Update text in section components or connect Sanity CMS
5. **Site URL:** Update `site` in `astro.config.mjs` and `robots.txt`

## 6. Fill In CLAUDE.md

Open `CLAUDE.md`. Below the `<!-- PRODUCT -->` marker, replace:
- `[Your Project Name]` — your product name
- `[What this product does]` — one paragraph
- `[Your feature list]` — core features
- `[Your product's agent family]` — agents you'll build

## 7. Know Your Core Skills

| Start a session | `/kickoff` |
|---|---|
| **End a session** | `/wrap` |
| **Plan before building** | `/planning` |
| **Commit changes** | `/commit` |
| **Create a PR** | `/pr` |
| **Run tests** | `/test` |
| **Review code** | `/review` |
| **Debug a problem** | `/debug` |
| **Save context** | `/save-context` |

## 8. Clean Up Template Artifacts

Before your first commit:

```bash
rm -rf research/ thoughts/ agents/examples/
```

## 9. Need a Backend?

If your product needs auth, API endpoints, or a database, see [saas-upgrade.md](saas-upgrade.md) to activate the Express + Prisma + React stack.

## 10. Deploy

```bash
npm run build                    # static HTML in dist/
npm run preview                  # preview the build locally
```

Deploy `dist/` to any static host: Vercel, Netlify, Cloudflare Pages, or your own server.
