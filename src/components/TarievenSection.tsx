import Reveal from "@/components/Reveal";

export default function TarievenSection() {
  return (
    <section
      id="tarieven"
      className="scroll-mt-24 bg-midnight-grove text-candlelight"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-14">
        <Reveal className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Tarieven
          </h2>
          <p className="mt-3 text-base text-candlelight/80">
            Overzicht van kamerprijzen en verblijfsvoorwaarden.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-lg border border-forest-green/40 bg-night-forest/45 p-6">
            <h3 className="text-xl font-semibold text-aged-parchment">
              Seizoensprijzen
            </h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4 border-b border-forest-green/25 pb-3">
                <dt className="font-medium">
                  Laag seizoen (november t/m maart)
                </dt>
                <dd className="shrink-0 font-semibold">EUR 125,00 / nacht</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="font-medium">
                  Hoog seizoen (april t/m oktober)
                </dt>
                <dd className="shrink-0 font-semibold">EUR 145,00 / nacht</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-candlelight/80">
              Prijzen gelden voor 2 personen en zijn inclusief gratis ontbijt.
            </p>
            <p className="mt-2 text-sm text-candlelight/80">
              Bij boeking voor 1 persoon geldt EUR 15,00 korting per nacht.
            </p>
          </Reveal>

          <Reveal
            delayMs={90}
            className="rounded-lg border border-forest-green/40 bg-night-forest/45 p-6"
          >
            <h3 className="text-xl font-semibold text-aged-parchment">
              Voorwaarden
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-candlelight/85">
              <li>1 kamer beschikbaar voor maximaal 2 personen.</li>
              <li>Rookvrij verblijf.</li>
              <li>Huisdieren zijn niet toegestaan.</li>
              <li>Prijzen zijn inclusief BTW.</li>
              <li>
                Toeristenbelasting: EUR 6,20 per persoon per nacht (exclusief).
              </li>
              <li>
                Annuleren tot 1 week voor boeking: 50% terugbetaling. Daarna:
                0% terugbetaling.
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
