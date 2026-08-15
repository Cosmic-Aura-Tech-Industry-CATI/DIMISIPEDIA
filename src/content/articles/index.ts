/**
 * Manual article registry.
 *
 * WORKFLOW (no CMS, no admin panel, no login):
 *   1. Create a file in this folder exporting `const article: Article`.
 *   2. Import it below and add it to `articleRegistry`.
 *   3. Commit and push — deployment publishes it.
 *
 * Set `status: "draft"` to keep an article out of the sitemap and mark it
 * noindex. Draft URLs still render so you can preview them.
 */
import type { Article } from "@/data/articles";

import { article as verification } from "./how-dimisipedia-verifies-information";
import { article as kaleshTechnology } from "./kalesh-technology-stack";

export const articleRegistry: Article[] = [verification, kaleshTechnology];
