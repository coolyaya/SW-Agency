import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "SW Talents privacy policy covering data collection, cookies, lawful basis, retention, and user rights for talent and brand partners.",
  path: "/legal/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-24 pt-16">
      <div className="container prose prose-neutral max-w-3xl dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p>Effective date: 01 October 2024</p>
        <p>
          SW Talents (&quot;SW Talents,&quot; &quot;we,&quot; &quot;us&quot;) operates sw-entertainment.com (the
          &quot;Site&quot;) to showcase our creator roster and support brand partnerships. This Privacy Policy explains how we
          collect, use, and safeguard personal data.
        </p>

        <h2>1. Data we collect</h2>
        <ul>
          <li>
            <strong>Contact information:</strong> When you email us or otherwise engage, we collect your name, email address,
            role, company, and any additional context you provide.
          </li>
          <li>
            <strong>Site analytics:</strong> We use privacy-focused analytics to understand traffic patterns, page views,
            referrers, and device/browser information. Data is aggregated and anonymized.
          </li>
          <li>
            <strong>Creator materials:</strong> For talent we represent, we store bios, metrics, demographic breakdowns,
            media assets, and historical campaign data necessary to deliver our services.
          </li>
          <li>
            <strong>Operational records:</strong> Contracts, invoices, statements of work, and compliance documents exchanged
            with brands, creators, and suppliers.
          </li>
        </ul>

        <h2>2. How we use personal data</h2>
        <ul>
          <li>Respond to partnership requests and provide tailored creator recommendations.</li>
          <li>Manage creator relationships, including negotiation, scheduling, and deliverable tracking.</li>
          <li>Maintain legal, financial, and audit records in accordance with regulatory requirements.</li>
          <li>Improve the Site experience and develop new services based on usage insights.</li>
        </ul>

        <h2>3. Lawful basis for processing</h2>
        <ul>
          <li>
            <strong>Legitimate interests</strong> for serving and growing our talent agency business, including responding to
            inbound inquiries and marketing our roster.
          </li>
          <li>
            <strong>Contract performance</strong> when managing campaigns, issuing payments, or fulfilling other obligations
            with brand partners and creators.
          </li>
          <li>
            <strong>Legal compliance</strong> to meet advertising, labor, and financial regulations applicable to talent
            agencies across jurisdictions.
          </li>
        </ul>

        <h2>4. Cookies and tracking</h2>
        <p>
          We rely on first-party cookies or equivalent technologies solely to support essential Site functionality and
          aggregated analytics. We do not run third-party ad trackers or sell personal data. You can adjust browser settings to
          block cookies, though portions of the Site may not function as expected.
        </p>

        <h2>5. Data sharing</h2>
        <p>
          We only share personal data with third parties that enable us to operate the agency, such as:
        </p>
        <ul>
          <li>Secure cloud storage and productivity providers.</li>
          <li>Analytics and CRM tooling configured with contractual privacy protections.</li>
          <li>Legal, accounting, and compliance advisors bound by confidentiality obligations.</li>
        </ul>
        <p>
          Where data is transferred internationally, we implement safeguards such as standard contractual clauses or rely on
          adequacy decisions.
        </p>

        <h2>6. Data retention</h2>
        <p>
          We keep personal data only for as long as necessary: creator records and campaign documentation are retained while we
          have an active relationship plus up to seven (7) years for regulatory and audit purposes; inquiry emails are reviewed
          annually and removed when no longer relevant.
        </p>

        <h2>7. Your rights</h2>
        <p>
          Depending on your jurisdiction, you may have the right to access, correct, port, or delete personal data; restrict or
          object to processing; and lodge a complaint with a supervisory authority. To exercise your rights, contact our Data
          Protection Officer using the details below. We will respond within one month or faster where required by law.
        </p>

        <h2>8. Security</h2>
        <p>
          We maintain administrative, technical, and physical safeguards to protect personal data, including role-based access
          controls, encryption in transit and at rest, and staff training on data handling best practices.
        </p>

        <h2>9. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy periodically to reflect operational or legal developments. We will adjust the
          effective date above and, where material changes occur, provide prominent notice on the Site.
        </p>

        <h2>10. Contact</h2>
        <p>
          Data Protection Officer<br />
          SW Talents<br />
          [Insert Agency Address]<br />
          swtalents.contact@gmail.com
        </p>
      </div>
    </div>
  );
}
