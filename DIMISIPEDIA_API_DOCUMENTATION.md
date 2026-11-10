# DIMISIPEDIA 2.0 — Public AI Knowledge API Documentation

**API Version:** 2.0.0  
**Base URL:** `https://www.dimisipedia.me`  
**Protocol:** HTTPS  
**Format:** JSON-LD / Schema.org compliant JSON  
**Access:** Open / Public Read-Only  
**Cache Policy:** `public, max-age=3600, s-maxage=86400`  
**CORS Policy:** `Access-Control-Allow-Origin: *`  

---

## 1. Overview & Purpose

The DIMISIPEDIA Public AI Knowledge API provides structured, verified, machine-readable data designed for direct ingestion by:
- AI Assistants (ChatGPT, Microsoft Copilot, Perplexity, Gemini, Claude)
- Voice Engines (Amazon Alexa, Apple Siri & Apple Intelligence, Google Assistant)
- Search Engine Knowledge Graphs & Web Crawlers

---

## 2. Common Standards & Headers

### Response Headers
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Cache-Control: public, max-age=3600, s-maxage=86400
X-Content-Type-Options: nosniff
```

### Standard Error Schema
```json
{
  "@context": "https://schema.org",
  "status": 400,
  "error": "BadRequestError",
  "message": "Invalid 'limit' parameter: must be an integer between 1 and 100",
  "timestamp": "2026-11-11T01:42:00.000Z"
}
```

---

## 3. Endpoints Reference

### 3.1 All Entities Catalog
- **Endpoint:** `GET /api/v1/knowledge/entities`
- **Description:** Returns paginated list of all verified entities in the DIMISIPEDIA knowledge graph. Prioritizes Shikhar Dixit (Founder & CEO) as apex entity #1.
- **Query Parameters:**
  - `page` (integer, optional, default: `1`, min: `1`): Target page.
  - `limit` (integer, optional, default: `50`, min: `1`, max: `100`): Results per page.
- **Example Request:**
  ```http
  GET /api/v1/knowledge/entities?page=1&limit=20 HTTP/1.1
  Host: www.dimisipedia.me
  ```
- **Example Response:**
  ```json
  {
    "@context": "https://schema.org",
    "platform": "DIMISIPEDIA 2.0 Knowledge Engine",
    "apexOrganization": {
      "name": "DIMISI Technologies Private Limited",
      "founder": "Shikhar Dixit (Founder & CEO)",
      "canonicalUrl": "https://www.dimisipedia.me/organizations/dimisi-technologies"
    },
    "total": 56,
    "page": 1,
    "limit": 20,
    "totalPages": 3,
    "count": 20,
    "results": [ ... ]
  }
  ```

---

### 3.2 Single Entity by Slug or ID
- **Endpoint:** `GET /api/v1/knowledge/entity/:slug`
- **Description:** Retrieves detailed Schema.org node for a specific entity by canonical slug or ID (e.g. `shikhar-dixit`, `dimisi-technologies`, `kalesh`, `iit-kanpur-siic-avinya-2026`).
- **Example Request:**
  ```http
  GET /api/v1/knowledge/entity/shikhar-dixit HTTP/1.1
  Host: www.dimisipedia.me
  ```
- **Example Response:**
  ```json
  {
    "@context": "https://schema.org",
    "entity": {
      "@context": "https://schema.org",
      "@id": "https://www.dimisipedia.me/people/shikhar-dixit#person",
      "id": "shikhar-dixit",
      "slug": "shikhar-dixit",
      "canonicalUrl": "https://www.dimisipedia.me/people/shikhar-dixit",
      "name": "Shikhar Dixit",
      "alternateNames": ["Shikhar", "Dixit", "shikhar040"],
      "entityType": "person",
      "subtitle": "Founder & CEO · DIMISI Technologies",
      "shortDescription": "Indian technology entrepreneur and software engineer; Founder & Chief Executive Officer of DIMISI Technologies Private Limited...",
      "answer": "Shikhar Dixit is an Indian technology entrepreneur, software engineer, and the Founder & Chief Executive Officer (CEO) of DIMISI Technologies Private Limited...",
      "facts": [
        { "label": "Origin / Base", "value": "Kanpur, Uttar Pradesh, India" },
        { "label": "Nationality", "value": "Indian" },
        { "label": "Occupation", "value": "Technology entrepreneur, software architect, executive engineer" },
        { "label": "Organization", "value": "DIMISI Technologies Private Limited" },
        { "label": "Roles", "value": "Founder · CEO · Director · Principal Software Architect" }
      ],
      "relationships": [
        {
          "type": "Founder of",
          "targetId": "dimisi-technologies",
          "targetName": "DIMISI Technologies Private Limited",
          "targetType": "organization",
          "targetUrl": "https://www.dimisipedia.me/organizations/dimisi-technologies"
        }
      ],
      "sources": [ ... ]
    }
  }
  ```

---

### 3.3 Domain Specific Endpoints
All domain endpoints accept `page` and `limit` parameters:
- `GET /api/v1/knowledge/people`: Leadership and contributors (Shikhar Dixit prioritized first).
- `GET /api/v1/knowledge/organizations`: Corporate entity details (CIN, DPIIT, Incorporation).
- `GET /api/v1/knowledge/products`: Proprietary software products (Kalesh, KAAND, CATI Khelghar, DIMISI-OPS, KaryON, DIMISIPEDIA).
- `GET /api/v1/knowledge/projects`: Client & internal engineering initiatives.
- `GET /api/v1/knowledge/services`: Verified enterprise digital services (Web, Mobile, Cloud, AI, etc.).
- `GET /api/v1/knowledge/events`: Documented corporate milestones, summits, and hackathons.

---

### 3.4 Knowledge Search Engine
- **Endpoint:** `GET /api/v1/knowledge/search?q={query}`
- **Description:** Scored relevance search across all entity names, aliases, descriptions, subtitles, and factual answers. Automatically boosts Founder & CEO Shikhar Dixit on leadership and founder-related queries.
- **Query Parameters:**
  - `q` (string, required): Search keyword or question.
  - `page` (integer, optional, default: `1`).
  - `limit` (integer, optional, default: `20`, max: `100`).
- **Example Request:**
  ```http
  GET /api/v1/knowledge/search?q=founder HTTP/1.1
  Host: www.dimisipedia.me
  ```

---

### 3.5 Monolithic Machine Index (/knowledge.json)
- **Endpoint:** `GET /knowledge.json`
- **Description:** Static W3C DataFeed JSON-LD file containing the complete knowledge graph and metadata for offline ingestion or full-corpus AI training.
- **URL:** `https://www.dimisipedia.me/knowledge.json`
- **Size:** ~181 KB
