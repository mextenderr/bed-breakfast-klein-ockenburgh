import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ChevronLeft } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import Topbar from "@/components/Topbar";
import { Link } from "@/i18n/navigation";
import { getLocalizedPath, getSiteUrl, type SiteLocale } from "@/lib/site";

type ConditionsSection = {
  title: string;
  paragraphs: string[];
};

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ConditionsMetadata" });
  const path = getLocalizedPath(locale as SiteLocale, "conditions");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: {
        nl: getLocalizedPath("nl", "conditions"),
        en: getLocalizedPath("en", "conditions"),
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: new URL(path, getSiteUrl()).toString(),
    },
  };
}

export default async function ConditionsPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ConditionsPage" });
  const sections = t.raw("sections") as ConditionsSection[];

  return (
    <>
      <Topbar />
      <main className="bg-candlelight text-night-forest">
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,201,154,0.42),transparent_40%),radial-gradient(circle_at_top_right,rgba(74,103,65,0.16),transparent_36%)]" />

          <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-forest-green transition-colors hover:text-night-forest"
            >
              <ChevronLeft className="size-4" />
              {t("backLink")}
            </Link>

            <div className="mt-8 max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.22em] text-forest-green uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-night-forest sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-night-forest/78 sm:text-lg">
                {t("intro")}
              </p>
            </div>

            <div className="mt-10">
              <div className="rounded-[32px] border border-forest-green/15 bg-white/70 p-6 shadow-[0_20px_50px_rgba(29,43,28,0.08)] backdrop-blur-xs">
                <h2 className="text-lg font-semibold text-night-forest">
                  {t("acceptanceTitle")}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-night-forest/76 sm:text-base">
                  {t("acceptanceBody")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-24">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
            <div className="space-y-5">
              {sections.map((section, index) => (
                <article
                  key={section.title}
                  className="rounded-[32px] border border-forest-green/12 bg-white/72 p-6 shadow-[0_16px_36px_rgba(29,43,28,0.07)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <p className="text-sm font-semibold tracking-[0.22em] text-forest-green uppercase sm:w-16 sm:shrink-0">
                      {(index + 1).toString().padStart(2, "0")}
                    </p>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-night-forest">
                        {section.title}
                      </h2>
                      <div className="mt-4 space-y-3 text-sm leading-relaxed text-night-forest/78 sm:text-base">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
