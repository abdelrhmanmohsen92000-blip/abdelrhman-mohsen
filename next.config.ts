import type { NextConfig } from "next";

// Static export: the whole site builds to plain HTML/CSS/JS in out/, deployable to Vercel,
// GitHub Pages, Netlify or any static host. Set NEXT_PUBLIC_BASE_PATH (e.g. "/portfolio")
// only when the site is served from a sub-path, as on a GitHub Pages project site.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  // Most visitors arrive once (recruiters, clients), so inlining the small Tailwind stylesheet
  // into each page removes a render-blocking request and paints sooner.
  experimental: { inlineCss: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
