import type { MetadataRoute } from "next";
import { getLocalizedPath, getSiteUrl, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return siteConfig.locales.map((locale) => ({
    url: new URL(getLocalizedPath(locale), siteUrl).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority: locale === siteConfig.defaultLocale ? 1 : 0.8,
  }));
}
