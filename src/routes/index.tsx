import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  ExternalLink,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { KnowledgeField } from "@/components/KnowledgeField";
import { SiteSearch } from "@/components/SiteSearch";
import { StatusChip } from "@/components/StatusChip";
import { EntityLink } from "@/components/EntityLink";
import { organizationEntity, peopleEntities, projectEntities, timeline } from "@/data/knowledge";
import {
  SITE_URL,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildOrganizationSchema,
  pageHead,
} from "@/lib/seo";

const homeFaqs = [
  {
    question: "What is DIMISI Technologies?",
    answer:
      "DIMISI Technologies Pvt. Ltd. is an Indian enterprise software and business solutions company headquartered in Kanpur, Uttar Pradesh. Incorporated on 9 April 2026 under CIN U62013UP2026PTC246506, the firm builds custom business software, operations systems (DIMISI-OPS), and consumer platforms.",
  },
  {
    question: "What is DIMISIPEDIA?",
    answer:
      "DIMISIPEDIA is the official corporate knowledge encyclopedia of DIMISI Technologies Pvt. Ltd. It documents verifiable information regarding company founders, software engineers, technical architectures, products, and milestones with transparent evidence tiers and revision histories.",
  },
  {
    question: "Who founded DIMISI Technologies?",
    answer:
      "DIMISI Technologies was founded by Shikhar Dixit (Founder & CEO), Swatantra Singh (Co-Founder & CTO), and Nishkarsh Mishra (Co-Founder & COO/CFO). Shikhar Dixit serves as the primary executive and principal software architect leading company development and strategy.",
  },
  {
    question: "Where is DIMISI Technologies located?",
    answer:
      "DIMISI Technologies is headquartered in Kanpur, Uttar Pradesh, India. The company's registered office is located at Swarn Jayanti Vihar, Koyala Nagar, Kanpur (PIN: 208011), supporting both domestic commercial projects and international software operations.",
  },
  {
    question: "What products does DIMISI Technologies develop?",
    answer:
      "DIMISI Technologies develops the DIMISI-OPS enterprise workforce platform, The Kalesh anonymous polling network, DIMISIPEDIA knowledge engine, KAAND news application, CATI Khelghar game engine, and customized commercial client portals for corporate enterprises.",
  },
  {
    question: "How to verify claims on DIMISIPEDIA?",
    answer:
      "Claims on DIMISIPEDIA are verified against official corporate filings (MCA CIN: U62013UP2026PTC246506), software deployment repositories, and primary source citations linked on each entity dossier.",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "DIMISIPEDIA – Official Knowledge Base of DIMISI Technologies",
      description:
        "Official corporate knowledge platform of DIMISI Technologies. Explore verified information on our people, projects, technology and history.",
      path: "/",
      schema: [
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          name: "DIMISIPEDIA – Official Knowledge Base of DIMISI Technologies",
          description:
            "Official corporate knowledge platform of DIMISI Technologies. Explore verified information on our people, projects, technology and history.",
          inLanguage: "en",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/dimisi-technologies#organization` },
          author: {
            "@type": "Organization",
            "@id": `${SITE_URL}/dimisi-technologies#organization`,
            name: "DIMISI Technologies Pvt. Ltd.",
          },
          datePublished: "2026-04-09T00:00:00+05:30",
          dateModified: "2026-10-31T20:30:00+05:30",
          breadcrumb: { "@id": `${SITE_URL}/#breadcrumb` },
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", ".speakable-summary", "#overview-h", "#faq-h"],
          },
        },
        buildBreadcrumbSchema(
          [{ label: "Home", to: "/" }, { label: "Knowledge Encyclopedia" }],
          "/",
        ),
        buildOrganizationSchema(organizationEntity),
        buildFAQSchema(homeFaqs, "/"),
      ],
    }),
  component: Home,
});

const explore = [
  { to: "/journey", label: "Our Journey", note: "The complete founder's story" },
  { to: "/dimisi-technologies", label: "DIMISI Technologies", note: "The corporate organization" },
  { to: "/people", label: "People", note: "Founders, leadership and team" },
  { to: "/projects", label: "Projects", note: "Kalesh, DIMISIPEDIA, DIMISI-OPS" },
  { to: "/technology", label: "Technology", note: "Documented engineering stack" },
  { to: "/timeline", label: "Timeline", note: "Chronological company record" },
];

const systemsRegistry = [
  {
    name: "DIMISI-OPS",
    category: "Enterprise Workforce Platform",
    status: "Under Development",
    architect: "Shikhar Dixit (Founder & CEO)",
    href: "/projects/dimisi-ops",
  },
  {
    name: "The Kalesh",
    category: "Anonymous Social Network",
    status: "Active / Flagship",
    architect: "Shikhar Dixit & Founding Team",
    href: "/products/kalesh",
  },
  {
    name: "DIMISIPEDIA",
    category: "Knowledge Platform & Entity Engine",
    status: "Active Canonical",
    architect: "Shikhar Dixit & Engineering Board",
    href: "/projects/dimisipedia",
  },
  {
    name: "KAAND",
    category: "Mobile Media & News Engine",
    status: "Under Development",
    architect: "Amrit Awasthi & Sheelu Singh",
    href: "/projects/kaand",
  },
  {
    name: "CATI Khelghar",
    category: "Offline Games Engine",
    status: "Active Prototype",
    architect: "Shikhar Dixit (DIMISI Labs)",
    href: "/projects/cati-khelghar",
  },
  {
    name: "Commercial Client Systems",
    category: "Enterprise Portals & High-Conversion Web",
    status: "Active Production",
    architect: "Shikhar Dixit, Somya Tiwari, Prashant Umrao",
    href: "/projects",
  },
];

function Home() {
  return (
    <>
      {/* Quick In-Page Table of Contents / Anchors for LLMs & Users */}
      <nav
        aria-label="Table of Contents"
        className="border-b border-rule bg-surface/50 py-2.5 px-5"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-mono text-muted-foreground">
          <span className="font-semibold uppercase tracking-wider text-foreground">Contents:</span>
          <a href="#explore-h" className="hover:text-primary transition-colors">
            1. Explore
          </a>
          <a href="#overview-h" className="hover:text-primary transition-colors">
            2. Knowledge Overview
          </a>
          <a href="#registry-h" className="hover:text-primary transition-colors">
            3. Systems Registry
          </a>
          <a href="#people-h" className="hover:text-primary transition-colors">
            4. Leadership &amp; Team
          </a>
          <a href="#projects-h" className="hover:text-primary transition-colors">
            5. Projects Directory
          </a>
          <a href="#verification-h" className="hover:text-primary transition-colors">
            6. Verification Steps
          </a>
          <a href="#faq-h" className="hover:text-primary transition-colors">
            7. Common Questions
          </a>
          <a href="#timeline-h" className="hover:text-primary transition-colors">
            8. Milestone History
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-rule">
        <KnowledgeField />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <div className="flex flex-wrap items-center gap-3">
            <p className="label-mono">
              Official knowledge platform · DIMISI Technologies Pvt. Ltd.
            </p>
            <span className="text-muted-foreground">•</span>
            <time dateTime="2026-10-31" className="font-mono text-xs text-muted-foreground">
              Updated: 31 October 2026
            </time>
          </div>
          <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl font-serif">
            DIMISIPEDIA – Knowledge Encyclopedia
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-xl text-muted-foreground sm:text-2xl speakable-summary">
            The Knowledge Encyclopedia of DIMISI Technologies
          </p>
          <p className="mt-4 max-w-xl text-[15px] text-muted-foreground leading-relaxed">
            Explore verified records on founders, team members, software projects, engineering
            architecture, and corporate history.
          </p>
          <div className="mt-8 max-w-xl">
            <SiteSearch placeholder="Search DIMISI knowledge — people, projects, technology…" />
          </div>
        </div>
      </section>

      {/* Featured Journey Spotlight */}
      <section aria-label="Featured Journey" className="border-b border-rule bg-surface/50">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="grid items-center gap-6 border border-border bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="label-mono text-primary">
                Featured Chronicle · 10 Chronological Phases
              </p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                The Entrepreneurship Journey of Shikhar Dixit &amp; DIMISI Technologies
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                From a six-hour home engineering sprint for Axis College's Gandhigiri technical
                project presentation event to CATI, the Mumbai train ride, placement rejections, the
                late-night spark of Kalesh, incorporating on 9 April 2026, and landing the first
                client — an unfiltered founder narrative.
              </p>
            </div>
            <Link
              to="/journey"
              className="inline-flex shrink-0 items-center gap-2 border border-primary bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Read the Full Story <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="explore-h"
        aria-labelledby="explore-title"
        className="mx-auto max-w-6xl px-5 py-16 scroll-mt-16"
      >
        <h2 id="explore-title" className="text-2xl">
          Explore DIMISI
        </h2>
        <ul className="mt-6 grid gap-px border border-border bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {explore.map((e) => (
            <li key={e.to}>
              <Link
                to={e.to}
                className="group flex h-full flex-col justify-between bg-surface px-5 py-6 transition-colors hover:bg-muted"
              >
                <span className="font-serif text-xl">{e.label}</span>
                <span className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                  {e.note}
                  <ArrowRight
                    className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="overview-h"
        aria-labelledby="overview-title"
        className="border-y border-rule bg-surface scroll-mt-16"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <p className="label-mono">Knowledge overview</p>
            <h2 id="overview-title" className="mt-2 text-3xl">
              What is DIMISI Technologies?
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed">
              {organizationEntity.answer}
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              The enterprise specializes in custom business software, operations management
              platforms (DIMISI-OPS), cloud-native web engineering, and AI automation. Activities
              and statements are published here strictly with their verification status attached —
              information awaiting confirmation is labelled as such rather than presented as fact.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="text-muted-foreground">External Registries:</span>
              <a
                href="https://www.falconebiz.com/company/DIMISI-TECHNOLOGIES-PRIVATE-LIMITED-U62013UP2026PTC246506"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                FalconeBiz Registry <ExternalLink className="size-3" />
              </a>
              <a
                href="https://tracxn.com/d/companies/dimisi-technologies"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Tracxn <ExternalLink className="size-3" />
              </a>
              <a
                href="https://www.linkedin.com/company/dimisi-technologies"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                LinkedIn <ExternalLink className="size-3" />
              </a>
            </div>

            <div className="mt-8">
              <Link
                to="/dimisi-technologies"
                className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm transition-colors hover:border-primary"
              >
                Read the organization entry <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <dl className="divide-y divide-rule border border-border bg-background">
            {organizationEntity.facts.slice(0, 6).map((f) => (
              <div key={f.label} className="px-4 py-3">
                <dt className="label-mono">{f.label}</dt>
                <dd className="mt-1 text-sm">{f.value}</dd>
                {f.status ? (
                  <dd className="mt-1.5">
                    <StatusChip status={f.status} />
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Structured Systems Registry Comparison / Data Table for Citability & AEO */}
      <section
        id="registry-h"
        aria-labelledby="registry-title"
        className="border-b border-rule bg-background py-16 scroll-mt-16"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="label-mono text-primary">Structured Systems Registry</p>
              <h2 id="registry-title" className="mt-1 text-2xl sm:text-3xl">
                DIMISI Software &amp; Platform Ecosystem
              </h2>
            </div>
            <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">
              All projects &amp; products →
            </Link>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Authoritative directory of core software platforms, enterprise applications, and digital
            initiatives engineered by DIMISI Technologies.
          </p>

          <div className="mt-6 overflow-x-auto border border-border bg-surface">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-muted/50 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Software / System
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Classification
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Operational Status
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Architect &amp; Lead
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Dossier
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule font-sans">
                {systemsRegistry.map((item) => (
                  <tr key={item.name} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-foreground">{item.name}</td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground font-mono">
                      {item.category}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-primary">
                        <CheckCircle2 className="size-3" /> {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground">{item.architect}</td>
                    <td className="px-4 py-3.5">
                      <Link
                        to={item.href}
                        className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline"
                      >
                        View Entry →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        id="people-h"
        aria-labelledby="people-title"
        className="mx-auto max-w-6xl px-5 py-16 scroll-mt-16"
      >
        <div className="flex items-baseline justify-between">
          <div>
            <p className="label-mono text-primary">Leadership &amp; Team</p>
            <h2 id="people-title" className="mt-1 text-2xl sm:text-3xl">
              People of DIMISI Technologies
            </h2>
          </div>
          <Link to="/people" className="text-sm text-muted-foreground hover:text-foreground">
            All people ({peopleEntities.length}) →
          </Link>
        </div>
        <ul className="mt-6 grid gap-px border border-border bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {peopleEntities.map((p, index) => {
            const roleActionLabel =
              p.id === "shikhar-dixit"
                ? "Founder & CEO Bio"
                : p.id === "swatantra-singh"
                  ? "CTO Profile"
                  : p.id === "nishkarsh-mishra"
                    ? "Director Profile"
                    : index % 3 === 0
                      ? "Engineering Bio"
                      : index % 3 === 1
                        ? "Dossier & Bio"
                        : "Contributor Record";

            return (
              <li key={p.id}>
                <EntityLink
                  to={p.path}
                  className="flex h-full flex-col justify-between bg-surface p-5 transition-colors hover:bg-muted"
                >
                  <div>
                    <div className="flex items-center gap-3.5">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={`Portrait of ${p.name}`}
                          width={48}
                          height={48}
                          loading="lazy"
                          decoding="async"
                          className="size-12 rounded-none border border-rule object-cover"
                        />
                      ) : (
                        <div className="flex size-12 items-center justify-center border border-rule bg-muted font-serif text-sm font-medium">
                          {p.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                      <div>
                        <span className="font-serif text-lg font-medium leading-tight">
                          {p.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {p.subtitle}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {p.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-rule/60 text-xs font-mono text-primary">
                    <span>{roleActionLabel}</span>
                    <ArrowRight className="size-3.5" />
                  </div>
                </EntityLink>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        id="projects-h"
        aria-labelledby="projects-title"
        className="mx-auto max-w-6xl px-5 pb-16 scroll-mt-16"
      >
        <div className="flex items-baseline justify-between">
          <h2 id="projects-title" className="text-2xl">
            Projects
          </h2>
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">
            All projects →
          </Link>
        </div>
        <ul className="mt-6 grid gap-px border border-border bg-rule md:grid-cols-2">
          {[...projectEntities]
            .sort((a, b) => (a.featuredPriority ?? 99) - (b.featuredPriority ?? 99))
            .map((p) => (
              <li key={p.id}>
                <EntityLink
                  to={p.path}
                  className="flex h-full flex-col justify-between bg-surface p-6 transition-colors hover:bg-muted"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <div className="flex size-10 shrink-0 items-center justify-center rounded border border-rule bg-surface p-1">
                          <img
                            src={p.image}
                            alt={p.name}
                            width={40}
                            height={40}
                            loading="lazy"
                            decoding="async"
                            className="size-full object-contain"
                          />
                        </div>
                      ) : null}
                      <div>
                        <span className="label-mono">
                          {p.category ?? "Project"} · {p.statusBadge ?? p.lifecycle}
                        </span>
                        <span className="mt-0.5 block font-serif text-xl">{p.name}</span>
                      </div>
                    </div>
                    <span className="mt-3 block text-sm text-muted-foreground">
                      {p.shortDescription}
                    </span>
                  </div>
                </EntityLink>
              </li>
            ))}
        </ul>
      </section>

      {/* "How-to" Step Snippets Section for Search & Voice Snippets */}
      <section
        id="verification-h"
        aria-labelledby="verification-title"
        className="border-t border-rule bg-surface/50 py-16 scroll-mt-16"
      >
        <div className="mx-auto max-w-6xl px-5">
          <p className="label-mono text-primary">Credibility &amp; Audit Trail</p>
          <h2 id="verification-title" className="mt-1 text-2xl sm:text-3xl">
            How to verify records on DIMISIPEDIA
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            DIMISIPEDIA enforces transparent editorial governance. Follow these three steps to audit
            any entity record:
          </p>

          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            <li className="border border-border bg-surface p-5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                Step 1
              </span>
              <h3 className="mt-2 font-serif text-lg font-medium">Locate the Entity Dossier</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Search or browse to the dedicated entry. Every founder, executive, software project,
                and technology framework maintains a permanent canonical URL.
              </p>
            </li>
            <li className="border border-border bg-surface p-5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                Step 2
              </span>
              <h3 className="mt-2 font-serif text-lg font-medium">Check Status Chips</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Inspect the explicit verification indicator (Source-backed, Documented, Pending, or
                Superseded) assigned to each individual fact and statement.
              </p>
            </li>
            <li className="border border-border bg-surface p-5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                Step 3
              </span>
              <h3 className="mt-2 font-serif text-lg font-medium">Cross-Reference Sources</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Consult the citations list to examine primary artifacts including MCA corporate
                registrations, public repository commits, and official platform deployments.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* FAQ & Q&A Patterns for Answer Engine Optimization (AEO) and Voice Search */}
      <section
        id="faq-h"
        aria-labelledby="faq-title"
        className="border-t border-rule bg-surface py-16 scroll-mt-16"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="label-mono text-primary">Common Inquiries &amp; Answers</p>
            <h2 id="faq-title" className="mt-1 text-2xl sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Direct, source-verified answers to common queries regarding DIMISI Technologies and
              DIMISIPEDIA.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {homeFaqs.map((faq) => (
              <div key={faq.question} className="border border-border bg-background p-6">
                <h3 className="font-serif text-lg font-medium text-foreground">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="timeline-h"
        aria-labelledby="timeline-title"
        className="border-t border-rule bg-surface scroll-mt-16"
      >
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex items-baseline justify-between">
            <h2 id="timeline-title" className="text-2xl">
              Recent record
            </h2>
            <Link to="/timeline" className="text-sm text-muted-foreground hover:text-foreground">
              Full timeline ({timeline.length} entries) →
            </Link>
          </div>
          <ol className="mt-6 divide-y divide-rule border-y border-rule">
            {[...timeline]
              .reverse()
              .slice(0, 5)
              .map((t) => (
                <li key={t.date + t.title} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr]">
                  <span className="label-mono">{t.displayDate}</span>
                  <div>
                    <p className="font-serif text-lg">{t.title}</p>
                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{t.description}</p>
                    <div className="mt-2">
                      <StatusChip status={t.status} />
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </section>
    </>
  );
}
