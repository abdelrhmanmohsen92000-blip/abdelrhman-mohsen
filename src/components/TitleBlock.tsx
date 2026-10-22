import Link from "next/link";
import { site } from "@/content";
import { withBase } from "@/lib/media";
import { NavLinks } from "./NavLinks";

/**
 * The fixed column on large screens, modelled on a drawing sheet's title block:
 * who, what, status and how to reach him, always in view.
 */
export function TitleBlock() {
  const { person, contact, ui } = site;
  return (
    <aside className="title-block no-print hidden lg:block" aria-label="Site">
      <div className="sticky top-0 flex h-dvh flex-col">
        <div className="tb-cell pt-6">
          <Link href="/" className="block">
            <span className="block text-[1.4rem] leading-tight font-semibold [font-variation-settings:'wdth'_112]">
              {person.name}
            </span>
            <span className="t-meta mt-1 block">{person.role}</span>
          </Link>
        </div>

        <nav aria-label="Main" className="tb-nav border-b border-line py-3">
          <NavLinks />
        </nav>

        <div className="flex-1" />

        <div className="tb-cell">
          <p className="t-label">Status</p>
          <p className="mt-1 text-[0.9375rem] leading-snug">{person.availability}</p>
        </div>
        <dl className="grid grid-cols-2 border-b border-line">
          <div className="border-e border-line px-5 py-3">
            <dt className="t-label">Based in</dt>
            <dd className="text-[0.9375rem]">{person.base}</dd>
          </div>
          <div className="px-5 py-3">
            <dt className="t-label">Registration</dt>
            <dd className="text-[0.9375rem]">SCE eligible</dd>
          </div>
        </dl>
        <div className="grid gap-3 px-5 py-5">
          <a className="btn btn-primary w-full" href={withBase(contact.cv)} download>
            {ui.downloadCv}
          </a>
          <div className="flex justify-between gap-3 text-[0.9375rem]">
            <a className="link" href={`mailto:${contact.email}`}>
              {ui.emailMe}
            </a>
            <a className="link" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
