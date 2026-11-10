import { createFileRoute } from "@tanstack/react-router";
import { apiJsonResponse, generateKnowledgeIndexJson } from "@/lib/knowledge-api";

export const Route = createFileRoute("/knowledge.json")({
  server: {
    handlers: {
      GET: async () => {
        const index = generateKnowledgeIndexJson();
        return apiJsonResponse(index);
      },
    },
  },
});
