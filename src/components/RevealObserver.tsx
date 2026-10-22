"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds .is-in to [data-reveal] elements as they enter the viewport (see globals.css, Motion).
 * One observer for the whole page; re-scans after each navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    (window as unknown as { __revealReady?: boolean }).__revealReady = true;
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

/**
 * Runs before first paint: marks the page as scripted so reveal styles apply, and if the app
 * script never starts (blocked or failed), shows everything after three seconds.
 */
export const revealBootScript = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady){document.querySelectorAll('[data-reveal]').forEach(function(e){e.classList.add('is-in')})}},3000);`;
