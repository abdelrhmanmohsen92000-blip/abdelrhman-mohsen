"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Discipline } from "@/content/types";

export interface WorkEntry {
  slug: string;
  disciplines: Discipline[];
  title: string;
  type: string;
  location?: string;
  year?: string;
  area?: string;
  card: ReactNode;
  preview: ReactNode;
}

interface Labels {
  all: string;
  filter: string;
  showingOne: string;
  showingMany: string;
  viewLabel: string;
  viewGrid: string;
  viewIndex: string;
  columns: { project: string; type: string; location: string; year: string; area: string };
}

type View = "grid" | "index";

function Count({ n, active }: { n: number; active: boolean }) {
  return <span className={`t-meta tabular-nums ${active ? "text-[#c9cdc9]" : ""}`}>{n}</span>;
}

/** Filterable project list with an image grid and a drawing-register style index. */
export function WorkIndex({
  entries,
  disciplines,
  labels,
}: {
  entries: WorkEntry[];
  disciplines: { key: Discipline; label: string }[];
  labels: Labels;
}) {
  const [filter, setFilter] = useState<Discipline | "all">("all");
  const [view, setView] = useState<View>("grid");
  const [hovered, setHovered] = useState<string | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  // Read the initial state from the URL (?discipline=bim&view=index) after hydration.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("discipline") as Discipline | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the URL once on mount
    if (d && disciplines.some((x) => x.key === d)) setFilter(d);
    if (params.get("view") === "index") setView("index");
  }, [disciplines]);

  const update = (next: { filter?: Discipline | "all"; view?: View }) => {
    const f = next.filter ?? filter;
    const v = next.view ?? view;
    setFilter(f);
    setView(v);
    const params = new URLSearchParams();
    if (f !== "all") params.set("discipline", f);
    if (v === "index") params.set("view", "index");
    const q = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${q ? `?${q}` : ""}`);
  };

  const visible = filter === "all" ? entries : entries.filter((e) => e.disciplines.includes(filter));
  const count = (d: Discipline) => entries.filter((e) => e.disciplines.includes(d)).length;
  const showing = visible.length === 1 ? labels.showingOne : labels.showingMany.replace("{n}", String(visible.length));
  const hoveredEntry = entries.find((e) => e.slug === hovered);

  const movePreview = (e: React.PointerEvent) => {
    if (!preview.current || e.pointerType !== "mouse") return;
    const x = Math.min(e.clientX + 24, window.innerWidth - preview.current.offsetWidth - 16);
    const y = Math.min(e.clientY + 24, window.innerHeight - preview.current.offsetHeight - 16);
    preview.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const chip = (active: boolean) =>
    `inline-flex min-h-10 items-center gap-2 border px-3 text-[0.9375rem] transition-colors ${
      active ? "border-ink bg-ink text-paper" : "border-line-strong hover:border-ink"
    }`;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line-strong pb-6">
        <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
          <button type="button" className={chip(filter === "all")} aria-pressed={filter === "all"} onClick={() => update({ filter: "all" })}>
            {labels.all}
            <Count active={filter === "all"} n={entries.length} />
          </button>
          {disciplines.map((d) => (
            <button
              key={d.key}
              type="button"
              className={chip(filter === d.key)}
              aria-pressed={filter === d.key}
              onClick={() => update({ filter: d.key })}
            >
              {d.label}
              <Count active={filter === d.key} n={count(d.key)} />
            </button>
          ))}
        </div>
        <div role="group" aria-label={labels.viewLabel} className="flex gap-2">
          {(["grid", "index"] as View[]).map((v) => (
            <button key={v} type="button" className={chip(view === v)} aria-pressed={view === v} onClick={() => update({ view: v })}>
              {v === "grid" ? labels.viewGrid : labels.viewIndex}
            </button>
          ))}
        </div>
      </div>

      <p className="t-meta mt-4" aria-live="polite">
        {showing}
      </p>

      {view === "grid" ? (
        <ul className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((e) => (
            <li key={e.slug}>{e.card}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 overflow-x-auto" onPointerMove={movePreview} onPointerLeave={() => setHovered(null)}>
          <table className="w-full min-w-[640px] border-collapse text-start">
            <thead>
              <tr className="border-b border-line-strong">
                {[labels.columns.project, labels.columns.type, labels.columns.location, labels.columns.year, labels.columns.area].map((c) => (
                  <th key={c} scope="col" className="t-label py-2 pe-4 text-start font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((e) => (
                <tr
                  key={e.slug}
                  className="register-row relative border-b border-line"
                  onPointerEnter={() => setHovered(e.slug)}
                >
                  <td className="py-3 pe-4">
                    <Link href={`/work/${e.slug}`} className="font-medium after:absolute after:inset-0 hover:text-redline" onFocus={() => setHovered(null)}>
                      {e.title}
                    </Link>
                  </td>
                  <td className="py-3 pe-4 text-[0.9375rem] text-lead">{e.type}</td>
                  <td className="py-3 pe-4 text-[0.9375rem] text-lead">{e.location ?? "–"}</td>
                  <td className="py-3 pe-4 text-[0.9375rem] text-lead tabular-nums">{e.year ?? "–"}</td>
                  <td className="py-3 pe-4 text-[0.9375rem] text-lead tabular-nums">{e.area ?? "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div ref={preview} className={`register-preview ${hoveredEntry ? "is-visible" : ""}`} aria-hidden="true">
            {hoveredEntry?.preview}
          </div>
        </div>
      )}
    </div>
  );
}
