import { createFileRoute } from "@tanstack/react-router";
import { productEntities } from "@/data/knowledge";
import { apiJsonResponse, paginate, serializeEntity } from "@/lib/knowledge-api";

export const Route = createFileRoute("/api/v1/knowledge/products")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") ?? "1", 10);
        const limit = parseInt(url.searchParams.get("limit") ?? "50", 10);

        // Kalesh is flagship product
        const sorted = [...productEntities].sort((a, b) => {
          if (a.id === "kalesh") return -1;
          if (b.id === "kalesh") return 1;
          return a.name.localeCompare(b.name);
        });

        const serialized = sorted.map((p) => serializeEntity(p));
        const paginated = paginate(serialized, page, limit);

        return apiJsonResponse(paginated);
      },
    },
  },
});
