import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";
import { getCreators } from "@/lib/creators";

export const metadata: Metadata = buildPageMetadata({
  title: "Social-first creators for category-leading brands",
  description:
    "SW Entertainment curates emerging and established TikTok & Instagram creators, matching them with brands ready to launch high-impact campaigns.",
  path: "/",
});

export default function HomePage() {
  const creators = getCreators().slice(0, 4);

  return (
    <div className="space-y-24 pb-24 pt-10 sm:pt-16">
      <section className="relative">
        <div className="container grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand">
              <Star className="h-3.5 w-3.5" aria-hidden />
              Social Talent Agency
            </span>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
              Premium creators trusted by brands to translate culture into measurable growth.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              SW Entertainment accelerates collaborations between social publishers and marketing
              teams. We broker authentic creator partnerships, deliver production oversight, and
              report on the impact that matters to your business.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/creators">
                  View creator roster <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link href="mailto:talent@sw-ent.com">
                  Contact SW Entertainment
                </Link>
              </Button>
            </div>
            <dl className="grid gap-6 sm:grid-cols-3">
              <StatItem label="Audience delivered" value="96M+" detail="qualified views in 2023" />
              <StatItem label="Campaign retention" value="87%" detail="brands return quarter over quarter" />
              <StatItem label="Global regions" value="12" detail="markets activated in the last year" />
            </dl>
          </div>
          <Card className="bg-card text-card-foreground border shadow-lg">
            <CardContent className="space-y-6 p-8">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Why brands choose SW Entertainment</h2>
                <p className="text-sm text-muted-foreground">
                  Dedicated campaign strategists and legal, casting, and performance analytics under one partner.
                </p>
              </div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand" aria-hidden />
                  Full funnel campaign design, from seeding to always-on ambassador programs.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand" aria-hidden />
                  360° reporting suite including post-purchase metrics and attribution-ready first-party tracking.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand" aria-hidden />
                  Talent development support to maintain compliance, creative quality, and audience trust.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="container space-y-24">
        <FeaturedCarousel creators={creators} />

        <section aria-labelledby="capabilities" className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <h2 id="capabilities" className="text-2xl font-semibold tracking-tight">
              Integrated services for brands and creators
            </h2>
            <p className="text-sm text-muted-foreground">
              We connect marketing decision-makers with talent who understand the nuance of social storytelling. Our
              services span talent scouting, campaign architecture, contract negotiation, production management, and
              actionable insights.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <CapabilityCard
              title="Brand partnerships"
              description="Brief refinement, creator casting, deliverable management, and post-campaign reporting with platform-level benchmarks."
            />
            <CapabilityCard
              title="Creator development"
              description="Strategic growth planning, monetization support, and compliance coaching to sustain creator longevity."
            />
            <CapabilityCard
              title="Paid amplification"
              description="Paid social strategy layered onto creator assets with media rights, whitelisting, and performance optimization."
            />
            <CapabilityCard
              title="Production studio"
              description="On-location and remote production support with creative direction, editing, and publishing oversight."
            />
          </div>
        </section>

        <section
          aria-labelledby="cta"
        className="relative overflow-hidden rounded-3xl border bg-card text-card-foreground shadow-xl px-8 py-12"
        >
          <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-center">
            <div className="space-y-4">
              <h2 id="cta" className="text-3xl font-semibold tracking-tight text-balance">
                Ready to build the next social-first launch?
              </h2>
              <p className="max-w-xl text-sm text-muted-foreground">
                Share your brief with our partnerships desk and we&apos;ll curate a tailored talent shortlist within 48 hours.
                For creators, we offer representation opportunities by referral—reach out to learn more.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="mailto:talent@sw-ent.com">
                    Start a campaign <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn about our model</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-48 md:h-full">
              <Image
                src="/images/creators/hero-grid.svg"
                alt="Collage of SW Entertainment creators"
                fill
                className="rounded-2xl object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: string;
  detail: string;
}

function StatItem({ label, value, detail }: StatItemProps) {
  return (
    <div className="rounded-2xl border bg-card text-card-foreground px-5 py-4 shadow-md hover:shadow-lg transition">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function CapabilityCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="h-full bg-card text-card-foreground border shadow-md hover:shadow-lg transition">
      <CardContent className="space-y-3 p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
