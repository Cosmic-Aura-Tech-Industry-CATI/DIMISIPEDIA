import fs from "node:fs";
import path from "node:path";
import { DOMParser } from "@xmldom/xmldom"; // If available or parse manually
import {
  generateSitemapIndexXml,
  generatePagesSitemapXml,
  generatePeopleSitemapXml,
  generateOrganizationsSitemapXml,
  generateProjectsSitemapXml,
  generateTechnologySitemapXml,
  generateArticlesSitemapXml,
  generateEventsSitemapXml,
  generateTimelineSitemapXml,
  generateImagesSitemapXml,
} from "../src/lib/sitemap";

const publicDir = path.resolve(process.cwd(), "public");

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, name: string, failureMsg: string) {
  if (condition) {
    results.push({ name, passed: true, message: "OK" });
  } else {
    results.push({ name, passed: false, message: failureMsg });
  }
}

console.log("=== RUNNING ENTERPRISE SITEMAP & SEO VERIFICATION ===");

// 1. Verify files exist in public/
const expectedFiles = [
  "sitemap.xml",
  "sitemap-pages.xml",
  "sitemap-people.xml",
  "sitemap-organizations.xml",
  "sitemap-projects.xml",
  "sitemap-technology.xml",
  "sitemap-articles.xml",
  "sitemap-events.xml",
  "sitemap-timeline.xml",
  "sitemap-images.xml",
  "robots.txt",
];

for (const f of expectedFiles) {
  const exists = fs.existsSync(path.join(publicDir, f));
  assert(exists, `File exists: ${f}`, `File ${f} is missing in public/`);
}

// 2. Validate Sitemap Index XML
const indexXml = fs.readFileSync(path.join(publicDir, "sitemap.xml"), "utf8");
assert(
  indexXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'),
  "Sitemap Index XML Declaration",
  "Missing XML declaration",
);
assert(
  indexXml.includes('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'),
  "Sitemap Index Namespace",
  "Invalid sitemapindex namespace",
);
assert(
  indexXml.endsWith("</sitemapindex>"),
  "Sitemap Index Closing Tag",
  "Missing </sitemapindex>",
);

const childLocs = [...indexXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);
assert(
  childLocs.length === 9,
  "Child Sitemaps Count in Index",
  `Expected 9 child sitemaps, got ${childLocs.length}`,
);

// 3. Verify All URLs are HTTPS and Absolute
const allChildFiles = expectedFiles.filter((f) => f.startsWith("sitemap-") && f.endsWith(".xml"));
const allDiscoveredUrls = new Set<string>();
const duplicates: string[] = [];

for (const childFile of allChildFiles) {
  const content = fs.readFileSync(path.join(publicDir, childFile), "utf8");
  assert(
    content.startsWith('<?xml version="1.0" encoding="UTF-8"?>'),
    `${childFile} XML Declaration`,
    "Missing XML declaration",
  );
  assert(
    content.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
    `${childFile} Namespace`,
    "Invalid urlset namespace",
  );
  assert(content.endsWith("</urlset>"), `${childFile} Closing Tag`, "Missing </urlset>");

  const locs = [...content.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);

  // Check each URL is HTTPS and domain matches
  for (const loc of locs) {
    if (!loc.startsWith("https://www.dimisipedia.me/")) {
      assert(false, `Canonical Host for ${loc}`, `URL ${loc} is not HTTPS www.dimisipedia.me`);
    }

    if (childFile !== "sitemap-images.xml") {
      if (allDiscoveredUrls.has(loc)) {
        duplicates.push(loc);
      }
      allDiscoveredUrls.add(loc);
    }
  }
}

assert(
  duplicates.length === 0,
  "No Duplicate URLs Across Page Sitemaps",
  `Found duplicates: ${duplicates.join(", ")}`,
);

// 4. Verify Exclusion of Non-Canonical / Redirect / Noindex URLs
const excludedUrls = [
  "https://www.dimisipedia.me/search",
  "https://www.dimisipedia.me/seo-audit",
  "https://www.dimisipedia.me/offline",
  "https://www.dimisipedia.me/publications",
  "https://www.dimisipedia.me/organizations/dimisi-technologies",
  "https://www.dimisipedia.me/articles/kalesh-technology-stack", // Draft article
];

for (const ex of excludedUrls) {
  assert(
    !allDiscoveredUrls.has(ex),
    `Excluded URL not in sitemap: ${ex}`,
    `Non-canonical/noindex/draft URL found in sitemap: ${ex}`,
  );
}

// 5. Verify Shikhar Dixit Entity Priority
const peopleXml = fs.readFileSync(path.join(publicDir, "sitemap-people.xml"), "utf8");
const firstPersonLocMatch = peopleXml.match(/<loc>(https:\/\/[^<]+)<\/loc>/);
const firstPersonLoc = firstPersonLocMatch ? firstPersonLocMatch[1] : "";
assert(
  firstPersonLoc === "https://www.dimisipedia.me/people/shikhar-dixit",
  "Shikhar Dixit Priority as First Entity in People Sitemap",
  `First person in sitemap is ${firstPersonLoc}, expected https://www.dimisipedia.me/people/shikhar-dixit`,
);

// 6. Verify Robots.txt
const robotsTxt = fs.readFileSync(path.join(publicDir, "robots.txt"), "utf8");
assert(
  robotsTxt.includes("Sitemap: https://www.dimisipedia.me/sitemap.xml"),
  "Robots.txt references sitemap.xml",
  "Missing sitemap index directive",
);
assert(
  robotsTxt.includes("Disallow: /search"),
  "Robots.txt disallows /search",
  "Missing /search disallow",
);
assert(
  robotsTxt.includes("Disallow: /seo-audit"),
  "Robots.txt disallows /seo-audit",
  "Missing /seo-audit disallow",
);
assert(
  robotsTxt.includes("Disallow: /api/"),
  "Robots.txt disallows /api/",
  "Missing /api/ disallow",
);
assert(
  robotsTxt.includes("User-agent: Googlebot"),
  "Robots.txt allows Googlebot",
  "Missing Googlebot block",
);
assert(
  robotsTxt.includes("User-agent: GPTBot"),
  "Robots.txt allows GPTBot",
  "Missing GPTBot block",
);

// 7. Verify Date Formatting (YYYY-MM-DD or W3C ISO 8601 with offset)
const lastmodMatches = [...indexXml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
for (const lm of lastmodMatches) {
  assert(
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\+05:30|Z)?)?$/.test(lm),
    `Valid W3C lastmod: ${lm}`,
    `Invalid lastmod format: ${lm}`,
  );
}

// 7b. Verify XSL Stylesheet instruction
assert(
  indexXml.includes('<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>'),
  "Sitemap Index has XSL Stylesheet (Visual Presentation)",
  "Missing <?xml-stylesheet ...?> instruction",
);

// 8. Total Canonical URL count
assert(
  allDiscoveredUrls.size >= 60,
  `Total canonical pages >= 60 (Actual: ${allDiscoveredUrls.size})`,
  `Too few URLs: ${allDiscoveredUrls.size}`,
);

// Print Report
console.log("\n=== TEST RESULTS SUMMARY ===");
let passedCount = 0;
let failedCount = 0;
for (const r of results) {
  if (r.passed) {
    passedCount++;
    console.log(`[PASS] ${r.name}`);
  } else {
    failedCount++;
    console.error(`[FAIL] ${r.name}: ${r.message}`);
  }
}

console.log(`\nTOTAL: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
if (failedCount > 0) process.exit(1);
