// Fetches each live tool's own favicon at build time and writes a
// normalised 128x128 PNG to public/favicons/<slug>.png. Run this whenever
// a tool is added or a tool's domain changes: `npm run favicons`.
//
// Deliberately does not use a third party favicon proxy (e.g.
// google.com/s2/favicons): that would leak every visitor's request to a
// third party and breaks if that service is unavailable.

import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { tools } from '../src/data/tools.ts';

const OUT_DIR = fileURLToPath(new URL('../public/favicons/', import.meta.url));
const FETCH_TIMEOUT_MS = 10_000;
const USER_AGENT = 'Mozilla/5.0 (compatible; KitfyFaviconBot/1.0; +https://kitfy.work)';

async function fetchText(url) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: { 'user-agent': USER_AGENT },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: { 'user-agent': USER_AGENT },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return Buffer.from(await res.arrayBuffer());
}

/**
 * Pulls every <link rel="...icon..."> tag out of a page's <head> and picks
 * the most likely candidate: apple-touch-icon first (usually the largest,
 * cleanest asset a site ships), then a plain icon, largest declared size
 * wins ties.
 */
function findIconHref(html, pageUrl) {
  const linkTagRe = /<link\s+[^>]*>/gi;
  const candidates = [];

  for (const [tag] of html.matchAll(linkTagRe)) {
    const relMatch = tag.match(/rel=["']([^"']+)["']/i);
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (!relMatch || !hrefMatch) continue;

    const rel = relMatch[1].toLowerCase();
    if (!rel.includes('icon')) continue;

    const sizesMatch = tag.match(/sizes=["']([^"']+)["']/i);
    const size = sizesMatch ? parseInt(sizesMatch[1], 10) || 0 : 0;
    const isAppleTouch = rel.includes('apple-touch-icon');

    let href;
    try {
      href = new URL(hrefMatch[1], pageUrl).href;
    } catch {
      continue;
    }

    candidates.push({ href, size, isAppleTouch });
  }

  candidates.sort((a, b) => {
    if (a.isAppleTouch !== b.isAppleTouch) return a.isAppleTouch ? -1 : 1;
    return b.size - a.size;
  });

  return candidates[0]?.href ?? null;
}

async function resolveFaviconUrl(pageUrl) {
  try {
    const html = await fetchText(pageUrl);
    const found = findIconHref(html, pageUrl);
    if (found) return found;
  } catch (error) {
    console.warn(`  could not read <head> (${error.message}), trying /favicon.ico`);
  }
  return new URL('/favicon.ico', pageUrl).href;
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });

  const toolsWithUrl = tools.filter((tool) => tool.url);
  let ok = 0;
  let skipped = 0;

  for (const tool of toolsWithUrl) {
    console.log(`${tool.slug}: resolving favicon from ${tool.url}`);
    try {
      const faviconUrl = await resolveFaviconUrl(tool.url);
      const buffer = await fetchBuffer(faviconUrl);

      const outPath = path.join(OUT_DIR, `${tool.slug}.png`);
      await sharp(buffer, { density: 384 })
        .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(outPath);

      console.log(`  saved public/favicons/${tool.slug}.png (from ${faviconUrl})`);
      ok += 1;
    } catch (error) {
      console.warn(`  WARNING: skipping ${tool.slug}, could not resolve a favicon (${error.message})`);
      skipped += 1;
    }
  }

  console.log(`\nDone. ${ok} favicon(s) saved, ${skipped} skipped.`);
}

run();
