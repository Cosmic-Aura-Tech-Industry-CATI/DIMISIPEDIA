import { useState, useMemo } from "react";
import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Calendar } from "lucide-react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { StatusChip } from "@/components/StatusChip";
import { getEntity, timeline } from "@/data/knowledge";

export const Route = createFileRoute("/timeline")({
  head: () =>
    pageHead({
      title: "Timeline of DIMISI Technologies | DIMISIPEDIA",
      description:
        "Chronological record of documented DIMISI Technologies milestones, from the initial spark in October 2024 to incorporation and modern platform releases.",
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
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    timeline.forEach((t) => set.add(t.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filteredTimeline = useMemo(() => {
    return timeline.filter((t) => {
      const yearMatch = selectedYear === "all" || t.date.startsWith(selectedYear);
      const catMatch = selectedCategory === "all" || t.category.toLowerCase() === selectedCategory.toLowerCase();
      return yearMatch && catMatch;
    });
  }, [selectedYear, selectedCategory]);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Timeline" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Chronological record · {timeline.length} Documented Milestones</p>
        <h1 className="mt-2 text-4xl">Technical &amp; Corporate Timeline</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          The recorded history of DIMISI Technologies. Entries appear here when a date and a
          documented description exist; each carries its own verification status. For the detailed
          first-person narrative, read{" "}
          <Link to="/journey" className="text-primary underline underline-offset-4">
            The Founder's Entrepreneurship Journey →
          </Link>
        </p>

        {/* Filter Controls */}
        <div className="mt-8 flex flex-wrap items-center gap-4 border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <Calendar className="size-3.5" /> Year:
            </span>
            {["all", "2026", "2025", "2024"].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 font-mono text-xs transition-colors cursor-pointer ${
                  selectedYear === year
                    ? "bg-primary text-primary-foreground font-medium"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {year === "all" ? "All Years" : year}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <Filter className="size-3.5" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 font-mono text-xs transition-colors cursor-pointer capitalize ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground font-medium"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>

          <div className="ml-auto font-mono text-xs text-muted-foreground">
            Showing {filteredTimeline.length} of {timeline.length} entries
          </div>
        </div>
      </header>

      <ol className="mt-10 border-l border-rule">
        {filteredTimeline.map((t) => (
          <li key={t.date + t.title} className="relative pb-12 pl-8">
            <span
              className="absolute -left-[5px] top-2 size-2.5 rounded-full border border-rule bg-background"
              aria-hidden
            />
            <p className="label-mono">
              {t.displayDate} · {t.category}
            </p>
            <h2 className="mt-2 text-2xl">{t.title}</h2>
            <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">{t.description}</p>
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
