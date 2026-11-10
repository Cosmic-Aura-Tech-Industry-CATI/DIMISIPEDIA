import { createFileRoute } from "@tanstack/react-router";
import { entities } from "@/data/knowledge";
import { apiJsonResponse, serializeEntity } from "@/lib/knowledge-api";

export const Route = createFileRoute("/api/v1/knowledge/entity/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const slug = params.slug;
        const entity = entities.find((e) => e.slug === slug || e.id === slug);

        if (!entity) {
          return apiJsonResponse(
            {
              error: "Entity not found",
              message: `No verified entity matching identifier '${slug}' was found in DIMISIPEDIA.`,
              status: 404,
            },
            404,
          );
        }

        return apiJsonResponse({
          "@context": "https://schema.org",
          entity: serializeEntity(entity),
        });
      },
    },
  },
});
