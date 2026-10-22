import manifest from "@/content/media.json";

export interface MediaInfo {
  width: number;
  height: number;
  kind: "photo" | "drawing";
  widths: number[];
  blur: string;
  color: string;
}

const media = manifest as Record<string, MediaInfo>;

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a public file path with the deployment base path. next/link does this for routes. */
export function withBase(path: string) {
  return `${basePath}${path}`;
}

export function getMedia(id: string): MediaInfo {
  const info = media[id];
  if (!info) {
    throw new Error(`Unknown media id "${id}". Add assets/masters/${id}.jpg and run npm run media.`);
  }
  return info;
}

export function mediaUrl(id: string, width: number, ext: "avif" | "webp" | "jpg") {
  return withBase(`/media/${id}-${width}.${ext}`);
}

export function srcSet(id: string, ext: "avif" | "webp") {
  return getMedia(id)
    .widths.map((w) => `${mediaUrl(id, w, ext)} ${w}w`)
    .join(", ");
}

/** Largest available WebP, used by the lightbox. */
export function fullUrl(id: string) {
  const { widths } = getMedia(id);
  return mediaUrl(id, widths[widths.length - 1], "webp");
}

/** Site-relative path of the 1200px JPEG, used for Open Graph cards (pass to absoluteUrl). */
export function ogPath(id: string) {
  return `/media/${id}-1200.jpg`;
}
