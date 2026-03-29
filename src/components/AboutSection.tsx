"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function AboutSection() {
  const locale = useLocale();
  const t = useTranslations("AboutSection");
  const paragraphs = t("body").split("\n\n");

  return (
    <section
      key={locale}
      id="about"
      className="scroll-mt-24 bg-candlelight text-night-forest"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-16 px-4 py-20 sm:px-6 md:py-35 lg:grid-cols-2 lg:items-center lg:gap-40">
        {/* Room13 image — top on mobile, overlapping composition on desktop */}
        <Reveal className="order-1 lg:order-1">
          {/* Mobile */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg lg:hidden">
            <Image
              src="/exterior.jpg"
              alt={t("imageAltExterior")}
              fill
              className="h-full w-full scale-110 object-cover object-center"
            />
          </div>
          {/* Desktop: overlapping composition */}
          <div className="relative hidden w-full lg:block">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
              <Image
                src="/exterior.jpg"
                alt={t("imageAltExterior")}
                fill
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute -right-16 -bottom-12 aspect-3/4 w-2/5 overflow-hidden rounded-lg ring-3 ring-white/80 shadow-[0_14px_35px_rgba(0,0,0,0.25)]">
              <Image
                src="/samen.jpg"
                alt={t("imageAlt")}
                fill
                className="h-full w-full scale-125 object-cover object-right"
              />
            </div>
          </div>
        </Reveal>

        {/* Text — middle on mobile, right on desktop */}
        <Reveal delayMs={90} className="order-2 lg:order-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <div className="mt-12 space-y-4 text-base leading-relaxed text-night-forest/80">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-10 bg-forest-green/60" />
              <span className="text-sm font-semibold tracking-[0.22em] text-forest-green uppercase">
                {t("signature")}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Samen image — bottom on mobile only */}
        <Reveal className="order-3 lg:hidden">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src="/samen.jpg"
              alt={t("imageAlt")}
              fill
              className="h-full w-full scale-115 object-cover object-center"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
