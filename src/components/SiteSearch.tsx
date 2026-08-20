import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import { searchKnowledge, type SearchResult } from "@/data/knowledge";

export function SiteSearch({
  autoFocus = false,
  placeholder = "Search people, projects, technology, sources…",
}: {
  autoFocus?: boolean;
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const results = useMemo(() => searchKnowledge(q), [q]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [q]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0 && selectedIndex < results.length) {
      e.preventDefault();
      const target = results[selectedIndex];
      if (target) {
        setQ("");
        navigate({ to: target.path as unknown as "/" });
      }
    } else if (e.key === "Escape") {
      setQ("");
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative">
      <label htmlFor="dp-search" className="sr-only">
        Search DIMISIPEDIA
      </label>
      <div
        className="flex items-center gap-3 border border-border bg-surface px-4 py-3 transition-colors focus-within:border-primary"
        role="combobox"
        aria-expanded={Boolean(q.trim() && results.length > 0)}
        aria-haspopup="listbox"
        aria-owns="dp-search-results"
      >
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          ref={inputRef}
          id="dp-search"
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-autocomplete="list"
          aria-controls="dp-search-results"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {q.trim() ? (
        <div
          id="dp-search-results"
          role="listbox"
          className="mt-2 divide-y divide-rule border border-border bg-surface shadow-lg"
        >
          {results.length === 0 ? (
            <p className="px-4 py-5 text-sm text-muted-foreground">
              DIMISIPEDIA does not currently have an entry matching “{q}”.
            </p>
          ) : (
            results.map((r, index) => (
              <Link
                key={r.path + r.name}
                to={r.path}
                id={`search-item-${index}`}
                role="option"
                aria-selected={selectedIndex === index}
                className={`block px-4 py-3 transition-colors ${
                  selectedIndex === index ? "bg-muted text-primary" : "hover:bg-muted"
                }`}
                onClick={() => setQ("")}
              >
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-serif text-base font-medium">{r.name}</span>
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
