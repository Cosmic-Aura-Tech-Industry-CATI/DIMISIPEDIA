/**
 * DIMISIPEDIA articles — source-controlled, file-backed.
 *
 * There is deliberately NO CMS, NO admin panel and NO database for articles.
 * The Git repository is the content management mechanism: add a file under
 * `src/content/articles/`, register it in `src/content/articles/index.ts`,
 * commit, push. Deployment publishes it.
 *
 * DATA INTEGRITY RULE: an article may only state what the recorded sources or
 * the knowledge base already support. Draft articles are never indexed and
 * never appear in the sitemap.
 */

import { entities, getSources, type Entity, type Source } from "./knowledge";
import { articleRegistry } from "@/content/articles";

export type ArticleCategory =
  | "Technology"
  | "People"
  | "Projects"
  | "Organizations"
  | "Events"
  | "Startup"
  | "Engineering"
  | "Announcements"
  | "Analysis";

export type ArticleStatus = "published" | "draft";

/** Structured body block. Keeps content portable and free of raw JSX. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "entity"; entityId: string; note?: string };

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Entity key of the author, e.g. "person:shikhar-dixit", or "editorial". */
  authorId: string;
  coverImage?: string;
  coverAlt?: string;
  category: ArticleCategory;
  tags: string[];
  datePublished: string;
  dateModified: string;
  status: ArticleStatus;
  featured?: boolean;
  content: Block[];
  /** Ids from the source registry backing the article's factual claims. */
  sourceIds: string[];
  /** Entity ids this article documents — feeds the knowledge graph. */
  relatedEntities: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface ArticleAuthor {
  name: string;
  path?: string;
  role: string;
  image?: string;
  entity?: Entity;
}

const EDITORIAL: ArticleAuthor = {
  name: "DIMISIPEDIA Editorial",
  role: "Editorial team, DIMISI Technologies Pvt. Ltd.",
};

/** Resolves an authorId to a Person entity where one exists. Never invented. */
export function resolveAuthor(authorId: string): ArticleAuthor {
  const [, slug] = authorId.split(":");
  const entity = slug ? entities.find((e) => e.slug === slug) : undefined;
  if (!entity) return EDITORIAL;
  return {
    name: entity.name,
    path: entity.path,
    role: entity.subtitle,
    ...(entity.image ? { image: entity.image } : {}),
    entity,
  };
}

export const allArticles: Article[] = [...articleRegistry].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished),
);

export const publishedArticles: Article[] = allArticles.filter((a) => a.status === "published");

export function getArticle(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function articlePath(article: Article): string {
  return `/articles/${article.slug}`;
}

export function articleSources(article: Article): Source[] {
  return getSources(article.sourceIds);
}

export function articleEntities(article: Article): Entity[] {
  return article.relatedEntities
    .map((id) => entities.find((e) => e.id === id))
    .filter((e): e is Entity => Boolean(e));
}

/** Categories that actually contain published content. */
export function activeCategories(): { category: ArticleCategory; count: number }[] {
  const counts = new Map<ArticleCategory, number>();
  for (const a of publishedArticles) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

/** Published articles that document a given entity — used on entity pages. */
export function articlesForEntity(entityId: string): Article[] {
  return publishedArticles.filter((a) => a.relatedEntities.includes(entityId));
}

/** Published articles written by a person entity. */
export function articlesByAuthor(entitySlug: string): Article[] {
  return publishedArticles.filter((a) => a.authorId.endsWith(`:${entitySlug}`));
}

/** Related articles from shared entities, then tags, then category. No filler. */
export function relatedArticles(article: Article, limit = 3): Article[] {
  const scored = publishedArticles
    .filter((a) => a.slug !== article.slug)
    .map((a) => {
      const entityOverlap = a.relatedEntities.filter((e) =>
        article.relatedEntities.includes(e),
      ).length;
      const tagOverlap = a.tags.filter((t) => article.tags.includes(t)).length;
      const sameCategory = a.category === article.category ? 1 : 0;
      return { a, score: entityOverlap * 3 + tagOverlap * 2 + sameCategory };
    })
    .filter((s) => s.score > 0)
    .sort((x, y) => y.score - x.score);
  return scored.slice(0, limit).map((s) => s.a);
}

export function readingMinutes(article: Article): number {
  const words = article.content.reduce((n, b) => {
    if (b.type === "p" || b.type === "quote") return n + b.text.split(/\s+/).length;
    if (b.type === "ul" || b.type === "ol") return n + b.items.join(" ").split(/\s+/).length;
    return n;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

/** Headings for an article's in-page contents list. */
export function articleContents(article: Article): { id: string; text: string; level: 2 | 3 }[] {
  return article.content
    .filter((b): b is Extract<Block, { type: "h2" | "h3" }> => b.type === "h2" || b.type === "h3")
    .map((b) => ({ id: b.id, text: b.text, level: b.type === "h2" ? 2 : (3 as const) }));
}
