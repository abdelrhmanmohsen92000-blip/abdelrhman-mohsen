import type { CSSProperties } from "react";
import { preload } from "react-dom";
import { getMedia, mediaUrl, srcSet } from "@/lib/media";

/** Fetch a page's LCP image from the <head>, before the body is parsed. Call during render. */
export function preloadPicture(id: string, sizes: string) {
  const { widths } = getMedia(id);
  const fallback = widths.find((w) => w >= 1200) ?? widths[widths.length - 1];
  preload(mediaUrl(id, fallback, "avif"), {
    as: "image",
    type: "image/avif",
    imageSrcSet: srcSet(id, "avif"),
    imageSizes: sizes,
    fetchPriority: "high",
  });
}

interface PictureProps {
  id: string;
  alt: string;
  /** Sizes attribute; describe the rendered width so the browser picks the right file. */
  sizes: string;
  className?: string;
  /** Force an aspect ratio (e.g. "4 / 3"); otherwise the image's own ratio is used. */
  ratio?: string;
  fit?: "cover" | "contain";
  position?: string;
  /** LCP image: eager, high fetch priority, synchronous decode. */
  priority?: boolean;
  /** Above the fold but not the LCP image: load eagerly at normal priority. */
  eager?: boolean;
  /** Cover the positioned parent completely (heroes); ignores ratio. */
  fill?: boolean;
}

/** Responsive <picture> with AVIF and WebP sources and a blurred placeholder behind it. */
export function Picture({ id, alt, sizes, className, ratio, fit = "cover", position, priority, eager, fill }: PictureProps) {
  const m = getMedia(id);
  const style: CSSProperties = {
    ...(fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : { aspectRatio: ratio ?? `${m.width} / ${m.height}` }),
    backgroundColor: fit === "cover" ? m.color : undefined,
    backgroundImage: fit === "cover" ? `url(${m.blur})` : undefined,
  };

  return (
    <picture className={`pic ${className ?? ""}`} style={style}>
      <source type="image/avif" srcSet={srcSet(id, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(id, "webp")} sizes={sizes} />
      <img
        src={mediaUrl(id, 1200, "jpg")}
        width={m.width}
        height={m.height}
        alt={alt}
        loading={priority || eager ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        style={{ objectFit: fit, objectPosition: position }}
      />
    </picture>
  );
}
