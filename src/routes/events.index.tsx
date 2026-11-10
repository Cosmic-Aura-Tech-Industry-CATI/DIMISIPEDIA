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
  Award,
} from "lucide-react";
import { Breadcrumbs } from "@/components/EntityArticle";
import { StatusChip } from "@/components/StatusChip";
import { ImageLightbox, type LightboxImage } from "@/components/ImageLightbox";
import { abs, buildBreadcrumbSchema, pageHead, pageId, SITE_URL } from "@/lib/seo";

interface EventImage {
  src: string;
  alt: string;
  caption: string;
}

export interface EventStanding {
  position: string;
  name: string;
  role: string;
  path: string;
  award?: string;
  winner?: boolean;
}

interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: "Milestone" | "Campaign" | "Summit" | "Hackathon";
  date: string;
  displayDate: string;
  location: string;
  status: "verified" | "source-backed";
  summary: string;
  description: string[];
  highlights: string[];
  images?: EventImage[];
  relatedEntities: { label: string; to: string }[];
  standings?: EventStanding[];
  organisedBy?: string;
  distributedBy?: string;
  participatingTeam?: string;
  achievement?: string;
}

const documentedEvents: EventItem[] = [
  {
    id: "iit-kanpur-siic-avinya-2026",
    slug: "iit-kanpur-siic-avinya-2026",
    title: "SIIC Avinya 2026 – Entrepreneurship Innovation Summit & Hackathon",
    category: "Summit",
    date: "2026-10-08",
    displayDate: "8 – 9 October 2026",
    location: "IIT Kanpur, Uttar Pradesh, India",
    status: "verified",
    organisedBy: "Startup Incubation and Innovation Centre (SIIC), IIT Kanpur",
    participatingTeam: "Team DIMISI",
    achievement: "4th Position – Finalist",
    summary:
      "Team DIMISI proudly participated in Avinya 2026, an Entrepreneurship Innovation Summit and Hackathon organised by the Startup Incubation and Innovation Centre (SIIC), IIT Kanpur, successfully securing 4th Position as Finalists representing DIMISI Technologies Pvt. Ltd.",
    description: [
      "Team DIMISI proudly participated in Avinya 2026, an Entrepreneurship Innovation Summit and Hackathon organised by the Startup Incubation and Innovation Centre (SIIC), IIT Kanpur.",
      "Representing DIMISI Technologies Pvt. Ltd., our team showcased its innovation, technical capabilities, entrepreneurial vision, and problem-solving approach among aspiring innovators and startups.",
      "After competing and presenting our work, Team DIMISI successfully secured a place among the finalists and achieved 4th Position at IIT Kanpur SIIC Avinya 2026.",
      "This achievement marks an important milestone in DIMISI's entrepreneurial journey and reflects our commitment to innovation, teamwork, and building technology-driven solutions.",
    ],
    highlights: [
      "Participation in IIT Kanpur's Avinya 2026",
      "Entrepreneurship and innovation-focused hackathon",
      "Selected as finalists",
      "Secured 4th Position",
      "Represented DIMISI Technologies Pvt. Ltd.",
    ],
    images: [
      {
        src: "/images/siic-avinya-2026-achievement-banner.jpeg",
        alt: "Team DIMISI 4th Position Finalist Achievement Banner at IIT Kanpur SIIC Avinya 2026 Entrepreneurship Summit & Hackathon",
        caption:
          "Official Achievement Banner · 8–9 October 2026: Team DIMISI securing 4th Position and Finalist honors at IIT Kanpur SIIC Avinya 2026 with Founder & CEO Shikhar Dixit presenting.",
      },
      {
        src: "/images/team-dimisi-avinya-2026-group.jpeg",
        alt: "Team DIMISI group photograph at the Avinya 2026 venue at IIT Kanpur",
        caption:
          "Venue Delegation · 8–9 October 2026: Team DIMISI group photograph at the Avinya 2026 venue backdrop, IIT Kanpur, led by Founder & CEO Shikhar Dixit.",
      },
      {
        src: "/images/team-dimisi-avinya-2026-full-length.jpeg",
        alt: "Full-length team photograph of Team DIMISI at IIT Kanpur SIIC Avinya 2026",
        caption:
          "Official Team Photograph · 8–9 October 2026: Full-length delegation of Team DIMISI representing DIMISI Technologies Pvt. Ltd. at IIT Kanpur.",
      },
    ],
    standings: [
      {
        position: "4th Position",
        name: "Team DIMISI",
        role: "Finalist Delegation · Entrepreneurship Innovation Summit & Hackathon",
        path: "/organizations/dimisi-technologies",
        award: "4th Position – Finalist",
        winner: true,
      },
    ],
    relatedEntities: [
      { label: "DIMISI Technologies", to: "/organizations/dimisi-technologies" },
      { label: "Shikhar Dixit (CEO)", to: "/people/shikhar-dixit" },
      { label: "Swatantra Singh (CTO)", to: "/people/swatantra-singh" },
      { label: "Nishkarsh Mishra (COO)", to: "/people/nishkarsh-mishra" },
      { label: "Our Journey", to: "/journey" },
      { label: "Timeline", to: "/timeline" },
    ],
  },
  {
    id: "team-id-cards-ceremony",
    slug: "team-id-cards-ceremony",
    title: "Team ID Cards & T-Shirts Distribution Ceremony",
    category: "Milestone",
    date: "2026-10-06",
    displayDate: "6 October 2026",
    location: "DIMISI Technologies Headquarters, Kanpur, Uttar Pradesh",
    status: "verified",
    organisedBy: "DIMISI Technologies Pvt. Ltd.",
    distributedBy: "Nishkarsh Mishra",
    summary:
      "On 6th October 2026, DIMISI Technologies Pvt. Ltd. organised an internal team distribution ceremony where Nishkarsh Mishra distributed official DIMISI-branded T-shirts and company ID cards to the entire team.",
    description: [
      "On 6th October 2026, DIMISI Technologies Pvt. Ltd. organised an internal team distribution ceremony where Nishkarsh Mishra distributed official DIMISI-branded T-shirts and company ID cards to the entire team.",
      "The event marked an important step towards strengthening team identity, professionalism, unity, and a sense of belonging within the DIMISI family.",
      "Attended by executive leadership, founding directors Shikhar Dixit (Founder & CEO), Swatantra Singh (Co-Founder & CTO), Nishkarsh Mishra (Co-Founder & COO), and the full developer and operations cohort, the ceremony celebrated the growing strength and cultural unity of DIMISI Technologies.",
    ],
    highlights: [
      "Internal team distribution ceremony organised by DIMISI Technologies Pvt. Ltd. on 6 October 2026",
      "Official DIMISI-branded corporate T-shirts and company ID cards distributed to the entire team by Nishkarsh Mishra",
      "Important milestone strengthening team identity, professionalism, unity, and a sense of belonging",
      "Celebrated alongside executive leadership and the full core development and marketing cohort",
    ],
    images: [
      {
        src: "/images/team-id-cards-and-tshirts-distribution.jpeg",
        alt: "The DIMISI Technologies team wearing official branded black T-shirts and corporate ID cards during the distribution ceremony",
        caption:
          "Team Identity Ceremony · 6 October 2026: Team members and leadership proudly wearing their official DIMISI-branded black T-shirts and corporate ID cards at headquarters.",
      },
      {
        src: "/images/team-id-cards-and-tshirts-ceremony.jpeg",
        alt: "DIMISI Technologies team members and leadership celebrating the ID cards and T-shirts distribution ceremony",
        caption:
          "Corporate Culture Archive · 6 October 2026: The entire DIMISI team alongside Nishkarsh Mishra celebrating the corporate distribution ceremony.",
      },
    ],
    relatedEntities: [
      { label: "DIMISI Technologies", to: "/organizations/dimisi-technologies" },
      { label: "Shikhar Dixit (CEO)", to: "/people/shikhar-dixit" },
      { label: "Nishkarsh Mishra", to: "/people/nishkarsh-mishra" },
      { label: "Swatantra Singh (CTO)", to: "/people/swatantra-singh" },
      { label: "Our Journey", to: "/journey" },
    ],
  },
  {
    id: "dimisi-foundation-day-2026",
    slug: "dimisi-foundation-day-2026",
    title: "DIMISI Foundation & Incorporation Day (MCA Registration)",
    category: "Milestone",
    date: "2026-04-09",
    displayDate: "9 April 2026",
    location: "Kanpur, Uttar Pradesh, India",
    status: "verified",
    organisedBy: "Ministry of Corporate Affairs, Government of India",
    achievement: "Corporate Incorporation (CIN: U62013UP2026PTC246506)",
    summary:
      "The formal statutory incorporation of DIMISI Technologies Private Limited under the Ministry of Corporate Affairs, Government of India, following an intensive sprint from documentation to registration.",
    description: [
      "On 9 April 2026, DIMISI Technologies Private Limited was officially granted its Certificate of Incorporation by the Registrar of Companies, Ministry of Corporate Affairs, Government of India, under CIN U62013UP2026PTC246506.",
      "The milestone formalized the transition of CATI (Cosmic Aura Tech Industry) into a registered corporate entity founded by Shikhar Dixit (CEO), Swatantra Singh (CTO), and Nishkarsh Mishra (COO).",
    ],
    highlights: [
      "Official MCA Certificate of Incorporation issued on 9 April 2026",
      "Corporate Identification Number (CIN): U62013UP2026PTC246506",
      "Registered office established in Kanpur, Uttar Pradesh",
      "Founding directors appointed: Shikhar Dixit, Swatantra Singh, Nishkarsh Mishra",
    ],
    images: [
      {
        src: "/images/bringing dimisi home.webp",
        alt: "DIMISI Technologies founding milestone celebration",
        caption:
          "Foundation Archive · 9 April 2026: Corporate incorporation milestone of DIMISI Technologies Private Limited.",
      },
    ],
    relatedEntities: [
      { label: "DIMISI Technologies", to: "/organizations/dimisi-technologies" },
      { label: "Shikhar Dixit (CEO)", to: "/people/shikhar-dixit" },
      { label: "Swatantra Singh (CTO)", to: "/people/swatantra-singh" },
      { label: "Nishkarsh Mishra (COO)", to: "/people/nishkarsh-mishra" },
      { label: "Our Journey", to: "/journey" },
    ],
  },
  {
    id: "office-inauguration-2026",
    slug: "office-inauguration-2026",
    title: "Official Headquarters Inauguration & Corporate Board Mounting",
    category: "Milestone",
    date: "2026-05-16",
    displayDate: "16 – 17 May 2026",
    location: "Swarn Jayanti Vihar, Kanpur, Uttar Pradesh",
    status: "verified",
    organisedBy: "DIMISI Technologies Pvt. Ltd.",
    summary:
      "The official inauguration ceremony of DIMISI Technologies Private Limited headquarters and the mounting of the corporate board following corporate incorporation.",
    description: [
      "Following official incorporation under the Ministry of Corporate Affairs on 9 April 2026 (CIN: U62013UP2026PTC246506), the founding leadership established a permanent operating headquarters in Kanpur with the blessing and active support of Shikhar Dixit's family.",
      "On 16 May 2026, an inauguration ceremony was held at the new office in Swarn Jayanti Vihar with founding directors Shikhar Dixit (CEO), Swatantra Singh (CTO), Nishkarsh Mishra (COO), and core associates.",
      "The following day, on 17 May 2026, the official DIMISI Technologies corporate board was mounted at the front entrance to complete banking documentation, compliance verification, and client delivery readiness.",
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
      { label: "DIMISI Technologies", to: "/organizations/dimisi-technologies" },
      { label: "Shikhar Dixit", to: "/people/shikhar-dixit" },
      { label: "Swatantra Singh", to: "/people/swatantra-singh" },
      { label: "Nishkarsh Mishra", to: "/people/nishkarsh-mishra" },
      { label: "Our Journey", to: "/journey" },
    ],
  },
  {
    id: "linkedin-30days-kalesh-contest",
    slug: "linkedin-30days-kalesh-contest",
    title: "LinkedIn 30-Day Kalesh Promotion & Content Creator Challenge",
    category: "Campaign",
    date: "2026-08-15",
    displayDate: "15 August 2026",
    location: "LinkedIn & Campus Social Networks",
    status: "source-backed",
    organisedBy: "DIMISI Technologies Pvt. Ltd.",
    summary:
      "A high-impact 30-day viral storytelling and campus creator contest on LinkedIn celebrating student growth, concluding on 15 August 2026 with an official award presentation ceremony.",
    description: [
      "To drive organic user adoption and nationwide campus awareness for Kalesh (the anonymous social polling and campus engagement platform), the founding team launched an intensive 30-day posting and promotion contest on LinkedIn.",
      "The initiative challenged student creators, engineering campus influencers, and developers to share daily authentic startup stories, viral opinion polls, engineering breakdowns, and campus culture reflections centered around the iconic tagline 'Chalo Kalesh Karey'.",
      "Over the course of 30 days, the campaign generated significant organic impressions across student engineering networks, establishing strong word-of-mouth growth and direct download traffic to TheKalesh.com without paid marketing expenditure.",
      "On 15 August 2026, at the conclusion of the challenge, the founding directors hosted a celebratory felicitation ceremony, presenting 1st Prize Winner Prashant Umrao with an official DIMISI Technologies Certificate of Achievement and custom awards.",
    ],
    standings: [
      {
        position: "1st Position",
        name: "Prashant Umrao",
        role: "Full Stack Developer Intern & Tester",
        path: "/people/prashant-umrao",
        award: "1st Prize Winner & Trophy Recipient",
        winner: true,
      },
      {
        position: "2nd Position",
        name: "Harsh Mishra",
        role: "Full Stack Web Developer",
        path: "/people/harsh-mishra",
        award: "2nd Position Holder",
      },
      {
        position: "3rd Position",
        name: "Somya Tiwari",
        role: "Full Stack Developer & Client Project Manager",
        path: "/people/somya-tiwari",
        award: "3rd Position Holder",
      },
      {
        position: "4th Position",
        name: "Anushka Tripathi",
        role: "Full Stack Web Developer Intern",
        path: "/people/anushka-tripathi",
        award: "4th Position Holder",
      },
      {
        position: "5th Position",
        name: "Amrit Awasthi",
        role: "Android Developer Intern (Flutter / DART)",
        path: "/people/amrit-awasthi",
        award: "5th Position Holder",
      },
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
      { label: "Prashant Umrao (1st)", to: "/people/prashant-umrao" },
      { label: "Harsh Mishra (2nd)", to: "/people/harsh-mishra" },
      { label: "Somya Tiwari (3rd)", to: "/people/somya-tiwari" },
      { label: "Anushka Tripathi (4th)", to: "/people/anushka-tripathi" },
      { label: "Amrit Awasthi (5th)", to: "/people/amrit-awasthi" },
      { label: "Kalesh", to: "/products/kalesh" },
      { label: "DIMISI Technologies", to: "/organizations/dimisi-technologies" },
      { label: "Shikhar Dixit", to: "/people/shikhar-dixit" },
    ],
  },
  {
    id: "axis-hacksprint-2",
    slug: "axis-hacksprint-2",
    title: "Axis HackSprint 2.0 — Official Technical Mentorship",
    category: "Hackathon",
    date: "2026-03-20",
    displayDate: "March 2026",
    location: "Axis Colleges, Kanpur, UP",
    status: "verified",
    achievement: "Technical Mentorship by Shikhar Dixit",
    summary:
      "Collegiate hackathon hosted at Axis Colleges where Shikhar Dixit served as official Technical Mentor, guiding student teams in systems architecture, database schemas, and product delivery.",
    description: [
      "Axis HackSprint 2.0 was an intensive competitive hackathon organized to test student teams across software design, algorithms, and real-time product creation.",
      "Shikhar Dixit participated as an official Mentor, advising participants on API design, database schemas, full-stack deployment, and venture pitching.",
    ],
    highlights: [
      "Official technical mentorship provided by Founder & CEO Shikhar Dixit",
      "Mentored student engineering cohorts on API design and full-stack software architectures",
      "Campus ecosystem leadership at Axis Colleges",
    ],
    images: [
      {
        src: "/images/mentorship and library.webp",
        alt: "Shikhar Dixit mentoring collegiate software developers",
        caption:
          "Mentorship Archive · March 2026: Shikhar Dixit guiding student developers during Axis HackSprint 2.0.",
      },
    ],
    relatedEntities: [
      { label: "Shikhar Dixit", to: "/people/shikhar-dixit" },
      { label: "DIMISI Technologies", to: "/organizations/dimisi-technologies" },
    ],
  },
  {
    id: "gandhigiri-project-showcase",
    slug: "gandhigiri-project-showcase",
    title: "Gandhigiri Technical Project Showcase 2024 (Catalyst Event)",
    category: "Milestone",
    date: "2024-10-15",
    displayDate: "15 October 2024",
    location: "Axis College, Kanpur, Uttar Pradesh",
    status: "source-backed",
    achievement: "6-Hour Face Recognition System Sprint & Founding of CATI",
    summary:
      "The pivotal collegiate technical presentation where Shikhar Dixit and Swatantra Singh built and demonstrated a Face Recognition System in 6 hours, leading to the creation of CATI and DIMISI Technologies.",
    description: [
      "Learning about the Gandhigiri technical competition on the morning of 15 October 2024, Shikhar Dixit teamed up with Swatantra Singh.",
      "Working relentlessly over 6–7 hours at home, they trained and deployed a working facial recognition platform that earned widespread commendation from college faculty.",
      "That evening, Dixit and Singh agreed to form a technology partnership, initiating the startup journey that resulted in the corporate incorporation of DIMISI Technologies Private Limited.",
    ],
    highlights: [
      "6-hour rapid engineering sprint building a Computer Vision Face Recognition System",
      "High commendation from engineering faculty at Axis College",
      "Catalyzed the technology partnership between Shikhar Dixit and Swatantra Singh",
      "Led to the founding of Cosmic Aura Tech Industry (CATI) with Nishkarsh Mishra",
    ],
    images: [
      {
        src: "/images/dimisi-logo.webp",
        alt: "Foundational milestone of DIMISI Technologies",
        caption:
          "Founding Chronicle · 15 October 2024: The catalyst engineering sprint that launched the startup journey.",
      },
    ],
    relatedEntities: [
      { label: "Shikhar Dixit", to: "/people/shikhar-dixit" },
      { label: "Swatantra Singh", to: "/people/swatantra-singh" },
      { label: "Nishkarsh Mishra", to: "/people/nishkarsh-mishra" },
      { label: "Our Journey", to: "/journey" },
    ],
  },
  {
    id: "iit-bombay-esummit-2025",
    slug: "iit-bombay-esummit-2025",
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
      { label: "Our Journey", to: "/journey" },
      { label: "DIMISI Technologies", to: "/organizations/dimisi-technologies" },
      { label: "Timeline", to: "/timeline" },
    ],
  },
];

const trail = [{ label: "DIMISIPEDIA", to: "/" }, { label: "Events" }];

export const Route = createFileRoute("/events/")({
  head: () =>
    pageHead({
      title: "Documented Events & Campaigns — DIMISI Technologies | DIMISIPEDIA",
      description:
        "Official documented events and campaigns involving DIMISI Technologies: SIIC Avinya 2026 Entrepreneurship Hackathon at IIT Kanpur, Team ID Cards & T-Shirts Distribution Ceremony, Office Inauguration, LinkedIn 30-Day Kalesh Promotion Contest, and IIT Bombay E-Summit.",
      path: "/events",
      schema: [
        buildBreadcrumbSchema(trail, "/events"),
        {
          "@type": "CollectionPage",
          "@id": pageId("/events"),
          url: abs("/events"),
          name: "Documented Events & Campaigns — DIMISI Technologies | DIMISIPEDIA",
          description:
            "Official documented events and campaigns involving DIMISI Technologies: SIIC Avinya 2026 Entrepreneurship Hackathon at IIT Kanpur, Team ID Cards & T-Shirts Distribution Ceremony, Office Inauguration, LinkedIn 30-Day Kalesh Promotion Contest, and IIT Bombay E-Summit.",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          breadcrumb: { "@id": `${abs("/events")}#breadcrumb` },
          mainEntity: {
            "@type": "ItemList",
            name: "DIMISI Technologies Documented Events & Campaigns",
            itemListElement: documentedEvents.map((evt, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: evt.title,
              url: abs(`/events/${evt.slug}`),
              description: evt.summary,
              ...(evt.images && evt.images[0] ? { image: abs(evt.images[0].src) } : {}),
            })),
          },
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
    (evt.images ?? []).map((img) => ({
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
            { id: "Hackathon", label: "Hackathons" },
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
                {event.achievement ? (
                  <span className="inline-flex items-center gap-1 border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                    <Trophy className="size-3 text-primary" /> {event.achievement}
                  </span>
                ) : null}
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

            <div className="mt-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <h2 className="font-serif text-2xl sm:text-3xl leading-snug">
                <Link
                  to={`/events/${event.slug}`}
                  className="hover:text-primary transition-colors underline-offset-4 hover:underline"
                >
                  {event.title}
                </Link>
              </h2>
              <Link
                to={`/events/${event.slug}`}
                className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline shrink-0"
              >
                Canonical Dossier <ArrowRight className="size-3" />
              </Link>
            </div>

            {/* Achievement & Delegation Highlight Callout */}
            {event.achievement ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 border border-primary bg-primary/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-primary shadow-xs">
                  <Trophy className="size-3.5 text-primary" /> Achievement: {event.achievement}
                </span>
                {event.participatingTeam ? (
                  <span className="inline-flex items-center gap-1.5 border border-border bg-surface px-3 py-1 font-mono text-xs font-medium text-foreground">
                    <Users className="size-3.5 text-primary" /> Participating Team:{" "}
                    {event.participatingTeam}
                  </span>
                ) : null}
              </div>
            ) : null}

            <p className="mt-3 text-base text-muted-foreground font-serif leading-relaxed">
              {event.summary}
            </p>

            {event.organisedBy || event.distributedBy ? (
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-rule/60 py-2.5 font-mono text-xs text-muted-foreground">
                {event.organisedBy ? (
                  <span>
                    <strong className="text-foreground font-semibold">Organised By:</strong>{" "}
                    {event.organisedBy}
                  </span>
                ) : null}
                {event.distributedBy ? (
                  <span>
                    <strong className="text-foreground font-semibold">Distributed By:</strong>{" "}
                    {event.distributedBy}
                  </span>
                ) : null}
              </div>
            ) : null}

            {/* Images Showcase */}
            {event.images && event.images.length > 0 ? (
              <div
                className={`my-6 grid gap-4 ${
                  event.images.length === 1
                    ? "grid-cols-1"
                    : event.images.length === 2
                      ? "sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {event.images.map((img, i) => (
                  <figure
                    key={i}
                    className={`overflow-hidden border border-rule bg-background flex flex-col justify-between group ${
                      event.images && event.images.length === 3 && i === 0
                        ? "sm:col-span-2 lg:col-span-1"
                        : ""
                    }`}
                  >
                    <div
                      onClick={() => openLightbox(img.src)}
                      className="relative flex max-h-[380px] w-full items-center justify-center bg-muted/20 cursor-pointer overflow-hidden"
                      title="Click to view full image"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={600}
                        height={380}
                        loading="lazy"
                        decoding="async"
                        className="max-h-[380px] w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/75 px-2.5 py-1 text-[11px] font-mono text-white opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-xs">
                        <Maximize2 className="size-3" /> Zoom
                      </div>
                      {event.images && event.images.length === 3 && i === 0 ? (
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
                          Primary Cover
                        </div>
                      ) : null}
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

            {/* Official Standings / Rankings */}
            {event.standings && event.standings.length > 0 ? (
              <div className="mt-8 border border-border bg-background/60 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
                  <p className="label-mono flex items-center gap-1.5 text-primary">
                    <Trophy className="size-3.5" /> Official Competition Standings &amp; Rankings
                  </p>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    DIMISI Verified Archive
                  </span>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-rule text-muted-foreground">
                        <th className="pb-2.5 font-normal tracking-wider uppercase text-[11px]">
                          Position
                        </th>
                        <th className="pb-2.5 font-normal tracking-wider uppercase text-[11px]">
                          Person
                        </th>
                        <th className="pb-2.5 font-normal tracking-wider uppercase text-[11px] hidden sm:table-cell">
                          Role
                        </th>
                        <th className="pb-2.5 font-normal tracking-wider uppercase text-[11px] text-right">
                          Recognition
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule font-sans">
                      {event.standings.map((s) => (
                        <tr
                          key={s.position}
                          className="group hover:bg-surface/60 transition-colors"
                        >
                          <td className="py-3 font-mono text-xs font-semibold text-primary whitespace-nowrap">
                            <span
                              className={`inline-block px-2 py-0.5 border ${
                                s.winner
                                  ? "border-primary/60 bg-primary/10 text-primary font-bold"
                                  : "border-border bg-surface text-foreground"
                              }`}
                            >
                              {s.position}
                            </span>
                          </td>
                          <td className="py-3 font-medium">
                            <Link
                              to={s.path}
                              className="inline-flex items-center gap-1 font-serif text-sm sm:text-base text-foreground underline-offset-4 group-hover:text-primary group-hover:underline"
                            >
                              {s.name}
                              <ArrowRight className="size-3 opacity-50 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                            <span className="block font-sans text-xs text-muted-foreground sm:hidden mt-0.5">
                              {s.role}
                            </span>
                          </td>
                          <td className="py-3 text-xs text-muted-foreground hidden sm:table-cell">
                            {s.role}
                          </td>
                          <td className="py-3 text-xs text-right font-mono text-muted-foreground">
                            {s.award}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

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

            {/* Related Entities & Full Dossier Link */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-4">
              <div className="flex flex-wrap items-center gap-2">
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

              <Link
                to={`/events/${event.slug}`}
                className="inline-flex items-center gap-1.5 border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                View Full Dossier &amp; Citations <ArrowRight className="size-3.5" />
              </Link>
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
