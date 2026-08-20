import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { technologyEntities } from "@/data/knowledge";
import { indexHead } from "@/lib/seo";

export const Route = createFileRoute("/technology/")({
  head: () =>
    indexHead({
      title: "Technologies used at DIMISI Technologies — Directory | DIMISIPEDIA",
      description:
        "Technology entities recorded in association with DIMISI Technologies project work, including React, Node.js, TypeScript, Express, MongoDB and Vite, with the projects that use them.",
      path: "/technology",
      listName: "Technologies documented by DIMISIPEDIA",
      items: technologyEntities,
      trail: [{ label: "DIMISIPEDIA", to: "/" }, { label: "Technology" }],
    }),
  component: TechIndex,
});

function TechIndex() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Technology" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Entity index · Technology</p>
        <h1 className="mt-2 text-4xl">Technology</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Technologies recorded in DIMISI project documentation. Some entries describe prototype or
          development infrastructure and are not presented as a confirmed production stack.
        </p>
      </header>
      <ul className="mt-8 grid gap-px border border-border bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {technologyEntities.map((t) => (
          <li key={t.id}>
            <EntityLink
              to={t.path}
              className="block h-full bg-surface px-5 py-5 transition-colors hover:bg-muted"
            >
              <span className="font-serif text-lg">{t.name}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{t.facts[1]?.value}</span>
            </EntityLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
