"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, nav, person, ui } from "@/content/en/site";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Fixed header. Over a dark hero (any element with data-hero-dark) it starts transparent with
 * light type; once the page scrolls it becomes a solid bar. On small screens the links move
 * into a full-screen menu.
 */
export function SiteHeader() {
  const pathname = (usePathname() ?? "/").replace(/(.)\/$/, "$1");
  const dialog = useRef<HTMLDialogElement>(null);
  const [overDark, setOverDark] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero-dark]");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reflects the page we just navigated to
    setOverDark(Boolean(hero));
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const close = () => dialog.current?.close();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header no-print" data-tone={overDark ? "light" : "dark"} data-solid={solid}>
      <div className="flex h-full items-center justify-between gap-6 px-[var(--gutter)]">
        <Link href="/" className="min-w-0 leading-tight" onClick={close}>
          <span className="block truncate text-[1.05rem] font-semibold [font-variation-settings:'wdth'_112]">{person.name}</span>
          <span className="hidden truncate text-[0.75rem] opacity-75 [font-variation-settings:'wdth'_84] sm:block">{person.role}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link" aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
          <a href={`${base}${contact.cv}`} className="btn btn-quiet min-h-9 px-4 py-1.5" download>
            {ui.downloadCv}
          </a>
        </nav>

        <button
          type="button"
          className="btn btn-quiet min-h-10 px-4 lg:hidden"
          aria-haspopup="dialog"
          onClick={() => dialog.current?.showModal()}
        >
          {ui.menu}
        </button>
      </div>

      <dialog
        ref={dialog}
        aria-label={ui.menu}
        className="chapter-dark m-0 h-dvh max-h-none w-screen max-w-none p-0 backdrop:bg-black/40"
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[var(--header-h)] items-center justify-between border-b border-line px-[var(--gutter)]">
            <span className="text-[1.05rem] font-semibold [font-variation-settings:'wdth'_112]">{person.name}</span>
            <button type="button" className="btn btn-quiet min-h-10 px-4" onClick={close}>
              {ui.closeMenu}
            </button>
          </div>
          <nav aria-label="Main" className="flex-1 px-[var(--gutter)] py-8">
            <ul className="grid gap-1">
              <li>
                <Link href="/" onClick={close} aria-current={pathname === "/" ? "page" : undefined} className="block py-2 text-[2.1rem] leading-tight font-[360] [font-variation-settings:'wdth'_120] aria-[current=page]:text-accent">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block py-2 text-[2.1rem] leading-tight font-[360] [font-variation-settings:'wdth'_120] aria-[current=page]:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-3 border-t border-line px-[var(--gutter)] py-6">
            <p className="t-meta">{person.availability}</p>
            <a className="btn btn-primary" href={`${base}${contact.cv}`} download>
              {ui.downloadCv}
            </a>
            <a className="btn btn-quiet" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
