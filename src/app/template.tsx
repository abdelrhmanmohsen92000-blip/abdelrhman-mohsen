"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Route transition: content fades up when a page mounts after a client-side navigation.
// The first page load is left alone so the hero image is never hidden (LCP).
const state = { navigated: false };

export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.navigated) ref.current?.classList.add("page-enter");
    state.navigated = true;
  }, []);

  return <div ref={ref}>{children}</div>;
}
