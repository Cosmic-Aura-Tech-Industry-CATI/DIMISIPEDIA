/**
 * DIMISIPEDIA Enterprise Sitemap Engine
 *
 * Implements an Enterprise modular XML Sitemap architecture:
 * - Master Sitemap Index (/sitemap.xml)
 * - Domain-partitioned child sitemaps:
 *   - /sitemap-pages.xml
 *   - /sitemap-people.xml
 *   - /sitemap-organizations.xml
 *   - /sitemap-projects.xml
 *   - /sitemap-technology.xml
 *   - /sitemap-articles.xml
 *   - /sitemap-events.xml
 *   - /sitemap-timeline.xml
 *   - /sitemap-images.xml
 * - Full XSL stylesheet rendering (/sitemap.xsl) for human-readable browser views
 * - IST (+05:30) W3C ISO 8601 timestamps
 * - Strictly prioritizes Shikhar Dixit (Founder & CEO) as the apex entity
 */

import {
  organizationEntity,
  peopleEntities,
  projectEntities,
  technologyEntities,
  timeline,
} from "@/data/knowledge";
import { publishedArticles, articlePath } from "@/data/articles";
import { abs, SITE_URL } from "@/lib/seo";

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq?: string;
  priority?: string;
}

export interface ImageMetadata {
  loc: string;
  title?: string;
  caption?: string;
  geoLocation?: string;
  license?: string;
}

export interface ImageSitemapEntry {
  loc: string;
  lastmod?: string;
  images: ImageMetadata[];
}

/** Formats dates into W3C ISO 8601 timestamps with IST (+05:30) offset */
export function toW3cTimestamp(d: string | undefined): string {
  if (!d) return "2026-10-20T12:00:00+05:30";
  if (d.includes("T")) {
    if (!d.includes("+") && !d.includes("Z")) return `${d}+05:30`;
    return d;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    return `${d}T12:00:00+05:30`;
  }
  return d;
}

/** XML special character escaping for valid XML production */
export function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
    return c;
  });
}

/** Standard HTTP Response builder for XML sitemaps */
export function sitemapResponse(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/** Renders standard <urlset> XML with XSL stylesheet instruction */
export function renderUrlset(entries: SitemapEntry[]): string {
  const urls = entries.map((e) => {
    return [
      `  <url>`,
      `    <loc>${escapeXml(e.loc)}</loc>`,
      e.lastmod ? `    <lastmod>${toW3cTimestamp(e.lastmod)}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

/** Renders Google Image Sitemap <urlset> XML with XSL stylesheet instruction */
export function renderImageUrlset(entries: ImageSitemapEntry[]): string {
  const urls = entries.map((entry) => {
    const lines = [
      `  <url>`,
      `    <loc>${escapeXml(entry.loc)}</loc>`,
      entry.lastmod ? `    <lastmod>${toW3cTimestamp(entry.lastmod)}</lastmod>` : null,
      `    <changefreq>weekly</changefreq>`,
      `    <priority>0.8</priority>`,
    ];

    for (const img of entry.images) {
      lines.push(`    <image:image>`);
      lines.push(`      <image:loc>${escapeXml(img.loc)}</image:loc>`);
      if (img.title) lines.push(`      <image:title>${escapeXml(img.title)}</image:title>`);
      if (img.caption) lines.push(`      <image:caption>${escapeXml(img.caption)}</image:caption>`);
      if (img.geoLocation)
        lines.push(`      <image:geo_location>${escapeXml(img.geoLocation)}</image:geo_location>`);
      if (img.license) lines.push(`      <image:license>${escapeXml(img.license)}</image:license>`);
      lines.push(`    </image:image>`);
    }

    lines.push(`  </url>`);
    return lines.filter(Boolean).join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

/** Renders Master <sitemapindex> XML with XSL stylesheet instruction */
export function renderSitemapIndex(sitemaps: { loc: string; lastmod: string }[]): string {
  const items = sitemaps.map((s) => {
    return [
      `  <sitemap>`,
      `    <loc>${escapeXml(s.loc)}</loc>`,
      s.lastmod ? `    <lastmod>${toW3cTimestamp(s.lastmod)}</lastmod>` : null,
      `  </sitemap>`,
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...items,
    `</sitemapindex>`,
  ].join("\n");
}

/* ------------------------------------------------------------------ */
/* CHILD SITEMAP DATA GENERATORS                                       */
/* ------------------------------------------------------------------ */

/**
 * 1. Static and Institutional Pages (/sitemap-pages.xml)
 */
export function getPagesEntries(): SitemapEntry[] {
  const PAGES_LASTMOD = "2026-10-20";

  const pagesConfig = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/credibility", priority: "0.8", changefreq: "monthly" },
    { path: "/editorial-policy", priority: "0.8", changefreq: "monthly" },
    { path: "/methodology", priority: "0.8", changefreq: "monthly" },
    { path: "/sources", priority: "0.8", changefreq: "weekly" },
    { path: "/explore", priority: "0.8", changefreq: "weekly" },
    { path: "/privacy", priority: "0.5", changefreq: "yearly" },
    { path: "/terms", priority: "0.5", changefreq: "yearly" },
    { path: "/people", priority: "0.9", changefreq: "weekly" },
    { path: "/organizations", priority: "0.9", changefreq: "weekly" },
    { path: "/projects", priority: "0.9", changefreq: "weekly" },
    { path: "/technology", priority: "0.8", changefreq: "weekly" },
    { path: "/articles", priority: "0.9", changefreq: "daily" },
    { path: "/blog", priority: "0.9", changefreq: "daily" },
  ];

  return pagesConfig.map((p) => ({
    loc: abs(p.path),
    lastmod: PAGES_LASTMOD,
    priority: p.priority,
    changefreq: p.changefreq,
  }));
}

/**
 * 2. Public People Profiles (/sitemap-people.xml)
 * Prioritizes Shikhar Dixit (Founder & CEO) as apex entry.
 */
export function getPeopleEntries(): SitemapEntry[] {
  const sortedPeople = [...peopleEntities].sort((a, b) => {
    if (a.id === "shikhar-dixit") return -1;
    if (b.id === "shikhar-dixit") return 1;
    if (a.id === "nishkarsh-mishra") return -1;
    if (b.id === "nishkarsh-mishra") return 1;
    if (a.id === "swatantra-singh") return -1;
    if (b.id === "swatantra-singh") return 1;
    return a.name.localeCompare(b.name);
  });

  return sortedPeople.map((person) => {
    const isFounder =
      person.id === "shikhar-dixit" ||
      person.id === "nishkarsh-mishra" ||
      person.id === "swatantra-singh";
    const priority = person.id === "shikhar-dixit" ? "1.0" : isFounder ? "0.9" : "0.8";
    const changefreq = person.id === "shikhar-dixit" ? "daily" : isFounder ? "weekly" : "monthly";

    return {
      loc: abs(person.path),
      lastmod: person.updatedAt || person.createdAt || "2026-08-15",
      priority,
      changefreq,
    };
  });
}

/**
 * 3. Organizations (/sitemap-organizations.xml)
 */
export function getOrganizationsEntries(): SitemapEntry[] {
  return [
    {
      loc: abs(organizationEntity.path),
      lastmod: organizationEntity.updatedAt || organizationEntity.createdAt || "2026-10-20",
      priority: "1.0",
      changefreq: "daily",
    },
  ];
}

/**
 * 4. Projects (/sitemap-projects.xml)
 */
export function getProjectsEntries(): SitemapEntry[] {
  return projectEntities.map((proj) => {
    const isPrimary = proj.id === "kalesh" || proj.id === "dimisi-ops";
    return {
      loc: abs(proj.path),
      lastmod: proj.updatedAt || proj.createdAt || "2026-08-15",
      priority: isPrimary ? "1.0" : "0.8",
      changefreq: isPrimary ? "daily" : "weekly",
    };
  });
}

/**
 * 5. Technologies (/sitemap-technology.xml)
 */
export function getTechnologyEntries(): SitemapEntry[] {
  return technologyEntities.map((tech) => ({
    loc: abs(tech.path),
    lastmod: tech.updatedAt || tech.createdAt || "2026-08-15",
    priority: "0.8",
    changefreq: "monthly",
  }));
}

/**
 * 6. Articles and Publications (/sitemap-articles.xml)
 */
export function getArticlesEntries(): SitemapEntry[] {
  return publishedArticles.map((article) => ({
    loc: abs(articlePath(article)),
    lastmod: article.dateModified || article.datePublished || "2026-08-15",
    priority: article.featured ? "1.0" : "0.8",
    changefreq: "weekly",
  }));
}

/**
 * 7. Events (/sitemap-events.xml)
 */
export function getEventsEntries(): SitemapEntry[] {
  return [
    {
      loc: abs("/events"),
      lastmod: "2026-08-15",
      priority: "0.8",
      changefreq: "weekly",
    },
  ];
}

/**
 * 8. Timeline & Milestones (/sitemap-timeline.xml)
 */
export function getTimelineEntries(): SitemapEntry[] {
  const latestTimelineDate =
    timeline
      .map((t) => t.date)
      .sort()
      .pop() || "2026-09-24";

  return [
    {
      loc: abs("/timeline"),
      lastmod: latestTimelineDate,
      priority: "0.9",
      changefreq: "weekly",
    },
    {
      loc: abs("/journey"),
      lastmod: "2026-10-20",
      priority: "1.0",
      changefreq: "weekly",
    },
  ];
}

/**
 * 9. Image Sitemap (/sitemap-images.xml)
 */
export function getImagesEntries(): ImageSitemapEntry[] {
  const LICENSE_URL = `${SITE_URL}/editorial-policy`;
  const GEO_KANPUR = "Kanpur, Uttar Pradesh, India";

  const entries: ImageSitemapEntry[] = [];

  // Home logo
  entries.push({
    loc: abs("/"),
    lastmod: "2026-10-20",
    images: [
      {
        loc: abs("/images/dimisipedia-logo.png"),
        title: "DIMISIPEDIA — Official Knowledge Engine of DIMISI Technologies",
        caption: "DIMISIPEDIA authoritative knowledge base and entity registry",
        geoLocation: GEO_KANPUR,
        license: LICENSE_URL,
      },
    ],
  });

  // Organization
  entries.push({
    loc: abs(organizationEntity.path),
    lastmod: organizationEntity.updatedAt,
    images: [
      {
        loc: abs("/images/dimisi-logo.png"),
        title: "DIMISI Technologies Private Limited — Official Corporate Mark",
        caption:
          "Corporate identity of DIMISI Technologies Private Limited (CIN: U62013UP2026PTC246506)",
        geoLocation: GEO_KANPUR,
        license: LICENSE_URL,
      },
    ],
  });

  // People with images (Shikhar Dixit prioritized first)
  const sortedPeople = [...peopleEntities].sort((a, b) => {
    if (a.id === "shikhar-dixit") return -1;
    if (b.id === "shikhar-dixit") return 1;
    return 0;
  });

  for (const person of sortedPeople) {
    if (person.image) {
      const isFounder =
        person.id === "shikhar-dixit" ||
        person.id === "nishkarsh-mishra" ||
        person.id === "swatantra-singh";
      const isMentor = person.id === "jayendra-pratap-singh";

      const title = isMentor
        ? "Jayendra Pratap Singh (JP) — First Mentor of DIMISI Technologies | HR & People Development Consultant"
        : person.id === "shikhar-dixit"
          ? "Shikhar Dixit — Founder & CEO | DIMISI Technologies Private Limited"
          : isFounder
            ? `${person.name} — Co-Founder & Executive Leadership | DIMISI Technologies`
            : `${person.name} — ${person.subtitle || "DIMISI Technologies"}`;

      const caption = isMentor
        ? "Official photograph of Jayendra Pratap Singh (JP), First Mentor of DIMISI Technologies Private Limited"
        : person.id === "shikhar-dixit"
          ? "Official executive photograph of Shikhar Dixit, Founder and Chief Executive Officer of DIMISI Technologies Private Limited"
          : isFounder
            ? `Official photograph of ${person.name}, Founding Director and Executive Leadership at DIMISI Technologies Private Limited`
            : `Official portrait of ${person.name} — DIMISI Technologies`;

      entries.push({
        loc: abs(person.path),
        lastmod: person.updatedAt,
        images: [
          {
            loc: abs(person.image),
            title,
            caption,
            geoLocation: GEO_KANPUR,
            license: LICENSE_URL,
          },
        ],
      });
    }
  }

  // Projects with images
  for (const proj of projectEntities) {
    if (proj.image) {
      entries.push({
        loc: abs(proj.path),
        lastmod: proj.updatedAt,
        images: [
          {
            loc: abs(proj.image),
            title: `${proj.name} — ${proj.subtitle || "DIMISI Technologies Project"}`,
            caption: `${proj.name} official software mark and application overview`,
            geoLocation: GEO_KANPUR,
            license: LICENSE_URL,
          },
        ],
      });
    }
  }

  // Published articles with cover images
  for (const article of publishedArticles) {
    if (article.coverImage) {
      entries.push({
        loc: abs(articlePath(article)),
        lastmod: article.dateModified,
        images: [
          {
            loc: abs(article.coverImage),
            title: article.title,
            caption: article.excerpt,
            geoLocation: GEO_KANPUR,
            license: LICENSE_URL,
          },
        ],
      });
    }
  }

  return entries;
}

/** Computes the maximum (latest) lastmod from an array of entries */
function maxLastmod(entries: { lastmod?: string }[]): string {
  const dates = entries
    .map((e) => e.lastmod)
    .filter((d): d is string => Boolean(d))
    .sort();
  return dates.pop() || "2026-10-20";
}

/* ------------------------------------------------------------------ */
/* XML STRING PRODUCERS                                               */
/* ------------------------------------------------------------------ */

export function generatePagesSitemapXml(): string {
  return renderUrlset(getPagesEntries());
}

export function generatePeopleSitemapXml(): string {
  return renderUrlset(getPeopleEntries());
}

export function generateOrganizationsSitemapXml(): string {
  return renderUrlset(getOrganizationsEntries());
}

export function generateProjectsSitemapXml(): string {
  return renderUrlset(getProjectsEntries());
}

export function generateTechnologySitemapXml(): string {
  return renderUrlset(getTechnologyEntries());
}

export function generateArticlesSitemapXml(): string {
  return renderUrlset(getArticlesEntries());
}

export function generateEventsSitemapXml(): string {
  return renderUrlset(getEventsEntries());
}

export function generateTimelineSitemapXml(): string {
  return renderUrlset(getTimelineEntries());
}

export function generateImagesSitemapXml(): string {
  return renderImageUrlset(getImagesEntries());
}

export function generateSitemapIndexXml(): string {
  const pages = getPagesEntries();
  const people = getPeopleEntries();
  const orgs = getOrganizationsEntries();
  const projects = getProjectsEntries();
  const tech = getTechnologyEntries();
  const articles = getArticlesEntries();
  const events = getEventsEntries();
  const timelineEntries = getTimelineEntries();
  const images = getImagesEntries();

  const childSitemaps = [
    { loc: abs("/sitemap-pages.xml"), lastmod: maxLastmod(pages) },
    { loc: abs("/sitemap-people.xml"), lastmod: maxLastmod(people) },
    { loc: abs("/sitemap-organizations.xml"), lastmod: maxLastmod(orgs) },
    { loc: abs("/sitemap-projects.xml"), lastmod: maxLastmod(projects) },
    { loc: abs("/sitemap-technology.xml"), lastmod: maxLastmod(tech) },
    { loc: abs("/sitemap-articles.xml"), lastmod: maxLastmod(articles) },
    { loc: abs("/sitemap-events.xml"), lastmod: maxLastmod(events) },
    { loc: abs("/sitemap-timeline.xml"), lastmod: maxLastmod(timelineEntries) },
    { loc: abs("/sitemap-images.xml"), lastmod: maxLastmod(images) },
  ];

  return renderSitemapIndex(childSitemaps);
}
