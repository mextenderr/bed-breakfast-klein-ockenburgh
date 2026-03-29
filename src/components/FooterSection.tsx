"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, getPathname, usePathname } from "@/i18n/navigation";

export default function FooterSection() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("FooterSection");
  const isHomePage = pathname === "/";
  const homePath = getPathname({ href: "/", locale });
  const quickLinks = [
    {
      label: t("quickLinks.home"),
      href: isHomePage ? "#hero" : `${homePath}#hero`,
    },
    {
      label: t("quickLinks.about"),
      href: isHomePage ? "#about" : `${homePath}#about`,
    },
    {
      label: t("quickLinks.room"),
      href: isHomePage ? "#room" : `${homePath}#room`,
    },
    {
      label: t("quickLinks.area"),
      href: isHomePage ? "#area" : `${homePath}#area`,
    },
    {
      label: t("quickLinks.rates"),
      href: isHomePage ? "#tarieven" : `${homePath}#tarieven`,
    },
    {
      label: t("quickLinks.reservation"),
      href: isHomePage ? "#reservation" : `${homePath}#reservation`,
    },
  ] as const;

  return (
    <footer
      key={locale}
      id="footer"
      className="bg-night-forest text-candlelight"
    >
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
              {t("description")}
            </p>
            <div className="mt-5 space-y-2 text-sm text-candlelight/82">
              <p>{t("contact.email")}</p>
              <p>{t("contact.phone")}</p>
              <p>{t("contact.address")}</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.16em] text-aged-parchment uppercase">
              {t("details.title")}
            </h2>
            <dl className="mt-5 space-y-3 text-sm text-candlelight/82">
              <div>
                <dt className="font-medium text-candlelight">
                  {t("details.items.registeredName.label")}
                </dt>
                <dd>{t("details.items.registeredName.value")}</dd>
              </div>
              <div>
                <dt className="font-medium text-candlelight">
                  {t("details.items.breakfast.label")}
                </dt>
                <dd>{t("details.items.breakfast.value")}</dd>
              </div>
              <div>
                <dt className="font-medium text-candlelight">
                  {t("details.items.parking.label")}
                </dt>
                <dd>{t("details.items.parking.value")}</dd>
              </div>
              <div>
                <dt className="font-medium text-candlelight">
                  {t("details.items.checkIn.label")}
                </dt>
                <dd>{t("details.items.checkIn.value")}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.16em] text-aged-parchment uppercase">
              {t("quickLinks.title")}
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
              <Link
                href="/conditions"
                className="transition-colors hover:text-aged-parchment"
              >
                {t("legal.conditions")}
              </Link>
            </nav>

            <div className="mt-6 rounded-3xl border border-forest-green/30 bg-midnight-grove/60 p-4 text-sm text-candlelight/78">
              {t("listingNote")}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-forest-green/25 pt-5 text-xs text-candlelight/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("bottom.copyright")}</p>
          <div className="flex flex-col gap-2 sm:items-end">
            <Link
              href="/conditions"
              className="text-candlelight/72 transition-colors hover:text-aged-parchment"
            >
              {t("legal.conditions")}
            </Link>
            <p>{t("bottom.note")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
