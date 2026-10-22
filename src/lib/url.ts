import { basePath } from "./media";

/**
 * Public origin of the deployed site, without a trailing slash and without the base path,
 * e.g. "https://abdelrhmanmohsen.com". Set SITE_URL at build time for a custom domain; on
 * Vercel the project's production address is used automatically when SITE_URL is unset.
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = (process.env.SITE_URL || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")).replace(/\/$/, "");

/** Fully qualified URL for canonical links, Open Graph and the sitemap. */
export function absoluteUrl(path = "/") {
  return `${siteUrl}${basePath}${path}`;
}
