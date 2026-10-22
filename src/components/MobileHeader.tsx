"use client";

import Link from "next/link";
import { useRef } from "react";
import { contact, person, ui } from "@/content/en/site";
import { NavLinks } from "./NavLinks";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Top bar and full-screen menu for screens narrower than the title block layout. */
export function MobileHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <header className="no-print sticky top-0 z-30 border-b border-line-strong bg-paper/95 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-between gap-4 px-[var(--gutter)] py-3">
        <Link href="/" className="min-w-0">
          <span className="block truncate text-[1.0625rem] font-semibold [font-variation-settings:'wdth'_110]">
            {person.name}
          </span>
          <span className="t-meta block truncate">{person.shortRole}</span>
        </Link>
        <button
          type="button"
          className="btn btn-quiet min-h-10 px-4"
          aria-haspopup="dialog"
          onClick={() => dialog.current?.showModal()}
        >
          {ui.menu}
        </button>
      </div>

      <dialog
        ref={dialog}
        aria-label={ui.menu}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-paper p-0 text-ink backdrop:bg-ink/40"
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line-strong px-[var(--gutter)] py-3">
            <span className="text-[1.0625rem] font-semibold [font-variation-settings:'wdth'_110]">{person.name}</span>
            <button type="button" className="btn btn-quiet min-h-10 px-4" onClick={close}>
              {ui.closeMenu}
            </button>
          </div>
          <nav aria-label="Main" className="flex-1 px-[var(--gutter)] py-6">
            <NavLinks
              onNavigate={close}
              className="grid gap-1 text-[1.75rem] leading-tight [font-variation-settings:'wdth'_115] [&_a]:block [&_a]:py-2 [&_a[aria-current=page]]:text-redline"
            />
          </nav>
          <div className="grid gap-3 border-t border-line px-[var(--gutter)] py-5">
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
