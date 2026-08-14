// Tailwind v4 is CSS-first: every colour, font, spacing and radius token
// lives in `src/styles/tokens.css` under `@theme`, and that file is the
// single source of truth so components never reach for a raw hex value.
// This file exists for the pieces Tailwind still resolves from JS: content
// scanning is automatic with @tailwindcss/vite, so this is intentionally
// minimal.

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ['./src/**/*.{astro,ts,tsx,md,mdx}'],
};
