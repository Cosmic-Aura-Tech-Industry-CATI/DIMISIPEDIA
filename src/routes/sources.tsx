import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { StatusChip } from "@/components/StatusChip";
import { tierOf, tierProfiles, type SourceTier } from "@/data/evidence";
import { entities, getEntity, sources, type Source } from "@/data/knowledge";
import { EXTERNAL_REL_UNTRUSTED, safeExternalHref } from "@/lib/url-safety";

const trail = [{ label: "DIMISIPEDIA", to: "/" }, { label: "Sources" }];

export const Route = createFileRoute("/sources")({
  head: () =>
    pageHead({
      title: "Source registry — the evidence behind DIMISIPEDIA",
      description:
        "The DIMISIPEDIA source registry: every recorded source with its tier, authority level, the claims it supports and the entities it covers.",
      path: "/sources",
      schema: [buildBreadcrumbSchema(trail, "/sources")],
    }),
  component: SourcesPage,
});

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`Authority ${n} of 5`} className="font-mono text-xs tracking-[0.15em]">
      {"★".repeat(n)}
      <span className="text-muted-foreground">{"☆".repeat(5 - n)}</span>
    </span>
  );
}

/** Claims recorded anywhere in the archive that cite this source. */
function claimsCiting(sourceId: string) {
  const out: { entityName: string; entityPath: string; claim: string }[] = [];
  for (const e of entities) {
    for (const c of e.claims ?? []) {
      if (c.sourceIds.includes(sourceId)) {
        out.push({ entityName: e.name, entityPath: e.path, claim: c.claim });
      }
    }
    for (const r of e.roles ?? []) {
      if ((r.sourceIds ?? []).includes(sourceId)) {
        out.push({
          entityName: e.name,
          entityPath: e.path,
          claim: `${r.title}, ${r.organization}`,
        });
      }
    }
  }
  return out;
}

function SourceCard({ source, index }: { source: Source; index: number }) {
  const profile = tierOf(source);
  const used = claimsCiting(source.id);

  return (
    <li id={`source-${source.id}`} className="scroll-mt-24 py-7">
      <p className="label-mono">
        [{index}] {source.type}
      </p>
      <h3 className="mt-2 text-xl">
        {safeExternalHref(source.url) ? (
          <a
            href={safeExternalHref(source.url)!}
            target="_blank"
            rel={EXTERNAL_REL_UNTRUSTED}
            className="inline-flex items-center gap-1.5 underline underline-offset-4"
          >
            {source.title}
            <ArrowUpRight className="size-3.5 text-muted-foreground" aria-hidden />
          </a>
        ) : (
          source.title
        )}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{source.publisher}</p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="label-mono">
          Tier {profile.tier} · {profile.label}
        </span>
        <Stars n={profile.authority} />
        <StatusChip status={source.status} />
        <span className="label-mono">Added {source.addedAt}</span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="label-mono">Used to verify</p>
          {used.length === 0 ? (
            <p className="mt-1.5 text-sm text-muted-foreground">
              Recorded as background; no individual claim currently rests on it.
            </p>
          ) : (
            <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
              {used.slice(0, 6).map((u, i) => (
                <li key={`${u.entityPath}-${i}`}>
                  · {u.claim}{" "}
                  <Link to={u.entityPath} className="text-primary underline underline-offset-4">
                    {u.entityName}
                  </Link>
                </li>
              ))}
              {used.length > 6 ? (
                <li className="text-xs">+ {used.length - 6} further claims</li>
              ) : null}
            </ul>
          )}
        </div>
        <div>
          <p className="label-mono">Entities supported</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {source.relatedEntities.map((id) => {
              const e = getEntity(id);
              if (!e) return null;
              return (
                <EntityLink
                  key={id}
                  to={e.path}
                  className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {e.name}
                </EntityLink>
              );
            })}
          </div>
          <p className="mt-3 label-mono">What this source establishes</p>
          <p className="mt-1.5 text-sm text-muted-foreground">{source.claim}</p>
        </div>
      </div>
    </li>
  );
}

function SourcesPage() {
  const order: SourceTier[] = ["A", "B", "C", "D"];
  const grouped = order
    .map((tier) => ({
      profile: tierProfiles[tier],
      items: sources.filter((s) => tierOf(s).tier === tier),
    }))
    .filter((g) => g.items.length > 0);

  let counter = 0;

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumbs trail={trail} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Source registry · {sources.length} records</p>
        <h1 className="mt-2 text-4xl">Sources</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every claim in DIMISIPEDIA traces to a record here. Sources are grouped by authority
          tier, and a source counts towards a claim only where it actually supports that claim.
          Where no source exists, the related information is published as unverified rather than
          quietly asserted.
        </p>
        <p className="mt-4 text-sm">
          <Link to="/methodology" className="text-primary underline underline-offset-4">
            How we verify information →
          </Link>
        </p>
      </header>

      {grouped.map((g) => (
        <section key={g.profile.tier} id={`tier-${g.profile.tier}`} className="mt-12 scroll-mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-3">
            <h2 className="text-2xl">
              Tier {g.profile.tier} — {g.profile.label}
            </h2>
            <Stars n={g.profile.authority} />
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{g.profile.description}</p>
          <ol className="mt-2 divide-y divide-rule">
            {g.items.map((s) => {
              counter += 1;
              return <SourceCard key={s.id} source={s} index={counter} />;
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
