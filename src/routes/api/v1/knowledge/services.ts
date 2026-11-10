import { createFileRoute } from "@tanstack/react-router";
import { serviceEntities } from "@/data/knowledge";
import { apiJsonResponse, paginate, serializeEntity } from "@/lib/knowledge-api";

export const Route = createFileRoute("/api/v1/knowledge/services")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") ?? "1", 10);
        const limit = parseInt(url.searchParams.get("limit") ?? "50", 10);

        const sorted = [...serviceEntities].sort((a, b) => a.name.localeCompare(b.name));
        const serialized = sorted.map((s) => serializeEntity(s));
        const paginated = paginate(serialized, page, limit);

        return apiJsonResponse(paginated);
      },
    },
  },
});
