import { BedDouble, Coffee, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";

const sellingPoints = [
  {
    title: "Prachtige locatie",
    description: "Rustig gelegen vlak bij strand, stad en groen.",
    icon: MapPin,
  },
  {
    title: "Inclusief ontbijt",
    description: "Elke ochtend een vers en uitgebreid ontbijt.",
    icon: Coffee,
  },
  {
    title: "1 kamer",
    description: "Persoonlijke aandacht in een kleinschalige setting.",
    icon: BedDouble,
  },
];

export default function SellingPointsSection() {
  return (
    <section id="selling-points" className="bg-candlelight text-night-forest">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 border-x border-forest-green/40">
        <div className="grid md:grid-cols-3 md:divide-x md:divide-forest-green/40">
          {sellingPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <Reveal
                key={point.title}
                delayMs={index * 70}
                className="flex flex-col items-center gap-3 border-b border-forest-green/40 px-5 py-8 text-center last:border-b-0 md:border-b-0"
              >
                <Icon
                  className="h-6 w-6 text-forest-green"
                  aria-hidden="true"
                />
                <h2 className="text-lg font-semibold tracking-tight">
                  {point.title}
                </h2>
                <p className="max-w-xs text-sm text-night-forest/75">
                  {point.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
