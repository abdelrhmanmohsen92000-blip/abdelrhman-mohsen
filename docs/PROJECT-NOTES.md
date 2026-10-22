# Project notes

Decisions, sources and test results for the portfolio, written on 21–22 October 2026.

Published on 22 October 2026 at https://abdelrhmanmohsen92000-blip.github.io/abdelrhman-mohsen/
(GitHub Pages, `gh-pages` branch, via `npm run publish:pages`).

## 1. Skills and tools: what was used and why

| Skill / tool | Used for | Status |
| --- | --- | --- |
| `frontend-design` skill | Design process: subject-led direction, token plan, avoiding generic AI-site patterns, one bold idea, restraint | Loaded and followed |
| General-purpose research agent (web search + live browsing) | Studied 16 architecture, BIM, interior, landscape and archviz portfolio sites, plus hiring-manager guidance for BIM portfolios | Ran; findings summarised in §4 |
| Built-in browser (Claude Browser pane) | Visual review at 1440×900 and 375×812, filter/index/lightbox/menu tests, overflow checks | Used throughout |
| Bundled Next.js 16 docs (`node_modules/next/dist/docs`) | Static export, `generateStaticParams`, metadata, `inlineCss`, next/font | Read before use |
| `pdftotext`, PyMuPDF (temporary venv) | Text from the CV, certificates and portfolio PDFs; page renders of the portfolio and the Buraydah set; title-block reading | Used |
| `sharp` (dev dependency) | Contact sheets for reviewing ~300 images; master import; AVIF/WebP generation | Used |
| fontTools (temporary venv) | Subsetting and instancing Archivo (90 KB → 35 KB) | Used |
| Lighthouse 12 (via `npx`, not a dependency) | Performance, accessibility, best-practice and SEO audits | Used, results in §7 |
| Skills considered but not used | `brainstorming` (its interactive Q&A conflicts with the brief's "work autonomously"), `ui-ux-pro-max`, `gsap-*`/`lenis` (no animation library needed), `webapp-testing` (the browser pane covered it), 21st.dev skills (no component library wanted) | Not used |

No MCP integration (Revit, Canva, Drive, Gmail) was needed. The site was published to GitHub
Pages with the GitHub CLI after Abdelrhman asked for it.

## 2. Sources of truth

| Source | What it provided |
| --- | --- |
| `personal porfolio/Abdelrhman_Mohsen_BIM_Architect_CV.pdf` (2026) | Summary, experience with dates, education, skills, software, languages, the six CV projects |
| `Abdelrhman_Mohsen_BIM_Architect_Portfoilo oo.pdf` (Jun 2026) | Project names, locations, areas and years printed under each image |
| `Portfolio_EXPANDED_Final_Abdelrhman_Mohsen 2.pptx` | Full-resolution versions of portfolio images (extracted, not modified) |
| `Abdelrhmam Mohsen Zaki.pdf` | KAITECH Architectural BIM Track: 300 h, 93.2%, 3 Aug 2024–15 Apr 2025, ID R11-B-A-65761 |
| `AAP Course_…_Architectural BIM Diploma.pdf` | Autodesk AAP certificate, Revit 2024, 101+ h, No. EM304574098758595806229 |
| `Abdelrhman Mohsen.pdf` | Actually the ISO 19650 in Practice workshop certificate (KAITECH, KT-WS-ISO-56742), not a CV |
| `Designs/` and `Designs/Details/` | Original renders and drawing sheets (title blocks read for owner, consultant, location, date) |
| `Designs/Upwork-Ready/00-form-text.md` | Role and scope wording for six project packages |
| `2602-BURAYDAH-ARCH-  10-10-2026.pdf` | Buraydah Town Houses drawing set (Forma Atelier), 52 sheets |
| Earlier static site (`personal porfolio/`) and its `CLAUDE.md` | Contact details, earlier verification notes |

Rule applied everywhere: a field appears only if one of these documents supports it.

## 3. Corrections and findings

**Wrong captions on the earlier static site** (checked against the 2026 portfolio PDF, pp. 22–27).
The new site uses the PDF's attributions:

| Image | Earlier site said | Portfolio PDF says |
| --- | --- | --- |
| White classical villa, yellow car (day/night) | "Classical villa" (unnamed) | **M3MAR Villa**, Qatar, 600 m² |
| Beige mansard-roof villa | M3MAR Villa, Qatar, 600 m² | Villa, classical, **Qatar, 800 m²** |
| Three white contemporary villas | Master plan aerial, Egypt, 50,000 m² | Villa, contemporary, **Qatar, 400 m²** |
| White pavilion with lounge seating | Villa, contemporary, Qatar | **ESTRA7A**, Saudi Arabia, 350 m² |
| Pool with sofas at dusk | Mall, night, New Damietta | **ESTRA7A**, landscape |
| Plaza with statue and coffee kiosk | ESTRA7A | **Commercial facade, New Damietta** |
| Circular aerial master plan | (not used) | **Master plan, Egypt, 50,000 m²** |

**New confirmed projects from drawing title blocks**
- Pool and garden detail sheets in `Designs/Details/3–5.jpg` are **Meydan Villa 1010**, B+G+1,
  Meydan, Dubai (detailed design, revisions May–Aug 2025). This is the CV's "Meydan Villa".
  The client and consultant names stay on the sheets but are not repeated in the text.
- `Designs/Details/Supply chain/` is the **Supply Administration Building & its Related
  Services**, owner King Saud Medical City, consultant Al Shabana Co., issued for tender.
  This is the CV's "Supply Chain (Riyadh)".
- The clash reports and Autodesk Forma studies are from the **KAITECH diploma graduation
  project** (a school; file names follow `KTR11-G27-…`, matching certificate round R11). They
  are labelled as coursework.

**Images deliberately excluded**
- Files whose dimensions show AI reframing or upscaling (portrait 1536×2752 and 1792×2400 PNG
  versions of landscape renders in the PPTX), where the original render exists. The originals
  are used instead.
- The PPTX image of a woman reading in a chair: an AI-edited version of a render that has no
  person. `Designs/New folder/` (`create_same_image_*`, `add_seating_woman_*`) is excluded for
  the same reason.
- One exception: *Contemporary Villas, Qatar* uses the only copy available (PPTX, 2752×1536).
  Replace it with the original render if you have it.
- Unlabelled car showroom renders and the 2024 academic boards (Ribat, stingray pavilion):
  their provenance and role are unclear.

## 4. Research summary (from the research agent)

Patterns that read as premium on architecture sites: one strong image with little copy, a
short nav that stays visible, one grotesk family in small sizes with large type kept for
names, ruled fact tables (OMA, KieranTimberlake, MVRDV), and captions that explain rather than
label. Recruiters at AEC firms want each project's role stated, drawings and not only renders,
clash before/after evidence, LOD and software per project, and a prominent CV. Avoid
preloaders, a hamburger-only desktop nav, blueprint-blue grids and gold-serif "luxury".

## 5. Creative direction

Three directions were weighed against the actual assets:

1. **Title block** (chosen). The site is laid out like a drawing sheet: a fixed title-block
   column with name, navigation, status and CV; drawings on white sheets; renders full-bleed;
   one redline accent; a ruled facts table on every project.
2. **Gallery dark**. Cinematic renders on graphite. Strong for renders but harsh for the many
   white drawing sheets, and close to a generic luxury template.
3. **Stone editorial**. Warm stone and a serif display face. Suits villa clients, but is weak
   for BIM recruiters and close to the TAFKEEK studio look.

Why Title block: about 40% of the strongest material is drawings on white. A paper ground lets
drawings and renders share one system, and the title block is the vocabulary of both target
audiences.

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f1f2ef` | Page ground: cool off-white, not cream |
| Sheet | `#ffffff` | Drawings |
| Ink | `#1e2226` | Text, primary buttons |
| Lead | `#596066` | Secondary text (5.8:1 on paper) |
| Line | `#cdd1ce` / `#9ea4a3` | Rules and title-block cells |
| Redline | `#c4321f` | Active nav marker, focus ring, hover |

The only typeface is **Archivo** (variable). Its width axis does all the work: expanded (125)
for display, normal for reading, condensed (75–84) for title-block labels. The memorable idea
is the home hero, a render and a Revit drawing side by side with the headline split under
them: "Designed to be seen. / Modelled to be built."

## 6. Information architecture

`/` Home: hero pair, intro, six selected projects, two audience paths, general notes, contact.
`/work`: filter by discipline (counts) and an Images/Index toggle (index = drawing-register
table with hover preview); state kept in the URL.
`/work/[slug]`: 24 case studies, each with a facts table (role, type, location, year, area,
owner, consultant, status, tools, deliverables) and a story of text, figures, pairs and grids.
Every figure opens in a lightbox; click again to view at 100%, which makes drawings readable.
`/bim`: workflow, drawings gallery, capabilities, project record from the CV, software.
`/services`: BIM & delivery and Design services, process.
`/about`: bio, approach, experience, education, certificates, software, languages.
`/contact`: email, LinkedIn, CV, availability, form.
Plus 404, `sitemap.xml`, `robots.txt`, JSON-LD (Person, CreativeWork) and Open Graph images.

## 7. Test results (all actually run)

- `npm run build`: passes, 35 static routes (24 projects); 2,965 internal links and image references resolve. `npm run lint`: no warnings.
  TypeScript checks pass during the build.
- Browser checks (1440×900 and 375×812): all pages render. Work filter, Index view, URL state,
  hover preview, lightbox (open, arrow keys, counter, Esc), mobile menu and Next-project links
  all work. No horizontal overflow at 375 px on Home, Work, BIM, About, Services, Contact or a
  case study.
- Lighthouse 12, mobile, default simulated throttling, static build served locally
  (median of 3 runs where noted):

| Page | Perf | A11y | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 89 (median; single runs 89–99) | 100 | 100 | 100 |
| Work | 88 (median) | 100 | 100 | 100 |
| Estraha (case study) | 93 (median) | 100 | 100 | 100 |
| BIM | 93 (median) | 100 | 100 | 100 |
| Supply Administration Building | 94 | 100 | 100 | 100 |
| Services / About / Contact | 94–96 | 100 | 100 | 100 |

  FCP is 0.8 s and CLS 0 on every page. The simulated LCP (3–4 s) is inflated by Lighthouse's
  model on localhost: the observed LCP is about 0.17 s, and the model counts every
  script and prefetch that started before it. With DevTools throttling, one quiet run gave Home 97
  (FCP 1.4 s, LCP 1.8 s). Later runs were 71–77 with TBT up to 1.1 s, so DevTools numbers on this
  machine depend on CPU load. Re-measure on the deployed URL with PageSpeed Insights.
- Fixes made because of testing: classification of renders vs drawings; drawing cards aligned
  in the grid; unlayered component CSS overriding Tailwind utilities; chip label contrast;
  heading order on /work; hero animation no longer hides images (LCP); CSS inlined; font
  trimmed; Windows-only Next.js export bug that made link prefetches 404.

## 8. Decisions confirmed by Abdelrhman (22 October 2026)

- **Buraydah Town Houses:** he produced the Revit model and the full drawing set for Forma
  Atelier. Published, featured on the home page. The cover image is stored upside down in the
  PDF and is flipped on import (`flip: true` in `scripts/media-sources.mjs`).
- **Lamar Business Park = "Lamar Gate (30,000 m²)"** on the CV. Merged: the page shows the
  area, master planning, BIM documentation and licensing role, and the BIM page record links to it.
- **Phone/WhatsApp** is shown on the Contact page (`showPhone: true`).
- **Years:** projects with no documented year show **2025**, as instructed. Several source files
  are older (for example the master plan render is from 2022, the courtyard from 2023, and the
  villa garden and Moroccan interior from 2024), so correct individual years in `projects.ts` if needed.

Still open:
1. **CV fixes:** the header has a placeholder `Portfolio@google.com`. The Autodesk AAP
   certificate says "15-April-2026" while the KAITECH certificate gives April 2025, so the site
   shows no date for the AAP certificate.
2. **Forma Atelier in Experience?** Not added: employment terms and dates aren't documented.
3. **"How I work"** and the services process are written from his CV and project notes. He should
   read them and adjust the wording to his own voice.
4. A higher-resolution portrait (the current one is 640 px).

## 9. Regenerating the font

```python
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset
f = TTFont("Archivo[wdth,wght].woff2")            # full variable font
f = instancer.instantiateVariableFont(f, {"wdth": (75, 125), "wght": (330, 600)})
opts = subset.Options(); opts.flavor = "woff2"; opts.name_IDs = ["*"]
opts.layout_features = ["kern", "liga", "calt", "tnum", "lnum", "case", "ccmp", "locl", "mark", "mkmk"]
s = subset.Subsetter(opts)
s.populate(unicodes=list(range(0x20, 0x7F)) + [0xA0, 0xA9, 0xB2, 0xB7, 0xD7, 0xE9, 0x2013, 0x2014,
                                                0x2018, 0x2019, 0x201C, 0x201D, 0x2026, 0x2039, 0x203A])
s.subset(f); f.flavor = "woff2"; f.save("src/fonts/archivo-variable.woff2")
```
(Requires `pip install fonttools brotli`, or `brotlicffi` where brotli has no wheel.)
