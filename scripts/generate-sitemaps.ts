import fs from "node:fs";
import path from "node:path";
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

const files: Record<string, string> = {
  "sitemap.xml": generateSitemapIndexXml(),
  "sitemap-pages.xml": generatePagesSitemapXml(),
  "sitemap-people.xml": generatePeopleSitemapXml(),
  "sitemap-organizations.xml": generateOrganizationsSitemapXml(),
  "sitemap-projects.xml": generateProjectsSitemapXml(),
  "sitemap-technology.xml": generateTechnologySitemapXml(),
  "sitemap-articles.xml": generateArticlesSitemapXml(),
  "sitemap-events.xml": generateEventsSitemapXml(),
  "sitemap-timeline.xml": generateTimelineSitemapXml(),
  "sitemap-images.xml": generateImagesSitemapXml(),
};

console.log("Generating enterprise XML sitemaps to public/...");
for (const [filename, content] of Object.entries(files)) {
  const filePath = path.join(publicDir, filename);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✓ ${filename} (${Buffer.byteLength(content, "utf8")} bytes)`);
}
console.log("All enterprise sitemaps generated successfully!");
