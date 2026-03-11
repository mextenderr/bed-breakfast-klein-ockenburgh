import Reveal from "@/components/Reveal";

export default function ReservationModule() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20">
      <div className="grid gap-8 md:grid-cols-12 md:items-start">
        <Reveal className="max-w-3xl md:col-span-4">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Reserveren
          </h2>
          <p className="mt-3 text-base text-candlelight/80">
            Controleer direct de beschikbaarheid en reserveer eenvoudig je
            verblijf bij Bed & Breakfast Klein Ockenburgh.
          </p>
        </Reveal>

        <Reveal
          delayMs={100}
          className="overflow-hidden rounded-lg border border-forest-green/45 bg-midnight-grove/50 shadow-sm md:col-span-8"
        >
          <iframe
            title="Reservation module"
            src="https://www.bedandbreakfast.nl/nl/ibook/v2/jI6pxRAvIDuR/black/transparent"
            width="100%"
            height="780px"
            allowTransparency
          />
        </Reveal>
      </div>
    </div>
  );
}
