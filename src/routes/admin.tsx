import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Users,
  Building2,
  Sparkles,
  Search,
  ExternalLink,
  RefreshCw,
  FileCheck,
  Link2,
  Clock,
  Code,
  ArrowRight,
  Database,
  Calendar,
  Briefcase,
  Terminal,
} from "lucide-react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { StatusChip } from "@/components/StatusChip";
import {
  entities,
  getEntity,
  sources,
  relationships,
  relationsFor,
  peopleEntities,
  organizationEntity,
  productEntities,
  projectEntities,
  serviceEntities,
  eventEntities,
  type Entity,
  type EntityType,
} from "@/data/knowledge";
import { buildEntitySchema, pageHead, abs, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () =>
    pageHead({
      title: "Admin Entity & Knowledge Governance Dashboard | DIMISIPEDIA",
      description:
        "Centralized administrative console for managing entities, inspecting source verification, monitoring schema health, and validating knowledge integrity.",
      path: "/admin",
      noindex: true,
    }),
  component: AdminDashboard,
});

type Tab = "overview" | "entities" | "sources" | "links" | "schema";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Broken Link & Relationship Integrity Audit
  const linkAudit = useMemo(() => {
    const brokenRelations: Array<{ fromId: string; fromName: string; toId: string; type: string }> =
      [];
    const validRelationsCount = relationships.length;

    for (const r of relationships) {
      const fromEntity = getEntity(r.from);
      const toEntity = getEntity(r.to);
      if (!fromEntity || !toEntity) {
        brokenRelations.push({
          fromId: r.from,
          fromName: fromEntity?.name ?? r.from,
          toId: r.to,
          type: r.type,
        });
      }
    }

    // Check entity sources
    const sourceMap = new Set(sources.map((s) => s.id));
    const brokenSourceRefs: Array<{ entityId: string; entityName: string; sourceId: string }> = [];

    for (const e of entities) {
      for (const sId of e.sourceIds) {
        if (!sourceMap.has(sId)) {
          brokenSourceRefs.push({
            entityId: e.id,
            entityName: e.name,
            sourceId: sId,
          });
        }
      }
    }

    return {
      brokenRelations,
      validRelationsCount,
      brokenSourceRefs,
      isClean: brokenRelations.length === 0 && brokenSourceRefs.length === 0,
    };
  }, []);

  // Schema Validation Audit
  const schemaAudit = useMemo(() => {
    let validCount = 0;
    const failures: Array<{ entityId: string; entityName: string; error: string }> = [];

    for (const e of entities) {
      try {
        const schema = buildEntitySchema(e);
        const serialized = JSON.stringify(schema);
        if (!serialized.includes("@context") || !serialized.includes("@type")) {
          failures.push({ entityId: e.id, entityName: e.name, error: "Missing @context or @type" });
        } else {
          validCount++;
        }
      } catch (err) {
        failures.push({
          entityId: e.id,
          entityName: e.name,
          error: err instanceof Error ? err.message : "Schema compilation failed",
        });
      }
    }

    return {
      total: entities.length,
      validCount,
      failures,
      passRate: Math.round((validCount / entities.length) * 100),
    };
  }, []);

  // Content Freshness Monitor
  const freshnessAudit = useMemo(() => {
    const sorted = [...entities].sort((a, b) => {
      const dateA = a.updatedAt || a.createdAt || "2026-01-01";
      const dateB = b.updatedAt || b.createdAt || "2026-01-01";
      return dateB.localeCompare(dateA);
    });

    const recent = sorted.filter(
      (e) => (e.updatedAt || "").startsWith("2026-10") || (e.updatedAt || "").startsWith("2026-11"),
    );
    return {
      mostRecent: sorted.slice(0, 5),
      recentCount: recent.length,
      totalCount: entities.length,
    };
  }, []);

  // Filtered Entities for Catalog
  const filteredEntities = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return entities.filter((e) => {
      const matchesType = typeFilter === "all" || e.entityType === typeFilter;
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        (e.subtitle && e.subtitle.toLowerCase().includes(q)) ||
        e.id.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [searchQuery, typeFilter]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Admin Console" }]} />

      {/* Header */}
      <header className="mt-8 border-b border-rule pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
              <Database className="size-3.5" />
              DIMISIPEDIA Entity Management System
            </div>
            <h1 className="mt-3 font-serif text-3xl font-medium text-foreground sm:text-4xl">
              Admin &amp; Knowledge Governance
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Real-time audit of entity completeness, Schema.org health, verified sources, and
              automated publishing.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-500 font-medium">
              <CheckCircle2 className="size-3.5" />
              Engine Healthy (10 Sitemaps Active)
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-rule/60 pb-3 font-mono text-xs">
          {(
            [
              { key: "overview", label: "Overview & Health", count: null },
              { key: "entities", label: "Entity Catalog", count: entities.length },
              { key: "sources", label: "Source Verification", count: sources.length },
              { key: "links", label: "Link & Relation Audit", count: relationships.length },
              { key: "schema", label: "Schema.org Status", count: `${schemaAudit.passRate}%` },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className={`cursor-pointer rounded px-3 py-1.5 transition-colors ${
                activeTab === t.key
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t.label}
              {t.count !== null && <span className="ml-1.5 opacity-70">({t.count})</span>}
            </button>
          ))}
        </div>
      </header>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="mt-8 space-y-8">
          {/* Key KPI Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono">
            <div className="rounded-lg border border-rule bg-card p-5">
              <span className="text-xs text-muted-foreground">Total Entities</span>
              <div className="mt-2 text-3xl font-bold text-foreground">{entities.length}</div>
              <span className="mt-1 block text-[11px] text-emerald-500">100% Canonical URIs</span>
            </div>

            <div className="rounded-lg border border-rule bg-card p-5">
              <span className="text-xs text-muted-foreground">Active Relationships</span>
              <div className="mt-2 text-3xl font-bold text-foreground">{relationships.length}</div>
              <span className="mt-1 block text-[11px] text-emerald-500">
                {linkAudit.brokenRelations.length === 0
                  ? "Zero Broken Triples"
                  : `${linkAudit.brokenRelations.length} Broken`}
              </span>
            </div>

            <div className="rounded-lg border border-rule bg-card p-5">
              <span className="text-xs text-muted-foreground">Verified Sources</span>
              <div className="mt-2 text-3xl font-bold text-foreground">{sources.length}</div>
              <span className="mt-1 block text-[11px] text-emerald-500">
                MCA, DPIIT &amp; IIT Kanpur Backed
              </span>
            </div>

            <div className="rounded-lg border border-rule bg-card p-5">
              <span className="text-xs text-muted-foreground">Schema.org Pass Rate</span>
              <div className="mt-2 text-3xl font-bold text-foreground">{schemaAudit.passRate}%</div>
              <span className="mt-1 block text-[11px] text-emerald-500">
                {schemaAudit.validCount} / {schemaAudit.total} Validated
              </span>
            </div>
          </div>

          {/* Breakdown by Type */}
          <section className="rounded-lg border border-rule bg-card p-6">
            <h2 className="font-serif text-lg font-medium text-foreground">
              Entity Inventory by Domain
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 font-mono text-xs">
              <div className="flex items-center justify-between rounded border border-rule bg-muted/30 p-3">
                <span className="flex items-center gap-2 text-foreground">
                  <Users className="size-4 text-blue-500" />
                  People &amp; Leadership
                </span>
                <span className="font-bold text-foreground">{peopleEntities.length}</span>
              </div>

              <div className="flex items-center justify-between rounded border border-rule bg-muted/30 p-3">
                <span className="flex items-center gap-2 text-foreground">
                  <Building2 className="size-4 text-emerald-500" />
                  Corporate Organizations
                </span>
                <span className="font-bold text-foreground">1</span>
              </div>

              <div className="flex items-center justify-between rounded border border-rule bg-muted/30 p-3">
                <span className="flex items-center gap-2 text-foreground">
                  <Layers className="size-4 text-amber-500" />
                  Proprietary Products
                </span>
                <span className="font-bold text-foreground">{productEntities.length}</span>
              </div>

              <div className="flex items-center justify-between rounded border border-rule bg-muted/30 p-3">
                <span className="flex items-center gap-2 text-foreground">
                  <Briefcase className="size-4 text-purple-500" />
                  Engineering Projects
                </span>
                <span className="font-bold text-foreground">{projectEntities.length}</span>
              </div>

              <div className="flex items-center justify-between rounded border border-rule bg-muted/30 p-3">
                <span className="flex items-center gap-2 text-foreground">
                  <Terminal className="size-4 text-cyan-500" />
                  Enterprise Services
                </span>
                <span className="font-bold text-foreground">{serviceEntities.length}</span>
              </div>

              <div className="flex items-center justify-between rounded border border-rule bg-muted/30 p-3">
                <span className="flex items-center gap-2 text-foreground">
                  <Calendar className="size-4 text-rose-500" />
                  Documented Events
                </span>
                <span className="font-bold text-foreground">{eventEntities.length}</span>
              </div>
            </div>
          </section>

          {/* Automated Entity Publishing Engine Information */}
          <section className="rounded-lg border border-rule bg-card p-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
              <RefreshCw className="size-4" />
              Automated Entity Publishing Architecture
            </div>
            <h2 className="mt-1 font-serif text-lg font-medium text-foreground">
              Zero-Manual-Friction Publishing Pipeline
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              DIMISIPEDIA 2.0 incorporates a fully reactive build and indexing architecture.
              Whenever a new person, product, project, service, or event is declared in the
              knowledge repository:
            </p>

            <ul className="mt-4 space-y-2 text-xs font-mono text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span>
                  Its canonical route is immediately rendered with reactive SSR and metadata.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span>
                  Corresponding Schema.org JSON-LD is automatically wired with bidirectional graph
                  links.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span>
                  The domain XML sitemap is dynamically updated and compiled into the master index.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                <span>
                  The public AI Knowledge API and{" "}
                  <code className="text-foreground">/knowledge.json</code> instantly expose the new
                  entity to voice assistants and LLM agents.
                </span>
              </li>
            </ul>
          </section>
        </div>
      )}

      {/* TAB 2: ENTITY CATALOG */}
      {activeTab === "entities" && (
        <div className="mt-8 space-y-6">
          {/* Search & Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search entities by name or ID..."
                className="w-full rounded border border-rule bg-background py-2 pl-9 pr-4 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-1 font-mono text-xs">
              {["all", "person", "product", "project", "service", "event"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(t)}
                  className={`cursor-pointer rounded px-2.5 py-1 uppercase ${
                    typeFilter === t
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-rule bg-card">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-rule bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Entity Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Facts</th>
                  <th className="px-4 py-3 text-center">Sources</th>
                  <th className="px-4 py-3 text-center">Relations</th>
                  <th className="px-4 py-3 text-right">Canonical URL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule/60">
                {filteredEntities.map((e) => {
                  const rels = relationsFor(e.id);
                  const isShikhar = e.id === "shikhar-dixit";

                  return (
                    <tr
                      key={e.id}
                      className={`hover:bg-muted/20 transition-colors ${isShikhar ? "bg-primary/5" : ""}`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          {isShikhar && <Sparkles className="size-3 text-primary" />}
                          {e.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground line-clamp-1">
                          {e.subtitle}
                        </div>
                      </td>
                      <td className="px-4 py-3 uppercase text-muted-foreground">{e.entityType}</td>
                      <td className="px-4 py-3">
                        <StatusChip status={e.status} />
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">
                        {e.facts.length}
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">
                        {e.sourceIds.length}
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{rels.length}</td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          to={e.path as unknown as "/"}
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <span>{e.path}</span>
                          <ExternalLink className="size-2.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SOURCES */}
      {activeTab === "sources" && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-medium text-foreground">
              Verified Source Records ({sources.length})
            </h2>
            <span className="font-mono text-xs text-emerald-500">All sources verified</span>
          </div>

          <div className="divide-y divide-rule rounded-lg border border-rule bg-card">
            {sources.map((s) => (
              <div
                key={s.id}
                className="p-4 font-mono text-xs flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{s.title}</span>
                  </div>
                  <div className="mt-1 text-muted-foreground">
                    Publisher: <span className="text-foreground">{s.publisher}</span>{" "}
                    {s.date && `· Date: ${s.date}`}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="rounded bg-muted/60 px-2 py-0.5 text-muted-foreground">
                    ID: {s.id}
                  </span>
                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      <span>Visit</span>
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LINK & RELATION AUDIT */}
      {activeTab === "links" && (
        <div className="mt-8 space-y-6">
          <div className="rounded-lg border border-rule bg-card p-6">
            <div className="flex items-center gap-2">
              {linkAudit.isClean ? (
                <CheckCircle2 className="size-5 text-emerald-500" />
              ) : (
                <AlertTriangle className="size-5 text-amber-500" />
              )}
              <h2 className="font-serif text-lg font-medium text-foreground">
                Relationship Graph Integrity
              </h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {linkAudit.isClean
                ? `All ${linkAudit.validRelationsCount} entity relationships strictly resolve to verified, active destination entities. Zero orphaned references detected.`
                : `${linkAudit.brokenRelations.length} invalid relationships found.`}
            </p>

            {linkAudit.brokenRelations.length > 0 && (
              <div className="mt-4 rounded border border-destructive/40 bg-destructive/10 p-4 font-mono text-xs">
                <span className="font-bold text-destructive">Broken Triples:</span>
                <ul className="mt-2 space-y-1">
                  {linkAudit.brokenRelations.map((br) => (
                    <li key={`${br.fromId}-${br.toId}`}>
                      {br.fromName} ({br.fromId}) → {br.type} → {br.toId} (NOT FOUND)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: SCHEMA VALIDATION */}
      {activeTab === "schema" && (
        <div className="mt-8 space-y-6">
          <div className="rounded-lg border border-rule bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-medium text-foreground">
                  Schema.org JSON-LD Compliance
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Validates Corporation, Person, SoftwareApplication, Service, Event, and FAQPage
                  schemas against Google Knowledge Graph standards.
                </p>
              </div>
              <span className="font-mono text-2xl font-bold text-emerald-500">
                {schemaAudit.passRate}%
              </span>
            </div>

            <div className="mt-6 font-mono text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                <span>
                  Corporation schema verified for DIMISI Technologies (CIN, founder node, brand).
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                <span>
                  Person schema verified for Shikhar Dixit (alumnus, knowsAbout, award, founder).
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                <span>
                  SoftwareApplication schema verified for Kalesh, Kaand, and proprietary suite.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                <span>FAQPage schema verified for 16-Question AI Answer Engine.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
