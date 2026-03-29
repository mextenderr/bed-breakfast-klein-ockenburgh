"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  BedDouble,
  DoorOpen,
  MonitorPlay,
  Wifi,
  Bath,
  Snowflake,
  House,
  ChevronDown,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Lightbox from "@/components/Lightbox";

// Ordered list of room images. Mobile renders in this exact order.
// rowSpan controls desktop grid row span (default 1).
const roomImages: { src: string; rowSpan?: 1 | 2 | 3 }[] = [
  { src: "/room12.jpg", rowSpan: 2 },
  { src: "/room11.jpg", rowSpan: 1 },
  { src: "/room5.jpg", rowSpan: 2 },
  { src: "/room10.jpg", rowSpan: 1 },
  { src: "/room6.jpg", rowSpan: 2 },
  { src: "/room7.jpg", rowSpan: 1 },
  { src: "/room3.jpg", rowSpan: 3 },
  { src: "/room9.jpg", rowSpan: 2 },
  { src: "/room8.jpg", rowSpan: 2 },
  { src: "/room2.jpg", rowSpan: 1 },
  { src: "/room1.jpg", rowSpan: 1 },
  { src: "/room4.jpg", rowSpan: 2 },
  { src: "/room14.jpg", rowSpan: 2 },
  { src: "/room15.jpg", rowSpan: 1 },
  { src: "/room16.jpg", rowSpan: 2 },
];

const MOBILE_BATCH_SIZE = 4;

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
  const locale = useLocale();
  const t = useTranslations("RoomSection");
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );
  const [mobileVisibleCount, setMobileVisibleCount] = useState(() =>
    typeof window !== "undefined" && window.innerWidth >= 640
      ? roomImages.length
      : MOBILE_BATCH_SIZE,
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
  const rawHighlights = t.raw("highlights");
  const highlights = Array.isArray(rawHighlights)
    ? (rawHighlights as string[])
    : [];

  const showMoreMobileImages = () => {
    setMobileVisibleCount((current) =>
      Math.min(current + MOBILE_BATCH_SIZE, roomImages.length),
    );
  };

  return (
    <section
      key={locale}
      id="room"
      className="scroll-mt-24 overflow-x-clip bg-midnight-grove text-candlelight py-20 md:py-35"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-6 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-candlelight/80">{t("intro")}</p>
        </Reveal>

        <div className="my-16 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((label, index) => {
            const Icon = roomHighlightIcons[index];
            if (!Icon) return null;

            const direction = index % 2 === 0 ? "left" : "right";

            return (
              <Reveal
                key={`${label}-${index}`}
                direction={direction}
                distance={40}
                delayMs={index * 80}
              >
                <div className="flex items-center gap-3 rounded-3xl border border-forest-green/15 bg-candlelight px-4 py-4 shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-forest-green/15 text-night-forest">
                    <Icon className="size-4" />
                  </div>
                  <p className="text-sm leading-relaxed text-night-forest/85">
                    {label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="w-full px-4 pb-8 sm:px-6 md:pb-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[140px] md:grid-cols-3 lg:grid-cols-4">
          {visibleImages.map((image, index) => {
            const rowSpanClass =
              image.rowSpan === 3
                ? "md:row-span-3"
                : image.rowSpan === 2
                  ? "md:row-span-2"
                  : "";
            const aspectClass = "aspect-[16/10]";

            return (
              <Reveal
                key={image.src}
                delayMs={(index % 4) * 55}
                className={`group relative cursor-pointer overflow-hidden rounded-lg border border-forest-green/40 ${rowSpanClass}`}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={`relative block w-full ${aspectClass} md:h-full md:aspect-auto`}
                  aria-label={t("imageAlt", { index: index + 1 })}
                >
                  <Image
                    src={image.src}
                    alt={t("imageAlt", { index: index + 1 })}
                    fill
                    sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              </Reveal>
            );
          })}
        </div>

        {hasMoreMobileImages ? (
          <div className="mt-8 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={showMoreMobileImages}
              className="inline-flex items-center gap-2 rounded-full border border-forest-green/40 bg-midnight-grove/75 px-5 py-3 text-sm font-semibold text-aged-parchment shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-all duration-200 hover:border-aged-parchment/35 hover:bg-midnight-grove hover:text-candlelight"
            >
              <span>{t("showMore")}</span>
              <ChevronDown className="size-4" />
            </button>
          </div>
        ) : null}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={roomImages.map((img, i) => ({
            src: img.src,
            alt: t("imageAlt", { index: i + 1 }),
          }))}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
