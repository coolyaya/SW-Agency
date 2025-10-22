import * as React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "bg-brand/10 text-brand inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-brand/20",
  secondary:
    "bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-border",
  outline:
    "border border-border inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge };
