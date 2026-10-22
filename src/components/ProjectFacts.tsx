import { site } from "@/content";
import type { Project } from "@/content/types";

/** The project's own title block: a ruled table of the facts the sources support. */
export function ProjectFacts({ project }: { project: Project }) {
  const { fields } = site.ui;
  const rows: { label: string; value: string | string[] }[] = [];
  const add = (label: string, value?: string | string[]) => {
    if (value && value.length) rows.push({ label, value });
  };
  add(fields.role, project.role);
  add(fields.type, project.type);
  add(fields.location, project.location);
  add(fields.year, project.year);
  add(fields.area, project.area);
  add(fields.owner, project.owner);
  add(fields.consultant, project.consultant);
  add(fields.status, project.status);
  add(fields.tools, project.tools?.join(", "));
  add(fields.scope, project.scope);

  return (
    <dl className="grid border-t border-line-strong sm:grid-cols-2 lg:grid-cols-4">
      {rows.map((r) => {
        const wide = Array.isArray(r.value) || r.label === fields.role;
        return (
          <div
            key={r.label}
            className={`border-b border-line py-3 pe-4 ${wide ? "sm:col-span-2" : ""}`}
          >
            <dt className="t-label">{r.label}</dt>
            <dd className="mt-1 text-[0.9875rem] leading-snug">
              {Array.isArray(r.value) ? (
                <ul className="grid gap-0.5">
                  {r.value.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              ) : (
                r.value
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
