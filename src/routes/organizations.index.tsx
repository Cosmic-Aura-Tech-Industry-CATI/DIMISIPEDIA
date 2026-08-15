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

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {orgs.map((o) => (
          <li key={o.id} className="border border-border bg-surface p-5">
            <p className="label-mono">Organization</p>
            <h2 className="mt-2 font-serif text-2xl">
              <EntityLink to={o.path} className="hover:text-primary">
                {o.name}
              </EntityLink>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{o.subtitle}</p>
            <p className="mt-3 text-[15px]">{o.shortDescription}</p>
            <p className="mt-4 text-xs text-muted-foreground">Last updated {o.updatedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
