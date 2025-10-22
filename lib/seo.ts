import type { Metadata } from "next";

export const siteConfig = {
  name: "SW Talents",
  description:
    "SW Talents is a boutique social talent agency representing TikTok and Instagram creators for brands ready to scale cultural impact.",
  siteUrl: "https://www.sw-entertainment.com",
  ogImage: "/api/og",
  twitterHandle: "@swentertainment",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} · Social Talent Agency`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.siteUrl,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  alternates: {
    canonical: "/",
  },
};

interface PageSEO {
  title: string;
  description: string;
  path?: string;
}

export function buildPageMetadata({ title, description, path }: PageSEO): Metadata {
  const url = path ? new URL(path, siteConfig.siteUrl) : siteConfig.siteUrl;
  return {
    title,
    description,
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      title,
      description,
      url: url.toString(),
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.ogImage}?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.twitterHandle,
    },
  };
}
