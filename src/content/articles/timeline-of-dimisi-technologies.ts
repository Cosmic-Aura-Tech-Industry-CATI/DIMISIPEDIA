import type { Article } from "@/data/articles";

/**
 * Chronological documentary article: Timeline of DIMISI Technologies
 */
export const article: Article = {
  id: "article-timeline-of-dimisi-technologies",
  slug: "timeline-of-dimisi-technologies",
  title: "Timeline of Key Milestones: DIMISI Technologies (2024–2026)",
  excerpt:
    "A structured chronological review of all major milestones in the development of DIMISI Technologies and its ecosystem products, from initial hackathons to corporate incorporation.",
  authorId: "editorial",
  category: "Startup",
  tags: ["Timeline", "Milestones", "DIMISI Technologies", "Kalesh", "Corporate Records", "Founders"],
  datePublished: "2026-08-21",
  dateModified: "2026-08-21",
  status: "published",
  featured: false,
  content: [
    {
      type: "p",
      text: "The development of DIMISI Technologies Private Limited is characterized by distinct verifiable milestones spanning collegiate engineering projects, national startup summits, rapid software prototyping, dedicated incubator office allocation, and formal corporate incorporation.",
    },
    { type: "h2", id: "milestones-2024", text: "2024: The Genesis of CATI" },
    {
      type: "ul",
      items: [
        "15 October 2024 — Gandhigiri Face Recognition Project: Shikhar Dixit and Swatantra Singh engineer an automated face recognition system in under 7 hours, leading to the formation of Cosmic Aura Tech Industry (CATI) with Nishkarsh Mishra.",
        "October 2024 — AICTE IDEA Lab Prototyping: The early team utilizes campus laboratory hardware to experiment with image processing and scalable web services.",
      ],
    },
    { type: "h2", id: "milestones-2025", text: "2025: Summits, Prototypes & Team Expansion" },
    {
      type: "ul",
      items: [
        "28 January – 4 February 2025 — IIT Bombay E-Summit: Founders attend technical entrepreneurship workshops and pitch competitions in Mumbai.",
        "13 November 2025 — Poll-Social Prototype: Shikhar Dixit writes the initial prototype code for an anonymous social voting application, deploying it on Netlify.",
        "17 November 2025 — Team Onboarding & 'Chalo Kalesh Karey': Rebranded as Kalesh, Sheelu Singh (Flutter) and Mridul Mishra (Linux/Backend) join core development.",
      ],
    },
    { type: "h2", id: "milestones-2026", text: "2026: Workspace Allocation, Branding & Incorporation" },
    {
      type: "ul",
      items: [
        "February 2026 — Sand Tank Workspace Allocation: College administration grants official on-campus office space to the team in the Sand Tank area.",
        "March 2026 — The 'DIMISI' Name Construction: Shikhar Dixit devises the brand formula DI (Dixit) + MI (Mishra) + SI (Singh) during examination period.",
        "9 April 2026 — MCA Incorporation: DIMISI Technologies Private Limited officially registered with CIN U62013UP2026PTC246506.",
        "April 2026 – Present — Enterprise Client Deals & DIMISIPEDIA: Securing commercial IT consulting contracts and launching the DIMISIPEDIA verification platform.",
      ],
    },
    { type: "h2", id: "entities", text: "Documented Entity Relationships" },
    { type: "entity", entityId: "dimisi-technologies", note: "The central corporate organization." },
    { type: "entity", entityId: "shikhar-dixit", note: "Founder, CEO & Director." },
    { type: "entity", entityId: "kalesh", note: "Flagship social platform." },
  ],
  sourceIds: ["src-mca-dimisi", "src-dimisi-tech-web", "src-kalesh-app", "src-iit-bombay-summit"],
  relatedEntities: ["dimisi-technologies", "shikhar-dixit", "kalesh"],
  seoTitle: "Timeline of DIMISI Technologies (2024–2026) | Milestones Record",
  seoDescription:
    "Complete chronological timeline of DIMISI Technologies: key milestones from the 2024 face recognition project to CATI, Kalesh, and MCA corporate registration.",
};
