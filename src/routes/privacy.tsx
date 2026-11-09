import { buildBreadcrumbSchema, pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/EntityArticle";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy | DIMISIPEDIA",
      description:
        "How DIMISIPEDIA, operated by DIMISI Technologies Pvt. Ltd., handles visitor information.",
      path: "/privacy",
      schema: [
        buildBreadcrumbSchema(
          [{ label: "DIMISIPEDIA", to: "/" }, { label: "Privacy" }],
          "/privacy",
        ),
      ],
    }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Breadcrumbs trail={[{ label: "DIMISIPEDIA", to: "/" }, { label: "Privacy" }]} />
      <h1 className="mt-6 text-4xl">Privacy</h1>
      <div className="prose-editorial mt-6">
        <p>
          DIMISIPEDIA is a public informational repository operated by DIMISI Technologies Pvt. Ltd.
          (CIN: U62013UP2026PTC246506). The platform provides free public access to corporate
          records, leadership profiles, and technological documentation.
        </p>
        <h2 className="mt-6 text-xl">No Account or Credential Harvesting</h2>
        <p>
          DIMISIPEDIA does not require user registration or logins. We do not prompt visitors for
          usernames, passwords, phone numbers, payment details, or personal identifiable information
          (PII). We do not host deceptive downloads, ads, third-party marketing trackers, or
          credential harvesting mechanisms.
        </p>
        <h2 className="mt-6 text-xl">Data Storage &amp; Cookies</h2>
        <p>
          DIMISIPEDIA stores light, non-tracking client-side preferences (such as your chosen light
          or dark color theme) strictly in your local browser storage. No session profiling,
          cross-site tracking, or behavioral advertising cookies are used.
        </p>
        <h2 className="mt-6 text-xl">Contact &amp; Inquiries</h2>
        <p>
          Privacy-related questions or data protection queries can be directed to DIMISI
          Technologies at{" "}
          <a href="mailto:contact@dimisi.tech" className="text-primary hover:underline">
            contact@dimisi.tech
          </a>{" "}
          or through our corporate portal at{" "}
          <a href="https://dimisi.tech" target="_blank" rel="noreferrer noopener">
            dimisi.tech
          </a>
          .
        </p>
      </div>
    </div>
  );
}
