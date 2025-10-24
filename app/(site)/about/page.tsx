import type { Metadata } from "next";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About SW Creators",
  description:
    "Learn how SW Creators bridges world-class creators and ambitious brands with strategic partnerships, campaign operations, and talent development.",
  path: "/about",
});

const brandServices = [
  {
    title: "Campaign strategy & casting",
    description:
      "Brief translation, talent mapping, outreach, and contract negotiation with clear deliverables and usage rights.",
  },
  {
    title: "Production & creative oversight",
    description:
      "Creative direction, shoot coordination, approvals, and delivery management to keep storytelling sharp and compliant.",
  },
  {
    title: "Measurement & performance",
    description:
      "Custom dashboards, attribution modeling, and actionable learnings to maximize spend across organic and paid distribution.",
  },
];

const creatorServices = [
  {
    title: "Representation & brand partnerships",
    description:
      "Dedicated representation team handling brand communication, rate negotiations, and long-term partnership planning.",
  },
  {
    title: "Growth & positioning",
    description:
      "Audience and platform analytics, creative feedback, and content planning to evolve your presence and revenue mix.",
  },
  {
    title: "Legal & financial guidance",
    description:
      "Contract review, regulatory compliance, and introductions to specialized partners in finance, legal, and taxation.",
  },
];

const leadership = [
  {
    name: "Sara Williams",
    role: "Founder & CEO",
    bio: "Former global partnerships director at a top entertainment studio with 12+ years scaling creator-led campaigns.",
  },
  {
    name: "Malik Chen",
    role: "Head of Talent",
    bio: "Leads roster development across NA, EU, and APAC. Background in creator management and digital rights.",
  },
  {
    name: "Amina Farouk",
    role: "Director of Brand Partnerships",
    bio: "Builds integrated programs with enterprise brands, grounding briefs in market insights and performance metrics.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-24 pt-16">
      <section className="container grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <div className="space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            About SW Creators
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-balance">
            We represent creators who move culture and help brands activate with clarity, care, and momentum.
          </h1>
          <p className="text-lg text-muted-foreground">
            SW Creators launched in 2018 to bridge the gap between breakout social talent and marketing teams who needed
            more than siloed influencer placements. Our model blends bespoke roster management with an in-house campaign desk
            that can move at the speed of culture.
          </p>
        </div>
        <div className="relative h-80 overflow-hidden rounded-3xl border border-border/70">
          <Image
            src="/images/creators/about-team.svg"
            alt="SW Creators team collaborating"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </div>
      </section>

      <section className="container grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">How we partner with brands</h2>
          <p className="text-sm text-muted-foreground">
            From launch campaigns to evergreen ambassador programs, we serve as an extension of your partnerships, social,
            and media teams. Our approach balances storytelling and accountability—bringing together creative development,
            production oversight, and measurement in a single workflow.
          </p>
        </div>
        <div className="grid gap-4">
          {brandServices.map((service) => (
            <Card key={service.title} className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {service.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">How we support creators</h2>
          <p className="text-sm text-muted-foreground">
            We champion creators with vision—helping them grow sustainably, diversify revenue, and safeguard their voice. Our
            team operates globally with dedicated managers who provide coaching, deal support, and infrastructure tailored to
            each creator&apos;s goals.
          </p>
        </div>
        <div className="grid gap-4">
          {creatorServices.map((service) => (
            <Card key={service.title} className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {service.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Leadership</h2>
          <p className="text-sm text-muted-foreground">
            A multidisciplinary team across partnerships, strategy, legal, and analytics orchestrates every campaign.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {leadership.map((leader) => (
            <Card key={leader.name} className="border-border/60 bg-muted/40">
              <CardHeader>
                <CardTitle>{leader.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{leader.role}</p>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {leader.bio}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
