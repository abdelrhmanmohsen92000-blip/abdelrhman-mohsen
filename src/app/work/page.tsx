import type { Metadata } from "next";
import { publishedProjects, site } from "@/content";
import type { Discipline } from "@/content/types";
import { Picture, preloadPicture } from "@/components/Picture";
import { ProjectCard } from "@/components/ProjectCard";
import { WorkIndex, type WorkEntry } from "@/components/WorkIndex";
import { getMedia } from "@/lib/media";
import { absoluteUrl } from "@/lib/url";

const description =
  "Architecture, exterior and facade, interior and landscape design, and BIM documentation by Abdelrhman Mohsen, for projects in Egypt, Saudi Arabia, the UAE and Qatar.";

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: { canonical: absoluteUrl("/work/") },
  openGraph: { title: "Work", description, url: absoluteUrl("/work/") },
};

const order: Discipline[] = ["architecture", "exterior", "interior", "landscape", "bim", "visualization"];

const CARD_SIZES = "(min-width: 1280px) calc((100vw - 340px) / 3), (min-width: 640px) 50vw, 100vw";

export default function WorkPage() {
  preloadPicture(publishedProjects[0].cover.id, CARD_SIZES);
  const entries: WorkEntry[] = publishedProjects.map((p, i) => ({
    slug: p.slug,
    disciplines: p.disciplines,
    title: p.title,
    type: p.type,
    location: p.location,
    year: p.year,
    area: p.area,
    card: (
      <ProjectCard
        project={p}
        priority={i < 3}
        headingLevel="h2"
        sizes={CARD_SIZES}
      />
    ),
    preview: (
      <Picture
        id={p.cover.id}
        alt=""
        sizes="352px"
        fit={getMedia(p.cover.id).kind === "drawing" ? "contain" : "cover"}
        className="bg-sheet shadow-[0_12px_40px_rgb(30_34_38/0.25)]"
        ratio="4 / 3"
      />
    ),
  }));

  return (
    <div className="px-[var(--gutter)] pt-10 md:pt-16">
      <header className="mb-10 grid gap-6 md:grid-cols-12">
        <h1 className="t-title md:col-span-6">Work</h1>
        <p className="t-lead text-lead md:col-span-6 md:self-end">
          Buildings I’ve designed, rendered, modelled and documented. Every project page states my role, and drawings open full size.
        </p>
      </header>
      <WorkIndex
        entries={entries}
        disciplines={order.map((key) => ({ key, label: site.disciplineLabels[key] }))}
        labels={{
          all: site.ui.allWork,
          filter: site.ui.filterLabel,
          showingOne: site.ui.showingOne,
          showingMany: site.ui.showingMany,
          viewLabel: site.ui.viewLabel,
          viewGrid: site.ui.viewGrid,
          viewIndex: site.ui.viewIndex,
          columns: { project: "Project", type: "Type", location: "Location", year: "Year", area: "Area" },
        }}
      />
    </div>
  );
}
