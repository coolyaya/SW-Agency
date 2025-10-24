import { Instagram, Youtube, Globe, MapPin, Camera } from "lucide-react";
import { SiTiktok } from "react-icons/si";

import { Badge } from "@/components/ui/badge";
import type { Creator } from "@/lib/creators";

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  tiktok: SiTiktok,
  youtube: Youtube,
  snapchat: Camera,
  pinterest: Camera,
};

interface CreatorMetricsProps {
  creator: Creator;
  showCTA?: boolean;
  compact?: boolean;
  showBrands?: boolean;
}

export function CreatorMetrics({
  creator,
  compact = false,
  showBrands = false,
}: CreatorMetricsProps) {
  const totalFollowers = Object.values(creator.followers).reduce((acc, value) => acc + value, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <MetricTile
          label="Total followers"
          value={formatNumber(totalFollowers)}
          description="Across all platforms"
        />
        <MetricTile
          label="Engagement rate"
          value={`${creator.engagementRate.toFixed(1)}%`}
          description="365-day trailing average"
        />
        <MetricTile
          label="Primary region"
          value={creator.region}
          description={creator.location}
          icon={<MapPin className="h-4 w-4 opacity-60" aria-hidden />}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {creator.platforms
          .filter((platform) => {
            const excludedPlatforms = new Set(["linktree", "beacons"]);
            return !excludedPlatforms.has(platform.name.toLowerCase());
          })
          .map((platform) => {
          const Icon = platformIcons[platform.name] ?? Globe;
          return (
            <Badge key={platform.name} variant="outline" className="gap-2">
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="capitalize">{platform.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatNumber(creator.followers[platform.name] ?? 0)}
              </span>
            </Badge>
          );
        })}
      </div>
      {showBrands && creator.brands?.length ? (
        <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground text-center">
            Brands worked with
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
            {creator.brands.map((brand) => (
              <span
                key={brand.name}
                className="rounded-full border border-border/60 bg-background px-4 py-1.5 text-sm font-semibold text-foreground"
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

interface MetricTileProps {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
}

function MetricTile({ label, value, description, icon }: MetricTileProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl border bg-muted/30 px-4 py-3 text-center min-w-[110px]">
      {icon ? <div className="mx-auto mb-1 text-muted-foreground/70">{icon}</div> : null}
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground whitespace-normal leading-tight">
        {label}
      </p>
      {label.toUpperCase() === "PRIMARY REGION" ? (
        <p className="mt-1 text-lg font-semibold tracking-wide">{value}</p>
      ) : (
        <p className="mt-1 text-2xl font-bold leading-none">{value}</p>
      )}
      {description ? (
        <p className="text-xs font-medium text-foreground/80 leading-snug">{description}</p>
      ) : null}
    </div>
  );
}

function formatNumber(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return value.toLocaleString();
}
