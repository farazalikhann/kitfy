# kitfy.work

The hub site for Kitfy, ten free browser based tools kept in one place. Built
with Astro and Tailwind CSS, deployed as a fully static site.

## Stack

- [Astro](https://astro.build) (static output)
- Tailwind CSS v4, CSS first config, every token lives in
  [`src/styles/tokens.css`](src/styles/tokens.css)
- Self hosted fonts via `@fontsource-variable/space-grotesk`,
  `@fontsource-variable/inter`, and `@fontsource/jetbrains-mono`, no Google
  Fonts CDN
- Astro content collections for the blog
- Deployment target: Cloudflare Pages

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Type check and build the static site to `dist/` |
| `npm run preview` | Serve the built `dist/` output locally |
| `npm run favicons` | Fetch and normalise each live tool's own favicon (see below) |

## The favicon script

Tool cards on the home page show each tool's own favicon, fetched from its
live site rather than a third party favicon proxy (no request from a visitor
ever goes to a service like `google.com/s2/favicons`).

```bash
npm run favicons
```

This reads `src/data/tools.ts`, and for every tool with a `url` it:

1. Fetches the page and looks for `<link rel="icon">` /
   `<link rel="apple-touch-icon">` tags, preferring the apple touch icon and
   the largest declared size, falling back to `/favicon.ico`
2. Downloads whatever it finds, resizes it to 128x128 with `sharp`, and
   writes it to `public/favicons/<slug>.png`
3. Logs a warning and skips any tool it cannot resolve a favicon for,
   without failing the run

**Run this whenever you add a tool or a tool's domain changes.** If a favicon
404s later (a tool redesigns its site, for example), the card falls back to
the Kitfy tile mark automatically, it will not show a broken image icon.

## Project structure

```
src/
├── components/       Header, Footer, SEO, JsonLd, TileMark, Hero,
│                      TrustStrip, ToolCard, ToolGrid, HowItWorks,
│                      CtaBand, AdSlot
├── content/blog/      Blog posts (Markdown, Astro content collections)
├── content.config.ts  Blog collection schema
├── data/tools.ts       The single source of truth for all ten tools
├── layouts/
│   ├── Base.astro      Shared <head>, header, footer
│   └── Post.astro       Blog post reading layout
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── privacy.astro
│   ├── 404.astro
│   ├── tools/[slug].astro
│   └── blog/index.astro, blog/[slug].astro
└── styles/tokens.css   Every CSS custom property: colour, type, spacing, radius
```

## Design tokens

`src/styles/tokens.css` is the single source of truth for colour, type,
spacing and radius. Tailwind v4 is CSS first, so tokens are declared once
under `@theme` and exposed as utilities (`bg-ink`, `text-accent`,
`rounded-card`, and so on). Components never reach for a raw hex value.

Dark mode is one variable swap: seven semantic custom properties
(`--kf-bg`, `--kf-surface`, `--kf-text`, `--kf-text-secondary`,
`--kf-text-muted`, `--kf-border`, `--kf-accent`) are redefined once under
`@media (prefers-color-scheme: dark)`, and every component reads through
those, never the raw palette, so there is nothing to duplicate.

## Adding an eleventh tool

Add one object to the `tools` array in `src/data/tools.ts`, then run
`npm run favicons`. Every page (home grid, its own `/tools/[slug]` page,
sitemap, footer) is generated from that array.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PUBLIC_GA_ID` | Turns on the GA4 snippet in `Base.astro`. Left unset ships with no analytics. |

AdSense slots (`src/components/AdSlot.astro`) are placeholder containers
with a fixed height and no live client or slot ID wired in. See the comment
at the top of that file for how to go live.

## Deploying to Cloudflare Pages

1. Push this repository to GitHub (or GitLab).
2. In the Cloudflare dashboard, create a new Pages project from that repo.
3. Build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Add `PUBLIC_GA_ID` under environment variables if you want analytics live.
5. Deploy. `public/_headers` ships with cache and security headers already
   configured, Cloudflare Pages picks it up automatically.

To preview a production build locally before pushing:

```bash
npm run build
npm run preview
```
