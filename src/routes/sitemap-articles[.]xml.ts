import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { generateArticlesSitemapXml, sitemapResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-articles.xml")({
  server: {
    handlers: {
      GET: async () => {
        return sitemapResponse(generateArticlesSitemapXml());
      },
    },
  },
});
