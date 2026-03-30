"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function DroneVideoSection() {
  const t = useTranslations("DroneVideoSection");
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-night-forest"
    >
      {/* Video */}
      <div className="relative aspect-4/3 w-full sm:aspect-16/7 lg:aspect-21/9">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/drone-shot.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-night-forest/40 via-transparent to-night-forest/50" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-night-forest/20 to-transparent" />

        {/* Caption */}
        <div className="absolute inset-0 flex items-end px-4 pb-8 sm:px-6 sm:pb-12">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-candlelight/50" />
                <p className="text-sm tracking-[0.2em] text-candlelight/80 uppercase sm:text-base">
                  {t("caption")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
