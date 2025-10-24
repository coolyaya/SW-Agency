import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, Sparkles } from "lucide-react";

import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact SW Talents",
  description:
    "Connect with SW Talents to brief a campaign, request a creator shortlist, or inquire about representation.",
  path: "/contact",
});

const CONTACT_EMAIL = "swtalents.contact@gmail.com";

export default function ContactPage() {
  return (
    <div className="pb-24 pt-16">
      <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <section aria-labelledby="contact-info" className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            <Sparkles className="h-4 w-4" aria-hidden />
            Partnerships desk
          </span>
          <h1 id="contact-info" className="text-4xl font-semibold tracking-tight text-balance">
            Share your campaign brief or request representation.
          </h1>
          <p className="text-lg text-muted-foreground">
            Email our partnerships desk to access current availability, rates, and creative recommendations. We respond
            within two business days.
          </p>
          <Card className="max-w-xl border-border/70">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Primary contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
                >
                  Email
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/60 px-4 py-3">
                  <Mail className="h-5 w-5 text-primary" aria-hidden />
                  <code id="contact-email" className="select-all text-sm font-semibold text-foreground">
                    {CONTACT_EMAIL}
                  </code>
                  <CopyButton value={CONTACT_EMAIL} />
                </div>
              </div>
              <Button size="lg" className="w-full" asChild>
                <Link href={`mailto:${CONTACT_EMAIL}`}>Open mail app</Link>
              </Button>
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Brands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Campaign briefs (timing, budget, deliverables)</p>
                <p>• Talent shortlist and availability requests</p>
                <p>• Rights, paid amplification, and FTC compliance support</p>
              </CardContent>
            </Card>
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle>Creators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Representation interest (referral-based)</p>
                <p>• Production and legal inquiries for current clients</p>
                <p>• Speaking and media opportunities</p>
              </CardContent>
            </Card>
          </div>
        </section>
        <aside className="space-y-6 rounded-3xl border border-border/70 bg-muted/40 p-8">
          <h2 className="text-xl font-semibold tracking-tight">Headquarters</h2>
          <p className="text-sm text-muted-foreground">
            SW Talents<br />
            3104 Poppyseed Court<br />
            Orlando, FL 32826
          </p>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" aria-hidden />
              +1 (571) 340-4479
            </p>
            <p>
              Talent availability hours:<br />
              <strong className="font-medium text-foreground">Monday – Friday, 10am to 9pm ET</strong>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
