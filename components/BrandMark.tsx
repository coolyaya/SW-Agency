import Link from "next/link";

import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  withTagline?: boolean;
}

export function BrandMark({ className, withTagline = false }: BrandMarkProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex flex-col leading-none text-left text-xl font-semibold tracking-tight text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <span className="font-semibold uppercase tracking-[0.18em] text-brand group-hover:text-brand/90">
        SW
      </span>
      <span className="text-lg font-medium text-foreground/90">Creators</span>
      {withTagline ? (
        <span className="text-xs font-normal uppercase tracking-[0.35em] text-muted-foreground">
          Talent Studio
        </span>
      ) : null}
    </Link>
  );
}
