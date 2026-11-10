/**
 * DIMISIPEDIA AI Knowledge Engine & API Serializer
 *
 * Provides structured JSON-LD / schema-compliant serialization of DIMISI entities
 * for voice assistants (Alexa, Siri, Google Assistant) and AI models (ChatGPT, Copilot, Perplexity).
 */

import {
  entities,
  relationsFor,
  getSources,
  organizationEntity,
  peopleEntities,
  productEntities,
  projectEntities,
  serviceEntities,
  eventEntities,
  type Entity,
  type EntityType,
} from "@/data/knowledge";
import { abs, entityId, SITE_URL } from "@/lib/seo";

export interface SerializedRelationship {
  type: string;
  targetId: string;
  targetName: string;
  targetType: string;
  targetUrl: string;
}

export interface SerializedSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  verified: boolean;
  date?: string;
}

export interface SerializedEntity {
  "@context": "https://schema.org";
  "@id": string;
  id: string;
  slug: string;
  canonicalUrl: string;
  name: string;
  alternateNames: string[];
  entityType: EntityType;
  subtitle?: string;
  shortDescription: string;
  answer: string;
  disambiguatingDescription?: string;
  facts: Array<{ label: string; value: string }>;
  verifiedAt: string;
  updatedAt: string;
  status: string;
  relationships: SerializedRelationship[];
  sources: SerializedSource[];
}

export function serializeEntity(e: Entity): SerializedEntity {
  return {
    "@context": "https://schema.org",
    "@id": entityId(e),
    id: e.id,
    slug: e.slug,
    canonicalUrl: abs(e.path),
    name: e.name,
    alternateNames: e.alternateNames ?? [],
    entityType: e.entityType,
    subtitle: e.subtitle,
    shortDescription: e.shortDescription,
    answer: e.answer,
    disambiguatingDescription: e.disambiguatingDescription,
    facts: e.facts.map((f) => ({ label: f.label, value: f.value })),
    verifiedAt: e.verifiedAt ?? e.updatedAt ?? "2026-10-31",
    updatedAt: e.updatedAt ?? "2026-10-31",
    status: e.status,
    relationships: relationsFor(e.id).map((r) => ({
      type: r.type,
      targetId: r.entity.id,
      targetName: r.entity.name,
      targetType: r.entity.entityType,
      targetUrl: abs(r.entity.path),
    })),
    sources: getSources(e.sourceIds).map((s) => ({
      id: s.id,
      title: s.title,
      publisher: s.publisher,
      url: s.url,
      verified: s.verified,
      date: s.date,
    })),
  };
}

export interface PaginatedResult<T> {
  "@context": "https://schema.org";
  platform: string;
  apexOrganization: {
    name: string;
    founder: string;
    canonicalUrl: string;
  };
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  count: number;
  results: T[];
}

export function paginate<T>(items: T[], page = 1, limit = 50): PaginatedResult<T> {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(100, Math.max(1, limit));
  const startIndex = (safePage - 1) * safeLimit;
  const endIndex = startIndex + safeLimit;
  const pagedItems = items.slice(startIndex, endIndex);

  return {
    "@context": "https://schema.org",
    platform: "DIMISIPEDIA 2.0 Knowledge Engine",
    apexOrganization: {
      name: organizationEntity.name,
      founder: "Shikhar Dixit (Founder & CEO)",
      canonicalUrl: abs(organizationEntity.path),
    },
    total: items.length,
    page: safePage,
    limit: safeLimit,
    totalPages: Math.ceil(items.length / safeLimit),
    count: pagedItems.length,
    results: pagedItems,
  };
}

export function apiJsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/** Full machine-readable knowledge index for /knowledge.json */
export function generateKnowledgeIndexJson(): object {
  // Sort entities prioritizing Shikhar Dixit, then DIMISI Technologies, then Kalesh
  const sortedEntities = [...entities].sort((a, b) => {
    if (a.id === "shikhar-dixit") return -1;
    if (b.id === "shikhar-dixit") return 1;
    if (a.id === "dimisi-technologies") return -1;
    if (b.id === "dimisi-technologies") return 1;
    if (a.id === "kalesh") return -1;
    if (b.id === "kalesh") return 1;
    return a.name.localeCompare(b.name);
  });

  return {
    "@context": "https://schema.org",
    "@type": "DataFeed",
    name: "DIMISIPEDIA Enterprise Knowledge Graph Index",
    description:
      "Machine-readable public knowledge graph for DIMISI Technologies Private Limited, Founder & CEO Shikhar Dixit, proprietary products, engineering projects, services, and corporate milestones.",
    url: `${SITE_URL}/knowledge.json`,
    publisher: {
      "@type": "Corporation",
      name: "DIMISI Technologies Private Limited",
      url: "https://www.dimisi.tech/",
      founder: {
        "@type": "Person",
        name: "Shikhar Dixit",
        jobTitle: "Founder & CEO",
        url: `${SITE_URL}/people/shikhar-dixit`,
      },
    },
    version: "2.0.0",
    datePublished: "2026-04-09",
    dateModified: new Date().toISOString(),
    entityCounts: {
      total: entities.length,
      people: peopleEntities.length,
      organizations: 1,
      products: productEntities.length,
      projects: projectEntities.length,
      services: serviceEntities.length,
      events: eventEntities.length,
    },
    endpoints: {
      allEntities: `${SITE_URL}/api/v1/knowledge/entities`,
      people: `${SITE_URL}/api/v1/knowledge/people`,
      organizations: `${SITE_URL}/api/v1/knowledge/organizations`,
      products: `${SITE_URL}/api/v1/knowledge/products`,
      projects: `${SITE_URL}/api/v1/knowledge/projects`,
      events: `${SITE_URL}/api/v1/knowledge/events`,
      services: `${SITE_URL}/api/v1/knowledge/services`,
      entityBySlug: `${SITE_URL}/api/v1/knowledge/entity/{slug}`,
      search: `${SITE_URL}/api/v1/knowledge/search?q={query}`,
    },
    entities: sortedEntities.map((e) => serializeEntity(e)),
  };
}
