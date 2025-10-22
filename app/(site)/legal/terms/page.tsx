import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "SW Talents Terms of Service outlining use of the site, talent engagements, limitations of liability, and governing law.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <div className="pb-24 pt-16">
      <div className="container prose prose-neutral max-w-3xl dark:prose-invert">
        <h1>Terms of Service</h1>
        <p>Effective date: 01 October 2024</p>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of sw-entertainment.com (the
          &quot;Site&quot;) operated by SW Talents (&quot;SW Talents,&quot; &quot;we,&quot; &quot;our&quot;). By
          accessing the Site, you agree to be bound by these Terms.
        </p>

        <h2>1. Site use</h2>
        <ul>
          <li>The Site is provided for informational purposes regarding our talent roster and services.</li>
          <li>
            You agree not to misuse the Site, interfere with its operation, or attempt to access data you are not authorized
            to view.
          </li>
          <li>
            We may update, suspend, or discontinue any part of the Site at any time without notice, including the availability
            of specific creators or materials.
          </li>
        </ul>

        <h2>2. No solicitation guarantee</h2>
        <p>
          Creator profiles, performance data, and related materials are provided exclusively to evaluate opportunities with SW
          Entertainment. You agree not to approach, solicit, or contract directly with creators featured on the Site without
          our express written consent.
        </p>

        <h2>3. Creator profile accuracy</h2>
        <p>
          We strive to present accurate, up-to-date information about the creators we represent. However, performance metrics
          and availability change frequently. All data on the Site is provided &quot;as is.&quot; Any campaign commitments
          must be confirmed in writing through an executed statement of work or talent agreement.
        </p>

        <h2>4. Third-party links</h2>
        <p>
          The Site may include links to third-party platforms (e.g., TikTok, Instagram) for reference. We do not control or
          endorse those sites and are not responsible for their content, policies, or availability.
        </p>

        <h2>5. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, SW Talents and its directors, officers, employees, and agents will not
          be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or
          revenues arising out of your access to or use of the Site.
        </p>

        <h2>6. Indemnity</h2>
        <p>
          You agree to indemnify and hold SW Talents harmless from and against any claims, liabilities, damages, losses,
          and expenses (including reasonable legal fees) arising from your violation of these Terms or misuse of the Site.
        </p>

        <h2>7. Intellectual property</h2>
        <p>
          The Site and its contents, including text, graphics, logos, and images, are owned by SW Talents or used with
          permission. You may not reproduce, distribute, or create derivative works without prior written consent.
        </p>

        <h2>8. Governing law</h2>
        <p>
          These Terms are governed by the laws of [Insert Governing Jurisdiction], without regard to its conflict of law
          principles. Any disputes will be resolved exclusively in the courts located in [Insert Governing Jurisdiction].
        </p>

        <h2>9. Updates</h2>
        <p>
          We may revise these Terms periodically. The &quot;Effective date&quot; will indicate the latest revision. Continued
          use of the Site after updates constitutes acceptance of the revised Terms.
        </p>

        <h2>10. Contact</h2>
        <p>
          For questions about these Terms, contact us at swtalents.contact@gmail.com or by mail at the address listed in our Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}
