import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle2, ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function ReservationSection() {
  const t = useTranslations("ReservationSection");

  return (
    <section
      id="reservation"
      className="scroll-mt-24 bg-candlelight text-night-forest"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-40">
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-night-forest/80">{t("intro")}</p>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-start lg:gap-12">
          <Reveal delayMs={100} className="w-full md:col-span-8">
            <iframe
              title={t("iframeTitle")}
              className="block w-full"
              src="https://www.bedandbreakfast.nl/nl/ibook/v2/jI6pxRAvIDuR/black/transparent"
              width="100%"
              height="600px"
            />
          </Reveal>

          <Reveal className="w-full md:col-span-4">
            <div className="rounded-3xl border border-forest-green/25 bg-candlelight p-5 shadow-[0_18px_40px_rgba(29,43,28,0.12)]">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white p-2">
                  <Image
                    src="/bedenbreakfastnl.png"
                    alt={t("providerLogoAlt")}
                    fill
                    sizes="48px"
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-[0.16em] text-forest-green uppercase">
                    {t("eyebrow")}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-night-forest">
                    {t("providerTitle")}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-night-forest/78">
                {t("providerDescription")}
              </p>

              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-forest-green/15 bg-forest-green/8 px-4 py-3 text-sm text-night-forest/82">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-forest-green" />
                <p>{t("providerConfirmation")}</p>
              </div>

              <div className="mt-5 border-t border-forest-green/15 pt-4">
                <p className="text-xs leading-relaxed text-night-forest/65">
                  {t("providerAlternative")}
                </p>
                <a
                  href="https://www.bedandbreakfast.nl/nl/a/jI6pxRAvIDuR/bb-klein-ockenburgh"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-forest-green underline decoration-current underline-offset-4 transition-colors hover:text-night-forest"
                >
                  {t("providerLink")}
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
