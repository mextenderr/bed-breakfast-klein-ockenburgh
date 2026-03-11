"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const roomImages = Array.from({ length: 16 }, (_, index) => ({
  src: `/room${index + 1}.jpg`,
  alt: `Room photo ${index + 1}`,
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

export default function RoomSection() {
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

  const showMoreMobileImages = () => {
    setMobileVisibleCount((current) =>
      Math.min(current + MOBILE_BATCH_SIZE, roomImages.length),
    );
  };

  return (
    <section
      id="room"
      className="scroll-mt-24 bg-night-forest text-candlelight"
    >
      <div className="mx-auto w-full max-w-7xl px-4 pt-14 sm:px-6 md:pt-16">
        <Reveal className="mb-6 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Room
          </h2>
          <p className="mt-3 text-base text-candlelight/80">
            Bekijk alle foto&apos;s van de kamer en sfeer van het verblijf.
          </p>
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
                    alt={image.alt}
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
            show more
          </button>
        ) : null}
      </div>
    </section>
  );
}
