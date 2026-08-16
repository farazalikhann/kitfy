// Astro only prefixes the configured `base` onto asset URLs it processes
// itself (its own JS/CSS bundles). Any absolute path written by hand in
// markup, href="/about", src="/brand/logo.svg", is left untouched, so on
// a sub-path deploy (GitHub Pages at /kitfy/) those links point at the
// domain root and 404. Route every hand-written absolute path through
// this helper instead.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function withBase(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
