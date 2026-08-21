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
  const explicitSameAs = entity.sameAs ?? [];
  return Array.from(new Set([...explicitSameAs, ...external, ...official]));
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
  return clean({
    "@type": type,
    "@id": entityId(entity),
    name: entity.name,
    url: abs(entity.path),
  });
}

export function buildWebsiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "DIMISIPEDIA Knowledge Hub",
    url: `${SITE_URL}/`,
    inLanguage: "en",
    description:
      "DIMISIPEDIA is an authoritative entity knowledge platform documenting DIMISI Technologies Pvt. Ltd., its founders, people, projects, technologies, and history.",
    publisher: { "@id": `${SITE_URL}/dimisi-technologies#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Sitelinks Schema: SiteNavigationElement list for Google Expanded Sitelinks */
export function buildSiteNavigationSchema(): Json {
  const items = [
    {
      name: "Our Journey",
      url: `${SITE_URL}/journey`,
      description: "Chronological founder journey of Shikhar Dixit and DIMISI Technologies.",
    },
    {
      name: "Shikhar Dixit — Founder & CEO",
      url: `${SITE_URL}/people/shikhar-dixit`,
      description:
        "Official profile of Shikhar Dixit, Founder and Chief Executive Officer of DIMISI Technologies.",
    },
    {
      name: "DIMISI Technologies",
      url: `${SITE_URL}/dimisi-technologies`,
      description:
        "Corporate overview, CIN: U62013UP2026PTC246506, leadership, and products of DIMISI Technologies Pvt. Ltd.",
    },
    {
      name: "Kalesh Platform",
      url: `${SITE_URL}/projects/kalesh`,
      description:
        "Anonymous social polling and engagement platform developed by DIMISI Technologies.",
    },
    {
      name: "People & Leadership",
      url: `${SITE_URL}/people`,
      description: "Founders, executive leadership, and engineering team members.",
    },
    {
      name: "Projects & Products",
      url: `${SITE_URL}/projects`,
      description: "Software products, applications, and engineering projects.",
    },
    {
      name: "Timeline & Milestones",
      url: `${SITE_URL}/timeline`,
      description: "Verifiable chronological records and historical company milestones.",
    },
    {
      name: "Technology Stack",
      url: `${SITE_URL}/technology`,
      description: "Documented engineering frameworks, programming languages, and cloud systems.",
    },
    {
      name: "About DIMISIPEDIA",
      url: `${SITE_URL}/about`,
      description: "About the entity knowledge platform and public documentation.",
    },
  ];

  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#navigation`,
    name: "DIMISIPEDIA Main Navigation",
    itemListElement: items.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  };
}

/** FAQPage Schema for AI Answer Engines (Perplexity, ChatGPT, Claude, Google SGE) */
export function buildFAQSchema(
  faqs: { question?: string; answer?: string; q?: string; a?: string }[] | undefined,
  path: string,
): Json | null {
  if (!faqs || faqs.length === 0) return null;
  const mainEntity = faqs.map((item) => ({
    "@type": "Question",
    name: item.question || item.q || "",
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer || item.a || "",
    },
  }));

  return {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity,
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

  const nameParts = entity.name.trim().split(/\s+/);
  const givenName = nameParts[0];
  const familyName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;

  const roleTitles = (entity.roles ?? []).map((r) => r.title);

  return clean({
    "@type": "Person",
    "@id": entityId(entity),
    name: entity.name,
    givenName,
    familyName,
    image: entity.image ? abs(entity.image) : undefined,
    alternateName: entity.subtitle || undefined,
    description: entity.answer || entity.shortDescription,
    url: abs(entity.path),
    mainEntityOfPage: { "@id": pageId(entity.path) },
    jobTitle: roleTitles.length > 0 ? roleTitles : undefined,
    hasOccupation: {
      "@type": "Occupation",
      name: roleTitles.join(", ") || "Technology Entrepreneur",
      occupationLocation: {
        "@type": "AdministrativeArea",
        name: "Kanpur, Uttar Pradesh, India",
      },
    },
    worksFor: orgs.map((r) => ({
      "@type": "Organization",
      "@id": entityId(r.entity),
      name: r.entity.name,
      url: abs(r.entity.path),
    })),
    affiliation: orgs.map((r) => ({
      "@type": "Organization",
      "@id": entityId(r.entity),
      name: r.entity.name,
      url: abs(r.entity.path),
    })),
    founder: orgs.map((r) => ({
      "@type": "Organization",
      "@id": entityId(r.entity),
      name: r.entity.name,
      url: abs(r.entity.path),
    })),
    knowsAbout: entity.knowsAbout ??
      entity.areas ?? [
        "Artificial Intelligence",
        "Software Engineering",
        "Technology Entrepreneurship",
        "DIMISI Technologies",
        "Kalesh",
      ],
    subjectOf: projects.map((r) => ({ "@id": entityId(r.entity) })),
    alumniOf: (entity.education ?? []).map((e) =>
      clean({
        "@type": "EducationalOrganization",
        name: e.institution,
      }),
    ),
    nationality: {
      "@type": "Country",
      name: "India",
    },
    homeLocation: {
      "@type": "PostalAddress",
      addressLocality: "Kanpur",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kanpur",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    sameAs: verifiedProfileUrls(entity),
  });
}

export function buildOrganizationSchema(entity: Entity): Json {
  const related = relationsFor(entity.id);
  const people = related.filter((r) => r.entity.entityType === "person");
  const founders = people.filter((r) => /Founder|Director/i.test(r.type));
  const ceo = people.find((r) => /CEO/i.test(r.type));
  const fact = (label: string) =>
    entity.facts.find((f) => f.label.toLowerCase() === label.toLowerCase())?.value;

  return clean({
    "@type": "Organization",
    "@id": entityId(entity),
    name: ORG_NAME,
    alternateName: entity.name !== ORG_NAME ? entity.name : "DIMISI",
    legalName: fact("Legal name") ?? "DIMISI Technologies Private Limited",
    logo: entity.image ? abs(entity.image) : abs("/images/dimisi-logo.png"),
    image: entity.image ? abs(entity.image) : abs("/images/dimisi-logo.png"),
    description: entity.answer || entity.shortDescription,
    url: abs(entity.path),
    mainEntityOfPage: { "@id": pageId(entity.path) },
    foundingDate: fact("Incorporated") ?? fact("Founded") ?? "2026-04-09",
    taxID: fact("CIN") ?? "U62013UP2026PTC246506",
    identifier: fact("CIN") ?? "U62013UP2026PTC246506",
    founder: founders.map((r) => ({
      "@type": "Person",
      "@id": entityId(r.entity),
      name: r.entity.name,
      url: abs(r.entity.path),
    })),
    ceo: ceo
      ? {
          "@type": "Person",
          "@id": entityId(ceo.entity),
          name: ceo.entity.name,
          url: abs(ceo.entity.path),
        }
      : undefined,
    employee: people.map((r) => ({
      "@type": "Person",
      "@id": entityId(r.entity),
      name: r.entity.name,
      url: abs(r.entity.path),
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: "MIG 3/131, Swarn Jayanti Vihar, Koyala Nagar",
      addressLocality: "Kanpur",
      addressRegion: "Uttar Pradesh",
      postalCode: "208011",
      addressCountry: "IN",
    },
    location: {
      "@type": "Place",
      name: "DIMISI Technologies Registered Office",
      address: {
        "@type": "PostalAddress",
        streetAddress: "MIG 3/131, Swarn Jayanti Vihar, Koyala Nagar",
        addressLocality: "Kanpur",
        addressRegion: "Uttar Pradesh",
        postalCode: "208011",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "26.4499",
        longitude: "80.3319",
      },
    },
    sameAs: verifiedProfileUrls(entity),
  });
}

export function buildProjectSchema(entity: Entity): Json {
  const related = relationsFor(entity.id);
  const creatorOrg = related.find((r) => r.entity.entityType === "organization");
  const people = related.filter((r) => r.entity.entityType === "person");
  const creatorPerson = people.find((r) => /Founder|Creator|Product|Lead/i.test(r.type));
  const tech = related.filter((r) => r.entity.entityType === "technology");

  const isSoftwareApp = entity.id === "kalesh" || entity.id === "dimisipedia";

  const baseSchema: Json = {
    "@type": isSoftwareApp ? "SoftwareApplication" : "CreativeWork",
    "@id": entityId(entity),
    name: entity.name,
    alternateName: entity.subtitle || undefined,
    description: entity.answer || entity.shortDescription,
    url: abs(entity.path),
    mainEntityOfPage: { "@id": pageId(entity.path) },
    creator: creatorPerson
      ? { "@id": entityId(creatorPerson.entity) }
      : creatorOrg
        ? { "@id": entityId(creatorOrg.entity) }
        : undefined,
    publisher: creatorOrg ? { "@id": entityId(creatorOrg.entity) } : undefined,
    keywords: tech.map((r) => r.entity.name),
    creativeWorkStatus: entity.lifecycle,
    dateCreated: toIsoDateTime(entity.createdAt),
    dateModified: toIsoDateTime(entity.updatedAt),
    citation: sourceCitations(entity),
  };

  if (isSoftwareApp) {
    baseSchema["applicationCategory"] = "SocialNetworkingApplication";
    baseSchema["operatingSystem"] = "Web, iOS, Android";
    baseSchema["offers"] = {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    };
  }

  return clean(baseSchema);
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

export function toIsoDateTime(d: string | undefined): string | undefined {
  if (!d) return undefined;
  if (d.includes("T")) return d;
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    return `${d}T00:00:00+05:30`;
  }
  return d;
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
    dateCreated: toIsoDateTime(entity.createdAt),
    dateModified: toIsoDateTime(entity.updatedAt),
    breadcrumb: { "@id": `${abs(entity.path)}#breadcrumb` },
    primaryImageOfPage: entity.image
      ? {
          "@type": "ImageObject",
          contentUrl: abs(entity.image),
          caption: `${entity.name} — DIMISIPEDIA documentation`,
          representativeOfPage: true,
        }
      : undefined,
    mainEntity: { "@id": entityId(entity) },
    about: { "@id": entityId(entity) },
    citation: sourceCitations(entity),
  });
}

export function graph(nodes: (Json | null)[]): string {
  const validNodes = nodes.filter(Boolean);
  return JSON.stringify({ "@context": "https://schema.org", "@graph": validNodes });
}

export interface HeadOptions {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  image?: string;
  noindex?: boolean;
  schema?: (Json | null)[];
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
    { name: "geo.region", content: "IN-UP" },
    { name: "geo.placename", content: "Kanpur, Uttar Pradesh, India" },
    { name: "geo.position", content: "26.4499;80.3319" },
    { name: "ICBM", content: "26.4499, 80.3319" },
    { name: "theme-color", content: "#0a0a0a" },
    { name: "author", content: "DIMISI Technologies Pvt. Ltd." },
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

/** Head payload for a full entity page: page node + entity node + breadcrumb + FAQ schema (if any). */
export function entityHead(entity: Entity, trail: { label: string; to?: string }[]) {
  const faqSchema = buildFAQSchema(entity.faqs ?? entity.questions, entity.path);
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
      faqSchema,
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
    { path: "/journey", priority: "0.8" },
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
    ...entities.map((e) => {
      let priority = "0.8";
      if (e.id === "shikhar-dixit") priority = "1.0";
      else if (e.entityType === "organization" || e.id === "kalesh") priority = "0.9";
      else if (e.id === "swatantra-singh" || e.id === "nishkarsh-mishra") priority = "0.85";
      return {
        path: e.path,
        lastmod: e.updatedAt,
        priority,
      };
    }),
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
    datePublished: toIsoDateTime(article.datePublished),
    dateModified: toIsoDateTime(article.dateModified),
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
            datePublished: toIsoDateTime(article.datePublished),
            dateModified: toIsoDateTime(article.dateModified),
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
