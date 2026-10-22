// Works around a Windows-only Next.js static export bug: segment prefetch files should be
// written as flat names like "__next.work.$d$slug.__PAGE__.txt", but on Windows the source
// paths contain backslashes, so they come out as nested folders ("__next.work/$d$slug/...")
// and the client router's prefetch requests 404. This flattens them. On Linux/macOS builds
// (Vercel, GitHub Actions) there is nothing to fix and the script does nothing.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "..", "out");
let moved = 0;

function filesUnder(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? filesUnder(p) : [p];
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of filesUnder(full)) {
        const rel = path.relative(full, file).split(path.sep).join(".");
        fs.renameSync(file, path.join(dir, `${entry.name}.${rel}`));
        moved++;
      }
      fs.rmSync(full, { recursive: true, force: true });
    } else if (entry.name !== "_next" && entry.name !== "media") {
      walk(full);
    }
  }
}

if (fs.existsSync(OUT)) walk(OUT);
if (moved) console.log(`fix-export-segments: flattened ${moved} prefetch files.`);
