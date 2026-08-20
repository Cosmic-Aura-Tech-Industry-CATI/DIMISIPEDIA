import { useState } from "react";
import { Quote, Check, Copy } from "lucide-react";
import { type Entity } from "@/data/knowledge";
import { SITE_URL, abs } from "@/lib/seo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CiteModalProps {
  entity: Entity;
}

type Format = "wikipedia" | "apa" | "bibtex" | "chicago" | "mla";

export function CiteModal({ entity }: CiteModalProps) {
  const [format, setFormat] = useState<Format>("wikipedia");
  const [copied, setCopied] = useState(false);

  const today = new Date().toISOString().split("T")[0]!;
  const canonicalUrl = abs(entity.path);
  const cleanTitle = `${entity.name} — ${entity.subtitle || entity.shortDescription}`;

  const citations: Record<Format, { label: string; text: string }> = {
    wikipedia: {
      label: "Wikipedia Template",
      text: `{{cite web |url=${canonicalUrl} |title=${cleanTitle} |website=DIMISIPEDIA — Knowledge Base of DIMISI Technologies |access-date=${today}}}`,
    },
    apa: {
      label: "APA 7th Edition",
      text: `DIMISIPEDIA Editorial. (${today.split("-")[0]}). ${entity.name}: ${entity.subtitle || entity.shortDescription}. DIMISIPEDIA. Retrieved ${today}, from ${canonicalUrl}`,
    },
    bibtex: {
      label: "BibTeX",
      text: `@misc{dimisipedia_${entity.slug.replace(/[^a-zA-Z0-9]/g, "_")},
  author = {{DIMISIPEDIA Editorial}},
  title = {${entity.name} --- ${entity.subtitle || entity.shortDescription}},
  year = {${today.split("-")[0]}},
  url = {${canonicalUrl}},
  note = {Accessed: ${today}}
}`,
    },
    chicago: {
      label: "Chicago (17th ed.)",
      text: `DIMISIPEDIA. "${cleanTitle}." Accessed ${today}. ${canonicalUrl}.`,
    },
    mla: {
      label: "MLA 9th Edition",
      text: `"${cleanTitle}." DIMISIPEDIA, DIMISI Technologies Pvt. Ltd., ${canonicalUrl}. Accessed ${today}.`,
    },
  };

  const currentCitation = citations[format];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCitation.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 border border-border bg-surface px-3 py-1.5 text-xs font-mono text-muted-foreground transition-colors hover:border-primary hover:text-foreground cursor-pointer"
          title="Cite this entity profile in Wikipedia, academic papers, or publications"
        >
          <Quote className="size-3.5" />
          <span>Cite this entry</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl border-border bg-background sm:rounded-none">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Cite this DIMISIPEDIA Entry</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Copy citation code formatted for Wikipedia, research papers, or media references.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-wrap gap-1.5 border-b border-rule pb-3">
          {(Object.keys(citations) as Format[]).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFormat(f);
                setCopied(false);
              }}
              className={`px-3 py-1 text-xs font-mono transition-colors cursor-pointer ${
                format === f
                  ? "bg-primary text-primary-foreground font-medium"
                  : "border border-border bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              {citations[f].label}
            </button>
          ))}
        </div>

        <div className="mt-3 relative">
          <pre className="overflow-x-auto border border-rule bg-surface p-4 font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed">
            {currentCitation.text}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 inline-flex items-center gap-1 bg-background border border-border px-2.5 py-1 text-xs font-mono text-foreground shadow-sm transition-colors hover:bg-muted cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="size-3 text-primary" />
                <span className="text-primary font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 border-t border-rule pt-3 text-[11px] text-muted-foreground">
          <p>
            Canonical Source URI: <span className="font-mono text-foreground">{canonicalUrl}</span>
          </p>
          <p className="mt-0.5">
            Maintained by DIMISI Technologies Pvt. Ltd. · Verification Tier A/B Source Backed.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
