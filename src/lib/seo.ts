/**
 * DIMISIPEDIA SEO / knowledge-graph layer.
 *
 * Single source of truth for canonical URLs, stable entity @id values,
 * page metadata and JSON-LD builders. Routes must not hand-roll schema.
 *
 * DATA INTEGRITY: builders only emit properties that exist in the knowledge
 * base. Empty/unknown values are omitted rather than guessed.
 */
import type { Entity, Source } from "@/data/knowledge";
import { ORG_NAME, entities, getSources, relationsFor } from "@/data/knowledge";

/** Production origin. Change here if the canonical domain ever changes. */
export const SITE_URL = "https://dimisipedia.me";
export const SITE_NAME = "DIMISIPEDIA";

/** Absolute, trailing-slash-free canonical URL for an internal path. */
export function abs(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = ("/" + path.replace(/^\/+/, "")).replace(/\/+$/, "");
  return clean === "" ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
}

/** Fragment used for the entity node inside a page's @graph. */
const FRAGMENT: Record<string, string> = {
  person: "person",
  organization: "organization",
  project: "project",
  technology: "technology",
  event: "event",
  article: "article",
};

/** Internal universal entity id, e.g. "person:shikhar-dixit". */
export function entityKey(entity: Entity): string {
  return `${entity.entityType}:${entity.slug}`;
}

/** Stable schema.org @id for an entity, e.g. ".../people/x#person". */
export function entityId(entity: Entity): string {
  return `${abs(entity.path)}#${FRAGMENT[entity.entityType] ?? "entity"}`;
}

export function pageId(path: string): string {
  return `${abs(path)}#webpage`;
}

type Json = Record<string, unknown>;

/** Drop undefined / empty values so no meaningless properties are emitted. */
function clean<T extends Json>(obj: T): T {
  const out: Json = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

export function sourceCitations(entity: Entity) {
  return getSources(entity.sourceIds)
    .filter((s: Source) => Boolean(s.url))
    .map((s) => clean({ "@type": "WebPage", name: s.title, url: s.url }));
}

function verifiedProfileUrls(entity: Entity): string[] {
  const external = (entity.externalProfiles ?? [])
    .filter((p) => p.verified && p.url)
    .map((p) => p.url as string);
  const official = (entity.officialLinks ?? []).filter((l) => l.official).map((l) => l.url);
  return Array.from(new Set([...external, ...official]));
}

/** Lightweight reference node so related entities can be linked by @id. */
export function refNode(entity: Entity): Json {
  const type =
    entity.entityType === "person"
      ? "Person"
      : entity.entityType === "organization"
        ? "Organization"
        : entity.entityType === "technology"
          ? "DefinedTerm"
          : "CreativeWork";
  return clean({ "@type": type, "@id": entityId(entity), name: entity.name, url: abs(entity.path) });
}

export function buildWebsiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "DIMISIPEDIA Knowledge Base",
    url: `${SITE_URL}/`,
    inLanguage: "en",
    description:
      "DIMISIPEDIA is an entity knowledge platform documenting DIMISI Technologies — its people, organizations, projects, technologies, events and sources.",
    publisher: { "@id": `${SITE_URL}/dimisi-technologies#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbSchema(trail: { label: string; to?: string }[], path: string): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(path)}#breadcrumb`,
    itemListElement: trail.map((t, i) =>
      clean({
        "@type": "ListItem",
        position: i + 1,
        name: t.label,
        item: t.to ? abs(t.to) : undefined,
      }),
    ),
  };
}

export function buildPersonSchema(entity: Entity): Json {
  const related = relationsFor(entity.id);
  const orgs = related.filter((r) => r.entity.entityType === "organization");
  const projects = related.filter((r) => r.entity.entityType === "project");
  return clean({
    "@type": "Person",
    "@id": entityId(entity),
    name: entity.name,
    image: entity.image ? abs(entity.image) : undefined,
    alternateName: entity.subtitle || undefined,
    description: entity.answer || entity.shortDescription,
    url: abs(entity.path),
    mainEntityOfPage: { "@id": pageId(entity.path) },
    jobTitle: (entity.roles ?? []).map((r) => r.title),
    worksFor: orgs.map((r) => ({ "@id": entityId(r.entity) })),
    affiliation: orgs.map((r) => ({ "@id": entityId(r.entity) })),
    knowsAbout: entity.areas ?? [],
    subjectOf: projects.map((r) => ({ "@id": entityId(r.entity) })),
    alumniOf: (entity.education ?? []).map((e) =>
      clean({ "@type": "EducationalOrganization", name: e.institution }),
    ),
    sameAs: verifiedProfileUrls(entity),
  });
}

export function buildOrganizationSchema(entity: Entity): Json {
  const related = relationsFor(entity.id);
  const people = related.filter((r) => r.entity.entityType === "person");
  const founders = people.filter((r) => /Founder|CEO|Director|COO|CMO/i.test(r.type));
  const fact = (label: string) =>
    entity.facts.find((f) => f.label.toLowerCase() === label.toLowerCase())?.value;
  return clean({
    "@type": "Organization",
    "@id": entityId(entity),
    name: ORG_NAME,
    alternateName: entity.name !== ORG_NAME ? entity.name : undefined,
    legalName: fact("Legal name") ?? ORG_NAME,
    logo: entity.image ? abs(entity.image) : undefined,
    image: entity.image ? abs(entity.image) : undefined,
    description: entity.answer || entity.shortDescription,
    url: abs(entity.path),
    mainEntityOfPage: { "@id": pageId(entity.path) },
    foundingDate: fact("Incorporated") ?? fact("Founded"),
    identifier: fact("CIN"),
    founder: founders.map((r) => ({ "@id": entityId(r.entity) })),
    employee: people.map((r) => ({ "@id": entityId(r.entity) })),
    sameAs: verifiedProfileUrls(entity),
  });
}

export function buildProjectSchema(entity: Entity): Json {
  const related = relationsFor(entity.id);
  const creatorOrg = related.find((r) => r.entity.entityType === "organization");
  const tech = related.filter((r) => r.entity.entityType === "technology");
  return clean({
    "@type": "CreativeWork",
    "@id": entityId(entity),
    name: entity.name,
    alternateName: entity.subtitle || undefined,
    description: entity.answer || entity.shortDescription,
    url: abs(entity.path),
    mainEntityOfPage: { "@id": pageId(entity.path) },
    creator: creatorOrg ? { "@id": entityId(creatorOrg.entity) } : undefined,
    publisher: creatorOrg ? { "@id": entityId(creatorOrg.entity) } : undefined,
    keywords: tech.map((r) => r.entity.name),
    creativeWorkStatus: entity.lifecycle,
    dateCreated: entity.createdAt,
    dateModified: entity.updatedAt,
    citation: sourceCitations(entity),
  });
}

export function buildTechnologySchema(entity: Entity): Json {
  const related = relationsFor(entity.id);
  return clean({
    "@type": "DefinedTerm",
    "@id": entityId(entity),
    name: entity.name,
    description: entity.answer || entity.shortDescription,
    url: abs(entity.path),
    mainEntityOfPage: { "@id": pageId(entity.path) },
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": `${SITE_URL}/technology#termset`,
      name: "Technologies documented by DIMISIPEDIA",
      url: `${SITE_URL}/technology`,
    },
    subjectOf: related
      .filter((r) => r.entity.entityType === "project")
      .map((r) => ({ "@id": entityId(r.entity) })),
  });
}

export function buildEntitySchema(entity: Entity): Json {
  switch (entity.entityType) {
    case "person":
      return buildPersonSchema(entity);
    case "organization":
      return buildOrganizationSchema(entity);
    case "technology":
      return buildTechnologySchema(entity);
    default:
      return buildProjectSchema(entity);
  }
}

/** WebPage / ProfilePage wrapper node for an entity page. */
export function buildEntityPageSchema(entity: Entity): Json {
  const isPerson = entity.entityType === "person";
  return clean({
    "@type": isPerson ? "ProfilePage" : "WebPage",
    "@id": pageId(entity.path),
    url: abs(entity.path),
    name: entity.name,
    description: entity.shortDescription,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    dateCreated: entity.createdAt,
    dateModified: entity.updatedAt,
    breadcrumb: { "@id": `${abs(entity.path)}#breadcrumb` },
    mainEntity: { "@id": entityId(entity) },
    about: { "@id": entityId(entity) },
    citation: sourceCitations(entity),
  });
}

export function graph(nodes: Json[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}

export interface HeadOptions {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  image?: string;
  noindex?: boolean;
  schema?: Json[];
}

/** Canonical head() payload used by every route. */
export function pageHead(options: HeadOptions) {
  const url = abs(options.path);
  const meta: Array<Record<string, string>> = [
    { title: options.title },
    { name: "description", content: options.description },
    { property: "og:title", content: options.title },
    { property: "og:description", content: options.description },
    { property: "og:type", content: options.ogType ?? "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: options.title },
    { name: "twitter:description", content: options.description },
  ];
  if (options.image) {
    meta.push({ property: "og:image", content: abs(options.image) });
    meta.push({ name: "twitter:image", content: abs(options.image) });
  }
  meta.push({
    name: "robots",
    content: options.noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
  });

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    ...(options.schema && options.schema.length
      ? { scripts: [{ type: "application/ld+json", children: graph(options.schema) }] }
      : {}),
  };
}

/** Head payload for a full entity page: page node + entity node + breadcrumb. */
export function entityHead(entity: Entity, trail: { label: string; to?: string }[]) {
  return pageHead({
    title: entity.seoTitle,
    description: entity.seoDescription,
    path: entity.path,
    ogType: entity.entityType === "person" ? "profile" : "article",
    ...(entity.image ? { image: entity.image } : {}),
    schema: [
      buildEntityPageSchema(entity),
      buildBreadcrumbSchema(trail, entity.path),
      buildEntitySchema(entity),
      ...relationsFor(entity.id).map((r) => refNode(r.entity)),
    ],
  });
}

/** Head payload for a directory/index page listing entities. */
export function indexHead(opts: {
  title: string;
  description: string;
  path: string;
  listName: string;
  items: Entity[];
  trail: { label: string; to?: string }[];
}) {
  return pageHead({
    title: opts.title,
    description: opts.description,
    path: opts.path,
    schema: [
      {
        "@type": "CollectionPage",
        "@id": pageId(opts.path),
        url: abs(opts.path),
        name: opts.title,
        description: opts.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${abs(opts.path)}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          name: opts.listName,
          itemListElement: opts.items.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: abs(e.path),
            name: e.name,
          })),
        },
      },
      buildBreadcrumbSchema(opts.trail, opts.path),
    ],
  });
}

/** Every canonical, indexable URL on the site (used by the sitemap). */
export function canonicalUrls(): { path: string; lastmod?: string; priority: string }[] {
  const statics: { path: string; priority: string }[] = [
    { path: "/", priority: "1.0" },
    { path: "/people", priority: "0.8" },
    { path: "/organizations", priority: "0.8" },
    { path: "/projects", priority: "0.8" },
    { path: "/technology", priority: "0.7" },
    { path: "/timeline", priority: "0.7" },
    { path: "/explore", priority: "0.7" },
    { path: "/events", priority: "0.4" },
    { path: "/articles", priority: "0.4" },
    { path: "/sources", priority: "0.6" },
    { path: "/methodology", priority: "0.7" },
    { path: "/credibility", priority: "0.6" },
    { path: "/editorial-policy", priority: "0.6" },
    { path: "/about", priority: "0.5" },
    { path: "/privacy", priority: "0.3" },
    { path: "/terms", priority: "0.3" },
  ];
  return [
    ...statics,
    ...entities.map((e) => ({
      path: e.path,
      lastmod: e.updatedAt,
      priority: e.entityType === "organization" ? "0.9" : "0.8",
    })),
    ...articleUrls(),
  ];
}

/* ------------------------------------------------------------------ *
 * Articles (source-controlled, file-backed — see src/content/articles)
 * ------------------------------------------------------------------ */

import {
  articleContents,
  articleEntities,
  articlePath,
  articleSources,
  publishedArticles,
  resolveAuthor,
  type Article,
} from "@/data/articles";

export function articleId(article: Article): string {
  return `${abs(articlePath(article))}#article`;
}

export function buildArticleSchema(article: Article): Json {
  const author = resolveAuthor(article.authorId);
  const related = articleEntities(article);
  return clean({
    "@type": "Article",
    "@id": articleId(article),
    headline: article.title,
    description: article.excerpt,
    url: abs(articlePath(article)),
    mainEntityOfPage: { "@id": pageId(articlePath(article)) },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    articleSection: article.category,
    keywords: article.tags,
    image: article.coverImage ? abs(article.coverImage) : undefined,
    inLanguage: "en",
    author: author.entity
      ? { "@id": entityId(author.entity) }
      : { "@type": "Organization", name: author.name },
    publisher: { "@id": `${SITE_URL}/dimisi-technologies#organization` },
    about: related.map((e) => ({ "@id": entityId(e) })),
    mentions: related.map((e) => ({ "@id": entityId(e) })),
    citation: articleSources(article)
      .filter((s) => Boolean(s.url))
      .map((s) => clean({ "@type": "WebPage", name: s.title, url: s.url })),
  });
}

/** Head payload for a single article page. Drafts are always noindex. */
export function articleHead(article: Article, trail: { label: string; to?: string }[]) {
  const path = articlePath(article);
  const author = resolveAuthor(article.authorId);
  const isDraft = article.status !== "published";
  return pageHead({
    title: article.seoTitle,
    description: article.seoDescription,
    path,
    ogType: "article",
    ...(article.coverImage ? { image: article.coverImage } : {}),
    ...(isDraft ? { noindex: true } : {}),
    schema: isDraft
      ? []
      : [
          clean({
            "@type": "WebPage",
            "@id": pageId(path),
            url: abs(path),
            name: article.title,
            description: article.excerpt,
            inLanguage: "en",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            breadcrumb: { "@id": `${abs(path)}#breadcrumb` },
            mainEntity: { "@id": articleId(article) },
            datePublished: article.datePublished,
            dateModified: article.dateModified,
          }),
          buildBreadcrumbSchema(trail, path),
          buildArticleSchema(article),
          ...(author.entity ? [refNode(author.entity)] : []),
          ...articleEntities(article).map((e) => refNode(e)),
        ],
  });
}

/** Published article URLs for the sitemap. Drafts are excluded by design. */
export function articleUrls(): { path: string; lastmod: string; priority: string }[] {
  return publishedArticles.map((a) => ({
    path: articlePath(a),
    lastmod: a.dateModified,
    priority: "0.6",
  }));
}

/** Exposed so the article page can render an in-page contents list. */
export { articleContents };
