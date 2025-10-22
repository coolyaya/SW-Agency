"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  asChild?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm";
}

const variants: Record<NonNullable<ToggleProps["variant"]>, string> = {
  default:
    "bg-muted text-muted-foreground data-[state=on]:bg-brand data-[state=on]:text-brand-foreground",
  outline:
    "border border-border data-[state=on]:border-brand data-[state=on]:bg-brand/10 data-[state=on]:text-brand",
};

const sizes: Record<NonNullable<ToggleProps["size"]>, string> = {
  default: "h-10 px-3 text-sm",
  sm: "h-9 px-3 text-xs",
};

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    { className, pressed, asChild = false, variant = "default", size = "default", ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-state={pressed ? "on" : "off"}
        aria-pressed={pressed}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Toggle.displayName = "Toggle";

export { Toggle };
