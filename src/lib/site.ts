export const siteConfig = {
  name: "Bed & Breakfast Klein Ockenburgh",
  defaultLocale: "nl-NL",
  locales: ["nl-NL", "en-GB"] as const,
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

export function getLocalizedPath(locale: (typeof siteConfig.locales)[number]) {
  return `/${locale}`;
}
