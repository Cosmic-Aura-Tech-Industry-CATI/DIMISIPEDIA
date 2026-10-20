import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import { SiteSearch } from "../components/SiteSearch";
import { buildWebsiteSchema, buildSiteNavigationSchema } from "../lib/seo";

function NotFoundComponent() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <p className="label-mono">404 — Not in the archive</p>
      <h1 className="mt-3 text-4xl">This page hasn't entered the DIMISIPEDIA archive yet.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        The entity you're looking for may not be documented, may have been renamed, or may still be
        awaiting verification.
      </p>
      <div className="mt-8">
        <SiteSearch />
      </div>
      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <Link to="/" className="border border-border px-4 py-2 hover:border-primary">
          Home
        </Link>
        <Link to="/explore" className="border border-border px-4 py-2 hover:border-primary">
          Explore DIMISI
        </Link>
        <Link
          to="/dimisi-technologies"
          className="border border-border px-4 py-2 hover:border-primary"
        >
          DIMISI Technologies
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const isOffline = typeof navigator !== "undefined" && !navigator.onLine;

  return (
    <div className="mx-auto max-w-2xl px-5 py-24">
      <p className="label-mono">{isOffline ? "Offline Archive Mode" : "Notice"}</p>
      <h1 className="mt-2 text-2xl font-serif">
        {isOffline ? "Unable to connect to server" : "This page didn't load"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {isOffline
          ? "You are currently browsing in offline standby mode. Cached documentation and leadership records remain available."
          : "Something went wrong loading this entry. You can try again or return to the archive index."}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="border border-border px-4 py-2 hover:border-primary font-mono text-xs cursor-pointer"
        >
          Try again
        </button>
        <Link
          to="/offline"
          className="border border-border bg-surface px-4 py-2 font-mono text-xs text-foreground hover:border-primary transition-colors"
        >
          Offline Archive
        </Link>
        <a
          href="/"
          className="border border-primary bg-primary px-4 py-2 font-mono text-xs text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => {
      setOffline(!navigator.onLine);
    };
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;

  return (
    <aside
      aria-label="Offline status banner"
      className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-2 border-b border-rule bg-surface/95 px-4 py-2 text-xs text-muted-foreground backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
        <span className="font-mono font-medium text-foreground">Offline Archive Mode</span>
        <span className="hidden sm:inline">— Currently viewing locally cached entries.</span>
      </div>
      <Link
        to="/offline"
        className="border border-border bg-background px-2.5 py-0.5 font-mono text-[11px] font-medium text-foreground hover:border-primary transition-colors"
      >
        Offline Details →
      </Link>
    </aside>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DIMISIPEDIA — The Knowledge Encyclopedia of DIMISI Technologies" },
      {
        name: "description",
        content:
          "DIMISIPEDIA documents DIMISI Technologies Pvt. Ltd. — its founders, people, projects, technology, history and sources.",
      },
      { name: "author", content: "DIMISI Technologies Pvt. Ltd." },
      { name: "geo.region", content: "IN-UP" },
      { name: "geo.placename", content: "Kanpur, Uttar Pradesh, India" },
      { name: "geo.position", content: "26.4499;80.3319" },
      { name: "ICBM", content: "26.4499, 80.3319" },
      { name: "theme-color", content: "#0a0a0a" },
      { property: "og:site_name", content: "DIMISIPEDIA" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Spectral:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "author", href: "/llms.txt" },
      { rel: "help", href: "/llms.txt", type: "text/plain", title: "LLM Knowledge Index" },
    ],
    scripts: [
      {
        children: `(function(){try{var t=localStorage.getItem("dp-theme");var isDark=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(isDark){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})();`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [buildWebsiteSchema(), buildSiteNavigationSchema()],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <OfflineBanner />
      <SiteHeader />
      <main id="main">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
