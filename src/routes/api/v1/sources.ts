import { createFileRoute } from "@tanstack/react-router";
import { sources } from "@/data/knowledge";

/**
 * Public Open Knowledge API — Sources & Evidence Catalog Endpoint.
 * GET /api/v1/sources
 */
export const Route = createFileRoute("/api/v1/sources")({
  server: {
    handlers: {
      GET: async () => {
        const payload = {
          platform: "DIMISIPEDIA",
          organization: "DIMISI Technologies Private Limited",
          count: sources.length,
          updatedAt: new Date().toISOString(),
          sources: sources.map((s) => ({
            id: s.id,
            title: s.title,
            publisher: s.publisher,
            type: s.type,
            verificationStatus: s.status,
            claim: s.claim,
            url: s.url ?? null,
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
