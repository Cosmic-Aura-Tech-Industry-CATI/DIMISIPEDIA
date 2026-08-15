import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";
import { StatusChip } from "@/components/StatusChip";
import { tierProfiles, verificationScale } from "@/data/evidence";
import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";

const trail = [{ label: "DIMISIPEDIA", to: "/" }, { label: "Methodology" }];

const principles = [
  {
    n: 1,
    title: "Primary sources first",
    body: "Government records, statutory filings and official institutional records receive the highest priority. A claim is only marked verified when a primary or comparably authoritative record supports that specific claim.",
  },
  {
    n: 2,
    title: "First-party information is labeled",
    body: "Information published by a person or organisation about itself is recorded as first-party. First-party material is reliable for self-description, but it is not independent verification and is never presented as such.",
  },
  {
    n: 3,
    title: "Independent corroboration increases confidence",
    body: "Claims of consequence are preferably supported by more than one credible source, at least one of which is not controlled by the entity being described.",
  },
  {
    n: 4,
    title: "Conflicting evidence is disclosed",
    body: "Where credible sources disagree, the claim is marked disputed and both readings remain visible. DIMISIPEDIA does not silently choose a preferred source.",
  },
  {
    n: 5,
    title: "Unsupported claims carry no badge in public view",
    body: "A claim with no recorded source is held internally as unverified, but public entity pages never display a negative label. Instead, the claim simply carries no verification badge — and where a section has no evidence at all, that section is omitted rather than asserted. The absence-of-evidence states remain visible here and on the credibility scale.",
  },

  {
    n: 6,
    title: "Sources are dated",
    body: "Every source records when it was added and, where applicable, when it was last reviewed. Verification is a dated act, not a permanent property.",
  },
  {
    n: 7,
    title: "Claims are verified, not people",
    body: "No person, organisation or project is marked verified as a whole. Verification attaches to individual claims — a role, a date, an association — each with its own evidence.",
  },
  {
    n: 8,
    title: "A URL is not evidence",
    body: "A source counts only where it actually supports the specific claim it is attached to. A citation that does not address the claim is not recorded against it.",
  },
];

export const Route = createFileRoute("/methodology")({
  head: () =>
    pageHead({
      title: "How DIMISIPEDIA verifies information — Methodology",
      description:
        "The verification method behind DIMISIPEDIA: five evidence states, a four-tier source hierarchy, claim-level review, dated sourcing and what is shown publicly.",

      path: "/methodology",
      schema: [buildBreadcrumbSchema(trail, "/methodology")],
    }),
  component: MethodologyPage,
});

function MethodologyPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumbs trail={trail} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Editorial method</p>
        <h1 className="mt-2 text-4xl">How we verify information</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          DIMISIPEDIA does not publish a verified badge for a person. It records claims, attaches
          evidence to each claim, classifies that evidence by authority and independence, and
          derives the published status from what the sources actually support.
        </p>
      </header>

      <section id="states" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl">Evidence states</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every claim carries exactly one of these five states.
        </p>
        <dl className="mt-5 divide-y divide-rule border-y border-rule">
          {verificationScale.map((v) => (
            <div key={v.status} className="grid gap-2 py-4 sm:grid-cols-[12rem_1fr] sm:items-start">
              <dt>
                <StatusChip status={v.status} docs />
              </dt>
              <dd className="text-[15px] text-muted-foreground">{v.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="tiers" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl">Source hierarchy</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Each source is classified by tier. Tier determines how much weight the source can carry
          for a claim; it is applied consistently across the archive.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">DIMISIPEDIA source authority tiers</caption>
            <thead>
              <tr className="border-y border-rule">
                <th scope="col" className="py-3 pr-4 label-mono font-normal">Tier</th>
                <th scope="col" className="py-3 pr-4 label-mono font-normal">Character</th>
                <th scope="col" className="py-3 pr-4 label-mono font-normal">Authority</th>
                <th scope="col" className="py-3 label-mono font-normal">Examples</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(tierProfiles).map((t) => (
                <tr key={t.tier} className="border-b border-rule align-top">
                  <th scope="row" className="py-3 pr-4 font-normal">Tier {t.tier}</th>
                  <td className="py-3 pr-4">{t.label}</td>
                  <td className="py-3 pr-4 font-mono text-xs">{t.authority}/5</td>
                  <td className="py-3 text-muted-foreground">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="principles" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl">Verification principles</h2>
        <ol className="prose-editorial mt-5 divide-y divide-rule border-y border-rule">
          {principles.map((p) => (
            <li key={p.n} className="list-none py-5">
              <p className="label-mono">Principle {p.n}</p>
              <h3 className="mt-1 text-xl">{p.title}</h3>
              <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="derivation" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl">How a status is derived</h2>
        <div className="prose-editorial mt-3">
          <p>
            A claim's badge is computed from its recorded evidence. A Tier A record that has itself
            been checked, or a Tier A record corroborated by an independent Tier C source, produces{" "}
            <em>verified</em>. Independent or first-party evidence without primary confirmation
            produces <em>source-backed</em>. Evidence that does not carry the claim produces{" "}
            <em>needs verification</em>, no evidence produces <em>unverified</em>, and conflicting
            evidence produces <em>disputed</em>.
          </p>
          <p>
            Editorial judgement can lower a published status below what the evidence would allow,
            but it can never raise it. Internal authority scores are not emitted as structured
            data; the page's structured data describes only what is visible on the page.
          </p>
        </div>
      </section>

      <section id="public-display" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl">What appears on a public page</h2>
        <div className="prose-editorial mt-3">
          <p>
            The evidence model above runs on every claim, but public entity pages show only the
            positive end of the scale. A claim supported by a source displays{" "}
            <em>source-backed</em> or <em>verified</em>; a claim that is disputed says so. Claims
            held internally as <em>needs verification</em> or <em>unverified</em> display no badge
            at all, and sections with no recorded evidence — including references — are omitted
            from the page rather than shown empty.
          </p>
          <p>
            Every visible badge is interactive. Selecting it opens the evidence panel for that
            claim, listing each recorded source with its tier, its independence, the date it was
            added and the reason the status was derived. The complete five-state scale and the
            tier table stay available here and on the credibility page, so nothing is removed from
            the record — only negative labelling is kept out of the article surface.
          </p>
        </div>
      </section>

    </div>
  );
}
