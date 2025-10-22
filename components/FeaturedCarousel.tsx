"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Creator } from "@/lib/creators";
import { cn } from "@/lib/utils";

interface FeaturedCarouselProps {
  creators: Creator[];
}

export function FeaturedCarousel({ creators }: FeaturedCarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const scrollBy = (direction: "left" | "right") => {
    const node = scrollRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.9;
    node.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section aria-labelledby="featured-creators" className="relative">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 id="featured-creators" className="text-2xl font-semibold tracking-tight">
            Creator roster highlights
          </h2>
          <p className="text-sm text-muted-foreground">
            A curated snapshot of multi-market creators delivering standout results for leading brands.
          </p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Scroll left"
            onClick={() => scrollBy("left")}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Scroll right"
            onClick={() => scrollBy("right")}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        role="list"
      >
        {creators.map((creator) => (
          <Card
            key={creator.slug}
            className={cn(
              "relative flex h-full min-w-[280px] snap-center flex-col overflow-hidden border-border/70 bg-gradient-to-br from-background via-background to-brand/5",
              "md:min-w-[320px]",
            )}
          >
            <CardHeader className="flex flex-col gap-4 pb-0">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border/70">
                  <Image
                    src={creator.avatar}
                    alt={`${creator.name} avatar`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{creator.name}</CardTitle>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {creator.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {creator.category.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex grow flex-col justify-between gap-3">
              <p className="text-sm text-muted-foreground">{creator.bio}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="space-y-1">
                  <p className="font-semibold tracking-tight">
                    {formatAbbreviatedFollowers(creator.followers)} total
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Engagement {creator.engagementRate.toFixed(1)}%
                  </p>
                </div>
                <Button variant="ghost" asChild className="gap-1">
                  <Link href={`/creators/${creator.slug}`}>
                    View profile <MoveRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function formatAbbreviatedFollowers(followers: Creator["followers"]) {
  const total = Object.values(followers).reduce((sum, value) => sum + value, 0);
  if (total >= 1_000_000) {
    return `${(total / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (total >= 1_000) {
    return `${(total / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return total.toLocaleString();
}
