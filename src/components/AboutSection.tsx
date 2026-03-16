import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

export default function AboutSection() {
  const t = useTranslations("AboutSection");

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-candlelight text-night-forest"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-20 md:py-24 sm:px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/samen.jpg"
              alt={t("imageAlt")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </Reveal>

        <Reveal delayMs={90}>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-night-forest/80">
              {t("body")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
