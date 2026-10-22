"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// Imported directly (not via @/content) so the client bundle carries only the nav labels.
import { nav } from "@/content/en/site";

/** Main navigation; marks the current section with aria-current. */
export function NavLinks({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  // trailingSlash is on, so normalise "/work/" to "/work" before comparing.
  const pathname = (usePathname() ?? "/").replace(/(.)\/$/, "$1");

  return (
    <ul className={className}>
      {nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link href={item.href} aria-current={active ? "page" : undefined} onClick={onNavigate}>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
