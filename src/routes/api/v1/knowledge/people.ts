import { createFileRoute } from "@tanstack/react-router";
import { peopleEntities } from "@/data/knowledge";
import { apiErrorResponse, apiJsonResponse, paginate, serializeEntity } from "@/lib/knowledge-api";

export const Route = createFileRoute("/api/v1/knowledge/people")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const pageParam = url.searchParams.get("page") ?? "1";
          const limitParam = url.searchParams.get("limit") ?? "50";

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

          // Shikhar Dixit is strictly apex leader
          const sorted = [...peopleEntities].sort((a, b) => {
            if (a.id === "shikhar-dixit") return -1;
            if (b.id === "shikhar-dixit") return 1;
            return a.name.localeCompare(b.name);
          });

          const serialized = sorted.map((e) => serializeEntity(e));
          const paginated = paginate(serialized, page, limit);

          return apiJsonResponse(paginated);
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : "Internal server error";
          return apiErrorResponse("Failed to list people entities", 500, { detail: errorMsg });
        }
      },
    },
  },
});
