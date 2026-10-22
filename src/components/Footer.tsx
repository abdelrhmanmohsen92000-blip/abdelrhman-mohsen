import Link from "next/link";
import { site } from "@/content";
import { withBase } from "@/lib/media";

export function Footer() {
  const { person, contact, nav, ui } = site;
  return (
    <footer className="no-print mt-24 border-t border-line-strong px-[var(--gutter)] pt-10 pb-12">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="t-subheading">{person.name}</p>
          <p className="t-meta mt-1">{person.role}</p>
          <p className="mt-4 max-w-[38ch] text-[0.9375rem] text-lead">{person.availability}</p>
        </div>
        <nav aria-label="Footer">
          <p className="t-label mb-2">Pages</p>
          <ul className="grid gap-1 text-[0.9375rem]">
            <li>
              <Link className="link" href="/">
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="t-label mb-2">Get in touch</p>
          <ul className="grid gap-1 text-[0.9375rem]">
            <li>
              <a className="link break-all" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
            <li>
              <a className="link" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="link" href={withBase(contact.cv)} download>
                {ui.downloadCv} (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="t-meta mt-12">
        © {new Date().getFullYear()} {person.name}. {ui.footerNote}
      </p>
    </footer>
  );
}
