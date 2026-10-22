import type { Metadata } from "next";
import { profile, site } from "@/content";
import { ContactForm } from "@/components/ContactForm";
import { withBase } from "@/lib/media";
import { absoluteUrl } from "@/lib/url";

const description = "Contact Abdelrhman Mohsen, BIM architect and architectural designer, about roles, design projects or BIM support.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: absoluteUrl("/contact/") },
  openGraph: { title: "Contact", description, url: absoluteUrl("/contact/") },
};

export default function ContactPage() {
  const { contactPage } = profile;
  const { contact, person, ui } = site;

  return (
    <div className="grid gap-16 px-[var(--gutter)] pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)] lg:grid-cols-12">
      <div className="lg:col-span-6">
        <h1 className="t-title">{contactPage.title}</h1>
        <p className="t-lead mt-8 text-lead">{contactPage.intro}</p>

        <dl className="mt-12 border-t border-line-strong">
          <div className="border-b border-line py-4">
            <dt className="t-label">Email</dt>
            <dd className="mt-1">
              <a className="link text-[clamp(1.1rem,2vw,1.45rem)] break-all" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </dd>
          </div>
          <div className="border-b border-line py-4">
            <dt className="t-label">LinkedIn</dt>
            <dd className="mt-1">
              <a className="link break-all" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                {contact.linkedinLabel}
              </a>
            </dd>
          </div>
          {contact.showPhone && (
            <div className="border-b border-line py-4">
              <dt className="t-label">Phone and WhatsApp</dt>
              <dd className="mt-1 flex flex-wrap gap-x-6 gap-y-1">
                <a className="link" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                  {contact.phone}
                </a>
                <a className="link" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  Message on WhatsApp
                </a>
              </dd>
            </div>
          )}
          <div className="border-b border-line py-4">
            <dt className="t-label">CV</dt>
            <dd className="mt-1">
              <a className="link" href={withBase(contact.cv)} download>
                {ui.downloadCv} (PDF)
              </a>
            </dd>
          </div>
          <div className="border-b border-line py-4">
            <dt className="t-label">Availability</dt>
            <dd className="mt-1">{person.availability}</dd>
          </div>
        </dl>
      </div>

      <section aria-labelledby="form-title" className="lg:col-span-5 lg:col-start-8 lg:pt-4">
        <h2 id="form-title" className="t-heading mb-8">
          {contactPage.formTitle}
        </h2>
        <ContactForm
          to={contact.email}
          copy={{
            fields: contactPage.fields,
            topics: contactPage.topics,
            submit: contactPage.submit,
            submitService: contactPage.submitService,
            note: contactPage.formNote,
            sent: contactPage.sent,
            sentService: contactPage.sentService,
            error: contactPage.error,
          }}
        />
      </section>
    </div>
  );
}
