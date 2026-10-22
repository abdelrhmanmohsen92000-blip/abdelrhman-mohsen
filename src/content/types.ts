// Shape of all site content. Every locale (en today, ar later) provides the same objects,
// so pages and components never contain copy of their own.

export type Locale = "en";

export type Discipline =
  | "architecture"
  | "exterior"
  | "interior"
  | "landscape"
  | "bim"
  | "visualization";

/** An image placed in a project or page. `id` is a path under assets/masters (without extension). */
export interface Figure {
  id: string;
  alt: string;
  caption?: string;
}

export type StoryBlock =
  | { type: "text"; heading: string; body: string[] }
  /** "full" bleeds the reading column; "sheet" sets a drawing on a white sheet with margins. */
  | { type: "figure"; figure: Figure; size?: "full" | "wide" | "sheet" }
  | { type: "pair"; figures: [Figure, Figure]; sheet?: boolean }
  | { type: "grid"; figures: Figure[]; sheet?: boolean };

export interface Project {
  slug: string;
  title: string;
  /** One sentence used on cards, in the register and as the meta description. */
  summary: string;
  disciplines: Discipline[];
  type: string;
  location?: string;
  year?: string;
  area?: string;
  owner?: string;
  consultant?: string;
  status?: string;
  /** What Abdelrhman did, in his sources' words where possible. */
  role?: string;
  scope?: string[];
  /** Only tools documented for this project. */
  tools?: string[];
  cover: Figure;
  /** Hero treatment: renders bleed, drawings sit on a sheet. */
  coverStyle?: "photo" | "sheet";
  featured?: boolean;
  /** Unpublished projects are built into nothing: no page, no listing, no sitemap entry. */
  published: boolean;
  story: StoryBlock[];
  /** Short public note about the material shown, when it needs context. */
  note?: string;
}

export interface Job {
  organisation: string;
  role: string;
  terms: string;
  place: string;
  start: string;
  end: string;
  points: string[];
}

export interface Credential {
  title: string;
  issuer: string;
  detail: string;
  date?: string;
  id?: string;
}

export interface Service {
  title: string;
  body: string;
  deliverables: string[];
  disciplines: Discipline[];
}

export interface RecordProject {
  name: string;
  size?: string;
  scope: string;
  slug?: string;
}
