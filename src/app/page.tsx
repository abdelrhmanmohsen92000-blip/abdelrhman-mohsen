import Link from "next/link";
import { getProject, profile, publishedProjects, site } from "@/content";
import type { Project } from "@/content/types";
import { Picture, preloadPicture } from "@/components/Picture";
import { ProjectCard } from "@/components/ProjectCard";
import { withBase } from "@/lib/media";

// Editorial rhythm for the six featured projects: wide/narrow, narrow/wide, then halves.
const RENDER_SIZES = "(min-width: 1440px) calc((100vw - 340px) * 0.61), (min-width: 1024px) calc((100vw - 300px) * 0.61), 100vw";
const DRAWING_SIZES = "(min-width: 1024px) calc((100vw - 300px) * 0.39), 100vw";

const layout = [
  { span: "md:col-span-7", ratio: "4 / 3", large: true },
  { span: "md:col-span-5 md:mt-24", ratio: "4 / 5" },
  { span: "md:col-span-5", ratio: "1 / 1" },
  { span: "md:col-span-7 md:mt-24", ratio: "4 / 3", large: true },
  { span: "md:col-span-6", ratio: "4 / 3" },
  { span: "md:col-span-6 md:mt-16", ratio: "4 / 3" },
];

export default function HomePage() {
  const { home, notes } = profile;
  const { contact, ui } = site;
  const featured = home.featured.map((s) => getProject(s)).filter((p): p is Project => Boolean(p));

  // The hero render is the LCP image on every screen size.
  preloadPicture(home.heroRender.id, RENDER_SIZES);

  return (
    <>
      {/* Hero: one render and one drawing, one half of the headline under each. */}
      <section aria-labelledby="hero-title" className="border-b border-line-strong">
        <h1 id="hero-title" className="sr-only">
          {site.person.name}, {site.person.role}. {home.headline}
        </h1>
        <div className="grid lg:grid-cols-[1.55fr_1fr]">
          <Link href={`/work/${home.heroRender.slug}`} className="group block lg:border-e lg:border-line-strong">
            <div className="relative overflow-hidden">
              <Picture
                id={home.heroRender.id}
                alt={home.heroRender.alt}
                priority
                ratio="4 / 3"
                sizes={RENDER_SIZES}
                className="lg:aspect-auto! lg:h-[64svh]"
              />
              <span aria-hidden="true" className="veil veil-fade" />
            </div>
            <div className="px-[var(--gutter)] pt-6 pb-8">
              <p aria-hidden="true" className="rise-in text-[clamp(2.1rem,4vw,4.25rem)] leading-[0.98] font-[340] tracking-[-0.03em] [font-variation-settings:'wdth'_125] group-hover:text-redline">
                {home.headlineParts[0]}
              </p>
              <p className="t-meta mt-3">{home.heroRender.caption}</p>
            </div>
          </Link>
          <Link href={`/work/${home.heroDrawing.slug}`} className="group block border-t border-line-strong lg:border-t-0">
            <div className="relative bg-sheet">
              <div className="p-6 lg:h-[64svh] lg:p-8">
                <Picture
                  id={home.heroDrawing.id}
                  alt={home.heroDrawing.alt}
                  eager
                  fit="contain"
                  ratio="4 / 3"
                  sizes={DRAWING_SIZES}
                  className="h-full w-full lg:aspect-auto!"
                />
              </div>
              <span aria-hidden="true" className="veil veil-plot" />
            </div>
            <div className="px-[var(--gutter)] pt-6 pb-8">
              <p aria-hidden="true" className="rise-in text-[clamp(2.1rem,4vw,4.25rem)] leading-[0.98] font-[340] tracking-[-0.03em] [font-variation-settings:'wdth'_125] group-hover:text-redline">
                {home.headlineParts[1]}
              </p>
              <p className="t-meta mt-3">{home.heroDrawing.caption}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Introduction */}
      <section className="grid gap-8 px-[var(--gutter)] py-14 md:grid-cols-12 md:py-20">
        <p className="t-lead md:col-span-8 lg:col-span-7">{home.intro}</p>
        <div className="flex flex-wrap items-start gap-3 md:col-span-4 md:justify-end lg:col-span-5">
          <Link href="/work" className="btn btn-primary">
            {ui.viewWork}
          </Link>
          <a href={withBase(contact.cv)} className="btn btn-quiet" download>
            {ui.downloadCv}
          </a>
        </div>
      </section>

      {/* Selected work */}
      <section aria-labelledby="selected-title" className="px-[var(--gutter)]">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line-strong pt-6">
          <h2 id="selected-title" className="t-heading">
            Selected work
          </h2>
          <Link href="/work" className="link t-meta text-ink">
            {ui.allProjects} ({publishedProjects.length})
          </Link>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-16 md:grid-cols-12">
          {featured.map((p, i) => {
            const l = layout[i % layout.length];
            return (
              <div key={p.slug} className={l.span}>
                <ProjectCard
                  project={p}
                  ratio={l.ratio}
                  large={l.large}
                  sizes={l.large ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Two ways in */}
      <section aria-label="Who I work with" className="mt-28 grid border-y border-line-strong md:grid-cols-2">
        {[
          { ...home.forCompanies, href: "/bim" },
          { ...home.forClients, href: "/work?discipline=exterior" },
        ].map((a, i) => (
          <div key={a.title} className={`px-[var(--gutter)] py-12 ${i === 0 ? "md:border-e md:border-line-strong" : "border-t border-line-strong md:border-t-0"}`}>
            <h2 className="t-heading">{a.title}</h2>
            <p className="mt-4 max-w-[46ch] text-lead">{a.body}</p>
            <Link href={a.href} className="link mt-6 inline-block font-medium">
              {a.cta}
            </Link>
          </div>
        ))}
      </section>

      {/* General notes */}
      <section aria-labelledby="notes-title" className="grid gap-8 px-[var(--gutter)] py-20 md:grid-cols-12">
        <h2 id="notes-title" className="t-heading md:col-span-4">
          {home.notesTitle}
        </h2>
        <ol className="md:col-span-8">
          {notes.map((n, i) => (
            <li key={n} className="grid grid-cols-[2.5rem_1fr] gap-2 border-t border-line py-4 first:border-line-strong">
              <span className="t-label pt-1 text-ink tabular-nums">{i + 1}.</span>
              <span className="text-[1.0625rem]">{n}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Contact */}
      <section aria-labelledby="cta-title" className="mx-[var(--gutter)] border-t border-line-strong pt-12">
        <h2 id="cta-title" className="t-title max-w-[16ch]">
          {home.ctaTitle}
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={`mailto:${contact.email}`} className="link text-[clamp(1.1rem,2.2vw,1.6rem)] break-all">
            {contact.email}
          </a>
          <Link href="/contact" className="btn btn-quiet">
            Contact details
          </Link>
        </div>
      </section>
    </>
  );
}
