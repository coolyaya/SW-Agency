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
  username?: string;
  avatar: string;
  platforms: CreatorPlatform[];
  category: string[];
  location: string;
  followers: Record<string, number>;
  engagementRate: number;
  email?: string;
  likes?: number;
  demographics: {
    age: [string, number][];
    gender: [string, number][];
    countries: [string, number][];
  };
  metrics?: {
    range: string;
    postViews: number;
    profileViews: number;
    likes: number;
    comments: number;
    shares: number;
    estimatedRewards: number | null;
  };
  bio: string;
  recentContent: string[];
  selectedContent?: CreatorSelectedContent[];
  brands?: { name: string; logo?: string }[];
  viewerActivity?: {
    mostActiveTime: string;
    peakViewDate: string;
    peakViewCount: number;
  };
  categoryTags: string[];
  region: string;
}
