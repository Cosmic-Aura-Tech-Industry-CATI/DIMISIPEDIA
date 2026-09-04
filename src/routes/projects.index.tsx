import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { projectEntities } from "@/data/knowledge";
import { indexHead } from "@/lib/seo";
import { EXTERNAL_REL_UNTRUSTED, safeExternalHref } from "@/lib/url-safety";

export const Route = createFileRoute("/projects/")({
  head: () =>
    indexHead({
      title: "Projects & Platforms — DIMISI Technologies | DIMISIPEDIA",
      description:
        "Directory of DIMISI Technologies internal products, client digital transformations, lab experiments, and internal operational systems.",
      path: "/projects",
      listName: "Projects documented by DIMISIPEDIA",
      items: projectEntities,
      trail: [{ label: "DIMISIPEDIA", to: "/" }, { label: "Projects" }],
    }),
  component: ProjectsIndex,
});

const CATEGORIES = [
  "All",
  "DIMISI Products",
  "Client Projects",
  "DIMISI Labs / Experiments",
  "DIMISI Internal Systems",
] as const;

function StatusBadge({ badge }: { badge?: string }) {
  if (!badge) return null;
  const b = badge.toUpperCase();
  let colorClass = "border-rule bg-muted text-foreground/80";

  if (b.includes("FLAGSHIP")) {
    colorClass = "border-amber-500/40 bg-amber-500/10 text-amber-500 font-semibold";
  } else if (b.includes("UNDER DEVELOPMENT")) {
    colorClass = "border-sky-500/40 bg-sky-500/10 text-sky-400 font-medium";
  } else if (b.includes("LIVE") || b.includes("ACTIVE")) {
    colorClass = "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 font-medium";
  } else if (b.includes("LAB")) {
    colorClass = "border-purple-500/40 bg-purple-500/10 text-purple-400 font-medium";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase ${colorClass}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" aria-hidden />
      {badge}
    </span>
  );
}

function ProjectsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const sortedProjects = [...projectEntities].sort(
    (a, b) => (a.featuredPriority ?? 99) - (b.featuredPriority ?? 99),
  );

  const filteredProjects =
    selectedCategory === "All"
      ? sortedProjects
      : sortedProjects.filter((p) => p.category === selectedCategory);

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return projectEntities.length;
    return projectEntities.filter((p) => p.category === cat).length;
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Projects" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Entity index · Projects & Platforms</p>
        <h1 className="mt-2 text-4xl">Projects</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Proprietary consumer products, commercial client transformations, experimental gaming labs,
          and internal operational infrastructure documented in association with DIMISI Technologies.
        </p>

        {/* Category filter tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = getCategoryCount(cat);
            const label = cat === "All" ? "All Projects" : cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground font-medium"
                    : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                aria-pressed={isSelected}
              >
                <span>{label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isSelected
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      <ul className="mt-8 grid gap-px border border-border bg-rule md:grid-cols-2">
        {filteredProjects.map((p) => {
          const primaryExternal = p.officialLinks?.find((l) => l.url && l.url.startsWith("http"));
          return (
            <li key={p.id} className="relative flex flex-col justify-between bg-surface p-6 transition-colors hover:bg-muted/40">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {p.image ? (
                      <div className="flex size-14 shrink-0 items-center justify-center rounded border border-rule bg-surface p-1.5 shadow-sm">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="size-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="label-mono text-primary font-semibold">
                          {p.category ?? "Project"}
                        </span>
                        {p.projectType ? (
                          <span className="font-mono text-[11px] text-muted-foreground">
                            · {p.projectType}
                          </span>
                        ) : null}
                      </div>
                      <h2 className="mt-0.5 font-serif text-2xl text-foreground">
                        <EntityLink to={p.path} className="hover:underline">
                          {p.name}
                        </EntityLink>
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <StatusBadge badge={p.statusBadge ?? (p.lifecycle === "Active" ? "LIVE" : "UNDER DEVELOPMENT")} />
                  </div>
                </div>

                <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
                  {p.shortDescription}
                </p>

                {p.tags && p.tags.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-rule/60 bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4 text-xs">
                <EntityLink
                  to={p.path}
                  className="font-mono text-[11px] font-medium text-primary hover:underline"
                >
                  {p.category === "Client Projects" ? "View case study →" : "View documentation →"}
                </EntityLink>

                {primaryExternal && safeExternalHref(primaryExternal.url) ? (
                  <a
                    href={safeExternalHref(primaryExternal.url)!}
                    target="_blank"
                    rel={EXTERNAL_REL_UNTRUSTED}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    title={`Visit ${primaryExternal.label}`}
                  >
                    <span>Visit website</span>
                    <ExternalLink className="size-3" aria-hidden />
                  </a>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
        Project classifications: DIMISI Products, Client Projects, DIMISI Labs / Experiments, DIMISI Internal Systems.
        Every internal project entry documents technology stack, development ownership, and current lifecycle state.
      </p>
    </div>
  );
}
