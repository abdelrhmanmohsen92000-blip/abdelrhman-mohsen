import type { Metadata } from "next";
import Link from "next/link";
import { profile, publishedProjects, site } from "@/content";
import type { Service } from "@/content/types";
import { absoluteUrl } from "@/lib/url";

const description =
  "Services from Abdelrhman Mohsen: BIM modelling and coordination, construction and shop drawings, schedules and quantities, and architectural, facade, interior and landscape design with visualization.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: absoluteUrl("/services/") },
  openGraph: { title: "Services", description, url: absoluteUrl("/services/") },
};

function ServiceList({ items }: { items: Service[] }) {
  return (
    <ul>
      {items.map((s) => {
        const examples = publishedProjects.filter((p) => s.disciplines.some((d) => p.disciplines.includes(d))).length;
        return (
          <li key={s.title} className="grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-6">
            <h3 className="t-subheading md:col-span-4">{s.title}</h3>
            <div className="md:col-span-5">
              <p>{s.body}</p>
              <Link href={`/work?discipline=${s.disciplines[0]}`} className="link t-meta mt-3 inline-block text-ink">
                See {examples} related project{examples === 1 ? "" : "s"}
              </Link>
            </div>
            <ul className="grid content-start gap-1 text-[0.9375rem] text-lead md:col-span-3">
              {s.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

export default function ServicesPage() {
  const { services, servicesPage } = profile;
  const delivery = services.filter((s) => s.disciplines.includes("bim"));
  const design = services.filter((s) => !s.disciplines.includes("bim"));

  return (
    <div className="px-[var(--gutter)]">
      <header className="grid gap-6 pt-[calc(var(--header-h)+2.5rem)] pb-14 md:grid-cols-12 md:pt-[calc(var(--header-h)+4rem)]">
        <h1 className="t-title md:col-span-6">{servicesPage.title}</h1>
        <p className="t-lead text-lead md:col-span-6 md:self-end">{servicesPage.intro}</p>
      </header>

      <section aria-labelledby="delivery-title">
        <h2 id="delivery-title" className="t-heading border-t border-line-strong pt-6 pb-4">
          BIM & delivery
        </h2>
        <ServiceList items={delivery} />
      </section>

      <section aria-labelledby="design-title" className="mt-20">
        <h2 id="design-title" className="t-heading border-t border-line-strong pt-6 pb-4">
          Design
        </h2>
        <ServiceList items={design} />
      </section>

      <section aria-labelledby="process-title" className="mt-20">
        <h2 id="process-title" className="t-heading border-t border-line-strong pt-6">
          How a project runs
        </h2>
        <ol className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {servicesPage.process.map((s, i) => (
            <li key={s.title} className="border-t border-line pt-4">
              <span className="t-label tabular-nums text-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-subheading mt-2">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-lead">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-line-strong pt-10">
        <p className="t-heading max-w-[24ch]">{servicesPage.cta}</p>
        <div className="flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/contact">
            {site.ui.emailMe}
          </Link>
          <Link className="btn btn-quiet" href="/work">
            {site.ui.viewWork}
          </Link>
        </div>
      </section>
    </div>
  );
}
