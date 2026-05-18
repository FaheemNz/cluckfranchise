import type { Metadata } from "next";

const SITE_NAME = "Cluck Clucks";
const DEFAULT_TITLE = "Cluck Clucks";
const DEFAULT_DESCRIPTION = "Chicken and Waffles";

function clean(value?: string | null) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function splitKeywords(value?: string | null) {
  const cleaned = clean(value);
  if (!cleaned) return undefined;

  return cleaned
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseRobots(value?: string | null): Metadata["robots"] {
  const cleaned = clean(value);

  if (!cleaned) {
    return {
      index: true,
      follow: true,
    };
  }

  const parts = cleaned
    .toLowerCase()
    .split(",")
    .map((item) => item.trim());

  return {
    index: !parts.includes("noindex"),
    follow: !parts.includes("nofollow"),
  };
}

export function buildPageMetadata(seo: any): Metadata {
  const title = clean(seo?.title) || DEFAULT_TITLE;
  const description = clean(seo?.meta_description) || DEFAULT_DESCRIPTION;
  const canonical = clean(seo?.canonical);

  const ogTitle = clean(seo?.og?.title) || title;
  const ogDescription = clean(seo?.og?.description) || description;
  const ogImage = clean(seo?.og?.image);

  const twitterTitle = clean(seo?.twitter?.title) || title;
  const twitterDescription = clean(seo?.twitter?.description) || description;
  const twitterImage = clean(seo?.twitter?.image) || ogImage;

  return {
    title,
    description,
    keywords: splitKeywords(seo?.meta_keywords),
    robots: parseRobots(seo?.meta_robots),

    alternates: canonical
      ? {
          canonical,
        }
      : undefined,

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: seo?.og?.type || "website",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}