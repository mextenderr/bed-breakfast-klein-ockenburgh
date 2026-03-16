import { useMessages, useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

type RateRow = {
  label: string;
  price: string;
};

type TarievenMessages = {
  TarievenSection?: {
    rates?: RateRow[];
    conditions?: string[];
  };
};

export default function TarievenSection() {
  const t = useTranslations("TarievenSection");
  const messages = useMessages() as TarievenMessages;
  const rates = Array.isArray(messages.TarievenSection?.rates)
    ? messages.TarievenSection.rates
    : [];
  const conditions = Array.isArray(messages.TarievenSection?.conditions)
    ? messages.TarievenSection.conditions
    : [];

  return (
    <section
      id="tarieven"
      className="scroll-mt-24 pt-40 bg-midnight-grove text-candlelight"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-35 sm:px-6 md:py-35">
        <Reveal className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-candlelight/80">{t("intro")}</p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-lg border border-forest-green/40 bg-night-forest/45 p-6">
            <h3 className="text-xl font-semibold text-aged-parchment">
              {t("ratesTitle")}
            </h3>
            <dl className="mt-4 space-y-4 text-sm">
              {rates.map((rate, index) => (
                <div
                  key={`${rate.label}-${rate.price}`}
                  className={`flex items-start justify-between gap-4 ${
                    index < rates.length - 1
                      ? "border-b border-forest-green/25 pb-3"
                      : ""
                  }`}
                >
                  <dt className="font-medium">{rate.label}</dt>
                  <dd className="shrink-0 font-semibold">{rate.price}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-candlelight/80">
              {t("ratesFootnotePrimary")}
            </p>
            <p className="mt-2 text-sm text-candlelight/80">
              {t("ratesFootnoteSecondary")}
            </p>
          </Reveal>

          <Reveal
            delayMs={90}
            className="rounded-lg border border-forest-green/40 bg-night-forest/45 p-6"
          >
            <h3 className="text-xl font-semibold text-aged-parchment">
              {t("conditionsTitle")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-candlelight/85">
              {conditions.map((condition) => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
