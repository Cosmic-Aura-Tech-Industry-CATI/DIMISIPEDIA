import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { WifiOff, Wifi, RefreshCw, Home, Compass, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { DinoGame } from "@/components/DinoGame";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/offline")({
  head: () =>
    pageHead({
      title: "Offline Mode & Dinosaur Runner | DIMISIPEDIA",
      description:
        "DIMISIPEDIA offline mode. Network connection is currently unavailable. Enjoy the classic Dinosaur Run game while connection restores.",
      path: "/offline",
      noindex: true,
    }),
  component: OfflinePage,
});

function OfflinePage() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );
  const [isChecking, setIsChecking] = useState(false);
  const [reconnectSuccess, setReconnectSuccess] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setReconnectSuccess(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setReconnectSuccess(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleCheckConnection = async () => {
    setIsChecking(true);
    try {
      // Test small fetch to verify real internet connectivity
      const response = await fetch("/favicon.png?cacheBust=" + Date.now(), {
        method: "HEAD",
        cache: "no-store",
      });
      if (response.ok) {
        setIsOnline(true);
        setReconnectSuccess(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      } else {
        setIsOnline(false);
      }
    } catch {
      setIsOnline(false);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:py-12">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Offline Mode" }]} />

      {/* Header Banner */}
      <header className="mt-6 border-b border-rule pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/dimisipedia-logo.png"
              alt="DIMISIPEDIA Logo"
              width={40}
              height={40}
              className="size-10 object-contain drop-shadow-sm"
            />
            <div>
              <p className="label-mono">Platform State · Network Standby</p>
              <h1 className="font-serif text-3xl font-medium sm:text-4xl">Offline Archive Mode</h1>
            </div>
          </div>

          <div>
            {isOnline ? (
              <span className="inline-flex items-center gap-2 border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <Wifi className="size-3.5" />
                <span>Connection Restored</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs font-medium text-amber-600 dark:text-amber-400">
                <WifiOff className="size-3.5" />
                <span>No Network Connection</span>
              </span>
            )}
          </div>
        </div>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Your device or local network lost connection to the Internet. DIMISIPEDIA has
          automatically shifted into offline standby mode. While your connection is being restored,
          you can enjoy the official DIMISIPEDIA Dinosaur Runner arcade below!
        </p>

        {reconnectSuccess ? (
          <div className="mt-4 flex items-center justify-between border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
            <span className="font-medium">Internet detected! You can return to browsing now.</span>
            <button
              onClick={() => (window.location.href = "/")}
              className="border border-emerald-600 bg-emerald-600 px-3 py-1 font-mono text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Reload Page
            </button>
          </div>
        ) : null}
      </header>

      {/* Dinosaur Run Game Section */}
      <section className="mt-8 border border-border bg-surface p-4 sm:p-6 shadow-sm">
        <DinoGame />
      </section>

      {/* Actions & Diagnostic Details */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-border bg-surface p-5">
          <h2 className="font-serif text-lg font-medium">Network Reconnection</h2>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            If your Wi-Fi, optical fiber, or mobile cellular data has resumed, click below to verify
            live connection with the DIMISIPEDIA servers.
          </p>

          <button
            type="button"
            onClick={handleCheckConnection}
            disabled={isChecking}
            className="mt-4 inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2 font-mono text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`size-3.5 ${isChecking ? "animate-spin" : ""}`} />
            <span>{isChecking ? "Testing connection..." : "Check Connection & Reload"}</span>
          </button>
        </div>

        <div className="border border-border bg-surface p-5">
          <h2 className="font-serif text-lg font-medium">Quick Navigation</h2>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Previously visited encyclopedia pages may still reside in your local browser cache:
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 font-mono text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
            >
              <Home className="size-3" />
              <span>Home</span>
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 font-mono text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
            >
              <Compass className="size-3" />
              <span>Explore</span>
            </Link>
            <Link
              to="/people"
              className="inline-flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 font-mono text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
            >
              <BookOpen className="size-3" />
              <span>People</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
