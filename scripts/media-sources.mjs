// Where each master image in assets/masters came from.
//
// This file documents provenance and drives `npm run media:import`, a one-time step that
// copies originals from Abdelrhman's working folders (D:/por/...) into assets/masters/.
// The website never reads these paths — it only uses assets/masters/ (committed) and the
// generated variants in public/media/.
//
// kind: "photo"   — renders and photographs (lossy-friendly)
//       "drawing" — line drawings and sheets (kept larger and sharper so text stays legible)
//       "screen"  — software screenshots

const DESIGNS = "D:/por/Designs";
const DETAILS = "D:/por/Designs/Details";
// The two folders below were temporary working folders and have been deleted; the masters they
// produced are in assets/. To re-import from scratch, recreate them first:
//   PPTX:   unzip -j "D:/por/Portfolio_EXPANDED_Final_Abdelrhman_Mohsen 2.pptx" "ppt/media/*" -d .review/pptx
//   REVIEW: Buraydah sheets rendered from "2602-BURAYDAH-ARCH-  10-10-2026.pdf" with PyMuPDF
//           (cover image = largest embedded image on page 1; pages 5, 6, 9, 18, 31, 38, 39 at 4200 px wide)
// Full-resolution media extracted from "Portfolio_EXPANDED_Final_Abdelrhman_Mohsen 2.pptx"
const PPTX = "D:/por/abdelrhman-mohsen-portfolio/.review/pptx";
const REVIEW = "D:/por/abdelrhman-mohsen-portfolio/.review";
// Clean crops made for the earlier static site (only used where no better source exists)
const OLD_SITE = "D:/por/personal porfolio/img";

// flip: true corrects images stored upside down inside a PDF (the page applies a transform).
// draft: true sends the master to assets/drafts/, which is not built or deployed. Move the files
// into assets/masters/ when the project is ready to publish.
/** @type {{id: string, src: string, kind: "photo" | "drawing" | "screen", draft?: boolean, flip?: boolean, crop?: {left: number, top: number, width: number, height: number}}[]} */
export const mediaSources = [
  // Profile
  { id: "profile/portrait", src: `${PPTX}/image1.jpg`, kind: "photo" },

  // Square Business Hub — New Damietta, 10,000 m², 2025 (named in portfolio PDF p.22)
  { id: "square-business-hub/street", src: `${DESIGNS}/1F.jpg`, kind: "photo" },

  // Lamar Business Park — name visible on in-render signage
  { id: "lamar-business-park/street-wide", src: `${DESIGNS}/Building B+A Cam 01 .jpg`, kind: "photo" },
  { id: "lamar-business-park/street-angle", src: `${DESIGNS}/Building B+A Cam 02.jpg`, kind: "photo" },
  { id: "lamar-business-park/corner", src: `${DESIGNS}/Building B+A Cam 03 .jpg`, kind: "photo" },
  { id: "lamar-business-park/frontage", src: `${DESIGNS}/Building B+A Cam 05.jpg`, kind: "photo" },
  { id: "lamar-business-park/full-frontage", src: `${DESIGNS}/Building B+A Cam 06.jpg`, kind: "photo" },

  // Commercial promenade — "Commercial Facade · New Damietta" (portfolio PDF p.25)
  { id: "commercial-promenade/plaza", src: `${DESIGNS}/1 (18).jpg`, kind: "photo" },
  { id: "commercial-promenade/glass-facade", src: `${DESIGNS}/4 (7).jpg`, kind: "photo" },
  { id: "commercial-promenade/kiosk", src: `${DESIGNS}/3 (8).jpg`, kind: "photo" },
  { id: "commercial-promenade/aerial", src: `${DESIGNS}/2 (18).jpg`, kind: "photo" },
  { id: "commercial-promenade/aerial-2", src: `${DESIGNS}/5 (8).jpg`, kind: "photo" },

  // ESTRA7A — Saudi Arabia, 350 m² (portfolio PDF pp.25–27)
  { id: "estraha/lounge", src: `${DESIGNS}/1 (21).jpg`, kind: "photo" },
  { id: "estraha/water-spout", src: `${DESIGNS}/3 (7).jpg`, kind: "photo" },
  { id: "estraha/pool-lounge", src: `${DESIGNS}/6 (3).jpg`, kind: "photo" },
  { id: "estraha/pool-trees", src: `${DESIGNS}/5 (7).jpg`, kind: "photo" },
  { id: "estraha/pool-terrace", src: `${DESIGNS}/9 (3).jpg`, kind: "photo" },
  { id: "estraha/garden", src: `${DESIGNS}/4 (5).jpg`, kind: "photo" },

  // Villa garden — Saudi Arabia, 50 m² (portfolio PDF p.27)
  { id: "villa-garden/water-basin", src: `${DESIGNS}/01 (3).jpg`, kind: "photo" },
  { id: "villa-garden/water-basin-2", src: `${DESIGNS}/02.jpg`, kind: "photo" },
  { id: "villa-garden/overview", src: `${DESIGNS}/05.jpg`, kind: "photo" },
  { id: "villa-garden/side-yard", src: `${DESIGNS}/03.jpg`, kind: "photo" },
  { id: "villa-garden/side-yard-2", src: `${DESIGNS}/02 (2).jpg`, kind: "photo" },

  // Courtyard with water feature (Upwork-Ready package 4)
  { id: "courtyard/water-court", src: `${DESIGNS}/87.jpg`, kind: "photo" },
  { id: "courtyard/garden-court", src: `${DESIGNS}/89.jpg`, kind: "photo" },

  // M3MAR Villa — classical, Qatar, 600 m² (portfolio PDF p.24)
  { id: "m3mar-villa/day", src: `${DESIGNS}/1 (20).jpg`, kind: "photo" },
  { id: "m3mar-villa/corner", src: `${DESIGNS}/2 (14).jpg`, kind: "photo" },

  // Classical villa — Qatar, 800 m² (portfolio PDF p.25)
  { id: "qatar-classical-villa/street", src: `${DESIGNS}/1 (17).jpg`, kind: "photo" },
  { id: "qatar-classical-villa/angle", src: `${DESIGNS}/2 (11).jpg`, kind: "photo" },
  { id: "qatar-classical-villa/front", src: `${DESIGNS}/6 (2).jpg`, kind: "photo" },

  // Contemporary villas — Qatar, 400 m² (portfolio PDF p.25; only source is the portfolio deck)
  { id: "qatar-contemporary-villas/street", src: `${PPTX}/image68.png`, kind: "photo" },

  // Contemporary residential: Villa 108 (Saudi Arabia), compound unit (Egypt), mixed-use (portfolio PDF p.23)
  { id: "contemporary-residential/villa-108", src: `${DESIGNS}/1 (11).jpg`, kind: "photo" },
  { id: "contemporary-residential/villa-108-front", src: `${DESIGNS}/2 (8).jpg`, kind: "photo" },
  { id: "contemporary-residential/compound-unit", src: `${DESIGNS}/8F.jpg`, kind: "photo" },
  { id: "contemporary-residential/mixed-use", src: `${DESIGNS}/145.jpg`, kind: "photo" },

  // Classical facades: concept renders + shop drawings (Upwork-Ready package 6, portfolio PDF pp.26–27)
  { id: "classical-facades/shop-drawing-sheet", src: `${DETAILS}/Facade Details.jpg`, kind: "drawing" },
  { id: "classical-facades/facade-model", src: `${PPTX}/image30.jpg`, kind: "drawing" },
  { id: "classical-facades/cairo-building", src: `${DESIGNS}/36.jpg`, kind: "photo" },
  { id: "classical-facades/street-view", src: `${DESIGNS}/1 (16).jpg`, kind: "photo" },
  { id: "classical-facades/corner-building", src: `${DESIGNS}/86.jpg`, kind: "photo" },
  { id: "classical-facades/arched-entrance", src: `${DESIGNS}/9 (4).jpg`, kind: "photo" },

  // Mall — New Damietta, 400 m² (portfolio PDF p.27)
  { id: "mall-new-damietta/night", src: `${DESIGNS}/5 (3).jpg`, kind: "photo" },
  { id: "mall-new-damietta/day", src: `${DESIGNS}/1 (9).jpg`, kind: "photo" },

  // Master plan — Egypt, 50,000 m² (portfolio PDF p.27)
  { id: "master-plan-egypt/aerial", src: `${DESIGNS}/3_23 - Photo.jpg`, kind: "photo" },

  // Meydan Villa 1010 — Dubai (title blocks: fäm / Consortio, Detailed Design, 2025)
  { id: "meydan-villa/pool-details", src: `${DETAILS}/3.jpg`, kind: "drawing" },
  { id: "meydan-villa/garden-sections", src: `${DETAILS}/4.jpg`, kind: "drawing" },
  { id: "meydan-villa/garden-sections-2", src: `${DETAILS}/5.jpg`, kind: "drawing" },

  // Private villa on a corner plot — Revit package (Upwork-Ready package 1)
  { id: "corner-villa/cutaway", src: `${PPTX}/image14.jpg`, kind: "drawing" },
  { id: "corner-villa/cutaway-garden", src: `${PPTX}/image15.jpg`, kind: "drawing" },
  { id: "corner-villa/model", src: `${PPTX}/image13.jpg`, kind: "drawing" },
  { id: "corner-villa/exploded", src: `${PPTX}/image18.jpg`, kind: "drawing" },
  { id: "corner-villa/plan-ground", src: `${PPTX}/image2.jpg`, kind: "drawing" },
  { id: "corner-villa/plan-first", src: `${PPTX}/image3.jpg`, kind: "drawing" },
  { id: "corner-villa/plan-upper", src: `${PPTX}/image4.jpg`, kind: "drawing" },
  { id: "corner-villa/elevation-front", src: `${PPTX}/image20.jpg`, kind: "drawing" },
  { id: "corner-villa/elevation-rear", src: `${PPTX}/image19.jpg`, kind: "drawing" },
  { id: "corner-villa/section", src: `${PPTX}/image21.jpg`, kind: "drawing" },
  { id: "corner-villa/section-2", src: `${PPTX}/image22.jpg`, kind: "drawing" },

  // Supply Administration Building — King Saud Medical City, Riyadh (title block AR-201)
  { id: "supply-building/north-elevation-sheet", src: `${DETAILS}/Supply chain/ilovepdf_pages-to-jpg/Elevation 23-10-2025_page-0001.jpg`, kind: "drawing" },
  { id: "supply-building/elevation-entrance", src: `${PPTX}/image9.jpg`, kind: "drawing" },
  { id: "supply-building/elevation-long", src: `${PPTX}/image10.jpg`, kind: "drawing" },
  { id: "supply-building/elevation-service", src: `${PPTX}/image11.jpg`, kind: "drawing" },
  { id: "supply-building/plan-ground", src: `${PPTX}/image5.jpg`, kind: "drawing" },
  { id: "supply-building/plan-first", src: `${PPTX}/image6.jpg`, kind: "drawing" },
  { id: "supply-building/plan-upper", src: `${PPTX}/image8.jpg`, kind: "drawing" },
  { id: "supply-building/wall-section", src: `${PPTX}/image23.jpg`, kind: "drawing" },
  { id: "supply-building/wall-section-2", src: `${PPTX}/image26.jpg`, kind: "drawing" },

  // Buraydah Town Houses — Forma Atelier, drawing set dated 10-10-2026 (role to be confirmed)
  { id: "buraydah-town-houses/cover-render", src: `${REVIEW}/bur-cover.png`, kind: "photo", flip: true },
  { id: "buraydah-town-houses/site-plan", src: `${REVIEW}/bur-hi-05.png`, kind: "drawing" },
  { id: "buraydah-town-houses/zoning", src: `${REVIEW}/bur-hi-06.png`, kind: "drawing" },
  { id: "buraydah-town-houses/first-floor", src: `${REVIEW}/bur-hi-09.png`, kind: "drawing" },
  { id: "buraydah-town-houses/section", src: `${REVIEW}/bur-hi-18.png`, kind: "drawing" },
  { id: "buraydah-town-houses/stair", src: `${REVIEW}/bur-hi-31.png`, kind: "drawing" },
  { id: "buraydah-town-houses/ground-3d", src: `${REVIEW}/bur-hi-38.png`, kind: "drawing" },
  { id: "buraydah-town-houses/first-3d", src: `${REVIEW}/bur-hi-39.png`, kind: "drawing" },

  // KAITECH Architectural BIM Diploma — graduation project (school), Autodesk Forma studies + clash tests
  { id: "kaitech-diploma/solar", src: `${PPTX}/image49.png`, kind: "screen", crop: { left: 347, top: 217, width: 1200, height: 718 } },
  { id: "kaitech-diploma/daylight", src: `${PPTX}/image50.png`, kind: "screen", crop: { left: 347, top: 217, width: 1200, height: 718 } },
  { id: "kaitech-diploma/embodied-carbon", src: `${PPTX}/image53.png`, kind: "screen", crop: { left: 347, top: 217, width: 1200, height: 718 } },
  { id: "kaitech-diploma/shadow", src: `${PPTX}/image55.png`, kind: "screen", crop: { left: 347, top: 217, width: 1200, height: 718 } },
  { id: "kaitech-diploma/clash-columns", src: `${OLD_SITE}/bim-clash-columns.webp`, kind: "screen" },
  { id: "kaitech-diploma/clash-sprinklers", src: `${OLD_SITE}/bim-clash-curtainwall.webp`, kind: "screen" },
  { id: "kaitech-diploma/clash-curtain-wall", src: `${OLD_SITE}/bim-clash-mep.webp`, kind: "screen" },

  // BIM workflow evidence (not tied to a named project)
  { id: "bim/navisworks", src: `${PPTX}/image35.png`, kind: "screen" },
  { id: "bim/cde-structure", src: `${OLD_SITE}/cde.webp`, kind: "screen" },
  { id: "bim/material-takeoff", src: `${OLD_SITE}/schedule.webp`, kind: "screen" },

  // Interiors with names in the portfolio PDF
  { id: "yasser-villa/master-suite", src: `${DESIGNS}/01 (2).jpg`, kind: "photo" },
  { id: "sara-dining/dining", src: `${DESIGNS}/19.jpg`, kind: "photo" },
  { id: "sara-dining/dining-2", src: `${DESIGNS}/3.jpg`, kind: "photo" },
  { id: "sara-dining/dining-3", src: `${DESIGNS}/4 (2).jpg`, kind: "photo" },
  { id: "majlis/majlis", src: `${DESIGNS}/1 (14).jpg`, kind: "photo" },

  // Moroccan-inspired living room & bedroom (Upwork-Ready package 5)
  { id: "moroccan-living/living", src: `${DESIGNS}/9 (2).jpg`, kind: "photo" },
  { id: "moroccan-living/living-2", src: `${DESIGNS}/7.jpg`, kind: "photo" },
  { id: "moroccan-living/tv-wall", src: `${DESIGNS}/8 (2).jpg`, kind: "photo" },
  { id: "moroccan-living/bedroom", src: `${DESIGNS}/6.jpg`, kind: "photo" },

  // Residential interiors (portfolio PDF pp.30–35)
  { id: "residential-interiors/living-light", src: `${DESIGNS}/4.jpg`, kind: "photo" },
  { id: "residential-interiors/living-beige", src: `${DESIGNS}/1 (4).jpg`, kind: "photo" },
  { id: "residential-interiors/bedroom-rings", src: `${DESIGNS}/1 (3).jpg`, kind: "photo" },
  { id: "residential-interiors/bedroom-mirror", src: `${DESIGNS}/1 (15).jpg`, kind: "photo" },
  { id: "residential-interiors/living-sculpture", src: `${DESIGNS}/1 (19).jpg`, kind: "photo" },
  { id: "residential-interiors/living-fireplace", src: `${DESIGNS}/4 (6).jpg`, kind: "photo" },
  { id: "residential-interiors/vanity", src: `${DESIGNS}/01.jpg`, kind: "photo" },
  { id: "residential-interiors/kitchen", src: `${DESIGNS}/1 (6).jpg`, kind: "photo" },
  { id: "residential-interiors/childrens-room", src: `${DESIGNS}/1 (5).jpg`, kind: "photo" },
  { id: "residential-interiors/coffee-table", src: `${DESIGNS}/9.jpg`, kind: "photo" },

  // Commercial interiors (portfolio PDF pp.33–35)
  { id: "commercial-interiors/cafe", src: `${DESIGNS}/3 (4).jpg`, kind: "photo" },
  { id: "commercial-interiors/boutique", src: `${DESIGNS}/2.jpg`, kind: "photo" },
  { id: "commercial-interiors/sales-office", src: `${DESIGNS}/1 (2).jpg`, kind: "photo" },
  { id: "commercial-interiors/meeting-room", src: `${DESIGNS}/5 (4).jpg`, kind: "photo" },
  { id: "commercial-interiors/reception", src: `${DESIGNS}/10.jpg`, kind: "photo" },
];
