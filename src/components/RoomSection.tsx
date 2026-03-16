"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMessages, useTranslations } from "next-intl";
import {
  BedDouble,
  DoorOpen,
  MonitorPlay,
  Wifi,
  Bath,
  Snowflake,
  House,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const roomImages = Array.from({ length: 16 }, (_, index) => ({
  src: `/room${index + 1}.jpg`,
}));

type RoomImageLayout = {
  rowSpan?: 1 | 2 | 3;
  aspectClass?: string;
};

const roomImageLayoutMap: Record<string, RoomImageLayout> = {
  // Configure here which images should span two rows on md+ screens.
  // Example: "/room3.jpg": { rowSpan: 2, aspectClass: "aspect-[3/2]" },
  "/room3.jpg": { rowSpan: 3 },
  "/room8.jpg": { rowSpan: 2 },
  "/room13.jpg": { rowSpan: 2 },
};

const MOBILE_BATCH_SIZE = 4;

type RoomMessages = {
  RoomSection?: {
    highlights?: string[];
  };
};

const roomHighlightIcons = [
  BedDouble,
  Bath,
  Snowflake,
  House,
  DoorOpen,
  Wifi,
  MonitorPlay,
];

export default function RoomSection() {
  const t = useTranslations("RoomSection");
  const messages = useMessages() as RoomMessages;
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );
  const [mobileVisibleCount, setMobileVisibleCount] = useState(() =>
    typeof window !== "undefined" && window.innerWidth >= 640
      ? roomImages.length
      : MOBILE_BATCH_SIZE,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const onViewportChange = (mobile: boolean) => {
      setIsMobile(mobile);
      setMobileVisibleCount(mobile ? MOBILE_BATCH_SIZE : roomImages.length);
    };

    const handleChange = (event: MediaQueryListEvent) =>
      onViewportChange(event.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const visibleImages = isMobile
    ? roomImages.slice(0, mobileVisibleCount)
    : roomImages;
  const hasMoreMobileImages =
    isMobile && mobileVisibleCount < roomImages.length;
  const highlights = Array.isArray(messages.RoomSection?.highlights)
    ? messages.RoomSection.highlights
    : [];

  const showMoreMobileImages = () => {
    setMobileVisibleCount((current) =>
      Math.min(current + MOBILE_BATCH_SIZE, roomImages.length),
    );
  };

  return (
    <section
      id="room"
      className="scroll-mt-24 bg-night-forest text-candlelight py-35"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-6 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-candlelight/80">{t("intro")}</p>
        </Reveal>

        <Reveal delayMs={60} className="my-16">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map((label, index) => {
              const Icon = roomHighlightIcons[index];
              if (!Icon) return null;

              return (
                <div
                  key={`${label}-${index}`}
                  className="flex items-center gap-3 rounded-3xl border border-forest-green/35 bg-midnight-grove/55 px-4 py-4 shadow-[0_14px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-forest-green/18 text-aged-parchment">
                    <Icon className="size-4" />
                  </div>
                  <p className="text-sm leading-relaxed text-candlelight/88">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      <div className="w-full px-4 pb-14 sm:px-6 md:pb-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[140px] md:grid-cols-3 lg:grid-cols-4">
          {visibleImages.map((image, index) => {
            const layout = roomImageLayoutMap[image.src];
            const rowSpanClass =
              layout?.rowSpan === 3
                ? "md:row-span-3"
                : layout?.rowSpan === 2
                  ? "md:row-span-2"
                  : "";
            const aspectClass = layout?.aspectClass ?? "aspect-[16/10]";

            return (
              <Reveal
                key={image.src}
                delayMs={(index % 4) * 55}
                className={`group relative overflow-hidden rounded-lg border border-forest-green/40 ${rowSpanClass}`}
              >
                <div
                  className={`relative w-full ${aspectClass} md:h-full md:aspect-auto`}
                >
                  <Image
                    src={image.src}
                    alt={t("imageAlt", { index: index + 1 })}
                    fill
                    sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        {hasMoreMobileImages ? (
          <button
            type="button"
            onClick={showMoreMobileImages}
            className="mt-5 text-sm font-medium text-aged-parchment underline decoration-forest-green underline-offset-4 transition-colors hover:text-candlelight sm:hidden"
          >
            {t("showMore")}
          </button>
        ) : null}
      </div>
    </section>
  );
}
