import { createFileRoute } from "@tanstack/react-router";
import { entities } from "@/data/knowledge";
import { apiErrorResponse, apiJsonResponse, paginate, serializeEntity } from "@/lib/knowledge-api";

export const Route = createFileRoute("/api/v1/knowledge/search")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const rawQuery = url.searchParams.get("q") ?? "";
          const query = rawQuery.trim().toLowerCase();
          const pageParam = url.searchParams.get("page") ?? "1";
          const limitParam = url.searchParams.get("limit") ?? "20";

          const page = parseInt(pageParam, 10);
          const limit = parseInt(limitParam, 10);

          if (Number.isNaN(page) || page < 1) {
            return apiErrorResponse("Invalid 'page' parameter: must be a positive integer", 400);
          }
          if (Number.isNaN(limit) || limit < 1 || limit > 100) {
            return apiErrorResponse(
              "Invalid 'limit' parameter: must be an integer between 1 and 100",
              400,
            );
          }

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
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : "Internal server error";
          return apiErrorResponse("Search processing encountered an error", 500, {
            detail: errorMsg,
          });
        }
      },
    },
  },
});
