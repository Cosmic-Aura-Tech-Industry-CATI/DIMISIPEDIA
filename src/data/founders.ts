/**
 * DIMISIPEDIA — founding leadership dataset.
 *
 * DATA INTEGRITY RULE: nothing here is invented. Every statement is derived from
 * material supplied by DIMISI Technologies. Claims that are supplied but not
 * independently confirmed are marked "needs-verification"; claims sourced to a
 * person's own publication or profile are marked "source-backed" (self-reported).
 *
 * Type-only imports keep this module free of runtime cycles with knowledge.ts.
 */

import type { Claim, Entity, Relationship, Source, TimelineEntry } from "./knowledge";
import { calculateAge, formatBornFact } from "@/lib/utils";

const ORG = "DIMISI Technologies Private Limited";
const ADDED = "2026-08-15";
const EDITOR = "DIMISIPEDIA Editorial";

/* ------------------------------------------------------------------ sources */

export const founderSources: Source[] = [
  {
    id: "src-corporate-record",
    title: "DIMISI Technologies Private Limited — corporate information",
    publisher: "Corporate information supplied by DIMISI Technologies",
    type: "Company Announcement",
    relatedEntities: [
      "dimisi-technologies",
      "shikhar-dixit",
      "nishkarsh-mishra",
      "swatantra-singh",
    ],
    claim:
      "Incorporation on 9 April 2026, CIN U62013UP2026PTC246506, registered office at MIG 3/131, Swarn Jayanti Vihar, Koyala Nagar, Kanpur, Uttar Pradesh, and the appointment of the founding directors.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-falconebiz-registry",
    title: "DIMISI Technologies Private Limited — corporate registry listing (MCA-derived)",
    publisher: "FalconEbiz",
    url: "https://www.falconebiz.com",
    type: "Government Record",
    relatedEntities: [
      "dimisi-technologies",
      "shikhar-dixit",
      "nishkarsh-mishra",
      "swatantra-singh",
    ],
    claim:
      "Registry aggregation of Ministry of Corporate Affairs filings: registration timestamp, company status, paid-up capital and licensed parameters.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-tracxn-dimisi",
    title: "DIMISI Technologies — company profile and director listing",
    publisher: "Tracxn",
    url: "https://tracxn.com",
    type: "Third-party Database",
    relatedEntities: [
      "dimisi-technologies",
      "shikhar-dixit",
      "nishkarsh-mishra",
      "swatantra-singh",
    ],
    claim:
      "Third-party listing of the co-directors, corporate timeline and registered address of DIMISI Technologies Private Limited.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-dimisi-website",
    title: "DIMISI Technologies — official website",
    publisher: "DIMISI Technologies",
    url: "https://dimisi.tech",
    type: "Official Website",
    relatedEntities: ["dimisi-technologies", "shikhar-dixit", "kalesh"],
    claim: "First-party description of the company, its services and its product portfolio.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-dimisi-linkedin",
    title: "DIMISI Technologies — company profile",
    publisher: "LinkedIn",
    url: "https://www.linkedin.com",
    type: "Social Profile",
    relatedEntities: ["dimisi-technologies", "shikhar-dixit"],
    claim: "Company description and leadership listing published by DIMISI Technologies.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-shikhar-linkedin",
    title: "Shikhar Dixit — professional profile",
    publisher: "LinkedIn",
    url: "https://in.linkedin.com",
    type: "Social Profile",
    relatedEntities: ["shikhar-dixit"],
    claim:
      "Self-reported role at DIMISI Technologies, education, and earlier positions at Degree2Destiny, Hunch and the Entrepreneurship Cell, IIT Bombay.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-shikhar-medium",
    title: "Shikhar Dixit — published writing (@dixitshikhar004)",
    publisher: "Medium",
    url: "https://medium.com/@dixitshikhar004",
    type: "Other",
    relatedEntities: ["shikhar-dixit", "kalesh"],
    claim:
      "Founder publication describing the origin and product direction of Kalesh, including a development start in late 2025.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-shikhar-crunchbase",
    title: "Shikhar Dixit — Crunchbase executive profile",
    publisher: "Crunchbase",
    url: "https://www.crunchbase.com/person/shikhar-dixit-944f",
    type: "Third-party Database",
    relatedEntities: ["shikhar-dixit", "dimisi-technologies"],
    claim:
      "Verified executive and founder profile on Crunchbase identifying Shikhar Dixit as Founder & CEO.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-nishkarsh-linkedin",
    title: "Nishkarsh Mishra — professional profile",
    publisher: "LinkedIn",
    url: "https://www.linkedin.com",
    type: "Social Profile",
    relatedEntities: ["nishkarsh-mishra"],
    claim:
      "Self-reported roles at DIMISI Technologies and educational history at Kanpur Institute of Technology and Axis Colleges.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-nishkarsh-crunchbase",
    title: "Nishkarsh Mishra — Crunchbase executive profile",
    publisher: "Crunchbase",
    url: "https://www.crunchbase.com/person/nishkarsh-mishra-4e7d",
    type: "Third-party Database",
    relatedEntities: ["nishkarsh-mishra", "dimisi-technologies"],
    claim:
      "Verified executive and founder profile on Crunchbase identifying Nishkarsh Mishra as Co-Founder and Director.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-swatantra-video",
    title: "Swatantra Singh — recorded interview / video appearance",
    publisher: "YouTube",
    url: "https://www.youtube.com",
    type: "Interview",
    relatedEntities: ["swatantra-singh"],
    claim:
      "Recorded appearance in which Swatantra Singh is presented in connection with DIMISI Technologies.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-swatantra-crunchbase",
    title: "Swatantra Singh — Crunchbase executive profile",
    publisher: "Crunchbase",
    url: "https://www.crunchbase.com/person/swatantra-singh-5f2b",
    type: "Third-party Database",
    relatedEntities: ["swatantra-singh", "dimisi-technologies", "kalesh"],
    claim:
      "Verified executive and founder profile on Crunchbase describing Swatantra Singh's founding milestones, CTO leadership, and association with DIMISI Technologies.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-planetexim-director",
    title: "Swatantra Singh — director profile (MCA-derived)",
    publisher: "PlanetExim",
    url: "https://www.planetexim.net",
    type: "Government Record",
    relatedEntities: ["swatantra-singh", "dimisi-technologies"],
    claim:
      "Directory listing of the board appointment, director identifiers and registration status recorded against Swatantra Singh.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-zaubacorp-dimisi",
    title: "DIMISI Technologies Private Limited — company database record",
    publisher: "ZaubaCorp",
    url: "https://www.zaubacorp.com",
    type: "Government Record",
    relatedEntities: [
      "dimisi-technologies",
      "shikhar-dixit",
      "nishkarsh-mishra",
      "swatantra-singh",
    ],
    claim:
      "MCA-derived company database record covering directorship, shareholding and registration parameters.",
    addedAt: ADDED,
    status: "needs-verification",
  },
  {
    id: "src-kalesh-team",
    title: "Kalesh — platform team page",
    publisher: "Kalesh (DIMISI Technologies)",
    url: "https://thekalesh.com",
    type: "Official Website",
    relatedEntities: ["kalesh", "swatantra-singh", "mridul-mishra", "sheelu-singh"],
    claim:
      "First-party listing of the Kalesh platform team, executive technology roles and engineering responsibilities.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-kalesh-linkedin",
    title: "Kalesh — company page",
    publisher: "LinkedIn",
    url: "https://in.linkedin.com",
    type: "Social Profile",
    relatedEntities: ["kalesh", "swatantra-singh", "mridul-mishra"],
    claim:
      "Product rollout, engineering and developer updates published on the Kalesh company page.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-sheelu-linkedin",
    title: "Sheelu Singh — professional profile",
    publisher: "LinkedIn",
    url: "https://in.linkedin.com",
    type: "Social Profile",
    relatedEntities: ["sheelu-singh"],
    claim:
      "Self-reported Android and Flutter development work at DIMISI Technologies, education at Dr. A.P.J. Abdul Kalam Technical University and an SDE internship at Yahwey Software Solutions.",
    addedAt: ADDED,
    status: "source-backed",
  },
  {
    id: "src-sheelu-pulsjob",
    title: "Sheelu Singh — developer listing",
    publisher: "PulsJob",
    url: "https://www.pulsjob.com",
    type: "Third-party Database",
    relatedEntities: ["sheelu-singh"],
    claim: "Third-party listing describing mobile development skills attributed to Sheelu Singh.",
    addedAt: ADDED,
    status: "needs-verification",
  },
];

/* ------------------------------------------------------------ relationships */

export const founderRelationships: Relationship[] = [
  { from: "shikhar-dixit", type: "Founder of", to: "dimisi-technologies" },
  { from: "shikhar-dixit", type: "CEO of", to: "dimisi-technologies" },
  { from: "shikhar-dixit", type: "Director of", to: "dimisi-technologies" },
  { from: "nishkarsh-mishra", type: "Co-Founder of", to: "dimisi-technologies" },
  { from: "nishkarsh-mishra", type: "Director of", to: "dimisi-technologies" },
  { from: "nishkarsh-mishra", type: "CMO of", to: "dimisi-technologies" },
  { from: "nishkarsh-mishra", type: "COO of", to: "dimisi-technologies" },
  { from: "swatantra-singh", type: "Co-Founder of", to: "dimisi-technologies" },
  { from: "swatantra-singh", type: "Director of", to: "dimisi-technologies" },
  { from: "swatantra-singh", type: "CTO of", to: "dimisi-technologies" },
  { from: "shikhar-dixit", type: "Product leadership", to: "kalesh" },
  { from: "nishkarsh-mishra", type: "Product leadership", to: "kalesh" },
  { from: "nishkarsh-mishra", type: "Marketing", to: "kalesh" },
  { from: "nishkarsh-mishra", type: "Growth", to: "kalesh" },
  { from: "nishkarsh-mishra", type: "Operations", to: "kalesh" },
  { from: "swatantra-singh", type: "Operational association", to: "kalesh" },
  { from: "swatantra-singh", type: "Technical leadership", to: "kalesh" },
  { from: "sheelu-singh", type: "Engineering", to: "kalesh" },
  { from: "mridul-mishra", type: "Engineering", to: "kalesh" },
];

/* ----------------------------------------------------------------- timeline */

export const founderTimeline: TimelineEntry[] = [
  {
    date: "2025-11-01",
    displayDate: "Late 2025",
    title: "Kalesh development reportedly begins",
    description:
      "A founder publication states that development of Kalesh began in late 2025. Recorded as a historical claim pending an independent record.",
    related: ["kalesh", "shikhar-dixit"],
    category: "Project",
    status: "historical",
    sourceId: "src-shikhar-medium",
  },
];

/* ------------------------------------------------------------------ helpers */

const rev = (change: string) => [
  {
    n: 1,
    date: ADDED,
    editor: EDITOR,
    change: "Entity page created from documented DIMISI information.",
  },
  { n: 2, date: ADDED, editor: EDITOR, change },
];

const claim = (
  c: string,
  claimType: Claim["claimType"],
  sourceIds: string[],
  verification: Claim["verification"],
): Claim => ({ claim: c, claimType, sourceIds, verification, dateAdded: ADDED, editor: EDITOR });

/* ------------------------------------------------------------ person: Shikhar */

const shikhar: Entity = {
  id: "shikhar-dixit",
  slug: "shikhar-dixit",
  path: "/people/shikhar-dixit",
  entityType: "person",
  name: "Shikhar Dixit",
  subtitle: "Founder & CEO · DIMISI Technologies",
  image: "/images/shikhar-dixit.png",
  birthDate: "2004-05-06",
  shortDescription:
    "Indian technology entrepreneur and software developer; founder and chief executive officer of DIMISI Technologies Private Limited.",
  answer:
    "Shikhar Dixit is an Indian technology entrepreneur, software engineer, and the Founder & Chief Executive Officer (CEO) of DIMISI Technologies Private Limited, based in Kanpur, Uttar Pradesh. He is the creator and product architect of Kalesh (an anonymous social polling and engagement platform), DIMISIPEDIA, and the Gandhigiri Face Recognition System.",
  facts: [
    {
      label: "Born",
      get value() {
        return formatBornFact("2004-05-06", "Kanpur, Uttar Pradesh, India");
      },
      status: "source-backed",
      sourceIds: ["src-corporate-record", "src-shikhar-linkedin"],
    },
    {
      label: "Occupation",
      value: "Technology entrepreneur, software developer",
      status: "source-backed",
    },
    {
      label: "Organization",
      value: "DIMISI Technologies Private Limited",
      status: "source-backed",
    },
    { label: "Roles", value: "Founder · CEO · Director", status: "source-backed" },
    { label: "Location", value: "Kanpur, Uttar Pradesh, India", status: "source-backed" },
    {
      label: "Known for",
      value: "DIMISI Technologies, Kalesh, DIMISIPEDIA, Face Recognition",
      status: "source-backed",
    },
    {
      label: "Education",
      value: "B.Tech, Computer Science & Engineering (Axis College / AKTU)",
      status: "source-backed",
    },
  ],
  areas: [
    "Artificial Intelligence",
    "Product Architecture",
    "Mobile & Web Engineering",
    "Technology Entrepreneurship",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Face Recognition Systems",
    "Mobile Application Development",
    "Full Stack Web Engineering",
    "Technology Entrepreneurship",
    "Anonymous Social Media",
    "DIMISI Technologies",
    "Kalesh",
    "Startup Leadership",
  ],
  disambiguatingDescription:
    "Indian technology entrepreneur and software engineer; Founder & Chief Executive Officer of DIMISI Technologies Private Limited; creator and product architect of Kalesh, DIMISIPEDIA, and Gandhigiri Face Recognition System.",
  gender: "https://schema.org/Male",
  awards: [
    "Gandhigiri Technical Project Recognition (Face Recognition System Showcase, Axis College)",
    "Founder & President, CodeVeda Campus Tech Club",
    "Campus Ambassador, E-Cell IIT Bombay",
  ],
  sameAs: [
    "https://www.linkedin.com/in/shikhar040",
    "https://github.com/dixitshikhar004",
    "https://x.com/dixitshikhar004",
    "https://medium.com/@dixitshikhar004",
    "https://www.instagram.com/dixitshikhar04",
    "https://www.crunchbase.com/person/shikhar-dixit-944f",
    "https://dimisi.tech",
    "https://thekalesh.com",
    "https://www.falconebiz.com/company/DIMISI-TECHNOLOGIES-PRIVATE-LIMITED-U62013UP2026PTC246506",
    "https://www.zaubacorp.com/company/DIMISI-TECHNOLOGIES-PRIVATE-LIMITED/U62013UP2026PTC246506",
    "https://www.tofler.in/dimisi-technologies-private-limited/company/U62013UP2026PTC246506",
    "https://www.instafinancials.com/company/dimisi-technologies-private-limited/U62013UP2026PTC246506",
    "https://tracxn.com/d/companies/dimisi-technologies",
  ],
  roles: [
    {
      title: "Founder",
      organization: ORG,
      status: "source-backed",
      sourceIds: [
        "src-shikhar-linkedin",
        "src-corporate-record",
        "src-falconebiz-registry",
        "src-tracxn-dimisi",
      ],
    },
    {
      title: "Chief Executive Officer",
      organization: ORG,
      status: "source-backed",
      sourceIds: ["src-shikhar-linkedin", "src-dimisi-linkedin"],
    },
    {
      title: "Director",
      organization: ORG,
      status: "source-backed",
      note: "Director of DIMISI Technologies Private Limited (CIN: U62013UP2026PTC246506).",
      sourceIds: ["src-corporate-record", "src-falconebiz-registry", "src-tracxn-dimisi"],
    },
  ],
  education: [
    {
      institution:
        "Axis College, Kanpur (Affiliated with Dr. A.P.J. Abdul Kalam Technical University)",
      qualification: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      status: "source-backed",
      note: "B.Tech in Computer Science and Engineering, foundational research and development behind CATI and early software platforms.",
    },
  ],
  experience: [
    {
      organization: "Degree2Destiny",
      role: "AI Automation Intern",
      note: "Associated with workflow optimisation and AI automation work.",
      status: "source-backed",
    },
    {
      organization: "Hunch",
      role: "Campus Ambassador",
      period: "Six-month tenure",
      status: "source-backed",
    },
    {
      organization: "Entrepreneurship Cell, IIT Bombay",
      role: "Campus Ambassador",
      note: "Campus leadership and startup ecosystem engagement across E-Summit.",
      status: "source-backed",
    },
  ],
  externalProfiles: [
    {
      label: "LinkedIn (@shikhar040)",
      url: "https://www.linkedin.com/in/shikhar040",
      verified: true,
      note: "Official verified professional & executive profile on LinkedIn.",
    },
    {
      label: "GitHub (@dixitshikhar004)",
      url: "https://github.com/dixitshikhar004",
      verified: true,
      note: "Official developer profile and open-source repositories on GitHub.",
    },
    {
      label: "Crunchbase Entity Profile",
      url: "https://www.crunchbase.com/person/shikhar-dixit-944f",
      verified: true,
      note: "Verified founder and corporate executive entity profile on Crunchbase.",
    },
    {
      label: "Medium (@dixitshikhar004)",
      url: "https://medium.com/@dixitshikhar004",
      verified: true,
      note: "First-party technical essays and company architectural narratives.",
    },
    {
      label: "X / Twitter (@dixitshikhar004)",
      url: "https://x.com/dixitshikhar004",
      verified: true,
      note: "Official public handle and executive announcements on X.",
    },
    {
      label: "Instagram (@dixitshikhar04)",
      url: "https://www.instagram.com/dixitshikhar04",
      verified: true,
      note: "Official personal and creator handle on Instagram.",
    },
    {
      label: "DIMISI Technologies (Official Domain)",
      url: "https://dimisi.tech",
      verified: true,
      note: "Corporate site of the enterprise founded and led by Shikhar Dixit.",
    },
    {
      label: "Kalesh Platform (TheKalesh.com)",
      url: "https://thekalesh.com",
      verified: true,
      note: "First-party production social media application created by Shikhar Dixit.",
    },
    {
      label: "Ministry of Corporate Affairs (FalconEbiz)",
      url: "https://www.falconebiz.com/company/DIMISI-TECHNOLOGIES-PRIVATE-LIMITED-U62013UP2026PTC246506",
      verified: true,
      note: "MCA company master record and director listing (CIN: U62013UP2026PTC246506).",
    },
    {
      label: "Zauba Corp Director & Company Record",
      url: "https://www.zaubacorp.com/company/DIMISI-TECHNOLOGIES-PRIVATE-LIMITED/U62013UP2026PTC246506",
      verified: true,
      note: "Corporate director database registry for DIMISI Technologies Private Limited.",
    },
    {
      label: "Tofler Corporate Intelligence",
      url: "https://www.tofler.in/dimisi-technologies-private-limited/company/U62013UP2026PTC246506",
      verified: true,
      note: "Corporate governance registry and company financial overview.",
    },
    {
      label: "InstaFinancials Registry Profile",
      url: "https://www.instafinancials.com/company/dimisi-technologies-private-limited/U62013UP2026PTC246506",
      verified: true,
      note: "Official MCA business intelligence profile for DIMISI Technologies.",
    },
    {
      label: "Tracxn Corporate Entity Profile",
      url: "https://tracxn.com/d/companies/dimisi-technologies",
      verified: true,
      note: "Venture database profile for DIMISI Technologies Private Limited.",
    },
  ],
  sections: [
    {
      id: "biography",
      heading: "Biography",
      status: "source-backed",
      body: [
        "Shikhar Dixit is an Indian technology entrepreneur, software engineer, and the Founder & Chief Executive Officer of DIMISI Technologies Private Limited, based in Kanpur, Uttar Pradesh. [1] He leads executive direction, product architecture, and engineering across the DIMISI ecosystem, including the anonymous social platform Kalesh and the DIMISIPEDIA knowledge encyclopedia. [1][4][5]",
        "Dixit's entrepreneurial path began on 15 October 2024 with the 6-hour home development sprint of a Face Recognition System to present at Axis College's Gandhigiri technical project presentation event alongside Swatantra Singh, which catalyzed the founding of CATI (Cosmic Aura Tech Industry) and later DIMISI Technologies. [2][3]",
        "Following campus placement drives and a pivotal late-night brainstorming session in November 2025, he conceived, coded, and deployed the initial anonymous social media prototype Poll-Social overnight, evolving into Kalesh and culminating in the incorporation of DIMISI Technologies Private Limited on 9 April 2026. [2][3][5]",
      ],
    },
    {
      id: "education",
      heading: "Early life and education",
      status: "source-backed",
      body: [
        "Dixit pursued his Bachelor of Technology in Computer Science and Engineering at Axis College, Kanpur, affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU). [1]",
        "During his academic years, he founded the campus tech club CodeVeda, served as Campus Ambassador for the Entrepreneurship Cell at IIT Bombay, and led multiple software and AI automation initiatives. [1]",
      ],
    },
    {
      id: "career",
      heading: "Career & Leadership",
      status: "source-backed",
      body: [
        "Before focusing on DIMISI Technologies, Dixit gained practical experience across artificial intelligence, product design, and community leadership. His work includes AI automation at Degree2Destiny, user engagement with Hunch, and startup ecosystem engagement with E-Cell IIT Bombay. [1]",
        "As CEO of DIMISI Technologies, he oversees full-lifecycle software delivery, technology strategy, corporate governance, and commercial client relationships across Kanpur and broader Indian tech markets. [1][3]",
      ],
    },
    {
      id: "dimisi",
      heading: "DIMISI Technologies Private Limited",
      status: "source-backed",
      body: [
        "Dixit is the principal founder and Chief Executive Officer of DIMISI Technologies Private Limited, incorporated on 9 April 2026 under CIN U62013UP2026PTC246506 in Kanpur, Uttar Pradesh. [3]",
        "He created the company name 'DIMISI' as an acronym of the founding leadership's surnames: DI (Dixit) + MI (Mishra) + SI (Singh), ensuring a 100% unique brand identity approved by the Ministry of Corporate Affairs (MCA). [3][4]",
      ],
    },
    {
      id: "kalesh",
      heading: "Kalesh Platform",
      status: "source-backed",
      body: [
        "Dixit architected and built the initial web client for Kalesh, an anonymous opinion, polling, and social engagement platform built on the philosophy that 'your opinion matters, not your identity.' [2][5]",
        "The platform deployed to TheKalesh.com on 22 January 2026, supported by the core engineering lineup known as the 'Sinister Six'. [2]",
      ],
    },
    {
      id: "colleagues",
      heading: "Founding leadership",
      status: "source-backed",
      body: [
        "DIMISI's founding director team comprises Shikhar Dixit (Founder & CEO), Nishkarsh Mishra (Co-Founder, Director, CMO & COO), and Swatantra Singh (Co-Founder, Director & CTO). [3]",
        "Together with core engineers Sheelu Singh (Flutter Android) and Mridul Mishra (Backend/Linux), the leadership oversees the expanding company ecosystem.",
      ],
    },
    {
      id: "knowledge-panel-verification",
      heading: "Official Knowledge Graph Verification & Identity Records",
      status: "source-backed",
      body: [
        "This canonical identity record establishes the authoritative Google Knowledge Graph entity for Shikhar Dixit, Founder and Chief Executive Officer of DIMISI Technologies Private Limited (CIN: U62013UP2026PTC246506), registered with the Ministry of Corporate Affairs, Government of India. [1][3]",
        "For Google Knowledge Panel self-service claiming and entity disambiguation, Shikhar Dixit's digital presence is linked to authenticated first-party profiles: LinkedIn (shikhar040), GitHub (dixitshikhar004), X (@dixitshikhar004), Medium (@dixitshikhar004), Crunchbase (shikhar-dixit-944f), Instagram (@dixitshikhar04), as well as corporate directories on FalconEbiz, Zauba Corp, Tofler, and Tracxn. [1][2][3][4]",
        "Entity ownership of DIMISI Technologies, Kalesh, and DIMISIPEDIA is certified through direct production deployment, corporate filings in Kanpur, Uttar Pradesh, and verified DNS ownership across dimisi.tech, thekalesh.com, and dimisipedia.me.",
      ],
    },
  ],
  claims: [
    claim(
      "Shikhar Dixit is the verified entity owner and CEO across dimisi.tech, thekalesh.com, and dimisipedia.me.",
      "Identity verification",
      ["src-corporate-record", "src-shikhar-linkedin", "src-dimisi-website"],
      "source-backed",
    ),
    claim(
      "Shikhar Dixit is the founder and CEO of DIMISI Technologies Private Limited.",
      "Confirmed role",
      ["src-shikhar-linkedin", "src-corporate-record"],
      "source-backed",
    ),
    claim(
      "Shikhar Dixit serves as Director of DIMISI Technologies Private Limited under CIN U62013UP2026PTC246506.",
      "Corporate claim",
      ["src-corporate-record", "src-falconebiz-registry"],
      "source-backed",
    ),
    claim(
      "Shikhar Dixit is the creator and product architect of Kalesh.",
      "Project association",
      ["src-shikhar-medium", "src-kalesh-official"],
      "source-backed",
    ),
    claim(
      "Shikhar Dixit studied B.Tech Computer Science & Engineering at Axis College (AKTU).",
      "Educational claim",
      ["src-shikhar-linkedin"],
      "source-backed",
    ),
  ],
  questions: [
    {
      q: "When was Shikhar Dixit born and how old is he?",
      get a() {
        return `Shikhar Dixit was born on 6 May 2004 (${calculateAge("2004-05-06")} years old) in Kanpur, Uttar Pradesh, India.`;
      },
    },
    {
      q: "Who is Shikhar Dixit?",
      a: "Shikhar Dixit is an Indian technology entrepreneur, software engineer, and the Founder & Chief Executive Officer (CEO) of DIMISI Technologies Private Limited, based in Kanpur, Uttar Pradesh.",
    },
    {
      q: "What is Shikhar Dixit's role at DIMISI Technologies?",
      a: "Shikhar Dixit serves as the Founder, Chief Executive Officer (CEO), and Managing Director of DIMISI Technologies Private Limited, leading company vision, technology architecture, and product strategy.",
    },
    {
      q: "What products and platforms has Shikhar Dixit created?",
      a: "Shikhar Dixit has developed Kalesh (an anonymous social polling and engagement platform), the Gandhigiri Face Recognition System, DIMISIPEDIA, and proprietary commercial software platforms under DIMISI Technologies.",
    },
    {
      q: "What is Shikhar Dixit's educational background?",
      a: "Shikhar Dixit studied Computer Science and Engineering (B.Tech) at Axis College, Kanpur, affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU).",
    },
    {
      q: "Where is Shikhar Dixit located?",
      a: "Shikhar Dixit is based and operates out of Kanpur, Uttar Pradesh, India.",
    },
  ],
  faqs: [
    {
      question: "Who is Shikhar Dixit?",
      answer:
        "Shikhar Dixit is an Indian technology entrepreneur, software engineer, and the Founder & Chief Executive Officer (CEO) of DIMISI Technologies Private Limited, based in Kanpur, Uttar Pradesh.",
    },
    {
      question: "What is Shikhar Dixit's role at DIMISI Technologies?",
      answer:
        "Shikhar Dixit serves as the Founder, Chief Executive Officer (CEO), and Managing Director of DIMISI Technologies Private Limited, leading company vision, technology architecture, and product strategy.",
    },
    {
      question: "What products and platforms has Shikhar Dixit created?",
      answer:
        "Shikhar Dixit has developed Kalesh (an anonymous social polling and engagement platform), the Gandhigiri Face Recognition System, DIMISIPEDIA, and proprietary commercial software platforms under DIMISI Technologies.",
    },
    {
      question: "What is Shikhar Dixit's educational background?",
      answer:
        "Shikhar Dixit studied Computer Science and Engineering (B.Tech) at Axis College, Kanpur, affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU).",
    },
    {
      question: "Where is Shikhar Dixit located?",
      answer: "Shikhar Dixit is based and operates out of Kanpur, Uttar Pradesh, India.",
    },
  ],
  coverage: [
    {
      area: "Identity",
      status: "source-backed",
      note: "Name, location and occupation verified across professional profiles and registry documents.",
    },
    {
      area: "Roles",
      status: "source-backed",
      note: "Founder, CEO, and Director status verified via corporate incorporation records.",
    },
    {
      area: "Education",
      status: "source-backed",
      note: "B.Tech CSE from Axis College (AKTU) verified.",
    },
    {
      area: "Professional experience",
      status: "source-backed",
      note: "Prior roles at Degree2Destiny, Hunch, and E-Cell IIT Bombay.",
    },
    {
      area: "Projects",
      status: "source-backed",
      note: "Kalesh and DIMISIPEDIA documented with live platforms.",
    },
    {
      area: "Media",
      status: "source-backed",
      note: "First-party publications and verified online documentation.",
    },
  ],
  officialLinks: [
    { label: "dimisi.tech (Corporate Site)", url: "https://dimisi.tech", official: true },
    { label: "thekalesh.com (Flagship Product)", url: "https://thekalesh.com", official: true },
    { label: "dimisipedia.me (Knowledge Engine)", url: "https://dimisipedia.me", official: true },
  ],
  sourceIds: [
    "src-shikhar-linkedin",
    "src-shikhar-medium",
    "src-corporate-record",
    "src-dimisi-linkedin",
    "src-kalesh-official",
    "src-shikhar-crunchbase",
    "src-team-roster",
    "src-dimisi-website",
    "src-falconebiz-registry",
    "src-tracxn-dimisi",
  ],
  revisions: rev(
    "Expanded verified sameAs profiles, identity claim anchors, and Google Knowledge Graph disambiguation properties.",
  ),
  createdAt: ADDED,
  updatedAt: "2026-08-21",
  seoTitle: "Shikhar Dixit — Founder & CEO of DIMISI Technologies | Official Knowledge Profile",
  seoDescription:
    "Official Google Knowledge Graph profile of Shikhar Dixit: Indian technology entrepreneur, software engineer, and Founder & CEO of DIMISI Technologies Private Limited in Kanpur, Uttar Pradesh. Creator of Kalesh and DIMISIPEDIA.",
};

/* ---------------------------------------------------------- person: Nishkarsh */

const nishkarsh: Entity = {
  id: "nishkarsh-mishra",
  slug: "nishkarsh-mishra",
  path: "/people/nishkarsh-mishra",
  entityType: "person",
  name: "Nishkarsh Mishra",
  subtitle: "Co-Founder, Director, CMO & COO · DIMISI Technologies",
  image: "/images/nishkarsh-mishra.png",
  birthDate: "2000-03-15",
  shortDescription:
    "Technology entrepreneur, operations strategist and marketing executive; co-founder and director of DIMISI Technologies Private Limited.",
  answer:
    "Nishkarsh Mishra is an Indian technology entrepreneur, operations strategist, and marketing executive based in Kanpur, Uttar Pradesh. He is a co-founder and director of DIMISI Technologies Private Limited, serving as Chief Operating Officer (COO) and Chief Marketing Officer (CMO).",
  facts: [
    {
      label: "Born",
      get value() {
        return formatBornFact("2000-03-15", "Kanpur, Uttar Pradesh, India");
      },
      status: "source-backed",
      sourceIds: ["src-corporate-record"],
    },
    {
      label: "Occupation",
      value: "Technology entrepreneur, operations and marketing executive",
      status: "source-backed",
    },
    {
      label: "Organization",
      value: "DIMISI Technologies Private Limited",
      status: "source-backed",
    },
    { label: "Roles", value: "Co-Founder · Director · CMO · COO", status: "source-backed" },
    { label: "Location", value: "Kanpur, Uttar Pradesh, India", status: "source-backed" },
    {
      label: "Known for",
      value: "DIMISI Technologies, Kalesh growth and operations",
      status: "source-backed",
    },
    {
      label: "Education",
      value: "Diploma CSE (2019–2022); B.Tech CSE (expected 2026)",
      status: "source-backed",
    },
  ],
  areas: ["Operations Management", "Marketing Strategy", "Product Growth", "Corporate Development"],
  knowsAbout: [
    "Operations Strategy",
    "Digital Marketing",
    "User Acquisition",
    "Corporate Operations",
    "DIMISI Technologies",
    "Kalesh",
  ],
  sameAs: [
    "https://dimisi.tech",
    "https://thekalesh.com",
    "https://www.crunchbase.com/person/nishkarsh-mishra-4e7d",
    "https://www.linkedin.com",
    "https://tracxn.com",
    "https://www.zaubacorp.com",
  ],
  roles: [
    {
      title: "Co-Founder",
      organization: ORG,
      status: "source-backed",
      sourceIds: ["src-nishkarsh-linkedin", "src-corporate-record", "src-tracxn-dimisi"],
    },
    {
      title: "Director",
      organization: ORG,
      status: "source-backed",
      note: "Director of DIMISI Technologies Private Limited.",
      sourceIds: [
        "src-corporate-record",
        "src-falconebiz-registry",
        "src-tracxn-dimisi",
        "src-zaubacorp-dimisi",
      ],
    },
    {
      title: "Chief Marketing Officer",
      organization: ORG,
      status: "source-backed",
      sourceIds: ["src-nishkarsh-linkedin"],
    },
    {
      title: "Chief Operating Officer",
      organization: ORG,
      status: "source-backed",
      sourceIds: ["src-nishkarsh-linkedin"],
    },
  ],
  education: [
    {
      institution: "Kanpur Institute of Technology",
      qualification: "Diploma in Computer Science & Engineering",
      period: "2019–2022",
      result: "First Division",
      status: "source-backed",
    },
    {
      institution: "Axis Colleges, Kanpur",
      qualification: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      period: "Expected graduation 2026",
      status: "source-backed",
    },
  ],
  experience: [],
  externalProfiles: [
    {
      label: "DIMISI Technologies (official site)",
      url: "https://dimisi.tech",
      verified: true,
      note: "First-party company website.",
    },
    {
      label: "Crunchbase Profile",
      url: "https://www.crunchbase.com/person/nishkarsh-mishra-4e7d",
      verified: true,
      note: "Verified founder and executive profile on Crunchbase.",
    },
    {
      label: "Kalesh platform",
      url: "https://thekalesh.com",
      verified: true,
      note: "First-party product site.",
    },
    {
      label: "Tracxn company profile",
      url: "https://tracxn.com",
      verified: true,
      note: "Third-party corporate directory listing of DIMISI directors.",
    },
    {
      label: "ZaubaCorp company record",
      url: "https://www.zaubacorp.com",
      verified: true,
      note: "MCA-derived company database record.",
    },
  ],
  sections: [
    {
      id: "biography",
      heading: "Biography",
      status: "source-backed",
      body: [
        "Nishkarsh Mishra is an Indian technology entrepreneur, operations strategist and marketing executive based in Kanpur, Uttar Pradesh. [1] He is a co-founder and director of DIMISI Technologies Private Limited, where he serves as Chief Marketing Officer and Chief Operating Officer. [1][3]",
        "His documented work sits at the intersection of company operations and market-facing growth: internal coordination, process and team management, alongside positioning, user acquisition, and scaling for products like Kalesh. [1][2]",
      ],
    },
    {
      id: "education",
      heading: "Early life and education",
      status: "source-backed",
      body: [
        "Mishra completed a Diploma in Computer Science & Engineering at Kanpur Institute of Technology (2019–2022) with first-division honours, before pursuing his B.Tech in Computer Science & Engineering at Axis Colleges, Kanpur. [1]",
      ],
    },
    {
      id: "career",
      heading: "Career",
      status: "source-backed",
      body: [
        "Mishra leads operating workflows, team logistics, growth frameworks, and digital positioning across DIMISI Technologies and its product initiatives. [1][2]",
      ],
    },
    {
      id: "dimisi",
      heading: "DIMISI Technologies",
      status: "source-backed",
      body: [
        "Mishra is part of the founding leadership of DIMISI Technologies Private Limited alongside Shikhar Dixit (Founder & CEO) and Swatantra Singh (Co-Founder & CTO). [3]",
      ],
    },
    {
      id: "kalesh",
      heading: "Kalesh",
      status: "source-backed",
      body: [
        "Mishra oversees marketing, user outreach, community expansion, and operational rollout for Kalesh. [1][2]",
      ],
    },
  ],
  claims: [
    claim(
      "Nishkarsh Mishra is a co-founder and director of DIMISI Technologies Private Limited.",
      "Confirmed role",
      ["src-nishkarsh-linkedin", "src-corporate-record"],
      "source-backed",
    ),
    claim(
      "Nishkarsh Mishra serves as Chief Operating Officer and Chief Marketing Officer.",
      "Confirmed role",
      ["src-nishkarsh-linkedin"],
      "source-backed",
    ),
  ],
  questions: [
    {
      q: "When was Nishkarsh Mishra born and how old is he?",
      get a() {
        return `Nishkarsh Mishra was born on 15 March 2000 (${calculateAge("2000-03-15")} years old) in Kanpur, Uttar Pradesh, India.`;
      },
    },
    {
      q: "Who is Nishkarsh Mishra?",
      a: "A technology entrepreneur, operations strategist and marketing executive based in Kanpur, and co-founder/director of DIMISI Technologies Private Limited.",
    },
  ],
  faqs: [
    {
      question: "What is Nishkarsh Mishra's date of birth and age?",
      get answer() {
        return `Nishkarsh Mishra was born on 15 March 2000. As of current calculation, he is ${calculateAge("2000-03-15")} years old.`;
      },
    },
    {
      question: "Who is Nishkarsh Mishra?",
      answer:
        "Nishkarsh Mishra is an Indian technology entrepreneur, operations strategist, and the Co-Founder, Director, CMO & COO of DIMISI Technologies Private Limited.",
    },
    {
      question: "What is Nishkarsh Mishra's role at DIMISI Technologies?",
      answer:
        "Nishkarsh Mishra serves as Co-Founder, Director, Chief Marketing Officer (CMO), and Chief Operating Officer (COO), overseeing day-to-day operations and market growth.",
    },
  ],
  coverage: [
    { area: "Identity", status: "source-backed", note: "Name, location and occupation verified." },
    {
      area: "Roles",
      status: "source-backed",
      note: "Co-founder and directorship verified via incorporation records.",
    },
    { area: "Education", status: "source-backed", note: "Diploma and B.Tech recorded." },
    { area: "Projects", status: "source-backed", note: "Kalesh involvement documented." },
  ],
  officialLinks: [],
  sourceIds: [
    "src-nishkarsh-linkedin",
    "src-corporate-record",
    "src-team-roster",
    "src-tracxn-dimisi",
    "src-zaubacorp-dimisi",
    "src-dimisi-website",
    "src-kalesh-official",
  ],
  revisions: rev(
    "Enriched biography, verified sameAs links, educational credentials, and direct-answer AEO Q&A data.",
  ),
  createdAt: ADDED,
  updatedAt: "2026-08-21",
  seoTitle: "Nishkarsh Mishra — Co-Founder, COO & CMO of DIMISI Technologies | DIMISIPEDIA",
  seoDescription:
    "Nishkarsh Mishra is a co-founder and director of DIMISI Technologies Private Limited, serving as COO and CMO, with documented work in operations, marketing and Kalesh growth.",
};

/* ---------------------------------------------------------- person: Swatantra */

const swatantra: Entity = {
  id: "swatantra-singh",
  slug: "swatantra-singh",
  path: "/people/swatantra-singh",
  entityType: "person",
  name: "Swatantra Singh",
  subtitle: "Co-Founder & CTO · DIMISI Technologies",
  image: "/images/swatantra-singh.png",
  birthDate: "2000-08-30",
  shortDescription:
    "Technology executive and engineer; co-founder, director and chief technology officer of DIMISI Technologies Private Limited.",
  answer:
    "Swatantra Singh is a technology executive and software engineer associated with DIMISI Technologies Private Limited in Kanpur, Uttar Pradesh. He is a co-founder, director and Chief Technology Officer (CTO) of the company, responsible for platform architecture, systems engineering, and technical scalability across the DIMISI product ecosystem.",
  facts: [
    {
      label: "Born",
      get value() {
        return formatBornFact("2000-08-30", "Kanpur, Uttar Pradesh, India");
      },
      status: "source-backed",
      sourceIds: ["src-corporate-record"],
    },
    { label: "Occupation", value: "Technology executive, engineer", status: "source-backed" },
    {
      label: "Organization",
      value: "DIMISI Technologies Private Limited",
      status: "source-backed",
    },
    {
      label: "Roles",
      value: "Co-Founder · Director · Chief Technology Officer",
      status: "source-backed",
    },
    { label: "Location", value: "Kanpur, Uttar Pradesh, India", status: "source-backed" },
    {
      label: "Known for",
      value: "DIMISI Technologies, Kalesh platform architecture",
      status: "source-backed",
    },
    {
      label: "Education",
      value: "B.Tech, Computer Science & Engineering — Axis Colleges (2023–2026)",
      status: "source-backed",
    },
  ],
  areas: [
    "Platform Architecture",
    "Backend Engineering",
    "Systems Scalability",
    "Technical Leadership",
  ],
  knowsAbout: [
    "Backend Architecture",
    "Cloud Infrastructure",
    "System Scalability",
    "Software Engineering",
    "DIMISI Technologies",
    "Kalesh",
  ],
  sameAs: [
    "https://dimisi.tech",
    "https://thekalesh.com",
    "https://www.crunchbase.com/person/swatantra-singh-5f2b",
    "https://www.falconebiz.com",
    "https://www.planetexim.net",
    "https://tracxn.com",
  ],
  roles: [
    {
      title: "Co-Founder",
      organization: ORG,
      status: "source-backed",
      sourceIds: ["src-corporate-record", "src-tracxn-dimisi"],
    },
    {
      title: "Director",
      organization: ORG,
      status: "source-backed",
      note: "Director of DIMISI Technologies Private Limited.",
      sourceIds: [
        "src-corporate-record",
        "src-falconebiz-registry",
        "src-planetexim-director",
        "src-tracxn-dimisi",
      ],
    },
    {
      title: "Chief Technology Officer",
      organization: ORG,
      status: "source-backed",
      sourceIds: ["src-kalesh-team", "src-swatantra-crunchbase"],
    },
  ],
  education: [
    {
      institution: "Axis Colleges, Kanpur",
      qualification: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      period: "2023 – 2026",
      status: "source-backed",
    },
  ],
  experience: [],
  externalProfiles: [
    {
      label: "DIMISI Technologies (official site)",
      url: "https://dimisi.tech",
      verified: true,
      note: "First-party company website.",
    },
    {
      label: "Crunchbase Profile",
      url: "https://www.crunchbase.com/person/swatantra-singh-5f2b",
      verified: true,
      note: "Verified founder and CTO profile on Crunchbase.",
    },
    {
      label: "Kalesh platform team page",
      url: "https://thekalesh.com",
      verified: true,
      note: "First-party product team listing.",
    },
    {
      label: "Corporate registry (FalconEbiz)",
      url: "https://www.falconebiz.com",
      verified: true,
      note: "MCA-derived registry listing.",
    },
    {
      label: "Director profile (PlanetExim)",
      url: "https://www.planetexim.net",
      verified: true,
      note: "MCA-derived director listing.",
    },
    {
      label: "Tracxn company profile",
      url: "https://tracxn.com",
      verified: true,
      note: "Third-party corporate directory listing of DIMISI directors.",
    },
  ],
  sections: [
    {
      id: "biography",
      heading: "Biography",
      status: "source-backed",
      body: [
        "Swatantra Singh is a technology executive and engineer associated with DIMISI Technologies Private Limited in Kanpur, Uttar Pradesh. [1] He is a co-founder, active corporate director, and Chief Technology Officer (CTO) of the company, alongside Shikhar Dixit (Founder & CEO) and Nishkarsh Mishra (Co-Founder, Director, CMO & COO). [1][4]",
        "His collaboration with Shikhar Dixit began on 15 October 2024 with the 6-hour home development of the Face Recognition project for Axis College's Gandhigiri technical project presentation event, forming the initial technical partnership that evolved into CATI and DIMISI Technologies. [1][5]",
      ],
    },
    {
      id: "education",
      heading: "Education",
      status: "source-backed",
      body: [
        "Singh studied for his Bachelor of Technology in Computer Science & Engineering at Axis Colleges, Kanpur. [5]",
      ],
    },
    {
      id: "dimisi",
      heading: "DIMISI Technologies",
      status: "source-backed",
      body: [
        "Singh was appointed director of DIMISI Technologies Private Limited upon incorporation on 9 April 2026 under CIN U62013UP2026PTC246506. [1]",
      ],
    },
    {
      id: "responsibilities",
      heading: "Technical responsibilities",
      status: "source-backed",
      body: [
        "As CTO, Singh leads platform architecture, software development, technical scalability, and backend engineering across DIMISI software solutions and the Kalesh platform. [5][6]",
      ],
    },
  ],
  claims: [
    claim(
      "Swatantra Singh is a co-founder and director of DIMISI Technologies Private Limited.",
      "Corporate claim",
      ["src-corporate-record", "src-tracxn-dimisi"],
      "source-backed",
    ),
    claim(
      "Swatantra Singh serves as Chief Technology Officer of DIMISI Technologies.",
      "Corporate claim",
      ["src-kalesh-team", "src-swatantra-crunchbase"],
      "source-backed",
    ),
  ],
  questions: [
    {
      q: "When was Swatantra Singh born and how old is he?",
      get a() {
        return `Swatantra Singh was born on 30 August 2000 (${calculateAge("2000-08-30")} years old) in Kanpur, Uttar Pradesh, India.`;
      },
    },
    {
      q: "Who is Swatantra Singh?",
      a: "A technology executive, engineer, and the Co-Founder & CTO of DIMISI Technologies Private Limited in Kanpur.",
    },
  ],
  faqs: [
    {
      question: "What is Swatantra Singh's date of birth and age?",
      get answer() {
        return `Swatantra Singh was born on 30 August 2000. As of current calculation, he is ${calculateAge("2000-08-30")} years old.`;
      },
    },
    {
      question: "Who is Swatantra Singh?",
      answer:
        "Swatantra Singh is an Indian technology executive, engineer, and the Co-Founder, Director, and Chief Technology Officer (CTO) of DIMISI Technologies Private Limited.",
    },
    {
      question: "What is Swatantra Singh's role at DIMISI Technologies?",
      answer:
        "Swatantra Singh leads platform architecture, technical scalability, and engineering infrastructure as Co-Founder and CTO of DIMISI Technologies.",
    },
  ],
  coverage: [
    { area: "Identity", status: "source-backed", note: "Name, location and occupation verified." },
    {
      area: "Roles",
      status: "source-backed",
      note: "Co-founder, Director, and CTO status verified via corporate incorporation records.",
    },
    { area: "Education", status: "source-backed", note: "B.Tech CSE from Axis Colleges recorded." },
  ],
  officialLinks: [],
  sourceIds: [
    "src-corporate-record",
    "src-kalesh-team",
    "src-swatantra-crunchbase",
    "src-falconebiz-registry",
    "src-planetexim-director",
    "src-tracxn-dimisi",
  ],
  revisions: rev(
    "Enriched biography, verified sameAs links, educational credentials, and direct-answer AEO Q&A data.",
  ),
  createdAt: ADDED,
  updatedAt: "2026-08-21",
  seoTitle: "Swatantra Singh — Co-Founder & CTO of DIMISI Technologies | DIMISIPEDIA",
  seoDescription:
    "Swatantra Singh is a co-founder, director and CTO of DIMISI Technologies Private Limited in Kanpur, leading technical architecture and platform engineering.",
};

export const founderEntities: Entity[] = [shikhar, nishkarsh, swatantra];

export const foundingLeadership = [
  { id: "shikhar-dixit", roles: "Founder, CEO", areas: "Product, technology, entrepreneurship" },
  {
    id: "nishkarsh-mishra",
    roles: "Co-Founder, Director, CMO, COO",
    areas: "Operations, marketing, growth",
  },
  {
    id: "swatantra-singh",
    roles: "Co-Founder, Director, CTO",
    areas: "Platform architecture, backend engineering, scalability",
  },
];
