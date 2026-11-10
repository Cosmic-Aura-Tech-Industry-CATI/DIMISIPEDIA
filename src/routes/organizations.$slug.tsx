import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { EntityArticle } from "@/components/EntityArticle";
import { FoundingLeadership } from "@/components/FoundingLeadership";
import { organizationEntity as org } from "@/data/knowledge";
import { entityHead } from "@/lib/seo";

const trail = [
  { label: "DIMISIPEDIA", to: "/" },
  { label: "Organizations", to: "/organizations" },
  { label: "DIMISI Technologies" },
];

export const Route = createFileRoute("/organizations/$slug")({
  beforeLoad: ({ params }) => {
    if (params.slug === "$slug" || params.slug.startsWith("$")) {
      throw redirect({ to: "/organizations", statusCode: 301 });
    }
    if (params.slug !== org.slug) {
      throw notFound();
    }
  },
  head: () => entityHead(org, trail),
  component: () => (
    <EntityArticle entity={org} trail={trail}>
      <FoundingLeadership />
    </EntityArticle>
  ),
});
