import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { StatusChip } from "./StatusChip";
import { assessClaim } from "@/data/evidence";
import { statusLabel, type InfoStatus } from "@/data/knowledge";
import { EXTERNAL_REL_UNTRUSTED, safeExternalHref } from "@/lib/url-safety";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`Authority ${n} of 5`} className="font-mono text-xs tracking-[0.15em]">
      {"★".repeat(n)}
      <span className="text-muted-foreground">{"☆".repeat(5 - n)}</span>
    </span>
  );
}

/**
 * A verification badge that opens the evidence behind a single claim.
 * The badge is generated from recorded sources — it is never a decorative label.
 */
export function VerificationBadge({
  claim,
  sourceIds,
  declared,
  disputed,
  lastReviewed,
  className,
}: {
  claim: string;
  sourceIds?: string[];
  declared?: InfoStatus;
  disputed?: boolean;
  lastReviewed?: string;
  className?: string;
}) {
  const a = assessClaim({
    ...(sourceIds ? { sourceIds } : {}),
    ...(declared ? { declared } : {}),
    ...(disputed ? { disputed } : {}),
  });

  // Public policy: a claim with no recorded source shows no badge at all —
  // never a negative label. The underlying assessment data is untouched.
  if (a.evidence.length === 0) return null;

  // With evidence present, the public badge is "source-backed" unless the
  // evidence genuinely supports a stronger or conflicting state.
  const publicStatus: InfoStatus =
    a.status === "verified" || a.status === "disputed" ? a.status : "source-backed";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`${statusLabel[publicStatus] ?? publicStatus} — show evidence for: ${claim}`}
          className={className}
        >
          <StatusChip
            status={publicStatus}
            className="cursor-pointer transition-opacity hover:opacity-80"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-none border-border bg-background sm:max-w-lg">
        <DialogHeader>
          <p className="label-mono">Sources</p>
          <DialogTitle className="font-serif text-xl leading-snug">{claim}</DialogTitle>
          <DialogDescription className="sr-only">
            Sources recorded against this claim.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-2 border-y border-rule py-3">
          <StatusChip status={publicStatus} />
          <span className="label-mono">
            {a.evidence.length} {a.evidence.length === 1 ? "source" : "sources"} recorded
          </span>
        </div>
        {publicStatus === "verified" || publicStatus === "disputed" ? (
          <p className="text-sm text-muted-foreground">{a.rationale}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            One or more sources are attached to this claim. DIMISIPEDIA lists them below so readers
            can assess the evidence directly.
          </p>
        )}

        <div>
          <p className="label-mono">Evidence</p>
          {
            <ol className="mt-3 divide-y divide-rule border-y border-rule">
              {a.evidence.map((e, i) => (
                <li key={e.source.id} className="py-3">
                  <p className="text-sm">
                    <span className="font-mono text-xs text-muted-foreground">{i + 1}.</span>{" "}
                    {e.source.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{e.source.publisher}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="label-mono">
                      Tier {e.profile.tier} · {e.profile.label}
                    </span>
                    <Stars n={e.profile.authority} />
                    <StatusChip status={e.source.status} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="uppercase tracking-[0.1em]">Supports: </span>
                    {e.source.claim}
                  </p>
                  {safeExternalHref(e.source.url) ? (
                    <a
                      href={safeExternalHref(e.source.url)!}
                      target="_blank"
                      rel={EXTERNAL_REL_UNTRUSTED}
                      className="mt-2 inline-flex items-center gap-1 text-xs text-primary underline underline-offset-4"
                    >
                      View source
                      <ArrowUpRight className="size-3" aria-hidden />
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
          }
        </div>

        <dl className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="label-mono">Primary sources</dt>
            <dd className="mt-1">{a.primaryCount}</dd>
          </div>
          <div>
            <dt className="label-mono">First-party sources</dt>
            <dd className="mt-1">{a.firstPartyCount}</dd>
          </div>
          <div>
            <dt className="label-mono">Independent sources</dt>
            <dd className="mt-1">{a.independentCount}</dd>
          </div>
          <div>
            <dt className="label-mono">Last reviewed</dt>
            <dd className="mt-1">{lastReviewed ?? "Not recorded"}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-4 border-t border-rule pt-3 text-xs">
          <Link to="/methodology" className="text-primary underline underline-offset-4">
            How we verify information
          </Link>
          <Link to="/sources" className="text-primary underline underline-offset-4">
            Source registry
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
