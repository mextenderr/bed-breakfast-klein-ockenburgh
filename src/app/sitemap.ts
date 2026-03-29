import type { MetadataRoute } from "next";
import { getLocalizedPath, getSiteUrl, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return siteConfig.locales.flatMap((locale) => [
    {
      url: new URL(getLocalizedPath(locale), siteUrl).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: locale === siteConfig.defaultLocale ? 1 : 0.8,
    },
    {
      url: new URL(getLocalizedPath(locale, "conditions"), siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]);
}
