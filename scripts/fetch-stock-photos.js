#!/usr/bin/env node

/**
 * Fetch stock photos from Pexels or Unsplash and save to public/images/.
 *
 * Usage:
 *   node scripts/fetch-stock-photos.js --query "team meeting" --count 3 --size medium
 *   node scripts/fetch-stock-photos.js --query "abstract purple" --count 1 --name hero
 *
 * Environment:
 *   PEXELS_API_KEY   — required (get free key at https://www.pexels.com/api/)
 *   UNSPLASH_ACCESS_KEY — optional fallback
 *
 * Options:
 *   --query   Search term (required)
 *   --count   Number of images (default: 1)
 *   --size    Pexels size: small | medium | large | original (default: medium)
 *   --name    Custom filename prefix (default: derived from query)
 *   --dir     Output directory relative to project root (default: public/images)
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const args = process.argv.slice(2);

function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

const query = getArg('query');
const count = parseInt(getArg('count') || '1', 10);
const size = getArg('size') || 'medium';
const namePrefix = getArg('name') || null;
const outDir = getArg('dir') || 'public/images';

if (!query) {
  console.error('Usage: node scripts/fetch-stock-photos.js --query "search term" [--count N] [--size small|medium|large] [--name prefix] [--dir path]');
  process.exit(1);
}

const PEXELS_KEY = process.env.PEXELS_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!PEXELS_KEY && !UNSPLASH_KEY) {
  console.error('Error: Set PEXELS_API_KEY or UNSPLASH_ACCESS_KEY in your environment.');
  console.error('  Pexels: https://www.pexels.com/api/ (free, instant)');
  console.error('  Unsplash: https://unsplash.com/developers (free, instant)');
  process.exit(1);
}

const projectRoot = resolve(process.cwd());
const outputPath = join(projectRoot, outDir);

if (!existsSync(outputPath)) {
  mkdirSync(outputPath, { recursive: true });
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function fetchFromPexels() {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: PEXELS_KEY },
  });

  if (!res.ok) {
    throw new Error(`Pexels API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (!data.photos || data.photos.length === 0) {
    throw new Error(`No photos found for "${query}"`);
  }

  const sizeMap = { small: 'small', medium: 'medium', large: 'large', original: 'original' };
  const sizeKey = sizeMap[size] || 'medium';

  return data.photos.map((photo) => ({
    url: photo.src[sizeKey] || photo.src.medium,
    alt: photo.alt || query,
    photographer: photo.photographer,
    source: 'Pexels',
    sourceUrl: photo.url,
  }));
}

async function fetchFromUnsplash() {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });

  if (!res.ok) {
    throw new Error(`Unsplash API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`No photos found for "${query}"`);
  }

  const sizeMap = { small: 'small', medium: 'regular', large: 'full', original: 'raw' };
  const sizeKey = sizeMap[size] || 'regular';

  return data.results.map((photo) => ({
    url: photo.urls[sizeKey] || photo.urls.regular,
    alt: photo.alt_description || query,
    photographer: photo.user.name,
    source: 'Unsplash',
    sourceUrl: photo.links.html,
  }));
}

async function downloadImage(imageUrl, filePath) {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Failed to download: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(filePath, buffer);
  return buffer.length;
}

async function main() {
  console.log(`Searching "${query}" (${count} images, ${size} size)...`);

  let photos;
  try {
    if (PEXELS_KEY) {
      photos = await fetchFromPexels();
      console.log(`Found ${photos.length} photos on Pexels`);
    } else {
      photos = await fetchFromUnsplash();
      console.log(`Found ${photos.length} photos on Unsplash`);
    }
  } catch (err) {
    // Try fallback
    if (PEXELS_KEY && UNSPLASH_KEY) {
      console.log(`Primary failed, trying Unsplash fallback...`);
      photos = await fetchFromUnsplash();
    } else {
      console.error(err.message);
      process.exit(1);
    }
  }

  const slug = namePrefix || slugify(query);
  const results = [];

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const ext = photo.url.includes('.png') ? 'png' : 'jpg';
    const filename = photos.length === 1 ? `${slug}.${ext}` : `${slug}-${i + 1}.${ext}`;
    const filePath = join(outputPath, filename);

    process.stdout.write(`  Downloading ${filename}...`);
    const bytes = await downloadImage(photo.url, filePath);
    const kb = Math.round(bytes / 1024);
    console.log(` ${kb}KB`);

    results.push({
      file: `/${outDir.replace(/^public\/?/, '')}/${filename}`,
      alt: photo.alt,
      photographer: photo.photographer,
      source: photo.source,
      sourceUrl: photo.sourceUrl,
    });
  }

  console.log('\nDone. Files saved:');
  for (const r of results) {
    console.log(`  ${r.file} — by ${r.photographer} (${r.source})`);
  }

  // Output attribution reminder
  console.log('\nAttribution (required by license):');
  for (const r of results) {
    console.log(`  Photo by ${r.photographer} on ${r.source}: ${r.sourceUrl}`);
  }
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
