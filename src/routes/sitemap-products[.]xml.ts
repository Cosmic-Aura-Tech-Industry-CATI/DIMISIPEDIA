import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateProductsSitemapXml, sitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-products.xml")({
  server: {
    handlers: {
      GET: async () => {
        return sitemapResponse(generateProductsSitemapXml());
      },
    },
  },
});
