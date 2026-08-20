import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { StatusChip, isPublicStatus } from "./StatusChip";
import { getSources, relationsFor, type Entity } from "@/data/knowledge";
import { VerificationBadge } from "./VerificationBadge";
import { EXTERNAL_REL_UNTRUSTED, safeExternalHref } from "@/lib/url-safety";

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(1, window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-px bg-transparent" aria-hidden>
      <div
        className="h-px bg-primary transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** Renders inline [n] markers as superscript links into the Sources list. */
function Cited({ text }: { text: string }) {
  const parts = text.split(/(\[\d+\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\[(\d+)\]$/.exec(part);
        if (!m) return <span key={i}>{part}</span>;
        return (
          <a
            key={i}
            href={`#source-${m[1]}`}
            className="mx-px align-super font-mono text-[0.62em] text-primary no-underline hover:underline"
            aria-label={`Source ${m[1]}`}
          >
            [{m[1]}]
          </a>
        );
      })}
    </>
  );
}

function SectionImageGallery({
  images,
}: {
  images: { src: string; alt: string; caption?: string }[];
}) {
  if (images.length === 0) return null;
  const gridClass =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`my-6 grid gap-4 ${gridClass}`}>
      {images.map((img, idx) => (
        <figure key={idx} className="border border-rule bg-surface">
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
          {img.caption ? (
            <figcaption className="px-3 py-2 text-xs text-muted-foreground">
              {img.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

export function Breadcrumbs({ trail }: { trail: { label: string; to?: string }[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
    >
      {trail.map((t, i) => (
        <span key={t.label} className="flex items-center gap-1.5">
          {i > 0 ? <ChevronRight className="size-3 opacity-50" aria-hidden /> : null}
          {t.to ? (
            <Link to={t.to} className="hover:text-foreground">
              {t.label}
            </Link>
          ) : (
            <span className="text-foreground">{t.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function EntityArticle({
  entity,
  trail,
  children,
  tocExtra,
}: {
  entity: Entity;
  trail: { label: string; to?: string }[];
  children?: React.ReactNode;
  tocExtra?: { id: string; heading: string }[];
}) {
  const srcs = getSources(entity.sourceIds);
  const rels = relationsFor(entity.id);
  const claimCount = entity.claims?.length ?? 0;

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-6xl px-5 py-10">
        <Breadcrumbs trail={trail} />

        <header className="mt-6 flex flex-col-reverse gap-6 border-b border-rule pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="label-mono">{entity.subtitle}</p>
            <h1 className="mt-2 text-4xl leading-tight sm:text-5xl">{entity.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {entity.shortDescription}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {entity.lifecycle ? <StatusChip status="documented" /> : null}
              <span className="label-mono">
                Last reviewed {entity.verifiedAt ?? entity.updatedAt}
                {claimCount > 0 ? ` · ${claimCount} claims reviewed` : ""}
              </span>
            </div>
          </div>
          {entity.image ? (
            <figure className="shrink-0">
              <img
                src={entity.image}
                alt={`${entity.entityType === "person" ? "Portrait" : "Visual mark"} of ${entity.name}`}
                width={176}
                height={176}
                loading="eager"
                className="size-32 border border-rule bg-surface object-cover sm:size-44"
              />
              <figcaption className="mt-2 max-w-44 text-[11px] leading-snug text-muted-foreground">
                {entity.name} — image supplied by DIMISI Technologies.
              </figcaption>
            </figure>
          ) : null}
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <section
              aria-labelledby="direct-answer"
              className="border-l-2 border-primary bg-surface px-5 py-5"
            >
              <h2 id="direct-answer" className="text-base font-medium">
                {entity.entityType === "person"
                  ? `Who is ${entity.name}?`
                  : `What is ${entity.name}?`}
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed">{entity.answer}</p>
            </section>

            <nav aria-label="Table of contents" className="mt-10 border-y border-rule py-5">
              <p className="label-mono">Contents</p>
              <ol className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
                {[
                  ...entity.sections.map((s) => ({ id: s.id, heading: s.heading })),
                  ...(tocExtra ?? []),
                ].map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="font-mono text-xs">{i + 1}.</span> {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="prose-editorial mt-10">
              {entity.sections.map((s) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-24 border-b border-rule pb-8 pt-2 last:border-0"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-2xl">{s.heading}</h2>
                    {s.status ? <StatusChip status={s.status} /> : null}
                  </div>
                  {s.images && s.images.length > 0 ? (
                    <SectionImageGallery images={s.images} />
                  ) : null}
                  {s.body.map((p, i) => (
                    <p key={i}>
                      <Cited text={p} />
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {children}

            {(entity.faqs && entity.faqs.length > 0) ||
            (entity.questions && entity.questions.length > 0) ? (
              <section id="questions" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl">Frequently asked questions</h2>
                <dl className="mt-5 divide-y divide-rule border-y border-rule">
                  {(entity.faqs ?? entity.questions ?? []).map((item) => {
                    const qText = "question" in item ? item.question : item.q;
                    const aText = "answer" in item ? item.answer : item.a;
                    return (
                      <div key={qText} className="py-4">
                        <dt className="text-[15px] font-medium">{qText}</dt>
                        <dd className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                          {aText}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </section>
            ) : null}

            <section id="coverage" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl">Information coverage</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                DIMISIPEDIA does not publish a credibility score. It publishes the evidence behind
                each area of this entry.
              </p>
              <dl className="mt-5 divide-y divide-rule border-y border-rule">
                {entity.coverage.map((c) => (
                  <div
                    key={c.area}
                    className="grid gap-2 py-3 sm:grid-cols-[10rem_11rem_1fr] sm:items-center"
                  >
                    <dt className="text-sm font-medium">{c.area}</dt>
                    <dd>
                      <StatusChip status={c.status} />
                    </dd>
                    <dd className="text-sm text-muted-foreground">{c.note}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {entity.claims && entity.claims.length > 0 ? (
              <section id="claims" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl">Claim-level sourcing</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Each statement of consequence in this entry is held as an individual claim with
                  its own type, sources and verification status.
                </p>
                <ul className="mt-5 divide-y divide-rule border-y border-rule">
                  {entity.claims.map((c) => (
                    <li key={c.claim} className="py-4">
                      <p className="text-[15px] leading-relaxed">{c.claim}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="label-mono">{c.claimType}</span>
                        <VerificationBadge
                          claim={c.claim}
                          sourceIds={c.sourceIds}
                          declared={c.verification}
                          {...(c.disputed ? { disputed: true } : {})}
                          {...(c.lastVerified
                            ? { lastReviewed: c.lastVerified }
                            : { lastReviewed: c.dateAdded })}
                        />
                        <span className="text-xs text-muted-foreground">
                          {c.sourceIds
                            .map((id) => {
                              const idx = entity.sourceIds.indexOf(id);
                              return idx >= 0 ? `[${idx + 1}]` : null;
                            })
                            .filter(Boolean)
                            .join(" ")}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section id="sources" className="mt-12 scroll-mt-24">
              {srcs.length === 0 ? null : (
                <>
                  <h2 className="text-2xl">References &amp; sources</h2>
                  <ol className="mt-5 space-y-4">
                    {srcs.map((s, i) => (
                      <li
                        key={s.id}
                        id={`source-${i + 1}`}
                        className="scroll-mt-24 border-l border-rule pl-4"
                      >
                        <p className="text-sm">
                          <span className="font-mono text-xs text-muted-foreground">[{i + 1}]</span>{" "}
                          {safeExternalHref(s.url) ? (
                            <a
                              href={safeExternalHref(s.url)!}
                              target="_blank"
                              rel={EXTERNAL_REL_UNTRUSTED}
                              className="underline underline-offset-4"
                            >
                              {s.title}
                            </a>
                          ) : (
                            s.title
                          )}
                          <span className="text-muted-foreground"> — {s.publisher}</span>
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">{s.claim}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="label-mono">{s.type}</span>
                          <StatusChip status={s.status} />
                        </div>
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </section>

            <section id="revisions" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl">Revision history</h2>
              <ol className="mt-5 divide-y divide-rule border-y border-rule">
                {[...entity.revisions].reverse().map((r) => (
                  <li key={r.n} className="grid gap-1 py-3 sm:grid-cols-[6rem_8rem_1fr]">
                    <span className="label-mono">Revision {r.n}</span>
                    <span className="text-sm text-muted-foreground">{r.date}</span>
                    <span className="text-sm">
                      {r.change} <span className="text-muted-foreground">— {r.editor}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-surface">
              <p className="border-b border-rule px-4 py-3 label-mono">Quick facts</p>
              <dl className="divide-y divide-rule">
                {entity.facts.map((f) => (
                  <div key={f.label} className="px-4 py-3">
                    <dt className="label-mono">{f.label}</dt>
                    <dd className="mt-1 text-sm">{f.value}</dd>
                    {f.status ? (
                      <dd className="mt-1.5">
                        <VerificationBadge
                          claim={`${entity.name} — ${f.label}: ${f.value}`}
                          {...(f.sourceIds ? { sourceIds: f.sourceIds } : {})}
                          declared={f.status}
                          lastReviewed={entity.verifiedAt ?? entity.updatedAt}
                        />
                      </dd>
                    ) : null}
                  </div>
                ))}
              </dl>
            </div>

            {entity.roles && entity.roles.length > 0 ? (
              <div className="mt-6 border border-border bg-surface">
                <p className="border-b border-rule px-4 py-3 label-mono">Recorded roles</p>
                <ul className="divide-y divide-rule">
                  {entity.roles.map((r) => (
                    <li key={r.title} className="px-4 py-3">
                      <p className="font-serif text-base">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.organization}</p>
                      <div className="mt-2">
                        <VerificationBadge
                          claim={`${entity.name} — ${r.title}, ${r.organization}`}
                          {...(r.sourceIds ? { sourceIds: r.sourceIds } : {})}
                          declared={r.status}
                          lastReviewed={entity.verifiedAt ?? entity.updatedAt}
                        />
                      </div>
                      {r.note ? (
                        <p className="mt-2 text-xs text-muted-foreground">{r.note}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {entity.education && entity.education.length > 0 ? (
              <div className="mt-6 border border-border bg-surface">
                <p className="border-b border-rule px-4 py-3 label-mono">Education</p>
                <ul className="divide-y divide-rule">
                  {entity.education.map((e) => (
                    <li key={e.institution + e.qualification} className="px-4 py-3">
                      <p className="text-sm">
                        {e.qualification}
                        {e.field ? ` — ${e.field}` : ""}
                      </p>
                      <p className="mt-0.5 font-serif text-base">{e.institution}</p>
                      {e.period ? (
                        <p className="text-xs text-muted-foreground">{e.period}</p>
                      ) : null}
                      {e.result ? (
                        <p className="text-xs text-muted-foreground">Result: {e.result}</p>
                      ) : null}
                      {isPublicStatus(e.status) ? (
                        <div className="mt-2">
                          <StatusChip status={e.status} />
                        </div>
                      ) : null}
                      {e.note ? (
                        <p className="mt-2 text-xs text-muted-foreground">{e.note}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {entity.experience && entity.experience.length > 0 ? (
              <div className="mt-6 border border-border bg-surface">
                <p className="border-b border-rule px-4 py-3 label-mono">Professional experience</p>
                <ul className="divide-y divide-rule">
                  {entity.experience.map((x) => (
                    <li key={x.organization + x.role} className="px-4 py-3">
                      <p className="text-sm">{x.role}</p>
                      <p className="mt-0.5 font-serif text-base">{x.organization}</p>
                      {x.period ? (
                        <p className="text-xs text-muted-foreground">{x.period}</p>
                      ) : null}
                      {isPublicStatus(x.status) ? (
                        <div className="mt-2">
                          <StatusChip status={x.status} />
                        </div>
                      ) : null}
                      {x.note ? (
                        <p className="mt-2 text-xs text-muted-foreground">{x.note}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {entity.externalProfiles && entity.externalProfiles.length > 0 ? (
              <div className="mt-6 border border-border bg-surface">
                <p className="border-b border-rule px-4 py-3 label-mono">External profiles</p>
                <ul className="divide-y divide-rule">
                  {entity.externalProfiles.map((p) => (
                    <li key={p.label} className="px-4 py-3">
                      {safeExternalHref(p.url) ? (
                        <a
                          href={safeExternalHref(p.url)!}
                          target="_blank"
                          rel={EXTERNAL_REL_UNTRUSTED}
                          className="flex items-center justify-between text-sm underline underline-offset-4"
                        >
                          {p.label}
                          <ArrowUpRight className="size-3.5 text-muted-foreground" aria-hidden />
                        </a>
                      ) : (
                        <p className="text-sm">{p.label}</p>
                      )}
                      {p.verified ? (
                        <div className="mt-2">
                          <StatusChip status="verified" />
                        </div>
                      ) : null}
                      {p.note ? (
                        <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {entity.officialLinks.length > 0 ? (
              <div className="mt-6 border border-border bg-surface">
                <p className="border-b border-rule px-4 py-3 label-mono">Official links</p>
                <ul className="divide-y divide-rule">
                  {entity.officialLinks.map((l) => (
                    <li key={l.url}>
                      {safeExternalHref(l.url) ? (
                        <a
                          href={safeExternalHref(l.url)!}
                          target="_blank"
                          rel={EXTERNAL_REL_UNTRUSTED}
                          className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-muted"
                        >
                          {l.label}
                          <ArrowUpRight className="size-3.5 text-muted-foreground" aria-hidden />
                        </a>
                      ) : (
                        <span className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground">
                          {l.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {rels.length > 0 ? (
              <div className="mt-6 border border-border bg-surface">
                <p className="border-b border-rule px-4 py-3 label-mono">Related entities</p>
                <ul className="divide-y divide-rule">
                  {rels.map((r, i) => (
                    <li key={`${i}-${r.type}-${r.entity.id}`}>
                      <Link
                        to={r.entity.path}
                        className="block px-4 py-3 transition-colors hover:bg-muted"
                      >
                        <span className="label-mono">{r.type}</span>
                        <span className="mt-0.5 block font-serif text-base">{r.entity.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {r.entity.subtitle}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </article>
    </>
  );
}
