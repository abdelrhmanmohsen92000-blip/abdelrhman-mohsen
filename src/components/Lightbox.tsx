"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface LightboxItem {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  sheet: boolean;
}

interface Labels {
  close: string;
  prev: string;
  next: string;
  count: string; // "{i} of {n}"
}

/**
 * Full-screen image viewer for one page. Figures are rendered on the server as buttons with
 * data-lightbox="<index>"; this component listens for clicks on them, so pages stay static
 * HTML and the only client code is this viewer. Click the image (or press Z) to see it at
 * full size, which is what makes drawing annotations readable.
 */
export function Lightbox({ items, labels }: { items: LightboxItem[]; labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => {
      setZoomed(false);
      setIndex((i) => (i + delta + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest<HTMLElement>("[data-lightbox]");
      if (!trigger) return;
      e.preventDefault();
      setIndex(Number(trigger.dataset.lightbox));
      setZoomed(false);
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(document.dir === "rtl" ? -1 : 1);
      else if (e.key === "ArrowLeft") go(document.dir === "rtl" ? 1 : -1);
      else if (e.key.toLowerCase() === "z") setZoomed((z) => !z);
    };
    d.addEventListener("keydown", onKey);
    return () => d.removeEventListener("keydown", onKey);
  }, [go]);

  // Preload neighbours so arrowing through a set feels instant.
  useEffect(() => {
    if (!dialog.current?.open) return;
    for (const d of [1, -1]) {
      const next = items[(index + d + items.length) % items.length];
      if (next) new Image().src = next.src;
    }
  }, [index, items]);

  useEffect(() => {
    if (stage.current) stage.current.scrollTo({ top: 0, left: 0 });
  }, [index, zoomed]);

  const item = items[index];
  if (!item) return null;
  const count = labels.count.replace("{i}", String(index + 1)).replace("{n}", String(items.length));

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={item.caption || item.alt}
      onClose={() => setZoomed(false)}
      onTouchStart={(e) => {
        touchX.current = zoomed ? null : e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between gap-4 px-[var(--gutter)] py-3">
        <span className="t-meta text-[#c9cdc9]" aria-live="polite">
          {count}
        </span>
        <button type="button" className="btn btn-quiet min-h-10" onClick={() => dialog.current?.close()} autoFocus>
          {labels.close}
        </button>
      </div>

      <div ref={stage} className={`lightbox-stage ${zoomed ? "is-zoomed" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-generated responsive files */}
        <img
          key={item.src}
          src={item.src}
          width={item.width}
          height={item.height}
          alt={item.alt}
          className={item.sheet ? "on-sheet" : undefined}
          onClick={() => setZoomed((z) => !z)}
        />
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-[var(--gutter)] py-4">
        <button type="button" className="btn btn-quiet min-h-10" onClick={() => go(-1)} aria-label={labels.prev}>
          <span aria-hidden="true" className="rtl:-scale-x-100">
            ‹
          </span>
        </button>
        <p className="text-center text-[0.9375rem] text-[#dfe2df]">{item.caption}</p>
        <button type="button" className="btn btn-quiet min-h-10" onClick={() => go(1)} aria-label={labels.next}>
          <span aria-hidden="true" className="rtl:-scale-x-100">
            ›
          </span>
        </button>
      </div>
    </dialog>
  );
}
