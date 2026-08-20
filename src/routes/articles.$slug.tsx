import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticleBody } from "@/components/ArticleBody";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { StatusChip } from "@/components/StatusChip";
import {
  articleContents,
  articleEntities,
  articlePath,
  articleSources,
  getArticle,
  readingMinutes,
  relatedArticles,
  resolveAuthor,
} from "@/data/articles";
import { articleHead, pageHead } from "@/lib/seo";
import { EXTERNAL_REL_UNTRUSTED, safeExternalHref } from "@/lib/url-safety";

const trailFor = (title: string) => [
  { label: "DIMISIPEDIA", to: "/" },
  { label: "Articles", to: "/articles" },
  { label: title },
];

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return pageHead({
        title: "Article not found | DIMISIPEDIA",
        description: "This article is not published on DIMISIPEDIA.",
        path: "/articles",
        noindex: true,
      });
    }
    return articleHead(loaderData.article, trailFor(loaderData.article.title));
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const author = resolveAuthor(article.authorId);
  const contents = articleContents(article);
  const sources = articleSources(article);
  const entities = articleEntities(article);
  const related = relatedArticles(article);

  return (
    <article className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={trailFor(article.title)} />

      {article.status === "draft" ? (
        <p className="mt-6 border border-pending/40 bg-pending/8 px-4 py-3 text-sm text-pending">
          Draft — this article is unpublished, excluded from the sitemap and marked noindex.
        </p>
      ) : null}

      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">
          Article · {article.category}
          {article.status === "draft" ? " · Draft" : ""}
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl leading-tight sm:text-5xl">{article.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{article.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {author.path ? (
            <EntityLink to={author.path} className="flex items-center gap-2 hover:text-primary">
              {author.image ? (
                <img
                  src={author.image}
                  alt={`Portrait of ${author.name}`}
                  width={32}
                  height={32}
                  className="size-8 border border-rule object-cover"
                />
              ) : null}
              <span>By {author.name}</span>
            </EntityLink>
          ) : (
            <span>By {author.name}</span>
          )}
          <span className="label-mono">
            Published <time dateTime={article.datePublished}>{article.datePublished}</time>
          </span>
          <span className="label-mono">
            Updated <time dateTime={article.dateModified}>{article.dateModified}</time>
          </span>
          <span className="label-mono">{readingMinutes(article)} min read</span>
        </div>
      </header>

      {article.coverImage ? (
        <figure className="mt-8">
          <img
            src={article.coverImage}
            alt={article.coverAlt ?? article.title}
            className="w-full border border-rule object-cover"
          />
        </figure>
      ) : null}

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0">
          {contents.length > 1 ? (
            <nav aria-label="Table of contents" className="border-y border-rule py-5">
              <p className="label-mono">Contents</p>
              <ol className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
                {contents.map((c, i) => (
                  <li key={c.id} className={c.level === 3 ? "pl-4" : ""}>
                    <a
                      href={`#${c.id}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="font-mono text-xs">{i + 1}.</span> {c.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <ArticleBody content={article.content} />

          {sources.length > 0 ? (
            <section id="sources" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl">Sources &amp; references</h2>
              <ol className="mt-5 space-y-4">
                {sources.map((s, i) => (
                  <li key={s.id} className="border-l border-rule pl-4">
                    <p className="text-sm">
                      <span className="font-mono text-xs text-muted-foreground">[{i + 1}]</span>{" "}
                      {safeExternalHref(s.url) ? (
                        <a
                          href={safeExternalHref(s.url)!}
                          target="_blank"
                          rel={EXTERNAL_REL_UNTRUSTED}
                          className="underline underline-offset-4"
                        >
                          {s.title}
                        </a>
                      ) : (
                        s.title
                      )}
                      <span className="text-muted-foreground"> — {s.publisher}</span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.claim}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="label-mono">{s.type}</span>
                      <StatusChip status={s.status} />
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {related.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-2xl">Related articles</h2>
              <ul className="mt-5 grid gap-px border border-border bg-rule sm:grid-cols-2">
                {related.map((a) => (
                  <li key={a.slug}>
                    <EntityLink
                      to={articlePath(a)}
                      className="block h-full bg-surface px-4 py-4 transition-colors hover:bg-muted"
                    >
                      <span className="label-mono">{a.category}</span>
                      <span className="mt-1 block font-serif text-lg">{a.title}</span>
                    </EntityLink>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-12 border-t border-rule pt-6">
            <h2 className="label-mono">About the author</h2>
            <div className="mt-3 flex items-start gap-4">
              {author.image ? (
                <img
                  src={author.image}
                  alt={`Portrait of ${author.name}`}
                  width={64}
                  height={64}
                  className="size-16 border border-rule object-cover"
                />
              ) : null}
              <div>
                {author.path ? (
                  <EntityLink to={author.path} className="font-serif text-xl hover:text-primary">
                    {author.name}
                  </EntityLink>
                ) : (
                  <p className="font-serif text-xl">{author.name}</p>
                )}
                <p className="mt-1 text-sm text-muted-foreground">{author.role}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-border bg-surface">
            <p className="border-b border-rule px-4 py-3 label-mono">Article facts</p>
            <dl className="divide-y divide-rule">
              <div className="px-4 py-3">
                <dt className="label-mono">Category</dt>
                <dd className="mt-1 text-sm">{article.category}</dd>
              </div>
              <div className="px-4 py-3">
                <dt className="label-mono">Author</dt>
                <dd className="mt-1 text-sm">{author.name}</dd>
              </div>
              <div className="px-4 py-3">
                <dt className="label-mono">Published</dt>
                <dd className="mt-1 text-sm">{article.datePublished}</dd>
              </div>
              <div className="px-4 py-3">
                <dt className="label-mono">Last updated</dt>
                <dd className="mt-1 text-sm">{article.dateModified}</dd>
              </div>
              {article.tags.length > 0 ? (
                <div className="px-4 py-3">
                  <dt className="label-mono">Tags</dt>
                  <dd className="mt-1 text-sm">{article.tags.join(", ")}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          {entities.length > 0 ? (
            <div className="mt-6 border border-border bg-surface">
              <p className="border-b border-rule px-4 py-3 label-mono">Related entities</p>
              <ul className="divide-y divide-rule">
                {entities.map((e) => (
                  <li key={e.id}>
                    <EntityLink
                      to={e.path}
                      className="block px-4 py-3 transition-colors hover:bg-muted"
                    >
                      <span className="label-mono">{e.entityType}</span>
                      <span className="mt-0.5 block font-serif text-base">{e.name}</span>
                      <span className="block text-xs text-muted-foreground">{e.subtitle}</span>
                    </EntityLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
