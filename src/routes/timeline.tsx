import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { StatusChip } from "@/components/StatusChip";
import { getEntity, timeline } from "@/data/knowledge";

export const Route = createFileRoute("/timeline")({
  head: () =>
    pageHead({
      title: "Timeline of DIMISI Technologies | DIMISIPEDIA",
      description: "Chronological record of documented DIMISI Technologies milestones, beginning with the incorporation date recorded as 9 April 2026.",
      path: "/timeline",
      schema: [
        buildBreadcrumbSchema(
          [{ label: "DIMISIPEDIA", to: "/" }, { label: "Timeline of DIMISI Technologies" }],
          "/timeline",
        ),
      ],
    }),
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Timeline" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Chronological record</p>
        <h1 className="mt-2 text-4xl">Timeline</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          The recorded history of DIMISI Technologies. Entries appear here only when a date and a
          documented description exist; each carries its own verification status.
        </p>
      </header>

      <ol className="mt-10 border-l border-rule">
        {timeline.map((t) => (
          <li key={t.date + t.title} className="relative pb-12 pl-8">
            <span
              className="absolute -left-[5px] top-2 size-2.5 rounded-full border border-rule bg-background"
              aria-hidden
            />
            <p className="label-mono">
              {t.displayDate} · {t.category}
            </p>
            <h2 className="mt-2 text-2xl">{t.title}</h2>
            <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">{t.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusChip status={t.status} />
              {t.related.map((id) => {
                const e = getEntity(id);
                if (!e) return null;
                return (
                  <EntityLink
                    key={id}
                    to={e.path}
                    className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {e.name}
                  </EntityLink>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
