# Tani — Evolution Proposals (S40)
Date: 2026-03-31
Feeder reports consumed: Thea (S38), Jaya (S40), Keya (S40)

## Cross-Signal Patterns

### 1. Hero component is broken for downstream adoption
- **Thea:** Visual Design & Polish is the #1 gap (12/15, -1 vs AstroWind)
- **Jaya:** Hero completely rewritten by Zimyo — template uses config imports, Zimyo uses CMS props with fallbacks. The CMS-first pattern is superior.
- **Conclusion:** Template Hero is both visually behind AND architecturally wrong for products. Double signal = high-priority rework.

### 2. Spawn friction persists
- **Thea:** Spawn & Setup Speed 7/8 (-1 vs Starlight). Sanity CMS adds setup friction. Needs seed data + mock fallbacks.
- **Jaya:** Product pages, Hero, and FAQ all needed fallback data patterns that Zimyo built from scratch.
- **Keya:** Astro 6.1.2 ships Fonts API and CSP API that reduce manual boilerplate in BaseLayout — less config = faster spawn.
- **Conclusion:** Three agents agree: the out-of-box experience needs work. Mock data + Astro bump together close this gap.

### 3. FAQ is missing universal features
- **Thea:** Not called out specifically, but FAQ is part of the component richness score.
- **Jaya:** Zimyo added JSON-LD structured data AND CSS-only accordion to FAQ. Both are universal improvements — not product-specific.
- **Conclusion:** Template FAQ is objectively behind what a product built from it. Upstream the improvements.

### 4. Button/Badge are too opinionated
- **Jaya:** Button overridden (removed outline variant, rewrote hover/focus). Badge overridden (hardcoded border-radius instead of token).
- **Anvi (via board):** 3 oversized components flagged, but Button/Badge are in the override pattern, not the size pattern.
- **Conclusion:** UI primitives should be less opinionated — expose configuration, not enforce defaults.

### 5. Design token gaps cause hardcoding downstream
- **Jaya:** 92 hardcoded hex values in Zimyo, concentrated in new components. 80% token adoption means the remaining 20% is systematic.
- **Thea:** Visual Design gap includes lack of micro-interactions and polish — token system doesn't cover animation/transition tokens.
- **Conclusion:** Token set is incomplete. New component authors bypass it because the tokens they need don't exist.

---

## Proposals

### Proposal 1: Rework Hero to CMS-props-with-fallback pattern
**Triggered by:** Jaya — Hero completely rewritten by Zimyo; Thea — Visual Design 12/15, -1 vs AstroWind
**What to change:**
- `src/components/sections/Hero.astro` — accept props (title, subtitle, image, cta) with fallback defaults instead of config imports
- `src/components/sections/HeroSplit.astro`, `HeroMinimal.astro`, `HeroTrustBar.astro` — same pattern
- Add scroll-triggered reveal animation (CSS + IntersectionObserver) to Hero variants
- Add gradient mesh background option
**Why:** The component Zimyo built is better than what they inherited. Products shouldn't have to rewrite the most important section on every page. Visual polish closes the #1 competitive gap.
**Effort:** Medium
**Priority:** P1

### Proposal 2: Upstream FAQ improvements (JSON-LD + CSS accordion)
**Triggered by:** Jaya — Zimyo added JSON-LD structured data and CSS-only accordion to FAQ
**What to change:**
- `src/components/sections/FAQ.astro` — add `<script type="application/ld+json">` FAQPage structured data
- Replace JS accordion with CSS-only `<details>`/`<summary>` pattern
**Why:** Both improvements are universal (SEO + less JS). A product built something better than the template — that's a template failure.
**Effort:** Low
**Priority:** P1

### Proposal 3: Bump Astro to ^6.1.2 and evaluate Fonts API
**Triggered by:** Keya — Astro 6.1.2 available with Fonts API, CSP API; Thea — Spawn friction 7/8
**What to change:**
- `package.json` — bump `astro` from `^6.0.8` to `^6.1.2`
- Evaluate replacing manual font loading in `src/layouts/BaseLayout.astro` with Astro Fonts API
- Evaluate CSP API for security headers (currently manual or absent)
- After template bump, propagate to Zimyo
**Why:** Minor version with zero breaking changes. Fonts API reduces boilerplate. CSP API adds security. Both reduce spawn friction.
**Effort:** Low
**Priority:** P1

### Proposal 4: Make Button and Badge less opinionated
**Triggered by:** Jaya — Button overridden (removed outline, rewrote hover/focus); Badge overridden (hardcoded border-radius)
**What to change:**
- `src/components/ui/Button.astro` — make hover behavior configurable via props (e.g., `hoverEffect="lift" | "darken" | "none"`), keep outline variant but make it opt-in rather than prominent
- `src/components/ui/Badge.astro` — add `rounded` prop (`"full" | "md" | "sm"`, default `"full"`) so products can override without hardcoding
**Why:** When products consistently override the same things, the template defaults are wrong. Configurability prevents overrides.
**Effort:** Low
**Priority:** P2

### Proposal 5: Expand design token set (animation, brand-extension tokens)
**Triggered by:** Jaya — 92 hardcoded hex values, concentrated in new components; Thea — visual polish gap includes lack of micro-interactions
**What to change:**
- `src/styles/tokens.css` (or equivalent) — add:
  - Animation tokens: `--transition-hover`, `--transition-reveal`, `--animation-duration-fast/medium/slow`
  - Brand extension tokens: `--color-accent-*` variants for product-specific accent colors beyond the base palette
  - Interactive tokens: `--hover-lift`, `--hover-darken`, `--focus-ring-*`
- Add a lint hook or ESLint rule that warns on hardcoded hex values in `.astro` and `.css` files
**Why:** The 20% hardcoding gap is systematic — authors bypass tokens because the tokens don't exist. Adding animation tokens also supports Proposal 1 (Hero visual polish).
**Effort:** Medium
**Priority:** P2

### Proposal 6: Add mock/seed data for fresh clone rendering
**Triggered by:** Thea — Spawn & Setup Speed 7/8, needs seed data + mock fallbacks; Jaya — CMS prop fallback pattern used throughout Zimyo
**What to change:**
- `src/data/defaults/` — create default data files for Hero, Features, Stats, Testimonials, FAQ, Pricing, Products
- All section components — adopt the `{props.items || DEFAULTS}` pattern from Zimyo
- `scripts/sanity-seed.cjs` — populate with realistic content (currently exists but needs content)
**Why:** A fresh clone should render a complete, professional-looking site without any CMS configuration. This is the single biggest spawn friction point.
**Effort:** Medium
**Priority:** P1

### Proposal 7: Add ixartz to Thea's competitor roster
**Triggered by:** Thea — "ixartz is the only active competitor with velocity", recommended adding to next benchmark; Scout S35/S37 scored ixartz 101/140
**What to change:**
- `agents/thea/profile.md` or Thea's competitor config — add ixartz to the deep-dive roster alongside AstroWind, Starlight, ScrewFast, AstroPaper, Accessible Astro
**Why:** The only competitor with active velocity should be tracked. Scout already has data on it.
**Effort:** Low
**Priority:** P3

### Proposal 8: Flag Agent-* components for Priya extraction evaluation
**Triggered by:** Jaya — 8 Agent-* section components + aiAgent schema built from scratch in Zimyo
**What to change:**
- No template changes yet. Board entry for Priya: evaluate whether Agent-* components (AgentPageHero, AgentBenefits, AgentCapabilities, AgentDeepDive, AgentFAQ, AgentHitl, AgentUseCases, AgentWorkflow) and `aiAgent` schema should be extracted upstream as optional template components.
**Why:** If multiple products need AI agent showcases, these should be template-level. But extraction requires Priya to assess whether the pattern is product-specific or generalizable. Tani cannot determine this — that's Priya's domain.
**Effort:** N/A (evaluation task)
**Priority:** P3

---

## Data Gaps (flagged for feeders)

| Gap | For Agent | Why |
|-----|-----------|-----|
| No second product to validate override patterns | Jaya | Single-product sample (Zimyo) means override patterns could be product-specific, not universal. Need a second product to confirm. |
| No Lighthouse score data in this cycle | Thea | Performance dimension (9/10) cited but no fresh Lighthouse run to validate. |
| Skill tier value unclear | Jaya | Zimyo activated 97% of skills — is the extended/SaaS separation adding friction without value? Needs more products to assess. |
