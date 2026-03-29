export const locales = ["nl", "en"] as const;

export type SiteLocale = (typeof locales)[number];

export const siteConfig: {
  name: string;
  defaultLocale: SiteLocale;
  locales: readonly SiteLocale[];
  image: string;
  email: string;
  bedAndBreakfastListingUrl: string;
} = {
  name: "Bed & Breakfast Klein Ockenburgh",
  defaultLocale: "nl",
  locales,
  image: "/b&b-klein-ockenburgh.jpg",
  email: "info@kleinockenburgh.nl",
  bedAndBreakfastListingUrl:
    "https://www.bedandbreakfast.nl/nl/a/jI6pxRAvIDuR/bb-klein-ockenburgh",
};

export function getSiteUrl() {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "https://www.kleinockenburgh.com";

  return new URL(
    candidate.startsWith("http://") || candidate.startsWith("https://")
      ? candidate
      : `https://${candidate}`,
  );
}

export function getLocalizedPath(locale: SiteLocale, path = "") {
  const normalizedPath = path.replace(/^\/+/, "");
  return normalizedPath ? `/${locale}/${normalizedPath}` : `/${locale}`;
}
