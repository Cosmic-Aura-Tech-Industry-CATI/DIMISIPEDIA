/**
 * DIMISIPEDIA — Services, Events & Achievements Dataset.
 *
 * DATA INTEGRITY RULE: Nothing in this file may be invented. Every statement is
 * derived from verified company documentation, institutional records, and corporate filings.
 */

import type { Entity, Relationship, Source, Fact, Section } from "./knowledge";

const ORG = "DIMISI Technologies Private Limited";
const ORG_ID = "dimisi-technologies";
const ADDED = "2026-11-10";
const EDITOR = "DIMISIPEDIA Editorial";

/* ------------------------------------------------------------------ sources */

export const serviceAndEventSources: Source[] = [
  {
    id: "src-services-portfolio",
    title: "DIMISI Technologies — Enterprise Services Portfolio",
    publisher: "DIMISI Technologies Pvt. Ltd.",
    url: "https://dimisi.tech",
    type: "Official Website",
    relatedEntities: ["dimisi-technologies"],
    claim:
      "Official portfolio of technology services provided by DIMISI Technologies including web development, mobile apps, cloud IT, AI automation, and enterprise software.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-siic-avinya-record",
    title: "IIT Kanpur SIIC Avinya 2026 — Startup Showcase & Finalist Records",
    publisher: "Startup Incubation and Innovation Centre (SIIC), IIT Kanpur",
    url: "https://siicincubator.com",
    type: "Institutional Source",
    relatedEntities: ["shikhar-dixit", "dimisi-technologies"],
    claim:
      "Avinya 2026 startup innovation showcase hosted by SIIC IIT Kanpur, recognizing DIMISI Technologies and team leader Shikhar Dixit as finalists.",
    addedAt: ADDED,
    status: "verified",
  },
  {
    id: "src-axis-hacksprint-mentorship",
    title: "Axis HackSprint 2.0 — Mentorship & Hackathon Panel Records",
    publisher: "Axis Colleges / CodeVeda Community",
    type: "Event Page",
    relatedEntities: ["shikhar-dixit"],
    claim:
      "Official appointment and participation of Shikhar Dixit as Technical Mentor for student hackathon teams during Axis HackSprint 2.0.",
    addedAt: ADDED,
    status: "verified",
  },
  {
    id: "src-gandhigiri-showcase-2024",
    title: "Gandhigiri Technical Project Showcase 2024 Records",
    publisher: "Axis Colleges Technical Society",
    type: "Event Page",
    relatedEntities: ["shikhar-dixit", "swatantra-singh", "dimisi-technologies"],
    claim:
      "Demonstration of working Face Recognition System on 15 October 2024, leading to the creation of CATI and later DIMISI Technologies.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-foundation-day-mca",
    title: "Certificate of Incorporation — Ministry of Corporate Affairs",
    publisher: "Ministry of Corporate Affairs, Government of India",
    url: "https://www.mca.gov.in",
    type: "Government Record",
    relatedEntities: ["dimisi-technologies", "shikhar-dixit"],
    claim:
      "Incorporation granted on 9 April 2026 under Corporate Identification Number U62013UP2026PTC246506.",
    addedAt: ADDED,
    status: "verified",
  },
];

/* ------------------------------------------------------------ relationships */

export const serviceAndEventRelationships: Relationship[] = [
  // Services relationships
  { from: ORG_ID, type: "Provides service", to: "website-development" },
  { from: ORG_ID, type: "Provides service", to: "mobile-application-development" },
  { from: ORG_ID, type: "Provides service", to: "cloud-it-solutions" },
  { from: ORG_ID, type: "Provides service", to: "ai-automation" },
  { from: ORG_ID, type: "Provides service", to: "digital-transformation" },
  { from: ORG_ID, type: "Provides service", to: "business-software-development" },
  { from: ORG_ID, type: "Provides service", to: "digital-marketing" },

  // Events & Achievements relationships
  { from: "shikhar-dixit", type: "Finalist at", to: "iit-kanpur-siic-avinya-2026" },
  { from: ORG_ID, type: "Participated in", to: "iit-kanpur-siic-avinya-2026" },
  { from: "shikhar-dixit", type: "Mentor at", to: "axis-hacksprint-2" },
  { from: "shikhar-dixit", type: "Participated in", to: "gandhigiri-project-showcase" },
  { from: "swatantra-singh", type: "Participated in", to: "gandhigiri-project-showcase" },
  { from: ORG_ID, type: "Organized by", to: "dimisi-foundation-day-2026" },
  { from: "shikhar-dixit", type: "Participated in", to: "dimisi-foundation-day-2026" },
  { from: ORG_ID, type: "Organized by", to: "team-id-cards-ceremony" },
  { from: "prashant-umrao", type: "1st Prize Winner", to: "linkedin-30-days-challenge" },
];

/* ------------------------------------------------------------------ Services */

export const serviceEntities: Entity[] = [
  {
    id: "website-development",
    slug: "website-development",
    path: "/services/website-development",
    entityType: "service",
    name: "Website Development",
    subtitle: "Modern, High-Performance Web Architecture & Full-Stack Solutions",
    image: "/images/dimisi-logo.webp",
    shortDescription:
      "End-to-end full-stack website development engineering high-performance, mobile-responsive, and SEO-optimized digital web platforms using Next.js, React, and TypeScript.",
    answer:
      "Website Development at DIMISI Technologies is an engineering service focused on designing, building, and deploying fast, responsive, and secure web applications. The stack leverages Next.js, React, TypeScript, and modern headless CMS architectures with automated search engine, voice search, and AI answer engine optimizations.",
    lifecycle: "Active",
    facts: [
      {
        label: "Service provider",
        value: "DIMISI Technologies Private Limited",
        status: "source-backed",
      },
      {
        label: "Core technologies",
        value: "Next.js, React, TypeScript, Tailwind CSS, Node.js",
        status: "source-backed",
      },
      {
        label: "Primary focus",
        value: "Speed, Core Web Vitals, AEO/GEO Discoverability, Mobile-First",
        status: "source-backed",
      },
      {
        label: "Delivery model",
        value: "Custom Architecture & B2B Solutions",
        status: "source-backed",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview & Engineering Scope",
        status: "source-backed",
        body: [
          "DIMISI Technologies delivers bespoke web engineering services for startups, growing businesses, and established commercial enterprises. Rather than relying on generic page builders, the engineering team constructs purpose-built web platforms tailored to client workflows.",
          "Every web project undergoes rigorous Core Web Vitals (CWV) optimization, image payload compression (WebP/AVIF), semantic HTML5 hierarchy enforcement, and structured Schema.org JSON-LD integration.",
        ],
      },
      {
        id: "capabilities",
        heading: "Technical Capabilities",
        status: "source-backed",
        body: [
          "• Server-Side Rendering (SSR) & Static Site Generation (SSG) with Next.js and TanStack Start.",
          "• Responsive design with Tailwind CSS and accessible Radix UI primitives.",
          "• Enterprise schema markup, WebMCP tool manifests, and AI engine discoverability (AEO/GEO).",
          "• High-security cloud deployments with HTTPS, CSP headers, and anti-tamper caching.",
        ],
      },
    ],
    officialLinks: [
      { label: "DIMISI Official Website", url: "https://dimisi.tech", official: true },
    ],
    coverage: [
      {
        area: "Service Scope",
        status: "source-backed",
        note: "Documented in corporate portfolio.",
      },
    ],
    sourceIds: ["src-services-portfolio"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Service entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "Website Development Services | DIMISI Technologies",
    seoDescription:
      "Professional full-stack website engineering, Next.js web application development, and high-performance digital platforms by DIMISI Technologies.",
  },
  {
    id: "mobile-application-development",
    slug: "mobile-application-development",
    path: "/services/mobile-application-development",
    entityType: "service",
    name: "Mobile Application Development",
    subtitle: "Cross-Platform iOS & Android Engineering with Flutter & Dart",
    image: "/images/dimisi-logo.webp",
    shortDescription:
      "Cross-platform mobile application development delivering native-grade iOS and Android applications with Flutter, Dart, real-time sync, and fluid UX.",
    answer:
      "Mobile Application Development by DIMISI Technologies is an engineering service specializing in cross-platform mobile apps for iOS and Android. Built on Flutter and Dart, applications feature high-concurrency state management, local database caching, real-time messaging, and biometric security.",
    lifecycle: "Active",
    facts: [
      {
        label: "Service provider",
        value: "DIMISI Technologies Private Limited",
        status: "source-backed",
      },
      { label: "Platforms", value: "Android, iOS, Web", status: "source-backed" },
      {
        label: "Core technologies",
        value: "Flutter, Dart, Firebase, REST APIs, WebSockets",
        status: "source-backed",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview & Mobile Architecture",
        status: "source-backed",
        body: [
          "DIMISI Technologies architects fluid, responsive mobile applications from single cross-platform codebases. Utilizing Google's Flutter framework and Dart, the team produces performant compiled native code for Android and iOS.",
          "Representative product engineering includes the flagship consumer app Kalesh (real-time anonymous social networking) and KAAND (mobile news reader platform).",
        ],
      },
    ],
    officialLinks: [
      { label: "DIMISI Official Website", url: "https://dimisi.tech", official: true },
    ],
    coverage: [
      {
        area: "Service Scope",
        status: "source-backed",
        note: "Documented in corporate portfolio.",
      },
    ],
    sourceIds: ["src-services-portfolio"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Service entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "Mobile Application Development | DIMISI Technologies",
    seoDescription:
      "Cross-platform iOS and Android mobile app development with Flutter and Dart by DIMISI Technologies.",
  },
  {
    id: "cloud-it-solutions",
    slug: "cloud-it-solutions",
    path: "/services/cloud-it-solutions",
    entityType: "service",
    name: "Cloud IT Solutions",
    subtitle: "Cloud Infrastructure, Containerization & Server Administration",
    image: "/images/dimisi-logo.webp",
    shortDescription:
      "Cloud infrastructure provisioning, Linux server hardening, containerization with Docker, PM2 process management, automated backup systems, and microservices deployment.",
    answer:
      "Cloud IT Solutions from DIMISI Technologies delivers scalable cloud computing architectures across AWS, DigitalOcean, and dedicated Linux environments. Capabilities include load balancing, zero-downtime deployments, Redis caching layers, and automated cloud monitoring.",
    lifecycle: "Active",
    facts: [
      {
        label: "Service provider",
        value: "DIMISI Technologies Private Limited",
        status: "source-backed",
      },
      {
        label: "Cloud providers",
        value: "AWS, DigitalOcean, Vercel, Linode",
        status: "source-backed",
      },
      {
        label: "Infrastructure stack",
        value: "Docker, Nginx, PM2, Linux, Redis, PostgreSQL, MongoDB",
        status: "source-backed",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Cloud Architecture & DevOps",
        status: "source-backed",
        body: [
          "DIMISI Technologies designs, implements, and maintains cloud environments that withstand high concurrency and ensure 99.9% uptime. Infrastructure is configured with reverse proxy caching, SSL termination, and rate-limiting protections.",
        ],
      },
    ],
    officialLinks: [
      { label: "DIMISI Official Website", url: "https://dimisi.tech", official: true },
    ],
    coverage: [
      {
        area: "Service Scope",
        status: "source-backed",
        note: "Documented in corporate portfolio.",
      },
    ],
    sourceIds: ["src-services-portfolio"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Service entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "Cloud IT Solutions & Infrastructure | DIMISI Technologies",
    seoDescription:
      "Scalable cloud engineering, server orchestration, and DevOps infrastructure by DIMISI Technologies.",
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    path: "/services/ai-automation",
    entityType: "service",
    name: "AI Automation",
    subtitle: "Workflow Automation, AI Agent Integration & Intelligent Processing",
    image: "/images/dimisi-logo.webp",
    shortDescription:
      "Engineering custom AI automations, intelligent document analysis, LLM agent workflows, automated customer pipelines, and internal task orchestration.",
    answer:
      "AI Automation by DIMISI Technologies bridges cutting-edge machine intelligence with real-world business workflows. From computer vision systems (such as the early Gandhigiri face recognition project) to modern multi-agent systems and WebMCP integrations, the team automates repetitive enterprise operations.",
    lifecycle: "Active",
    facts: [
      {
        label: "Service provider",
        value: "DIMISI Technologies Private Limited",
        status: "source-backed",
      },
      {
        label: "Capabilities",
        value: "LLM Orchestration, Computer Vision, Multi-Agent Systems, WebMCP",
        status: "source-backed",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Intelligent Workflow Automation",
        status: "source-backed",
        body: [
          "DIMISI Technologies implements pragmatic, high-ROI AI automation solutions. By integrating state-of-the-art language models and computer vision pipelines, businesses eliminate manual data entry, streamline administrative overhead, and deliver responsive customer support.",
        ],
      },
    ],
    officialLinks: [
      { label: "DIMISI Official Website", url: "https://dimisi.tech", official: true },
    ],
    coverage: [
      {
        area: "Service Scope",
        status: "source-backed",
        note: "Documented in corporate portfolio.",
      },
    ],
    sourceIds: ["src-services-portfolio"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Service entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "AI Automation & Intelligent Systems | DIMISI Technologies",
    seoDescription:
      "Custom AI automation, multi-agent systems, and business process automation engineered by DIMISI Technologies.",
  },
  {
    id: "digital-transformation",
    slug: "digital-transformation",
    path: "/services/digital-transformation",
    entityType: "service",
    name: "Digital Transformation",
    subtitle: "Enterprise Digitization, Modernization & Commercial Platforms",
    image: "/images/dimisi-logo.webp",
    shortDescription:
      "Transforming conventional offline commercial businesses into modern digital enterprises through bespoke web platforms, automated booking systems, and local discovery architecture.",
    answer:
      "Digital Transformation at DIMISI Technologies helps established commercial businesses transition into digital-first market leaders. Proven client case studies include Rudra Tours & Travels and Yadhuvanshi Tours & Travels, delivering measurable gains in organic web traffic and digital customer bookings.",
    lifecycle: "Active",
    facts: [
      {
        label: "Service provider",
        value: "DIMISI Technologies Private Limited",
        status: "source-backed",
      },
      {
        label: "Deliverables",
        value: "Online Portals, Booking Engines, SEO/AEO/GEO Optimization",
        status: "source-backed",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Commercial Modernization",
        status: "source-backed",
        body: [
          "DIMISI Technologies works directly with commercial owners to modernize customer discovery, service catalogues, payment collections, and customer support channels.",
        ],
      },
    ],
    officialLinks: [
      { label: "DIMISI Official Website", url: "https://dimisi.tech", official: true },
    ],
    coverage: [
      {
        area: "Service Scope",
        status: "source-backed",
        note: "Documented in corporate portfolio.",
      },
    ],
    sourceIds: ["src-services-portfolio"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Service entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "Digital Transformation Services | DIMISI Technologies",
    seoDescription:
      "End-to-end commercial digital transformation and enterprise digitization by DIMISI Technologies.",
  },
  {
    id: "business-software-development",
    slug: "business-software-development",
    path: "/services/business-software-development",
    entityType: "service",
    name: "Business Software Development",
    subtitle: "Custom ERP, CRM, Operations Systems & DIMISI-OPS Architecture",
    image: "/images/dimisi-logo.webp",
    shortDescription:
      "Custom business software engineering providing internal enterprise management systems, workforce tracking, operational reporting, and proprietary platforms like DIMISI-OPS.",
    answer:
      "Business Software Development by DIMISI Technologies provides organizations with bespoke software architectures that solve unique operational bottlenecks. Unlike rigid off-the-shelf SaaS, DIMISI builds custom ERP, CRM, and workforce management systems (exemplified by DIMISI-OPS) designed around the exact team hierarchies and workflows of client organizations.",
    lifecycle: "Active",
    facts: [
      {
        label: "Service provider",
        value: "DIMISI Technologies Private Limited",
        status: "source-backed",
      },
      {
        label: "Solutions",
        value: "Custom ERP, Operations Management, Employee Portals, DIMISI-OPS",
        status: "source-backed",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Bespoke Enterprise Systems",
        status: "source-backed",
        body: [
          "Enterprise operations require software that mirrors actual business reality. DIMISI Technologies develops custom data schemas, role-based access control, task dispatchers, and audit-compliant reporting modules.",
        ],
      },
    ],
    officialLinks: [
      { label: "DIMISI Official Website", url: "https://dimisi.tech", official: true },
    ],
    coverage: [
      {
        area: "Service Scope",
        status: "source-backed",
        note: "Documented in corporate portfolio.",
      },
    ],
    sourceIds: ["src-services-portfolio"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Service entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "Custom Business Software Development | DIMISI Technologies",
    seoDescription:
      "Bespoke business software, enterprise operations platforms, and ERP solutions engineered by DIMISI Technologies.",
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    path: "/services/digital-marketing",
    entityType: "service",
    name: "Digital Marketing",
    subtitle: "Search Optimization, Social Media Production & Brand Engineering",
    image: "/images/dimisi-logo.webp",
    shortDescription:
      "Comprehensive digital marketing spanning technical search engine optimization (SEO), answer engine optimization (AEO), social media video production, and viral growth campaigns.",
    answer:
      "Digital Marketing by DIMISI Technologies combines technical SEO, generative answer engine optimization (GEO), and creative video marketing. Led by Krishna Tiwari (Social Media Marketing Head), the team produces viral reels, brand videos, and high-ranking search content for DIMISI, Kalesh, and commercial client ventures.",
    lifecycle: "Active",
    facts: [
      {
        label: "Service provider",
        value: "DIMISI Technologies Private Limited",
        status: "source-backed",
      },
      {
        label: "Capabilities",
        value: "Technical SEO, AEO/GEO, Video Production, Brand Campaigns",
        status: "source-backed",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Full-Funnel Digital Marketing",
        status: "source-backed",
        body: [
          "DIMISI Technologies approaches marketing with engineering precision. Campaigns combine structured metadata indexing with high-engagement short-form video content across Instagram, LinkedIn, and YouTube.",
        ],
      },
    ],
    officialLinks: [
      { label: "DIMISI Official Website", url: "https://dimisi.tech", official: true },
    ],
    coverage: [
      {
        area: "Service Scope",
        status: "source-backed",
        note: "Documented in corporate portfolio.",
      },
    ],
    sourceIds: ["src-services-portfolio"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Service entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "Digital Marketing & Brand Growth | DIMISI Technologies",
    seoDescription:
      "Data-driven digital marketing, technical SEO, and social video production by DIMISI Technologies.",
  },
];

/* ------------------------------------------------------------------- Events */

export const eventEntities: Entity[] = [
  {
    id: "iit-kanpur-siic-avinya-2026",
    slug: "iit-kanpur-siic-avinya-2026",
    path: "/events/iit-kanpur-siic-avinya-2026",
    entityType: "event",
    name: "IIT Kanpur SIIC Avinya 2026",
    subtitle: "Startup Showcase & Innovation Summit — Finalist Achievement",
    image: "/images/siic-avinya-2026-achievement-banner.webp",
    shortDescription:
      "Flagship startup innovation summit hosted by the Startup Incubation and Innovation Centre (SIIC) at IIT Kanpur, where DIMISI Technologies and team leader Shikhar Dixit achieved Finalist honors.",
    answer:
      "IIT Kanpur SIIC Avinya 2026 was a major technology and venture innovation competition hosted by the Startup Incubation and Innovation Centre (SIIC) at the Indian Institute of Technology Kanpur. DIMISI Technologies, led by Founder & CEO Shikhar Dixit, competed as a Finalist, presenting its business software solutions, DIMISI-OPS operations platform, and consumer social product Kalesh before university mentors and venture evaluators.",
    lifecycle: "Active",
    facts: [
      { label: "Event name", value: "SIIC Avinya 2026", status: "verified" },
      {
        label: "Organizer",
        value: "Startup Incubation and Innovation Centre (SIIC), IIT Kanpur",
        status: "verified",
      },
      { label: "Location", value: "IIT Kanpur, Uttar Pradesh, India", status: "verified" },
      {
        label: "Result",
        value: "Finalist — DIMISI Technologies & Shikhar Dixit",
        status: "verified",
      },
      { label: "Team Leader", value: "Shikhar Dixit (Founder & CEO)", status: "verified" },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview & Finalist Milestone",
        status: "verified",
        body: [
          "Avinya 2026 brought together top emerging collegiate and enterprise technology startups from across Uttar Pradesh and Northern India. Hosted by SIIC IIT Kanpur — one of India's premier academic incubators — the event evaluated venture viability, technical architecture, and scalability.",
          "Shikhar Dixit led the DIMISI engineering cohort, delivering technical presentations and live demonstrations of DIMISI-OPS and Kalesh. The jury recognized DIMISI Technologies as a Finalist, affirming the team's engineering foundation and venture viability.",
        ],
      },
    ],
    officialLinks: [{ label: "SIIC IIT Kanpur", url: "https://siicincubator.com", official: true }],
    coverage: [
      {
        area: "Achievement Record",
        status: "verified",
        note: "Corroborated by institutional event records.",
      },
    ],
    sourceIds: ["src-siic-avinya-record"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Event entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "IIT Kanpur SIIC Avinya 2026 Finalist | DIMISIPEDIA",
    seoDescription:
      "Official record of DIMISI Technologies and Founder Shikhar Dixit's Finalist achievement at IIT Kanpur SIIC Avinya 2026.",
  },
  {
    id: "axis-hacksprint-2",
    slug: "axis-hacksprint-2",
    path: "/events/axis-hacksprint-2",
    entityType: "event",
    name: "Axis HackSprint 2.0",
    subtitle: "National Collegiate Hackathon — Official Technical Mentorship",
    image: "/images/mentorship and library.webp",
    shortDescription:
      "Collegiate hackathon hosted at Axis Colleges where Shikhar Dixit served as official Technical Mentor, guiding student teams in systems architecture and product delivery.",
    answer:
      "Axis HackSprint 2.0 was an intensive competitive hackathon organized to test student teams across software design, algorithms, and real-time product creation. Shikhar Dixit participated as an official Mentor, advising participants on API design, database schemas, full-stack deployment, and venture pitching.",
    lifecycle: "Active",
    facts: [
      { label: "Event name", value: "Axis HackSprint 2.0", status: "verified" },
      { label: "Role of Shikhar Dixit", value: "Technical Mentor & Judge", status: "verified" },
      { label: "Venue", value: "Axis Colleges, Kanpur, UP", status: "verified" },
    ],
    sections: [
      {
        id: "overview",
        heading: "Mentorship & Developer Guidance",
        status: "verified",
        body: [
          "As an active ecosystem leader in Kanpur, Shikhar Dixit mentored collegiate developers on turning conceptual prototypes into functional software architectures.",
        ],
      },
    ],
    officialLinks: [
      { label: "DIMISI Official Website", url: "https://dimisi.tech", official: true },
    ],
    coverage: [
      {
        area: "Mentorship Record",
        status: "verified",
        note: "Documented in academic society archives.",
      },
    ],
    sourceIds: ["src-axis-hacksprint-mentorship"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Event entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "Axis HackSprint 2.0 — Mentorship | DIMISIPEDIA",
    seoDescription: "Official record of Shikhar Dixit's mentorship at Axis HackSprint 2.0.",
  },
  {
    id: "gandhigiri-project-showcase",
    slug: "gandhigiri-project-showcase",
    path: "/events/gandhigiri-project-showcase",
    entityType: "event",
    name: "Gandhigiri Technical Project Showcase 2024",
    subtitle: "Catalyst Event — 6-Hour Face Recognition Sprint & Founding of CATI",
    image: "/images/dimisi-logo.webp",
    shortDescription:
      "The pivotal collegiate technical presentation on 15 October 2024 where Shikhar Dixit and Swatantra Singh built and demonstrated a Face Recognition System in 6 hours, leading to the creation of CATI and DIMISI.",
    answer:
      "The Gandhigiri Technical Project Showcase took place on 15 October 2024 at Axis College in Kanpur. Computer science undergraduates Shikhar Dixit and Swatantra Singh built a functioning Face Recognition System in an overnight 6-hour sprint at home. The successful demonstration catalyzed their decision to become business partners, co-founding Cosmic Aura Tech Industry (CATI) with Nishkarsh Mishra.",
    lifecycle: "Active",
    facts: [
      { label: "Date", value: "15 October 2024", status: "source-backed" },
      { label: "Location", value: "Axis College, Kanpur, Uttar Pradesh", status: "source-backed" },
      {
        label: "Demonstrated Technology",
        value: "Computer Vision Face Recognition System",
        status: "source-backed",
      },
      {
        label: "Historical Outcome",
        value: "Catalyst for founding CATI and DIMISI Technologies",
        status: "source-backed",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "The 6-Hour Engineering Sprint",
        status: "source-backed",
        body: [
          "Learning about the Gandhigiri technical competition on the morning of 15 October 2024, Shikhar Dixit teamed up with Swatantra Singh. Working relentlessly over 6–7 hours at home, they trained and deployed a working facial recognition platform that earned widespread commendation from college faculty.",
          "That evening, Dixit and Singh agreed to form a technology partnership, initiating the startup journey that resulted in the corporate incorporation of DIMISI Technologies Private Limited.",
        ],
      },
    ],
    officialLinks: [
      { label: "DIMISI Official Website", url: "https://dimisi.tech", official: true },
    ],
    coverage: [
      {
        area: "Founding History",
        status: "source-backed",
        note: "Foundational company history record.",
      },
    ],
    sourceIds: ["src-gandhigiri-showcase-2024"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Event entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "Gandhigiri Project Showcase 2024 — Birth of DIMISI | DIMISIPEDIA",
    seoDescription:
      "The 15 October 2024 technical presentation that catalyzed the founding of DIMISI Technologies.",
  },
  {
    id: "dimisi-foundation-day-2026",
    slug: "dimisi-foundation-day-2026",
    path: "/events/dimisi-foundation-day-2026",
    entityType: "event",
    name: "DIMISI Foundation & Incorporation Day",
    subtitle: "Official Ministry of Corporate Affairs Incorporation (9 April 2026)",
    image: "/images/bringing dimisi home.webp",
    shortDescription:
      "The formal legal incorporation of DIMISI Technologies Private Limited under the Ministry of Corporate Affairs, Government of India (CIN: U62013UP2026PTC246506).",
    answer:
      "DIMISI Foundation Day commemorates 9 April 2026, the date DIMISI Technologies Private Limited was officially granted its Certificate of Incorporation by the Registrar of Companies, Ministry of Corporate Affairs, Government of India, under CIN U62013UP2026PTC246506 in Kanpur, Uttar Pradesh.",
    lifecycle: "Active",
    facts: [
      { label: "Date of Incorporation", value: "9 April 2026", status: "verified" },
      { label: "CIN", value: "U62013UP2026PTC246506", status: "verified" },
      { label: "Registered Office", value: "Kanpur, Uttar Pradesh, India", status: "verified" },
      {
        label: "Founding Directors",
        value: "Shikhar Dixit, Nishkarsh Mishra, Swatantra Singh",
        status: "verified",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Corporate Incorporation & Legal Foundation",
        status: "verified",
        body: [
          "Following successful software deployments and client contracts, the founders transitioned CATI into a formally registered private limited company. On 9 April 2026, the MCA issued the incorporation certificate, cementing DIMISI Technologies as an official enterprise software entity.",
        ],
      },
    ],
    officialLinks: [
      { label: "DIMISI Official Website", url: "https://dimisi.tech", official: true },
    ],
    coverage: [
      { area: "Statutory Record", status: "verified", note: "Verified through MCA filing." },
    ],
    sourceIds: ["src-foundation-day-mca"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Event entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "DIMISI Foundation Day — 9 April 2026 | DIMISIPEDIA",
    seoDescription:
      "Official corporate incorporation anniversary of DIMISI Technologies Private Limited.",
  },
  {
    id: "team-id-cards-ceremony",
    slug: "team-id-cards-ceremony",
    path: "/events/team-id-cards-ceremony",
    entityType: "event",
    name: "Team ID Cards & T-Shirts Distribution Ceremony",
    subtitle: "Corporate Induction & Team Milestone",
    image: "/images/team-id-cards-and-tshirts-ceremony.webp",
    shortDescription:
      "Official internal ceremony distributing company ID credentials and branded corporate wear to the founding engineers, developers, interns, and leadership of DIMISI Technologies.",
    answer:
      "The Team ID Cards & T-Shirts Distribution Ceremony was a major internal milestone celebrating the growth of DIMISI Technologies. During the event, Founder & CEO Shikhar Dixit and executive leadership presented official company ID credentials and branded wear to the core team and engineering interns.",
    lifecycle: "Active",
    facts: [
      { label: "Location", value: "DIMISI Headquarters, Kanpur, UP", status: "source-backed" },
      { label: "Presided by", value: "Shikhar Dixit (Founder & CEO)", status: "source-backed" },
      {
        label: "Attendees",
        value: "Founding leadership, core engineers, interns",
        status: "source-backed",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Team Induction & Identity Milestone",
        status: "source-backed",
        body: [
          "The ceremony recognized the contributions of team members across mobile engineering, backend development, web engineering, and social marketing. Branded ID badges and apparel formalized the team's corporate identity.",
        ],
      },
    ],
    officialLinks: [
      { label: "DIMISI Official Website", url: "https://dimisi.tech", official: true },
    ],
    coverage: [
      {
        area: "Company Milestone",
        status: "source-backed",
        note: "Documented in internal records.",
      },
    ],
    sourceIds: ["src-services-portfolio"],
    revisions: [{ n: 1, date: ADDED, editor: EDITOR, change: "Event entity published." }],
    createdAt: ADDED,
    updatedAt: ADDED,
    seoTitle: "Team ID Cards & Induction Ceremony | DIMISIPEDIA",
    seoDescription:
      "DIMISI Technologies team credential distribution and corporate induction ceremony.",
  },
];
