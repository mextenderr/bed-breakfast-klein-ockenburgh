import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getLocalizedPath, siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const localizedPath = getLocalizedPath(locale);

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: {
      canonical: localizedPath,
      languages: {
        "nl-NL": getLocalizedPath("nl-NL"),
        "en-GB": getLocalizedPath("en-GB"),
        "x-default": getLocalizedPath(siteConfig.defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "nl-NL" ? "nl_NL" : "en_GB",
      alternateLocale: locale === "nl-NL" ? ["en_GB"] : ["nl_NL"],
      url: localizedPath,
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: siteConfig.image,
          width: 1200,
          height: 630,
          alt: t("imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [siteConfig.image],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
