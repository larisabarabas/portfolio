# Backlog: Portfolio site (Next.js + Tailwind + Sanity)

## Context

Rebuilding the design handoff at `../design_handoff_portfolio/` — a single-page home (hero, work, about, how-I-work, skills, experience, experiments, writing, contact) plus two case-study pages (Fika, RetroBox) — as a real Next.js + Tailwind site with idiomatic components/hooks, backed by Sanity for content that changes over time. Build and verify locally first; GitHub remote + Vercel deploy are deferred to a later, explicitly-requested step.

Decisions locked in before build:
- **CMS**: Sanity — form-based editing (incl. image upload) is easier to maintain long-term than editing MDX/JSON in the repo.
- **CMS scope**: work/project cards + case studies, experience timeline entries, article/writing links, and the `showExperiments` visibility toggle. Hero, About, How I Work, Skills, Contact stay hardcoded — identity copy the handoff calls "final as shown," not a repeatable list.
- **Routing**: one dynamic `/work/[slug]` route driven by Sanity, not two static page files.
- **Sanity Studio**: embedded at `/studio` inside the Next.js app (one deployable), not a standalone `studio/` package.
- **Linting/formatting**: Biome, replacing ESLint + Prettier.
- **Sanity project**: `eegzn6d8`, dataset `production` (already created).


## Source-fidelity notes (from reading the design handoff directly — not obvious from the README prose alone)

1. Only **two** of the hero's five computed parallax blobs are actually rendered (top-right/primary using `p1x/p1y`, bottom-left/tertiary using `p3x/p3y`) — the other three offsets are dead code in the source.
2. `heroAnimation` (`float`/`still`) only gates the continuous morph/float keyframe — pointer-driven parallax stays live in both modes.
3. Scroll-reveal in `#work` is applied to the two inner cards, not the section wrapper. Full set of revealed elements: `card1`, `card2` (+0.12s delay), `about`, `howiwork`, `skills`, `experience`, `experiments`, `devnotes`, `contact` — 9 total.
4. How-I-Work's 4 cards stagger off their *parent* section's visibility (`index * 0.12s` delay) — no independent per-card observer.
5. Case-study pages have **no** scroll-reveal — only a static on-load `fadeUp` on the first section. These pages are pure Server Components.
6. Fika and RetroBox use different lead-in labels ("What I built"/"Result" vs "What I'm building"/"Status") and different meta-row labels ("Timeline" vs "Status") — modeled as free text/fields in the `project` schema, not fixed copy.
7. "shadcn/ui" appears in the Skills tag list as résumé copy only — not an instruction to install it.

## Content ownership

| Content | Source |
|---|---|
| Hero, About, How I Work, Skills, Contact, nav/logo, footer | Hardcoded (`lib/constants.ts` + components) |
| Work cards + case studies (Fika, RetroBox), incl. screenshots & UX-flow images | Sanity `project` |
| Experience timeline entries | Sanity `experienceEntry` |
| Article/writing collaboration links | Sanity `articleLink` |
| Experiments section visibility | Sanity `siteSettings.showExperiments` (singleton) |
| `heroAnimation` float/still | Code constant, no UI |

---

## Done

- [x] Scaffold Next.js 16 (App Router, TS, Tailwind v4, Turbopack) in the repo root
- [x] Remove ESLint, install and configure Biome (`next`/`react`/`tailwind` domains, 2-space/double-quote formatting)
- [x] Install `sanity`, `next-sanity`, `@sanity/image-url`, `@sanity/vision`
- [x] Tailwind design tokens + keyframes in `src/app/globals.css` (colors, radii, animation names transcribed from the handoff's inline `<style>` block)
- [x] Fonts: `next/font/google` for Instrument Serif (400, italic) + Space Grotesk (400/500/600/700) in `src/app/layout.tsx`
- [x] Sanity schema: `project` (card + case-study field groups), `experienceEntry`, `articleLink`, `siteSettings` (singleton), plus object types `summaryPoint`, `metaLink`, `uxFlowStep`, `decisionCard`
- [x] Sanity desk structure pinning the `siteSettings` singleton (`src/sanity/structure.ts`)
- [x] `sanity.config.ts` + embedded Studio route at `src/app/studio/[[...tool]]/page.tsx`
- [x] `sanity.cli.ts` (loads `.env.local` via `@next/env` for CLI/typegen commands)
- [x] `next.config.ts` `images.remotePatterns` for `cdn.sanity.io`
- [x] `src/lib/sanity/{client,image,fetch,queries}.ts`
- [x] `.env.local` wired to the real Sanity project (`eegzn6d8` / `production`); `.env.local.example` committed as the template (fixed `.gitignore`'s `.env*` pattern to allow `.env*.example` through)
- [x] Verified: `tsc --noEmit` clean, `npm run lint` (Biome) clean, `/studio` returns 200 with no server errors on `next dev`
- [x] Committed: "Project basic setup - Next.js, Tailwindcss, Biome and Sanity as CMS" (`c1d63c2`)
- [x] Sanity TypeGen wired up: `typegen` config in `sanity.cli.ts` (not a separate `sanity-typegen.json` — that form is deprecated), `npm run typegen` script (`sanity schema extract --force` + `sanity typegen generate`) generates `src/lib/sanity/sanity.types.ts` from schema + `defineQuery` calls; both `schema.json` and `sanity.types.ts` are gitignored build artifacts, regenerate after any schema/query change
- [x] Removed `src/lib/types.ts` (hand-written, unused by any code) — generated query-result types in `src/lib/sanity/sanity.types.ts` (e.g. `ProjectsQueryResult`, `ExperienceEntriesQueryResult`) are now the single source of truth for Sanity-shaped types going forward
- [x] **Shared UI + hooks** — `Pill`, `Button`, `SectionLabel`, `Reveal`, `ImagePlaceholder`, plus `SaturationFocusImage` and `TextLink` (not originally scoped) in `src/components/ui/`; `useScrollReveal`, `useActiveSection` in `src/hooks/` (no separate `useHeroParallax` — see deviation note below)
- [x] **Home page sections** — `Logo`, `NavDots`, `Hero`, `WorkSection`/`WorkCard`, `About`, `HowIWork`, `Skills`, `Experience`/`ExperienceItem`, `Experiments`, `DevNotes`, `Contact`, composed in `src/app/page.tsx` and wired to live Sanity data via `sanityFetch`
  - Deviation from source-fidelity notes: `Hero` does not implement the pointer-driven parallax blobs — it uses a `SaturationFocusImage` treatment instead
- [x] Static assets copied into `/public`: `hero-bg.png`, `stefania-barabas-resume.pdf`, `about-img.jpeg`, `sdn-logo.png`
- [x] GitHub remote created, pushed, PR #3 (`feature/sections`) merged to `main`
- [x] Domain purchased via Cloudflare, registered as custom domain on the Vercel project (root + `www` CNAMEs, DNS-only), deploy verified live

- [x] **Case study route** — `src/app/work/[slug]/page.tsx` (`generateStaticParams` via `projectSlugsQuery` + `notFound()` for missing/`hasCaseStudy: false` projects) + `CaseStudyHeader`, `MetaRow`, `UXFlowSteps`, `DecisionCard`, `CaseStudyOutcome` in `src/components/case-study/`; static section copy ("The problem", "UX flow", etc.) added as `CASE_STUDY` in `lib/constants.ts`; `tsc`, Biome, and `next build` all clean
- [x] Fixed case-study section width/spacing bug — each section previously put `mx-auto max-w-230` on the same element as `px-[8vw]`; under Tailwind's `border-box` sizing that let the side padding (which grows with viewport width) eat into the 920px content budget instead of sitting outside it, causing premature wrapping (e.g. the Stack meta value dropping to its own line) and a sparser page than the design reference. Fixed in `page.tsx`'s five sections + `CaseStudyOutcome` by splitting each into an outer `px-[8vw]` element wrapping an inner `mx-auto max-w-230` element

## Next up

- [ ] Project screenshots (`fika-screenshot.png`, `retrobox-screenshot.png`) — uploaded through the Studio UI, not committed to the repo
- [ ] **Sanity content entry** (manual, in Studio at `/studio`):
  - [ ] Two `project` documents (Fika, RetroBox) — screenshots uploaded from `design_handoff_portfolio/design-files/assets/`
  - [ ] `experienceEntry` documents (4, from `Portfolio-B-Focused.dc.html`)
  - [ ] `articleLink` documents (2)
  - [ ] Single `siteSettings` document (`showExperiments: true`)
- [ ] **Local verification** — visual compare against `design_handoff_portfolio/screenshots/*.png`, 375px responsive check, scroll-reveal + nav-dot spy behavior, `showExperiments` toggle, both case-study pages, `npm run lint` + `npm run build` clean
