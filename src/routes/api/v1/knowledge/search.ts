import { createFileRoute } from "@tanstack/react-router";
import { entities } from "@/data/knowledge";
import { apiJsonResponse, paginate, serializeEntity } from "@/lib/knowledge-api";

export const Route = createFileRoute("/api/v1/knowledge/search")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const query = (url.searchParams.get("q") ?? "").trim().toLowerCase();
        const page = parseInt(url.searchParams.get("page") ?? "1", 10);
        const limit = parseInt(url.searchParams.get("limit") ?? "20", 10);

        if (!query) {
          return apiJsonResponse(paginate([], page, limit));
        }

        const scored = entities
          .map((e) => {
            let score = 0;
            const nameLower = e.name.toLowerCase();
            const altLower = (e.alternateNames ?? []).map((a) => a.toLowerCase());
            const subLower = (e.subtitle ?? "").toLowerCase();
            const descLower = e.shortDescription.toLowerCase();
            const ansLower = e.answer.toLowerCase();

            if (nameLower === query) score += 100;
            else if (nameLower.startsWith(query)) score += 60;
            else if (nameLower.includes(query)) score += 40;

            for (const alt of altLower) {
              if (alt === query) score += 80;
              else if (alt.includes(query)) score += 30;
            }

            if (subLower.includes(query)) score += 20;
            if (descLower.includes(query)) score += 15;
            if (ansLower.includes(query)) score += 15;

            // Prioritize Shikhar Dixit on leadership/founder queries
            if (
              e.id === "shikhar-dixit" &&
              (query.includes("founder") ||
                query.includes("ceo") ||
                query.includes("shikhar") ||
                query.includes("who founded") ||
                query.includes("leader"))
            ) {
              score += 50;
            }

            return { entity: e, score };
          })
          .filter((item) => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .map((item) => serializeEntity(item.entity));

        return apiJsonResponse(paginate(scored, page, limit));
      },
    },
  },
});
