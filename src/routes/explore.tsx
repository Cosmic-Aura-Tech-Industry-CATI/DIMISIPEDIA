import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { KnowledgeField } from "@/components/KnowledgeField";
import { KnowledgeGraphVisualizer } from "@/components/KnowledgeGraphVisualizer";
import { entities, relationsFor, type Entity } from "@/data/knowledge";

export const Route = createFileRoute("/explore")({
  head: () =>
    pageHead({
      title: "Explore the DIMISI knowledge graph | DIMISIPEDIA",
      description:
        "An interactive map of the DIMISI Technologies ecosystem: the organization, its people, projects and technologies, and the relationships between them.",
      path: "/explore",
      schema: [
        buildBreadcrumbSchema(
          [{ label: "DIMISIPEDIA", to: "/" }, { label: "Explore the DIMISI knowledge graph" }],
          "/explore",
        ),
      ],
    }),
  component: ExplorePage,
});

const groups: { label: string; type: Entity["entityType"] }[] = [
  { label: "Organization", type: "organization" },
  { label: "People", type: "person" },
  { label: "Projects", type: "project" },
  { label: "Technology", type: "technology" },
];

/** Editorial ordering for the People column: leadership first, then engineering, then others. */
const peopleOrder = [
  "shikhar-dixit",
  "swatantra-singh",
  "nishkarsh-mishra",
  "sheelu-singh",
  "mridul-mishra",
];

const peopleRoles: Record<string, string> = {
  "shikhar-dixit": "Founder & CEO",
  "swatantra-singh": "Co-Founder & CTO",
  "nishkarsh-mishra": "Co-Founder",
  "sheelu-singh": "Android Developer",
  "mridul-mishra": "Founding Engineer",
};

const activeProjects = ["KAND", "DIMISI Ops", "DIMISI official site", "DIMISIPEDIA", "Kalesh"];

const glance = [
  { label: "Founded", value: "9 April 2026", note: "DIMISI Technologies Pvt. Ltd." },
  {
    label: "Active projects",
    value: String(activeProjects.length),
    note: activeProjects.join(" · "),
  },
  { label: "Clients dealt with", value: "10+", note: "Reported by DIMISI Technologies" },
];

function orderEntities(list: Entity[], type: Entity["entityType"]) {
  if (type !== "person") return list;
  return [...list].sort((a, b) => {
    const ai = peopleOrder.indexOf(a.id);
    const bi = peopleOrder.indexOf(b.id);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

function ExplorePage() {
  const [selected, setSelected] = useState<Entity>(entities[0]!);
  const rels = relationsFor(selected.id);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Explore" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Knowledge graph</p>
        <h1 className="mt-2 text-4xl">Explore</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every subject in DIMISIPEDIA is an entity, and every entity is connected. Select an entity
          to focus the graph on its documented relationships, or{" "}
          <Link to="/journey" className="text-primary underline underline-offset-4">
            read the full founder journey chronicle
          </Link>
          .
        </p>
      </header>

      <section
        aria-label="DIMISI at a glance"
        className="mt-8 grid gap-px border border-border bg-rule sm:grid-cols-3"
      >
        {glance.map((g) => (
          <div key={g.label} className="bg-surface px-5 py-5">
            <p className="label-mono">{g.label}</p>
            <p className="mt-2 font-serif text-3xl">{g.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{g.note}</p>
          </div>
        ))}
      </section>

      <KnowledgeGraphVisualizer />

      <div className="relative mt-8 grid gap-10 border border-border bg-surface p-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <KnowledgeField density={22} />
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.type}>
              <p className="label-mono border-b border-rule pb-2">{g.label}</p>
              <ul className="mt-3 space-y-1.5">
                {orderEntities(
                  entities.filter((e) => e.entityType === g.type),
                  g.type,
                ).map((e) => (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(e)}
                      aria-pressed={selected.id === e.id}
                      className={`w-full text-left text-sm transition-colors ${
                        selected.id === e.id
                          ? "text-foreground underline underline-offset-4"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {e.name}
                      {peopleRoles[e.id] ? (
                        <span className="block text-xs text-muted-foreground">
                          {peopleRoles[e.id]}
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <aside className="relative border border-border bg-background">
          <p className="border-b border-rule px-4 py-3 label-mono">Focused entity</p>
          <div className="px-4 py-4">
            <p className="font-serif text-xl">{selected.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{selected.subtitle}</p>
            <p className="mt-3 text-sm">{selected.shortDescription}</p>
            <EntityLink
              to={selected.path}
              className="mt-4 inline-block border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary"
            >
              View entry →
            </EntityLink>
          </div>
          <p className="border-y border-rule px-4 py-3 label-mono">Relationships</p>
          <ul className="divide-y divide-rule">
            {rels.length === 0 ? (
              <li className="px-4 py-3 text-sm text-muted-foreground">
                No relationships recorded.
              </li>
            ) : (
              rels.map((r) => (
                <li key={r.type + r.entity.id} className="px-4 py-3">
                  <span className="label-mono">{r.type}</span>
                  <button
                    type="button"
                    onClick={() => setSelected(r.entity)}
                    className="mt-0.5 block text-left font-serif text-base hover:underline"
                  >
                    {r.entity.name}
                  </button>
                </li>
              ))
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}
