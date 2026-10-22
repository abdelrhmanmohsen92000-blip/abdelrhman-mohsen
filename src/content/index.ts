// Single entry point for content. Adding Arabic later means adding src/content/ar/ with the
// same exports and a locale switch here; components already receive everything from this file.
import * as site from "./en/site";
import * as profile from "./en/profile";
import { projects, publishedProjects } from "./en/projects";
import type { Locale } from "./types";

export const locales: Locale[] = ["en"];
export const defaultLocale: Locale = "en";
export const localeDir: Record<Locale, "ltr" | "rtl"> = { en: "ltr" };

export { site, profile, projects, publishedProjects };

export function getProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = publishedProjects.findIndex((p) => p.slug === slug);
  return publishedProjects[(i + 1) % publishedProjects.length];
}

export const featuredProjects = publishedProjects.filter((p) => p.featured);
