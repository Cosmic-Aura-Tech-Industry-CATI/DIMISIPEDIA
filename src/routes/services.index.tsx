import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Wrench } from "lucide-react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { serviceEntities } from "@/data/knowledge";
import { indexHead } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    indexHead({
      title: "Services & Solutions | DIMISI Technologies",
      description:
        "Official directory of software engineering, website development, mobile apps, cloud IT, and custom business software solutions delivered by DIMISI Technologies.",
      path: "/services",
      listName: "Services delivered by DIMISI Technologies",
      items: serviceEntities,
      trail: [{ label: "DIMISIPEDIA", to: "/" }, { label: "Services" }],
    }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Services" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <div className="flex items-center gap-2">
          <p className="label-mono">Entity directory · Professional Services</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            <Wrench className="size-3" />
            Engineering Solutions
          </span>
        </div>
        <h1 className="mt-2 text-4xl font-serif">Services & Technical Solutions</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
          Comprehensive business software development, full-stack website engineering,
          cross-platform mobile apps (Flutter), cloud IT infrastructure, and AI workflow automations
          delivered by DIMISI Technologies Private Limited.
        </p>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serviceEntities.map((s) => (
          <article
            key={s.id}
            className="group flex flex-col justify-between rounded-lg border border-rule bg-card p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
          >
            <div>
              <h2 className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                <EntityLink to={s.path}>{s.name}</EntityLink>
              </h2>
              <span className="mt-1 block font-mono text-xs text-muted-foreground">
                {s.subtitle}
              </span>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {s.shortDescription}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-rule/60 pt-4 text-xs font-mono">
              <EntityLink
                to={s.path}
                className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
              >
                View Service Specification
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </EntityLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
