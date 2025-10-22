"use client";

import * as React from "react";
import { Filter, Grid, ListFilter, RotateCcw, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toggle } from "@/components/ui/toggle";
import {
  CATEGORY_OPTIONS,
  FOLLOWER_RANGES,
  PLATFORM_OPTIONS,
  REGION_OPTIONS,
  SORT_OPTIONS,
  type CreatorFilterState,
  type ViewOption,
} from "@/lib/filters";

interface CreatorFiltersProps {
  state: CreatorFilterState;
  onChange: (patch: Partial<CreatorFilterState>) => void;
  onViewChange: (view: ViewOption) => void;
  onReset: () => void;
  resultsCount: number;
}

export function CreatorFilters({
  state,
  onChange,
  onViewChange,
  onReset,
  resultsCount,
}: CreatorFiltersProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(state.search ?? "");

  React.useEffect(() => {
    setSearchValue(state.search ?? "");
  }, [state.search]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      onChange({ search: searchValue || undefined });
    }, 300);

    return () => clearTimeout(handler);
  }, [searchValue, onChange]);

  const FiltersGrid = (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SearchField value={searchValue} onChange={setSearchValue} />
      <SelectField
        label="Platform"
        icon={<Filter className="h-4 w-4 opacity-60" aria-hidden />}
        value={state.platform ?? "all"}
        onValueChange={(value) => onChange({ platform: value })}
        options={PLATFORM_OPTIONS}
      />
      <SelectField
        label="Category"
        icon={<Filter className="h-4 w-4 opacity-60" aria-hidden />}
        value={state.category ?? "all"}
        onValueChange={(value) => onChange({ category: value })}
        options={CATEGORY_OPTIONS}
      />
      <SelectField
        label="Follower range"
        icon={<SlidersHorizontal className="h-4 w-4 opacity-60" aria-hidden />}
        value={state.followers ?? "all"}
        onValueChange={(value) => onChange({ followers: value })}
        options={FOLLOWER_RANGES.map(({ label, value }) => ({ label, value }))}
      />
      <SelectField
        label="Region"
        icon={<GlobeIcon />}
        value={state.region ?? "all"}
        onValueChange={(value) => onChange({ region: value })}
        options={REGION_OPTIONS}
      />
      <SelectField
        label="Sort"
        icon={<ListFilter className="h-4 w-4 opacity-60" aria-hidden />}
        value={state.sort ?? SORT_OPTIONS[0].value}
        onValueChange={(value) => onChange({ sort: value })}
        options={SORT_OPTIONS}
      />
    </div>
  );

  return (
    <section aria-labelledby="creator-filters" className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="creator-filters" className="text-xl font-semibold tracking-tight">
            {resultsCount} creator{resultsCount === 1 ? "" : "s"} match your filters
          </h2>
          <p className="text-sm text-muted-foreground">
            Tune search parameters to identify the best-fit talent for your campaign.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Toggle
            pressed={(state.view ?? "grid") === "grid"}
            variant="outline"
            aria-label="Grid view"
            onClick={() => onViewChange("grid")}
          >
            <Grid className="h-4 w-4" aria-hidden />
          </Toggle>
          <Toggle
            pressed={state.view === "list"}
            variant="outline"
            aria-label="List view"
            onClick={() => onViewChange("list")}
          >
            <ListFilter className="h-4 w-4" aria-hidden />
          </Toggle>
          <Button
            variant="ghost"
            className="gap-2"
            onClick={onReset}
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reset
          </Button>
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" aria-hidden />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4 overflow-y-auto pb-20">
                  {FiltersGrid}
                </div>
                <SheetFooter className="mt-6">
                  <Button className="w-full" size="lg" onClick={() => setMobileOpen(false)}>
                    Apply filters
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div className="hidden md:block">{FiltersGrid}</div>
    </section>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  icon?: React.ReactNode;
}

function SelectField({ label, value, onValueChange, options, icon }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {icon}
        {label}
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <div className="space-y-2 sm:col-span-2 lg:col-span-2">
      <label
        htmlFor="creator-search"
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground"
      >
        <Filter className="h-4 w-4 opacity-60" aria-hidden />
        Search
      </label>
      <Input
        id="creator-search"
        placeholder="Search by name, platform, or keywords"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="h-4 w-4 opacity-60"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z" />
      <path d="M3 12h18" />
      <path d="M12 3a17 17 0 0 1 4 9 17 17 0 0 1-4 9 17 17 0 0 1-4-9 17 17 0 0 1 4-9Z" />
    </svg>
  );
}
