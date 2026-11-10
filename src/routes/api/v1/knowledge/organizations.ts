import { createFileRoute } from "@tanstack/react-router";
import { organizationEntity } from "@/data/knowledge";
import { apiJsonResponse, paginate, serializeEntity } from "@/lib/knowledge-api";

export const Route = createFileRoute("/api/v1/knowledge/organizations")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") ?? "1", 10);
        const limit = parseInt(url.searchParams.get("limit") ?? "50", 10);

        const serialized = [serializeEntity(organizationEntity)];
        const paginated = paginate(serialized, page, limit);

        return apiJsonResponse(paginated);
      },
    },
  },
});
