/**
 * RSS 2.0 and Atom Feed Generator for DIMISIPEDIA
 *
 * Generates standards-compliant XML feeds for Google Publisher Center,
 * Google Discover, Google News, feed readers, and AI aggregators.
 */

import { publishedArticles, resolveAuthor, articlePath } from "@/data/articles";
import { abs, SITE_URL } from "@/lib/seo";
import { escapeXml } from "@/lib/sitemap";

export function generateRssFeedXml(): string {
  const lastBuildDate = publishedArticles[0]?.dateModified
    ? new Date(publishedArticles[0].dateModified).toUTCString()
    : new Date().toUTCString();

  const items = publishedArticles.map((article) => {
    const author = resolveAuthor(article.authorId);
    const url = abs(articlePath(article));
    const pubDate = new Date(article.datePublished).toUTCString();
    const coverUrl = article.coverImage ? abs(article.coverImage) : null;

    return [
      `    <item>`,
      `      <title>${escapeXml(article.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${pubDate}</pubDate>`,
      `      <dc:creator>${escapeXml(author.name)}</dc:creator>`,
      `      <category>${escapeXml(article.category)}</category>`,
      `      <description>${escapeXml(article.excerpt)}</description>`,
      coverUrl
        ? `      <enclosure url="${escapeXml(coverUrl)}" type="image/png" length="102400" />`
        : null,
      `    </item>`,
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">`,
    `  <channel>`,
    `    <title>DIMISIPEDIA Official Blog &amp; Knowledge Feed</title>`,
    `    <link>${SITE_URL}/blog</link>`,
    `    <description>Authoritative insights on enterprise software engineering, architecture, and technology from DIMISI Technologies Pvt. Ltd., authored by Shikhar Dixit and the leadership team.</description>`,
    `    <language>en</language>`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    `    <image>`,
    `      <url>${SITE_URL}/images/dimisipedia-logo.png</url>`,
    `      <title>DIMISIPEDIA</title>`,
    `      <link>${SITE_URL}/blog</link>`,
    `    </image>`,
    ...items,
    `  </channel>`,
    `</rss>`,
  ].join("\n");
}
