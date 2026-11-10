import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { EntityLink } from "@/components/EntityLink";
import { productEntities } from "@/data/knowledge";
import { indexHead } from "@/lib/seo";
import { EXTERNAL_REL_UNTRUSTED, safeExternalHref } from "@/lib/url-safety";

export const Route = createFileRoute("/products/")({
  head: () =>
    indexHead({
      title: "Products & Software Platforms | DIMISI Technologies",
      description:
        "Official directory of proprietary software products developed by DIMISI Technologies, including flagship social platform Kalesh, KAAND, CATI Khelghar, DIMISI-OPS, and KaryON.",
      path: "/products",
      listName: "Proprietary Products of DIMISI Technologies",
      items: productEntities,
      trail: [{ label: "DIMISIPEDIA", to: "/" }, { label: "Products" }],
    }),
  component: ProductsIndex,
});

const CATEGORIES = [
  "All",
  "Consumer & Social",
  "Enterprise Software",
  "Media & News",
  "Gaming & Labs",
  "Knowledge Platforms",
] as const;

function StatusBadge({ badge }: { badge?: string | undefined }) {
  if (!badge) return null;
  const b = badge.toUpperCase();
  let colorClass = "border-rule bg-muted text-foreground/80";

  if (b.includes("FLAGSHIP")) {
    colorClass = "border-amber-500/40 bg-amber-500/10 text-amber-500 font-semibold";
  } else if (b.includes("UNDER DEVELOPMENT")) {
    colorClass = "border-sky-500/40 bg-sky-500/10 text-sky-400 font-medium";
  } else if (b.includes("LIVE") || b.includes("ACTIVE")) {
    colorClass = "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 font-medium";
  } else if (b.includes("LAB")) {
    colorClass = "border-purple-500/40 bg-purple-500/10 text-purple-400 font-medium";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase ${colorClass}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" aria-hidden />
      {badge}
    </span>
  );
}

function ProductsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const sortedProducts = [...productEntities].sort(
    (a, b) => (a.featuredPriority ?? 99) - (b.featuredPriority ?? 99),
  );

  const filterMatches = (prodCategory: string | undefined, cat: string) => {
    if (cat === "All") return true;
    if (cat === "Consumer & Social") return prodCategory?.includes("Products") || false;
    if (cat === "Enterprise Software") return prodCategory?.includes("Enterprise") || false;
    if (cat === "Media & News")
      return prodCategory?.includes("News") || prodCategory?.includes("Media") || false;
    if (cat === "Gaming & Labs")
      return prodCategory?.includes("Labs") || prodCategory?.includes("Experiments") || false;
    if (cat === "Knowledge Platforms") return prodCategory?.includes("Internal Systems") || false;
    return true;
  };

  const filteredProducts =
    selectedCategory === "All"
      ? sortedProducts
      : sortedProducts.filter((p) => filterMatches(p.category, selectedCategory));

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Products" }]} />
      <header className="mt-6 border-b border-rule pb-8">
        <div className="flex items-center gap-2">
          <p className="label-mono">Entity directory · Software Products</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            <Sparkles className="size-3" />
            Official Portfolio
          </span>
        </div>
        <h1 className="mt-2 text-4xl font-serif">Products & Software Platforms</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
          Proprietary consumer applications, enterprise operations architectures (DIMISI-OPS),
          mobile news networks, and offline gaming platforms engineered and operated by DIMISI
          Technologies Private Limited under the leadership of Founder & CEO Shikhar Dixit.
        </p>

        {/* Category filter tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground font-medium"
                    : "border-rule bg-card/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((p) => {
          const liveUrl = p.officialLinks?.find((l) => l.official)?.url;

          return (
            <article
              key={p.id}
              className="group flex flex-col justify-between rounded-lg border border-rule bg-card p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.name} icon`}
                        width={48}
                        height={48}
                        decoding="async"
                        className="size-12 rounded-lg border border-rule object-cover bg-muted/40 p-1"
                      />
                    ) : (
                      <div className="flex size-12 items-center justify-center rounded-lg border border-rule bg-muted/40 font-mono text-xs text-muted-foreground">
                        {p.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h2 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        <EntityLink to={p.path}>{p.name}</EntityLink>
                      </h2>
                      <span className="font-mono text-xs text-muted-foreground">
                        {p.projectType ?? p.category}
                      </span>
                    </div>
                  </div>
                  <StatusBadge badge={p.statusBadge} />
                </div>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {p.shortDescription}
                </p>

                {p.tags && p.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-rule/60 pt-4 text-xs font-mono">
                <EntityLink
                  to={p.path}
                  className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  Explore Dossier
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </EntityLink>

                {liveUrl && (
                  <a
                    href={safeExternalHref(liveUrl) ?? undefined}
                    target="_blank"
                    rel={EXTERNAL_REL_UNTRUSTED}
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <span>Domain</span>
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
