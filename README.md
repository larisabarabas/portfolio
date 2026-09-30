# Portfolio

Stefania Barabas's portfolio site: a single-page home (Hero, Services, Work, About, Skills, Experience, Experiments, Dev Notes, Contact) plus a case-study page per project. Built with Next.js, Tailwind CSS and Sanity, deployed on Vercel.

## Stack

- **Next.js 16** (App Router, Turbopack) and **React 19**
- **Tailwind CSS v4**, with tokens in `src/app/globals.css`
- **Sanity** as the CMS, with the Studio embedded at `/studio`
- **Biome** for linting and formatting
- **Lucide** icons, Google Tag Manager (behind a cookie banner) and Vercel Analytics

> This Next.js version has breaking changes from older releases. See `AGENTS.md` and `node_modules/next/dist/docs/` before changing framework-level code.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The Sanity Studio is at [http://localhost:3000/studio](http://localhost:3000/studio).

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (`production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID. Leave empty locally; set it only in Vercel Production |
| `DEV_ORIGIN` | Dev only: LAN IP allowed to load dev assets, for testing from a phone |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Run `typegen`, then build for production |
| `npm run start` | Serve the production build |
| `npm run lint` | Biome check (not ESLint) |
| `npm run format` | Format with Biome |
| `npm run typegen` | Regenerate `schema.json` and `src/lib/sanity/sanity.types.ts` |

`schema.json` and `sanity.types.ts` are generated and gitignored. Run `npm run typegen` after any Sanity schema or query change.

## Content

| Content | Where it lives |
|---|---|
| Hero, Services, About, Skills, Contact, footer, cookie and privacy copy | `src/lib/constants.ts` |
| Work cards and case studies, experience, article links, open-source projects, the Experiments toggle | Sanity (edit at `/studio`) |

Sanity queries revalidate every 60 seconds, so edits show up within about a minute without a redeploy.

## Project layout

```
src/
  app/            routes: home, /work/[slug], /privacy, /studio, OG image, sitemap
  components/
    layout/       SiteHeader, SlideDeck, SectionPager, SectionRail, ThemeToggle
    sections/     one component per home section
    case-study/   case-study page pieces
    consent/      cookie banner and settings button
    ui/           PillLink, Chip, TextLink, SectionLabel, SaturationFocusImage…
  hooks/          slide navigation, active section, scroll reveal, media query
  lib/            constants, consent state, Sanity client/queries/types
  sanity/         schema types and desk structure
docs/             design system documentation
```

## Design

The site uses a neumorphic design system: one surface colour, depth from raised and inset shadows, and one coloured call to action per screen. It supports light and dark themes. On desktop the home page is a slide deck; below 760px it scrolls normally with a bottom pager.

The full description, with tokens, components and motion, is in [`docs/design-system.md`](docs/design-system.md).

## Deployment

Deployed on Vercel from `main`. Set the Sanity variables for all environments, and `NEXT_PUBLIC_GTM_ID` for Production only. Analytics only loads after a visitor accepts the cookie banner.

See `BACKLOG.md` for what's done and what's next.
