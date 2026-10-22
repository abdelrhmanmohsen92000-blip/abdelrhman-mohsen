# CLAUDE.md: Abdelrhman Mohsen portfolio (Next.js)

Read this, `README.md` and `docs/PROJECT-NOTES.md` before changing anything.

## What this is
Static-exported Next.js 16 + Tailwind 4 portfolio for Abdelrhman Mohsen, BIM architect and
architectural designer. It replaces the older static HTML site in `D:/por/personal porfolio/`,
which is kept untouched as a reference. Build output is `out/`. Nothing is deployed yet.

## Rules that matter most
- **Never invent facts.** Every project field, metric, date and role must trace to the CV, the
  2026 portfolio PDF/PPTX, a drawing title block, a certificate or
  `D:/por/Designs/Upwork-Ready/00-form-text.md`. If a source doesn't give a field, leave it out.
- **Captions follow the 2026 portfolio PDF**, not the earlier static site. Several old captions
  were wrong (see PROJECT-NOTES §3).
- **No AI-altered images.** Use original renders. Exclusions are listed in PROJECT-NOTES §3.
- **Coursework stays labelled as coursework** (KAITECH diploma project).
- Confirmed by Abdelrhman on 22 Oct 2026: Buraydah Town Houses is his work (published);
  Lamar Business Park is the CV's "Lamar Gate"; the phone is shown on Contact; projects with
  no documented year show 2025 (his instruction, so correct individual years when known).
- Images for any future unpublished project go in `assets/drafts/` (not built or deployed).
- All copy lives in `src/content/en/*`. Components hold no copy (Arabic is planned).

## Design system ("Title block")
Paper `#f1f2ef`, sheet white, ink `#1e2226`, lead `#596066`, redline `#c4321f` (the only
accent). Only typeface: self-hosted Archivo variable, using the width axis (expanded display,
condensed labels). Drawings sit on white sheets; renders bleed. One motion moment (home hero
veils). Component CSS is in `@layer components` so Tailwind utilities can override it. Keep
it there. Use logical properties (ps/pe, start/end) for RTL.

## Images
Masters in `assets/masters/<project>/<name>.jpg`. `npm run media` builds the variants and
`src/content/media.json`. Image kind (drawing/photo) comes from `scripts/media-sources.mjs`,
or for hand-added files from the file name (`plan`, `section`, `elevation`, `detail`, `sheet`,
`drawing`...). A wrong kind puts a render on a white sheet, so name files accordingly.

## Checks after changes
`npm run lint`, `npm run build` (must pass), then preview `out/`: nav, /work filter and index,
lightbox, mobile at 375 px with no horizontal overflow. On Windows the `postbuild` script
fixes a Next.js export bug with prefetch file names; keep it.
