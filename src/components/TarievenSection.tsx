"use client";

import { useLocale, useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";

type RateRow = {
  label: string;
  price: string;
};

type ConditionsHighlight = {
  title: string;
  body: string;
};

export default function TarievenSection() {
  const locale = useLocale();
  const t = useTranslations("TarievenSection");
  const rawRates = t.raw("rates");
  const rawHighlights = t.raw("highlights");
  const rates = Array.isArray(rawRates) ? (rawRates as RateRow[]) : [];
  const highlights = Array.isArray(rawHighlights)
    ? (rawHighlights as ConditionsHighlight[])
    : [];

  return (
    <section
      key={locale}
      id="tarieven"
      className="scroll-mt-24 bg-midnight-grove pt-40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-35">
        <Reveal className="mb-10 max-w-3xl pt-10 sm:pt-0">
          <h2 className="text-3xl font-semibold tracking-tight text-candlelight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-candlelight/80">{t("intro")}</p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-12">
          {/* Rates — primary card */}
          <Reveal className="rounded-2xl border border-forest-green/20 bg-candlelight p-7 shadow-[0_18px_40px_rgba(0,0,0,0.15)] md:col-span-7">
            <p className="text-sm font-semibold tracking-[0.18em] text-forest-green uppercase">
              {t("ratesTitle")}
            </p>
            <div className="mt-1 h-px w-12 bg-forest-green/40" />

            <dl className="mt-6 space-y-0 text-sm">
              {rates.map((rate, index) => (
                <div
                  key={`${rate.label}-${rate.price}`}
                  className={`flex items-baseline justify-between gap-4 py-3 ${
                    index < rates.length - 1
                      ? "border-b border-forest-green/12"
                      : ""
                  }`}
                >
                  <dt className="text-night-forest/85">{rate.label}</dt>
                  <dd className="shrink-0 font-semibold text-night-forest">
                    {rate.price}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-xl bg-forest-green/6 px-4 py-3">
              <p className="text-xs leading-relaxed text-night-forest/65">
                {t("ratesFootnotePrimary")}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-night-forest/65">
                {t("ratesFootnoteSecondary")}
              </p>
            </div>
          </Reveal>

          {/* Conditions — companion card */}
          <Reveal
            delayMs={90}
            className="rounded-2xl border border-forest-green/20 bg-candlelight p-7 shadow-[0_18px_40px_rgba(0,0,0,0.15)] md:col-span-5"
          >
            <p className="text-sm font-semibold tracking-[0.18em] text-forest-green uppercase">
              {t("conditionsTitle")}
            </p>
            <div className="mt-1 h-px w-12 bg-forest-green/40" />

            <p className="mt-5 text-sm leading-relaxed text-night-forest/75">
              {t("conditionsIntro")}
            </p>

            <ul className="mt-5 space-y-3">
              {highlights.map((highlight) => (
                <li
                  key={highlight.title}
                  className="rounded-xl border border-forest-green/12 bg-forest-green/5 px-4 py-3"
                >
                  <p className="text-sm font-medium text-night-forest">
                    {highlight.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-night-forest/65">
                    {highlight.body}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs leading-relaxed text-night-forest/60">
              {t("conditionsAcceptance")}
            </p>
            <Link
              href="/conditions"
              className="mt-3 inline-flex items-center text-sm font-medium text-forest-green underline decoration-forest-green/50 underline-offset-4 transition-colors hover:text-night-forest"
            >
              {t("conditionsLink")}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
