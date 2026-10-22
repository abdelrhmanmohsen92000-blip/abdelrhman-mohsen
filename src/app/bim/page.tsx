import type { Metadata } from "next";
import Link from "next/link";
import { getProject, profile, site } from "@/content";
import type { Figure } from "@/content/types";
import { preloadPicture } from "@/components/Picture";
import { PageLightbox, ZoomFigure } from "@/components/Story";
import { withBase } from "@/lib/media";
import { absoluteUrl } from "@/lib/url";

const description =
  "BIM work by Abdelrhman Mohsen: Revit models to LOD 350+, Navisworks clash coordination, ISO 19650 information management, shop drawings, schedules and licensing packages.";

export const metadata: Metadata = {
  title: "BIM & documentation",
  description,
  alternates: { canonical: absoluteUrl("/bim/") },
  openGraph: { title: "BIM & documentation", description, url: absoluteUrl("/bim/") },
};

export default function BimPage() {
  const { bimPage, capabilities, record, toolkit } = profile;
  const figures: Figure[] = [bimPage.lead, ...bimPage.gallery];
  const leadSizes = "(min-width: 1024px) calc(100vw - 6.5rem), 100vw";
  preloadPicture(bimPage.lead.id, leadSizes);

  return (
    <>
      <header className="grid gap-6 px-[var(--gutter)] pt-[calc(var(--header-h)+2.5rem)] pb-12 md:grid-cols-12 md:pt-[calc(var(--header-h)+4rem)]">
        <h1 className="t-title md:col-span-7">{bimPage.title}</h1>
        <p className="t-lead text-lead md:col-span-5 md:self-end">{bimPage.intro}</p>
      </header>

      <div className="px-[var(--gutter)]">
        <ZoomFigure
          figure={bimPage.lead}
          index={0}
          sheet
          priority
          sizes={leadSizes}
          className="mx-auto w-full max-w-[1500px]"
        />
        <p className="t-meta mt-2">
          <Link className="link" href={`/work/${bimPage.lead.slug}`}>
            View the project
          </Link>
        </p>
      </div>

      {/* Workflow: a real sequence, so it is numbered. */}
      <section aria-labelledby="workflow-title" className="mt-24 px-[var(--gutter)]">
        <h2 id="workflow-title" className="t-heading border-t border-line-strong pt-6">
          {bimPage.workflowTitle}
        </h2>
        <ol className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          {bimPage.workflow.map((s, i) => (
            <li key={s.title} className="bg-paper py-5 pe-5 sm:ps-0 lg:ps-5 lg:first:ps-0">
              <span className="t-label tabular-nums text-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-subheading mt-2">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-lead">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="gallery-title" className="mt-24 px-[var(--gutter)]">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line-strong pt-6">
          <h2 id="gallery-title" className="t-heading">
            {bimPage.galleryTitle}
          </h2>
          <p className="t-meta">{bimPage.galleryIntro}</p>
        </div>
        <div className="mt-10 grid items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {bimPage.gallery.map((g, i) => {
            const project = "slug" in g && g.slug ? getProject(g.slug) : undefined;
            return (
              <div key={g.id}>
                <ZoomFigure
                  figure={g}
                  index={i + 1}
                  sheet
                  ratio="4 / 3"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                {project && (
                  <p className="t-meta mt-1">
                    <Link className="link" href={`/work/${project.slug}`}>
                      {project.title}
                    </Link>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="capabilities-title" className="mt-24 px-[var(--gutter)]">
        <h2 id="capabilities-title" className="t-heading border-t border-line-strong pt-6">
          What I deliver
        </h2>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {capabilities.map((c) => (
            <div key={c.group}>
              <h3 className="t-subheading border-b border-line pb-2">{c.group}</h3>
              <ul className="mt-3 grid gap-1.5 text-[0.9375rem]">
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="record-title" className="mt-24 px-[var(--gutter)]">
        <div className="grid gap-4 border-t border-line-strong pt-6 md:grid-cols-12">
          <h2 id="record-title" className="t-heading md:col-span-4">
            {bimPage.recordTitle}
          </h2>
          <p className="text-lead md:col-span-8">{bimPage.recordIntro}</p>
        </div>
        <ul className="mt-8">
          {record.map((r) => (
            <li key={r.name} className="grid gap-2 border-t border-line py-5 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-4">
                <h3 className="t-subheading">
                  {r.slug ? (
                    <Link href={`/work/${r.slug}`} className="link">
                      {r.name}
                    </Link>
                  ) : (
                    r.name
                  )}
                </h3>
                {r.size && <p className="t-meta mt-1 tabular-nums">{r.size}</p>}
              </div>
              <p className="max-w-[70ch] text-lead md:col-span-8">{r.scope}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tools-title" className="mt-24 px-[var(--gutter)]">
        <h2 id="tools-title" className="t-heading border-t border-line-strong pt-6">
          Software
        </h2>
        <dl className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {toolkit.map((t) => (
            <div key={t.group}>
              <dt className="t-label">{t.group}</dt>
              <dd className="mt-1">{t.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 flex flex-wrap gap-3">
          <a className="btn btn-primary" href={withBase(site.contact.cv)} download>
            {site.ui.downloadCv}
          </a>
          <Link className="btn btn-quiet" href="/contact">
            Discuss a role or project
          </Link>
        </div>
      </section>

      <PageLightbox figures={figures} />
    </>
  );
}
