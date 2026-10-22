import Link from "next/link";
import { site } from "@/content";
import type { Project } from "@/content/types";
import { getMedia } from "@/lib/media";
import { Picture } from "./Picture";

/** Line under a project title: type and place, whichever are known. */
export function projectMeta(p: Project) {
  return [p.type, p.location].filter(Boolean).join(", ");
}

interface CardProps {
  project: Project;
  sizes: string;
  ratio?: string;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
  large?: boolean;
}

export function ProjectCard({ project, sizes, ratio = "4 / 3", headingLevel = "h3", priority, large }: CardProps) {
  const Heading = headingLevel;
  const isDrawing = project.coverStyle === "sheet" || getMedia(project.cover.id).kind === "drawing";
  return (
    <article className="group relative">
      {isDrawing ? (
        // The sheet frame sits inside the same ratio box as a photo, so grid rows line up.
        <div className="sheet p-[5%]! transition-colors duration-300 group-hover:border-ink" style={{ aspectRatio: ratio }}>
          <Picture
            id={project.cover.id}
            alt={project.cover.alt}
            sizes={sizes}
            fit="contain"
            priority={priority}
            className="h-full w-full aspect-auto!"
          />
        </div>
      ) : (
        <div className="frame">
          <Picture id={project.cover.id} alt={project.cover.alt} sizes={sizes} ratio={ratio} priority={priority} />
        </div>
      )}
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <Heading className={large ? "t-heading" : "t-subheading"}>
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 group-hover:text-accent">
            {project.title}
          </Link>
        </Heading>
        {project.year && <span className="t-meta shrink-0">{project.year}</span>}
      </div>
      <p className="t-meta mt-1">{projectMeta(project)}</p>
      {large && <p className="mt-3 max-w-[52ch] text-[0.9875rem] text-lead">{project.summary}</p>}
      <p className="sr-only">{project.disciplines.map((d) => site.disciplineLabels[d]).join(", ")}</p>
    </article>
  );
}
