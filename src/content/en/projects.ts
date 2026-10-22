import type { Figure, Project } from "../types";

// Every fact below traces to one of: the CV, the 2026 portfolio PDF/PPTX (project names,
// locations, areas), title blocks on the drawings themselves, or the Upwork-Ready project
// notes in D:/por/Designs/Upwork-Ready/00-form-text.md (roles and scope). Where a source
// does not give a field, the field is left out rather than guessed.
// Years appear only where a source documents them (Abdelrhman, 22 Oct 2026: leave uncertain
// dates unpublished until verified).

const f = (id: string, alt: string, caption?: string): Figure => ({ id, alt, caption });

export const projects: Project[] = [
  {
    slug: "lamar-business-park",
    title: "Lamar Business Park",
    summary:
      "A 30,000 m² mixed-use business park: master planning, BIM documentation, facade design and visualization for offices over ground-floor shops.",
    disciplines: ["architecture", "bim", "exterior", "visualization"],
    type: "Mixed-use administrative and commercial park",
    area: "30,000 m²",
    role: "Urban master planning, BIM documentation, facade design and visualization",
    scope: [
      "Master plan and site circulation",
      "BIM documentation and construction-ready packages",
      "Facade systems",
      "Full municipal licensing drawings",
      "3D model and street, corner and frontage renders",
    ],
    note: "Listed on my CV as Lamar Gate.",
    cover: f(
      "lamar-business-park/street-wide",
      "Street view of a row of three-storey office buildings with framed window bays, dark cladding, shopfronts and a landscaped verge.",
    ),
    featured: true,
    published: true,
    story: [
      {
        type: "text",
        heading: "Brief",
        body: [
          "A 30,000 m² mixed-use administrative hub, built as a multi-building business park with retail on the ground floor, offices above and planted roofs. The park needed a facade language strong enough to give it an identity from the road, but flexible enough to repeat across several buildings.",
          "I led the urban master planning and the BIM documentation: site circulation, facade systems, construction-ready packages and the full set of municipal licensing drawings. I also developed the facade concept, modelled the buildings and their surroundings, and produced the renders shown here.",
        ],
      },
      {
        type: "figure",
        size: "full",
        figure: f(
          "lamar-business-park/frontage",
          "Frontal view of the buildings with the Lamar Business Park sign on a planted wall.",
          "Frontage along the main road.",
        ),
      },
      {
        type: "text",
        heading: "Facade",
        body: [
          "Each bay is a deep-set opening framed in light cladding and set against darker panels. The frames do the work: they give the elevations depth and shadow, and they turn a long, repetitive office block into a sequence of readable units. Glazed shopfronts and a landscaped verge keep the street level open.",
        ],
      },
      {
        type: "pair",
        figures: [
          f("lamar-business-park/street-angle", "Angled street view showing framed bays and glazed corners.", "Street view."),
          f("lamar-business-park/corner", "Close view of a curved building corner with building numbers B04 and B05 and planted roof edge.", "Corner and roof planting."),
        ],
      },
      {
        type: "figure",
        size: "wide",
        figure: f(
          "lamar-business-park/full-frontage",
          "Long, straight-on view of the full row of buildings and the park sign.",
          "The full frontage.",
        ),
      },
    ],
  },

  {
    slug: "buraydah-town-houses",
    title: "Buraydah Town Houses",
    summary:
      "Revit model and full architectural drawing set for a row of six townhouses in Buraydah, Saudi Arabia, for Forma Atelier Architectural Office.",
    disciplines: ["bim", "architecture"],
    type: "Residential townhouses",
    location: "Buraydah, Saudi Arabia",
    year: "2026",
    consultant: "Forma Atelier Architectural Office",
    role: "Revit modelling and the complete architectural drawing set",
    scope: [
      "Site plan and unit zoning",
      "Overall and furniture plans for every level",
      "Four elevations and building sections",
      "Reflected ceiling plans",
      "Staircase and wet area details by unit type",
      "3D floor plans",
    ],
    tools: ["Revit"],
    cover: f(
      "buraydah-town-houses/cover-render",
      "Terracotta-coloured townhouse with deep rounded volumes, palms in planters and a car passing in the street.",
    ),
    featured: true,
    published: true,
    // Role confirmed by Abdelrhman on 22 Oct 2026. Set dated 10 Oct 2026, 52 sheets.
    story: [
      {
        type: "text",
        heading: "The set",
        body: [
          "Six townhouses in a single row, planned as four unit types (T01 and T04, T02 and T05, T03, T06) over ground, first and roof floors, with parking, courtyards and roof terraces worked into the block.",
          "I modelled the houses in Revit and produced the full 52-sheet architectural set: site plan and zoning, overall and furniture plans for every level, elevations, sections, ceiling plans, facade callouts, and staircase and wet area details for each unit type.",
        ],
      },
      {
        type: "pair",
        sheet: true,
        figures: [
          f("buraydah-town-houses/site-plan", "Site plan with the townhouse roofs, parking bays and area tables.", "Site plan."),
          f(
            "buraydah-town-houses/zoning",
            "Colour-coded zoning of the six townhouses on each floor, with a legend of unit areas.",
            "Unit zoning by floor, types T01 to T06, with areas per floor.",
          ),
        ],
      },
      {
        type: "figure",
        size: "sheet",
        figure: f("buraydah-town-houses/first-floor", "Overall first floor plan of the townhouse row with grids and dimensions.", "First floor plan, overall."),
      },
      {
        type: "text",
        heading: "Reading the plan in 3D",
        body: [
          "Alongside the conventional plans, the set includes 3D floor plans cut from the same model, so the way rooms, stairs and parking stack up can be read at a glance.",
        ],
      },
      {
        type: "pair",
        sheet: true,
        figures: [
          f("buraydah-town-houses/ground-3d", "3D cutaway plan of the ground floor with cars and furniture.", "Ground floor 3D plan."),
          f("buraydah-town-houses/first-3d", "3D cutaway plan of the first floor.", "First floor 3D plan."),
        ],
      },
      {
        type: "pair",
        sheet: true,
        figures: [
          f("buraydah-town-houses/section", "Long section through the townhouses showing stairs and floor levels.", "Section A-A."),
          f("buraydah-town-houses/stair", "Stair plans, section and 3D views for unit type T03.", "Stair details, type T03."),
        ],
      },
    ],
  },

  {
    slug: "supply-administration-building",
    title: "Supply Administration Building",
    summary:
      "Revit model, facade design and tender drawings for the supply and logistics building of King Saud Medical City in Riyadh.",
    disciplines: ["bim", "architecture", "exterior"],
    type: "Healthcare logistics and administration",
    location: "Riyadh, Saudi Arabia",
    year: "2025",
    owner: "King Saud Medical City",
    consultant: "Al Shabana Co. for Professional Consultancy",
    status: "Issued for tender",
    role: "BIM modelling and facade design",
    scope: [
      "Revit model of the building",
      "Ground and upper floor plans",
      "Elevations with levels, grids and material tags",
      "Wall sections: cladding fixing, waterproofing, roof build-up, false ceiling",
    ],
    tools: ["Revit"],
    cover: f(
      "supply-building/elevation-entrance",
      "Coloured Revit elevation of a three-storey building with clay-toned cladding and a full-height glazed entrance bay.",
    ),
    coverStyle: "sheet",
    featured: true,
    published: true,
    story: [
      {
        type: "text",
        heading: "The building",
        body: [
          "A multi-storey building that brings the hospital’s supply chain and its administration under one roof. Goods arrive at street level, where the plan is given over to loading, cold storage and dispatch; the floors above hold open workstations, head-of-department offices and meeting rooms.",
          "I modelled the building in Revit and developed its facades, then produced the plans, elevations and wall sections for the tender package.",
        ],
      },
      {
        type: "figure",
        size: "sheet",
        figure: f(
          "supply-building/north-elevation-sheet",
          "Full drawing sheet AR-201 showing the north elevation with notes, revision table and title block.",
          "North elevation, sheet AR-201. Issued for tender.",
        ),
      },
      {
        type: "text",
        heading: "Facade",
        body: [
          "Porcelain cladding on mechanical fixings gives the long elevations a steady rhythm of punched windows. Full-height bands of structural glazing break that rhythm where the stair cores and the main entrance sit, so the building’s circulation reads from the street.",
        ],
      },
      {
        type: "pair",
        sheet: true,
        figures: [
          f("supply-building/elevation-entrance", "Elevation with a central curtain-wall entrance bay between two clad wings.", "Entrance elevation."),
          f("supply-building/elevation-service", "Shaded side elevation showing the stepped massing and service openings.", "Service elevation, with shadows to read the depth of the massing."),
        ],
      },
      {
        type: "figure",
        size: "sheet",
        figure: f(
          "supply-building/elevation-long",
          "Long elevation of the building with regular windows and vertical glazed bands.",
          "Long elevation. Glazed bands mark the vertical circulation.",
        ),
      },
      {
        type: "text",
        heading: "Plans",
        body: [
          "The ground floor is planned around the movement of goods: loading, cold storage and dispatch with direct access from the service yard. Administration starts on the first floor, with open-plan workstations along the facade and offices and meeting rooms around the cores.",
        ],
      },
      {
        type: "pair",
        sheet: true,
        figures: [
          f("supply-building/plan-ground", "Ground floor plan with loading and storage areas and dimensions.", "Ground floor plan."),
          f("supply-building/plan-first", "First floor plan with workstations, offices and meeting rooms.", "First floor plan."),
        ],
      },
      {
        type: "figure",
        size: "sheet",
        figure: f("supply-building/plan-upper", "Upper floor plan with landscaped areas drawn in green.", "Upper floor plan."),
      },
      {
        type: "text",
        heading: "Wall sections",
        body: [
          "The wall sections carry the facade down to the details a contractor prices from: cladding fixings, structural glazing, waterproofing, the roof build-up and the false ceiling.",
        ],
      },
      {
        type: "pair",
        sheet: true,
        figures: [
          f("supply-building/wall-section", "Full-height wall section with porcelain cladding and annotation leaders.", "Wall section through the clad facade."),
          f("supply-building/wall-section-2", "Wall section through the glazed facade with floor build-ups.", "Wall section through the structural glazing."),
        ],
      },
    ],
  },

  {
    slug: "estraha-rest-house",
    title: "Estraha Rest House",
    summary:
      "Outdoor living for a 350 m² private rest house in Saudi Arabia: pool terrace, lounge seating, water feature and garden.",
    disciplines: ["landscape", "exterior", "visualization"],
    type: "Private rest house (estraha)",
    location: "Saudi Arabia",
    area: "350 m²",
    role: "Design, 3D modelling and rendering of the outdoor spaces",
    cover: f(
      "estraha/lounge",
      "White single-storey pavilion with horizontal cladding, hanging planters and a long outdoor lounge beside a pool.",
    ),
    featured: true,
    published: true,
    story: [
      {
        type: "text",
        heading: "A place to gather",
        body: [
          "In Saudi Arabia an estraha is a private retreat for family and friends, and most of its life happens outdoors. The design treats the pool, the lounge and the garden as one sequence of outdoor rooms around a simple white pavilion.",
        ],
      },
      {
        type: "figure",
        size: "full",
        figure: f("estraha/pool-lounge", "Pool terrace with sofas, a fire table and a parking court beyond.", "Pool terrace and lounge."),
      },
      {
        type: "pair",
        figures: [
          f("estraha/pool-trees", "Pool edged with lawn and lounge seating under slender trees.", "Lounge seating set into the lawn."),
          f("estraha/water-spout", "Curved water spout falling into the pool in front of the pavilion.", "Water feature."),
        ],
      },
      {
        type: "pair",
        figures: [
          f("estraha/pool-terrace", "Long view along the pool with sunken seating and black-framed glazing.", "Along the pool."),
          f("estraha/garden", "Lawn in front of the glazed pavilion with outdoor seating.", "Garden side."),
        ],
      },
    ],
  },

  {
    slug: "moroccan-inspired-living",
    title: "Moroccan-Inspired Living Room and Bedroom",
    summary:
      "A living room and bedroom in a calm Moroccan-inspired language: carved arch panels, textured wall relief, soft curved furniture and a warm neutral palette.",
    disciplines: ["interior", "visualization"],
    type: "Residential interior",
    role: "Interior concept, 3D modelling, lighting and rendering",
    tools: ["3ds Max"],
    cover: f(
      "moroccan-living/living",
      "Living room with a curved cream sofa, a carved arch panel and textured stone relief on the wall, lit by a sheer-curtained window.",
    ),
    featured: true,
    published: true,
    story: [
      {
        type: "text",
        heading: "Concept",
        body: [
          "Moroccan references, used quietly: a carved arch panel, a wall of textured relief, round ceramic accents. Everything else is kept soft and neutral so those few pieces carry the room. I created the concept, modelled the spaces and furniture, set up the lighting and produced the renders.",
        ],
      },
      {
        type: "pair",
        figures: [
          f("moroccan-living/living-2", "Second view of the living room showing the arch panel and window.", "Living room."),
          f("moroccan-living/tv-wall", "Media wall with timber panelling and round wall accents.", "Media wall."),
        ],
      },
      {
        type: "figure",
        size: "wide",
        figure: f("moroccan-living/bedroom", "Bedroom with an upholstered bed, an arched headboard niche and pendant lights.", "Bedroom."),
      },
    ],
  },

  {
    slug: "private-villa-corner-plot",
    title: "Private Villa on a Corner Plot",
    summary:
      "A modern private villa designed and documented from one Revit model: plans, elevations, sections, an exploded axonometric and cutaway views.",
    disciplines: ["architecture", "bim"],
    type: "Private residence",
    role: "Concept design, Revit modelling and construction documentation",
    scope: [
      "Concept and massing",
      "Layout and facade design",
      "Revit model including furniture",
      "Plans, elevations and sections",
      "Exploded axonometric and cutaway 3D views",
    ],
    tools: ["Revit"],
    cover: f(
      "corner-villa/cutaway",
      "Cutaway Revit axonometric of a three-storey villa showing furnished rooms on every floor and a car in the garage.",
    ),
    coverStyle: "sheet",
    featured: true,
    published: true,
    story: [
      {
        type: "text",
        heading: "The plot",
        body: [
          "The villa sits on an irregular corner plot: one boundary runs at an angle, leaving a triangle of land along the side. Rather than bend the house to follow it, the plan keeps a compact, rectangular footprint and gives the leftover geometry to garden and parking.",
        ],
      },
      {
        type: "pair",
        sheet: true,
        figures: [
          f("corner-villa/plan-ground", "Ground floor plan on the angled plot with the garden shaded green and parking bays.", "Ground floor plan."),
          f("corner-villa/plan-first", "First floor plan showing bedrooms and the plot limit in red.", "First floor plan."),
        ],
      },
      {
        type: "figure",
        size: "sheet",
        figure: f("corner-villa/plan-upper", "Upper floor plan of the villa within the angled plot limit.", "Upper floor plan."),
      },
      {
        type: "text",
        heading: "One model, every drawing",
        body: [
          "Everything on this page comes from a single Revit model, from zoning and room layout to levels, openings and facade materials. The exploded axonometric and the cutaways are not separate illustrations: they are views of the same model that produces the plans and sections, so they always agree.",
        ],
      },
      {
        type: "pair",
        sheet: true,
        figures: [
          f("corner-villa/exploded", "Exploded axonometric separating the villa’s floors to show each furnished level.", "Exploded axonometric, floor by floor."),
          f("corner-villa/model", "Hidden-line 3D view of the villa from the street corner.", "The model from the street corner."),
        ],
      },
      {
        type: "figure",
        size: "sheet",
        figure: f("corner-villa/elevation-front", "Front elevation with tall vertical windows and the entrance, with level markers.", "Front elevation."),
      },
      {
        type: "figure",
        size: "sheet",
        figure: f("corner-villa/elevation-rear", "Rear elevation with glazing and the stepped roofline.", "Rear elevation."),
      },
      {
        type: "pair",
        sheet: true,
        figures: [
          f("corner-villa/section", "Building section through the stair with floor levels.", "Section through the stair."),
          f("corner-villa/section-2", "Second building section showing room heights and the glazed living space.", "Cross section."),
        ],
      },
      {
        type: "figure",
        size: "sheet",
        figure: f("corner-villa/cutaway-garden", "Cutaway 3D view from the garden side showing furnished interiors.", "Cutaway from the garden side."),
      },
    ],
  },

  {
    slug: "m3mar-villa",
    title: "M3MAR Villa",
    summary:
      "A 600 m² classical villa in Qatar with tall arched windows, a columned portico and a boundary wall that repeats its arches.",
    disciplines: ["exterior", "visualization"],
    type: "Private villa, classical style",
    location: "Qatar",
    area: "600 m²",
    role: "Exterior design and visualization",
    cover: f(
      "m3mar-villa/day",
      "White two-storey classical villa with tall arched windows, a columned portico, balustrades and a boundary wall, a yellow car in front.",
    ),
    published: true,
    story: [
      {
        type: "text",
        heading: "Classical, in proportion",
        body: [
          "A classical facade lives or dies on proportion: tall arched openings on the ground floor, a columned portico at the entrance, balustrades and cornices that finish each level. The boundary wall repeats the same arches, so the house and its enclosure read as one composition.",
        ],
      },
      {
        type: "figure",
        size: "full",
        figure: f(
          "m3mar-villa/corner",
          "The villa from the street corner: arched windows, the columned balcony and the boundary wall, with a car parked in front.",
          "From the street corner.",
        ),
      },
    ],
  },

  {
    slug: "courtyard-water-feature",
    title: "Courtyard with Water Feature",
    summary: "An Arabic-inspired courtyard with a reflecting pool and stepping stones, and a garden court with arched openings.",
    disciplines: ["landscape", "exterior", "visualization"],
    type: "Villa courtyard",
    role: "Design, 3D modelling and rendering",
    cover: f(
      "courtyard/water-court",
      "Covered courtyard with a reflecting pool, stepping stones, arched niches and potted plants.",
    ),
    published: true,
    story: [
      {
        type: "figure",
        size: "wide",
        figure: f("courtyard/garden-court", "Garden court with round stepping stones on lawn, arched openings and a stair.", "Garden court."),
      },
    ],
  },

  {
    slug: "meydan-villa",
    title: "Meydan Villa",
    summary:
      "Detailed design and BIM documentation for a basement-plus-two-storey private villa in Meydan, Dubai, including garden and swimming pool details.",
    disciplines: ["bim", "architecture", "landscape"],
    type: "Private villa (basement, ground and first floor)",
    location: "Meydan, Dubai, UAE",
    year: "2025",
    area: "5,000 m²",
    status: "Detailed design",
    role: "Architectural redesign and full BIM documentation",
    scope: [
      "LOD 350 Revit models",
      "Bespoke interior finish schedules",
      "Construction-ready shop drawings",
      "Garden sections and swimming pool details",
    ],
    cover: f(
      "meydan-villa/pool-details",
      "Drawing sheet of swimming pool sections and details with a full title block.",
    ),
    coverStyle: "sheet",
    featured: true,
    published: true,
    story: [
      {
        type: "text",
        heading: "Scope",
        body: [
          "A high-end private villa in Dubai that came to me for redesign and full BIM documentation. The work covered LOD 350 models, bespoke interior finish schedules and the construction-ready drawings the detailed design package needed.",
          "The sheets below are from that package, revised through four issues between May and August 2025.",
        ],
      },
      {
        type: "figure",
        size: "sheet",
        figure: f(
          "meydan-villa/pool-details",
          "Swimming pool sections showing the pool shell, steps, overflow edge and finishes.",
          "Swimming pool details, sheet A-407A.",
        ),
      },
      {
        type: "pair",
        sheet: true,
        figures: [
          f("meydan-villa/garden-sections", "Garden sections with planters, retaining walls and level annotations.", "Ground floor garden sections, sheet A-417J."),
          f("meydan-villa/garden-sections-2", "Further garden sections with planter details.", "Ground floor garden sections."),
        ],
      },
    ],
  },

  {
    slug: "villa-garden",
    title: "Villa Garden",
    summary:
      "A compact 50 m² villa garden in Saudi Arabia: a dark water basin, raised planting and timber decking around outdoor seating.",
    disciplines: ["landscape", "visualization"],
    type: "Private garden",
    location: "Saudi Arabia",
    area: "50 m²",
    role: "Landscape design and visualization",
    cover: f(
      "villa-garden/water-basin",
      "Garden with a dark rippled water basin, trees in planters and woven outdoor chairs.",
    ),
    published: true,
    story: [
      {
        type: "text",
        heading: "Small plot, several rooms",
        body: [
          "Fifty square metres is not much, so the garden is divided into distinct places: a water basin as the centre, raised planters that give height and shade, and a strip of timber decking with built-in seating along the house.",
        ],
      },
      {
        type: "pair",
        figures: [
          f("villa-garden/water-basin-2", "Water basin with a narrow channel running from a planter, a sports car parked beyond.", "The basin and its channel."),
          f("villa-garden/overview", "High view over the basin, planters and seating.", "From above."),
        ],
      },
      {
        type: "pair",
        figures: [
          f("villa-garden/side-yard", "Narrow side yard with timber decking, built-in seating and a small tree.", "Side yard."),
          f("villa-garden/side-yard-2", "Second view of the side yard looking along the decking.", "Side yard, looking back."),
        ],
      },
    ],
  },

  {
    slug: "yasser-villa-master-suite",
    title: "Yasser Villa Master Suite",
    summary: "A modern master suite in Saudi Arabia: vertical timber slats, stone panels and a low upholstered bed in a warm neutral palette.",
    disciplines: ["interior", "visualization"],
    type: "Residential interior",
    location: "Saudi Arabia",
    role: "Interior design and visualization",
    cover: f(
      "yasser-villa/master-suite",
      "Master bedroom with full-height vertical timber slats, a low cream bed, a lounge chair and sheer curtains.",
    ),
    published: true,
    story: [
      {
        type: "text",
        heading: "Rhythm and restraint",
        body: [
          "The room is built from one idea, a wall of vertical timber slats that wraps the bed and continues across the room, with stone panels and soft textiles keeping it calm.",
        ],
      },
    ],
  },

  {
    slug: "classical-facades",
    title: "Classical Facades, Concept to Shop Drawing",
    summary:
      "Classical residential facades taken from rendered concept to a dimensioned shop drawing with cladding zones, arches, columns, cornices and lighting.",
    disciplines: ["exterior", "bim", "visualization"],
    type: "Facade design and detailing",
    role: "Facade design, detailing and 3D visualization",
    cover: f(
      "classical-facades/shop-drawing-sheet",
      "Drawing sheet pairing two rendered facade concepts with a dimensioned facade shop drawing.",
    ),
    coverStyle: "sheet",
    published: true,
    story: [
      {
        type: "text",
        heading: "From image to instruction",
        body: [
          "A rendered facade is a promise. The shop drawing is what makes it buildable. This sheet places both side by side: the concept renders, and the dimensioned elevation that sets out cladding zones, arches, columns, cornices and the LED lighting runs.",
        ],
      },
      {
        type: "figure",
        size: "sheet",
        figure: f(
          "classical-facades/shop-drawing-sheet",
          "Facade shop drawing with dimensions and material callouts next to two concept renders.",
          "Facade concept and shop drawing on one sheet.",
        ),
      },
      {
        type: "figure",
        size: "sheet",
        figure: f(
          "classical-facades/facade-model",
          "Hidden-line 3D model of a classical facade with arches, pilasters and balconies.",
          "The facade modelled for the shop drawing.",
        ),
      },
      {
        type: "text",
        heading: "Selected facades",
        body: ["Classical residential buildings designed and rendered for clients in Egypt."],
      },
      {
        type: "pair",
        figures: [
          f("classical-facades/cairo-building", "Beige classical apartment building with arched balconies on a tree-lined street.", "Residential building, Cairo, 400 m²."),
          f("classical-facades/street-view", "Grey-white classical residential building with ornamental panels and a car in front.", "Residential building, street view."),
        ],
      },
      {
        type: "pair",
        figures: [
          f("classical-facades/corner-building", "White classical residential building on a corner with arched windows.", "Corner residential building."),
          f("classical-facades/arched-entrance", "Classical building with a pointed central arch and symmetrical wings.", "Building with a central arched entrance."),
        ],
      },
    ],
  },

  {
    slug: "square-business-hub",
    title: "Square Business Hub",
    summary:
      "A 10,000 m² commercial hub in New Damietta, taken through the full BIM lifecycle from concept to shop drawings, BOQ and licensing.",
    disciplines: ["bim", "architecture", "exterior"],
    type: "Commercial hub",
    location: "New Damietta, Egypt",
    year: "2025",
    area: "10,000 m²",
    role: "Full BIM lifecycle, concept to construction-ready documentation",
    scope: ["Concept design", "Construction-ready shop drawings", "Automated BOQ extraction", "Statutory municipal licensing"],
    cover: f(
      "square-business-hub/street",
      "Two-storey commercial buildings with white frames and glazing along a street with outdoor seating and planting.",
    ),
    published: true,
    story: [
      {
        type: "text",
        heading: "Scope",
        body: [
          "A commercial hub that I carried from concept through construction-ready shop drawings, automated BOQ extraction and statutory municipal licensing approval. The render shows the street-level experience the design was aiming for: glazed frontages, shaded upper terraces and a landscaped public edge.",
        ],
      },
    ],
  },

  {
    slug: "commercial-promenade",
    title: "Commercial Promenade",
    summary:
      "Glazed commercial frontages and a landscaped pedestrian promenade with kiosks, terraces and public art in New Damietta.",
    disciplines: ["exterior", "visualization", "landscape"],
    type: "Commercial frontage and public realm",
    location: "New Damietta, Egypt",
    role: "Facade design and visualization",
    cover: f(
      "commercial-promenade/plaza",
      "Pedestrian plaza with a bronze sculpture, outdoor seating and a coffee kiosk in front of glazed commercial buildings.",
    ),
    published: true,
    story: [
      {
        type: "text",
        heading: "The street as the project",
        body: [
          "The buildings are kept simple, tall glazing between solid piers, so that the public space in front can do the work: a promenade of timber terraces, kiosks, planting and sculpture that gives people a reason to stay.",
        ],
      },
      {
        type: "figure",
        size: "full",
        figure: f("commercial-promenade/aerial", "Aerial view down the promenade lined with timber terraces, planting and kiosks.", "The promenade from above."),
      },
      {
        type: "pair",
        figures: [
          f("commercial-promenade/kiosk", "Kiosk and seating terraces between rows of shopfronts.", "Kiosk and terraces."),
          f("commercial-promenade/glass-facade", "Glazed facade with shop signage and people walking past.", "Glazed frontage."),
        ],
      },
      {
        type: "figure",
        size: "wide",
        figure: f("commercial-promenade/aerial-2", "Second aerial view of the promenade and its seating areas.", "Seating terraces along the route."),
      },
    ],
  },

  {
    slug: "bim-diploma-project",
    title: "BIM Diploma Project: Coordination and 6D Studies",
    summary:
      "Graduation work from KAITECH’s Architectural BIM Diploma: a school building taken through Navisworks clash detection and Autodesk Forma sustainability studies.",
    disciplines: ["bim"],
    type: "Educational building (diploma project)",
    year: "2025",
    role: "Diploma participant: modelling, coordination and analysis",
    tools: ["Revit", "Navisworks", "Autodesk Forma"],
    cover: f(
      "kaitech-diploma/daylight",
      "Board comparing daylight potential on the current and proposed school design, with conclusions below.",
    ),
    coverStyle: "sheet",
    published: true,
    note: "Coursework from the KAITECH Architectural BIM Diploma (2024–2025), shown as training evidence rather than client work.",
    story: [
      {
        type: "text",
        heading: "Clash detection",
        body: [
          "Discipline models were federated in Navisworks and tested against each other. Each clash was documented before and after resolution: architectural ceilings against structural columns, sprinklers against fire alarm devices, curtain walls against communication devices.",
        ],
      },
      {
        type: "grid",
        sheet: true,
        figures: [
          f("kaitech-diploma/clash-columns", "Before and after views of a clash between an architectural ceiling and structural columns.", "Ceiling vs. structural columns, before and after."),
          f("kaitech-diploma/clash-sprinklers", "Before and after views of a sprinkler clashing with a fire alarm device.", "Sprinklers vs. fire alarm, before and after."),
          f("kaitech-diploma/clash-curtain-wall", "Before and after views of a curtain wall clashing with communication devices.", "Curtain wall vs. communication devices, before and after."),
        ],
      },
      {
        type: "text",
        heading: "6D: sustainability",
        body: [
          "The same school was analysed in Autodesk Forma, comparing the current design with a proposed one for solar energy, daylight, embodied carbon and shadow, each with design conclusions.",
        ],
      },
      {
        type: "pair",
        sheet: true,
        figures: [
          f("kaitech-diploma/solar", "Solar energy board comparing roof irradiation before and after adding PV panels.", "Solar energy: PV on the roofs."),
          f("kaitech-diploma/embodied-carbon", "Embodied carbon board comparing cladding options.", "Embodied carbon: rainscreen options."),
        ],
      },
      {
        type: "figure",
        size: "sheet",
        figure: f("kaitech-diploma/shadow", "Shadow study at six times of day on 21 July.", "Shadow study, 21 July."),
      },
    ],
  },

  {
    slug: "sara-dining-room",
    title: "Sara Dining Room",
    summary: "A neo-classical dining room with panelled walls, layered ring pendants and upholstered chairs in sage and grey.",
    disciplines: ["interior", "visualization"],
    type: "Residential interior, neo-classical",
    role: "Interior design and visualization",
    cover: f(
      "sara-dining/dining",
      "Dining room with a marble table, green and grey upholstered chairs, a ring chandelier and framed bird prints on a panelled wall.",
    ),
    published: true,
    story: [
      {
        type: "pair",
        figures: [
          f("sara-dining/dining-2", "Dining table under a gold ring chandelier, panelled walls and a doorway beyond.", "Toward the doorway."),
          f("sara-dining/dining-3", "Dining room viewed from the side with a fireplace beyond.", "From the side."),
        ],
      },
    ],
  },

  {
    slug: "majlis",
    title: "Majlis",
    summary: "A formal majlis with fluted wall panels, a sculpted wing centrepiece and low sofas around a set of round tables.",
    disciplines: ["interior", "visualization"],
    type: "Residential interior, reception room",
    role: "Interior design and visualization",
    cover: f(
      "majlis/majlis",
      "Majlis with fluted timber panels, a white sculpted wing wall piece, cream sofas with green cushions and round coffee tables.",
    ),
    published: true,
    story: [],
  },

  {
    slug: "contemporary-villas-qatar",
    title: "Contemporary Villas, Qatar",
    summary: "A row of 400 m² contemporary villas in Qatar with white volumes, tall slot windows and a planted street edge.",
    disciplines: ["exterior", "visualization"],
    type: "Private villas",
    location: "Qatar",
    area: "400 m²",
    role: "Exterior design and visualization",
    cover: f(
      "qatar-contemporary-villas/street",
      "Three identical white contemporary villas with tall dark windows behind a low wall and trees.",
    ),
    published: true,
    story: [],
  },

  {
    slug: "classical-villa-qatar",
    title: "Classical Villa, Qatar",
    summary: "An 800 m² villa in Qatar in a French classical manner: mansard roofs, dormer windows and timber gates.",
    disciplines: ["exterior", "visualization"],
    type: "Private villa, classical style",
    location: "Qatar",
    area: "800 m²",
    role: "Exterior design and visualization",
    cover: f(
      "qatar-classical-villa/street",
      "Beige stone villa with steep mansard roofs and dormers behind a boundary wall with timber gates.",
    ),
    published: true,
    story: [
      {
        type: "pair",
        figures: [
          f("qatar-classical-villa/angle", "Angled view of the villa’s roofline and dormers.", "Roofline and dormers."),
          f("qatar-classical-villa/front", "Front of the villa with timber gates in the boundary wall.", "Street front."),
        ],
      },
    ],
  },

  {
    slug: "contemporary-residential",
    title: "Contemporary Residential",
    summary: "Contemporary houses and apartment buildings: Villa 108 in Saudi Arabia, a compound unit in Egypt and a mixed-use building.",
    disciplines: ["exterior", "visualization"],
    type: "Selected residential exteriors",
    role: "Exterior design and visualization",
    cover: f(
      "contemporary-residential/villa-108",
      "Contemporary villa with grey render, timber slat screens and planted balconies, the name Villa 108 on the wall.",
    ),
    published: true,
    story: [
      {
        type: "figure",
        size: "wide",
        figure: f(
          "contemporary-residential/villa-108-front",
          "Straight-on view of Villa 108 showing the slatted screens and recessed balconies.",
          "Villa 108, Saudi Arabia.",
        ),
      },
      {
        type: "pair",
        figures: [
          f("contemporary-residential/compound-unit", "Low-rise apartment building with white balconies behind a timber deck and lawn.", "Compound unit, Egypt."),
          f("contemporary-residential/mixed-use", "Corner apartment building with dark and white volumes and planted balconies.", "Mixed-use residential building."),
        ],
      },
    ],
  },

  {
    slug: "mall-new-damietta",
    title: "Mall, New Damietta",
    summary: "A 400 m² mall frontage in New Damietta: patterned perforated screens framed in bronze-toned panels, rendered at night and by day.",
    disciplines: ["exterior", "visualization"],
    type: "Retail",
    location: "New Damietta, Egypt",
    area: "400 m²",
    role: "Facade design and visualization",
    cover: f(
      "mall-new-damietta/night",
      "Symmetrical mall facade at night with patterned perforated screens, bronze frames and warm uplighting.",
    ),
    published: true,
    story: [
      {
        type: "figure",
        size: "wide",
        figure: f("mall-new-damietta/day", "The mall frontage by day from a low angle, with palms and a parked car in front.", "By day."),
      },
    ],
  },

  {
    slug: "master-plan-egypt",
    title: "Master Plan, Egypt",
    summary: "A 50,000 m² master plan organised around a circular central building, water features and landscaped routes.",
    disciplines: ["architecture", "landscape"],
    type: "Master plan",
    location: "Egypt",
    area: "50,000 m²",
    role: "Master planning and visualization",
    cover: f(
      "master-plan-egypt/aerial",
      "Aerial render of a large master plan with a ring-shaped building, blue water channels and landscaped paths.",
    ),
    published: true,
    story: [],
  },

  {
    slug: "residential-interiors",
    title: "Residential Interiors",
    summary: "Living rooms, bedrooms, a kitchen and a children’s room: warm neutral palettes, timber, stone and controlled lighting.",
    disciplines: ["interior", "visualization"],
    type: "Selected residential interiors",
    role: "Interior design and visualization",
    cover: f(
      "residential-interiors/living-light",
      "Bright living room with a long cream sofa, timber wall panels with shelving and large windows.",
    ),
    published: true,
    story: [
      {
        type: "grid",
        figures: [
          f("residential-interiors/bedroom-rings", "Bedroom with timber panelling and gold ring wall lights.", "Bedroom."),
          f("residential-interiors/living-beige", "Living room with curved sofas and a timber feature wall.", "Living room."),
          f("residential-interiors/bedroom-mirror", "Bedroom with slatted headboard wall and round mirror.", "Bedroom with dressing table."),
          f("residential-interiors/living-sculpture", "Living room with a sculptural armchair and abstract art.", "Reading corner."),
          f("residential-interiors/living-fireplace", "Living room with a long linear fireplace and grey sofas.", "Living room with fireplace."),
          f("residential-interiors/kitchen", "L-shaped white kitchen with timber slats and a stone-look floor.", "Kitchen."),
          f("residential-interiors/childrens-room", "Children’s room with a moon-and-star theme and a play area.", "Children’s room."),
          f("residential-interiors/vanity", "Double vanity in stone with timber surround and backlighting.", "Vanity."),
          f("residential-interiors/coffee-table", "Close-up of books, a candle lantern and a clock on a coffee table.", "Detail."),
        ],
      },
    ],
  },

  {
    slug: "commercial-interiors",
    title: "Commercial Interiors",
    summary: "A café counter, a boutique, offices and a meeting room: workplaces and shops with a clear material identity.",
    disciplines: ["interior", "visualization"],
    type: "Selected commercial interiors",
    role: "Interior design and visualization",
    cover: f(
      "commercial-interiors/cafe",
      "Café counter with terrazzo front, open timber shelving and a branded sign above.",
    ),
    published: true,
    story: [
      {
        type: "grid",
        figures: [
          f("commercial-interiors/boutique", "Boutique with arched display niches and lit shelving.", "Boutique."),
          f("commercial-interiors/sales-office", "Sales office with timber shelving and four desks.", "Sales office."),
          f("commercial-interiors/meeting-room", "Meeting room with a long table and a planter running down its centre.", "Meeting room."),
          f("commercial-interiors/reception", "Reception desk in stone with a curved chair and marble wall.", "Reception."),
        ],
      },
    ],
  },
];

export const publishedProjects = projects.filter((p) => p.published);
