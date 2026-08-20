import { createFileRoute } from "@tanstack/react-router";
import { timeline } from "@/data/knowledge";

/**
 * Public Open Knowledge API — Timeline Endpoint.
 * GET /api/v1/timeline
 */
export const Route = createFileRoute("/api/v1/timeline")({
  server: {
    handlers: {
      GET: async () => {
        const payload = {
          platform: "DIMISIPEDIA",
          organization: "DIMISI Technologies Private Limited",
          count: timeline.length,
          updatedAt: new Date().toISOString(),
          timeline: timeline.map((t) => ({
            date: t.date,
            displayDate: t.displayDate,
            title: t.title,
            description: t.description,
            category: t.category,
            verificationStatus: t.status,
            relatedEntityIds: t.related,
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
