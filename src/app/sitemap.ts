import type { MetadataRoute } from "next";
import { publishedProjects } from "@/content";
import { absoluteUrl } from "@/lib/url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/work/", "/bim/", "/services/", "/about/", "/contact/"];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...publishedProjects.map((p) => ({ url: absoluteUrl(`/work/${p.slug}/`), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
