import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { StatusChip } from "@/components/StatusChip";
import { projectEntities } from "@/data/knowledge";
import { indexHead } from "@/lib/seo";

export const Route = createFileRoute("/projects/")({
  head: () =>
    indexHead({
      title: "Projects of DIMISI Technologies — Directory | DIMISIPEDIA",
      description:
        "Directory of DIMISI Technologies project entities, including Kalesh and DIMISIPEDIA, with lifecycle status, associated technologies and sources.",
      path: "/projects",
      listName: "Projects documented by DIMISIPEDIA",
      items: projectEntities,
      trail: [{ label: "DIMISIPEDIA", to: "/" }, { label: "Projects" }],
    }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Projects" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Entity index · Project</p>
        <h1 className="mt-2 text-4xl">Projects</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Products and platforms documented in association with DIMISI Technologies. Concepts that
          have not been confirmed as official projects are not published here.
        </p>
      </header>
      <ul className="mt-8 grid gap-px border border-border bg-rule md:grid-cols-2">
        {projectEntities.map((p) => (
          <li key={p.id}>
            <EntityLink
              to={p.path}
              className="block h-full bg-surface px-5 py-6 transition-colors hover:bg-muted"
            >
              <span className="label-mono">Project</span>
              <span className="mt-1 block font-serif text-2xl">{p.name}</span>
              <span className="mt-2 block text-sm text-muted-foreground">{p.shortDescription}</span>
              <span className="mt-3 inline-block">
                <StatusChip status="documented" />
              </span>
            </EntityLink>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
        Project lifecycle states used by DIMISIPEDIA: Concept, Research, Prototype, Development,
        Active, Paused, Archived, Discontinued.
      </p>
    </div>
  );
}
