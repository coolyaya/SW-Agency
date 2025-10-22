import type { Metadata } from "next";
import Link from "next/link";

import { CreatorCard } from "@/components/CreatorCard";
import { CreatorFiltersController } from "@/components/CreatorFiltersController";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { applyCreatorFilters, type Creator } from "@/lib/creators";
import { parseFilterState, type CreatorFilterState } from "@/lib/filters";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Creator roster",
  description:
    "Browse SW Talents creators by platform, category, region, and follower brackets. Filter to find the right talent for your next campaign.",
  path: "/creators",
});

type CreatorsPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function CreatorsPage({ searchParams }: CreatorsPageProps) {
  const initialState = createFilterState(searchParams);
  const filteredCreators = applyCreatorFilters(initialState);

  return (
    <div className="space-y-12 pb-24 pt-16">
      <div className="container space-y-10">
        <CreatorFiltersController initialState={initialState} resultsCount={filteredCreators.length} />
        {filteredCreators.length ? (
          <CreatorsList creators={filteredCreators} state={initialState} />
        ) : (
          <EmptyState resetHref="/creators" />
        )}
      </div>
    </div>
  );
}

function createFilterState(params: Record<string, string | string[] | undefined>): CreatorFilterState {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => urlParams.append(key, item));
    } else if (value) {
      urlParams.set(key, value);
    }
  });

  const parsed = parseFilterState(urlParams);
  return {
    ...parsed,
    sort: parsed.sort ?? "followers-desc",
    view: parsed.view ?? "grid",
  };
}

function CreatorsList({ creators, state }: { creators: Creator[]; state: CreatorFilterState }) {
  const view = state.view ?? "grid";
  return (
    <section aria-label="Creator results" className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {creators.length} creator{creators.length === 1 ? "" : "s"}.
        </p>
        <Button variant="ghost" asChild className="gap-2">
          <Link href="mailto:swtalents.contact@gmail.com">Talk with our partnerships team</Link>
        </Button>
      </div>
      <div
        className={
          view === "grid"
            ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            : "space-y-6"
        }
      >
        {creators.map((creator) => (
          <CreatorCard key={creator.slug} creator={creator} layout={view} />
        ))}
      </div>
    </section>
  );
}
