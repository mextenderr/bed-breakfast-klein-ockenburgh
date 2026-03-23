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
      <div className="mx-auto grid w-full max-w-7xl gap-32 px-4 py-20 md:py-35 sm:px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/samen.jpg"
              alt={t("imageAlt")}
              fill
              className="h-full w-full object-cover object-center"
            />
          </div>
        </Reveal>

        <Reveal delayMs={90}>
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
      </div>
    </section>
  );
}
