import type { Metadata } from "next";
import { profile, site } from "@/content";
import type { Credential } from "@/content/types";
import { Picture } from "@/components/Picture";
import { withBase } from "@/lib/media";
import { absoluteUrl } from "@/lib/url";

const description =
  "About Abdelrhman Mohsen: BIM architect and architectural designer, Mansoura University graduate and KAITECH Architectural BIM Diploma holder, with experience at EDEC, Al-Orabi Engineering Consulting, Vision International Group and DIZ Studio.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: absoluteUrl("/about/") },
  openGraph: { title: "About", description, url: absoluteUrl("/about/") },
};

const month = (d: string) => {
  if (d === "Present" || !d.includes("-")) return d;
  const [y, m] = d.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
};

function CredentialList({ items }: { items: Credential[] }) {
  return (
    <ul>
      {items.map((c) => (
        <li key={c.title} className="grid gap-2 border-t border-line py-5 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <h3 className="t-subheading">{c.title}</h3>
            <p className="t-meta mt-1">{c.issuer}</p>
          </div>
          <div className="md:col-span-6">
            <p className="text-[0.9875rem]">{c.detail}</p>
            {c.id && <p className="t-meta mt-1">Certificate ID {c.id}</p>}
          </div>
          {c.date && <p className="t-meta md:col-span-2 md:text-end">{c.date}</p>}
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  const { about, experience, education, certifications, toolkit } = profile;
  const { person, contact, ui } = site;

  return (
    <div className="px-[var(--gutter)]">
      <header className="grid gap-10 pt-10 pb-16 md:grid-cols-12 md:pt-16">
        <div className="md:col-span-7">
          <h1 className="t-title">About</h1>
          <p className="t-lead mt-8">{about.intro}</p>
          <div className="t-body mt-6 text-lead">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={withBase(contact.cv)} download>
              {ui.downloadCv}
            </a>
            <a className="btn btn-quiet" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn profile
            </a>
          </div>
        </div>
        <figure className="md:col-span-4 md:col-start-9">
          <Picture
            id="profile/portrait"
            alt="Black and white portrait of Abdelrhman Mohsen sitting on a ledge above a city."
            sizes="(min-width: 768px) 28vw, 80vw"
            priority
            className="grayscale"
          />
          <figcaption className="mt-4 grid grid-cols-2 border-t border-line-strong">
            <span className="border-e border-b border-line py-2 pe-3">
              <span className="t-label block">Based in</span>
              {person.base}
            </span>
            <span className="border-b border-line py-2 ps-3">
              <span className="t-label block">Languages</span>
              Arabic, English
            </span>
            <span className="col-span-2 border-b border-line py-2">
              <span className="t-label block">Registration</span>
              {person.sce}
            </span>
          </figcaption>
        </figure>
      </header>

      <section aria-labelledby="approach-title" className="border-t border-line-strong pt-6">
        <h2 id="approach-title" className="t-heading">
          {about.approachTitle}
        </h2>
        <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-3">
          {about.approach.map((a) => (
            <div key={a.title}>
              <h3 className="t-subheading">{a.title}</h3>
              <p className="mt-3 text-lead">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="experience-title" className="mt-24">
        <h2 id="experience-title" className="t-heading border-t border-line-strong pt-6">
          Experience
        </h2>
        <ol className="mt-8">
          {experience.map((j) => (
            <li key={j.organisation} className="grid gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-6">
              <p className="t-meta tabular-nums md:col-span-2">
                {month(j.start)} – {month(j.end)}
              </p>
              <div className="md:col-span-3">
                <h3 className="t-subheading">{j.organisation}</h3>
                <p className="t-meta mt-1">
                  {j.role}, {j.terms.toLowerCase()}. {j.place}
                </p>
              </div>
              <ul className="grid gap-2 text-[0.9875rem] md:col-span-7">
                {j.points.map((pt) => (
                  <li key={pt} className="relative ps-4 before:absolute before:start-0 before:top-[0.7em] before:h-px before:w-2 before:bg-line-strong">
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="education-title" className="mt-24">
        <h2 id="education-title" className="t-heading border-t border-line-strong pt-6 pb-4">
          Education
        </h2>
        <CredentialList items={education} />
      </section>

      <section aria-labelledby="certs-title" className="mt-20">
        <h2 id="certs-title" className="t-heading border-t border-line-strong pt-6 pb-4">
          Certificates
        </h2>
        <CredentialList items={certifications} />
      </section>

      <section aria-labelledby="skills-title" className="mt-20">
        <h2 id="skills-title" className="t-heading border-t border-line-strong pt-6">
          Software and languages
        </h2>
        <dl className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
          {toolkit.map((t) => (
            <div key={t.group}>
              <dt className="t-label">{t.group}</dt>
              <dd className="mt-1">{t.items.join(", ")}</dd>
            </div>
          ))}
          <div>
            <dt className="t-label">Languages</dt>
            <dd className="mt-1">{person.languages.join(", ")}</dd>
          </div>
        </dl>
        <p className="t-meta mt-10">{about.status}</p>
      </section>
    </div>
  );
}
