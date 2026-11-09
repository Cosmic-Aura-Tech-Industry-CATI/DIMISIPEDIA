import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { organizationEntity } from "@/data/knowledge";
import { indexHead } from "@/lib/seo";

const orgs = [organizationEntity];
const trail = [{ label: "DIMISIPEDIA", to: "/" }, { label: "Organizations" }];

export const Route = createFileRoute("/organizations/")({
  head: () =>
    indexHead({
      title: "Organizations — Directory | DIMISIPEDIA",
      description:
        "Organization entities documented in DIMISIPEDIA, beginning with DIMISI Technologies Pvt. Ltd. — incorporation record, leadership, projects and sources.",
      path: "/organizations",
      listName: "Organizations documented by DIMISIPEDIA",
      items: orgs,
      trail,
    }),
  component: OrganizationsIndex,
});

function OrganizationsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={trail} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Entity index · Organization</p>
        <h1 className="mt-2 text-4xl">Organizations</h1>
        <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground">
          Every organization entity in DIMISIPEDIA has one canonical page carrying its recorded
          identity, leadership, projects, technology and sources.
        </p>
      </header>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {orgs.map((o) => (
          <li key={o.id} className="border border-border bg-surface p-6 sm:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
              <span className="label-mono text-primary">Apex Corporate Entity</span>
              <span className="font-mono text-xs text-muted-foreground">
                CIN: U62013UP2026PTC246506
              </span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-medium">
              <EntityLink to={o.path} className="hover:text-primary">
                {o.name}
              </EntityLink>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{o.subtitle}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
              {o.shortDescription}
            </p>

            <div className="mt-6 grid gap-4 border-t border-rule pt-4 sm:grid-cols-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Executive Leadership
                </p>
                <p className="mt-1 font-serif text-sm font-medium">
                  Shikhar Dixit (Founder &amp; CEO)
                </p>
                <p className="text-xs text-muted-foreground">
                  Swatantra Singh (CTO) · Nishkarsh Mishra (COO)
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Headquarters
                </p>
                <p className="mt-1 font-serif text-sm font-medium">Kanpur, Uttar Pradesh, India</p>
                <p className="text-xs text-muted-foreground">Incorporated 9 April 2026</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Primary Operations
                </p>
                <p className="mt-1 font-serif text-sm font-medium">
                  Enterprise Software &amp; Digital Platforms
                </p>
                <p className="text-xs text-muted-foreground">
                  DIMISI-OPS · The Kalesh · DIMISIPEDIA
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
              <EntityLink
                to={o.path}
                className="inline-flex items-center gap-1.5 border border-primary bg-primary px-4 py-2 font-mono text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <span>View Complete Organization Dossier →</span>
              </EntityLink>
              <span className="font-mono text-xs text-muted-foreground">
                Last updated {o.updatedAt}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Corporate Divisions & Operating Units Section */}
      <section className="mt-12 border-t border-rule pt-10">
        <h2 className="font-serif text-2xl">Operating Divisions &amp; Enterprise Architecture</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          DIMISI Technologies structures its business operations into distinct technological and
          operational units:
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-border bg-surface p-4">
            <span className="font-mono text-xs font-semibold text-primary uppercase">
              Division 01
            </span>
            <h3 className="mt-1 font-serif text-lg font-medium">Enterprise Software</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Custom business automation, employee operations systems (DIMISI-OPS), and proprietary
              cloud architectures for corporate clients.
            </p>
          </div>
          <div className="border border-border bg-surface p-4">
            <span className="font-mono text-xs font-semibold text-primary uppercase">
              Division 02
            </span>
            <h3 className="mt-1 font-serif text-lg font-medium">Consumer Platforms</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              High-concurrency social and community products including The Kalesh polling platform
              and KAAND news application.
            </p>
          </div>
          <div className="border border-border bg-surface p-4">
            <span className="font-mono text-xs font-semibold text-primary uppercase">
              Division 03
            </span>
            <h3 className="mt-1 font-serif text-lg font-medium">Interactive Labs</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Experimental games, rendering engines, and educational utilities represented by CATI
              Khelghar and interactive web experiments.
            </p>
          </div>
          <div className="border border-border bg-surface p-4">
            <span className="font-mono text-xs font-semibold text-primary uppercase">
              Division 04
            </span>
            <h3 className="mt-1 font-serif text-lg font-medium">Knowledge &amp; Standards</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              First-party corporate documentation, structured knowledge graphs, and open data
              endpoints maintained by DIMISIPEDIA.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
