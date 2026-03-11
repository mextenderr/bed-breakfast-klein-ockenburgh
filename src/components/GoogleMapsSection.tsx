import Reveal from "@/components/Reveal";

export default function GoogleMapsSection() {
  return (
    <section id="googlemaps" className="scroll-mt-24 bg-candlelight text-night-forest">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="mb-6 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            GoogleMaps
          </h2>
          <p className="mt-3 text-base text-night-forest/80">
            Bekijk de locatie van Bed & Breakfast Klein Ockenburgh op de kaart.
          </p>
        </Reveal>

        <Reveal delayMs={90} className="overflow-hidden rounded-lg border border-forest-green/45 shadow-sm">
          <iframe
            title="Google Maps location"
            src="https://www.google.com/maps?q=Bed%20%26%20Breakfast%20Klein%20Ockenburgh%2C%20Den%20Haag&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
