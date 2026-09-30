@AGENTS.md

# Design system

The implemented design is documented in `docs/design-system.md` (neumorphic: one surface colour, raised/inset shadows, one coloured CTA per screen). Tokens live in `src/app/globals.css`. Read both before changing UI.

The claude.ai/design project is the design source. Before adding a new component pattern or changing tokens (colors, type, spacing, radii, motion), re-fetch it via the `DesignSync` tool — do not rely on memory or a cached snapshot, since the source can change.

- Project ID: `c29beb51-1b49-4739-aa6e-ba4f61fec061` ("stefania. Design System")
- File to read: `templates/design-system/DesignSystem.dc.html`
- The older project `0464cfa2-…` ("Professional creative portfolio planning") holds the original flat-design `Design System.dc.html`. It is outdated; don't use it.

If it disagrees with `docs/design-system.md`, say so and ask which wins. The doc reflects what shipped.

# Commands and gotchas

- `npm run lint` is Biome (not ESLint); `npm run format` writes Biome formatting.
- `npm run typegen` regenerates `schema.json` and `src/lib/sanity/sanity.types.ts`. Both are gitignored, so run it after any Sanity schema or query change (`npm run build` runs it automatically).
- The `nav` breakpoint (47.5rem) is defined in `src/app/globals.css` and mirrored in `SlideDeck.tsx` (`DESKTOP_QUERY`). Change both together.

# Command approval

Whenever a command needs my approval to run, explain in plain language what it does — what it will actually do and any side effects — before or alongside the approval prompt, so I understand it rather than approving blind.

# React best practices

Whenever writing, editing, or reviewing React components or logic (hooks, state, effects, rendering), run the `react-best-practices` skill and apply its findings — not just when explicitly asked.
