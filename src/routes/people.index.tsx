import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { StatusChip } from "@/components/StatusChip";
import { peopleEntities, relationsFor } from "@/data/knowledge";
import { assessClaim } from "@/data/evidence";
import { indexHead } from "@/lib/seo";

export const Route = createFileRoute("/people/")({
  head: () =>
    indexHead({
      title: "People of DIMISI Technologies — Directory | DIMISIPEDIA",
      description:
        "Directory of people documented in DIMISIPEDIA: the founders, directors and team members of DIMISI Technologies Pvt. Ltd., each with recorded roles, sources and verification status.",
      path: "/people",
      listName: "People documented by DIMISIPEDIA",
      items: peopleEntities,
      trail: [{ label: "DIMISIPEDIA", to: "/" }, { label: "People" }],
    }),
  component: PeopleIndex,
});

const sorted = [...peopleEntities].sort((a, b) => a.name.localeCompare(b.name));

function primaryRole(slug: string): string {
  const person = peopleEntities.find((p) => p.slug === slug);
  if (!person) return "";
  if (person.roles && person.roles.length > 0) return person.roles.map((r) => r.title).join(", ");
  const fact = person.facts.find((f) => f.label.toLowerCase() === "role");
  return fact?.value ?? "";
}

function organizationFor(id: string) {
  return relationsFor(id).find((r) => r.entity.entityType === "organization")?.entity;
}

function PeopleIndex() {
  const [q, setQ] = useState("");
  const [letter, setLetter] = useState("All");

  const letters = useMemo(
    () => ["All", ...Array.from(new Set(sorted.map((p) => p.name[0]!.toUpperCase()))).sort()],
    [],
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return sorted.filter((p) => {
      const matchesLetter = letter === "All" || p.name.toUpperCase().startsWith(letter);
      const hay =
        `${p.name} ${p.subtitle} ${p.shortDescription} ${primaryRole(p.slug)} ${p.aliases?.join(" ") ?? ""}`.toLowerCase();
      return matchesLetter && (!query || hay.includes(query));
    });
  }, [q, letter]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "People" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <p className="label-mono">Entity index · Person</p>
        <h1 className="mt-2 text-4xl">People</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Individuals documented in association with DIMISI Technologies Pvt. Ltd. Roles are
          recorded from sources held in the DIMISIPEDIA registry, and each entry states the
          verification status of the evidence behind it. Biographical detail is published only when
          it is supplied and supported.
        </p>
      </header>

      {/* Featured Founding Leadership Trio Showcase */}
      <section className="mt-10 overflow-hidden border border-border bg-surface">
        <div className="grid lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="label-mono uppercase text-primary border border-primary/40 px-2.5 py-0.5 text-[10px]">
                  Founding Directors
                </span>
                <span className="label-mono text-xs">DI · MI · SI</span>
              </div>
              <h2 className="mt-4 font-serif text-3xl font-medium">The Founding Leadership</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                DIMISI Technologies was founded by <strong>Shikhar Dixit</strong> (Founder &amp;
                CEO), <strong>Nishkarsh Mishra</strong> (Co-Founder &amp; COO/CMO), and{" "}
                <strong>Swatantra Singh</strong> (Co-Founder &amp; CTO). The company name reflects
                the syllables of their surnames.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-rule pt-4">
                <EntityLink to="/people/shikhar-dixit" className="group">
                  <p className="font-serif text-sm font-medium group-hover:text-primary transition-colors">
                    Shikhar Dixit
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    Founder &amp; CEO (DI)
                  </p>
                </EntityLink>
                <EntityLink to="/people/nishkarsh-mishra" className="group">
                  <p className="font-serif text-sm font-medium group-hover:text-primary transition-colors">
                    Nishkarsh Mishra
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    Co-Founder &amp; COO (MI)
                  </p>
                </EntityLink>
                <EntityLink to="/people/swatantra-singh" className="group">
                  <p className="font-serif text-sm font-medium group-hover:text-primary transition-colors">
                    Swatantra Singh
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    Co-Founder &amp; CTO (SI)
                  </p>
                </EntityLink>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rule flex items-center justify-between">
              <Link
                to="/journey"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline"
              >
                <span>Read the Founder's Chronicle</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center bg-black/40 border-t lg:border-t-0 lg:border-l border-rule overflow-hidden">
            <img
              src="/images/Shikhar Nish Swat.jpeg"
              alt="Founding Directors of DIMISI Technologies — Swatantra Singh, Shikhar Dixit, and Nishkarsh Mishra"
              className="w-full max-h-[380px] object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* First Mentor Spotlight Showcase */}
      <section className="mt-6 border border-primary/40 bg-surface p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-serif text-xl sm:text-2xl font-bold text-primary">
              JP
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="label-mono uppercase text-primary border border-primary/40 px-2 py-0.5 text-[10px] font-semibold">
                  DIMISIPEDIA • FIRST MENTOR
                </span>
                <span className="label-mono text-xs">Also known as: Jayant Sir</span>
              </div>
              <h2 className="mt-2 font-serif text-2xl font-medium">Jayendra Pratap Singh (JP)</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                First Mentor — DIMISI Technologies Private Limited · National Mentor, Startup India (50+ Startups) · DPIIT Platinum Badge
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                14 years of cross-sector experience across Manufacturing, Telecom, IT, Services, and Education. An IIM Ranchi alumnus (HR) and Electronics &amp; Communications Engineer guiding DIMISI&apos;s people development, leadership capability, and organizational readiness.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <EntityLink
              to="/people/jayendra-pratap-singh"
              className="inline-flex items-center gap-1.5 border border-primary bg-primary px-4 py-2 font-mono text-xs text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <span>View Mentor Profile</span>
              <ArrowRight className="size-3.5" />
            </EntityLink>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {letters.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLetter(l)}
              aria-pressed={letter === l}
              className={`border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                letter === l
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div>
          <label className="sr-only" htmlFor="people-search">
            Search people
          </label>
          <input
            id="people-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search people"
            className="w-56 border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">No documented person matches that.</p>
      ) : (
        <ul className="mt-6 grid gap-px border border-border bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const org = organizationFor(p.id);
            const assessment = assessClaim({ sourceIds: p.sourceIds });
            return (
              <li key={p.id}>
                <EntityLink
                  to={p.path}
                  className="flex h-full flex-col bg-surface px-5 py-6 transition-colors hover:bg-muted"
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`Portrait of ${p.name}`}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="mb-4 size-16 border border-rule object-cover"
                    />
                  ) : (
                    <span className="mb-4 flex size-16 items-center justify-center border border-rule font-serif text-xl text-primary font-bold bg-primary/10">
                      {p.id === "jayendra-pratap-singh"
                        ? "JP"
                        : p.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </span>
                  )}
                  <span className="label-mono">Person</span>
                  <span className="mt-1 block font-serif text-xl">{p.name}</span>
                  <span className="mt-1 block text-sm">{primaryRole(p.slug)}</span>
                  {org ? (
                    <span className="mt-0.5 block text-xs text-muted-foreground">{org.name}</span>
                  ) : null}
                  <span className="mt-3 block text-sm text-muted-foreground">
                    {p.shortDescription}
                  </span>
                  <span className="mt-4 block">
                    <StatusChip status={assessment.status} />
                  </span>
                </EntityLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
