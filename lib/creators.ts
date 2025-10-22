import creators from "@/data/creators.json";
import { buildQueryFromState, type CreatorFilterState, parseFollowerRange } from "@/lib/filters";

export interface CreatorPlatform {
  name: string;
  url: string;
}

export interface CreatorSelectedContent {
  src: string;
  poster?: string;
  href: string;
}

export interface Creator {
  slug: string;
  name: string;
  avatar: string;
  platforms: CreatorPlatform[];
  category: string[];
  location: string;
  followers: Record<string, number>;
  engagementRate: number;
  email?: string;
  demographics: {
    age: [string, number][];
    gender: [string, number][];
    countries: [string, number][];
  };
  bio: string;
  recentContent: string[];
  selectedContent?: CreatorSelectedContent[];
  brands?: { name: string; logo?: string }[];
  categoryTags: string[];
  region: string;
}

export function getCreators(): Creator[] {
  return creators as Creator[];
}

export function getCreatorBySlug(slug: string): Creator | undefined {
  return getCreators().find((creator) => creator.slug === slug);
}

export function applyCreatorFilters(state: CreatorFilterState) {
  const list = getCreators().filter((creator) => {
    if (state.platform && state.platform !== "all") {
      const hasPlatform = creator.platforms.some(
        (platform) => platform.name === state.platform,
      );
      if (!hasPlatform) return false;
    }

    if (state.category && state.category !== "all") {
      const matchCategory = creator.category.some(
        (category) => category.toLowerCase() === state.category?.toLowerCase(),
      );
      if (!matchCategory) return false;
    }

    if (state.region && state.region !== "all") {
      if (creator.region !== state.region) return false;
    }

    if (state.search) {
      const needle = state.search.toLowerCase();
      const haystack = `${creator.name} ${creator.bio} ${creator.categoryTags.join(" ")}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }

    if (state.followers && state.followers !== "all") {
      const range = parseFollowerRange(state.followers);
      const total = getTotalFollowers(creator);
      if (total < range.min) return false;
      if (total > range.max) return false;
    }

    return true;
  });

  const sorted = [...list].sort((a, b) => {
    switch (state.sort) {
      case "followers-asc":
        return getTotalFollowers(a) - getTotalFollowers(b);
      case "followers-desc":
        return getTotalFollowers(b) - getTotalFollowers(a);
      case "engagement-asc":
        return a.engagementRate - b.engagementRate;
      case "engagement-desc":
      default:
        return b.engagementRate - a.engagementRate;
    }
  });

  return sorted;
}

export function getTotalFollowers(creator: Creator) {
  return Object.values(creator.followers).reduce((sum, value) => sum + value, 0);
}

export function getCreatorHref(state: CreatorFilterState, slug: string) {
  const query = buildQueryFromState(state);
  return query ? `/creators/${slug}?${query}` : `/creators/${slug}`;
}
