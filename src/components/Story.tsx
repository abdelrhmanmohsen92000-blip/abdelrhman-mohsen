import { site } from "@/content";
import type { Figure, StoryBlock } from "@/content/types";
import { fullUrl, getMedia } from "@/lib/media";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { Picture } from "./Picture";

/** Collects every figure on a page once, in reading order, for the lightbox. */
export function collectFigures(blocks: StoryBlock[], lead?: Figure): Figure[] {
  const all: Figure[] = lead ? [lead] : [];
  for (const b of blocks) {
    if (b.type === "figure") all.push(b.figure);
    else if (b.type === "pair" || b.type === "grid") all.push(...b.figures);
  }
  const seen = new Set<string>();
  return all.filter((f) => (seen.has(f.id) ? false : (seen.add(f.id), true)));
}

export function PageLightbox({ figures }: { figures: Figure[] }) {
  const { ui } = site;
  const items: LightboxItem[] = figures.map((f) => {
    const m = getMedia(f.id);
    return { src: fullUrl(f.id), width: m.width, height: m.height, alt: f.alt, caption: f.caption, sheet: m.kind === "drawing" };
  });
  return (
    <Lightbox
      items={items}
      labels={{ close: ui.lightboxClose, prev: ui.lightboxPrev, next: ui.lightboxNext, count: ui.imageCount }}
    />
  );
}

interface FigureProps {
  figure: Figure;
  index: number;
  sizes: string;
  sheet?: boolean;
  ratio?: string;
  priority?: boolean;
  className?: string;
}

/** A zoomable figure: the image is a button that opens the page lightbox at its index. */
export function ZoomFigure({ figure, index, sizes, sheet, ratio, priority, className }: FigureProps) {
  const isSheet = sheet ?? getMedia(figure.id).kind === "drawing";
  return (
    <figure className={className}>
      <button
        type="button"
        className={`zoomable ${isSheet ? "sheet" : ""}`}
        data-lightbox={index}
        aria-label={`${site.ui.lightboxOpen}: ${figure.caption ?? figure.alt}`}
      >
        <Picture id={figure.id} alt={figure.alt} sizes={sizes} ratio={ratio} fit={isSheet ? "contain" : "cover"} priority={priority} />
      </button>
      {figure.caption && <figcaption className="t-caption">{figure.caption}</figcaption>}
    </figure>
  );
}

const MAIN = "(min-width: 1440px) calc(100vw - 340px - 5.5rem), (min-width: 1024px) calc(100vw - 300px - 5.5rem), calc(100vw - 2rem)";
const HALF = "(min-width: 1024px) calc((100vw - 300px) / 2), (min-width: 640px) 50vw, 100vw";
const THIRD = "(min-width: 1024px) calc((100vw - 300px) / 3), (min-width: 640px) 50vw, 100vw";

/** Renders a project's story: text sections and figures in editorial layouts. */
export function Story({ blocks, figures }: { blocks: StoryBlock[]; figures: Figure[] }) {
  const indexOf = (f: Figure) => figures.findIndex((x) => x.id === f.id);

  return (
    <div className="grid gap-16 md:gap-24">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "text":
            return (
              <section key={i} className="grid gap-4 px-[var(--gutter)] md:grid-cols-12 md:gap-8">
                <h2 className="t-heading md:col-span-4">{b.heading}</h2>
                <div className="t-body md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-5">
                  {b.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            );
          case "figure": {
            const size = b.size ?? "wide";
            const pad = size === "full" ? "" : "px-[var(--gutter)]";
            const narrow = size === "sheet" ? "mx-auto w-full max-w-[1500px]" : "";
            return (
              <div key={i} className={`${pad}`}>
                <ZoomFigure
                  figure={b.figure}
                  index={indexOf(b.figure)}
                  sizes={size === "full" ? "(min-width: 1024px) calc(100vw - 300px), 100vw" : MAIN}
                  sheet={size === "sheet" ? true : undefined}
                  className={`${narrow} ${size === "full" ? "[&_figcaption]:px-[var(--gutter)]" : ""}`}
                />
              </div>
            );
          }
          case "pair":
            return (
              <div key={i} className="grid items-start gap-8 px-[var(--gutter)] sm:grid-cols-2 sm:gap-6">
                {b.figures.map((f) => (
                  <ZoomFigure key={f.id} figure={f} index={indexOf(f)} sizes={HALF} sheet={b.sheet} />
                ))}
              </div>
            );
          case "grid":
            return (
              <div key={i} className="grid items-start gap-8 px-[var(--gutter)] sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {b.figures.map((f) => (
                  <ZoomFigure key={f.id} figure={f} index={indexOf(f)} sizes={THIRD} sheet={b.sheet} />
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}
