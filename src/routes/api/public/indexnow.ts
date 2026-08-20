import { createFileRoute } from "@tanstack/react-router";

/**
 * IndexNow submission endpoint.
 *
 * POST /api/public/indexnow  { "urls": ["https://dimisipedia.me/people/..."] }
 * Header: x-indexnow-token: <INDEXNOW_TRIGGER_TOKEN>
 *
 * Requires two server-side secrets (never exposed to the client):
 *   INDEXNOW_KEY            — the IndexNow key (also served at /indexnow-key.txt)
 *   INDEXNOW_TRIGGER_TOKEN  — shared secret required to call this endpoint
 *
 * IndexNow aids discovery/freshness only; it does not guarantee indexing.
 */
const SITE_HOST = "dimisipedia.me";

export const Route = createFileRoute("/api/public/indexnow")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["INDEXNOW_KEY"];
        const token = process.env["INDEXNOW_TRIGGER_TOKEN"];
        if (!key || !token) {
          return new Response("IndexNow is not configured", { status: 503 });
        }
        if (request.headers.get("x-indexnow-token") !== token) {
          return new Response("Unauthorized", { status: 401 });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const raw = (body as { urls?: unknown })?.urls;
        const urlList = Array.isArray(raw)
          ? raw.filter((u): u is string => typeof u === "string")
          : [];
        const urls = urlList.filter((u) => {
          try {
            return new URL(u).hostname === SITE_HOST;
          } catch {
            return false;
          }
        });
        if (urls.length === 0) {
          return new Response("No valid URLs for this host", { status: 400 });
        }

        const res = await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            host: SITE_HOST,
            key,
            keyLocation: `https://${SITE_HOST}/indexnow-key.txt`,
            urlList: urls,
          }),
        });

        return new Response(
          JSON.stringify({ submitted: urls.length, indexNowStatus: res.status }),
          { status: res.ok ? 202 : 502, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
