import { Link } from "@tanstack/react-router";
import { Moon, Search, Sun, X, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { SiteSearch, useKeyboardSearchShortcut } from "./SiteSearch";

const nav = [
  { to: "/explore", label: "Explore" },
  { to: "/journey", label: "Journey" },
  { to: "/people", label: "People" },
  { to: "/organizations", label: "Organizations" },
  { to: "/projects", label: "Projects" },
  { to: "/technology", label: "Technology" },
  { to: "/timeline", label: "Timeline" },
  { to: "/events", label: "Events" },
  { to: "/articles", label: "Articles" },
];

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const getSystemTheme = () =>
      typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

    const stored = localStorage.getItem("dp-theme");
    const isDark = stored ? stored === "dark" : getSystemTheme();
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    // Listen to real-time OS/system theme changes if no manual override
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const currentStored = localStorage.getItem("dp-theme");
      if (!currentStored) {
        setDark(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("dp-theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light reading mode" : "Switch to dark archive mode"}
      className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground cursor-pointer"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useKeyboardSearchShortcut(() => setSearchOpen(true));

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background/92 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5">
          <img
            src="/images/dimisipedia-logo.png"
            alt="DIMISIPEDIA logo"
            width={28}
            height={28}
            className="size-7 object-contain drop-shadow-sm"
          />
          <span className="font-serif text-lg tracking-[0.02em] notranslate" translate="no">
            DIMISIPEDIA
          </span>
          <span className="ml-2 hidden text-[11px] text-muted-foreground sm:inline">
            Knowledge Encyclopedia
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-5 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-expanded={searchOpen}
            aria-label="Search DIMISIPEDIA"
            className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            {searchOpen ? <X className="size-4" /> : <Search className="size-4" />}
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open navigation"
            className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t border-rule bg-background">
          <div className="mx-auto max-w-3xl px-5 py-5">
            <SiteSearch autoFocus />
          </div>
        </div>
      ) : null}

      {menuOpen ? (
        <nav aria-label="Mobile" className="border-t border-rule bg-background lg:hidden">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 py-3">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src="/images/dimisipedia-logo.png"
              alt="DIMISIPEDIA logo"
              width={32}
              height={32}
              className="size-8 object-contain drop-shadow-sm"
            />
            <p className="font-serif text-lg notranslate" translate="no">
              DIMISIPEDIA
            </p>
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            The Knowledge Encyclopedia of{" "}
            <span className="notranslate font-medium text-foreground" translate="no">
              DIMISI Technologies
            </span>{" "}
            — documenting the organization, its people, projects, technology and history through
            source-backed information.
          </p>

          <div className="mt-6 flex flex-col gap-2">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Reading Language &amp; Translation
            </p>
            <div className="inline-block">
              <LanguageSelector />
            </div>
          </div>
        </div>
        <div>
          <p className="label-mono">Platform &amp; Evidence</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/journey" className="text-muted-foreground hover:text-foreground">
                Our Journey
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/sources" className="text-muted-foreground hover:text-foreground">
                Sources Registry
              </Link>
            </li>
            <li>
              <Link to="/methodology" className="text-muted-foreground hover:text-foreground">
                Verification Methodology
              </Link>
            </li>
            <li>
              <Link to="/editorial-policy" className="text-muted-foreground hover:text-foreground">
                Editorial Policy
              </Link>
            </li>
            <li>
              <Link to="/credibility" className="text-muted-foreground hover:text-foreground">
                Credibility Standards
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label-mono">Organization</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                to="/dimisi-technologies"
                className="text-muted-foreground hover:text-foreground notranslate"
                translate="no"
              >
                DIMISI Technologies
              </Link>
            </li>
            <li>
              <a
                href="https://dimisi.tech"
                rel="noreferrer noopener"
                target="_blank"
                className="text-muted-foreground hover:text-foreground notranslate"
                translate="no"
              >
                dimisi.tech
              </a>
            </li>
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="rule-t">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0 text-xs text-muted-foreground">
            Operated by{" "}
            <span className="notranslate" translate="no">
              DIMISI Technologies Pvt. Ltd.
            </span>{" "}
            · Kanpur, Uttar Pradesh, India
          </p>
          <a
            href="https://dimisi.tech"
            target="_blank"
            rel="noreferrer noopener"
            className="group flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
              Designed &amp; Developed By
            </span>
            <img
              src="/images/dimisi-horizontal.png"
              alt="DIMISI Technologies — dimisi.tech"
              width={148}
              height={38}
              className="h-6 w-auto shrink-0 object-contain opacity-90 transition-opacity group-hover:opacity-100 sm:h-7"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
