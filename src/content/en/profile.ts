import type { Credential, Job, RecordProject, Service } from "../types";

// Sources: Abdelrhman_Mohsen_BIM_Architect_CV.pdf (2026), portfolio PDF (2026), KAITECH and
// Autodesk certificates, Upwork-Ready project notes. Nothing here goes beyond those documents.

export const home = {
  headline: "Designed to be seen. Modelled to be built.",
  headlineParts: ["Designed to be seen.", "Modelled to be built."],
  kicker: "BIM architect and architectural designer, based in Egypt",
  hero: {
    slug: "lamar-business-park",
    id: "lamar-business-park/street-wide",
    alt: "Render of Lamar Business Park: a row of office buildings with framed window bays above glazed shopfronts and a planted verge.",
    caption: "Lamar Business Park, 30,000 m²",
  },
  intro:
    "I’m a BIM architect and designer based in Egypt. I design villas, facades, interiors and gardens, and I take buildings through Revit modelling, Navisworks coordination and construction documentation, on projects in Egypt, Saudi Arabia, the UAE and Qatar.",
  workTitle: "Selected work",
  /**
   * The homepage sequence. Each entry picks its own image (not always the project cover) and a
   * layout: "bleed" runs edge to edge, "left"/"right" set the image beside the text, "layered"
   * sets a drawing over the render it belongs to.
   */
  featured: [
    {
      slug: "lamar-business-park",
      layout: "bleed",
      image: { id: "lamar-business-park/frontage", alt: "Lamar Business Park frontage with the park sign on a planted wall." },
      detail: { id: "lamar-business-park/corner", alt: "Curved building corner with building numbers and roof planting." },
      text: "Master planning, BIM documentation and facade design for a 30,000 m² park of offices over shops. Deep-set framed bays give a long block a readable rhythm.",
    },
    {
      slug: "buraydah-town-houses",
      layout: "layered",
      image: { id: "buraydah-town-houses/cover-render", alt: "Terracotta townhouse with rounded volumes and palms in planters." },
      detail: { id: "buraydah-town-houses/ground-3d", alt: "3D cutaway plan of the townhouse ground floor from the Revit model." },
      text: "Six townhouses in Buraydah, modelled in Revit and documented in a 52-sheet set, from site plan to stair and wet-area details.",
    },
    {
      slug: "m3mar-villa",
      layout: "right",
      image: { id: "m3mar-villa/corner", alt: "White classical villa seen from the street corner, with arched windows and a columned balcony." },
      text: "A 600 m² classical villa in Qatar. Tall arches, a columned portico and a boundary wall that repeats them, so house and enclosure read as one composition.",
    },
    {
      slug: "estraha-rest-house",
      layout: "left",
      image: { id: "estraha/pool-terrace", alt: "Long pool terrace with sunken lounge seating beside a white pavilion." },
      text: "Outdoor rooms for a 350 m² rest house in Saudi Arabia: pool terrace, lounge, water feature and garden around a white pavilion.",
    },
    {
      slug: "moroccan-inspired-living",
      layout: "right",
      image: { id: "moroccan-living/living", alt: "Living room with a curved sofa, carved arch panel and textured stone wall." },
      text: "A living room and bedroom where a carved arch, textured relief and soft curves carry a quiet Moroccan language.",
    },
    {
      slug: "courtyard-water-feature",
      layout: "left",
      image: { id: "courtyard/water-court", alt: "Covered courtyard with a reflecting pool, stepping stones and arched niches." },
      text: "An Arabic-inspired courtyard: a reflecting pool crossed by stepping stones, framed by arched niches and planting.",
    },
  ],
  moreTitle: "More projects",
  expertise: {
    title: "Two halves of one practice",
    design: {
      title: "Design",
      body: "Villas, facades, interiors and gardens, developed until the renders can be trusted to look like the building.",
      items: ["Architectural design and master planning", "Contemporary and classical facades", "Residential and commercial interiors", "Courtyards, gardens and pool terraces", "Photoreal visualization"],
      cta: "Design services",
    },
    bim: {
      title: "BIM & delivery",
      body: "Coordinated Revit models and the drawings, schedules and licensing packages that come out of them.",
      items: ["Revit models to LOD 350+", "Arc/Str/MEP clash coordination in Navisworks", "Shop drawings and wall sections", "Schedules, take-offs and BOQ", "ISO 19650 workflows on BIM 360 / ACC"],
      cta: "See BIM & documentation",
    },
    drawings: [
      { id: "corner-villa/cutaway", alt: "Cutaway Revit axonometric of a three-storey villa.", caption: "Cutaway from the Revit model, private villa", slug: "private-villa-corner-plot" },
      { id: "supply-building/elevation-service", alt: "Shaded elevation of the Supply Administration Building.", caption: "Service elevation, Supply Administration Building", slug: "supply-administration-building" },
      { id: "meydan-villa/pool-details", alt: "Swimming pool sections and details sheet.", caption: "Pool details, Meydan Villa, Dubai", slug: "meydan-villa" },
    ],
  },
  /** Facts set as a drawing title block. All from the CV and certificates. */
  facts: [
    { label: "In practice", value: "4+ years" },
    { label: "Largest BIM development", value: "150,000 m²" },
    { label: "Model detail", value: "LOD 350+" },
    { label: "Projects in", value: "Egypt, Saudi Arabia, UAE, Qatar" },
    { label: "BIM diploma", value: "KAITECH, 93.2%" },
  ],
  closing: {
    title: "Hiring for BIM or design work, or planning a building?",
    body: "Send a role, a brief or a set of drawings. I work remotely, hybrid or on site, and I’m open to relocation.",
    image: { id: "courtyard/garden-court", alt: "" },
  },
  // Kept for the About and BIM pages.
  notesTitle: "General notes",
  ctaTitle: "Have a role or a project in mind?",
  forCompanies: {
    title: "For firms and consultancies",
    body: "Revit models to LOD 350+, multidisciplinary clash coordination, shop drawings, schedules and licensing packages, delivered remotely or on site.",
    cta: "See BIM & documentation",
  },
  forClients: {
    title: "For private clients",
    body: "Villa architecture, facades, interiors and landscape, shown in photoreal renders before anything is built.",
    cta: "See design work",
  },
};

/** Short statements of fact, set like the general notes on a drawing. */
export const notes = [
  "4+ years on residential, commercial and healthcare projects.",
  "BIM lifecycle management on developments of 150,000 m² and more, including a residential compound of 30+ buildings.",
  "Revit modelling to LOD 350+ with Arc/Str/MEP coordination in Navisworks.",
  "Information management to ISO 19650 on BIM 360 and Autodesk Construction Cloud.",
  "KAITECH Architectural BIM Diploma: 300 hours, final score 93.2%.",
  "Design work for 10+ private clients across Egypt and the GCC.",
];

export const about = {
  intro:
    "I’m Abdelrhman Mohsen, a BIM architect and architectural designer. I studied architecture at Mansoura University and completed KAITECH’s 300-hour Architectural BIM Diploma in 2025.",
  body: [
    "Since 2022 I’ve worked with engineering consultancies and design studios in Egypt and remotely on projects in Saudi Arabia, the UAE and Qatar. My work covers both ends of a project: designing the building and the spaces people will see, and producing the coordinated model and drawings a contractor can build from.",
    "On the technical side that means Revit models to LOD 350+, clash detection across architecture, structure and MEP in Navisworks, shop drawings, schedules and quantity take-offs, and the licensing packages municipalities ask for. On the design side it means villa architecture, classical and contemporary facades, residential and commercial interiors, and gardens and pool terraces, presented in photoreal renders.",
  ],
  approachTitle: "How I work",
  approach: [
    {
      title: "One model, every drawing",
      body: "Plans, elevations, sections, schedules and presentation views come out of the same coordinated Revit model, so a change made once shows up everywhere it should.",
    },
    {
      title: "Conflicts on screen, not on site",
      body: "Architecture, structure and MEP are federated and clash-tested before drawings are issued, and every issue is tracked to a resolution.",
    },
    {
      title: "Design that survives detailing",
      body: "Facade and interior concepts are developed down to cladding zones, fixings and finish schedules, so what was rendered is what gets built.",
    },
  ],
  status: "Open to remote, hybrid and on-site roles, and to relocation. Working hours GMT+2.",
};

export const experience: Job[] = [
  {
    organisation: "EDEC",
    role: "BIM Architect",
    terms: "Part-time",
    place: "Remote",
    start: "2025-06",
    end: "Present",
    points: [
      "Leading high-precision shop drawings and full project documentation for luxury estates of several thousand square metres.",
      "Architectural BIM modelling and bespoke facade design for institutional and healthcare facilities.",
      "Construction-ready shop drawings and data-driven BOQs that ease the move from design to procurement.",
      "Full statutory licensing packages for municipal approval and site execution plans.",
    ],
  },
  {
    organisation: "Al-Orabi Engineering Consulting",
    role: "BIM Architect",
    terms: "Full-time",
    place: "New Damietta, Egypt",
    start: "2024-09",
    end: "Present",
    points: [
      "Master planning and site circulation, and architectural concepts for large administrative complexes.",
      "Advanced modelling to LOD 350+ and proactive Arc/Str/MEP clash coordination to remove conflicts before construction.",
      "Revit schedules for blockwork and finishes that streamline estimation and procurement.",
      "Projects carried from concept to construction-ready documentation and licensing.",
    ],
  },
  {
    organisation: "Vision International Group",
    role: "Architect",
    terms: "Full-time",
    place: "New Damietta, Egypt",
    start: "2023-07",
    end: "2024-08",
    points: [
      "Schematic design and multidisciplinary BIM coordination to resolve structural and architectural conflicts early.",
      "Complex Revit models for large-scale park projects, reconciling site contours with architectural requirements.",
      "Technical documentation and licensing packages in full regulatory compliance.",
    ],
  },
  {
    organisation: "DIZ Studio",
    role: "Architect",
    terms: "Part-time",
    place: "Remote",
    start: "2022-02",
    end: "2024-06",
    points: [
      "Facade concepts and comprehensive shop drawings for residential and commercial developments, from design intent to construction.",
    ],
  },
  {
    organisation: "Freelance",
    role: "Architect",
    terms: "Part-time",
    place: "Remote",
    start: "2022",
    end: "Present",
    points: [
      "Interior and exterior design for private clients and architectural firms.",
      "BIM modelling, interior and exterior design and technical documentation for 10+ private clients across Egypt and the GCC.",
    ],
  },
];

export const education: Credential[] = [
  {
    title: "Bachelor of Architecture",
    issuer: "Faculty of Engineering, Mansoura University",
    detail: "Degree recognised for Saudi Council of Engineers (SCE) registration eligibility.",
    date: "2018 – 2023",
  },
  {
    title: "Architectural BIM Diploma",
    issuer: "KAITECH Academy (online)",
    detail:
      "300 hours, final score 93.2%. Revit essentials, advanced, worksharing and coordination; Navisworks coordination and clash detection; Autodesk Construction Cloud; Dynamo; information management to ISO 19650; BIM 4D, 5D, 6D and 7D; Enscape; XR; graduation project.",
    date: "Aug 2024 – Apr 2025",
    id: "R11-B-A-65761",
  },
];

export const certifications: Credential[] = [
  {
    title: "Architectural BIM Diploma (Revit 2024)",
    issuer: "Autodesk Authorized Academic Partner, delivered by KAITECH",
    detail: "Autodesk course certificate, 101+ hours.",
    id: "EM304574098758595806229",
  },
  {
    title: "ISO 19650 in Practice: BIM Information Management",
    issuer: "KAITECH Engineering & Technology",
    detail:
      "Workshop covering OIR, AIR, PIR and EIR, appointment workflow under ISO 19650-2, CDE and information delivery, AIM, IFC and openBIM.",
    id: "KT-WS-ISO-56742",
  },
];

/** Grouped as the CV groups them. Levels are the CV's own words; no invented ratings. */
export const toolkit = [
  { group: "BIM & coordination", items: ["Revit (expert)", "Navisworks (advanced)", "Revit family creation", "Dynamo"] },
  { group: "Information management", items: ["Autodesk BIM 360", "Autodesk Construction Cloud", "ISO 19650", "IFC & BCF (openBIM)"] },
  { group: "CAD & 3D", items: ["AutoCAD", "3ds Max"] },
  { group: "Rendering & visualization", items: ["V-Ray", "Lumion", "Enscape", "Adobe Photoshop"] },
];

export const capabilities = [
  {
    group: "Modelling",
    items: ["Architectural models to LOD 350+", "Parametric families and assemblies", "Exploded and cutaway axonometrics", "IFC export"],
  },
  {
    group: "Coordination",
    items: ["Federated Arc/Str/MEP models in Navisworks", "Clash tests, reports and issue logs", "BCF issue exchange", "4D sequencing with TimeLiner"],
  },
  {
    group: "Documentation",
    items: ["Plans, elevations and sections", "Wall sections and facade details", "Shop drawings", "Municipal licensing and tender packages"],
  },
  {
    group: "Data",
    items: ["Room finish schedules", "Door and window schedules", "Material take-offs and automated BOQ", "Area schedules"],
  },
  {
    group: "Information management",
    items: ["CDE set-up on BIM 360 / ACC", "WIP, shared, published and archived states", "ISO 19650 naming and status codes", "BIM execution planning"],
  },
];

/** Project record from the CV. Projects with a page link to it. */
export const record: RecordProject[] = [
  {
    name: "La-Mer Compound",
    size: "150,000 m²",
    scope:
      "Full-scope BIM development to LOD 350+ for a residential community of 30+ buildings in three typologies (villas, apartments and townhouses), coordinating architecture, structure and MEP with no construction-phase conflicts.",
  },
  {
    name: "Lamar Gate (Lamar Business Park)",
    size: "30,000 m²",
    scope:
      "Urban master planning and BIM documentation for a mixed-use administrative hub: facade systems, site circulation and full municipal licensing drawings.",
    slug: "lamar-business-park",
  },
  {
    name: "Square Business Hub",
    size: "10,000 m²",
    scope:
      "Full BIM lifecycle from concept to construction-ready shop drawings, automated BOQ extraction and statutory licensing approval.",
    slug: "square-business-hub",
  },
  {
    name: "Meydan Villa",
    size: "5,000 m²",
    scope:
      "Architectural redesign and full BIM documentation of a high-end private villa: LOD 350 models, bespoke interior finish schedules and construction-ready shop drawings.",
    slug: "meydan-villa",
  },
  {
    name: "Supply Chain, Riyadh",
    scope:
      "Full-cycle BIM modelling and bespoke facade design for an institutional healthcare facility, integrating design and procurement.",
    slug: "supply-administration-building",
  },
  {
    name: "Royal Meadows",
    scope:
      "Advanced Revit models for a large park development, reconciling complex site contours across several landscape zones with full Arc/Civil coordination.",
  },
];

export const bimPage = {
  title: "BIM & documentation",
  intro:
    "How I model, coordinate and document buildings, shown with drawings from real project packages.",
  workflowTitle: "From model to issued drawings",
  workflow: [
    {
      title: "Model",
      body: "Architectural models to LOD 350+ with parametric families, set up for worksharing and for the drawings they will produce.",
    },
    {
      title: "Federate",
      body: "Discipline models exported and appended in Navisworks into one federated model.",
    },
    {
      title: "Test",
      body: "Hard and soft clash tests between architecture, structure and MEP, filtered by discipline.",
    },
    {
      title: "Resolve",
      body: "Clashes logged, assigned, discussed in coordination meetings and fixed in the model, then re-tested until the report is clear.",
    },
    {
      title: "Document",
      body: "Plans, sections, details, schedules and BOQs issued from the coordinated model, through a CDE to ISO 19650.",
    },
  ],
  lead: {
    id: "supply-building/north-elevation-sheet",
    alt: "Drawing sheet AR-201, north elevation of the Supply Administration Building, with notes and title block.",
    caption: "Supply Administration Building, Riyadh: north elevation, sheet AR-201, issued for tender.",
    slug: "supply-administration-building",
  },
  galleryTitle: "Drawings and models",
  galleryIntro: "Click any drawing to open it full size; click again to read it at 100%.",
  gallery: [
    {
      id: "corner-villa/exploded",
      alt: "Exploded axonometric of a three-storey villa with furnished floors lifted apart.",
      caption: "Exploded axonometric from the Revit model.",
      slug: "private-villa-corner-plot",
    },
    {
      id: "supply-building/wall-section",
      alt: "Wall section through porcelain cladding with fixings, waterproofing and annotations.",
      caption: "Wall section: cladding fixing, waterproofing and roof build-up.",
      slug: "supply-administration-building",
    },
    {
      id: "meydan-villa/pool-details",
      alt: "Swimming pool sections and details sheet with title block.",
      caption: "Swimming pool details, detailed design package.",
      slug: "meydan-villa",
    },
    {
      id: "corner-villa/cutaway",
      alt: "Cutaway axonometric of the villa showing every furnished floor.",
      caption: "Cutaway view from the same model as the drawings.",
      slug: "private-villa-corner-plot",
    },
    {
      id: "kaitech-diploma/clash-columns",
      alt: "Before and after views of a ceiling clashing with structural columns in Navisworks.",
      caption: "Clash test before and after resolution (BIM diploma project).",
      slug: "bim-diploma-project",
    },
    {
      id: "classical-facades/shop-drawing-sheet",
      alt: "Facade shop drawing with dimensions next to concept renders.",
      caption: "Facade shop drawing with its concept renders.",
      slug: "classical-facades",
    },
    {
      id: "bim/material-takeoff",
      alt: "Revit material take-off schedule listing wall types, materials and quantities.",
      caption: "Material take-off scheduled directly from Revit.",
    },
    {
      id: "bim/navisworks",
      alt: "Navisworks window with a federated building model and MEP systems highlighted in green.",
      caption: "Federated model in Navisworks.",
    },
    {
      id: "bim/cde-structure",
      alt: "Common data environment folder structure with project files, WIP and shared areas.",
      caption: "CDE folder structure with WIP, shared and published areas.",
    },
  ],
  recordTitle: "Project record",
  recordIntro:
    "BIM roles from my CV. Projects with drawings or renders I can show have their own page.",
};

export const services: Service[] = [
  {
    title: "BIM modelling & coordination",
    body: "Revit models built to the level of detail the stage needs, federated with structure and MEP and clash-tested in Navisworks.",
    deliverables: ["Revit models to LOD 350+", "Custom families", "Navisworks clash reports and issue logs", "IFC/BCF exchange"],
    disciplines: ["bim"],
  },
  {
    title: "Construction & shop drawings",
    body: "Drawing sets a contractor can build from and an authority can approve.",
    deliverables: ["Plans, elevations, sections", "Wall sections and facade details", "Shop drawings", "Licensing and tender packages"],
    disciplines: ["bim"],
  },
  {
    title: "Schedules & quantities",
    body: "Quantities taken straight from the model, so estimates and procurement follow the design.",
    deliverables: ["Room finish schedules", "Door and window schedules", "Material take-offs", "BOQ extraction"],
    disciplines: ["bim"],
  },
  {
    title: "Architectural design",
    body: "Villas, residential buildings and commercial projects, from layout and massing to a developed design.",
    deliverables: ["Space planning and layouts", "Massing and facade studies", "Developed design drawings", "Master planning and site layout"],
    disciplines: ["architecture"],
  },
  {
    title: "Exterior & facade design",
    body: "Contemporary and classical facades, carried from concept render to a dimensioned shop drawing.",
    deliverables: ["Facade concepts", "Cladding and lighting zones", "Facade shop drawings", "Exterior renders"],
    disciplines: ["exterior"],
  },
  {
    title: "Interior design",
    body: "Residential and commercial interiors with a clear material palette and lighting, shown before anything is ordered.",
    deliverables: ["Concept and mood", "Layouts and joinery", "Finish selections", "Interior renders"],
    disciplines: ["interior"],
  },
  {
    title: "Landscape design",
    body: "Courtyards, villa gardens and pool terraces, planned with planting, water and seating.",
    deliverables: ["Garden and courtyard layouts", "Pool terraces", "Hardscape and planting zones", "Landscape renders"],
    disciplines: ["landscape"],
  },
  {
    title: "Architectural visualization",
    body: "Photoreal stills of exteriors, interiors and landscape for approvals, marketing and design decisions.",
    deliverables: ["Day and night exteriors", "Interior stills", "Aerial views", "3ds Max + V-Ray, Lumion"],
    disciplines: ["visualization"],
  },
];

export const servicesPage = {
  title: "Services",
  intro:
    "I work with consultancies and contractors who need BIM capacity, and with owners who need a building designed. Both can be remote; on-site work and relocation are possible.",
  process: [
    { title: "Brief", body: "We agree the scope, the stage, the standards to follow and what you need to receive." },
    { title: "Model and design", body: "I build the model or design, and share progress views as it develops." },
    { title: "Review", body: "We review drawings or renders together and I revise the model, not just the image." },
    { title: "Issue", body: "You receive the agreed drawings, models, schedules or renders in the formats you work with." },
  ],
  cta: "Tell me about your project",
};

export const contactPage = {
  title: "Contact",
  intro:
    "For roles, project enquiries or collaboration, email is the quickest way to reach me.",
  formTitle: "Send a message",
  formNote:
    "Sending opens your email app with this message filled in, so nothing is stored on this site.",
  fields: {
    name: "Your name",
    email: "Your email",
    topic: "What is it about?",
    message: "Message",
  },
  topics: ["A role or job opportunity", "A design project", "BIM or documentation support", "Something else"],
  submit: "Open in email app",
  submitService: "Send message",
  sent: "Your email app should have opened with the message ready to send.",
  sentService: "Message sent. Thank you, I’ll be in touch by email.",
  error: "The message could not be sent. Please email me directly at the address above.",
};
