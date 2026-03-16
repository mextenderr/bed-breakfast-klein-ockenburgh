import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Room", href: "#room" },
  { label: "Area", href: "#area" },
  { label: "Rates", href: "#tarieven" },
  { label: "Reservation", href: "#reservation" },
] as const;

export default function FooterSection() {
  return (
    <footer id="footer" className="bg-night-forest text-candlelight">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 border-t border-forest-green/35 pt-10 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div>
            <Image
              src="/logo.png"
              alt="Klein Ockenburgh"
              width={180}
              height={54}
              className="h-12 w-auto rounded-full"
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-candlelight/78">
              Bed & Breakfast Klein Ockenburgh is a small-scale stay in The
              Hague, close to the beach, dunes and the city.
            </p>
            <div className="mt-5 space-y-2 text-sm text-candlelight/82">
              <p>Email: info@kleinockenburgh.nl</p>
              <p>Phone: +31 70 123 45 67</p>
              <p>Address: Mockingbirdlaan 12, 2554 XX Den Haag</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.16em] text-aged-parchment uppercase">
              Business details
            </h2>
            <dl className="mt-5 space-y-3 text-sm text-candlelight/82">
              <div>
                <dt className="font-medium text-candlelight">Registered name</dt>
                <dd>Bed & Breakfast Klein Ockenburgh</dd>
              </div>
              <div>
                <dt className="font-medium text-candlelight">Registration no.</dt>
                <dd>KVK 00000000</dd>
              </div>
              <div>
                <dt className="font-medium text-candlelight">VAT no.</dt>
                <dd>NL000000000B00</dd>
              </div>
              <div>
                <dt className="font-medium text-candlelight">Check-in</dt>
                <dd>15:00 - 21:00 by appointment</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.16em] text-aged-parchment uppercase">
              Quick links
            </h2>
            <nav className="mt-5 flex flex-col gap-2 text-sm text-candlelight/82">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-aged-parchment"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-6 rounded-3xl border border-forest-green/30 bg-midnight-grove/60 p-4 text-sm text-candlelight/78">
              Bedandbreakfast.nl listing available. Direct booking and
              availability can also be checked via our reservation section.
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-forest-green/25 pt-5 text-xs text-candlelight/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Bed & Breakfast Klein Ockenburgh. All rights reserved.</p>
          <p>Mock footer content. Replace with final legal and contact details.</p>
        </div>
      </div>
    </footer>
  );
}
