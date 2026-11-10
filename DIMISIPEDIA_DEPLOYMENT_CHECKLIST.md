# DIMISIPEDIA 2.0 — Production Deployment & Release Checklist

**Version:** 2.0.0-PROD  
**Organization:** DIMISI Technologies Private Limited  
**Target Domain:** https://dimisipedia.me  
**Hosting Architecture:** Cloudflare Workers / Cloudflare Pages via Nitro Engine  
**Release Lead:** Senior Software Architect & Platform Lead  
**Last Updated:** November 2026  

---

## 1. Executive Overview

This checklist defines the mandatory operational procedures, validation gates, and rollback plans required to deploy **DIMISIPEDIA 2.0** to production. DIMISIPEDIA is the machine-readable canonical knowledge platform for DIMISI Technologies Private Limited, Founder & CEO Shikhar Dixit, its products, projects, team members, and official achievements.

---

## 2. Pre-Deployment Quality Gates

Every item in this section must pass before building or promoting code to `origin/main`.

| Gate | Check Item | Verification Command / Target | Status |
| :--- | :--- | :--- | :--- |
| **G-01** | TypeScript compilation & type safety | `npm run build` (tsc pass) | [x] PASSED |
| **G-02** | Code linting and style enforcement | `npm run lint` & `npm run format` | [x] PASSED |
| **G-03** | Route tree synchronization | Automatic via TanStack Router plugin | [x] PASSED |
| **G-04** | Sitemap & XML schema verification | `npm run test:sitemaps` (79/79 URLs) | [x] PASSED |
| **G-05** | Knowledge Graph integrity check | `npx vite-node scripts/comprehensive-qa-audit.ts` | [x] PASSED |
| **G-06** | Relationship deduplication verification | `0 duplicate / 0 broken relationships` | [x] PASSED |
| **G-07** | Privacy enforcement (DOB / age suppression) | Verified in `seo.ts`, `knowledge-api.ts` | [x] PASSED |
| **G-08** | Editorial priority compliance (`AGENTS.md`) | Shikhar Dixit confirmed primary CEO entity | [x] PASSED |
| **G-09** | Schema.org JSON-LD structural check | 100% Graph pass rate in `/admin` & audit | [x] PASSED |
| **G-10** | Event dynamic routing (`/events/$slug`) | 8 verified canonical event routes active | [x] PASSED |

---

## 3. Production Build & Artifact Verification

### 3.1 Build Execution
Run the production build command:
```bash
npm run build
```

### 3.2 Output Verification
Verify the generated output directories:
- `.output/public/`: Static client bundles, compiled CSS, images, pre-rendered pages, and public assets:
  - `public/knowledge.json` (Canonical knowledge graph payload, ~60KB)
  - `public/sitemap.xml` (Index sitemap referencing all sub-sitemaps)
  - `public/sitemap-people.xml` (15 entities)
  - `public/sitemap-organizations.xml` (1 entity)
  - `public/sitemap-products.xml` (6 entities)
  - `public/sitemap-projects.xml` (4 entities)
  - `public/sitemap-services.xml` (7 entities)
  - `public/sitemap-events.xml` (8 entities)
  - `public/sitemap-technologies.xml` (15 entities)
  - `public/sitemap-pages.xml` (13 core pages)
  - `public/robots.txt` (Comprehensive crawler directives)
  - `public/llms.txt` & `public/llms-full.txt` (AI system instruction files)
- `.output/server/`: Serverless Nitro entrypoint:
  - `index.mjs` (Cloudflare Worker runtime handler for SSR and API routes)
- `wrangler.json`: Configuration for Cloudflare Pages/Workers runtime.

---

## 4. Deployment Instructions

### Method A: Git CI/CD Push (Recommended)
Pushing to `origin/main` automatically triggers deployment hooks on Lovable and Cloudflare Pages:
```bash
git add .
git commit -m "feat(dimisipedia-2.0): comprehensive QA audit, bug fixes 001-010, event routes, privacy hardening, and platform deliverables"
git push origin main
```

### Method B: Cloudflare Direct Deployment (Nitro Prebuilt)
To deploy directly via Nitro Cloudflare integration:
```bash
npx nitro deploy --prebuilt
```

### Method C: Cloudflare Wrangler CLI
```bash
npx wrangler pages deploy .output/public --project-name dimisipedia
# Or worker-based deployment:
npx wrangler deploy
```

---

## 5. Post-Deployment Smoke Test Protocol

Immediately after deployment to `https://dimisipedia.me`, execute live HTTP status and content checks against the following endpoints:

### 5.1 Critical Web Routes (HTTP 200 OK)
- [ ] `https://dimisipedia.me/` (Landing & Systems Registry)
- [ ] `https://dimisipedia.me/people/shikhar-dixit` (Founder & CEO canonical profile)
- [ ] `https://dimisipedia.me/organizations/dimisi-technologies` (Company profile)
- [ ] `https://dimisipedia.me/products/kalesh` (Flagship product profile)
- [ ] `https://dimisipedia.me/products/kaand` (Product profile)
- [ ] `https://dimisipedia.me/products/cati-khelghar` (Product profile)
- [ ] `https://dimisipedia.me/products/dimisi-ops` (Product profile)
- [ ] `https://dimisipedia.me/events` (Events Directory)
- [ ] `https://dimisipedia.me/events/iit-kanpur-siic-avinya-2026` (Avinya 2026 Achievement)
- [ ] `https://dimisipedia.me/events/team-id-cards-ceremony` (Team ID Ceremony)
- [ ] `https://dimisipedia.me/events/dimisi-foundation-day-2026` (Foundation Day)
- [ ] `https://dimisipedia.me/explore` (Dynamic Knowledge Browser across 7 domains)
- [ ] `https://dimisipedia.me/ai-knowledge` (AI Knowledge Hub & Assistant FAQ)
- [ ] `https://dimisipedia.me/admin` (Knowledge Dashboard & Schema Validator)

### 5.2 API & Machine-Readable Endpoints (HTTP 200 OK & Valid JSON)
- [ ] `https://dimisipedia.me/knowledge.json` (Valid JSON array of entities & graph)
- [ ] `https://dimisipedia.me/api/v1/knowledge/entities?limit=10` (Pagination & entities)
- [ ] `https://dimisipedia.me/api/v1/knowledge/entity/shikhar-dixit` (Single entity payload)
- [ ] `https://dimisipedia.me/api/v1/knowledge/events` (All 8 events returned)
- [ ] `https://dimisipedia.me/api/v1/knowledge/search?q=Shikhar` (Search API functional)
- [ ] `https://dimisipedia.me/api/v1/knowledge/people` (15 people records)

### 5.3 SEO & AI Crawler Endpoints
- [ ] `https://dimisipedia.me/robots.txt` (Allows GPTBot, PerplexityBot, Applebot, Googlebot)
- [ ] `https://dimisipedia.me/sitemap.xml` (Valid XML with 8 child sitemaps)
- [ ] `https://dimisipedia.me/sitemap-events.xml` (Contains 8 event URLs)
- [ ] `https://dimisipedia.me/llms.txt` (Clean markdown for LLM ingestion)
- [ ] `https://dimisipedia.me/llms-full.txt` (Comprehensive context dump)

---

## 6. Search Engine & AI Assistant Discovery Submissions

To expedite indexing across Google, Bing, Apple Siri, and AI answer engines:

### 6.1 Google Search Console
1. Log in to [Google Search Console](https://search.google.com/search-console).
2. Select property `https://dimisipedia.me`.
3. Navigate to **Sitemaps** in the left sidebar.
4. Submit `https://dimisipedia.me/sitemap.xml`.
5. Run URL Inspection for `https://dimisipedia.me/people/shikhar-dixit` and `https://dimisipedia.me/events/iit-kanpur-siic-avinya-2026` and click **Request Indexing**.

### 6.2 Bing Webmaster Tools & IndexNow
1. Log in to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Ensure `https://dimisipedia.me/sitemap.xml` is submitted.
3. Automated IndexNow Submission:
   Send an HTTP POST request to submit newly updated URLs to Bing and Yandex simultaneously:
   ```http
   POST https://api.indexnow.org/indexnow
   Content-Type: application/json; charset=utf-8

   {
     "host": "dimisipedia.me",
     "key": "dimisi-indexnow-key",
     "urlList": [
       "https://dimisipedia.me/",
       "https://dimisipedia.me/people/shikhar-dixit",
       "https://dimisipedia.me/organizations/dimisi-technologies",
       "https://dimisipedia.me/products/kalesh",
       "https://dimisipedia.me/events/iit-kanpur-siic-avinya-2026",
       "https://dimisipedia.me/events/team-id-cards-ceremony",
       "https://dimisipedia.me/events/dimisi-foundation-day-2026",
       "https://dimisipedia.me/ai-knowledge",
       "https://dimisipedia.me/knowledge.json"
     ]
   }
   ```

### 6.3 AI Bots Crawling Verification
Verify `robots.txt` explicitly allows legitimate AI indexing crawlers:
- **OpenAI:** `GPTBot`, `ChatGPT-User`
- **Apple:** `Applebot`, `Applebot-Extended` (Powers Siri & Apple Intelligence)
- **Perplexity:** `PerplexityBot`
- **Anthropic:** `ClaudeBot`, `anthropic-ai`
- **Amazon:** `Amazonbot` (Powers Alexa answer index)
- **Google:** `Googlebot`, `Google-Extended`

---

## 7. Rollback & Emergency Recovery Protocol

In the event of a production regression, follow this stepped procedure:

### 7.1 Instant Rollback via Cloudflare Dashboard
1. Log in to the Cloudflare Dashboard (`dash.cloudflare.com`).
2. Navigate to **Workers & Pages** > `dimisipedia`.
3. Under **Deployments**, locate the last known healthy deployment ID.
4. Click **Manage** > **Rollback to this deployment**.
5. Propagation time: < 30 seconds worldwide.

### 7.2 Git Revert (Clean History Preserving)
Under the Lovable guidelines, **never rebase or force push**. Use a standard `git revert` commit:
```bash
# Revert the latest commit cleanly
git revert HEAD --no-edit
git push origin main
```

### 7.3 Emergency Contact & Incident Log
- **Platform Incident Lead:** Senior Platform Engineer
- **Executive Contact:** Shikhar Dixit, Founder & CEO (`shikhardixit@dimisi.tech`)
- **Support Operations:** `support@dimisi.tech`
