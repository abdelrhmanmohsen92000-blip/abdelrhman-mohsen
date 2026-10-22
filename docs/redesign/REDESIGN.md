# Portfolio redesign: creative-director pass (22 October 2026)

Not published. Everything below runs locally; publishing waits for Abdelrhman's approval
(`npm run publish:pages`).

## 1. Skills and tools actually used

| Skill / tool | How it was used |
| --- | --- |
| `frontend-design` skill | Loaded and followed: subject-led direction, three concepts weighed against the real images, a token plan reviewed for generic defaults, one bold idea, screenshot-based self-critique in passes |
| Built-in browser pane | Live DOM checks of the motion system, header states, filter, lightbox, mobile menu, overflow at 375 px |
| Headless Chrome | Viewport screenshots, including a forced `prefers-reduced-motion` run |
| Lighthouse 12 (via npx) | Full-page mobile (412 px, real device emulation) and desktop screenshots, plus scores, for every before/after capture |
| sharp | Contact sheets, perceptual-hash duplicate detection, image inventory |
| Considered, not used | `gsap-*`, `lenis`, `react-bits`: the motion brief is met with CSS (including scroll-driven animations) and one 40-line IntersectionObserver, so no animation library was added |

## 2. Audit: the ten biggest weaknesses of the previous design

1. **The hero split attention.** A render and a drawing shared the screen at half size, so neither read as a hero, and the drawing half was mostly white space.
2. **The headline had no presence on the imagery.** It sat below the images, so the first screen read like a document, not a portfolio.
3. **A fixed 300 px sidebar on every page** took a quarter of the width from the images and read as an admin dashboard.
4. **The hero height followed the viewport with no cap.** On tall windows it became a 2,700 px column; on phones it was two stacked panels before any message.
5. **Selected work opened with the weakest visual,** a drawing in a white box. Wide renders were also cropped to portrait (Estraha).
6. **One flat pale palette from top to bottom.** No tonal rhythm, and renders lost their drama on light grey.
7. **Flat typographic hierarchy.** Display type appeared only in the hero, and project names were small subheadings.
8. **Almost no motion.** One load animation, no scroll reveals, and darkening as the only hover.
9. **The strongest images were underused.** Lamar frontage, M3MAR, Buraydah and the courtyard either sat outside the homepage or appeared as small cards.
10. **The expertise and closing sections were text boxes.** The "Two ways in" block, the "General notes" list and an email link on paper did little for recruiters or clients.

Content problems found during the audit are covered in §7.

## 3. Image art direction

- **Inventory:** `contact-sheets/inventory.json` and `asset-usage.csv` cover all 357 image files:
  - 109 masters
  - 247 originals in `D:/por/Designs`
  - 1 unreadable file
- **Per-file details:** dimensions, aspect ratio, perceptual-hash duplicates, which master each original became, and where it is placed or why it isn't.
- **Coverage:** all 109 masters are now published somewhere on the site.
- **Contact sheets:** `contact-sheets/masters-01…06.jpg` (labelled with id, size and ratio) and `originals-01…13.jpg` (labelled with file, size and use).

**Ranking by visual inspection** (impact 1–5; composition, light and material, camera, resolution):

| Rank | Image | Impact | Why | Placement |
| --- | --- | --- | --- | --- |
| 1 | `lamar-business-park/street-wide` (3200×1702) | 5 | Crisp daylight, strong repetitive rhythm, open sky for type, contemporary and commercial | **Homepage hero** and project hero |
| 2 | `lamar-business-park/frontage` | 5 | Frontal, the park sign gives the place a name, rich detail | Homepage full-bleed feature |
| 3 | `buraydah-town-houses/cover-render` | 5 | Sculptural terracotta volumes, soft light, the most recent work | Homepage layered feature (with the 3D plan) |
| 4 | `courtyard/water-court` | 4.5 | Atmospheric, reflections, framed arches | Homepage feature |
| 5 | `estraha/pool-terrace` | 4.5 | Long perspective, water and material contrast | Homepage feature |
| 6 | `moroccan-living/living` | 4.5 | The best interior: calm palette, clear concept | Homepage feature |
| 7 | `m3mar-villa/corner` / `day` | 4 | Strong classical silhouette, crisp daylight | Homepage feature, project hero |
| 8 | `yasser-villa/master-suite` | 4 | Refined materials, but a symmetrical "catalogue" camera | Project page, index |
| 9 | `qatar-contemporary-villas/street` | 4 | Clean rhythm, but the only source is AI-sized (see below) | Project page only |
| 10 | `square-business-hub/street` | 4 | Lively street, though slightly busy | Project hero |
| — | Drawings: `corner-villa/cutaway`, `supply-building/elevation-service`, `meydan-villa/pool-details`, `buraydah-town-houses/ground-3d` | 5 (technical) | The clearest proof of the BIM capability | Homepage drawing chapter, BIM page, layered feature |

**Rules applied**
- Each homepage image appears once.
- Wide renders are not forced into portrait.
- The full-bleed image switches from 2:1 to 4:3 on phones, so it isn't cut to a strip.
- Drawings are never cropped: they sit inside sheet frames with `object-fit: contain`.

**Exclusions** (full reasons per file in `asset-usage.csv`):

| Category | Files |
| --- | --- |
| AI-generated or AI-edited variants (`New folder`, `ai/`, `Claude outputs`) | 16 |
| Academic boards and the 2022 pavilion study (role undocumented) | 16 |
| Unlabelled showroom renders, or projects not identified | 6 |
| Test, black-and-white or effect copies | 4 |
| Alternate sky, time or angle of a published render | 10 |
| Additional or duplicate sheets of published drawing sets | 33 |
| Unlabelled 1200 px room renders, where similar or stronger rooms are already shown | 43 |

## 4. Creative direction

| Concept | Idea | Fit with the real assets | Verdict |
| --- | --- | --- | --- |
| A. Cinematic architectural editorial | Dark chapters, full-bleed renders, large editorial type, slow reveals | Strong: about 30 high-resolution daylight renders gain drama on graphite | **Chosen, adapted** |
| B. Minimal luxury studio | Warm off-white, tiny type, small centred images | Undersells the renders and the BIM side; drifts toward the cream "luxury" template | Rejected |
| C. Bold experimental | Kinetic oversized type, horizontal scroll, cursor-follow images | Memorable, but risky for recruiters, accessibility and mobile performance | Rejected |

**Adaptation: "render and drawing"**
- The page alternates dark chapters, where renders are screened full-bleed, with paper chapters, where drawings sit on white sheets.
- The layout itself says "designed to be seen / modelled to be built", with no need to place two images side by side.
- The one bold element is the full-screen hero, with the headline set into the render.

**Tokens**

| Role | Value |
| --- | --- |
| Graphite | `#181a1c` |
| Carbon | `#222527` |
| Bone (text on dark) | `#ecebe6` |
| Paper | `#f1f2ef` |
| Ink | `#1e2226` |
| Accent | Glazing blue, `#3c6e9f` on light and `#9cc0e0` on dark, taken from the glazing on the Revit elevations; used only for focus and active states |

**Type:** one family, Archivo variable.
- Expanded light (width 125) carries the editorial voice: hero and section titles.
- Condensed medium (width 78) gives project names a technical, drawing-lettering voice.

**Avoided defaults:** cream with serif, a single acid accent on black, all-caps eyebrow labels, `01/02/03` markers on content that isn't a sequence, and `→` on links.

## 5. The new homepage

1. **Hero:** one full-screen render (Lamar Business Park). The headline "Designed to be seen. / Modelled to be built." is set into it at expanded width, on two rows. Below sit the positioning line, "See selected work" and "Download CV", and an image credit linking to the project. The header floats transparently over the image.
2. **Statement:** the introduction as large text on graphite, with links to About, BIM and Contact.
3. **Selected work:** an editorial sequence of six projects, each with its own composition:
   - full-bleed frontage with an offset detail image (Lamar);
   - the render layered with its Revit 3D plan (Buraydah);
   - alternating 7/12 images beside text (M3MAR, Estraha, Moroccan living, courtyard);
   - each has a facts line, a condensed project name, one specific sentence and a link.
4. **Expertise (paper chapter):** "Two halves of one practice". Facts are set as a drawing title block (4+ years, 150,000 m², LOD 350+, countries, diploma), followed by Design and BIM & delivery columns and three drawing sheets that link to their projects.
5. **More projects:** a compact two-column index with thumbnails for the other 18.
6. **Closing:** "Hiring for BIM or design work, or planning a building?" The email is set large over a dimmed courtyard render, with Email, WhatsApp, LinkedIn and CV buttons.

**Site-wide changes**
- The sidebar is replaced by a top header that is transparent with light type over dark heroes and turns solid on scroll, with a full-screen menu on phones.
- Project pages with a render cover get a full-bleed dark hero with the title set into the image.
- Drawing-led projects keep the paper sheet header.
- The Work grid is reordered so every row of three mixes two renders and one drawing, led by the strongest work.

## 6. Motion

| Motion | Where | How |
| --- | --- | --- |
| Hero settle | Home hero and project heroes | The image scales from 1.09 to 1 over 2.6 s (transform only, so it doesn't delay LCP) |
| Text reveal | Hero headline lines, project titles in heroes | Each line rises out of an overflow mask, staggered 120 ms |
| Fade-in | Hero kicker and CTAs | Delayed opacity |
| Scroll-triggered reveal | Section titles, statement, feature text, facts, drawing sheets | `data-reveal`: rise and fade when 12% visible (one IntersectionObserver) |
| Image masking | Featured images | `data-reveal="mask"`: the clip opens from the bottom while the image settles from 1.12 to 1 |
| Subtle parallax | Featured images | CSS scroll-driven animation (`animation-timeline: view()`), ±4% drift, no JS, no scroll hijacking; skipped where unsupported |
| Hover | Project images and cards | Slow 1.035 scale inside a fixed frame; title colour shift |
| Navigation | Header and routes | Header turns solid on scroll; nav underline draws in; page content fades up on client navigation (`app/template.tsx`), never on first load |
| Reduced motion | Everything | All of the above is off under `prefers-reduced-motion`. Verified with Chrome's forced flag; this caught and fixed a headline-wrapping bug that only appeared with motion off |
| Fallback | No JS or blocked script | A boot script reveals everything after 3 s if the app script never starts, so content is never stuck hidden |

## 7. Content accuracy fixes

- **Dates:** the 19 default "2025" years were removed, following the new rule to leave uncertain dates unpublished. This supersedes the earlier "assume 2025" instruction. Years now appear only where a source documents them: Supply Administration 2025, Square Business Hub 2025, Meydan 2025, BIM diploma 2025, Buraydah 2026.
- **Misleading caption:** "M3MAR Villa at night" showed a daytime render. The file (`2 (14).jpg`) is a second daytime view, so the master was renamed `corner` and the summary and captions no longer claim a night render. The only night version (PPTX, AI-typical 2752×1536, no original) remains excluded.
- **Misleading caption:** the mall's "night-2" is a daytime render. It was renamed `day` and captioned correctly; the summary now says "rendered at night and by day".
- **Unused drawing:** the corner villa's upper-floor plan was imported but never placed. It is now in the case study.
- **Numbering:** checked. Numbered markers are used only for real sequences (BIM workflow 01–05, services process 01–04); none are duplicated or broken.
- **Links:** the CV download (with and without the GitHub Pages base path), email, WhatsApp and LinkedIn all resolve. 3,273 internal references were checked in the base-path build, with none missing.
- **Placeholders:** none on the site. The CV PDF itself still has "Portfolio@google.com" in its header (§10).

## 8. Before and after screenshots

- `before/`: the live site before the redesign. Full-page mobile and desktop (`home-*.webp`, `work_lamar-business-park-*.webp`), viewport captures, and `scores.txt`.
- `after/pass1/`, `after/pass2/`: the two refinement passes.
  - Pass 1 to pass 2 changes: the four-line hero headline became two rows with a left shade; the statement and project-title sizes came down; the Buraydah drawing card no longer overlaps the title; the full-bleed image is 4:3 on phones.
- `after/final/`: final full-page captures and scores for Home, Work, Lamar, Buraydah, BIM, About and Contact.
- `after/reduced-motion-*.png`: forced reduced-motion captures.
- `before-after-home.jpg`: the home first screen, before (left) and after (right).

## 9. Build and test results

See `after/final/scores.txt` for the final Lighthouse numbers (all were run, none are estimated).

- `npm run lint`: clean. `tsc --noEmit`: clean. `npm run build`: 35 static routes.
- Base-path (GitHub Pages) build: 3,273 internal links and images, all prefixed and present.
- Browser checks:
  - Hero animation completes, and reveals fire on scroll.
  - Scroll-driven drift is supported in Chromium; the header switches state on scroll.
  - Work filter and URL state work; lightbox open, counter and arrow keys work.
  - Mobile menu works, and there is no horizontal overflow at 375 px.

## 10. Remaining issues

- **The CV PDF** has a placeholder `Portfolio@google.com` in its header. It needs fixing in the CV source and re-exporting; the site only links to the file.
- **The portrait is 640 px.** A higher-resolution photo would let the About page use it larger.
- **Contemporary Villas, Qatar** uses the only available copy (PPTX, 2752×1536); the original render would be safer.
- **Project years** are missing for most projects until documented.
- **Simulated mobile LCP** in Lighthouse is inflated on localhost by Next.js scripts and prefetches. Live measurements of the previous version were 2.0–2.8 s; re-measure after publishing.
- **Not published:** publishing waits for approval. Run `npm run publish:pages`, then commit and push `main`.
