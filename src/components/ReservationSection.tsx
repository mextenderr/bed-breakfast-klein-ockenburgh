"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { Link } from "@/i18n/navigation";

export default function ReservationSection() {
  const locale = useLocale();
  const t = useTranslations("ReservationSection");

  return (
    <section
      key={locale}
      id="reservation"
      className="scroll-mt-24 bg-candlelight text-night-forest"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-35">
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
            <div className="relative overflow-hidden rounded-3xl border border-forest-green/20 bg-linear-to-b from-candlelight to-forest-green/5 p-6 shadow-[0_18px_40px_rgba(29,43,28,0.14)]">
              <div className="absolute -top-3 -right-3 size-20">
                <Image
                  src="/bedenbreakfastnl.png"
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>

              <p className="font-semibold text-night-forest">
                {t("paymentTitle")}
              </p>
              <div className="mt-10 space-y-3 leading-relaxed text-night-forest/70">
                {(t.raw("paymentParagraphs") as string[]).map(
                  (paragraph, index) => (
                    <p key={index}>
                      {index === 0
                        ? paragraph
                            .split("bedandbreakfast.nl")
                            .map((part, i, arr) =>
                              i < arr.length - 1 ? (
                                <span key={i}>
                                  {part}
                                  <a
                                    href="https://www.bedandbreakfast.nl/nl/a/jI6pxRAvIDuR/bb-klein-ockenburgh"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-medium text-forest-green underline decoration-current underline-offset-4 transition-colors hover:text-night-forest"
                                  >
                                    bedandbreakfast.nl
                                  </a>
                                </span>
                              ) : (
                                <span key={i}>{part}</span>
                              ),
                            )
                        : paragraph}
                    </p>
                  ),
                )}
              </div>

              <div className="mt-5 rounded-2xl border border-forest-green/15 bg-night-forest/4 px-4 py-3">
                <p className="text-xs leading-relaxed text-night-forest/70">
                  {t("bookingNotice")}
                </p>
                <Link
                  href="/conditions"
                  className="mt-2 inline-flex text-sm font-medium text-forest-green underline decoration-current underline-offset-4 transition-colors hover:text-night-forest"
                >
                  {t("bookingNoticeLink")}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
