import { createFileRoute } from "@tanstack/react-router";
import { peopleEntities } from "@/data/knowledge";
import { apiJsonResponse, paginate, serializeEntity } from "@/lib/knowledge-api";

export const Route = createFileRoute("/api/v1/knowledge/people")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") ?? "1", 10);
        const limit = parseInt(url.searchParams.get("limit") ?? "50", 10);

        // Shikhar Dixit is strictly apex leader
        const sorted = [...peopleEntities].sort((a, b) => {
          if (a.id === "shikhar-dixit") return -1;
          if (b.id === "shikhar-dixit") return 1;
          return a.name.localeCompare(b.name);
        });

        const serialized = sorted.map((e) => serializeEntity(e));
        const paginated = paginate(serialized, page, limit);

        return apiJsonResponse(paginated);
      },
    },
  },
});
