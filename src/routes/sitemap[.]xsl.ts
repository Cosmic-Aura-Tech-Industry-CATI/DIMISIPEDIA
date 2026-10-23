import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import fs from "node:fs";
import path from "node:path";

let cachedXsl: string | null = null;

function getXslContent(): string {
  if (!cachedXsl) {
    const xslPath = path.resolve(process.cwd(), "public/sitemap.xsl");
    if (fs.existsSync(xslPath)) {
      cachedXsl = fs.readFileSync(xslPath, "utf8");
    } else {
      cachedXsl = '<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0"/>';
    }
  }
  return cachedXsl;
}

export const Route = createFileRoute("/sitemap.xsl")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(getXslContent(), {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
            "X-Content-Type-Options": "nosniff",
          },
        });
      },
    },
  },
});
