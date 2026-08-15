import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";
import { StatusChip } from "@/components/StatusChip";

export const Route = createFileRoute("/credibility")({
  head: () =>
    pageHead({
      title: "How DIMISIPEDIA Establishes Information",
      description: "How DIMISIPEDIA sources, labels and verifies information about DIMISI Technologies — and how it distinguishes documented, source-backed, historical and unverified claims.",
      path: "/credibility",
      schema: [
        buildBreadcrumbSchema(
          [{ label: "DIMISIPEDIA", to: "/" }, { label: "How DIMISIPEDIA Establishes Information" }],
          "/credibility",
        ),
      ],
    }),
  component: CredibilityPage,
});

const statuses = [
  { s: "verified", d: "Confirmed by an authorised DIMISI editor against a primary record." },
  { s: "official", d: "Published by DIMISI Technologies through an official channel." },
  { s: "source-backed", d: "Supported by a recorded source in the DIMISIPEDIA source database." },
  { s: "documented", d: "Supplied in DIMISI documentation but not yet independently confirmed." },
  { s: "needs-verification", d: "Recorded but awaiting confirmation. Not presented as fact." },
  { s: "historical", d: "Accurate at a stated point in time; superseded by later information." },
  { s: "archived", d: "Retained for the record and no longer current." },
];

function CredibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Credibility" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Transparency</p>
        <h1 className="mt-2 text-4xl">How DIMISIPEDIA Establishes Information</h1>
      </header>

      <div className="prose-editorial mt-8">
        <p>
          DIMISIPEDIA is a first-party publication operated by DIMISI Technologies Pvt. Ltd. That
          makes transparency about evidence more important, not less. Every entry states where its
          information came from and how far it has been confirmed.
        </p>
        <h2 className="mt-10 text-2xl">Where information comes from</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px]">
          <li>Official DIMISI materials and announcements</li>
          <li>Publicly available records</li>
          <li>Project documentation</li>
          <li>Published announcements</li>
          <li>External coverage, where it exists</li>
          <li>Verified contributions reviewed by an editor</li>
        </ul>

        <h2 className="mt-10 text-2xl">Information status labels</h2>
        <p>
          DIMISIPEDIA does not publish a credibility percentage. A decorative number would tell a
          reader nothing. Instead each claim carries a status, and each status has a defined meaning.
        </p>
      </div>

      <dl className="mt-6 divide-y divide-rule border-y border-rule">
        {statuses.map((x) => (
          <div key={x.s} className="grid gap-2 py-4 sm:grid-cols-[12rem_1fr] sm:items-center">
            <dt>
              <StatusChip status={x.s} docs />
            </dt>
            <dd className="text-sm text-muted-foreground">{x.d}</dd>
          </div>
        ))}
      </dl>

      <div className="prose-editorial mt-10">
        <h2 className="text-2xl">What DIMISIPEDIA will not do</h2>
        <p>
          DIMISIPEDIA does not display verification badges it has not earned, does not claim
          third-party endorsement it does not hold, and does not manufacture achievements, press
          coverage, awards, partnerships, funding, customers or statistics. Where evidence is
          absent, the entry says so.
        </p>
        <h2 className="mt-10 text-2xl">Last verified</h2>
        <p>
          Major entities display a “last verified” date. Only authorised editors may set it, and it
          is cleared whenever the underlying information changes materially.
        </p>
      </div>
    </div>
  );
}
