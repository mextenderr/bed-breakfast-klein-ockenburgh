"use client";

import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const HEADER_OFFSET = 88;

export default function HeroHeader() {
  const t = useTranslations("HomePage");

  const goToReservation = () => {
    const section = document.getElementById("reservation");
    if (!section) return;

    const topPosition =
      section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({
      top: Math.max(0, topPosition),
      behavior: "smooth",
    });
  };

  return (
    <header
      id="hero"
      className="relative h-screen w-full overflow-hidden scroll-mt-24"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/b&b-klein-ockenburgh.jpg"
      >
        <source src="/promo-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-aged-parchment">
        <div className="flex max-w-7xl flex-col items-center gap-10">
          <Reveal>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {t("heroTitle")}
            </h1>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <Button
                onClick={goToReservation}
                className="group relative overflow-hidden px-10 shadow shadow-black/30 hover:scale-103 gap-3"
              >
                <span className="pointer-events-none absolute inset-y-0 -left-14 w-12 -skew-x-12 bg-candlelight/45 opacity-0 transition-all duration-500 group-hover:translate-x-[230px] group-hover:opacity-100" />
                <span className="relative z-10">{t("ctaPrimary")}</span>
                <ArrowRight className="relative z-10" />
              </Button>

              <button
                type="button"
                onClick={goToReservation}
                className="text-sm font-medium text-candlelight underline decoration-forest-green/80 underline-offset-4 transition-colors hover:text-aged-parchment"
              >
                {t("ctaDiscoverRoom")}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
