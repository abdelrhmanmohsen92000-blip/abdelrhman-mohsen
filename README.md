# Abdelrhman Mohsen: portfolio website

Personal portfolio for Abdelrhman Mohsen, BIM Architect & Architectural Designer.
Built with Next.js 16 (App Router, static export), React 19, TypeScript and Tailwind CSS 4.
The whole site compiles to plain HTML, CSS and JS in `out/`, so it can be hosted anywhere.

- 6 main pages (Home, Work, BIM & documentation, Services, About, Contact) + 24 project pages
- 109 images, served as AVIF/WebP at 3–5 sizes each, with lazy loading and blur placeholders
- No runtime dependencies beyond Next/React; no tracking, no cookies, no third-party requests

See [docs/PROJECT-NOTES.md](docs/PROJECT-NOTES.md) for the content sources, design decisions,
test results and open questions.

---

## Quick start

Requires Node.js 20 or newer (built and tested on Node 24).

```bash
npm install
npm run dev        # http://localhost:3000  (builds image variants first)
```

Production build and local preview of exactly what gets deployed:

```bash
npm run build      # writes out/
npm start          # serves out/ at http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Generates image variants, then starts the dev server |
| `npm run build` | Generates image variants, builds the static site into `out/` |
| `npm start` | Serves `out/` locally (via `npx serve`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run media` | Regenerates image variants from `assets/masters/` (incremental) |
| `npm run media:import` | One-time copy of originals from `D:/por/...` into `assets/masters/` |
| `npm run publish:pages` | Builds the site and publishes it to GitHub Pages (see Deployment) |

Set `SITE_URL` when building for production so canonical links, Open Graph tags and the
sitemap use the real domain:

```bash
SITE_URL=https://your-domain.com npm run build
```

---

## Where things live

```
assets/masters/          Master images, one folder per project (committed)
assets/drafts/           Images for unpublished projects (not built, not deployed)
scripts/
  media-sources.mjs      Provenance: which original file each master came from
  import-masters.mjs     One-time import from the working folders on D:/por
  build-media.mjs        Masters -> public/media/*.avif|webp|jpg + src/content/media.json
  fix-export-segments.mjs  Post-build fix for a Windows-only Next.js export bug
public/cv/               Downloadable CV (PDF)
public/media/            Generated image variants (git-ignored; built into .next/cache/media, then mirrored here)
src/content/
  types.ts               Content types (Project, StoryBlock, Job, ...)
  en/site.ts             Name, contact details, navigation, SEO text, UI labels
  en/profile.ts          Home copy, notes, about, experience, education, services, BIM page
  en/projects.ts         All projects and their case-study stories
  media.json             Generated: image sizes and placeholders (do not edit)
src/app/                 Pages (Next.js App Router)
src/components/          Title block, picture, lightbox, project card, work index, story...
src/fonts/               Self-hosted, trimmed Archivo variable font (+ licence)
```

All copy lives in `src/content/`. Pages and components contain no text of their own, so
editing the site is editing those three files.

---

## Editing content

**Contact details, availability, SEO text:** `src/content/en/site.ts`.
The phone number shows on the Contact page with a WhatsApp link; set `showPhone: false` to hide it.

**Bio, experience, education, certificates, services:** `src/content/en/profile.ts`.

**A project's text:** find it by `slug` in `src/content/en/projects.ts`. Fields left out
(`year`, `area`, `location`...) simply don't appear. Keep the rule the whole site follows:
only state what a document supports.

**The CV:** replace `public/cv/Abdelrhman-Mohsen-CV.pdf` (keep the file name, or change
`contact.cv` in `site.ts`).

**Hiding a project:** set `published: false`. It disappears from listings, the sitemap and
the build.

---

## Adding a new project

1. **Images.** Create `assets/masters/<project-folder>/` and copy in JPG/PNG files.
   Long edge around 3000 px for renders, up to 4200 px for drawings so text stays legible.
   Name drawings with a word like `plan`, `section`, `elevation`, `detail`, `sheet` or
   `drawing` (e.g. `ground-floor-plan.jpg`): drawings are shown on a white sheet, kept sharper
   and never cropped. Everything else is treated as a render.
2. **Variants.** Run `npm run media`. It builds only new or changed images.
3. **Content.** Add an object to the `projects` array in `src/content/en/projects.ts`.
   Copy an existing project as a template. Image ids are the path under `assets/masters`
   without the extension, e.g. `"my-villa/street-view"`.
   - `cover`: the hero image and card thumbnail. Use `coverStyle: "sheet"` for a drawing.
   - `story`: an ordered list of blocks: `text` (heading + paragraphs), `figure`
     (`size: "full" | "wide" | "sheet"`), `pair` (two images side by side) and `grid`
     (three columns). Captions and alt text go with each image.
   - `featured: true` only marks it as featured; the home page shows the slugs listed in
     `home.featured` in `profile.ts`.
4. Check it with `npm run dev`, then `npm run build`.

The order of the `projects` array is the order on the Work page and of the "Next project"
links.

---

## Deployment

The site is a static export, so it can be hosted anywhere.

### Live now: GitHub Pages

**https://abdelrhmanmohsen92000-blip.github.io/abdelrhman-mohsen/**

The built site lives on the `gh-pages` branch, which GitHub Pages serves (repository
**Settings → Pages**: source *Deploy from a branch*, `gh-pages` / root). To publish changes:

1. Edit content, check it with `npm run dev`.
2. Commit and push your changes to `main` (so the source stays in sync).
3. Run `npm run publish:pages`. It builds with the `/abdelrhman-mohsen` base path, adds
   `.nojekyll`, and force-pushes `out/` to `gh-pages`. The update is live in 1–3 minutes.

For a custom domain: add it under **Settings → Pages → Custom domain**, then publish with
`SITE_URL=https://your-domain npm run publish:pages` (no base path is used when `SITE_URL` is set).

### Vercel (alternative)

1. Push this folder to a GitHub repository.
2. In Vercel, **Add New → Project**, import the repository. The Next.js preset is detected;
   no settings need changing (the build runs `npm run build`, output is handled automatically).
3. Add the environment variable `SITE_URL` = your final URL (e.g. `https://abdelrhmanmohsen.com`).
4. Deploy. Add a custom domain under **Settings → Domains** if you have one.

### GitHub Pages with GitHub Actions (alternative to the publish script)

A ready workflow is included as `docs/github-pages-workflow.example.yml`. It builds on every
push to `main` instead of running `npm run publish:pages` yourself:

1. Copy it to `.github/workflows/deploy-pages.yml` and push. Pushing workflow files from the
   GitHub CLI needs the extra scope: `gh auth refresh -s workflow`.
   Then switch **Settings → Pages → Source** to **GitHub Actions**.
2. If the site will live at `https://<user>.github.io/<repo>/`, add repository variables
   (**Settings → Secrets and variables → Actions → Variables**):
   `NEXT_PUBLIC_BASE_PATH` = `/<repo>` and `SITE_URL` = `https://<user>.github.io`.
   For a custom domain or a `<user>.github.io` repository, leave `NEXT_PUBLIC_BASE_PATH` empty
   and set `SITE_URL` to the domain.
3. Push to `main`; the workflow builds and publishes `out/`.

### Any static host (Netlify, Cloudflare Pages, S3, cPanel)

Run `SITE_URL=https://your-domain npm run build` and upload the contents of `out/`.

### Contact form

By default the form opens the visitor's email app with the message filled in (no backend,
nothing stored). To receive messages directly, create a form endpoint at a service such as
Formspree, then set `NEXT_PUBLIC_FORM_ENDPOINT` to its URL at build time. The form then posts
there and shows a confirmation.

---

## Performance notes

- Pages are pre-rendered HTML with the CSS inlined (`experimental.inlineCss`), so the first
  paint needs no extra request. Most visitors come once (recruiters, clients), which is the case
  inlining is meant for.
- Each page preloads its main image from the `<head>`; every other image is lazy-loaded.
- Images: AVIF first, WebP fallback, JPEG for very old browsers and social cards; widths of
  480–2600 px for renders and 800–3600 px for drawings, chosen by the browser via `sizes`.
- Font: Archivo variable, trimmed with fontTools to width 75–125, weight 330–600 and Latin
  characters: 35 KB instead of 90 KB.
- Motion is limited to one entrance on the home page, implemented as overlays so it never
  hides the images themselves, and switched off for `prefers-reduced-motion`.
- Client JavaScript is limited to navigation, the work filter, the lightbox and the form.

## Fonts

`src/fonts/archivo-variable.woff2` is a subset of Archivo (SIL Open Font License, see
`src/fonts/OFL.txt`). To add characters (for example for names with accents) or Arabic, start
from the full Archivo variable font and re-run the fontTools subsetting described in
`docs/PROJECT-NOTES.md`. Arabic needs a separate family (IBM Plex Sans Arabic is a good match).

---

## Adding Arabic later

The site was built so a second language doesn't need a rebuild:

- All copy is in `src/content/en/`. Create `src/content/ar/` with the same exports.
- Layout uses logical CSS properties (`inline-start/end`, `ps/pe`, `ms/me`), so `dir="rtl"`
  mirrors the title block, lists and captions. The lightbox arrow keys already follow `dir`.
- Add `"ar"` to `locales` and `localeDir` in `src/content/index.ts`, add an Arabic font, and
  serve the Arabic pages from an `app/ar/` route that renders the same components with the
  Arabic content.

## Roadmap

- Settle the remaining questions in `docs/PROJECT-NOTES.md` (CV placeholder, certificate date).
- Correct project years where the 2025 default isn't right, and add more drawings for projects
  that currently show renders only.
- Arabic version.
- A downloadable PDF portfolio (8–15 pages, under 10 MB) generated from the same content.
- Replace the 640 px portrait with a higher-resolution photo.
- Optional: Formspree (or similar) for direct form delivery; privacy-friendly analytics
  (for example Plausible) if visitor numbers matter.
