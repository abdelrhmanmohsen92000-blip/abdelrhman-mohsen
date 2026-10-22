// One-time import: copies originals listed in media-sources.mjs into assets/masters/<id>.jpg,
// downsized to a sensible master size. Safe to re-run; existing masters are skipped unless
// --force is passed. Originals are only read, never modified.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { mediaSources } from "./media-sources.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "assets", "masters");
const DRAFTS = path.join(ROOT, "assets", "drafts");
const force = process.argv.includes("--force");
// --only=drawing re-imports just one kind (e.g. after changing how drawings are prepared).
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);

// Longest edge of the stored master, per kind. Drawings stay larger so annotations remain legible.
const MAX_EDGE = { photo: 3200, drawing: 4200, screen: 2000 };

let done = 0;
let skipped = 0;
const missing = [];

for (const item of mediaSources) {
  if (only && item.kind !== only) continue;
  const dest = path.join(item.draft ? DRAFTS : OUT, `${item.id}.jpg`);
  if (!force && fs.existsSync(dest)) {
    skipped++;
    continue;
  }
  if (!fs.existsSync(item.src)) {
    missing.push(item);
    continue;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  let img = sharp(item.src, { limitInputPixels: false }).rotate();
  if (item.crop) img = img.extract(item.crop);
  if (item.flip) img = img.flip();
  // Drawings: trim the empty paper around the linework; the site adds its own sheet margin.
  if (item.kind === "drawing") {
    const buf = await img.flatten({ background: "#ffffff" }).toBuffer();
    img = sharp(buf, { limitInputPixels: false }).trim({ background: "#ffffff", threshold: 18 });
  }
  const max = MAX_EDGE[item.kind];
  await img
    .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: item.kind === "photo" ? 90 : 92, mozjpeg: true, chromaSubsampling: item.kind === "photo" ? "4:2:0" : "4:4:4" })
    .toFile(dest);
  done++;
  process.stdout.write(`  ${item.id}\n`);
}

console.log(`\nImported ${done}, skipped ${skipped} existing.`);
if (missing.length) {
  console.warn(`Missing sources (${missing.length}):`);
  for (const m of missing) console.warn(`  ${m.id} <- ${m.src}`);
  process.exitCode = 1;
}
