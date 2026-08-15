import { statusLabel, type InfoStatus } from "@/data/knowledge";
import { cn } from "@/lib/utils";

const tone: Record<string, string> = {
  verified: "text-verified border-verified/35 bg-verified/8",
  official: "text-sourced border-sourced/35 bg-sourced/8",
  "source-backed": "text-sourced border-sourced/35 bg-sourced/8",
  documented: "text-foreground/75 border-rule bg-muted",
  "needs-verification": "text-pending border-pending/40 bg-pending/8",
  disputed: "text-destructive border-destructive/40 bg-destructive/8",
  unverified: "text-muted-foreground border-rule bg-muted",
  historical: "text-archive border-rule bg-muted",
  archived: "text-archive border-rule bg-muted",
};

/**
 * Statuses that describe the ABSENCE of evidence. These stay in the data model
 * (and remain visible in editorial/documentation contexts via `docs`), but are
 * never surfaced as negative labels on public entity pages.
 */
const nonPublicStatuses = new Set([
  "needs-verification",
  "unverified",
  "not-yet-verified",
  "requires-verification",
]);

/** True when this status may be rendered on a public page. */
export function isPublicStatus(status: InfoStatus | string): boolean {
  return !nonPublicStatuses.has(status);
}

export function StatusChip({
  status,
  className,
  docs = false,
}: {
  status: InfoStatus | string;
  className?: string;
  /** Documentation contexts (methodology, credibility scale) may show all states. */
  docs?: boolean;
}) {
  if (!docs && !isPublicStatus(status)) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]",
        tone[status] ?? tone['documented'],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" aria-hidden />
      {statusLabel[status] ?? status}
    </span>
  );
}
