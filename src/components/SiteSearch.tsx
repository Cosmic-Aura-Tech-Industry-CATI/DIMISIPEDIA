import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { searchKnowledge } from "@/data/knowledge";

export function SiteSearch({
  autoFocus = false,
  placeholder = "Search people, projects, technology, sources…",
}: {
  autoFocus?: boolean;
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  const results = useMemo(() => searchKnowledge(q), [q]);

  return (
    <div className="relative">
      <label htmlFor="dp-search" className="sr-only">
        Search DIMISIPEDIA
      </label>
      <div className="flex items-center gap-3 border border-border bg-surface px-4 py-3 transition-colors focus-within:border-primary">
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          id="dp-search"
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {q.trim() ? (
        <div className="mt-2 divide-y divide-rule border border-border bg-surface">
          {results.length === 0 ? (
            <p className="px-4 py-5 text-sm text-muted-foreground">
              DIMISIPEDIA does not currently have an entry matching “{q}”.
            </p>
          ) : (
            results.map((r) => (
              <Link
                key={r.path + r.name}
                to={r.path}
                className="block px-4 py-3 transition-colors hover:bg-muted"
                onClick={() => setQ("")}
              >
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-serif text-base">{r.name}</span>
                  <span className="label-mono">{r.type}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{r.description}</p>
              </Link>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

export function useKeyboardSearchShortcut(open: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);
}
