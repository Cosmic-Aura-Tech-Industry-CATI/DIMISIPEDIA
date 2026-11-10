import { createFileRoute } from "@tanstack/react-router";
import { entities } from "@/data/knowledge";
import { apiJsonResponse, paginate, serializeEntity } from "@/lib/knowledge-api";

export const Route = createFileRoute("/api/v1/knowledge/entities")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") ?? "1", 10);
        const limit = parseInt(url.searchParams.get("limit") ?? "50", 10);

        // Prioritize Shikhar Dixit first
        const sorted = [...entities].sort((a, b) => {
          if (a.id === "shikhar-dixit") return -1;
          if (b.id === "shikhar-dixit") return 1;
          if (a.id === "dimisi-technologies") return -1;
          if (b.id === "dimisi-technologies") return 1;
          return a.name.localeCompare(b.name);
        });

        const serialized = sorted.map((e) => serializeEntity(e));
        const paginated = paginate(serialized, page, limit);

        return apiJsonResponse(paginated);
      },
    },
  },
});
