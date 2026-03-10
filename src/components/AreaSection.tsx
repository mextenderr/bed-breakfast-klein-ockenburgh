"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMessages, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type AreaPlace = {
  name: string;
  description: string;
  imageSrc?: string;
  distance?: string;
  category?: string;
  linkLabel?: string;
  linkHref?: string;
};

type AreaAccessibility = {
  title: string;
  paragraphs: string[];
  linkLabel?: string;
  linkHref?: string;
};

type AreaMessages = {
  AreaSection?: {
    accessibility?: AreaAccessibility;
    places?: AreaPlace[];
  };
};

export default function AreaSection() {
  const t = useTranslations("AreaSection");
  const messages = useMessages() as AreaMessages;
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const accessibility = messages.AreaSection?.accessibility;
  const places = Array.isArray(messages.AreaSection?.places)
    ? messages.AreaSection.places
    : [];

  useEffect(() => {
    if (!carouselApi || places.length < 2) return;

    const intervalId = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [carouselApi, places.length]);

  return (
    <section
      id="area"
      className="scroll-mt-24 bg-candlelight text-night-forest"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-midnight-grove sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-night-forest/80">{t("intro")}</p>
        </div>

        {accessibility ? (
          <article className="mb-8 rounded-lg border border-forest-green/45 bg-candlelight/80 p-6">
            <h3 className="text-xl font-semibold text-midnight-grove">
              {accessibility.title}
            </h3>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-night-forest/85">
              {accessibility.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {accessibility.linkHref && accessibility.linkLabel ? (
              <a
                href={accessibility.linkHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-medium text-midnight-grove underline decoration-forest-green underline-offset-4 transition-colors hover:text-forest-green"
              >
                {accessibility.linkLabel}
              </a>
            ) : null}
          </article>
        ) : null}

        {places.length > 0 ? (
          <Carousel
            setApi={setCarouselApi}
            opts={{ loop: true, align: "start" }}
            className="mx-auto w-full max-w-6xl px-10"
          >
            <CarouselContent>
              {places.map((place) => (
                <CarouselItem
                  key={`${place.name}-${place.distance ?? "n-a"}`}
                  className="basis-full lg:basis-1/3"
                >
                  <article className="h-full overflow-hidden rounded-lg border border-forest-green/45 bg-candlelight/85">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={place.imageSrc ?? "/b&b-klein-ockenburgh.jpg"}
                        alt={place.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold text-midnight-grove">
                          {place.name}
                        </h3>
                        {place.distance ? (
                          <span className="shrink-0 rounded-full bg-forest-green/15 px-2 py-1 text-xs font-medium text-midnight-grove">
                            {place.distance}
                          </span>
                        ) : null}
                      </div>

                      {place.category ? (
                        <p className="mb-2 text-xs font-medium tracking-wide text-forest-green uppercase">
                          {place.category}
                        </p>
                      ) : null}

                      <p className="text-sm leading-relaxed text-night-forest/85">
                        {place.description}
                      </p>

                      {place.linkHref && place.linkLabel ? (
                        <a
                          href={place.linkHref}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block text-sm font-medium text-midnight-grove underline decoration-forest-green underline-offset-4 transition-colors hover:text-forest-green"
                        >
                          {place.linkLabel}
                        </a>
                      ) : null}
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 border-forest-green/55 bg-candlelight text-midnight-grove hover:bg-forest-green/15 hover:text-midnight-grove" />
            <CarouselNext className="-right-3 border-forest-green/55 bg-candlelight text-midnight-grove hover:bg-forest-green/15 hover:text-midnight-grove" />
          </Carousel>
        ) : (
          <p className="rounded-lg border border-dashed border-forest-green/45 bg-candlelight/70 p-5 text-sm text-night-forest/85">
            {t("empty")}
          </p>
        )}
      </div>
    </section>
  );
}
