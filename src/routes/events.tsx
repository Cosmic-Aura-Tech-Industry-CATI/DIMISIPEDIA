import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  Sparkles,
  Building2,
  Share2,
  Users,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Trophy,
  Megaphone,
  Maximize2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { StatusChip } from "@/components/StatusChip";
import { ImageLightbox, type LightboxImage } from "@/components/ImageLightbox";
import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";

interface EventImage {
  src: string;
  alt: string;
  caption: string;
}

interface EventItem {
  id: string;
  title: string;
  category: "Milestone" | "Campaign" | "Summit";
  date: string;
  displayDate: string;
  location: string;
  status: "verified" | "source-backed";
  summary: string;
  description: string[];
  highlights: string[];
  images?: EventImage[];
  relatedEntities: { label: string; to: string }[];
}

const documentedEvents: EventItem[] = [
  {
    id: "linkedin-30days-kalesh-contest",
    title: "LinkedIn 30-Day Kalesh Promotion & Content Creator Challenge",
    category: "Campaign",
    date: "2026-08-15",
    displayDate: "15 August 2026",
    location: "LinkedIn & Campus Social Networks",
    status: "source-backed",
    summary:
      "A high-impact 30-day viral storytelling and campus creator contest on LinkedIn celebrating student growth, concluding on 15 August 2026 with an official award presentation ceremony.",
    description: [
      "To drive organic user adoption and nationwide campus awareness for Kalesh (the anonymous social polling and campus engagement platform), the founding team launched an intensive 30-day posting and promotion contest on LinkedIn.",
      "The initiative challenged student creators, engineering campus influencers, and developers to share daily authentic startup stories, viral opinion polls, engineering breakdowns, and campus culture reflections centered around the iconic tagline 'Chalo Kalesh Karey'.",
      "Over the course of 30 days, the campaign generated significant organic impressions across student engineering networks, establishing strong word-of-mouth growth and direct download traffic to TheKalesh.com without paid marketing expenditure.",
      "On 15 August 2026, at the conclusion of the challenge, the founding directors hosted a celebratory felicitation ceremony, presenting 1st Prize Winner Prashant Umrao with an official DIMISI Technologies Certificate of Achievement and custom awards.",
    ],
    highlights: [
      "30 consecutive days of founder storytelling, opinion polls, and viral creator challenges",
      "Official felicitation ceremony on 15 August 2026 awarding 1st Prize Winner Prashant Umrao with a Certificate of Achievement",
      "Zero-budget organic growth campaign driving student adoption across North Indian colleges",
      "Widespread community engagement around the movement 'Chalo Kalesh Karey'",
    ],
    images: [
      {
        src: "/images/first prize winner 30 days.jpeg",
        alt: "Prashant Umrao receiving the official DIMISI Technologies Certificate of Achievement and trophy as first prize winner",
        caption:
          "Awards Ceremony · 15 August 2026: Co-Founder Swatantra Singh presenting the 1st Prize Certificate of Achievement to Prashant Umrao, winner of the LinkedIn 30-Day Challenge.",
      },
      {
        src: "/images/30 days linkedin.jpeg",
        alt: "The DIMISI team and creators celebrating the conclusion of the 30-Day LinkedIn challenge",
        caption:
          "Community Archive · 15 August 2026: Team members and creator participants celebrating the success of the 30-Day LinkedIn Kalesh promotion campaign.",
      },
    ],
    relatedEntities: [
      { label: "Prashant Umrao", to: "/people/prashant-umrao" },
      { label: "Kalesh", to: "/projects/kalesh" },
      { label: "DIMISI Technologies", to: "/dimisi-technologies" },
      { label: "Shikhar Dixit", to: "/people/shikhar-dixit" },
      { label: "Swatantra Singh", to: "/people/swatantra-singh" },
      { label: "Nishkarsh Mishra", to: "/people/nishkarsh-mishra" },
    ],
  },
  {
    id: "office-inauguration-2026",
    title: "Official Headquarters Inauguration & Corporate Board Mounting",
    category: "Milestone",
    date: "2026-05-16",
    displayDate: "16 – 17 May 2026",
    location: "Swarn Jayanti Vihar, Kanpur, Uttar Pradesh",
    status: "verified",
    summary:
      "The official inauguration ceremony of DIMISI Technologies Private Limited headquarters and the mounting of the corporate board following corporate incorporation.",
    description: [
      "Following official incorporation under the Ministry of Corporate Affairs on 9 April 2026 (CIN: U62013UP2026PTC246506), the founding leadership established a permanent operating headquarters in Kanpur with the blessing and active support of Shikhar Dixit's family.",
      "On 16 May 2026, an inauguration ceremony was held at the new office in Swarn Jayanti Vihar with founding directors Shikhar Dixit (CEO), Swatantra Singh (CTO), Nishkarsh Mishra (COO), and core associates.",
      "The following day, on 17 May 2026, the official DIMISI Technologies corporate board was mounted at the front entrance to complete banking documentation, compliance verification, and client delivery readiness.",
      "The headquarters was reinforced with a passionate cohort of junior contributors (Prashant, Amrit, Anushka, Nisha, Vinay) and commercial associate Somya Tiwari.",
    ],
    highlights: [
      "Official inauguration of permanent Kanpur headquarters on 16 May 2026",
      "Corporate board mounted on 17 May 2026 for statutory and banking compliance",
      "Official banner unveiled displaying CIN: U62013UP2026PTC246506",
      "Headquarters operationalized for commercial client delivery and software scaling",
    ],
    images: [
      {
        src: "/images/bringing dimisi home.jpeg",
        alt: "The DIMISI team with the official DIMISI Technologies corporate banner at the home headquarters",
        caption:
          "Headquarters Archive · 16–17 May 2026: Team inauguration at Swarn Jayanti Vihar, Kanpur under the registered corporate banner.",
      },
    ],
    relatedEntities: [
      { label: "DIMISI Technologies", to: "/dimisi-technologies" },
      { label: "Shikhar Dixit", to: "/people/shikhar-dixit" },
      { label: "Swatantra Singh", to: "/people/swatantra-singh" },
      { label: "Nishkarsh Mishra", to: "/people/nishkarsh-mishra" },
      { label: "Our Journey", to: "/journey" },
    ],
  },
  {
    id: "iit-bombay-esummit-2025",
    title: "IIT Bombay E-Summit 2025 Entrepreneurship Delegation",
    category: "Summit",
    date: "2025-01-28",
    displayDate: "28 January – 4 February 2025",
    location: "IIT Bombay, Powai, Mumbai",
    status: "verified",
    summary:
      "National startup ecosystem exposure, founder pitching, and strategic validation for the CATI / DIMISI founding trio.",
    description: [
      "The founding trio (Shikhar Dixit, Swatantra Singh, and Nishkarsh Mishra) traveled from Kanpur to Mumbai to participate in the prestigious IIT Bombay E-Summit 2025.",
      "The week-long immersion exposed the team to national-scale startups, investor pitch dynamics, and technical product architectures, hardening their resolve to build proprietary technology enterprises.",
    ],
    highlights: [
      "Delegation attendance by all three founding directors in Mumbai",
      "Direct engagement with institutional investors, startup founders, and mentors",
      "Validated the conviction to build scalable consumer software platforms",
    ],
    images: [
      {
        src: "/images/THE LEARNING FROM MUMBAI.jpeg",
        alt: "Founding team at IIT Bombay E-Summit in Mumbai",
        caption:
          "Summit Archive · Jan–Feb 2025: Founders gaining foundational startup exposure at IIT Bombay.",
      },
    ],
    relatedEntities: [
      { label: "Our Journey (Phase 2)", to: "/journey" },
      { label: "DIMISI Technologies", to: "/dimisi-technologies" },
      { label: "Timeline", to: "/timeline" },
    ],
  },
];

const trail = [{ label: "DIMISIPEDIA", to: "/" }, { label: "Events" }];

export const Route = createFileRoute("/events")({
  head: () =>
    pageHead({
      title: "Documented Events & Campaigns — DIMISI Technologies | DIMISIPEDIA",
      description:
        "Official documented events and campaigns involving DIMISI Technologies: Office Inauguration, LinkedIn 30-Day Kalesh Promotion Contest, and IIT Bombay E-Summit.",
      path: "/events",
      schema: [
        buildBreadcrumbSchema(trail, "/events"),
        {
          "@type": "ItemList",
          name: "DIMISI Technologies Documented Events",
          itemListElement: documentedEvents.map((evt, idx) => ({
            "@type": "Event",
            position: idx + 1,
            name: evt.title,
            startDate: evt.date,
            location: {
              "@type": "Place",
              name: evt.location,
            },
            description: evt.summary,
          })),
        },
      ],
    }),
  component: EventsPage,
});

function EventsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered =
    filter === "all" ? documentedEvents : documentedEvents.filter((e) => e.category === filter);

  // Flatten all event images for the full lightbox gallery
  const allImages: LightboxImage[] = documentedEvents.flatMap((evt) =>
    (evt.images ?? []).map((img, i) => ({
      src: img.src,
      alt: img.alt,
      caption: img.caption,
      phaseNumber: evt.category,
      title: evt.title,
    })),
  );

  const openLightbox = (src: string) => {
    const idx = allImages.findIndex((img) => img.src === src);
    if (idx >= 0) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Breadcrumbs trail={trail} />

      <header className="mt-6 border-b border-rule pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-primary">
            <Calendar className="size-3.5" /> Corporate &amp; Campaign Registry
          </span>
          <span className="label-mono">{documentedEvents.length} Documented Events</span>
        </div>
        <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          Documented Events &amp; Campaigns
        </h1>
        <p className="mt-3 max-w-3xl font-serif text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Verifiable record of corporate milestones, product promotional campaigns, and national
          summits conducted by DIMISI Technologies.
        </p>

        {/* Filter Chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            { id: "all", label: `All Events (${documentedEvents.length})` },
            { id: "Milestone", label: "Corporate Milestones" },
            { id: "Campaign", label: "Marketing Campaigns" },
            { id: "Summit", label: "Summits" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer border ${
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground font-medium"
                  : "border-border bg-surface text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      {/* Events List */}
      <div className="mt-12 space-y-16">
        {filtered.map((event) => (
          <article
            key={event.id}
            id={event.id}
            className="scroll-mt-24 border border-border bg-surface p-6 sm:p-8"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  [{event.category}]
                </span>
                <StatusChip status={event.status} />
              </div>
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" /> {event.displayDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" /> {event.location}
                </span>
              </div>
            </div>

            <h2 className="mt-5 font-serif text-2xl sm:text-3xl leading-snug">{event.title}</h2>
            <p className="mt-3 text-base text-muted-foreground font-serif leading-relaxed">
              {event.summary}
            </p>

            {/* Images Showcase */}
            {event.images && event.images.length > 0 ? (
              <div
                className={`my-6 grid gap-4 ${
                  event.images.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
                }`}
              >
                {event.images.map((img, i) => (
                  <figure
                    key={i}
                    className="overflow-hidden border border-rule bg-background flex flex-col justify-between group"
                  >
                    <div
                      onClick={() => openLightbox(img.src)}
                      className="relative flex max-h-[380px] w-full items-center justify-center bg-muted/20 cursor-pointer overflow-hidden"
                      title="Click to view full image"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="max-h-[380px] w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/75 px-2.5 py-1 text-[11px] font-mono text-white opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-xs">
                        <Maximize2 className="size-3" /> Zoom
                      </div>
                    </div>
                    <figcaption className="border-t border-rule p-3 font-mono text-xs text-muted-foreground leading-snug">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : null}

            {/* Narrative text */}
            <div className="prose-editorial mt-6 space-y-3.5 text-sm sm:text-[15px] leading-relaxed">
              {event.description.map((p, idx) => (
                <p key={idx} className="text-foreground/90">
                  {p}
                </p>
              ))}
            </div>

            {/* Key Highlights */}
            {event.highlights && event.highlights.length > 0 ? (
              <div className="mt-8 border border-rule bg-background/50 p-5">
                <p className="label-mono flex items-center gap-1.5 text-primary">
                  <Sparkles className="size-3.5" /> Key Event Takeaways &amp; Impact
                </p>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm">
                  {event.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Related Entities */}
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-rule pt-4">
              <span className="font-mono text-xs text-muted-foreground">Related Entities:</span>
              {event.relatedEntities.map((ent) => (
                <Link
                  key={ent.to}
                  to={ent.to}
                  className="inline-flex items-center gap-1 border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {ent.label} <ArrowRight className="size-3 opacity-60" />
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Footer Navigation CTA */}
      <section className="mt-20 border border-border bg-surface p-8 text-center sm:p-10">
        <h2 className="font-serif text-2xl sm:text-3xl">Explore Complete Technical Chronology</h2>
        <p className="mt-3 max-w-xl mx-auto text-sm text-muted-foreground">
          View all corporate milestones, engineering sprints, and platform deployments in our
          interactive timeline.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/timeline"
            className="inline-flex items-center gap-2 border border-primary bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Open Interactive Timeline <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/journey"
            className="inline-flex items-center gap-2 border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary"
          >
            Read Founder's Chronicle <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={allImages}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
