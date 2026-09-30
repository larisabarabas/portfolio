# Design system: neumorphic redesign

This documents what the site looks like **as built** after the neumorphic redesign (PRs #17 and #18, 2026-09-29). The source of truth for tokens is `src/app/globals.css`; this file explains how they're used. The older flat design (`Portfolio-B-Focused`, 1px borders, paper cards, blobs) is gone from the home page and case studies.

## Principle

Everything sits on **one surface colour** (`bg`). Depth comes from a pair of shadows, not from borders or contrasting fills:

- **Raised** (`shadow-neu-out*`): dark shadow bottom-right, light highlight top-left. Cards, buttons, controls.
- **Inset** (`shadow-neu-in*`): the same pair turned inward. Wells, tags, active states, image frames.
- Pressing or hovering a raised control swaps it to inset (`hover:shadow-neu-in-sm`).
- **One coloured action per screen** (`PillLink variant="cta"`). Everything else is neutral.

Light and dark share the same structure; only `--neu-dk` / `--neu-lt` and the colour tokens change.

## Tokens

### Colour (light → dark)

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#f8efe6` | `#26212c` | The single surface |
| `paper` | `#ffffff` | `#2e2835` | Rare; flat `Pill` only |
| `ink` | `#2a2430` | `#f3e8de` | Text |
| `primary` | `#a8447a` | `#e08bb8` | Eyebrows, links, active dot, section numbers |
| `primary-hover` | `#7e2f5a` | `#f6c4dd` | Darker than primary in light (7.6:1 on bg; the old `#d97dae` was 2.5:1) |
| `secondary` | `#5c9682` | `#86bfa9` | Status accents |
| `secondary-strong` | `#467766` | `#86bfa9` | Fill behind white text (5.1:1; secondary is 3.4:1) |
| `tertiary` | `#5a4a73` | `#b9a8d6` | Logo, hero italic, active pager label |
| `soft` | `#f0c9db` | same | Soft chip; text stays dark in both themes |
| `line` | ink @ 14% | ink @ 14% | Dividers only (no card borders) |
| `on-accent` | `#ffffff` | `#1f1a24` | Text on a filled accent |
| `cta` / `cta-fg` | `#5a4a73` / white | `#e08bb8` / `#1f1a24` | The coloured pill |
| `cta-hover` | `#a8447a` | `#b9a8d6` | CTA hover |

### Shadows

`--neu-dk` and `--neu-lt` are theme variables (light: warm brown 32% / white 90%; dark: near-black 60% / white 6%).

| Token | Value |
|---|---|
| `shadow-neu-out` | `6px 6px 14px dk, -6px -6px 14px lt` |
| `shadow-neu-out-sm` | `3px 3px 7px dk, -3px -3px 7px lt` |
| `shadow-neu-in` | inset `4px 4px 7px` pair |
| `shadow-neu-in-sm` | inset `2px 2px 4px` pair |
| `shadow-accent-{primary,secondary,tertiary}` | Filled chips cast a shadow in their own hue (30–35% alpha) + the light highlight |
| `shadow-cta` | `6px 6px 16px cta-dk, -6px -6px 16px lt` |

### Radii

`rounded-pill` 100px (buttons, chips, controls) · `rounded-card` 20px · `rounded-card-lg` 24px. Large surfaces are bigger and nested: Work card 32px, Contact panel 44px, Services panel 36px (28px on phones), image frame 44px → inset well 30px → image 20px. Each nested layer steps down.

### Type

Unchanged from before: **Instrument Serif** (headings, italic accent, logo) and **Space Grotesk** (400–700, body/UI).

- Eyebrow: 13px / 600 / uppercase / 0.16em tracking / `primary`. `variant="inset"` puts it in a pressed-in pill (hero, contact).
- Hero H1: `clamp(38px, 6.4vw, 96px)`, line-height 1.02, second line italic `tertiary`.
- Case-study H1: `clamp(40px, 6vw, 68px)`. Section H2: `clamp(30px, 3.4vw, 40px)`. Contact H2: `clamp(40px, 6vw, 76px)`.
- Body 17px (19px on desktop hero), line-height 1.6, `opacity-85`. Card body 14.5px.
- Logo: serif, italic, bold, 28px, `tertiary`, with a `primary` full stop.
- Cookie/consent heading: serif 28px.

### Layout

- Content column **1240px** (`max-w-310`), side padding `8vw`. Contact panel is narrower (`max-w-275`).
- One breakpoint that matters: `nav` = 47.5rem (760px). Below it: native scrolling, pager only, Services becomes an accordion. Above it: slide deck. The value lives in CSS (`--breakpoint-nav`) and is mirrored in `SlideDeck.tsx` (`DESKTOP_QUERY`); keep both in sync.
- `lg` (hero side-by-side) is a second, separate switch.

### Motion

- **Slides (desktop):** panels stacked full-screen; the incoming one fades in (0.5s) and scales from 0.94 (forward) or 1.04 (back) over 1s on `--ease-slide` `cubic-bezier(.77,0,.18,1)`; its content drifts in 70px from the travel direction. Outgoing panel stays visible 1s so the crossfade finishes. Deep links (`/#work`) skip the animation (`data-instant`).
- **Entrances:** `heroIn` (0.9s), `fadeUp` (0.7s, also the consent banner), `bgReveal` (1.6s).
- **Hero photo:** `neuFloat` — 6s bob with a shadow that grows as it rises.
- **Controls:** colour/shadow transitions 300ms; pager menu uses `cubic-bezier(.2,.8,.2,1)` at 350–450ms.
- `prefers-reduced-motion` kills all animation and transitions. Print forces the light palette and lays every section out in sequence.
- Removed: the old blob/parallax decoration and the 6px hover-lift on cards.

## Components

### Primitives (`src/components/ui/`)

| Component | Variants | Notes |
|---|---|---|
| `PillLink` | `cta`, `raised` (`tone` ink/tertiary); sizes sm/md/lg | `cta` = filled, coloured shadow, presses inset on click. `raised` = flush with page, presses in on hover. `external` adds `target=_blank` and an sr-only "(opens in a new tab)". |
| `Chip` | `raised`, `inset` (default), `accent` (`color` primary/secondary/tertiary/soft); sizes tag/md/lg/status | Replaces the flat `Pill` on the home page. `status` size is uppercase 11.5px for work-card status. |
| `SectionLabel` | `plain`, `inset` | The eyebrow. |
| `TextLink` | colour primary/tertiary/ink; size sm/md; optional trailing Lucide icon | 2px underline in its colour. The quiet option beside a `PillLink`. |
| `SaturationFocusImage` | — | WebGL canvas; the hero photo is greyscale and a circle of colour follows the pointer. Auto-plays a path on touch screens and pauses when off-screen or on a hidden slide. Falls back to the full-colour photo on reduced motion. |
| `Reveal` | — | Scroll-reveal wrapper. |

`Pill` (flat, bordered) is legacy but **still used by the Experiments section**, which hasn't been moved to `Chip` yet. `Button` and `ExternalMark` were deleted with the case-study redesign.

Icons are **Lucide** (`ArrowLeft`, arrows in links). Text arrows (`→ ↓`) and emoji from the old system are gone. Pager step buttons still use the `←`/`→` glyphs.

### Navigation and chrome (`src/components/layout/`)

- **`SiteHeader`** — one header for home and case studies. Logo left, controls right, aligned to the 1240px column. Transparent at the top; once the page (or the current slide) scrolls past 8px it gains `bg` and a soft bottom shadow. Fixed, static in print. Takes an `actions` slot (e.g. `BackLink`).
- **`Logo`** — `#hero` on home (plain anchor, the deck intercepts it), `/` elsewhere (`next/link`).
- **`ThemeToggle`** — light/dark switch. `<html data-theme>` is the source of truth; saved choice wins, otherwise the OS setting. Only present on the home page and case studies, so `/studio` always renders light.
- **`BackLink`** — raised pill with an arrow; icon-only below `nav`. Used in the header on inner pages (privacy, case studies).
- **`SectionPager`** — bottom-centre raised pill: previous · current section (opens a list of all sections) · next. Numbered `01`, `02`… with the current one inset and filled `primary`. **The only section navigation on phones.** On phones it slides out of view while the hero is on screen. Accepts an `exitLink` (case studies use it for "back to work").
- **`SectionRail`** — desktop-only dot rail on the right. Each dot is an inset well; the active one has a `primary` dot; labels appear on hover/focus as ink tooltips.
- **`SlideDeck`** — desktop: one section per full-screen slide, driven by `useSlideNavigation` (wheel with a 700ms lock, 350ms edge dwell on tall slides, swipe ≥70px, keys, Page Up/Down at 85% of height). Sideways swipes are blocked from triggering browser Back on the home page only. Phones: ordinary sections with `scroll-snap-type: y proximity`, `scroll-margin-top: 6rem`; the hero's margin is `100vh` so the page can still rest at the top.

### Home sections (`src/components/sections/`)

Order: Hero → Services → Work → About → Skills → Experience → Experiments (Sanity toggle) → Dev Notes → Contact.

- **Hero** — text left, photo right. Photo is a nested frame: raised frame → inset well → floating image. When stacked (`< lg`) the photo becomes a 5:2 banner above the text, and is **hidden entirely on screens under 820px tall** so the headline and both buttons stay above the pager. Actions: coloured `PillLink` to `#services` + raised "Book a call" (Calendly, external).
- **Services** — desktop: a tab list of numbered inset/raised rows beside a raised panel (`role=tablist/tabpanel`); active row is inset with a `primary` numbered circle. Below `nav`: an accordion of the same items.
- **Work / `WorkCard`** — equal-height raised cards (32px): inset image well, `accent` status chip, serif title, summary points, tech `Chip`s, `TextLink`s pinned to the bottom.
- **Experience** — an inset well (32px) holding a vertical list of raised cards (22px). Each card: inset date/location chip, 17px semibold role, industry at 75% opacity. No timeline line or dots any more.
- **Contact** — one big raised panel (44px), inset eyebrow, coloured "Book a call" + raised email pill showing the address, then quiet ink `TextLink`s (LinkedIn, GitHub, résumé, Dev Notes), then the footer with privacy link and cookie-settings button.

### Case studies (`src/components/case-study/`, `src/app/work/[slug]`)

Same neumorphic language as home, native scrolling, no slide deck. `SiteHeader` + `BackLink` on top; `CaseStudyNav` reuses `SectionPager` at the bottom, following scroll via `useActiveSection`, with an exit link back to `/#work`.

- `MetaRow` — inset well (24px) holding Role / Timeline-or-Status / Stack / Links as small uppercase labels over 14.5px semibold values.
- `DecisionCard` — raised 28px card; "Decision:" and "Tradeoff:" lead-ins in `tertiary`.
- `UXFlowSteps`, `CaseStudyOutcome` — restyled to match (raised/inset surfaces, no borders).
- Sections use an outer `px-[8vw]` wrapper with an inner `max-w-310` element (padding must not eat the content width).

### Consent and privacy

- **`ConsentManager`** — cookie banner, fixed bottom-left on desktop (max 400px), full-width with 16px margins on phones. Raised 24px card, eyebrow + serif heading + body + privacy link. **Accept and Decline are visually identical** raised buttons, so declining is as easy as accepting. GTM loads only after Accept; nothing loads on decline or while undecided. Hidden on `/studio`. Reopened from `CookieSettingsButton` in the footer, which moves focus to the banner.
- **`/privacy`** — long-form page in the case-study layout with `BackLink`; in the sitemap.

### Social preview

`opengraph-image.tsx` renders the neumorphic look at share size, using `og/hero-portrait-og.jpg`.

## Rules of thumb

1. New surface? `bg` + a `shadow-neu-*`. No borders, no `paper` fill.
2. Interactive raised thing? It goes inset on hover/press.
3. Only one `cta` `PillLink` per screen. Secondary actions are `raised` pills or `TextLink`s.
4. White text on a colour needs ≥4.5:1: use `secondary-strong`, not `secondary`.
5. Anything that must be readable in dark mode uses tokens, never raw hex. The exceptions are the accent shadow tints and the hero float shadow, which are fixed RGB.
6. Anything animated must respect reduced motion (the global reset handles CSS; JS-driven effects must check the media query themselves).
7. Phone first for the hero and pager: check 375×667 and 390×844 before shipping changes.
