import { createFileRoute } from "@tanstack/react-router";
import { entities, relationsFor } from "@/data/knowledge";
import { abs, buildEntitySchema, entityId, pageHead } from "@/lib/seo";

/**
 * Internal SEO/structured-data diagnostic. Noindex and disallowed in
 * robots.txt; it exposes no private data, only what is already public.
 */
export const Route = createFileRoute("/seo-audit")({
  head: () =>
    pageHead({
      title: "SEO diagnostics | DIMISIPEDIA",
      description: "Internal entity, metadata and structured-data diagnostics.",
      path: "/seo-audit",
      noindex: true,
    }),
  component: AuditPage,
});

interface Row {
  name: string;
  path: string;
  issues: string[];
}

function audit(): { rows: Row[]; duplicates: string[] } {
  const seen = new Map<string, number>();
  const rows = entities.map((e) => {
    seen.set(e.path, (seen.get(e.path) ?? 0) + 1);
    const issues: string[] = [];
    if (!e.seoTitle) issues.push("missing title");
    if (!e.seoDescription) issues.push("missing meta description");
    if (e.seoTitle && e.seoTitle.length > 65) issues.push("title over 65 chars");
    if (e.seoDescription && e.seoDescription.length > 165) issues.push("description over 165 chars");
    if (!e.shortDescription) issues.push("missing summary");
    if (!e.answer) issues.push("missing answer-first statement");
    if (!e.sections.length) issues.push("no body sections");
    if (!e.sourceIds.length) issues.push("no sources");
    if (!relationsFor(e.id).length) issues.push("no entity relationships");
    if (!e.updatedAt) issues.push("missing dateModified");
    try {
      JSON.parse(JSON.stringify(buildEntitySchema(e)));
    } catch {
      issues.push("invalid JSON-LD");
    }
    return { name: e.name, path: e.path, issues };
  });
  const duplicates = [...seen.entries()].filter(([, n]) => n > 1).map(([p]) => p);
  return { rows, duplicates };
}

function AuditPage() {
  const { rows, duplicates } = audit();
  const failing = rows.filter((r) => r.issues.length);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="text-3xl">SEO diagnostics</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {entities.length} entities · {failing.length} with warnings ·{" "}
        {duplicates.length} duplicate canonical paths
      </p>
      <ul className="mt-8 divide-y divide-rule border border-border bg-surface">
        {rows.map((r) => (
          <li key={r.path} className="px-4 py-3 text-sm">
            <p className="font-medium">
              {r.name}{" "}
              <span className="text-muted-foreground">{abs(r.path)}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              @id {entityId(entities.find((e) => e.path === r.path)!)}
            </p>
            <p className="mt-1 text-xs">
              {r.issues.length ? (
                <span className="text-destructive">{r.issues.join(" · ")}</span>
              ) : (
                <span className="text-muted-foreground">No warnings</span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
