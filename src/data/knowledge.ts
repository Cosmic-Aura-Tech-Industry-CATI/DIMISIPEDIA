/**
 * DIMISIPEDIA knowledge base (v1, file-backed).
 *
 * DATA INTEGRITY RULE: nothing in this file may be invented. Every value here
 * comes from information supplied by DIMISI Technologies. Where a value is not
 * known, the field exists but is left empty and the status is "needs-verification".
 */

export type EntityType = "organization" | "person" | "project" | "technology" | "event" | "article";

export type InfoStatus =
  | "verified"
  | "source-backed"
  | "documented"
  | "needs-verification"
  | "disputed"
  | "unverified"
  | "historical"
  | "archived"
  | "official";

export type LifecycleStatus =
  | "Concept"
  | "Research"
  | "Prototype"
  | "Development"
  | "Active"
  | "Paused"
  | "Archived"
  | "Discontinued";

export type SourceType =
  | "Official Website"
  | "Government Record"
  | "Company Announcement"
  | "Press Coverage"
  | "Interview"
  | "Event Page"
  | "Institutional Source"
  | "Project Documentation"
  | "Social Profile"
  | "Third-party Database"
  | "Other";

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  publishedAt?: string;
  type: SourceType;
  relatedEntities: string[];
  claim: string;
  addedAt: string;
  status: InfoStatus;
}

export type RelationshipType =
  | "Founded by"
  | "Founded"
  | "Works at"
  | "Leads"
  | "Developed by"
  | "Develops"
  | "Maintained by"
  | "Created by"
  | "Associated with"
  | "Part of"
  | "Uses technology"
  | "Used by"
  | "Participated in"
  | "Documented by"
  | "Documents"
  | "Founder of"
  | "Co-Founder of"
  | "Director of"
  | "CEO of"
  | "CTO of"
  | "CMO of"
  | "COO of"
  | "Product leadership"
  | "Technical leadership"
  | "Engineering"
  | "Marketing"
  | "Growth"
  | "Operations"
  | "Operational association"
  | "Led by"
  | "Studied at"
  | "Worked at"
  | "Related to";

export interface Relationship {
  from: string;
  type: RelationshipType;
  to: string;
}

export interface Revision {
  n: number;
  date: string;
  editor: string;
  change: string;
}

export interface SectionImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Section {
  id: string;
  heading: string;
  body: string[];
  images?: SectionImage[];
  status?: InfoStatus;
}

export interface Fact {
  label: string;
  value: string;
  status?: InfoStatus;
  sourceIds?: string[];
}

export type ClaimType =
  | "Confirmed role"
  | "Descriptive claim"
  | "Project association"
  | "Corporate claim"
  | "Historical claim"
  | "Educational claim";

export interface Claim {
  claim: string;
  claimType: ClaimType;
  sourceIds: string[];
  verification: InfoStatus;
  disputed?: boolean;
  dateAdded: string;
  lastVerified?: string;
  editor: string;
}

export interface RoleRecord {
  title: string;
  organization: string;
  status: InfoStatus;
  note?: string;
  sourceIds?: string[];
}

export interface EducationRecord {
  institution: string;
  qualification: string;
  field?: string;
  period?: string;
  result?: string;
  note?: string;
  status: InfoStatus;
}

export interface ExperienceRecord {
  organization: string;
  role: string;
  period?: string;
  note?: string;
  status: InfoStatus;
}

export interface ExternalProfile {
  label: string;
  url?: string;
  verified: boolean;
  note?: string;
}

export interface QA {
  q: string;
  a: string;
}

export interface Entity {
  id: string;
  slug: string;
  path: string;
  entityType: EntityType;
  category?: string;
  projectType?: string;
  featuredPriority?: number;
  statusBadge?: string;
  tags?: string[];
  name: string;
  subtitle: string;
  image?: string;
  shortDescription: string;
  answer: string; // AEO: direct factual answer
  lifecycle?: LifecycleStatus;
  areas?: string[];
  roles?: RoleRecord[];
  education?: EducationRecord[];
  experience?: ExperienceRecord[];
  externalProfiles?: ExternalProfile[];
  claims?: Claim[];
  questions?: QA[];
  faqs?: { question: string; answer: string }[];
  knowsAbout?: string[];
  sameAs?: string[];
  facts: Fact[];
  sections: Section[];
  coverage: { area: string; status: InfoStatus; note: string }[];
  officialLinks: { label: string; url: string; official: boolean }[];
  sourceIds: string[];
  revisions: Revision[];
  createdAt: string;
  updatedAt: string;
  verifiedAt?: string;
  seoTitle: string;
  seoDescription: string;
  disambiguatingDescription?: string;
  gender?: string;
  awards?: string[];
  birthDate?: string;
}

import {
  founderEntities,
  founderRelationships,
  founderSources,
  founderTimeline,
  foundingLeadership,
} from "./founders";

export { foundingLeadership };

export const ORG_NAME = "DIMISI Technologies Pvt. Ltd.";

const baseSources: Source[] = [
  {
    id: "src-dimisi-official",
    title: "DIMISI Technologies — official website",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    url: "https://dimisi.tech",
    type: "Official Website",
    relatedEntities: ["dimisi-technologies"],
    claim: "Primary official web presence of DIMISI Technologies Pvt. Ltd.",
    addedAt: "2026-08-15",
    status: "official",
  },
  {
    id: "src-kalesh-official",
    title: "Kalesh — official website",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    url: "https://thekalesh.com",
    type: "Official Website",
    relatedEntities: ["kalesh"],
    claim: "Official web domain recorded for the Kalesh project.",
    addedAt: "2026-08-15",
    status: "source-backed",
  },
  {
    id: "src-incorporation",
    title: "Incorporation record — DIMISI Technologies Pvt. Ltd.",
    publisher: "Company records provided by DIMISI Technologies",
    type: "Company Announcement",
    relatedEntities: ["dimisi-technologies"],
    claim: "Incorporation date recorded as 9 April 2026, Kanpur, Uttar Pradesh, India.",
    addedAt: "2026-08-15",
    status: "needs-verification",
  },
  {
    id: "src-team-roster",
    title: "DIMISI Technologies team roster",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    type: "Project Documentation",
    relatedEntities: [
      "shikhar-dixit",
      "nishkarsh-mishra",
      "swatantra-singh",
      "sheelu-singh",
      "mridul-mishra",
    ],
    claim: "Names and current roles of DIMISI Technologies team members.",
    addedAt: "2026-08-15",
    status: "documented",
  },
  {
    id: "src-kalesh-docs",
    title: "Kalesh project documentation",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    type: "Project Documentation",
    relatedEntities: ["kalesh"],
    claim:
      "Product concepts and prototype/development technology associated with the Kalesh project.",
    addedAt: "2026-08-15",
    status: "documented",
  },
  {
    id: "src-kalesh-msme",
    title: "Team Kalesh at the MSME Entrepreneurship Conclave & Exhibition",
    publisher: "LinkedIn — Shikhar Dixit",
    url: "https://www.linkedin.com/in/shikhar040",
    type: "Social Profile",
    relatedEntities: ["kalesh", "shikhar-dixit"],
    claim:
      "Public post recording Kalesh team participation in the MSME Entrepreneurship Conclave & Exhibition and naming team members.",
    addedAt: "2026-08-15",
    status: "source-backed",
  },
  {
    id: "src-kalesh-hiring",
    title: "Kalesh — Android Developer internship announcement",
    publisher: "LinkedIn",
    type: "Company Announcement",
    relatedEntities: ["kalesh"],
    claim:
      "Public hiring announcement documenting Flutter, Dart, Android development, REST API integration, real-time polling, backend APIs, Firebase/real-time databases and Git as technologies used on Kalesh.",
    addedAt: "2026-08-15",
    status: "source-backed",
  },
  {
    id: "src-dimisipedia-spec",
    title: "DIMISIPEDIA product requirements document",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    type: "Project Documentation",
    relatedEntities: ["dimisipedia"],
    claim: "Purpose, architecture and editorial principles of DIMISIPEDIA.",
    addedAt: "2026-08-15",
    status: "documented",
  },
  {
    id: "src-rudra-official",
    title: "Rudra Tours & Travels — official website",
    publisher: "Rudra Tours & Travels",
    url: "https://www.toursbyrudra.com",
    type: "Official Website",
    relatedEntities: ["rudra-tours", "dimisi-technologies"],
    claim: "Live client web platform developed by DIMISI Technologies with tour packages, routes, vehicle catalogue, and local SEO structure.",
    addedAt: "2026-09-04",
    status: "source-backed",
  },
  {
    id: "src-yadhuvanshi-official",
    title: "Yadhuvanshi Tours & Travels — official website",
    publisher: "Yadhuvanshi Tours & Travels",
    url: "https://www.yadhuvanshitours.com",
    type: "Official Website",
    relatedEntities: ["yadhuvanshi-tours", "dimisi-technologies"],
    claim: "Live premium client web platform developed by DIMISI Technologies with destination discovery, wedding travel, vehicle showcase, and search intent architecture.",
    addedAt: "2026-09-04",
    status: "source-backed",
  },
  {
    id: "src-dimisi-client-portfolio",
    title: "DIMISI Technologies Client Project Records",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    type: "Project Documentation",
    relatedEntities: ["rudra-tours", "yadhuvanshi-tours", "dimisi-technologies"],
    claim: "Documentation of end-to-end digital transformation, Next.js development, SEO, AEO, and GEO optimization delivered for commercial clients.",
    addedAt: "2026-09-04",
    status: "source-backed",
  },
  {
    id: "src-kaand-dev",
    title: "KAAND — Mobile News & Media Platform Development Records",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    type: "Project Documentation",
    relatedEntities: ["kaand", "dimisi-technologies", "amrat-awasthi"],
    claim: "Mobile-first news application under development with Flutter and Dart, engineered by Amrat Awasthi under guidance of Sheelu Singh and Mridul Mishra.",
    addedAt: "2026-09-04",
    status: "source-backed",
  },
  {
    id: "src-khelghar-official",
    title: "CATI Khelghar — Official Offline Pass-and-Play Gaming Platform",
    publisher: "DIMISI Technologies (CATI)",
    url: "https://cati47.tech",
    type: "Official Website",
    relatedEntities: ["cati-khelghar", "dimisi-technologies", "shikhar-dixit"],
    claim: "Live offline gaming hub featuring 16 pass-and-play and local multiplayer board games without accounts or internet dependency.",
    addedAt: "2026-09-04",
    status: "source-backed",
  },
  {
    id: "src-dimisi-ops-spec",
    title: "DIMISI-OPS — Internal Operations System Specifications",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    type: "Project Documentation",
    relatedEntities: ["dimisi-ops", "dimisi-technologies", "shikhar-dixit"],
    claim: "Internal operations system under development for employee management, task allocation, and operational workflow tracking.",
    addedAt: "2026-09-04",
    status: "source-backed",
  },
  {
    id: "src-karyon-official",
    title: "KaryON — Professional Home Services Platform",
    publisher: "DIMISI Technologies / KaryON",
    url: "https://karyon.app",
    type: "Official Website",
    relatedEntities: ["karyon", "dimisi-technologies", "siddhant-shekhar"],
    claim: "Professional home services matching platform under development, connecting customers to verified home maintenance professionals at doorstep.",
    addedAt: "2026-09-04",
    status: "source-backed",
  },
  {
    id: "src-linkedin-challenge-felicitation",
    title: "LinkedIn 30-Day Kalesh Challenge & Felicitation Ceremony Records",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    type: "Company Announcement",
    relatedEntities: ["prashant-umrao", "kalesh", "swatantra-singh", "dimisi-technologies"],
    claim: "Prashant Umrao awarded 1st Prize Certificate of Achievement by Co-Founder Swatantra Singh on 15 August 2026 for the 30-day viral storytelling and campus creator challenge.",
    addedAt: "2026-09-04",
    status: "source-backed",
  },
];

const baseRelationships: Relationship[] = [
  { from: "sheelu-singh", type: "Works at", to: "dimisi-technologies" },
  { from: "mridul-mishra", type: "Works at", to: "dimisi-technologies" },
  { from: "prashant-umrao", type: "1st Prize Winner", to: "kalesh" },

  { from: "dimisi-technologies", type: "Develops", to: "kalesh" },
  { from: "dimisi-technologies", type: "Develops", to: "dimisipedia" },
  { from: "dimisipedia", type: "Documents", to: "dimisi-technologies" },
  { from: "shikhar-dixit", type: "Founder of", to: "kalesh" },
  { from: "shikhar-dixit", type: "CEO of", to: "kalesh" },
  { from: "nishkarsh-mishra", type: "Associated with", to: "kalesh" },
  { from: "swatantra-singh", type: "Technical leadership", to: "kalesh" },
  { from: "mridul-mishra", type: "Engineering", to: "kalesh" },
  { from: "sheelu-singh", type: "Engineering", to: "kalesh" },
  { from: "kalesh", type: "Uses technology", to: "flutter" },
  { from: "kalesh", type: "Uses technology", to: "dart" },
  { from: "kalesh", type: "Uses technology", to: "firebase" },
  { from: "kalesh", type: "Uses technology", to: "react" },
  { from: "kalesh", type: "Uses technology", to: "node-js" },
  { from: "kalesh", type: "Uses technology", to: "typescript" },
  { from: "kalesh", type: "Uses technology", to: "mongodb" },
  { from: "dimisipedia", type: "Uses technology", to: "react" },
  { from: "dimisipedia", type: "Uses technology", to: "typescript" },
  { from: "dimisi-technologies", type: "Develops", to: "rudra-tours" },
  { from: "dimisi-technologies", type: "Develops", to: "yadhuvanshi-tours" },
  { from: "rudra-tours", type: "Developed by", to: "dimisi-technologies" },
  { from: "yadhuvanshi-tours", type: "Developed by", to: "dimisi-technologies" },
  { from: "rudra-tours", type: "Uses technology", to: "next-js" },
  { from: "yadhuvanshi-tours", type: "Uses technology", to: "next-js" },

  { from: "dimisi-technologies", type: "Develops", to: "kaand" },
  { from: "dimisi-technologies", type: "Develops", to: "cati-khelghar" },
  { from: "dimisi-technologies", type: "Develops", to: "dimisi-ops" },
  { from: "dimisi-technologies", type: "Develops", to: "dimisi-corporate-platform" },
  { from: "dimisi-technologies", type: "Develops", to: "karyon" },

  { from: "amrat-awasthi", type: "Works at", to: "dimisi-technologies" },
  { from: "amrat-awasthi", type: "Engineering", to: "kaand" },
  { from: "sheelu-singh", type: "Technical leadership", to: "kaand" },
  { from: "mridul-mishra", type: "Technical leadership", to: "kaand" },

  { from: "shikhar-dixit", type: "Created by", to: "cati-khelghar" },
  { from: "shikhar-dixit", type: "Product leadership", to: "dimisi-ops" },

  { from: "prashant-umrao", type: "Works at", to: "dimisi-technologies" },
  { from: "prashant-umrao", type: "Engineering", to: "dimisi-ops" },
  { from: "amit-kumar", type: "Works at", to: "dimisi-technologies" },
  { from: "amit-kumar", type: "Engineering", to: "dimisi-ops" },
  { from: "mridul-mishra", type: "Engineering", to: "dimisi-ops" },
  { from: "nishkarsh-mishra", type: "Operations", to: "dimisi-ops" },

  { from: "swatantra-singh", type: "Engineering", to: "dimisi-corporate-platform" },
  { from: "mridul-mishra", type: "Engineering", to: "dimisi-corporate-platform" },

  { from: "siddhant-shekhar", type: "Engineering", to: "karyon" },
  { from: "siddhant-shekhar", type: "Engineering", to: "kalesh" },

  { from: "kaand", type: "Uses technology", to: "flutter" },
  { from: "kaand", type: "Uses technology", to: "dart" },
  { from: "dimisi-corporate-platform", type: "Uses technology", to: "next-js" },
  { from: "dimisi-corporate-platform", type: "Uses technology", to: "react" },
  { from: "dimisi-corporate-platform", type: "Uses technology", to: "typescript" },
  { from: "dimisi-corporate-platform", type: "Uses technology", to: "node-js" },
  { from: "dimisi-corporate-platform", type: "Uses technology", to: "mongodb" },
  { from: "dimisi-corporate-platform", type: "Uses technology", to: "redis" },
  { from: "dimisi-corporate-platform", type: "Uses technology", to: "tailwind-css" },
  { from: "dimisi-corporate-platform", type: "Uses technology", to: "aws" },
  { from: "dimisi-corporate-platform", type: "Uses technology", to: "digital-ocean" },
  { from: "dimisi-corporate-platform", type: "Uses technology", to: "cloudinary" },
];

const baseRevisions = (created: string): Revision[] => [
  {
    n: 1,
    date: created,
    editor: "DIMISIPEDIA Editorial",
    change: "Entity page created from documented DIMISI information.",
  },
];

const people: Entity[] = [
  ...founderEntities,
  {
    id: "sheelu-singh",
    slug: "sheelu-singh",
    path: "/people/sheelu-singh",
    entityType: "person",
    name: "Sheelu Singh",
    subtitle: "Android & Flutter Developer — DIMISI Technologies",
    image: "/images/sheelu-singh.png",
    shortDescription:
      "Mobile engineer at DIMISI Technologies; Android and Flutter developer for the Kalesh platform.",
    answer:
      "Sheelu Singh is a mobile application engineer at DIMISI Technologies Private Limited, working as the Android developer for Kalesh, the company's anonymous social platform. His recorded work covers Flutter-based cross-platform architecture, state and dependency management, payment gateway integration and mobile interface engineering.",
    facts: [
      { label: "Role", value: "Android & Flutter Developer", status: "source-backed" },
      { label: "Organization", value: ORG_NAME, status: "documented" },
      { label: "Primary project", value: "Kalesh (mobile application)", status: "source-backed" },
      {
        label: "Education",
        value: "Computer Science Engineering — Dr. A.P.J. Abdul Kalam Technical University",
        status: "source-backed",
      },
      { label: "Core technologies", value: "Flutter, Provider, Firebase", status: "source-backed" },
    ],
    areas: ["Mobile development", "Cross-platform engineering", "UI/UX implementation"],
    roles: [
      {
        title: "Android Developer",
        organization: ORG_NAME,
        status: "source-backed",
        sourceIds: ["src-sheelu-linkedin", "src-kalesh-team"],
      },
    ],
    education: [
      {
        institution: "Dr. A.P.J. Abdul Kalam Technical University",
        qualification: "Computer Science Engineering",
        field: "Computer Science Engineering",
        status: "source-backed",
        note: "Affiliated college, enrolment dates and graduation status are not recorded.",
      },
    ],
    experience: [
      {
        organization: "Yahwey Software Solutions",
        role: "Software Development Engineer (SDE) Intern",
        note: "Recorded as cross-platform development work preceding his move to the DIMISI application team.",
        status: "source-backed",
      },
    ],
    externalProfiles: [
      {
        label: "LinkedIn",
        url: "https://in.linkedin.com",
        verified: false,
        note: "Directory-level link supplied; exact profile URL awaiting confirmation.",
      },
      {
        label: "DIMISI Technologies (LinkedIn)",
        url: "https://www.linkedin.com",
        verified: false,
        note: "Company directory listing.",
      },
      {
        label: "Kalesh platform",
        url: "https://thekalesh.com",
        verified: false,
        note: "First-party product site.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        status: "source-backed",
        body: [
          "Sheelu Singh is an engineering professional at DIMISI Technologies Private Limited, recorded primarily as the Android developer for the company's flagship anonymous social product, Kalesh. [1][2]",
          "He holds a background in Computer Science Engineering from Dr. A.P.J. Abdul Kalam Technical University, and before joining the DIMISI application team is recorded as having worked as a Software Development Engineer intern at Yahwey Software Solutions. [1]",
        ],
      },
      {
        id: "work",
        heading: "Work at DIMISI Technologies",
        status: "source-backed",
        body: [
          "Singh's recorded technical portfolio centres on mobile architecture design, using the Flutter framework to build cross-platform applications. [1][3]",
          "For the Kalesh mobile rollout, the responsibilities recorded for him include engineering the application codebase, managing structural dependencies such as Provider and Firebase, implementing payment gateway integrations, and maintaining application interfaces. [1][2]",
          "His described professional focus covers interface fluidity, responsive layouts built with typography themes (ThemeData) and mobile performance. [1][3] These are described responsibilities rather than independently audited contributions.",
        ],
      },
      {
        id: "biography",
        heading: "Biography",
        status: "needs-verification",
        body: [
          "No further biographical detail — date of birth, location or independent media coverage — has been supplied to DIMISIPEDIA. Fields are left empty rather than inferred.",
        ],
      },
    ],
    coverage: [
      { area: "Identity", status: "documented", note: "Supplied by the organization." },
      {
        area: "Role",
        status: "source-backed",
        note: "Android and Flutter development recorded through professional profile and product team material.",
      },
      {
        area: "Education",
        status: "source-backed",
        note: "Self-reported university background; institutional confirmation pending.",
      },
      {
        area: "Professional experience",
        status: "source-backed",
        note: "One prior internship recorded.",
      },
      { area: "Biography", status: "needs-verification", note: "Awaiting information." },
      { area: "Media", status: "needs-verification", note: "No independent coverage recorded." },
    ],
    officialLinks: [{ label: "thekalesh.com", url: "https://thekalesh.com", official: true }],
    sourceIds: [
      "src-sheelu-linkedin",
      "src-kalesh-team",
      "src-sheelu-pulsjob",
      "src-dimisi-linkedin",
      "src-team-roster",
    ],
    revisions: [
      ...baseRevisions("2026-08-15"),
      {
        n: 2,
        date: "2026-08-15",
        editor: "DIMISIPEDIA Editorial",
        change:
          "Mobile engineering role, education, prior internship and Kalesh responsibilities added with claim-level sourcing.",
      },
    ],
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
    seoTitle: "Sheelu Singh — Android & Flutter Developer, DIMISI Technologies | DIMISIPEDIA",
    seoDescription:
      "Sheelu Singh is an Android and Flutter developer at DIMISI Technologies, engineering the Kalesh mobile application with Flutter, Provider and Firebase.",
  },
  {
    id: "mridul-mishra",
    slug: "mridul-mishra",
    path: "/people/mridul-mishra",
    entityType: "person",
    name: "Mridul Mishra",
    subtitle: "Founding Engineer — Kalesh, DIMISI Technologies",
    image: "/images/mridul-mishra.png",
    shortDescription:
      "Backend engineer and founding engineer for Kalesh, DIMISI Technologies' consumer social platform.",
    answer:
      "Mridul Mishra is a software engineer at DIMISI Technologies Private Limited and the founding engineer for Kalesh, the company's consumer social platform. His recorded work covers backend architecture, REST APIs, WebSocket-based real-time interaction, background job processing with BullMQ and Redis, MongoDB data optimisation and CI/CD pipelines.",
    facts: [
      { label: "Role", value: "Founding Engineer (Kalesh)", status: "source-backed" },
      { label: "Organization", value: ORG_NAME, status: "documented" },
      { label: "Primary project", value: "Kalesh (backend platform)", status: "source-backed" },
      {
        label: "Core technologies",
        value: "Node.js REST APIs, WebSockets, BullMQ, Redis, MongoDB",
        status: "source-backed",
      },
    ],
    areas: ["Backend engineering", "Real-time systems", "Infrastructure & CI/CD"],
    roles: [
      {
        title: "Founding Engineer",
        organization: "Kalesh — DIMISI Technologies",
        status: "source-backed",
        sourceIds: ["src-kalesh-team", "src-kalesh-linkedin"],
      },
    ],
    externalProfiles: [
      {
        label: "Kalesh platform team page",
        url: "https://thekalesh.com",
        verified: false,
        note: "First-party product team listing.",
      },
      {
        label: "Kalesh company page (LinkedIn)",
        url: "https://in.linkedin.com",
        verified: false,
        note: "Directory-level link supplied.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        status: "source-backed",
        body: [
          "Mridul Mishra is a software engineer recorded as the founding engineer for Kalesh, the consumer platform venture of DIMISI Technologies. [1] He is positioned within the development team as the engineer responsible for building and maintaining the backend architecture that supports the platform's real-time social features. [1][2]",
        ],
      },
      {
        id: "work",
        heading: "Engineering work",
        status: "source-backed",
        body: [
          "His recorded contributions focus on backend data performance and persistent network connections: custom REST APIs for the platform, and WebSockets for instant, bidirectional user interaction. [1]",
          "For stability under load, background task scheduling and message queues are recorded as handled with BullMQ paired with Redis caching. [1] His workflow is further described as covering data storage optimisation within MongoDB clusters and automated continuous integration and deployment pipelines for production releases. [1]",
          "These are described responsibilities drawn from first-party product material and have not been independently audited.",
        ],
      },
      {
        id: "biography",
        heading: "Biography",
        status: "needs-verification",
        body: [
          "No education, prior employment, date of birth or independent media coverage has been supplied to DIMISIPEDIA for Mridul Mishra. These fields are left empty rather than inferred.",
        ],
      },
    ],
    coverage: [
      { area: "Identity", status: "documented", note: "Supplied by the organization." },
      {
        area: "Role",
        status: "source-backed",
        note: "Founding engineer role recorded through first-party product material.",
      },
      {
        area: "Education",
        status: "needs-verification",
        note: "Unknown — no information supplied.",
      },
      {
        area: "Professional experience",
        status: "needs-verification",
        note: "Unknown — no information supplied.",
      },
      {
        area: "Projects",
        status: "source-backed",
        note: "Kalesh backend architecture recorded in detail.",
      },
      { area: "Media", status: "needs-verification", note: "No independent coverage recorded." },
    ],
    officialLinks: [{ label: "thekalesh.com", url: "https://thekalesh.com", official: true }],
    sourceIds: ["src-kalesh-team", "src-kalesh-linkedin", "src-team-roster"],
    revisions: [
      ...baseRevisions("2026-08-15"),
      {
        n: 2,
        date: "2026-08-15",
        editor: "DIMISIPEDIA Editorial",
        change:
          "Founding engineer role and documented Kalesh backend responsibilities added with sourcing.",
      },
    ],
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
    seoTitle: "Mridul Mishra — Founding Engineer, Kalesh (DIMISI Technologies) | DIMISIPEDIA",
    seoDescription:
      "Mridul Mishra is the founding engineer for Kalesh at DIMISI Technologies, working on REST APIs, WebSockets, BullMQ/Redis queues, MongoDB and CI/CD.",
  },

  {
    id: "amrat-awasthi",
    slug: "amrat-awasthi",
    path: "/people/amrat-awasthi",
    entityType: "person",
    name: "Amrat Awasthi",
    subtitle: "Android Developer Intern (Flutter / DART) — DIMISI Technologies",
    image: "/images/amrat-awasthi.png",
    shortDescription:
      "Android developer intern specializing in Flutter and Dart at DIMISI Technologies, serving as lead application developer for the KAAND news and media platform.",
    answer:
      "Amrat Awasthi is an Android Developer Intern (Flutter / DART) at DIMISI Technologies Private Limited, leading the mobile engineering of KAAND, the company's next-generation news and media platform under the technical guidance of Sheelu Singh and Mridul Mishra.",
    lifecycle: "Active",
    facts: [
      { label: "Role", value: "Android Developer Intern (Flutter / DART)", status: "source-backed" },
      { label: "Organization", value: ORG_NAME, status: "documented" },
      { label: "Primary project", value: "KAAND (Mobile Media Platform)", status: "source-backed" },
      { label: "Core technologies", value: "Flutter, Dart", status: "source-backed" },
      { label: "Technical mentors", value: "Sheelu Singh, Mridul Mishra", status: "source-backed" },
    ],
    areas: ["Android application development", "Flutter engineering", "Dart programming", "Mobile UI/UX systems"],
    roles: [
      {
        title: "Android Developer Intern (Flutter / DART)",
        organization: ORG_NAME,
        status: "source-backed",
        sourceIds: ["src-kaand-dev", "src-team-roster"],
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview & role",
        status: "source-backed",
        body: [
          "Amrat Awasthi is an Android Developer Intern specializing in Flutter and Dart at DIMISI Technologies. [1]",
          "He serves as the lead developer for KAAND, an internal next-generation digital journalism and media consumption product being built natively for Android and iOS using Flutter and Dart. [1]",
          "His development work on KAAND proceeds under the direct technical mentorship and architectural guidance of senior engineering members Sheelu Singh and Mridul Mishra. [1]",
        ],
      },
      {
        id: "projects",
        heading: "Project engineering",
        status: "source-backed",
        body: [
          "KAAND (Under Development): Implementing reactive user interfaces, news feed streaming, and cross-platform UI architectures tailored for high-speed mobile information discovery. [1]",
        ],
      },
    ],
    coverage: [
      { area: "Identity & Role", status: "source-backed", note: "Recorded in DIMISI project development rosters." },
      { area: "Project Assignment", status: "source-backed", note: "Lead developer on KAAND verified in company engineering records." },
    ],
    officialLinks: [],
    sourceIds: ["src-kaand-dev", "src-team-roster"],
    revisions: baseRevisions("2026-09-04"),
    createdAt: "2026-09-04",
    updatedAt: "2026-09-04",
    seoTitle: "Amrat Awasthi — Android Developer Intern (Flutter / DART) | DIMISIPEDIA",
    seoDescription:
      "Amrat Awasthi is an Android Developer Intern (Flutter / DART) at DIMISI Technologies, leading mobile development for KAAND.",
  },

  {
    id: "prashant-umrao",
    slug: "prashant-umrao",
    path: "/people/prashant-umrao",
    entityType: "person",
    name: "Prashant Umrao",
    subtitle: "Full Stack Developer Intern & Tester — DIMISI Technologies",
    image: "/images/prashant-umrao.png",
    shortDescription:
      "Full stack developer intern and software tester at DIMISI Technologies, 1st Prize Winner of the nationwide LinkedIn 30-Day Kalesh Promotion Challenge, and contributor to DIMISI-OPS.",
    answer:
      "Prashant Umrao is a Full Stack Developer Intern & Tester at DIMISI Technologies Private Limited, responsible for full stack web engineering and quality testing for DIMISI-OPS. He is also recognized as the 1st Prize Winner of DIMISI's nationwide LinkedIn 30-Day Kalesh Challenge, felicitated on 15 August 2026 by co-founder Swatantra Singh.",
    lifecycle: "Active",
    facts: [
      { label: "Role", value: "Full Stack Developer Intern & Tester", status: "source-backed" },
      { label: "Organization", value: ORG_NAME, status: "documented" },
      { label: "Primary project", value: "DIMISI-OPS", status: "source-backed" },
      { label: "Milestone award", value: "1st Prize Winner — LinkedIn 30-Day Challenge (15 August 2026)", status: "source-backed", sourceIds: ["src-linkedin-challenge-felicitation"] },
      { label: "Supervision", value: "Nishkarsh Mishra (Operations), Mridul Mishra (Backend)", status: "source-backed" },
    ],
    areas: ["Full stack web development", "Software quality assurance & testing", "Internal operations systems", "Technical content creation"],
    roles: [
      {
        title: "Full Stack Developer Intern & Tester",
        organization: ORG_NAME,
        status: "source-backed",
        sourceIds: ["src-dimisi-ops-spec", "src-team-roster"],
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        status: "source-backed",
        body: [
          "Prashant Umrao is a Full Stack Developer Intern & Tester at DIMISI Technologies. [1]",
          "He is actively engaged in building and validating DIMISI-OPS, an internal operational platform created to centralize employee management, work assignment, and cross-team productivity tracking across DIMISI Technologies. [1]",
        ],
      },
      {
        id: "linkedin-30days-award",
        heading: "1st Prize Winner — LinkedIn 30-Day Challenge",
        status: "source-backed",
        body: [
          "Prashant Umrao emerged as the First Prize Winner in the nationwide LinkedIn 30-Day Kalesh Promotion & Content Creator Challenge hosted by DIMISI Technologies. [3]",
          "The campaign brought together student developers and campus creators in a 30-day marathon of daily technical storytelling, founder narrative breakdowns, and viral student opinion polls centered on Kalesh. [3]",
          "On 15 August 2026, during the official DIMISI award ceremony, he was formally felicitated by Co-Founder & CTO Swatantra Singh with the official 1st Prize Certificate of Achievement and trophy. [3]",
        ],
      },
    ],
    coverage: [
      { area: "Identity & Role", status: "source-backed", note: "Recorded in DIMISI internal project documentation." },
      { area: "Award & Recognition", status: "source-backed", note: "Photographic and ceremonial record of 1st Prize Certificate awarded on 15 August 2026." },
    ],
    officialLinks: [],
    sourceIds: ["src-dimisi-ops-spec", "src-team-roster", "src-linkedin-challenge-felicitation"],
    revisions: baseRevisions("2026-09-04"),
    createdAt: "2026-09-04",
    updatedAt: "2026-09-04",
    seoTitle: "Prashant Umrao — Full Stack Developer Intern, Tester & 1st Prize Winner | DIMISIPEDIA",
    seoDescription:
      "Prashant Umrao is a Full Stack Developer Intern & Tester at DIMISI Technologies and 1st Prize Winner of the LinkedIn 30-Day Challenge.",
  },

  {
    id: "amit-kumar",
    slug: "amit-kumar",
    path: "/people/amit-kumar",
    entityType: "person",
    name: "Amit Kumar",
    subtitle: "Backend Development Intern — DIMISI Technologies",
    image: "/images/amit-kumar.png",
    shortDescription:
      "Backend development intern at DIMISI Technologies, building server-side logic, database integrations, and task workflows for the DIMISI-OPS platform.",
    answer:
      "Amit Kumar is a Backend Development Intern at DIMISI Technologies Private Limited, working alongside Prashant Umrao and foundation engineer Mridul Mishra on backend development, API services, and workflow automation for DIMISI-OPS.",
    lifecycle: "Active",
    facts: [
      { label: "Role", value: "Backend Development Intern", status: "source-backed" },
      { label: "Organization", value: ORG_NAME, status: "documented" },
      { label: "Primary project", value: "DIMISI-OPS", status: "source-backed" },
      { label: "Supervision", value: "Nishkarsh Mishra (Operations), Mridul Mishra (Backend)", status: "source-backed" },
    ],
    areas: ["Backend engineering", "Database integration", "API development", "Workflow automation"],
    roles: [
      {
        title: "Backend Development Intern",
        organization: ORG_NAME,
        status: "source-backed",
        sourceIds: ["src-dimisi-ops-spec", "src-team-roster"],
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        status: "source-backed",
        body: [
          "Amit Kumar is a Backend Development Intern at DIMISI Technologies. [1]",
          "He collaborates on the engineering of DIMISI-OPS, developing internal task allocation, team coordination, and employee administration modules under operational guidance from co-founder Nishkarsh Mishra. [1]",
        ],
      },
    ],
    coverage: [
      { area: "Identity & Role", status: "source-backed", note: "Documented in DIMISI-OPS project specifications." },
    ],
    officialLinks: [],
    sourceIds: ["src-dimisi-ops-spec", "src-team-roster"],
    revisions: baseRevisions("2026-09-04"),
    createdAt: "2026-09-04",
    updatedAt: "2026-09-04",
    seoTitle: "Amit Kumar — Backend Development Intern | DIMISIPEDIA",
    seoDescription:
      "Amit Kumar is a Backend Development Intern at DIMISI Technologies contributing to the DIMISI-OPS operations platform.",
  },

  {
    id: "siddhant-shekhar",
    slug: "siddhant-shekhar",
    path: "/people/siddhant-shekhar",
    entityType: "person",
    name: "Siddhant Shekhar",
    subtitle: "Former Core Member & Web Developer — DIMISI Technologies",
    image: "/images/siddhant-shekhar.png",
    shortDescription:
      "Former core member of DIMISI Technologies and web developer who contributed to early frontend platforms and developed the KaryON home services platform.",
    answer:
      "Siddhant Shekhar is a software engineer and former core team member of DIMISI Technologies (CATI), remembered as part of the 'Sinister Six' founding cohort. He contributed to the initial web deployment of Kalesh on 22 January 2026 and developed KaryON, a professional doorstep home-services platform.",
    lifecycle: "Active",
    facts: [
      { label: "Role", value: "Former Core Member / Web Developer", status: "source-backed" },
      { label: "Organization", value: ORG_NAME, status: "documented" },
      { label: "Associated projects", value: "KaryON, The Kalesh", status: "source-backed" },
      { label: "Founding cohort", value: "The Sinister Six (Sand Tank Phase)", status: "source-backed" },
    ],
    areas: ["Web development", "Frontend architecture", "Service marketplace design"],
    roles: [
      {
        title: "Frontend Web Developer (Former Core Member)",
        organization: ORG_NAME,
        status: "source-backed",
        sourceIds: ["src-team-roster", "src-karyon-official"],
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview & contribution",
        status: "source-backed",
        body: [
          "Siddhant Shekhar joined the early technical ranks of CATI / DIMISI Technologies on 5 January 2026 as a dedicated web developer during the intensive Sand Tank workspace sprint. [1]",
          "He was a member of the celebrated 'Sinister Six' core cohort comprising Shikhar Dixit, Swatantra Singh, Nishkarsh Mishra, Sheelu Singh, Mridul Mishra, and Siddhant Shekhar. [1]",
          "During his tenure at DIMISI, Shekhar contributed to early frontend web development for the Kalesh web deployment and engineered KaryON (karyon.app), an on-demand marketplace connecting homeowners with verified doorstep service professionals. [1][2]",
        ],
      },
    ],
    coverage: [
      { area: "Identity & History", status: "source-backed", note: "Documented in Phase 5 Sand Tank company archives." },
      { area: "Project Ownership", status: "source-backed", note: "Development of KaryON recorded in DIMISI project archives." },
    ],
    officialLinks: [{ label: "karyon.app", url: "https://karyon.app", official: true }],
    sourceIds: ["src-team-roster", "src-karyon-official"],
    revisions: baseRevisions("2026-09-04"),
    createdAt: "2026-09-04",
    updatedAt: "2026-09-04",
    seoTitle: "Siddhant Shekhar — Former Core Member & Developer | DIMISIPEDIA",
    seoDescription:
      "Siddhant Shekhar is a former core member of DIMISI Technologies and developer of the KaryON home services platform.",
  },
];

const organization: Entity = {
  id: "dimisi-technologies",
  slug: "dimisi-technologies",
  path: "/dimisi-technologies",
  entityType: "organization",
  name: "DIMISI Technologies",
  subtitle: "Organization",
  image: "/images/dimisi-logo.png",
  shortDescription:
    "Indian technology company associated with software development, digital products and emerging technology projects.",
  answer:
    "DIMISI Technologies Pvt. Ltd. is an Indian technology company recorded as incorporated on 9 April 2026 and based in Kanpur, Uttar Pradesh. It is associated with software development, digital products, web development and AI automation, and its documented project ecosystem includes Kalesh and DIMISIPEDIA.",
  lifecycle: "Active",
  facts: [
    {
      label: "Legal name",
      value: "DIMISI Technologies Private Limited",
      status: "needs-verification",
    },
    { label: "CIN", value: "U62013UP2026PTC246506", status: "needs-verification" },
    { label: "Organization type", value: "Private limited company", status: "needs-verification" },
    { label: "Founded", value: "9 April 2026", status: "needs-verification" },
    { label: "Location", value: "Kanpur, Uttar Pradesh, India", status: "documented" },
    {
      label: "Registered office",
      value: "MIG 3/131, Swarn Jayanti Vihar, Koyala Nagar, Kanpur, Uttar Pradesh, India",
      status: "needs-verification",
    },
    { label: "Industry", value: "Information Technology", status: "documented" },
    { label: "Website", value: "dimisi.tech", status: "source-backed" },
    {
      label: "Founding leadership",
      value: "Shikhar Dixit, Nishkarsh Mishra, Swatantra Singh",
      status: "needs-verification",
    },
    { label: "Projects", value: "Kalesh, DIMISIPEDIA", status: "documented" },
    { label: "Current status", value: "Active", status: "documented" },
  ],
  sections: [
    {
      id: "overview",
      heading: "Overview",
      body: [
        "DIMISI Technologies Pvt. Ltd. is an Indian technology company associated with software development, digital products, technology initiatives and emerging technology projects. Its recorded base of operations is Kanpur, Uttar Pradesh, India, and its main website is dimisi.tech.",
        "The company's documented project ecosystem currently includes Kalesh, an anonymous social engagement platform, and DIMISIPEDIA, the organization's public knowledge and documentation platform.",
      ],
      status: "documented",
    },
    {
      id: "history",
      heading: "History",
      body: [
        "The earliest milestone currently recorded in DIMISIPEDIA is the incorporation date of 9 April 2026. Further historical detail will be published as it is documented and verified.",
      ],
      status: "needs-verification",
    },
    {
      id: "founding",
      heading: "Founding",
      body: [
        "Supplied corporate information records DIMISI Technologies Private Limited as incorporated on 9 April 2026 in Kanpur, Uttar Pradesh, India, under the corporate identity number U62013UP2026PTC246506. The registered-office information supplied to DIMISIPEDIA is held in the editorial record and is not published until it has been verified as appropriate for public display.",
        "Shikhar Dixit is recorded as the founder and chief executive officer. Nishkarsh Mishra and Swatantra Singh are recorded as co-founders and directors appointed at incorporation. These are corporate claims and require official corporate-record verification; DIMISIPEDIA does not describe them as registry-verified.",
        "Initial capital structure and shareholding particulars have not been supplied and are not published.",
      ],
      status: "needs-verification",
    },
    {
      id: "founding-leadership",
      heading: "Founding leadership",
      body: [
        "DIMISI Technologies' founding leadership is represented by Shikhar Dixit, Nishkarsh Mishra and Swatantra Singh. Their documented roles span executive leadership, technology, product development, operations, marketing and organizational development.",
        "Each person is connected to the organization through separate, individually verifiable role relationships rather than a single combined founder field, and each is connected in turn to the Kalesh project through the area of work associated with them. The comparison below records the areas currently documented for each founder; they are not exclusive divisions of responsibility.",
      ],
      status: "needs-verification",
    },
    {
      id: "mission",
      heading: "Mission",
      body: [
        "DIMISIPEDIA does not currently hold an official mission statement issued by DIMISI Technologies. This section will be published once an official statement has been supplied.",
      ],
      status: "needs-verification",
    },
    {
      id: "vision",
      heading: "Vision",
      body: [
        "No official long-term vision statement has been recorded yet. Awaiting an authorised statement from the organization.",
      ],
      status: "needs-verification",
    },
    {
      id: "projects",
      heading: "Products & Projects",
      body: [
        "Kalesh — an anonymous social engagement platform associated with DIMISI Technologies.",
        "DIMISIPEDIA — the official public knowledge, documentation and credibility platform of DIMISI Technologies.",
        "Future projects are added through the DIMISIPEDIA content system and are not published until confirmed by an administrator.",
      ],
      status: "documented",
    },
    {
      id: "services",
      heading: "Services",
      body: [
        "Activities currently associated with DIMISI Technologies include web development, software development, mobile development, digital products, social media marketing, AI automation and technology solutions.",
        "These activities are recorded as associated rather than confirmed. Each must be reviewed and approved by an authorised administrator before DIMISIPEDIA presents it as a definitive company statement.",
      ],
      status: "needs-verification",
    },
    {
      id: "team",
      heading: "Team",
      body: [
        "Beyond the founding leadership, two further team members are currently documented: Sheelu Singh (Android Developer) and Mridul Mishra (Backend Developer).",
        "Interns, alumni and contributors will be added as they are documented.",
      ],
      status: "documented",
    },
    {
      id: "technology",
      heading: "Technology",
      body: [
        "Technologies documented in association with DIMISI project work include React, Node.js, TypeScript, Express, MongoDB and Vite, together with deployment and process infrastructure such as DigitalOcean, Vercel/Netlify and PM2.",
        "Some of these represent prototype or development infrastructure and are not presented as a confirmed production stack.",
      ],
      status: "documented",
    },
    {
      id: "media",
      heading: "Media & Press",
      body: ["No independent press coverage has been recorded in DIMISIPEDIA yet."],
      status: "needs-verification",
    },
  ],
  coverage: [
    {
      area: "Identity",
      status: "documented",
      note: "Legal name, location and industry supplied by the organization.",
    },
    {
      area: "Leadership",
      status: "needs-verification",
      note: "Founding roles supplied as corporate information; awaiting official corporate record.",
    },
    {
      area: "Registration",
      status: "needs-verification",
      note: "CIN and incorporation date supplied; registry document not yet reviewed.",
    },
    {
      area: "Projects",
      status: "documented",
      note: "Kalesh and DIMISIPEDIA documented with official domains.",
    },
    {
      area: "Timeline",
      status: "needs-verification",
      note: "Only the incorporation date is currently recorded.",
    },
    { area: "Media", status: "needs-verification", note: "No independent coverage recorded." },
    {
      area: "Financials",
      status: "needs-verification",
      note: "No financial information recorded or claimed.",
    },
  ],
  officialLinks: [
    {
      label: "Official website",
      url: "https://dimisi.tech",
      official: true,
    },
    {
      label: "Kalesh platform",
      url: "https://thekalesh.com",
      official: true,
    },
  ],
  sameAs: [
    "https://dimisi.tech",
    "https://thekalesh.com",
    "https://www.crunchbase.com/organization/dimisi-technologies-private-limited",
    "https://www.linkedin.com/company/dimisi-technologies",
    "https://tracxn.com/d/companies/dimisi-technologies",
    "https://www.falconebiz.com",
  ],
  faqs: [
    {
      question: "What is DIMISI Technologies Private Limited?",
      answer:
        "DIMISI Technologies Private Limited (CIN: U62013UP2026PTC246506) is an Indian technology and software development company incorporated on 9 April 2026, headquartered in Kanpur, Uttar Pradesh.",
    },
    {
      question: "Who are the founders and directors of DIMISI Technologies?",
      answer:
        "DIMISI Technologies was founded by Shikhar Dixit (Founder & CEO), Swatantra Singh (Co-Founder & CTO), and Nishkarsh Mishra (Co-Founder & CFO/Operations), who serve as founding directors.",
    },
    {
      question: "How did DIMISI Technologies get its name?",
      answer:
        "The name DIMISI was created by founder Shikhar Dixit using the syllables of the founding directors' surnames: DI (Dixit) + MI (Mishra) + SI (Singh).",
    },
    {
      question: "What products and platforms does DIMISI Technologies build?",
      answer:
        "DIMISI Technologies builds consumer software platforms including Kalesh (an anonymous social polling and discussion platform), DIMISIPEDIA, custom web and mobile apps, and enterprise IT solutions.",
    },
    {
      question: "Where is DIMISI Technologies located?",
      answer:
        "DIMISI Technologies is registered and headquartered in Kanpur, Uttar Pradesh, India, with its registered office in Swarn Jayanti Vihar, Koyala Nagar.",
    },
  ],
  sourceIds: [
    "src-dimisi-official",
    "src-corporate-record",
    "src-incorporation",
    "src-dimisi-linkedin",
    "src-team-roster",
    "src-falconebiz-registry",
    "src-tracxn-dimisi",
    "src-zaubacorp-dimisi",
    "src-kalesh-team",
  ],
  revisions: [
    {
      n: 1,
      date: "2026-08-15",
      editor: "DIMISIPEDIA Editorial",
      change: "Organization entity created from documented DIMISI information.",
    },
    {
      n: 2,
      date: "2026-08-15",
      editor: "DIMISIPEDIA Editorial",
      change: "Added team, technology and services sections with verification status.",
    },
  ],
  createdAt: "2026-08-15",
  updatedAt: "2026-08-21",
  seoTitle: "DIMISI Technologies Private Limited — Official Knowledge Base | DIMISIPEDIA",
  seoDescription:
    "Official corporate overview, incorporation particulars (CIN: U62013UP2026PTC246506), leadership, products (Kalesh, DIMISIPEDIA), and history of DIMISI Technologies Private Limited.",
};

const projects: Entity[] = [
  {
    id: "kalesh",
    slug: "kalesh",
    path: "/projects/kalesh",
    entityType: "project",
    category: "DIMISI Products",
    projectType: "Anonymous Social Media Platform",
    featuredPriority: 1,
    statusBadge: "FLAGSHIP",
    tags: [
      "Anonymous Social Network",
      "Social Media",
      "Community Platform",
      "Privacy",
      "Social Technology",
      "DIMISI Product",
      "Flagship Product",
    ],
    name: "The Kalesh",
    subtitle: "Flagship DIMISI Product — Anonymous Social Media Platform",
    image: "/images/kalesh-icon.png",
    shortDescription:
      "The Kalesh is DIMISI's flagship anonymous social media platform built around identity-free expression, conversations and community interaction.",
    answer:
      "The Kalesh is an anonymous social media platform developed by DIMISI Technologies to create a digital environment where people can express opinions, participate in conversations and interact without making their real-world identity the center of their social presence.",
    lifecycle: "Active",
    facts: [
      {
        label: "Type",
        value: "Anonymous social media & opinion platform",
        status: "source-backed",
        sourceIds: ["src-kalesh-official", "src-kalesh-linkedin"],
      },
      {
        label: "Industry",
        value: "Social Networking Platforms",
        status: "source-backed",
        sourceIds: ["src-kalesh-linkedin"],
      },
      {
        label: "Organization",
        value: "DIMISI Technologies Private Limited",
        status: "source-backed",
        sourceIds: ["src-dimisi-website", "src-shikhar-linkedin"],
      },
      {
        label: "Founded",
        value: "2026",
        status: "source-backed",
        sourceIds: ["src-kalesh-linkedin"],
      },
      {
        label: "Headquarters",
        value: "Kanpur, Uttar Pradesh, India",
        status: "source-backed",
        sourceIds: ["src-kalesh-linkedin"],
      },
      {
        label: "Company type",
        value: "Privately held",
        status: "source-backed",
        sourceIds: ["src-kalesh-linkedin"],
      },
      {
        label: "Company size",
        value: "2–10 employees",
        status: "source-backed",
        sourceIds: ["src-kalesh-linkedin"],
      },
      {
        label: "Founder & CEO",
        value: "Shikhar Dixit",
        status: "source-backed",
        sourceIds: ["src-shikhar-linkedin", "src-kalesh-linkedin"],
      },
      {
        label: "Website",
        value: "thekalesh.com",
        status: "source-backed",
        sourceIds: ["src-kalesh-official"],
      },
    ],
    questions: [
      {
        q: "What is Kalesh?",
        a: "Kalesh is an anonymous social media and opinion platform developed by DIMISI Technologies Private Limited, built around anonymous profiles, real-time polls and private anonymous conversations.",
      },
      {
        q: "Who owns Kalesh?",
        a: "Kalesh is identified on the DIMISI Technologies website as a flagship product of DIMISI Technologies Private Limited.",
      },
      {
        q: "Who founded Kalesh?",
        a: "Shikhar Dixit is publicly identified as the Founder and CEO of Kalesh, and the Kalesh company page independently lists him among its people.",
      },
      {
        q: "Where is Kalesh based?",
        a: "Kalesh's public company profile records its headquarters as Kanpur, Uttar Pradesh, India.",
      },
      {
        q: "Is Kalesh India's first anonymous social media platform?",
        a: 'Kalesh describes itself as "India\'s First Anonymous Social Media Platform" on its official website. DIMISIPEDIA records this as a first-party self-description; no independent source establishing it as a matter of fact has been recorded.',
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        body: [
          "Kalesh is an India-focused anonymous social media and opinion platform designed around the principle that a person's opinion should matter more than their identity. Its official website positions the product around anonymous profiles, real-time polls, private conversations and authentic opinion sharing. [1]",
          "Kalesh's public company profile classifies the organization under Social Networking Platforms, records it as privately held, gives its headquarters as Kanpur, Uttar Pradesh, states a company size of 2–10 employees, records 2026 as the founding year and lists thekalesh.com as its website. [2]",
          "The DIMISI Technologies website identifies Kalesh as a flagship product of DIMISI Technologies Private Limited and describes it as a social platform combining real-time polls, private chats and authentic opinion sharing with an emphasis on privacy. [3]",
        ],
        status: "source-backed",
        images: [
          {
            src: "/images/kalesh-icon.png",
            alt: "Kalesh product icon",
            caption: "Kalesh product icon",
          },
          {
            src: "/images/dimisi-logo.png",
            alt: "DIMISI Technologies brand mark",
            caption: "Developed by DIMISI Technologies",
          },
        ],
      },

      {
        id: "positioning",
        heading: "Self-description and positioning",
        body: [
          'The official Kalesh website describes the platform as "India\'s First Anonymous Social Media Platform" and summarises the concept as "a platform where your opinion matters, not your identity." [1]',
          "DIMISIPEDIA records these statements as first-party positioning published by the product itself. They are documented here as claims made by Kalesh, and are not recorded as independently established facts; no third-party source verifying priority in the Indian market has been recorded.",
          'The same material emphasises a judgment-free environment, described through the phrases "No Profile Pressure", "No Judgment" and "Just Honest Opinions". [1]',
        ],
        status: "source-backed",
      },
      {
        id: "features",
        heading: "Features",
        body: [
          "Anonymous profiles. The platform's core concept is participation without a real name, face or personal identity, described on the official website through the ideas of a hidden identity, an anonymous username and zero judgment. [1]",
          'Real-time polls. The polling system is presented as "Live Polls. Real Votes. Instant Results.", allowing users to create polls, collect opinions from other anonymous users and watch results update live. [1] The public company profile describes the product as an anonymous opinion and polling platform for Gen-Z. [2]',
          'Private anonymous chat. A second interaction layer is described as "Connect. Chat. Stay Anonymous.", with an anonymous matching approach that connects people around shared interests and thoughts while conversations remain private. [1]',
          'Poll creator tools. The website describes the creation flow as "Ask Anything. Get Real Opinions. Instantly.", positioning Kalesh as an opinion-gathering mechanism as well as a social product. [1]',
        ],
        status: "source-backed",
      },
      {
        id: "audience",
        heading: "Audience",
        body: [
          "Kalesh's public company material describes the product as a real-time anonymous opinion and polling platform being developed for Gen-Z, with a stated intention of creating a safe, judgment-free environment for honest opinions without identity pressure. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "organization",
        heading: "Organization",
        body: [
          "Kalesh is not a standalone unaffiliated website. The DIMISI Technologies website lists Kalesh among the company's products and categorises it as a social platform with real-time polls, private chats and authentic opinion sharing. [3]",
          "Shikhar Dixit is publicly associated with Kalesh as its Founder and CEO; his professional profile records him with DIMISI Technologies Pvt Ltd and describes him in that role. [4] The Kalesh company page independently lists him among the organization's people, providing a second public source for the association. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "team",
        heading: "Team",
        body: [
          "Public Kalesh material references a wider team including Shikhar Dixit, Nishkarsh Mishra, Swatantra Singh, Mridul Mishra and Sheelu Singh, alongside further members named in company updates. [2][5]",
          "Individual role assignments within the Kalesh product are recorded on each person's DIMISIPEDIA entity page where a source exists for that specific role; roles that are not separately sourced are not asserted here.",
        ],
        status: "source-backed",
      },
      {
        id: "technology",
        heading: "Technology",
        body: [
          "A publicly posted Kalesh Android Developer internship announcement describes development work involving Flutter, Dart, Android application development, REST API integration, real-time polling features, backend APIs, Firebase or comparable real-time databases, version control with Git and application performance work. [6]",
          "These are the technologies documented in public Kalesh material. Internal or unpublished parts of the stack are not recorded on this page.",
        ],
        status: "source-backed",
      },
      {
        id: "events",
        heading: "Events",
        body: [
          "Kalesh has publicly documented participation in the MSME Entrepreneurship Conclave & Exhibition. A public post by Shikhar Dixit describes the event as an opportunity for the Kalesh team to represent its vision and to interact with innovators, founders and industry leaders. [5]",
          "No award, government sponsorship or competitive outcome is recorded for this appearance, as no primary event source confirming one has been supplied.",
        ],
        status: "source-backed",
      },
      {
        id: "philosophy",
        heading: "Product philosophy",
        body: [
          "The recurring theme across Kalesh's public material is that identity should not determine the value of an opinion. The platform's messaging consistently emphasises opinion over identity, authentic expression, absence of profile pressure, anonymous participation and real-time engagement, rather than follower-based social networking. [1][2]",
        ],
        status: "source-backed",
      },
      {
        id: "launch",
        heading: "Launch & availability",
        body: [
          "No public launch date, app-store listing or release milestone for Kalesh has been recorded in DIMISIPEDIA.",
        ],
        status: "needs-verification",
      },
    ],
    coverage: [
      {
        area: "Identity",
        status: "source-backed",
        note: "Name, category, domain and company attributes recorded from first-party and public company sources.",
      },
      {
        area: "Features",
        status: "source-backed",
        note: "Feature set recorded from the official product website.",
      },
      {
        area: "Leadership",
        status: "source-backed",
        note: "Founder and CEO association recorded from two public sources.",
      },
      {
        area: "Technology",
        status: "source-backed",
        note: "Stack recorded from a public Kalesh hiring announcement.",
      },
      {
        area: "Events",
        status: "source-backed",
        note: "MSME Entrepreneurship Conclave participation recorded from a public post.",
      },
      {
        area: "Launch",
        status: "needs-verification",
        note: "No release date or store listing recorded.",
      },
      {
        area: "Independent coverage",
        status: "needs-verification",
        note: "No third-party press coverage recorded.",
      },
    ],
    officialLinks: [{ label: "thekalesh.com", url: "https://thekalesh.com", official: true }],
    sourceIds: [
      "src-kalesh-official",
      "src-kalesh-linkedin",
      "src-dimisi-website",
      "src-shikhar-linkedin",
      "src-kalesh-msme",
      "src-kalesh-hiring",
      "src-kalesh-team",
      "src-kalesh-docs",
    ],
    revisions: [
      ...baseRevisions("2026-08-15"),
      {
        n: 2,
        date: "2026-08-15",
        editor: "DIMISIPEDIA Editorial",
        change:
          "Rebuilt as a source-backed article: company attributes, feature set, audience, organization link, team, technology and event participation cited to first-party and public company sources; self-description separated from established fact.",
      },
    ],
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
    seoTitle: "Kalesh — Anonymous Social Media & Opinion Platform | DIMISIPEDIA",
    seoDescription:
      "Kalesh is an India-focused anonymous social media and opinion platform by DIMISI Technologies: anonymous profiles, real-time polls, private chats, team, technology and sources.",
  },

  {
    id: "kaand",
    slug: "kaand",
    path: "/projects/kaand",
    entityType: "project",
    category: "DIMISI Products",
    projectType: "Next-Generation Media / News Platform",
    featuredPriority: 2,
    statusBadge: "UNDER DEVELOPMENT",
    tags: [
      "Media",
      "News",
      "Mobile Application",
      "Flutter",
      "Dart",
      "Android",
      "iOS",
      "DIMISI Product",
      "Under Development",
    ],
    name: "KAAND",
    subtitle: "Next-Generation Mobile News & Media Platform (Android & iOS)",
    image: "/images/kaand-logo.png",
    shortDescription:
      "KAAND is DIMISI's next-generation media and news platform being developed to create a new approach to modern news consumption.",
    answer:
      "KAAND is an internal DIMISI product focused on building a modern, mobile-first media and news experience for Android and iOS using Flutter and Dart. Engineered by rising intern Amrat Awasthi under the technical mentorship of Sheelu Singh and Mridul Mishra, the application explores a fresh approach to digital journalism, fast information discovery, and community-engaged media consumption.",
    lifecycle: "Development",
    facts: [
      { label: "Category", value: "DIMISI Products", status: "source-backed", sourceIds: ["src-kaand-dev"] },
      { label: "Project type", value: "Next-Generation Media / News Platform", status: "source-backed", sourceIds: ["src-kaand-dev"] },
      { label: "Status", value: "Under Development", status: "source-backed", sourceIds: ["src-kaand-dev"] },
      { label: "Target platforms", value: "Android & iOS", status: "source-backed", sourceIds: ["src-kaand-dev"] },
      { label: "Core technologies", value: "Flutter, Dart", status: "source-backed", sourceIds: ["src-kaand-dev"] },
      { label: "Lead developer", value: "Amrat Awasthi (Android Developer Intern — Flutter / DART)", status: "source-backed", sourceIds: ["src-kaand-dev"] },
      { label: "Engineering guidance", value: "Sheelu Singh, Mridul Mishra", status: "source-backed", sourceIds: ["src-kaand-dev"] },
      { label: "Ownership", value: ORG_NAME, status: "documented" },
    ],
    questions: [
      {
        q: "What is KAAND?",
        a: "KAAND is a next-generation media and news platform developed by DIMISI Technologies to reimagine mobile news consumption for Android and iOS devices.",
      },
      {
        q: "Who is building KAAND?",
        a: "KAAND is spearheaded by rising intern and mobile developer Amrat Awasthi under senior engineering guidance from Sheelu Singh and Mridul Mishra.",
      },
      {
        q: "What technologies power the KAAND application?",
        a: "KAAND is engineered using Google's Flutter framework and the Dart programming language, targeting native mobile performance across Android and iOS.",
      },
      {
        q: "Is KAAND publicly launched?",
        a: "No, KAAND is actively under development as an internal product and has not yet been released to public app stores.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview & vision",
        status: "source-backed",
        body: [
          "KAAND is an internal DIMISI product focused on building a modern media and news experience for Android and iOS. [1]",
          "The project is engineered as a mobile-first platform rather than a conventional news website, aiming to establish a fresh approach to news discovery, media consumption, and digital journalism. [1]",
          "Rather than replicating legacy article feeds, KAAND explores reactive visual story delivery and high-signal news discovery tailored for modern digital audiences. [1]",
        ],
      },
      {
        id: "development",
        heading: "Engineering & development team",
        status: "source-backed",
        body: [
          "Lead Developer: Amrat Awasthi serves as the lead application developer, driving UI implementation and state orchestration. [1]",
          "Technical Guidance: The architectural foundation and performance patterns are guided by senior team members Sheelu Singh and Mridul Mishra. [1]",
          "Technology: Built natively with Flutter and Dart for fluid animations, responsive layouts, and cross-platform Android and iOS parity. [1]",
        ],
      },
      {
        id: "status",
        heading: "Development status",
        status: "source-backed",
        body: [
          "KAAND is currently classified under Development. Features and release candidate builds are being tested internally, with no public store deployment completed to date. [1]",
        ],
      },
    ],
    coverage: [
      { area: "Identity & Name", status: "source-backed", note: "Documented in DIMISI product development records." },
      { area: "Team & Guidance", status: "source-backed", note: "Lead developer and mentors verified in engineering rosters." },
      { area: "Technology Stack", status: "source-backed", note: "Flutter and Dart confirmed in application repository records." },
      { area: "Public Launch", status: "needs-verification", note: "Product is actively under development; not yet publicly released." },
    ],
    officialLinks: [],
    sourceIds: ["src-kaand-dev"],
    revisions: baseRevisions("2026-09-04"),
    createdAt: "2026-09-04",
    updatedAt: "2026-09-04",
    seoTitle: "KAAND — Next-Generation Media & News Platform | DIMISIPEDIA",
    seoDescription:
      "KAAND is a next-generation mobile media and news platform developed by DIMISI Technologies using Flutter and Dart. Features, team, and development status.",
  },

  {
    id: "cati-khelghar",
    slug: "cati-khelghar",
    path: "/projects/cati-khelghar",
    entityType: "project",
    category: "DIMISI Labs / Experiments",
    projectType: "Offline Pass-and-Play Gaming Platform",
    featuredPriority: 3,
    statusBadge: "LIVE",
    tags: [
      "Gaming",
      "Offline Gaming",
      "Pass and Play",
      "Local Multiplayer",
      "Family Games",
      "Board Games",
      "DIMISI Labs",
      "Experimental Product",
    ],
    name: "CATI Khelghar",
    subtitle: "Offline Pass-and-Play Local Multiplayer Gaming Platform",
    image: "/images/cati-khelghar-logo.png",
    shortDescription:
      "CATI Khelghar is an offline-first collection of pass-and-play games designed for playing together on a single device without requiring accounts or internet connectivity.",
    answer:
      "CATI Khelghar is an experimental offline gaming platform conceived and engineered by Shikhar Dixit under DIMISI Labs (CATI). Live at cati47.tech, it delivers a curated collection of 16 classic and folk board games designed strictly for local multiplayer and pass-and-play on a single device with zero logins or network dependency.",
    lifecycle: "Active",
    facts: [
      { label: "Category", value: "DIMISI Labs / Experiments", status: "source-backed", sourceIds: ["src-khelghar-official"] },
      { label: "Project type", value: "Offline Pass-and-Play Gaming Platform", status: "source-backed", sourceIds: ["src-khelghar-official"] },
      { label: "Status", value: "Live", status: "source-backed", sourceIds: ["src-khelghar-official"] },
      { label: "Website", value: "cati47.tech", status: "source-backed", sourceIds: ["src-khelghar-official"] },
      { label: "Conceived & developed by", value: "Shikhar Dixit", status: "source-backed", sourceIds: ["src-khelghar-official"] },
      { label: "Total games", value: "16 games", status: "source-backed", sourceIds: ["src-khelghar-official"] },
      { label: "Gameplay modes", value: "Pass & Play, Local Multiplayer, Play with Bot", status: "source-backed", sourceIds: ["src-khelghar-official"] },
      { label: "Account requirement", value: "None (Zero login required)", status: "source-backed", sourceIds: ["src-khelghar-official"] },
    ],
    questions: [
      {
        q: "What is CATI Khelghar?",
        a: "CATI Khelghar is a live offline-first collection of 16 pass-and-play and local multiplayer games created by Shikhar Dixit under DIMISI Labs, accessible at cati47.tech.",
      },
      {
        q: "What games are available on CATI Khelghar?",
        a: "The collection includes 16 titles: Tic Tac Toe, Ludo, Snake & Ladders, Four in a Row, Dots & Boxes, Carrom, Chess, Checkers, Reversi, Ashta Chamma, Mancala, Bagh-Chal, Battleship, Yahtzee, SOS, and Memory Match.",
      },
      {
        q: "Does CATI Khelghar require an account or internet connectivity?",
        a: "No. The core philosophy of CATI Khelghar is zero accounts, no server dependency for gameplay, and instant local pass-and-play on a single shared screen.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview & product philosophy",
        status: "source-backed",
        body: [
          "CATI Khelghar is a DIMISI gaming project focused on simple, accessible, and social offline gameplay. [1]",
          "The platform is designed around local multiplayer and pass-and-play mechanics, allowing friends and family to play together on a single device without depending on online accounts or continuous internet connectivity. [1]",
          "Core product philosophy: No login. No server dependency for gameplay. No unnecessary complexity. Just play together. [1]",
        ],
      },
      {
        id: "games",
        heading: "The 16-game collection",
        status: "source-backed",
        body: [
          "CATI Khelghar features an offline collection of 16 classic, traditional, and strategy games: [1]",
          "1. Tic Tac Toe · 2. Ludo · 3. Snake & Ladders · 4. Four in a Row · 5. Dots & Boxes · 6. Carrom · 7. Chess · 8. Checkers · 9. Reversi · 10. Ashta Chamma · 11. Mancala · 12. Bagh-Chal · 13. Battleship · 14. Yahtzee · 15. SOS · 16. Memory Match. [1]",
          "Each game supports 2 to 4 players depending on the rules, with pass-and-play turns, clean touch controls, and optional bot play. [1]",
        ],
      },
      {
        id: "characteristics",
        heading: "Core characteristics",
        status: "source-backed",
        body: [
          "Offline gameplay: Functions entirely client-side once loaded, eliminating latency and disconnect issues. [1]",
          "Zero login requirement: Immediate access without profile creation, email registration, or tracking cookies. [1]",
          "Social pass-and-play: Engineered specifically for physical gathering, family game nights, and friends playing together on a single phone or tablet. [1]",
        ],
      },
    ],
    coverage: [
      { area: "Identity & URL", status: "source-backed", note: "Verified live at cati47.tech." },
      { area: "Game Catalogue", status: "source-backed", note: "All 16 games documented on the live platform." },
      { area: "Creator", status: "source-backed", note: "Conception and development documented by Shikhar Dixit." },
    ],
    officialLinks: [{ label: "cati47.tech", url: "https://cati47.tech", official: true }],
    sourceIds: ["src-khelghar-official"],
    revisions: baseRevisions("2026-09-04"),
    createdAt: "2026-09-04",
    updatedAt: "2026-09-04",
    seoTitle: "CATI Khelghar — Offline Pass-and-Play Gaming Platform | DIMISIPEDIA",
    seoDescription:
      "CATI Khelghar is an offline-first collection of 16 pass-and-play games by DIMISI Labs (Shikhar Dixit) live at cati47.tech. No login, no accounts, just play together.",
  },

  {
    id: "dimisi-ops",
    slug: "dimisi-ops",
    path: "/projects/dimisi-ops",
    entityType: "project",
    category: "DIMISI Internal Systems",
    projectType: "Internal Employee Management & Task Assignment System",
    featuredPriority: 4,
    statusBadge: "UNDER DEVELOPMENT",
    tags: [
      "Internal Software",
      "Employee Management",
      "Task Management",
      "Operations",
      "Productivity",
      "Enterprise Software",
      "DIMISI Internal",
      "Under Development",
    ],
    image: "/images/dimisi-ops-logo.jpg",
    name: "DIMISI-OPS",
    subtitle: "Internal Operations, Employee Management & Task Assignment System",
    shortDescription:
      "DIMISI-OPS is an internal DIMISI operations platform being developed to manage employees, assign tasks and streamline internal project operations.",
    answer:
      "DIMISI-OPS is a proprietary internal operational software platform developed by DIMISI Technologies to streamline team administration, task allocation, project coordination, and accountability. Conceived by Shikhar Dixit, the system is engineered by Prashant Umrao and Amit Kumar with backend architecture by foundation engineer Mridul Mishra under operational guidance from Nishkarsh Mishra.",
    lifecycle: "Development",
    facts: [
      { label: "Category", value: "DIMISI Internal Systems", status: "source-backed", sourceIds: ["src-dimisi-ops-spec"] },
      { label: "Project type", value: "Internal Employee Management & Task Assignment System", status: "source-backed", sourceIds: ["src-dimisi-ops-spec"] },
      { label: "Status", value: "Under Development", status: "source-backed", sourceIds: ["src-dimisi-ops-spec"] },
      { label: "Concept", value: "Shikhar Dixit (Founder & CEO)", status: "source-backed", sourceIds: ["src-dimisi-ops-spec"] },
      { label: "Development", value: "Prashant Umrao (Full Stack & Tester), Amit Kumar (Backend Development Intern)", status: "source-backed", sourceIds: ["src-dimisi-ops-spec"] },
      { label: "Backend architecture", value: "Mridul Mishra (Foundation Engineer)", status: "source-backed", sourceIds: ["src-dimisi-ops-spec"] },
      { label: "Operational guidance", value: "Nishkarsh Mishra (CFO & COO)", status: "source-backed", sourceIds: ["src-dimisi-ops-spec"] },
      { label: "Target environment", value: "Internal Enterprise Operations", status: "source-backed", sourceIds: ["src-dimisi-ops-spec"] },
    ],
    questions: [
      {
        q: "What is DIMISI-OPS?",
        a: "DIMISI-OPS is a proprietary internal software system engineered specifically to handle employee directory management, task assignment, and project workflow visibility across DIMISI Technologies.",
      },
      {
        q: "Who conceived and developed DIMISI-OPS?",
        a: "The concept was formulated by Shikhar Dixit. Development is driven by rising interns Prashant Umrao and Amit Kumar, with backend infrastructure engineered by Mridul Mishra under operational leadership from Nishkarsh Mishra.",
      },
      {
        q: "Is DIMISI-OPS a commercial product?",
        a: "No. DIMISI-OPS is an internal organizational tool built strictly around DIMISI's own operational requirements under the philosophy 'Build the operational infrastructure that DIMISI itself needs.'",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview & organizational philosophy",
        status: "source-backed",
        body: [
          "DIMISI-OPS is a proprietary internal employee and operations management system being built specifically around DIMISI's own organizational requirements. [1]",
          "The platform centralizes internal staff directories, task assignment, work allocation, project coordination, and cross-functional visibility. [1]",
          "The core philosophy behind DIMISI-OPS is simple: Build the operational infrastructure that DIMISI itself needs. [1]",
        ],
      },
      {
        id: "capabilities",
        heading: "Core intended capabilities",
        status: "source-backed",
        body: [
          "Employee management: Centralized records of team roles, internships, permissions, and departmental assignments. [1]",
          "Task assignment & work allocation: Granular task tracking, sprint assignments, and milestone tracking across projects. [1]",
          "Internal coordination & accountability: Operational visibility linking tasks directly to accountable contributors and project leads. [1]",
          "Project operations visibility: High-level dashboards providing management with real-time operational status updates. [1]",
        ],
      },
      {
        id: "team",
        heading: "Project team & leadership",
        status: "source-backed",
        body: [
          "Concept: Conceived by Shikhar Dixit to replace ad-hoc coordination tools with custom software. [1]",
          "Application Engineering: Developed by rising interns Prashant Umrao and Amit Kumar. [1]",
          "Backend Infrastructure: Built by foundation engineer Mridul Mishra, providing secure internal APIs and database structures. [1]",
          "Operational Oversight: Guided by co-founder Nishkarsh Mishra to align software workflows with company operational policies. [1]",
        ],
      },
    ],
    coverage: [
      { area: "System Identity", status: "source-backed", note: "Documented in DIMISI internal systems architecture." },
      { area: "Team Assignments", status: "source-backed", note: "Engineering and guidance team verified in company records." },
      { area: "Status", status: "source-backed", note: "Confidently documented as an internal system under active development." },
    ],
    officialLinks: [],
    sourceIds: ["src-dimisi-ops-spec"],
    revisions: baseRevisions("2026-09-04"),
    createdAt: "2026-09-04",
    updatedAt: "2026-09-04",
    seoTitle: "DIMISI-OPS — Internal Employee & Operations Management System | DIMISIPEDIA",
    seoDescription:
      "DIMISI-OPS is an internal employee management and task assignment platform developed by DIMISI Technologies for internal company operations.",
  },

  {
    id: "dimisi-corporate-platform",
    slug: "dimisi-corporate-platform",
    path: "/projects/dimisi-corporate-platform",
    entityType: "project",
    category: "DIMISI Internal Systems",
    projectType: "Official Corporate Website",
    featuredPriority: 5,
    statusBadge: "LIVE",
    tags: [
      "DIMISI Technologies",
      "Corporate Website",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Redis",
      "AWS",
      "DigitalOcean",
      "Cloudinary",
    ],
    name: "DIMISI Technologies",
    subtitle: "Official Corporate Web Platform & Technology Showcase",
    image: "/images/dimisi-logo.png",
    shortDescription:
      "The official digital platform of DIMISI Technologies showcasing its technology capabilities, products, services and digital ecosystem.",
    answer:
      "The DIMISI Technologies official website (dimisi.tech) serves as the primary digital identity and technology showcase of DIMISI Technologies Private Limited. Engineered with Next.js, React, TypeScript, and Tailwind CSS on the frontend by Swatantra Singh, with backend infrastructure by Mridul Mishra utilizing Node.js, MongoDB, Redis, and multi-cloud deployment across AWS, DigitalOcean, and Cloudinary.",
    lifecycle: "Active",
    facts: [
      { label: "Category", value: "DIMISI Internal Systems", status: "source-backed", sourceIds: ["src-dimisi-official"] },
      { label: "Project type", value: "Official Corporate Website", status: "source-backed", sourceIds: ["src-dimisi-official"] },
      { label: "Status", value: "Live", status: "source-backed", sourceIds: ["src-dimisi-official"] },
      { label: "Domain", value: "dimisi.tech", status: "source-backed", sourceIds: ["src-dimisi-official"] },
      { label: "Frontend engineering", value: "Swatantra Singh (Co-Founder & CTO)", status: "source-backed", sourceIds: ["src-dimisi-official"] },
      { label: "Backend engineering", value: "Mridul Mishra (Founding Engineer)", status: "source-backed", sourceIds: ["src-dimisi-official"] },
      { label: "Frontend stack", value: "Next.js, React, TypeScript, Tailwind CSS, TanStack", status: "source-backed", sourceIds: ["src-dimisi-official"] },
      { label: "Backend stack", value: "Node.js, TypeScript, MongoDB, Redis", status: "source-backed", sourceIds: ["src-dimisi-official"] },
      { label: "Infrastructure & media", value: "AWS, DigitalOcean, Cloudinary", status: "source-backed", sourceIds: ["src-dimisi-official"] },
    ],
    questions: [
      {
        q: "What is the official website of DIMISI Technologies?",
        a: "The official website is dimisi.tech, acting as the primary technology showcase, corporate overview, and products hub of DIMISI Technologies Private Limited.",
      },
      {
        q: "Who engineered the DIMISI Technologies corporate platform?",
        a: "The website frontend was developed by co-founder and CTO Swatantra Singh, with backend and infrastructure engineered by founding engineer Mridul Mishra.",
      },
      {
        q: "What technology stack is used on dimisi.tech?",
        a: "The frontend utilizes Next.js, React, TypeScript, and Tailwind CSS. The backend utilizes Node.js, MongoDB, Redis, with cloud infrastructure on AWS, DigitalOcean, and media managed via Cloudinary.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview & corporate role",
        status: "source-backed",
        body: [
          "The DIMISI Technologies official website serves as the company's primary digital identity and technology showcase. [1]",
          "It communicates DIMISI's capabilities across software development, artificial intelligence, cloud technologies, digital products, and enterprise engineering while presenting internal products and customer solutions. [1]",
        ],
      },
      {
        id: "development",
        heading: "Engineering & architecture",
        status: "source-backed",
        body: [
          "Frontend Architecture: Built by Swatantra Singh utilizing Next.js, React, TypeScript, and Tailwind CSS for rapid server rendering and fluid user interactions. [1]",
          "Backend & Cloud: Engineered by Mridul Mishra featuring Node.js services, MongoDB document storage, and Redis caching. [1]",
          "Infrastructure & Media: Deployed across AWS and DigitalOcean cloud infrastructure with media management orchestrated via Cloudinary. [1]",
        ],
      },
    ],
    coverage: [
      { area: "Identity & Domain", status: "source-backed", note: "Primary official web presence of DIMISI Technologies." },
      { area: "Architecture & Stack", status: "source-backed", note: "Documented in engineering specifications and deployment manifests." },
    ],
    officialLinks: [{ label: "dimisi.tech", url: "https://dimisi.tech", official: true }],
    sourceIds: ["src-dimisi-official"],
    revisions: baseRevisions("2026-09-04"),
    createdAt: "2026-09-04",
    updatedAt: "2026-09-04",
    seoTitle: "DIMISI Technologies — Official Corporate Web Platform | DIMISIPEDIA",
    seoDescription:
      "Official website and technology platform of DIMISI Technologies (dimisi.tech): tech stack, engineering team, products showcase and cloud architecture.",
  },

  {
    id: "karyon",
    slug: "karyon",
    path: "/projects/karyon",
    entityType: "project",
    category: "DIMISI Products",
    projectType: "Professional Home Services Platform",
    featuredPriority: 6,
    statusBadge: "UNDER DEVELOPMENT",
    tags: [
      "Home Services",
      "Marketplace",
      "Service Booking",
      "On-Demand Services",
      "Professional Services",
      "DIMISI Product",
      "Under Development",
    ],
    name: "KaryON",
    subtitle: "Professional Home Services Platform At Your Doorstep",
    image: "/images/karyon-logo.png",
    shortDescription:
      "KaryON is a professional home-services platform designed to connect customers with service professionals at their doorstep.",
    answer:
      "KaryON is an internal DIMISI product focused on simplifying access to professional home services through a digital booking and service-matching experience. Built around the customer journey 'Book Service → Get Matched → Service Done', the platform connects homeowners with vetted technicians across 8 trade categories, originated through contributions by former core member Siddhant Shekhar.",
    lifecycle: "Development",
    facts: [
      { label: "Category", value: "DIMISI Products", status: "source-backed", sourceIds: ["src-karyon-official"] },
      { label: "Project type", value: "Professional Home Services Platform", status: "source-backed", sourceIds: ["src-karyon-official"] },
      { label: "Status", value: "Under Development", status: "source-backed", sourceIds: ["src-karyon-official"] },
      { label: "Website", value: "karyon.app", status: "source-backed", sourceIds: ["src-karyon-official"] },
      { label: "Customer journey", value: "Book Service → Get Matched → Service Done", status: "source-backed", sourceIds: ["src-karyon-official"] },
      { label: "Service categories", value: "Plumbing, Electrical, Carpentry, Cleaning, Painting, HVAC, Moving, Gardening", status: "source-backed", sourceIds: ["src-karyon-official"] },
      { label: "Project contribution", value: "Siddhant Shekhar (Former Core Member)", status: "source-backed", sourceIds: ["src-karyon-official", "src-team-roster"] },
      { label: "Ownership", value: ORG_NAME, status: "documented" },
    ],
    questions: [
      {
        q: "What is KaryON?",
        a: "KaryON is a professional home-services platform designed to connect customers with verified service professionals at their doorstep.",
      },
      {
        q: "What services does KaryON provide?",
        a: "KaryON covers 8 primary service domains: Plumbing, Electrical, Carpentry, Cleaning, Painting, HVAC, Moving, and Gardening.",
      },
      {
        q: "Who contributed to the development of KaryON?",
        a: "KaryON was contributed by Siddhant Shekhar during his tenure as a core member and web developer at DIMISI Technologies.",
      },
      {
        q: "What is the release status of KaryON?",
        a: "KaryON is currently under development as an internal product, with booking and dispatch workflows undergoing refinement at karyon.app.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview & customer journey",
        status: "source-backed",
        body: [
          "KaryON is a DIMISI product focused on simplifying access to professional home services through a digital booking and service-matching experience. [1]",
          "The platform is designed around the friction-free customer journey: Book Service → Get Matched → Service Done. [1]",
          "By standardizing pricing and verifying professionals, KaryON aims to eliminate unpredictability in household repair and maintenance services. [1]",
        ],
      },
      {
        id: "categories",
        heading: "Supported service categories",
        status: "source-backed",
        body: [
          "KaryON is architected around 8 foundational service domains: [1]",
          "• Plumbing: Leak repairs, fitting installation, and pipeline servicing.",
          "• Electrical: Wiring diagnostics, fixture installations, and appliance repairs.",
          "• Carpentry: Furniture assembly, structural woodwork, and custom repairs.",
          "• Cleaning: Deep home cleaning, kitchen sanitization, and specialized treatment.",
          "• Painting: Interior and exterior wall painting and waterproofing.",
          "• HVAC: Air conditioning maintenance, seasonal servicing, and gas refills.",
          "• Moving: Household relocation, packing, and transit assistance.",
          "• Gardening: Lawn maintenance, landscaping, and plant healthcare.",
        ],
      },
      {
        id: "contribution",
        heading: "Project contribution & history",
        status: "source-backed",
        body: [
          "The platform was formulated and developed during the tenure of Siddhant Shekhar, a former core member and web developer of DIMISI Technologies who was part of the early 'Sinister Six' cohort. [1][2]",
          "Development work focused on the responsive web booking flow, vendor categorization, and service quote estimation engines. [1]",
        ],
      },
    ],
    coverage: [
      { area: "Identity & Domain", status: "source-backed", note: "Documented at karyon.app." },
      { area: "Service Scope", status: "source-backed", note: "8 core service verticals documented in product specifications." },
      { area: "Development History", status: "source-backed", note: "Contributed by former core member Siddhant Shekhar." },
    ],
    officialLinks: [{ label: "karyon.app", url: "https://karyon.app", official: true }],
    sourceIds: ["src-karyon-official", "src-team-roster"],
    revisions: baseRevisions("2026-09-04"),
    createdAt: "2026-09-04",
    updatedAt: "2026-09-04",
    seoTitle: "KaryON — Professional Doorstep Home Services Platform | DIMISIPEDIA",
    seoDescription:
      "KaryON is a professional home services marketplace platform developed at DIMISI Technologies (Siddhant Shekhar). Plumbing, electrical, carpentry, HVAC, and cleaning.",
  },

  {
    id: "dimisipedia",
    slug: "dimisipedia",
    path: "/projects/dimisipedia",
    entityType: "project",
    category: "DIMISI Internal Systems",
    projectType: "Public Knowledge & Documentation Platform",
    featuredPriority: 7,
    statusBadge: "ACTIVE",
    tags: [
      "DIMISIPEDIA",
      "Knowledge Platform",
      "Documentation",
      "Credibility",
      "Entity Graph",
      "DIMISI Internal",
    ],
    image: "/images/dimisipedia-logo.png",
    name: "DIMISIPEDIA",
    subtitle: "Project — knowledge and documentation platform",
    shortDescription:
      "The official public knowledge, documentation and credibility platform of DIMISI Technologies.",
    answer:
      "DIMISIPEDIA is the official public knowledge, information and documentation platform of DIMISI Technologies Pvt. Ltd. It documents the organization, its people, projects, technology, history and activities as a set of source-backed, interconnected entities.",
    lifecycle: "Active",
    facts: [
      { label: "Type", value: "Knowledge platform", status: "documented" },
      { label: "Operated by", value: ORG_NAME, status: "documented" },
      { label: "Domain", value: "dimisipedia.me", status: "documented" },
      { label: "Status", value: "Development", status: "documented" },
    ],
    sections: [
      {
        id: "overview",
        heading: "What DIMISIPEDIA is",
        body: [
          "DIMISIPEDIA is the structured public knowledge layer of DIMISI Technologies. It combines a company encyclopedia, an entity database, a public archive and a source-backed information repository into a single reference platform.",
        ],
        status: "documented",
      },
      {
        id: "why",
        heading: "Why it exists",
        body: [
          "DIMISIPEDIA exists so that both people and machine-based search systems can understand DIMISI Technologies precisely: who founded it, what it builds, who works there, what technologies it uses and how each of those claims is evidenced.",
        ],
        status: "documented",
      },
      {
        id: "operator",
        heading: "Who operates it",
        body: [
          "DIMISIPEDIA is operated by DIMISI Technologies Pvt. Ltd. It is a first-party publication and is not an independent encyclopedia.",
        ],
        status: "documented",
      },
      {
        id: "architecture",
        heading: "Knowledge architecture",
        body: [
          "Every subject is modelled as an entity — organization, person, project, technology, event or article — with a slug, status, sources, relationships and a revision history. Relationships between entities form an internal knowledge graph, and structured data is generated from the same records that produce the readable page.",
        ],
        status: "documented",
      },
      {
        id: "credibility",
        heading: "Credibility system",
        body: [
          "Each claim carries an information status: verified, source-backed, documented, needs verification, historical or archived. DIMISIPEDIA does not publish credibility scores and does not display verification badges it has not earned.",
        ],
        status: "documented",
      },
      {
        id: "seo",
        heading: "Discoverability goals",
        body: [
          "Pages are built for search engines and answer engines alike: unique metadata, canonical URLs, breadcrumbs, semantic HTML, direct factual answers, structured data and stable human-readable URLs.",
        ],
        status: "documented",
      },
    ],
    coverage: [
      { area: "Identity", status: "documented", note: "Purpose and operator documented." },
      {
        area: "Architecture",
        status: "documented",
        note: "Defined in the product requirements document.",
      },
      {
        area: "Release history",
        status: "needs-verification",
        note: "Version milestones not yet recorded.",
      },
    ],
    officialLinks: [{ label: "dimisipedia.me", url: "https://dimisipedia.me", official: true }],
    sourceIds: ["src-dimisipedia-spec"],
    revisions: baseRevisions("2026-08-15"),
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
    seoTitle: "DIMISIPEDIA — Knowledge Platform of DIMISI Technologies",
    seoDescription:
      "DIMISIPEDIA is the official public knowledge and documentation platform of DIMISI Technologies Pvt. Ltd. Purpose, architecture and credibility system.",
  },

  {
    id: "rudra-tours",
    slug: "rudra-tours",
    path: "/projects/rudra-tours",
    entityType: "project",
    category: "Client Projects",
    projectType: "Client Website Development + Digital Brand Building",
    featuredPriority: 8,
    statusBadge: "ACTIVE",
    tags: [
      "Travel",
      "Tourism",
      "Car Rental",
      "Next.js",
      "SEO",
      "AEO",
      "GEO",
      "Client Project",
    ],
    name: "Rudra Tours & Travels",
    subtitle: "Client Project — End-to-End Digital Transformation & Web Platform",
    image: "/images/rudra-tours-logo.png",
    shortDescription:
      "High-performance Next.js travel platform and digital brand built by DIMISI Technologies with comprehensive SEO, AEO, and GEO architecture.",
    answer:
      "Rudra Tours & Travels is a Kanpur-based travel, tourism, car rental, and tour operations company whose complete digital presence and web platform was designed, engineered, and deployed by DIMISI Technologies. Built with Next.js, the platform features dedicated intent-based routing, city travel guides, vehicle fleets, 25 tour itineraries, and structured Answer Engine (AEO) and Generative Engine Optimization (GEO).",
    lifecycle: "Active",
    facts: [
      {
        label: "Client",
        value: "Rudra Tours & Travels",
        status: "source-backed",
        sourceIds: ["src-rudra-official", "src-dimisi-client-portfolio"],
      },
      {
        label: "Category",
        value: "Client Project",
        status: "source-backed",
        sourceIds: ["src-dimisi-client-portfolio"],
      },
      {
        label: "Project type",
        value: "Client Website Development + Digital Brand Building",
        status: "source-backed",
        sourceIds: ["src-dimisi-client-portfolio"],
      },
      {
        label: "Industry",
        value: "Travel, Tourism, Car Rental & Tour Operations",
        status: "source-backed",
        sourceIds: ["src-rudra-official"],
      },
      {
        label: "Location",
        value: "Kanpur, Uttar Pradesh, India",
        status: "source-backed",
        sourceIds: ["src-rudra-official"],
      },
      {
        label: "Technology",
        value: "Next.js, React, TypeScript, Tailwind CSS",
        status: "source-backed",
        sourceIds: ["src-dimisi-client-portfolio"],
      },
      {
        label: "Services delivered",
        value:
          "UI/UX Design, Next.js Development, SEO, AEO, GEO Optimization, Testing, Security, Production Deployment, Brand Building",
        status: "source-backed",
        sourceIds: ["src-dimisi-client-portfolio"],
      },
      {
        label: "Status",
        value: "Active / Production",
        status: "source-backed",
        sourceIds: ["src-rudra-official"],
      },
      {
        label: "Website",
        value: "toursbyrudra.com",
        status: "source-backed",
        sourceIds: ["src-rudra-official"],
      },
    ],
    questions: [
      {
        q: "What was DIMISI Technologies' role in Rudra Tours & Travels?",
        a: "DIMISI Technologies provided end-to-end digital transformation for Rudra Tours & Travels, delivering full UI/UX design, custom Next.js web development, commercial and local SEO architecture, FAQ-based Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), security hardening, and production deployment.",
      },
      {
        q: "What technology stack powers the Rudra Tours platform?",
        a: "The platform is built on Next.js, featuring server-side rendering (SSR) and static generation for fast page loads, component-driven modular UI, dynamic vehicle and itinerary catalogues, and structured metadata for search bots.",
      },
      {
        q: "How does the SEO architecture work for Rudra Tours?",
        a: "Rather than a single brochure homepage, the architecture covers dedicated commercial landing pages for cab services, tempo travellers, luxury car rentals, and airport transfers, specific inter-city route pages (Kanpur to Lucknow, Ayodhya, Prayagraj, Varanasi, Delhi, Agra), and in-depth city guides.",
      },
      {
        q: "What is the GEO and AEO strategy implemented on the website?",
        a: "The website incorporates comprehensive question-answering schemas and dedicated FAQs addressing trip cost, travel time, vehicle availability, and airport pickups, as well as clear entity definitions connecting Kanpur, specific routes, vehicles, and tour packages so generative AI engines can accurately cite the business.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Project overview & business model",
        body: [
          "Rudra Tours & Travels was developed by DIMISI Technologies as a modern, high-performance travel platform engineered around the client's commercial requirements and business model. [1][2]",
          "The website unifies India tour packages, car rentals, taxi and cab services, outstation travel, wedding transportation, corporate travel, and customised trip planning into a single structured digital experience. [1]",
          "Rather than relying on a generic brochure page, the live website delivers dedicated service, route, city-guide, vehicle, and tour-package content built to capture commercial search demand and direct booking enquiries across North India. [1][2]",
        ],
        status: "source-backed",
      },
      {
        id: "challenge",
        heading: "Client challenge & objectives",
        body: [
          "Prior to the engagement, the client operated primarily as a conventional offline travel operator in Kanpur, facing fierce competition from aggregator platforms and lacking a direct digital acquisition funnel.",
          "The primary objective was transforming Rudra Tours & Travels from a regional operator into an authoritative digital travel brand with a searchable footprint capable of capturing commercial high-intent search queries for outstation cabs, tour packages, and group travel.",
        ],
        status: "source-backed",
      },
      {
        id: "strategy",
        heading: "Brand building & search intent strategy",
        body: [
          "DIMISI approached the project not merely as a website-development assignment, but as a complete digital brand-building and search-visibility project from scratch. [2]",
          "The architectural strategy maps the brand across multiple search-intent layers: Brand → Service → City → Route → Vehicle → Destination → Tour Package → FAQ. [1]",
          "Through this framework, a prospective traveler searching for a Kanpur cab, a specific Kanpur–Lucknow route, tempo traveller rentals, a pilgrimage tour, or regional destination guides enters directly into Rudra's digital ecosystem. [1]",
          "The website presents 25 ready-to-go itineraries categorized across Pilgrimage, North India, West India, and South India tour packages. [1]",
        ],
        status: "source-backed",
      },
      {
        id: "design",
        heading: "Premium UI/UX design",
        body: [
          "Travel-focused visual identity: Created a modern, polished visual system reflecting reliability, comfort, and heritage travel. [1]",
          "Conversion-oriented layouts: Engineered intuitive booking and enquiry journeys with prominent call-to-action buttons, direct messaging channels, and structured quotation request forms. [1]",
          "Information hierarchy: Developed clear categorization enabling customers to effortlessly switch between cab rentals, outstation routes, vehicle fleets, and multi-day holiday packages.",
          "Responsive experience: Fully responsive layouts optimized for fast mobile discovery and seamless desktop browsing. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "development",
        heading: "Next.js web development",
        body: [
          "The platform was engineered on Next.js, leveraging component-driven architecture for rapid rendering and scalability. [2]",
          "Dynamic tour and vehicle presentation: Modular data structures enabling dynamic display of fleet specifications, seating capacities, amenities, and pricing structures. [1]",
          "Structured service and location pages: Clean programmatic routing supporting dedicated landing pages across all target regional routes and services. [1]",
          "Scalable code architecture: Built with TypeScript and Tailwind CSS to maintain code hygiene, rapid iteration capability, and long-term maintainability.",
        ],
        status: "source-backed",
      },
      {
        id: "seo",
        heading: "Commercial & local SEO architecture",
        body: [
          "The website was architected around specific commercial and local search intent, establishing a broad footprint far exceeding traditional travel agency websites. [1][2]",
          "Dedicated commercial service pages: Car Rental in Kanpur, Taxi Service in Kanpur, Cab Booking in Kanpur, Tempo Traveller Rentals, Luxury Car Rental, and Airport Transfers. [1]",
          "Inter-city corridor route pages: High-intent landing pages for Kanpur → Lucknow, Kanpur → Ayodhya, Kanpur → Prayagraj, Kanpur → Varanasi, Kanpur → Delhi, and Kanpur → Agra. [1]",
          "City travel guides: Comprehensive regional guide content for Kanpur, Lucknow, Agra, Prayagraj, Varanasi, and Ayodhya, establishing local topical authority and semantic depth. [1]",
        ],
        status: "source-backed",
      },
      {
        id: "aeo",
        heading: "AEO — Answer Engine Optimization",
        body: [
          "The content architecture was structured to make critical customer questions directly answerable by search engine answer boxes and AI assistant engines. [1][2]",
          "Service and route pages feature dedicated FAQ accordions addressing typical commercial queries regarding one-way fares, toll and tax inclusions, travel duration, airport pickups, advance booking policies, and vehicle availability. [1]",
          "Structured Q&A formats enable search engines to directly extract answers for rich snippets and featured voice query results. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "geo",
        heading: "GEO — Generative Engine Optimization",
        body: [
          "The platform was constructed around clear semantic entity modeling to ensure discovery by generative AI systems (including ChatGPT, Google Gemini, and Perplexity). [2]",
          "Entity mapping links Rudra Tours & Travels to specific destinations, travel categories, routes, fleet types, corporate and wedding use cases, and location-specific intents. [1]",
          "Semantically linked internal pages provide search engines and AI models with rich machine-readable context about operating jurisdictions, fleet capabilities, and service specializations. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "qa-security",
        heading: "Quality assurance, security & deployment",
        body: [
          "Testing & QA: Comprehensive cross-browser and cross-device testing, enquiry form flow validation, click-to-call verification, and Core Web Vitals performance tuning. [2]",
          "Security: Hardened production deployment, SSL/TLS encryption, secure API endpoints, and header security best practices. [2]",
          "Production deployment: Integrated with high-availability CDN edge hosting, custom domain configuration, and continuous deployment validation. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "outcomes",
        heading: "Project outcome & impact",
        body: [
          "DIMISI transformed Rudra Tours & Travels from a regional business into a structured, scalable travel-search platform designed for long-term organic growth and brand discovery. [1][2]",
          "The platform serves as an active commercial acquisition channel, handling real-time traveller inquiries across Uttar Pradesh and North Indian tourism circuits. [1]",
        ],
        status: "source-backed",
      },
    ],
    coverage: [
      {
        area: "Identity & Client",
        status: "source-backed",
        note: "Client name, domain, and Kanpur base documented on live website.",
      },
      {
        area: "Development Stack",
        status: "source-backed",
        note: "Next.js architecture documented in DIMISI client delivery records.",
      },
      {
        area: "SEO & Route Architecture",
        status: "source-backed",
        note: "Verified across live dedicated route, service, and city guide pages.",
      },
      {
        area: "AEO & FAQs",
        status: "source-backed",
        note: "Verified from interactive FAQ sections on live service and route pages.",
      },
      {
        area: "Services & Itineraries",
        status: "source-backed",
        note: "25 tour packages and full vehicle fleet verified on live website.",
      },
      {
        area: "SERP Rankings",
        status: "needs-verification",
        note: "Search engine rank positions require Search Console tracking data.",
      },
    ],
    officialLinks: [
      { label: "toursbyrudra.com", url: "https://www.toursbyrudra.com", official: true },
    ],
    sourceIds: ["src-rudra-official", "src-dimisi-client-portfolio"],
    revisions: [
      ...baseRevisions("2026-09-04"),
      {
        n: 2,
        date: "2026-09-04",
        editor: "DIMISIPEDIA Editorial",
        change:
          "Published verified client project case study documenting UI/UX design, Next.js development, SEO, AEO, and GEO optimization delivered by DIMISI Technologies.",
      },
    ],
    createdAt: "2026-06-15",
    updatedAt: "2026-09-04",
    seoTitle: "Rudra Tours & Travels — Client Project Case Study | DIMISIPEDIA",
    seoDescription:
      "Case study of Rudra Tours & Travels web platform developed by DIMISI Technologies: Next.js architecture, local and route SEO, AEO FAQs, and GEO entity modeling.",
  },

  {
    id: "yadhuvanshi-tours",
    slug: "yadhuvanshi-tours",
    path: "/projects/yadhuvanshi-tours",
    entityType: "project",
    category: "Client Projects",
    projectType: "Client Website Development + Digital Brand Building",
    featuredPriority: 9,
    statusBadge: "ACTIVE",
    tags: [
      "Travel",
      "Luxury Tourism",
      "Wedding Transport",
      "Next.js",
      "SEO",
      "AEO",
      "GEO",
      "Client Project",
    ],
    name: "Yadhuvanshi Tours & Travels",
    subtitle: "Client Project — Premium Travel, Tourism & Wedding Transportation Platform",
    image: "/images/yadhuvanshi-tours-logo.png",
    shortDescription:
      "Luxury travel and wedding transportation digital platform engineered by DIMISI Technologies with Next.js, experience-led design, and multi-intent search architecture.",
    answer:
      "Yadhuvanshi Tours & Travels is a Kanpur-based luxury travel, tour operator, and wedding transportation specialist whose digital platform and brand experience were designed, developed, and deployed by DIMISI Technologies. Built with Next.js around the brand positioning 'Wander Beyond Ordinary', the platform features cinematic destination discovery, an extensive luxury and wedding fleet catalogue, and structured SEO, AEO, and GEO architectures.",
    lifecycle: "Active",
    facts: [
      {
        label: "Client",
        value: "Yadhuvanshi Tours & Travels",
        status: "source-backed",
        sourceIds: ["src-yadhuvanshi-official", "src-dimisi-client-portfolio"],
      },
      {
        label: "Category",
        value: "Client Project",
        status: "source-backed",
        sourceIds: ["src-dimisi-client-portfolio"],
      },
      {
        label: "Project type",
        value: "Client Website Development + Digital Brand Building",
        status: "source-backed",
        sourceIds: ["src-dimisi-client-portfolio"],
      },
      {
        label: "Industry",
        value: "Travel, Tourism, Car Rental & Wedding Travel",
        status: "source-backed",
        sourceIds: ["src-yadhuvanshi-official"],
      },
      {
        label: "Location",
        value: "Kanpur, Uttar Pradesh, India",
        status: "source-backed",
        sourceIds: ["src-yadhuvanshi-official"],
      },
      {
        label: "Technology",
        value: "Next.js, React, TypeScript, Tailwind CSS",
        status: "source-backed",
        sourceIds: ["src-dimisi-client-portfolio"],
      },
      {
        label: "Brand positioning",
        value: "“Wander Beyond Ordinary”",
        status: "source-backed",
        sourceIds: ["src-yadhuvanshi-official"],
      },
      {
        label: "Specialization",
        value: "Luxury Fleet, India Tour Packages & Dedicated Wedding Travel (500+ weddings served)",
        status: "source-backed",
        sourceIds: ["src-yadhuvanshi-official"],
      },
      {
        label: "Services delivered",
        value:
          "UI/UX Design, Web Development, SEO, AEO, GEO Optimization, Testing, Security, Deployment, Brand Building",
        status: "source-backed",
        sourceIds: ["src-dimisi-client-portfolio"],
      },
      {
        label: "Status",
        value: "Active / Production",
        status: "source-backed",
        sourceIds: ["src-yadhuvanshi-official"],
      },
      {
        label: "Website",
        value: "yadhuvanshitours.com",
        status: "source-backed",
        sourceIds: ["src-yadhuvanshi-official"],
      },
    ],
    questions: [
      {
        q: "What is Yadhuvanshi Tours & Travels?",
        a: "Yadhuvanshi Tours & Travels is a premier travel, car rental, and wedding transport company based in Kanpur, Uttar Pradesh, offering curated India tours, luxury car rentals, pilgrimage packages, and full-scale wedding convoy logistics.",
      },
      {
        q: "What did DIMISI Technologies deliver for Yadhuvanshi Tours?",
        a: "DIMISI Technologies provided complete digital transformation, including aspirational UI/UX design, custom Next.js engineering, multi-intent SEO architecture, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), responsive QA, and secure production deployment.",
      },
      {
        q: "What makes the Yadhuvanshi Tours platform unique?",
        a: "The platform emphasizes an experience-driven luxury identity with the brand tagline 'Wander Beyond Ordinary', featuring dedicated wedding logistics showcases (500+ weddings served), cinematic destination imagery across 40+ destinations, and a dynamic vehicle catalogue ranging from luxury sedans to tempo travellers and coaches.",
      },
      {
        q: "How does the platform utilize SEO, AEO, and GEO?",
        a: "The website incorporates structured metadata and semantic entity relationships linking Yadhuvanshi to Kanpur, luxury weddings, pilgrimage packages, and vehicle rentals. Content is organized with clear answers and FAQ schemas to facilitate direct answers in search engines and generative AI tools.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Project overview & brand vision",
        body: [
          "Yadhuvanshi Tours & Travels was developed by DIMISI Technologies as a premium travel platform focused on creating an aspirational, experience-driven digital identity. [1][2]",
          "The live website positions the company around India tour packages, car rentals, and luxury wedding travel, while incorporating destinations, vehicle rentals, pilgrimage journeys, and bespoke travel experiences. [1]",
          "The design direction deliberately moves beyond a basic travel-agency website toward a premium lifestyle and travel brand experience. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "challenge",
        heading: "Client challenge & market differentiation",
        body: [
          "The luxury travel and wedding transportation sector in Uttar Pradesh is heavily reliant on word-of-mouth and fragmented intermediaries, making it challenging for premium operators to showcase the full depth of their fleet and service capabilities.",
          "The challenge was to establish a digital presence that instantly communicates prestige, trust, and luxury while catering to dual commercial markets: high-end corporate/tour travellers and large-scale wedding logistics planners.",
        ],
        status: "source-backed",
      },
      {
        id: "strategy",
        heading: "Strategic positioning: 'Wander Beyond Ordinary'",
        body: [
          "DIMISI shaped the digital positioning around the core brand ethos “Wander Beyond Ordinary”, aligning visual hierarchy, typography, and copywriting to evoke prestige and discovery. [1]",
          "The homepage and navigation structure highlight credible business entities, including 40+ destinations, 15+ years of operational experience, 1,000+ satisfied travellers, and 24/7 dedicated support. [1]",
          "This measurable social proof provides both human visitors and automated search crawlers with verified contextual credibility. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "design",
        heading: "Cinematic UI/UX design",
        body: [
          "Luxury visual language: Implemented an elegant gold-and-dark aesthetic with high-definition destination imagery, bespoke iconography, and clean typography. [1]",
          "Cinematic destination presentation: Built visually rich destination landing sections that immerse users in holiday experiences across India. [1]",
          "Fleet showcase: Interactive vehicle catalogue presenting interior/exterior views, seating capacities, chauffeur amenities, and luggage specifications.",
          "Wedding travel showcase: Dedicated high-impact gallery and narrative flow highlighting bridal cars, guest bus fleets, and coordinated wedding convoy logistics. [1]",
        ],
        status: "source-backed",
      },
      {
        id: "development",
        heading: "Next.js development & architecture",
        body: [
          "Constructed using modern Next.js, optimizing for sub-second page transitions, image optimization, and server-side rendering. [2]",
          "Modular component system: Reusable UI blocks for tour cards, vehicle specifications, enquiry modals, and testimonial carousels. [1]",
          "Dynamic package architecture: Built to easily manage and scale regional tour offerings across pilgrimage, wildlife, hill stations, and cultural circuits. [1]",
          "Seamless enquiry flows: Direct multi-channel enquiry triggers connecting visitors directly to booking executives via phone, WhatsApp, and structured lead forms.",
        ],
        status: "source-backed",
      },
      {
        id: "seo",
        heading: "SEO & multi-intent search architecture",
        body: [
          "The website architecture was designed around multiple high-value travel intents rather than solely targeting the brand name. [2]",
          "Core intent clusters: Tour packages, vehicle rentals, wedding transport, outstation destinations, pilgrimage tours, luxury sedans, and corporate transport. [1]",
          "Location and destination optimization: Comprehensive on-page and semantic signals targeting regional travelers departing from Kanpur and Lucknow to key Indian tourist hubs. [1]",
        ],
        status: "source-backed",
      },
      {
        id: "aeo",
        heading: "AEO — Answer Engine Optimization",
        body: [
          "Content across the website was structured into concise, authoritative answers addressing traveler queries. [2]",
          "Structured content blocks directly address common customer questions regarding wedding convoy pricing, outstation driver allowances, vehicle sanitation, cancellation terms, and multi-city route planning. [1]",
          "Optimized for conversational discovery, voice searches, and smart AI assistant summaries.",
        ],
        status: "source-backed",
      },
      {
        id: "geo",
        heading: "GEO — Generative Engine Optimization",
        body: [
          "The platform was engineered to establish machine-readable contextual relationships between entities: Yadhuvanshi → Travel Company → Kanpur → India Tours → Destinations → Vehicles → Pilgrimage → Weddings → Travel Experiences. [2]",
          "This semantic ontology enables AI search engines to accurately understand the scope of services, geographic coverage, and commercial differentiators of Yadhuvanshi Tours. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "wedding",
        heading: "Dedicated wedding transportation positioning",
        body: [
          "One of the strongest differentiators of the Yadhuvanshi project is its dedicated wedding-travel positioning, an underserved niche in standard travel agency web design. [1][2]",
          "The website highlights luxury decorated bridal cars, vintage vehicles, guest transportation tempo travellers, luxury coaches, uniformed chauffeurs, and 24/7 on-ground wedding coordinators. [1]",
          "The live platform prominently displays an established milestone of 500+ weddings served since 2010. [1]",
        ],
        status: "source-backed",
      },
      {
        id: "qa-security",
        heading: "Testing, security & production deployment",
        body: [
          "Comprehensive quality assurance encompassing cross-device responsive validation, form submission checks, and speed optimization. [2]",
          "Implemented enterprise-grade security headers, SSL certificates, protected contact APIs, and spam prevention. [2]",
          "Deployed to edge CDN infrastructure ensuring rapid load times, 99.9% availability, and automated continuous delivery. [2]",
        ],
        status: "source-backed",
      },
      {
        id: "outcomes",
        heading: "Project outcome & commercial impact",
        body: [
          "DIMISI transformed Yadhuvanshi Tours & Travels into a premium, search-oriented digital travel platform supporting both luxury brand discovery and commercial travel enquiries. [1][2]",
          "The platform has established Yadhuvanshi as a top-tier travel and wedding convoy partner in Kanpur and the broader Uttar Pradesh region. [1]",
        ],
        status: "source-backed",
      },
    ],
    coverage: [
      {
        area: "Identity & Client",
        status: "source-backed",
        note: "Client name, brand mark, and Kanpur base documented on live website.",
      },
      {
        area: "Development Stack",
        status: "source-backed",
        note: "Next.js architecture documented in DIMISI client delivery records.",
      },
      {
        area: "Wedding Travel Milestone",
        status: "source-backed",
        note: "500+ weddings served since 2010 documented on live website.",
      },
      {
        area: "Destinations & Fleet",
        status: "source-backed",
        note: "40+ destinations and full fleet catalogue verified on live platform.",
      },
      {
        area: "AEO & GEO Structure",
        status: "source-backed",
        note: "Verified through semantic schemas and FAQ architecture.",
      },
      {
        area: "SERP Rankings",
        status: "needs-verification",
        note: "Independent SERP rank verification requires Search Console tracking data.",
      },
    ],
    officialLinks: [
      { label: "yadhuvanshitours.com", url: "https://www.yadhuvanshitours.com", official: true },
    ],
    sourceIds: ["src-yadhuvanshi-official", "src-dimisi-client-portfolio"],
    revisions: [
      ...baseRevisions("2026-09-04"),
      {
        n: 2,
        date: "2026-09-04",
        editor: "DIMISIPEDIA Editorial",
        change:
          "Published verified client project case study documenting luxury UI/UX design, Next.js engineering, wedding travel positioning, and SEO/GEO architecture delivered by DIMISI Technologies.",
      },
    ],
    createdAt: "2026-07-01",
    updatedAt: "2026-09-04",
    seoTitle: "Yadhuvanshi Tours & Travels — Client Project Case Study | DIMISIPEDIA",
    seoDescription:
      "Case study of Yadhuvanshi Tours & Travels luxury travel and wedding platform engineered by DIMISI Technologies: Next.js stack, wedding travel positioning, and multi-intent SEO/GEO.",
  },
];

const techEntity = (id: string, name: string, answer: string, usedBy: string[]): Entity => ({
  id,
  slug: id,
  path: `/technology/${id}`,
  entityType: "technology",
  name,
  subtitle: "Technology",
  shortDescription: answer,
  answer,
  facts: [
    { label: "Category", value: "Software technology", status: "documented" },
    { label: "Used in", value: usedBy.join(", "), status: "needs-verification" },
  ],
  sections: [
    {
      id: "overview",
      heading: "Association with DIMISI",
      body: [
        `${name} is recorded in DIMISI project documentation in association with ${usedBy.join(" and ")}. Whether it forms part of a confirmed production stack has not been verified.`,
      ],
      status: "needs-verification",
    },
  ],
  coverage: [
    { area: "Association", status: "documented", note: "Recorded in project documentation." },
    {
      area: "Production use",
      status: "needs-verification",
      note: "Not confirmed by an administrator.",
    },
  ],
  officialLinks: [],
  sourceIds: ["src-kalesh-docs"],
  revisions: baseRevisions("2026-08-15"),
  createdAt: "2026-08-15",
  updatedAt: "2026-08-15",
  seoTitle: `${name} at DIMISI Technologies | DIMISIPEDIA`,
  seoDescription: answer,
});

const technologies: Entity[] = [
  techEntity(
    "react",
    "React",
    "React is a JavaScript library for building user interfaces, recorded in DIMISI project documentation.",
    ["Kalesh", "DIMISIPEDIA"],
  ),
  techEntity(
    "node-js",
    "Node.js",
    "Node.js is a JavaScript runtime recorded in DIMISI project documentation.",
    ["Kalesh"],
  ),
  techEntity(
    "typescript",
    "TypeScript",
    "TypeScript is a typed superset of JavaScript recorded in DIMISI project documentation.",
    ["Kalesh", "DIMISIPEDIA"],
  ),
  techEntity(
    "express",
    "Express",
    "Express is a Node.js web framework recorded in DIMISI project documentation.",
    ["Kalesh"],
  ),
  techEntity(
    "mongodb",
    "MongoDB",
    "MongoDB is a document database recorded in DIMISI project documentation.",
    ["Kalesh"],
  ),
  techEntity(
    "vite",
    "Vite",
    "Vite is a front-end build tool recorded in DIMISI project documentation.",
    ["Kalesh", "DIMISIPEDIA"],
  ),
  techEntity(
    "flutter",
    "Flutter",
    "Flutter is a cross-platform application framework documented in public Kalesh hiring material as part of the Kalesh mobile stack.",
    ["Kalesh"],
  ),
  techEntity(
    "dart",
    "Dart",
    "Dart is the programming language used with Flutter, documented in public Kalesh hiring material.",
    ["Kalesh"],
  ),
  techEntity(
    "firebase",
    "Firebase",
    "Firebase is a real-time backend platform documented in public Kalesh hiring material in connection with real-time polling features.",
    ["Kalesh"],
  ),
  techEntity(
    "next-js",
    "Next.js",
    "Next.js is a React framework for full-stack web applications, used by DIMISI Technologies for platforms including Rudra Tours & Travels, Yadhuvanshi Tours & Travels, and the official corporate site.",
    ["Rudra Tours & Travels", "Yadhuvanshi Tours & Travels", "DIMISI Technologies"],
  ),
  techEntity(
    "tailwind-css",
    "Tailwind CSS",
    "Tailwind CSS is a utility-first CSS framework used across DIMISI Technologies web platforms.",
    ["DIMISI Technologies", "Rudra Tours & Travels", "Yadhuvanshi Tours & Travels", "DIMISIPEDIA"],
  ),
  techEntity(
    "redis",
    "Redis",
    "Redis is an in-memory data store utilized by DIMISI Technologies for caching and real-time queuing.",
    ["DIMISI Technologies", "The Kalesh"],
  ),
  techEntity(
    "aws",
    "AWS",
    "Amazon Web Services provides cloud computing and scalable deployment infrastructure for DIMISI Technologies systems.",
    ["DIMISI Technologies"],
  ),
  techEntity(
    "digital-ocean",
    "DigitalOcean",
    "DigitalOcean provides cloud VPS and application hosting services for DIMISI systems.",
    ["DIMISI Technologies"],
  ),
  techEntity(
    "cloudinary",
    "Cloudinary",
    "Cloudinary provides cloud-based image and media management services for DIMISI Technologies platforms.",
    ["DIMISI Technologies"],
  ),
];

export const sources: Source[] = [...baseSources, ...founderSources];
export const relationships: Relationship[] = [...baseRelationships, ...founderRelationships];

export const entities: Entity[] = [organization, ...people, ...projects, ...technologies];

export const peopleEntities = people;
export const projectEntities = projects;
export const technologyEntities = technologies;
export const organizationEntity = organization;

export interface TimelineEntry {
  date: string;
  displayDate: string;
  title: string;
  description: string;
  related: string[];
  category: string;
  status: InfoStatus;
  sourceId?: string;
}

const baseTimeline: TimelineEntry[] = [
  {
    date: "2024-10-15",
    displayDate: "15 October 2024",
    title: "Gandhigiri Face Recognition project & Birth of CATI",
    description:
      "Shikhar Dixit and Swatantra Singh developed a working Face Recognition System in 6–7 hours at home to present at Axis College's Gandhigiri technical project presentation event, deciding that evening to become business partners and founding CATI (Cosmic Aura Tech Industry), joined by Nishkarsh Mishra in the AICTE lab.",
    related: ["shikhar-dixit", "swatantra-singh", "nishkarsh-mishra", "dimisi-technologies"],
    category: "Founding",
    status: "source-backed",
  },
  {
    date: "2025-01-28",
    displayDate: "28 January – 4 February 2025",
    title: "IIT Bombay E-Summit 2025 participation",
    description:
      "The founding team traveled from Kanpur to Mumbai to attend IIT Bombay E-Summit 2025, gaining foundational experience in startup dynamics, pitch evaluation, and tech entrepreneurship.",
    related: ["shikhar-dixit", "swatantra-singh", "nishkarsh-mishra"],
    category: "Event",
    status: "source-backed",
  },
  {
    date: "2025-11-13",
    displayDate: "13 November 2025",
    title: "Poll-Social prototype developed and deployed",
    description:
      "Following campus placement rejections and a late-night strategy discussion with Priya, Shikhar Dixit coded the initial anonymous social platform prototype (Poll-Social), deployed live on Netlify.",
    related: ["shikhar-dixit", "kalesh"],
    category: "Project",
    status: "source-backed",
  },
  {
    date: "2025-11-17",
    displayDate: "17 November 2025",
    title: "Project Kalesh team formation & core onboarding",
    description:
      "The project was named Kalesh with the tagline 'Chalo Kalesh Karey'. Sheelu Singh (Flutter Android Developer) and Mridul Mishra (Linux & Backend Developer) joined the core team, completing initial joining agreements under CATI.",
    related: [
      "kalesh",
      "shikhar-dixit",
      "swatantra-singh",
      "nishkarsh-mishra",
      "sheelu-singh",
      "mridul-mishra",
    ],
    category: "Team",
    status: "source-backed",
  },
  {
    date: "2025-12-05",
    displayDate: "December 2025",
    title: "Startup & Entrepreneurship evaluation and Shark Tank submission",
    description:
      "The team delivered their Kalesh presentation under the mentorship of Jayendra Pratap Singh (Jayant Sir) at Axis College, receiving media studio access and submitting an application video for Shark Tank India.",
    related: ["kalesh", "shikhar-dixit", "swatantra-singh", "nishkarsh-mishra"],
    category: "Mentorship",
    status: "source-backed",
  },
  {
    date: "2026-01-22",
    displayDate: "22 January 2026",
    title: "TheKalesh.com web platform deployed",
    description:
      "Development of the official Kalesh web platform began on 4 January 2026 with web developer Siddhant Shekhar joining the team, successfully deploying live on TheKalesh.com on 22 January by Mridul Mishra.",
    related: ["kalesh", "mridul-mishra", "shikhar-dixit"],
    category: "Project",
    status: "source-backed",
  },
  {
    date: "2026-02-01",
    displayDate: "February 2026",
    title: "Campus office space allocated in Sand Tank area",
    description:
      "Dedicated physical office space was officially allocated to the team in the Sand Tank area at the Axis College campus, establishing their first operational headquarters for development and team coordination.",
    related: [
      "kalesh",
      "dimisi-technologies",
      "shikhar-dixit",
      "swatantra-singh",
      "nishkarsh-mishra",
    ],
    category: "Operations",
    status: "source-backed",
  },
  {
    date: "2026-02-22",
    displayDate: "22 February 2026",
    title: "Internship cohort onboarded at Sand Tank office",
    description:
      "With college administration approval, four interns joined the team at the Sand Tank office: Saumya Shukla (Social Media Marketing), Niyati Gupta (Backend), Harsh Mishra (Video Editor), and Amit Kumar (Backend Intern).",
    related: ["kalesh", "dimisi-technologies"],
    category: "Team",
    status: "source-backed",
  },
  {
    date: "2026-03-15",
    displayDate: "March 2026",
    title: "Creation of the 'DIMISI' name formula",
    description:
      "Facing MCA trademark conflicts with CATI during mid-sem exams, Shikhar Dixit formulated the name DIMISI (DI from Dixit, MI from Mishra, SI from Singh) on the back of an exam sheet, clearing MCA verification with zero conflicts.",
    related: ["dimisi-technologies", "shikhar-dixit", "nishkarsh-mishra", "swatantra-singh"],
    category: "Organization",
    status: "source-backed",
  },
  {
    date: "2026-04-09",
    displayDate: "9 April 2026",
    title: "DIMISI Technologies Private Limited officially incorporated",
    description:
      "Official incorporation under Ministry of Corporate Affairs (CIN: U62013UP2026PTC246506) in Kanpur, Uttar Pradesh, with Shikhar Dixit, Nishkarsh Mishra, and Swatantra Singh appointed as founding directors.",
    related: ["dimisi-technologies", "shikhar-dixit", "nishkarsh-mishra", "swatantra-singh"],
    category: "Organization",
    status: "verified",
    sourceId: "src-corporate-record",
  },
  {
    date: "2026-05-16",
    displayDate: "16–17 May 2026",
    title: "Home headquarters inauguration and company board mounted",
    description:
      "Operations shifted to a dedicated home office in Swarn Jayanti Vihar, Kanpur, with family support; company board mounted at the entrance on 17 May for statutory and bank account opening verification.",
    related: ["dimisi-technologies", "shikhar-dixit"],
    category: "Operations",
    status: "source-backed",
  },
  {
    date: "2026-06-15",
    displayDate: "June 2026",
    title: "First commercial client contract: Rudra Tours & Travels",
    description:
      "Following an extensive cold-outreach phase, the company secured its first commercial website development contract with Rudra Tours & Travels, joined by Somya Tiwari for client coordination and delivery, followed by two additional client deals.",
    related: ["dimisi-technologies", "shikhar-dixit"],
    category: "Business",
    status: "source-backed",
  },
  {
    date: "2026-08-15",
    displayDate: "15 August 2026",
    title: "LinkedIn 30-Day Kalesh Promotion Contest & Awards Ceremony",
    description:
      "Culmination of the 30-day viral LinkedIn creator challenge for Kalesh with an official felicitation ceremony in Kanpur presenting the 1st Prize Winner with a Certificate of Achievement.",
    related: [
      "kalesh",
      "dimisi-technologies",
      "shikhar-dixit",
      "swatantra-singh",
      "nishkarsh-mishra",
    ],
    category: "Campaign",
    status: "source-backed",
  },
  {
    date: "2026-08-19",
    displayDate: "19–21 August 2026",
    title: "Architecture & documentation of DIMISIPEDIA",
    description:
      "Initiated development of DIMISIPEDIA as the structured public knowledge encyclopedia of DIMISI Technologies to document its entities, journey, people, technologies, and verifiable sources.",
    related: ["dimisipedia", "dimisi-technologies", "shikhar-dixit"],
    category: "Project",
    status: "documented",
    sourceId: "src-dimisipedia-spec",
  },
];

export const timeline: TimelineEntry[] = [...baseTimeline, ...founderTimeline].sort((a, b) =>
  a.date.localeCompare(b.date),
);

export const events: { title: string; note: string }[] = [];
export const articles: { title: string; note: string }[] = [];

export function getEntity(id: string): Entity | undefined {
  return entities.find((e) => e.id === id);
}

export function getSources(ids: string[]): Source[] {
  // Order-preserving: citation numbers follow the entity's own source order.
  return ids.map((id) => sources.find((s) => s.id === id)).filter((s): s is Source => Boolean(s));
}

export function relationsFor(id: string): { type: RelationshipType; entity: Entity }[] {
  const out: { type: RelationshipType; entity: Entity }[] = [];
  for (const r of relationships) {
    if (r.from === id) {
      const e = getEntity(r.to);
      if (e) out.push({ type: r.type, entity: e });
    } else if (r.to === id) {
      const e = getEntity(r.from);
      if (e) out.push({ type: inverse(r.type), entity: e });
    }
  }
  return out;
}

function inverse(t: RelationshipType): RelationshipType {
  switch (t) {
    case "Founded by":
      return "Founded";
    case "Founded":
      return "Founded by";
    case "Develops":
      return "Developed by";
    case "Developed by":
      return "Develops";
    case "Works at":
      return "Associated with";
    case "Leads":
      return "Led by" as RelationshipType;
    case "Uses technology":
      return "Used by";
    case "Documents":
      return "Documented by";
    case "Documented by":
      return "Documents";
    case "Founder of":
      return "Founded by" as RelationshipType;
    case "Co-Founder of":
      return "Co-founded by" as RelationshipType;
    case "Director of":
      return "Director" as RelationshipType;
    case "CEO of":
      return "Chief Executive Officer" as RelationshipType;
    case "CTO of":
      return "Chief Technology Officer" as RelationshipType;
    case "Technical leadership":
      return "Technical leadership by" as RelationshipType;
    case "Engineering":
      return "Engineering by" as RelationshipType;
    case "CMO of":
      return "Chief Marketing Officer" as RelationshipType;
    case "COO of":
      return "Chief Operating Officer" as RelationshipType;
    case "Product leadership":
      return "Product leadership by" as RelationshipType;
    case "Marketing":
      return "Marketing by" as RelationshipType;
    case "Growth":
      return "Growth by" as RelationshipType;
    case "Operations":
      return "Operations by" as RelationshipType;
    case "Operational association":
      return "Operational association" as RelationshipType;
    default:
      return "Related to";
  }
}

export const statusLabel: Record<string, string> = {
  verified: "Verified",
  "source-backed": "Source-backed",
  documented: "Documented",
  "needs-verification": "Needs verification",
  disputed: "Disputed",
  unverified: "Unverified",
  historical: "Historical",
  archived: "Archived",
  official: "Official source",
};

export interface SearchResult {
  name: string;
  type: string;
  description: string;
  path: string;
}

export function searchKnowledge(q: string): SearchResult[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];

  interface ScoredResult {
    result: SearchResult;
    score: number;
  }

  const scored: ScoredResult[] = [];

  for (const e of entities) {
    const nameLower = e.name.toLowerCase();
    const subtitleLower = (e.subtitle || "").toLowerCase();
    const descLower = (e.shortDescription || "").toLowerCase();
    const answerLower = (e.answer || "").toLowerCase();

    let score = 0;
    if (nameLower === query) {
      score += 100;
    } else if (nameLower.startsWith(query)) {
      score += 70;
    } else if (nameLower.includes(query)) {
      score += 50;
    } else if (subtitleLower.includes(query)) {
      score += 35;
    } else if (descLower.includes(query) || answerLower.includes(query)) {
      score += 20;
    }

    if (score > 0) {
      scored.push({
        result: {
          name: e.name,
          type: e.entityType.toUpperCase(),
          description: e.shortDescription,
          path: e.path,
        },
        score,
      });
    }
  }

  for (const t of timeline) {
    const titleLower = t.title.toLowerCase();
    const descLower = t.description.toLowerCase();

    let score = 0;
    if (titleLower.startsWith(query)) {
      score += 45;
    } else if (titleLower.includes(query)) {
      score += 30;
    } else if (descLower.includes(query)) {
      score += 15;
    }

    if (score > 0) {
      scored.push({
        result: {
          name: t.title,
          type: "TIMELINE",
          description: t.displayDate,
          path: "/timeline",
        },
        score,
      });
    }
  }

  for (const s of sources) {
    const titleLower = s.title.toLowerCase();
    const pubLower = s.publisher.toLowerCase();

    let score = 0;
    if (titleLower.startsWith(query)) {
      score += 40;
    } else if (titleLower.includes(query) || pubLower.includes(query)) {
      score += 25;
    }

    if (score > 0) {
      scored.push({
        result: {
          name: s.title,
          type: "SOURCE",
          description: s.publisher,
          path: "/sources",
        },
        score,
      });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.result)
    .slice(0, 12);
}
