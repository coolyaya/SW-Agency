import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onReset?: () => void;
  resetHref?: string;
}

export function EmptyState({ onReset, resetHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border/70 bg-muted/40 px-8 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/15 text-brand">
        <Search className="h-7 w-7" aria-hidden />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">No creators match the current filters</h3>
        <p className="text-sm text-muted-foreground">
          Try broadening your search or resetting filters to explore the full roster.
        </p>
      </div>
      {onReset ? (
        <Button variant="outline" className="rounded-full" onClick={onReset}>
          Reset filters
        </Button>
      ) : resetHref ? (
        <Button variant="outline" className="rounded-full" asChild>
          <Link href={resetHref}>Reset filters</Link>
        </Button>
      ) : null}
    </div>
  );
}
