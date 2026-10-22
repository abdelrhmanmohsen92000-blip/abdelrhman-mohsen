import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, nextProject, publishedProjects, site } from "@/content";
import type { Project } from "@/content/types";
import { JsonLd } from "@/components/JsonLd";
import { Picture, preloadPicture } from "@/components/Picture";
import { ProjectFacts } from "@/components/ProjectFacts";
import { projectMeta } from "@/components/ProjectCard";
import { PageLightbox, Story, ZoomFigure, collectFigures } from "@/components/Story";
import { getMedia, ogPath } from "@/lib/media";
import { absoluteUrl } from "@/lib/url";

export const dynamicParams = false;

const SHEET_SIZES = "(min-width: 1024px) calc(100vw - 6.5rem), 100vw";
const PHOTO_SIZES = "100vw";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = absoluteUrl(`/work/${slug}/`);
  const image = absoluteUrl(ogPath(project.cover.id));
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", title: project.title, description: project.summary, url, images: [{ url: image, width: 1200, alt: project.cover.alt }] },
    twitter: { card: "summary_large_image", title: project.title, description: project.summary, images: [image] },
  };
}

function Breadcrumb({ project }: { project: Project }) {
  return (
    <nav aria-label="Breadcrumb" className="t-meta mb-6">
      <Link className="link" href="/work">
        Work
      </Link>
      <span aria-hidden="true" className="mx-2">
        /
      </span>
      <span>{projectMeta(project)}</span>
    </nav>
  );
}

function Disciplines({ project }: { project: Project }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Disciplines">
      {project.disciplines.map((d) => (
        <li key={d}>
          <Link href={`/work?discipline=${d}`} className="t-meta inline-block border border-line-strong px-2.5 py-1 text-ink hover:border-ink">
            {site.disciplineLabels[d]}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = nextProject(slug);
  const figures = collectFigures(project.story, project.cover);
  const coverIsSheet = project.coverStyle === "sheet" || getMedia(project.cover.id).kind === "drawing";
  const coverSizes = coverIsSheet ? SHEET_SIZES : PHOTO_SIZES;
  preloadPicture(project.cover.id, coverSizes);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    image: absoluteUrl(ogPath(project.cover.id)),
    url: absoluteUrl(`/work/${slug}/`),
    creator: { "@type": "Person", name: site.person.name },
    ...(project.year ? { dateCreated: project.year } : {}),
    ...(project.location ? { locationCreated: { "@type": "Place", name: project.location } } : {}),
    keywords: project.disciplines.map((d) => site.disciplineLabels[d]).join(", "),
  };

  return (
    <article>
      <JsonLd data={schema} />
      {coverIsSheet ? (
        <>
          <header className="px-[var(--gutter)] pt-[calc(var(--header-h)+2.5rem)] pb-10 md:pt-[calc(var(--header-h)+4rem)] md:pb-14">
            <Breadcrumb project={project} />
            <h1 className="t-title max-w-[18ch]">{project.title}</h1>
            <p className="t-lead mt-6 text-lead">{project.summary}</p>
            <Disciplines project={project} />
          </header>
          <div className="px-[var(--gutter)]">
            <ZoomFigure
              figure={project.cover}
              index={0}
              sheet
              priority
              sizes={coverSizes}
              className="mx-auto w-full max-w-[1500px]"
            />
          </div>
        </>
      ) : (
        <header data-hero-dark className="chapter-dark relative h-[92svh] min-h-[560px] max-h-[1000px] overflow-hidden">
          <div className="hero-settle shade-bottom shade-top absolute inset-0">
            <Picture id={project.cover.id} alt={project.cover.alt} priority sizes={coverSizes} fill />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-end px-[var(--gutter)] pb-[clamp(1.75rem,5vh,3.5rem)]">
            <Breadcrumb project={project} />
            <h1 className="t-display max-w-[16ch] text-bone">
              <span className="line-mask">
                <span className="line-rise">{project.title}</span>
              </span>
            </h1>
            <div className="fade-in mt-6 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="t-lead text-bone/85">{project.summary}</p>
                <Disciplines project={project} />
              </div>
              <button type="button" className="btn btn-quiet" data-lightbox={0} aria-label={`${site.ui.lightboxOpen}: ${project.cover.alt}`}>
                View full image
              </button>
            </div>
          </div>
        </header>
      )}

      <div className="px-[var(--gutter)] pt-12 pb-16 md:pt-16 md:pb-24">
        <ProjectFacts project={project} />
        {project.note && <p className="t-meta mt-6 max-w-[70ch]">{project.note}</p>}
      </div>

      {project.story.length > 0 && <Story blocks={project.story} figures={figures} />}

      <nav aria-label={site.ui.nextProject} className="mt-24 border-t border-line-strong px-[var(--gutter)] pt-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="t-label">{site.ui.nextProject}</p>
            <Link href={`/work/${next.slug}`} className="t-heading mt-2 block hover:text-accent">
              {next.title}
            </Link>
            <p className="t-meta mt-1">{projectMeta(next)}</p>
          </div>
          <Link href="/work" className="btn btn-quiet">
            {site.ui.allProjects}
          </Link>
        </div>
      </nav>

      <PageLightbox figures={figures} />
    </article>
  );
}
