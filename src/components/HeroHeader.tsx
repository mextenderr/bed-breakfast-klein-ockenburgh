"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function HeroHeader() {
  const t = useTranslations("HomePage");
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [hasStartedScrolling, setHasStartedScrolling] = useState(false);

  const goToReservation = () => {
    const section = document.getElementById("reservation");
    if (!section) return;

    const topPosition = section.getBoundingClientRect().top;

    window.scrollTo({
      top: Math.max(0, topPosition),
      behavior: "smooth",
    });
  };

  const goToNextSection = () => {
    const section = document.getElementById("about");
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY <= 0) return;

      setHasStartedScrolling(true);
      setShowScrollIndicator(false);
    };

    onScroll();

    const timeoutId = window.setTimeout(() => {
      if (!window.scrollY) {
        setShowScrollIndicator(true);
      }
    }, 15000);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-linear-to-t from-night-forest/60 via-night-forest/20 to-transparent" />

      <div className="relative z-10 mx-25 w-full flex h-full items-end justify-start text-center text-aged-parchment">
        <div className="flex max-w-7xl flex-col mb-25">
          <Reveal>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-candlelight/70" />
              <h3 className="text-left text-lg font-semibold tracking-[0.22em] text-candlelight/80 uppercase sm:text-xl">
                {t("eyebrow")}
              </h3>
            </div>
          </Reveal>
          <Reveal delayMs={500}>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-7xl mt-5 mb-10">
              {t("heroTitle")}
            </h1>
          </Reveal>
          <Reveal delayMs={1000}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <Button
                onClick={goToReservation}
                className="group relative h-auto overflow-hidden border border-candlelight/30 bg-candlelight px-7 py-4 text-base font-semibold text-night-forest shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#f6f0da] hover:shadow-[0_18px_42px_rgba(0,0,0,0.36)] sm:px-9 sm:py-5 sm:text-lg"
              >
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_55%)] opacity-70" />
                <span className="pointer-events-none absolute inset-y-0 -left-16 w-14 -skew-x-12 bg-white/45 opacity-0 transition-all duration-500 group-hover:translate-x-[280px] group-hover:opacity-100" />
                <span className="relative z-10">{t("ctaPrimary")}</span>
                <ArrowRight className="relative z-10 size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <button
                type="button"
                onClick={goToReservation}
                className="cursor-pointer text-sm font-medium text-candlelight/72 underline decoration-current underline-offset-4 transition-colors hover:text-candlelight/90"
              >
                {t("ctaSecondary")}
              </button>
            </div>
          </Reveal>

          <button
            type="button"
            aria-label="Scroll to next section"
            onClick={goToNextSection}
            className={`absolute right-0 bottom-25 cursor-pointer transition-opacity duration-500 ${
              showScrollIndicator && !hasStartedScrolling
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <ArrowDown className="size-4 animate-bounce" />
          </button>
        </div>
      </div>
    </header>
  );
}
