export const PLATFORM_OPTIONS = [
  { label: "All platforms", value: "all" },
  { label: "TikTok", value: "tiktok" },
  { label: "Instagram", value: "instagram" },
  { label: "YouTube", value: "youtube" },
  { label: "Snapchat", value: "snapchat" },
  { label: "Pinterest", value: "pinterest" },
];

export const CATEGORY_OPTIONS = [
  { label: "All categories", value: "all" },
  { label: "Beauty", value: "beauty" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Fitness", value: "fitness" },
  { label: "Wellness", value: "wellness" },
  { label: "Fashion", value: "fashion" },
  { label: "Fragrance", value: "fragrance" },
  { label: "Tech", value: "tech" },
  { label: "Gaming", value: "gaming" },
  { label: "Home", value: "home" },
  { label: "Design", value: "design" },
  { label: "Food", value: "food" },
  { label: "Travel", value: "travel" },
];

export const REGION_OPTIONS = [
  { label: "All regions", value: "all" },
  { label: "North America", value: "North America" },
  { label: "Europe", value: "Europe" },
  { label: "APAC", value: "APAC" },
  { label: "Middle East", value: "Middle East" },
];

export const FOLLOWER_RANGES = [
  { label: "Any follower count", value: "all", min: 0 },
  { label: "Under 5K", value: "0-5k", min: 0, max: 5_000 },
  { label: "5K - 10K", value: "5k-10k", min: 5_000, max: 10_000 },
  { label: "10K - 20K", value: "10k-20k", min: 10_000, max: 20_000 },
  { label: "20K - 50K", value: "20k-50k", min: 20_000, max: 50_000 },
  { label: "50K - 100K", value: "50k-100k", min: 50_000, max: 100_000 },
  { label: "100K - 200K", value: "100k-200k", min: 100_000, max: 200_000 },
  { label: "200K+", value: "200k-plus", min: 200_000 },
] as const;

export const SORT_OPTIONS = [
  { label: "Followers: High to low", value: "followers-desc" },
  { label: "Followers: Low to high", value: "followers-asc" },
  { label: "Engagement: High to low", value: "engagement-desc" },
  { label: "Engagement: Low to high", value: "engagement-asc" },
];

export type ViewOption = "grid" | "list";

export interface CreatorFilterState {
  search?: string;
  platform?: string;
  category?: string;
  followers?: string;
  region?: string;
  sort?: string;
  view?: ViewOption;
}

export function parseFollowerRange(range?: string) {
  if (!range || range === "all") {
    return { min: 0, max: Number.POSITIVE_INFINITY };
  }

  const matched = FOLLOWER_RANGES.find((item) => item.value === range);
  if (!matched) {
    return { min: 0, max: Number.POSITIVE_INFINITY };
  }

  const max = "max" in matched ? matched.max : Number.POSITIVE_INFINITY;

  return {
    min: matched.min,
    max,
  };
}

export function parseFilterState(
  params: URLSearchParams,
): CreatorFilterState {
  return {
    search: params.get("search") ?? undefined,
    platform: params.get("platform") ?? undefined,
    category: params.get("category") ?? undefined,
    followers: params.get("followers") ?? undefined,
    region: params.get("region") ?? undefined,
    sort: params.get("sort") ?? undefined,
    view: (params.get("view") as ViewOption | null) ?? undefined,
  };
}

export function buildQueryFromState(state: CreatorFilterState) {
  const params = new URLSearchParams();
  if (state.search) params.set("search", state.search);
  if (state.platform && state.platform !== "all") {
    params.set("platform", state.platform);
  }
  if (state.category && state.category !== "all") {
    params.set("category", state.category);
  }
  if (state.followers && state.followers !== "all") {
    params.set("followers", state.followers);
  }
  if (state.region && state.region !== "all") {
    params.set("region", state.region);
  }
  if (state.sort) params.set("sort", state.sort);
  if (state.view) params.set("view", state.view);
  return params.toString();
}
