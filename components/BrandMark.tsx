import Image from "next/image";
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
        "inline-flex flex-col items-start gap-2 text-left text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      aria-label="SW Creators home"
    >
      <div className="relative h-12 w-44 overflow-hidden rounded-md">
        <Image
          src="/images/sw-creators-logo.png"
          alt="SW Creators logo"
          fill
          sizes="160px"
          className="origin-left object-cover object-left scale-[1.0]"
          priority
        />
      </div>
      {withTagline ? (
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
          Talent Studio
        </span>
      ) : null}
    </Link>
  );
}
