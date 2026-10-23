import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Rss, Search, ArrowUpRight, BookOpen, User } from "lucide-react";
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

const trail = [{ label: "DIMISIPEDIA", to: "/" }, { label: "Blog" }];

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      title: "Blog — Engineering Insights & Founder Perspectives | DIMISIPEDIA",
      description:
        "Official blog of DIMISI Technologies and DIMISIPEDIA. Authoritative articles on enterprise software solutions, system architecture, startup journey, and leadership by Shikhar Dixit.",
      path: "/blog",
      schema: [
        {
          "@type": "Blog",
          "@id": pageId("/blog"),
          url: abs("/blog"),
          name: "DIMISIPEDIA Official Blog & Engineering Insights",
          description:
            "Official blog of DIMISI Technologies and DIMISIPEDIA, documenting enterprise engineering architecture, technology frameworks, corporate evolution, and leadership insights.",
          inLanguage: "en",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          breadcrumb: { "@id": `${abs("/blog")}#breadcrumb` },
          publisher: {
            "@id": `${SITE_URL}/dimisi-technologies#organization`,
          },
          author: {
            "@id": `${SITE_URL}/people/shikhar-dixit#person`,
          },
          blogPost: publishedArticles.map((a, i) => ({
            "@type": "BlogPosting",
            "@id": `${abs(articlePath(a))}#article`,
            position: i + 1,
            url: abs(articlePath(a)),
            headline: a.title,
            description: a.excerpt,
            datePublished: a.datePublished,
            dateModified: a.dateModified,
            author: {
              "@id": `${SITE_URL}/people/shikhar-dixit#person`,
            },
          })),
        },
        buildBreadcrumbSchema(trail, "/blog"),
      ],
    }),
  component: BlogIndex,
});

function BlogCard({ article, featured }: { article: Article; featured?: boolean }) {
  const author = resolveAuthor(article.authorId);
  return (
    <EntityLink
      to={articlePath(article)}
      className={`group block h-full border border-border bg-surface p-6 transition-all hover:border-primary/60 hover:bg-muted/40 ${
        featured ? "sm:p-8" : ""
      }`}
    >
      {article.coverImage && featured && (
        <div className="mb-6 overflow-hidden border border-border aspect-[16/9] max-h-72 w-full bg-muted">
          <img
            src={article.coverImage}
            alt={article.coverAlt ?? article.title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium text-primary">
          {article.category}
        </span>
        <span>•</span>
        <time dateTime={article.datePublished}>{article.datePublished}</time>
        <span>•</span>
        <span className="font-mono">{readingMinutes(article)} min read</span>
      </div>

      <h2
        className={`mt-3 font-serif font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary ${
          featured ? "text-2xl sm:text-3xl" : "text-xl"
        }`}
      >
        {article.title}
      </h2>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {article.excerpt}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-rule/60 pt-4 text-xs">
        <div className="flex items-center gap-2">
          {author.image ? (
            <img
              src={author.image}
              alt={author.name}
              className="size-6 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="grid size-6 place-items-center rounded-full bg-muted text-muted-foreground">
              <User className="size-3.5" />
            </div>
          )}
          <span className="font-medium text-foreground">{author.name}</span>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-primary group-hover:underline">
          Read post <ArrowUpRight className="size-3" />
        </span>
      </div>
    </EntityLink>
  );
}

function BlogIndex() {
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
  const remaining = filtered.filter((a) => a.slug !== featured?.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={trail} />

      <header className="mt-6 border-b border-rule pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="label-mono">Corporate Thought Leadership · Engineering Blog</p>
            <h1 className="mt-2 text-4xl font-serif tracking-tight sm:text-5xl">
              DIMISIPEDIA Blog
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              Official publications, enterprise software architecture, startup milestones, and
              leadership insights from DIMISI Technologies Pvt. Ltd. Grounded in source-controlled
              factual records.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/feed.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Rss className="size-3.5 text-orange-500" />
              <span>RSS Feed</span>
            </a>
            <EntityLink
              to="/articles"
              className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              <BookOpen className="size-3.5" />
              <span>Article Archive</span>
            </EntityLink>
          </div>
        </div>

        {/* Founder & Author Bylines Highlight */}
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded border border-border/80 bg-surface/50 p-4 text-xs">
          <span className="font-mono text-muted-foreground">Primary Author &amp; Leadership:</span>
          <EntityLink
            to="/people/shikhar-dixit"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary hover:underline"
          >
            <span className="size-2 rounded-full bg-emerald-500" />
            Shikhar Dixit (Founder &amp; CEO)
          </EntityLink>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">
            DIMISI Technologies Pvt. Ltd. (Kanpur, India)
          </span>
        </div>
      </header>

      {/* Search & Category Filter Bar */}
      <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search blog posts..."
            className="w-full border border-border bg-background py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCategory("All")}
            className={`border px-3 py-1 font-mono text-xs transition-colors cursor-pointer ${
              category === "All"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`border px-3 py-1 font-mono text-xs transition-colors cursor-pointer ${
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Rendering */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">
          No blog posts match your current search or category filter.
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {/* Featured Post (Only show if no search filter active) */}
          {!q && category === "All" && featured && (
            <div>
              <p className="mb-3 label-mono text-primary">Featured Editorial Post</p>
              <BlogCard article={featured} featured />
            </div>
          )}

          {/* Grid of Posts */}
          <div>
            {!q && category === "All" && <p className="mb-4 label-mono">Latest Blog Posts</p>}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(q || category !== "All" ? filtered : remaining).map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
