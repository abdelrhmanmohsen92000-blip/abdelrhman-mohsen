// Generates responsive variants for every master in assets/masters/ and writes
// src/content/media.json (dimensions, available widths, blur placeholder).
//
// Variants are generated into .next/cache/media/ (which Vercel and most CI caches keep between
// builds) and then mirrored into public/media/, so only new or changed masters are encoded.
// A master counts as changed when its content hash changes; file dates are ignored because a
// fresh git checkout resets them.
//
// Runs automatically before `npm run build` and `npm run dev`.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { mediaSources } from "./media-sources.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const MASTERS = path.join(ROOT, "assets", "masters");
const CACHE = path.join(ROOT, ".next", "cache", "media");
const PUBLIC = path.join(ROOT, "public", "media");
const MANIFEST = path.join(ROOT, "src", "content", "media.json");

// Drawings get a wider ladder and higher quality: thin lines and small annotations smear first.
const LADDER = {
  photo: { widths: [480, 800, 1200, 1800, 2600], avif: 52, webp: 76 },
  drawing: { widths: [800, 1200, 1800, 2600, 3600], avif: 64, webp: 86 },
};

// Kind comes from media-sources.mjs. Masters added by hand fall back to their file name:
// name drawings with a word like plan, section, elevation, detail, sheet or drawing.
const knownKinds = new Map(mediaSources.map((m) => [m.id, m.kind === "photo" ? "photo" : "drawing"]));
const kindOf = (id) =>
  knownKinds.get(id) ??
  (/(plan|section|elevation|sheet|detail|drawing|axon|cutaway|exploded|schedule)/.test(id.split("/").pop()) ? "drawing" : "photo");

function listFiles(dir, base = "", pattern = /\.(jpe?g|png|webp)$/i) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...listFiles(path.join(dir, entry.name), rel, pattern));
    else if (pattern.test(entry.name)) out.push(rel);
  }
  return out;
}

const hashOf = (file) => crypto.createHash("sha1").update(fs.readFileSync(file)).digest("hex").slice(0, 16);

const previous = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};
const manifest = {};
const files = listFiles(MASTERS).sort();
let built = 0;

for (const rel of files) {
  const id = rel.replace(/\.(jpe?g|png|webp)$/i, "");
  const src = path.join(MASTERS, rel);
  const kind = kindOf(id);
  const hash = hashOf(src);
  const { widths: ladder, avif, webp } = LADDER[kind];

  const meta = await sharp(src).metadata();
  const widths = ladder.filter((w) => w < meta.width);
  widths.push(Math.min(meta.width, ladder.at(-1)));
  const uniqueWidths = [...new Set(widths)].sort((a, b) => a - b);

  const outBase = path.join(CACHE, id);
  const fallback = `${outBase}-1200.jpg`;
  const outputs = uniqueWidths.flatMap((w) => [`${outBase}-${w}.avif`, `${outBase}-${w}.webp`]).concat(fallback);
  const fresh =
    previous[id]?.hash === hash && previous[id].kind === kind && outputs.every((f) => fs.existsSync(f));

  if (fresh) {
    manifest[id] = previous[id];
    continue;
  }

  fs.mkdirSync(path.dirname(outBase), { recursive: true });
  await Promise.all(
    uniqueWidths.flatMap((w) => {
      const resized = sharp(src).resize({ width: w, withoutEnlargement: true });
      return [
        resized.clone().avif({ quality: avif, effort: 4 }).toFile(`${outBase}-${w}.avif`),
        resized.clone().webp({ quality: webp, effort: 5, smartSubsample: true }).toFile(`${outBase}-${w}.webp`),
      ];
    }),
  );
  // JPEG fallback: <img src> for very old browsers and the Open Graph image for social previews.
  await sharp(src).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(fallback);

  const tiny = await sharp(src).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  const { dominant } = await sharp(src).stats();
  manifest[id] = {
    width: meta.width,
    height: meta.height,
    kind,
    widths: uniqueWidths,
    blur: `data:image/webp;base64,${tiny.toString("base64")}`,
    color: `rgb(${dominant.r} ${dominant.g} ${dominant.b})`,
    hash,
  };
  built++;
  process.stdout.write(`  ${id} (${uniqueWidths.join(", ")})\n`);
}

// Mirror the cache into public/media: copy what is new or changed, delete what no longer belongs.
const wanted = new Set(
  Object.entries(manifest).flatMap(([id, m]) =>
    m.widths.flatMap((w) => [`${id}-${w}.avif`, `${id}-${w}.webp`]).concat(`${id}-1200.jpg`),
  ),
);
let copied = 0;
for (const rel of wanted) {
  const from = path.join(CACHE, rel);
  const to = path.join(PUBLIC, rel);
  const a = fs.statSync(from);
  if (!fs.existsSync(to) || fs.statSync(to).size !== a.size) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
    copied++;
  }
}
for (const dir of [CACHE, PUBLIC]) {
  for (const rel of listFiles(dir, "", /./)) {
    if (!wanted.has(rel)) fs.rmSync(path.join(dir, rel));
  }
  // Drop folders emptied above.
  for (const entry of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
    const p = path.join(dir, entry);
    if (fs.statSync(p).isDirectory() && fs.readdirSync(p).length === 0) fs.rmdirSync(p);
  }
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`media: ${files.length} masters, ${built} encoded, ${copied} files copied to public/media.`);
