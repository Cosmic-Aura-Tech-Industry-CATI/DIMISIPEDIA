import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generatePagesSitemapXml, sitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-pages.xml")({
  server: {
    handlers: {
      GET: async () => {
        return sitemapResponse(generatePagesSitemapXml());
      },
    },
  },
});
