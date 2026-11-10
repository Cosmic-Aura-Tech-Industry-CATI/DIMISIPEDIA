import { createFileRoute } from "@tanstack/react-router";
import { entities } from "@/data/knowledge";
import { apiErrorResponse, apiJsonResponse, serializeEntity } from "@/lib/knowledge-api";

export const Route = createFileRoute("/api/v1/knowledge/entity/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const slug = params.slug;
          if (!slug || slug === "$slug") {
            return apiErrorResponse("Missing or invalid entity slug parameter", 400);
          }

          const entity = entities.find((e) => e.slug === slug || e.id === slug);

          if (!entity) {
            return apiErrorResponse(
              `No verified entity matching identifier '${slug}' was found in DIMISIPEDIA.`,
              404,
              { requestedSlug: slug },
            );
          }

          return apiJsonResponse({
            "@context": "https://schema.org",
            entity: serializeEntity(entity),
          });
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : "Internal server error";
          return apiErrorResponse("Failed to process entity retrieval request", 500, {
            detail: errorMsg,
          });
        }
      },
    },
  },
});
