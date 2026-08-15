import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import {
  activeCategories,
  articlePath,
  publishedArticles,
  readingMinutes,
  resolveAuthor,
  type Article,
} from "@/data/articles";
import { SITE_URL, abs, buildBreadcrumbSchema, pageHead, pageId } from "@/lib/seo";

const trail = [{ label: "DIMISIPEDIA", to: "/" }, { label: "Articles" }];

export const Route = createFileRoute("/articles/")({
  head: () =>
    pageHead({
      title: "Articles — Documentation & Analysis | DIMISIPEDIA",
      description:
        "Long-form articles published by DIMISIPEDIA about DIMISI Technologies, its projects, technologies and editorial method. Each article is source-controlled, authored and dated.",
      path: "/articles",
      schema: [
        {
          "@type": "CollectionPage",
          "@id": pageId("/articles"),
          url: abs("/articles"),
          name: "Articles | DIMISIPEDIA",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          breadcrumb: { "@id": `${abs("/articles")}#breadcrumb` },
          mainEntity: {
            "@type": "ItemList",
            name: "Articles published by DIMISIPEDIA",
            itemListElement: publishedArticles.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: abs(articlePath(a)),
              name: a.title,
            })),
          },
        },
        buildBreadcrumbSchema(trail, "/articles"),
      ],
    }),
  component: ArticlesIndex,
});

function ArticleCard({ article, large }: { article: Article; large?: boolean }) {
  const author = resolveAuthor(article.authorId);
  return (
    <EntityLink
      to={articlePath(article)}
      className="block h-full bg-surface px-5 py-6 transition-colors hover:bg-muted"
    >
      <span className="label-mono">
        {article.category} · {article.datePublished} · {readingMinutes(article)} min read
      </span>
      <span className={`mt-2 block font-serif ${large ? "text-3xl" : "text-xl"} leading-snug`}>
        {article.title}
      </span>
      <span className="mt-2 block max-w-2xl text-sm text-muted-foreground">{article.excerpt}</span>
      <span className="mt-3 block text-xs text-muted-foreground">By {author.name}</span>
    </EntityLink>
  );
}

function ArticlesIndex() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("All");
  const categories = activeCategories();

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return publishedArticles.filter((a) => {
      const inCategory = category === "All" || a.category === category;
      const hay = `${a.title} ${a.excerpt} ${a.tags.join(" ")} ${a.category}`.toLowerCase();
      return inCategory && (!query || hay.includes(query));
    });
  }, [q, category]);

  const featured = publishedArticles.find((a) => a.featured) ?? publishedArticles[0];
  const latest = publishedArticles.filter((a) => a.slug !== featured?.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={trail} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Entity index · Article</p>
        <h1 className="mt-2 text-4xl">Articles</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Long-form documentation and analysis published by DIMISIPEDIA. Articles are maintained in
          the project source repository — each one has a named author, a publication date, a
          revision date and the sources behind its factual claims.
        </p>
      </header>

      {publishedArticles.length === 0 ? (
        <p className="mt-10 max-w-2xl text-muted-foreground">
          No articles have been published yet. Entries will appear here once published.
        </p>
      ) : (
        <>
          {featured ? (
            <section className="mt-10">
              <h2 className="label-mono">Featured</h2>
              <div className="mt-3 border border-border">
                <ArticleCard article={featured} large />
              </div>
            </section>
          ) : null}

          <section className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-4">
              <h2 className="text-2xl">All articles</h2>
              <div className="flex flex-wrap items-center gap-2">
                <label className="sr-only" htmlFor="article-search">
                  Search articles
                </label>
                <input
                  id="article-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search articles"
                  className="w-56 border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            {categories.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {["All", ...categories.map((c) => c.category)].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                      category === c
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                    {c !== "All"
                      ? ` (${categories.find((x) => x.category === c)?.count ?? 0})`
                      : ""}
                  </button>
                ))}
              </div>
            ) : null}

            {filtered.length === 0 ? (
              <p className="mt-8 text-sm text-muted-foreground">
                No articles match that filter.
              </p>
            ) : (
              <ul className="mt-6 grid gap-px border border-border bg-rule sm:grid-cols-2">
                {filtered.map((a) => (
                  <li key={a.slug}>
                    <ArticleCard article={a} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          {latest.length > 0 ? (
            <section className="mt-12 border-t border-rule pt-6">
              <h2 className="label-mono">Latest</h2>
              <ul className="mt-3 divide-y divide-rule border-y border-rule">
                {latest.slice(0, 5).map((a) => (
                  <li key={a.slug} className="py-3">
                    <EntityLink
                      to={articlePath(a)}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1 hover:text-primary"
                    >
                      <span className="label-mono">{a.datePublished}</span>
                      <span className="font-serif text-lg">{a.title}</span>
                    </EntityLink>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
