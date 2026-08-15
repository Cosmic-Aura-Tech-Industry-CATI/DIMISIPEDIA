import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { searchKnowledge } from "@/data/knowledge";
import { pageHead } from "@/lib/seo";

const trail = [{ label: "DIMISIPEDIA", to: "/" }, { label: "Search" }];

/**
 * Search result URLs are intentionally noindex: only curated entity pages are
 * indexable. Links out of here stay crawlable (noindex, follow).
 */
export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? (search["q"] as string) : "",
  }),
  head: () =>
    pageHead({
      title: "Search DIMISIPEDIA",
      description:
        "Search people, organizations, projects, technologies, timeline entries and sources documented in DIMISIPEDIA.",
      path: "/search",
      noindex: true,
    }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const results = useMemo(() => searchKnowledge(q), [q]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Breadcrumbs trail={trail} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Entity search</p>
        <h1 className="mt-2 text-4xl">Search DIMISIPEDIA</h1>
      </header>

      <form
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          const value = new FormData(e.currentTarget).get("q");
          navigate({ search: { q: typeof value === "string" ? value : "" } });
        }}
      >
        <label htmlFor="q" className="sr-only">
          Search query
        </label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="Shikhar Dixit, DIMISI, Kalesh, React…"
          className="w-full border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </form>

      <section className="mt-8" aria-live="polite">
        {q.trim() === "" ? (
          <p className="text-sm text-muted-foreground">
            Enter a name to search entities, timeline milestones and sources.
          </p>
        ) : results.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            DIMISIPEDIA does not currently have an entry matching “{q}”.
          </p>
        ) : (
          <ul className="divide-y divide-rule border border-border bg-surface">
            {results.map((r) => (
              <li key={`${r.type}-${r.path}-${r.name}`} className="px-4 py-4">
                <Link to={r.path as unknown as "/"} className="block hover:text-primary">
                  <p className="label-mono">{r.type}</p>
                  <p className="mt-1 font-serif text-lg">{r.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
