import { createFileRoute } from "@tanstack/react-router";
import { entities, relationsFor } from "@/data/knowledge";
import { abs, entityId, SITE_URL } from "@/lib/seo";

/**
 * Public Open Knowledge API — Entities Endpoint.
 * GET /api/v1/entities
 */
export const Route = createFileRoute("/api/v1/entities")({
  server: {
    handlers: {
      GET: async () => {
        const payload = {
          "@context": "https://schema.org",
          platform: "DIMISIPEDIA",
          organization: "DIMISI Technologies Private Limited",
          count: entities.length,
          updatedAt: new Date().toISOString(),
          entities: entities.map((e) => ({
            id: e.id,
            slug: e.slug,
            name: e.name,
            entityType: e.entityType,
            subtitle: e.subtitle,
            shortDescription: e.shortDescription,
            url: abs(e.path),
            schemaId: entityId(e),
            verifiedAt: e.verifiedAt ?? e.updatedAt,
            factsCount: e.facts.length,
            sourcesCount: e.sourceIds.length,
            relationships: relationsFor(e.id).map((r) => ({
              type: r.type,
              targetId: r.entity.id,
              targetName: r.entity.name,
              targetType: r.entity.entityType,
              targetUrl: abs(r.entity.path),
            })),
          })),
        };

        return new Response(JSON.stringify(payload, null, 2), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
