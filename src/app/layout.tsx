import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { defaultLocale, localeDir, profile, site } from "@/content";
import { Footer } from "@/components/Footer";
import { RevealObserver, revealBootScript } from "@/components/RevealObserver";
import { SiteHeader } from "@/components/SiteHeader";
import { JsonLd } from "@/components/JsonLd";
import { ogPath } from "@/lib/media";
import { absoluteUrl, siteUrl } from "@/lib/url";
import "./globals.css";

// Archivo's width axis carries the whole type system: expanded for display, normal for
// reading, condensed for title-block labels. One family, no monospace.
// Self-hosted and trimmed with fontTools to the ranges the site uses (width 75–125,
// weight 330–600, Latin plus typographic punctuation): 35 KB instead of 90 KB.
// See README > Fonts to regenerate it, e.g. when adding Arabic.
const archivo = localFont({
  src: "../fonts/archivo-variable.woff2",
  variable: "--font-archivo",
  display: "swap",
  weight: "330 600",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

const ogImage = absoluteUrl(ogPath("lamar-business-park/street-angle"));

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seo.title, template: `%s | ${site.person.name}` },
  description: site.seo.description,
  keywords: site.seo.keywords,
  authors: [{ name: site.person.name }],
  creator: site.person.name,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: site.person.name,
    title: site.seo.title,
    description: site.seo.description,
    url: absoluteUrl("/"),
    locale: "en_US",
    images: [{ url: ogImage, width: 1200, alt: "Lamar Business Park, street view render" }],
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description, images: [ogImage] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#181a1c",
  colorScheme: "light",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.person.name,
  jobTitle: site.person.role,
  email: `mailto:${site.contact.email}`,
  url: absoluteUrl("/"),
  sameAs: [site.contact.linkedin],
  nationality: site.person.nationality,
  knowsLanguage: ["ar", "en"],
  address: { "@type": "PostalAddress", addressCountry: "EG" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Mansoura University" },
  knowsAbout: profile.toolkit.flatMap((g) => g.items),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={defaultLocale} dir={localeDir[defaultLocale]} className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-50 bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:start-3 focus:top-3"
        >
          {site.ui.skipToContent}
        </a>
        <JsonLd data={personSchema} />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
