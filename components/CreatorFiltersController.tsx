"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CreatorFilters } from "@/components/CreatorFilters";
import type { CreatorFilterState } from "@/lib/filters";
import { buildQueryFromState } from "@/lib/filters";

interface CreatorFiltersControllerProps {
  initialState: CreatorFilterState;
  resultsCount: number;
}

export function CreatorFiltersController({
  initialState,
  resultsCount,
}: CreatorFiltersControllerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, setState] = React.useState<CreatorFilterState>(initialState);

  React.useEffect(() => {
    const nextState: CreatorFilterState = {
      search: searchParams.get("search") ?? undefined,
      platform: searchParams.get("platform") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      followers: searchParams.get("followers") ?? undefined,
      region: searchParams.get("region") ?? undefined,
      sort: searchParams.get("sort") ?? "followers-desc",
      view: (searchParams.get("view") as CreatorFilterState["view"]) ?? "grid",
    };
    setState(nextState);
  }, [searchParams]);

  const updateState = React.useCallback(
    (patch: Partial<CreatorFilterState>) => {
      setState((prev) => {
        const next = { ...prev, ...patch };
        const query = buildQueryFromState(next);
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
        return next;
      });
    },
    [pathname, router],
  );

  const handleReset = React.useCallback(() => {
    setState({ sort: "followers-desc", view: "grid" });
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return (
    <CreatorFilters
      state={state}
      resultsCount={resultsCount}
      onChange={updateState}
      onViewChange={(view) => updateState({ view })}
      onReset={handleReset}
    />
  );
}
