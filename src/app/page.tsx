import Link from "next/link";
import type { CSSProperties } from "react";
import { getProject, profile, publishedProjects, site } from "@/content";
import type { Project } from "@/content/types";
import { Picture, preloadPicture } from "@/components/Picture";
import { projectMeta } from "@/components/ProjectCard";
import { withBase } from "@/lib/media";

const HERO_SIZES = "100vw";

type Featured = (typeof profile.home.featured)[number];

/** Project facts line for the homepage: type, place and year where known. */
function meta(p: Project) {
  return [projectMeta(p), p.year].filter(Boolean).join(", ");
}

function FeatureText({ project, item, align = "start" }: { project: Project; item: Featured; align?: "start" | "end" }) {
  return (
    <div data-reveal className={`flex flex-col ${align === "end" ? "md:justify-end" : ""}`}>
      <p className="t-meta">{meta(project)}</p>
      <h3 className="t-project mt-3">
        <Link href={`/work/${project.slug}`} className="hover:text-accent">
          {project.title}
        </Link>
      </h3>
      <p className="mt-5 max-w-[46ch] text-[1.0625rem] text-lead">{item.text}</p>
      <Link href={`/work/${project.slug}`} className="link mt-6 self-start text-[0.9375rem] font-medium">
        View the project
      </Link>
    </div>
  );
}

/** A render that opens from a mask when it scrolls in, then drifts gently with the page. */
function RevealImage({
  id,
  alt,
  sizes,
  ratio,
  position,
  href,
  label,
  className,
}: {
  id: string;
  alt: string;
  sizes: string;
  ratio: string;
  position?: string;
  href: string;
  label: string;
  /** e.g. a different ratio on small screens: "max-md:aspect-[4/3]!" */
  className?: string;
}) {
  return (
    <Link href={href} className="group block" aria-label={label}>
      <div data-reveal="mask" className={`frame relative ${className ?? ""}`} style={{ aspectRatio: ratio }}>
        <div className="drift absolute inset-0">
          <Picture id={id} alt={alt} sizes={sizes} fill position={position} />
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const { home } = profile;
  const { contact, ui } = site;
  const featured = home.featured
    .map((item) => ({ item, project: getProject(item.slug) }))
    .filter((f): f is { item: Featured; project: Project } => Boolean(f.project));
  const featuredSlugs = new Set(featured.map((f) => f.project.slug));
  const more = publishedProjects.filter((p) => !featuredSlugs.has(p.slug));

  preloadPicture(home.hero.id, HERO_SIZES);

  return (
    <>
      {/* ---------- Hero: one render, full screen, with the headline set into it ---------- */}
      <section
        data-hero-dark
        aria-labelledby="hero-title"
        className="chapter-dark relative h-[100svh] min-h-[620px] max-h-[1080px] overflow-hidden"
      >
        <div className="hero-settle shade-bottom shade-top absolute inset-0">
          <Picture id={home.hero.id} alt={home.hero.alt} sizes={HERO_SIZES} fill priority position="50% 60%" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/5 to-transparent md:via-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end px-[var(--gutter)] pb-[clamp(1.75rem,5vh,4rem)]">
          <p className="fade-in t-meta text-bone/85" style={{ "--d": "0.15s" } as CSSProperties}>
            {home.kicker}
          </p>
          <h1 id="hero-title" className="t-hero mt-5 text-bone">
            <span className="sr-only">{site.person.name}, {site.person.role}. </span>
            {home.headlineParts.map((line, i) => (
              <span key={line} className="line-mask md:whitespace-nowrap">
                <span className="line-rise" style={{ "--i": i } as CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <div
            className="fade-in mt-9 flex flex-wrap items-end justify-between gap-x-8 gap-y-6"
            style={{ "--d": "1.05s" } as CSSProperties}
          >
            <div className="flex flex-wrap gap-3">
              <a href="#work" className="btn btn-primary">
                See selected work
              </a>
              <a href={withBase(contact.cv)} className="btn btn-quiet" download>
                {ui.downloadCv}
              </a>
            </div>
            <Link href={`/work/${home.hero.slug}`} className="t-meta link text-bone/85">
              {home.hero.caption}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Statement ---------- */}
      <section className="chapter-dark px-[var(--gutter)] pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="grid gap-10 md:grid-cols-12">
          <p data-reveal className="t-statement md:col-span-10 lg:col-span-8">
            {home.intro}
          </p>
          <div data-reveal className="flex flex-wrap gap-x-8 gap-y-2 text-[0.9375rem] md:col-span-12" style={{ "--d": "0.15s" } as CSSProperties}>
            <Link href="/about" className="link">
              About me
            </Link>
            <Link href="/bim" className="link">
              BIM & documentation
            </Link>
            <Link href="/contact" className="link">
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Selected work: an editorial sequence, not a grid ---------- */}
      <section id="work" aria-labelledby="work-title" className="chapter-dark pb-28 md:pb-40">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line px-[var(--gutter)] pt-8">
          <h2 id="work-title" data-reveal className="t-display">
            {home.workTitle}
          </h2>
          <Link href="/work" className="link pb-2 text-[0.9375rem]">
            All {publishedProjects.length} projects
          </Link>
        </div>

        <div className="mt-16 grid gap-28 md:mt-24 md:gap-40">
          {featured.map(({ item, project }) => {
            const href = `/work/${project.slug}`;
            const label = `${project.title}: view the project`;

            if (item.layout === "bleed") {
              return (
                <article key={project.slug}>
                  <RevealImage
                    id={item.image.id}
                    alt={item.image.alt}
                    sizes="100vw"
                    ratio="16 / 8"
                    position="50% 70%"
                    href={href}
                    label={label}
                    className="max-md:aspect-[4/3]!"
                  />
                  <div className="mt-10 grid gap-10 px-[var(--gutter)] md:grid-cols-12">
                    <div className="md:col-span-7">
                      <FeatureText project={project} item={item} />
                    </div>
                    {item.detail && (
                      <div className="md:col-span-4 md:col-start-9 md:-mt-40">
                        <RevealImage id={item.detail.id} alt={item.detail.alt} sizes="(min-width: 768px) 30vw, 100vw" ratio="3 / 4" href={href} label={label} />
                      </div>
                    )}
                  </div>
                </article>
              );
            }

            if (item.layout === "layered") {
              return (
                <article key={project.slug} className="grid gap-10 px-[var(--gutter)] md:grid-cols-12 md:items-end">
                  <div className="relative md:order-2 md:col-span-8 md:col-start-5">
                    <RevealImage id={item.image.id} alt={item.image.alt} sizes="(min-width: 768px) 66vw, 100vw" ratio="16 / 10" href={href} label={label} />
                    {item.detail && (
                      <figure
                        data-reveal
                        style={{ "--d": "0.35s" } as CSSProperties}
                        className="sheet relative ms-auto -mt-14 me-4 w-[72%] p-3! shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] md:absolute md:-end-4 md:-bottom-24 md:mt-0 md:me-0 md:w-[42%]"
                      >
                        <Picture id={item.detail.id} alt={item.detail.alt} sizes="(min-width: 768px) 34vw, 78vw" fit="contain" ratio="4 / 3" />
                        <figcaption className="t-label mt-2 text-[#596066]">Ground floor, 3D plan from the Revit model</figcaption>
                      </figure>
                    )}
                  </div>
                  <div className="md:order-1 md:col-span-4 md:pb-10">
                    <FeatureText project={project} item={item} />
                  </div>
                </article>
              );
            }

            const imageRight = item.layout === "right";
            return (
              <article key={project.slug} className="grid gap-10 px-[var(--gutter)] md:grid-cols-12 md:items-end">
                <div className={`md:col-span-7 ${imageRight ? "md:order-2 md:col-start-6" : "md:col-start-1"}`}>
                  <RevealImage
                    id={item.image.id}
                    alt={item.image.alt}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    ratio={project.slug === "moroccan-inspired-living" ? "6 / 5" : "3 / 2"}
                    href={href}
                    label={label}
                  />
                </div>
                <div className={`md:col-span-4 ${imageRight ? "md:order-1" : "md:col-start-9"}`}>
                  <FeatureText project={project} item={item} align="end" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------- Expertise: the drawing chapter ---------- */}
      <section aria-labelledby="expertise-title" className="bg-paper px-[var(--gutter)] pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="grid gap-8 md:grid-cols-12">
          <h2 id="expertise-title" data-reveal className="t-display md:col-span-8">
            {home.expertise.title}
          </h2>
        </div>

        <dl data-reveal className="facts mt-14">
          {home.facts.map((f) => (
            <div key={f.label}>
              <dt className="t-label">{f.label}</dt>
              <dd className="mt-1 text-[1.15rem] leading-snug [font-variation-settings:'wdth'_96]">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-10">
          {[
            { ...home.expertise.design, href: "/services" },
            { ...home.expertise.bim, href: "/bim" },
          ].map((col, i) => (
            <div key={col.title} data-reveal style={{ "--d": `${i * 0.12}s` } as CSSProperties}>
              <h3 className="t-heading">{col.title}</h3>
              <p className="mt-4 max-w-[44ch] text-lead">{col.body}</p>
              <ul className="mt-6 border-t border-line-strong">
                {col.items.map((it) => (
                  <li key={it} className="border-b border-line py-3 text-[1.0625rem]">
                    {it}
                  </li>
                ))}
              </ul>
              <Link href={col.href} className="link mt-6 inline-block font-medium">
                {col.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-24 grid items-start gap-6 md:grid-cols-3">
          {home.expertise.drawings.map((d, i) => (
            <Link key={d.id} href={`/work/${d.slug}`} className="group block" data-reveal style={{ "--d": `${i * 0.1}s` } as CSSProperties}>
              <div className="sheet frame p-[6%]! transition-colors duration-300 group-hover:border-ink" style={{ aspectRatio: "4 / 3" }}>
                <Picture id={d.id} alt={d.alt} sizes="(min-width: 768px) 32vw, 100vw" fit="contain" className="h-full w-full aspect-auto!" />
              </div>
              <p className="t-caption group-hover:text-ink">{d.caption}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- More projects: compact index with thumbnails ---------- */}
      <section aria-labelledby="more-title" className="bg-paper px-[var(--gutter)] pb-28 md:pb-36">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line-strong pt-8">
          <h2 id="more-title" className="t-heading">
            {home.moreTitle}
          </h2>
          <Link href="/work?view=index" className="link text-[0.9375rem]">
            Browse all {publishedProjects.length} as an index
          </Link>
        </div>
        <ul className="mt-8 grid gap-x-10 md:grid-cols-2">
          {more.map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link href={`/work/${p.slug}`} className="group grid grid-cols-[5.5rem_1fr] items-center gap-5 py-4">
                <div className={`frame ${p.coverStyle === "sheet" ? "sheet p-1!" : ""}`}>
                  <Picture
                    id={p.cover.id}
                    alt=""
                    sizes="88px"
                    ratio="4 / 3"
                    fit={p.coverStyle === "sheet" ? "contain" : "cover"}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[1.0625rem] font-medium [font-variation-settings:'wdth'_92] group-hover:text-accent">{p.title}</p>
                  <p className="t-meta mt-0.5 truncate">{meta(p)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Closing ---------- */}
      <section aria-labelledby="closing-title" className="chapter-dark relative overflow-hidden px-[var(--gutter)] py-28 md:py-40">
        <div className="absolute inset-0 opacity-30">
          <Picture id={home.closing.image.id} alt="" sizes="100vw" fill />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/70 to-graphite/30" />
        <div className="relative grid gap-12 md:grid-cols-12">
          <div className="md:col-span-9">
            <h2 id="closing-title" data-reveal className="t-display">
              {home.closing.title}
            </h2>
            <p data-reveal className="t-lead mt-8 text-lead" style={{ "--d": "0.1s" } as CSSProperties}>
              {home.closing.body}
            </p>
          </div>
          <div data-reveal className="md:col-span-12" style={{ "--d": "0.2s" } as CSSProperties}>
            <a href={`mailto:${contact.email}`} className="link block text-[clamp(1.35rem,3.6vw,3rem)] leading-tight break-all [font-variation-settings:'wdth'_100]">
              {contact.email}
            </a>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${contact.email}`} className="btn btn-primary">
                {ui.emailMe}
              </a>
              {contact.showPhone && (
                <a href={contact.whatsapp} className="btn btn-quiet" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              )}
              <a href={contact.linkedin} className="btn btn-quiet" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={withBase(contact.cv)} className="btn btn-quiet" download>
                {ui.downloadCv}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
