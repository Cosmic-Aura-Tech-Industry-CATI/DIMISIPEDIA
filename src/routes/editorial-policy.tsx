import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";

export const Route = createFileRoute("/editorial-policy")({
  head: () =>
    pageHead({
      title: "Editorial Policy | DIMISIPEDIA",
      description:
        "How DIMISIPEDIA pages are created, verified, corrected and archived, how sources are evaluated, and how revisions are tracked.",
      path: "/editorial-policy",
      schema: [
        buildBreadcrumbSchema(
          [{ label: "DIMISIPEDIA", to: "/" }, { label: "Editorial Policy" }],
          "/editorial-policy",
        ),
      ],
    }),
  component: EditorialPolicy,
});

const sections = [
  {
    h: "How pages are created",
    p: "A page is created only when a subject can be described from documented information. Each page begins as a draft, moves to review, and is published once an authorised editor confirms that every statement is either sourced or explicitly labelled as awaiting verification.",
  },
  {
    h: "How information is verified",
    p: "Verification means an editor has compared a claim against a primary record — an official DIMISI document, a registry record, or a published announcement. A claim repeated across informal channels is not treated as verified.",
  },
  {
    h: "How corrections are handled",
    p: "Corrections are applied to the live entry and recorded in its revision history with the date and the nature of the change. Corrections are never made silently.",
  },
  {
    h: "How sources are evaluated",
    p: "Sources are recorded with a title, publisher, type, date where known, and the specific claim they support. Official DIMISI channels are labelled as first-party. Independent coverage is labelled as such. No source is ever invented or approximated.",
  },
  {
    h: "How conflicts are handled",
    p: "Where two sources disagree, the entry states the disagreement rather than choosing silently. The claim is marked as needing verification until an authoritative record resolves it.",
  },
  {
    h: "How outdated information is archived",
    p: "Information that was accurate at a point in time is relabelled as historical and retained. It is not deleted, because the record of what was true matters as much as what is true now.",
  },
  {
    h: "How revisions are tracked",
    p: "Every entity carries a numbered revision history showing the editor, the date and the change. The history is public and appears at the foot of each entry.",
  },
  {
    h: "Conflict of interest",
    p: "DIMISIPEDIA is operated by DIMISI Technologies and documents DIMISI Technologies. This relationship is stated on every relevant page and is the reason the status labelling system exists.",
  },
];

function EditorialPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Editorial Policy" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Governance</p>
        <h1 className="mt-2 text-4xl">Editorial Policy</h1>
        <p className="mt-4 text-muted-foreground">
          The rules that determine what DIMISIPEDIA publishes and how it changes.
        </p>
      </header>
      <div className="prose-editorial mt-8">
        {sections.map((s) => (
          <section key={s.h} className="border-b border-rule pb-6 pt-4 last:border-0">
            <h2 className="text-2xl">{s.h}</h2>
            <p>{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
