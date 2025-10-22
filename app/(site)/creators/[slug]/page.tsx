import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

import AutoPlayVideo from "@/components/AutoPlayVideo";
import VideoLightbox from "@/components/VideoLightbox";
import { CreatorMetrics } from "@/components/CreatorMetrics";
import { DemographicsChart } from "@/components/DemographicsChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getCreatorBySlug,
  getCreators,
  getTotalFollowers,
  type Creator,
} from "@/lib/creators";
import { buildPageMetadata } from "@/lib/seo";

type CreatorPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCreators().map((creator) => ({ slug: creator.slug }));
}

export function generateMetadata({ params }: CreatorPageProps): Metadata {
  const creator = getCreatorBySlug(params.slug);
  if (!creator) {
    return buildPageMetadata({
      title: "Creator not found",
      description: "The requested creator profile could not be located.",
      path: `/creators/${params.slug}`,
    });
  }

  return buildPageMetadata({
    title: `${creator.name} creator profile`,
    description: `${creator.name} · ${creator.category.join(", ")} creator with ${formatFollowers(
      getTotalFollowers(creator),
    )} followers and ${creator.engagementRate.toFixed(1)}% engagement.`,
    path: `/creators/${creator.slug}`,
  });
}

export default function CreatorPage({ params }: CreatorPageProps) {
  const creator = getCreatorBySlug(params.slug);
  if (!creator) {
    notFound();
  }
  const tags = creator.category ?? creator.categoryTags ?? [];

  return (
    <div className="pb-24 pt-12">
      <div className="container space-y-12">
        <Button variant="ghost" className="gap-2" asChild>
          <Link href="/creators">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to roster
          </Link>
        </Button>

        <header className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-3xl border border-border/70">
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-4xl font-semibold tracking-tight">{creator.name}</h1>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  {creator.location}
                </p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{creator.bio}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {creator.platforms.map((platform) => (
                <Button
                  key={platform.name}
                  variant="outline"
                  className="gap-2"
                  asChild
                >
                  <Link href={platform.url} target="_blank" rel="noopener noreferrer">
                    <span className="capitalize">{platform.name}</span>
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              ))}
              <a
                href={`mailto:${creator.email || "swtalents.contact@gmail.com"}`}
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 font-medium hover:bg-primary/90 transition"
              >
                Contact {creator.name}
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-border/70 bg-muted/40 p-6">
            <CreatorMetrics creator={creator} />
          </div>
        </header>

        <section aria-labelledby="demographics" className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="demographics" className="text-2xl font-semibold tracking-tight">
                Audience insights
              </h2>
              <p className="text-sm text-muted-foreground">
                Demographic distribution is modeled from the last 90 days of platform analytics.
              </p>
            </div>
          </div>
          <DemographicsChart demographics={creator.demographics} />
        </section>

        {creator.selectedContent?.length ? (
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Selected Content</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {creator.selectedContent.map((item: any, i: number) => (
                <div key={i} className="space-y-2">
                  <VideoLightbox
                    src={item.src}
                    poster={item.poster}
                    href={item.href}
                    thumb={
                      <AutoPlayVideo
                        src={item.src}
                        poster={item.poster}
                        className="aspect-[9/16] rounded-xl shadow-sm"
                      />
                    }
                  />
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-primary hover:underline text-center"
                  >
                    Watch on TikTok
                  </a>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {creator.brands?.length ? (
          <section className="mt-16">
            <h2 className="text-xl font-semibold mb-4">Brands Worked With</h2>
            <div className="flex flex-wrap items-center gap-6">
              {creator.brands.map((brand, i) => (
                <div key={i} className="flex flex-col items-center">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      title={brand.name}
                      className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{brand.name}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function formatFollowers(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return value.toLocaleString();
}
