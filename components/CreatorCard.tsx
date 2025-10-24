import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatorMetrics } from "@/components/CreatorMetrics";
import type { Creator } from "@/lib/creators";
import { cn } from "@/lib/utils";

interface CreatorCardProps {
  creator: Creator;
  layout?: "grid" | "list";
}

export function CreatorCard({ creator, layout = "grid" }: CreatorCardProps) {
  const CardContainer = (
    <Card
      className={cn(
        "group h-full border-border/70 bg-card/90 transition hover:-translate-y-1",
        layout === "list" ? "md:flex md:flex-row md:items-stretch" : "",
      )}
    >
      <CardHeader
        className={cn(
          "flex flex-col gap-4",
          layout === "list" ? "md:w-1/3 md:p-8" : "p-6",
        )}
      >
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-border/70">
            <Image
              src={creator.avatar}
              alt={creator.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-xl">{creator.name}</CardTitle>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {creator.location}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {creator.category.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent
        className={cn(
          "flex flex-col gap-6",
          layout === "list" ? "md:w-2/3 md:p-8" : "p-6 pt-0",
        )}
      >
        <p className="text-sm text-muted-foreground">{creator.bio}</p>
        <CreatorMetrics creator={creator} showCTA={false} compact={layout === "list"} />
        <div className="flex items-center justify-between">
          <Link
            href={`/creators/${creator.slug}`}
            className="text-sm font-semibold text-primary transition hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            View full profile
          </Link>
          <Button asChild variant="outline" className="gap-2">
            <Link href="mailto:swtalents.contact@gmail.com" target="_blank" rel="noreferrer">
              Partner Inquiry <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <article aria-labelledby={`${creator.slug}-title`} className="h-full">
      {CardContainer}
    </article>
  );
}
