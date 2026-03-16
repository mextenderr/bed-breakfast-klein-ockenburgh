"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";

const SUPPORTED_LOCALES = ["nl-NL", "en-GB"] as const;

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("Topbar");
  const pathname = usePathname();
  const locale = useLocale();

  const navItems = [
    { label: t("home"), targetId: "hero" },
    { label: t("about"), targetId: "about" },
    { label: t("room"), targetId: "room" },
    { label: t("area"), targetId: "area" },
    { label: t("rates"), targetId: "tarieven" },
    { label: t("reservation"), targetId: "reservation" },
  ];

  const scrollToSection = (targetId: string) => {
    const section = document.getElementById(targetId);
    if (!section) return;

    const topPosition = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(0, topPosition),
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  const switchLanguage = (nextLocale: (typeof SUPPORTED_LOCALES)[number]) => {
    if (nextLocale === locale) return;
    const localizedPath = getPathname({
      href: pathname,
      locale: nextLocale,
    });
    window.location.assign(localizedPath);
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-aged-parchment">
      <div
        data-topbar
        className={`flex w-full items-center justify-between px-4 sm:px-10 lg:px-25 transition-[height,background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
          isScrolled
            ? "h-20 bg-night-forest/60 shadow-[0_14px_34px_rgba(12,20,14,0.28)] backdrop-blur-xl"
            : "h-25 bg-night-forest/10 backdrop-blur-xs"
        }`}
      >
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="inline-flex items-center rounded-full transition-transform duration-300 ease-out hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aged-parchment/70 focus-visible:ring-offset-2 focus-visible:ring-offset-night-forest motion-reduce:transition-none"
          aria-label={t("brand")}
        >
          <Image
            src="/logo.png"
            alt={t("brand")}
            width={160}
            height={48}
            priority
            className={`w-auto rounded-full transition-[height,filter] duration-300 ease-out motion-reduce:transition-none ${
              isScrolled
                ? "h-10 drop-shadow-none"
                : "h-12 drop-shadow-[0_12px_26px_rgba(12,20,14,0.26)]"
            }`}
          />
        </button>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.targetId}
                type="button"
                onClick={() => scrollToSection(item.targetId)}
                className="text-sm font-medium text-candlelight/82 transition-colors duration-200 hover:cursor-pointer hover:text-aged-parchment focus-visible:outline-none focus-visible:text-aged-parchment"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div
            className="inline-flex overflow-hidden border border-candlelight/18 bg-night-forest/25 shadow-[0_10px_24px_rgba(12,20,14,0.12)]"
            aria-label={t("languageLabel")}
          >
            {SUPPORTED_LOCALES.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => switchLanguage(language)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none ${
                  locale === language
                    ? "bg-candlelight/14 text-aged-parchment"
                    : "bg-transparent text-candlelight/70 hover:cursor-pointer hover:bg-candlelight/8 hover:text-candlelight"
                }`}
              >
                {language === "en-GB" ? "EN" : "NL"}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-candlelight/18 bg-night-forest/25 transition-colors duration-200 hover:bg-night-forest/38 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aged-parchment/70 focus-visible:ring-offset-2 focus-visible:ring-offset-night-forest md:hidden"
          aria-expanded={menuOpen}
          aria-label={t("menuToggle")}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6L18 18M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          className={`px-4 py-3 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none md:hidden ${
            isScrolled
              ? "mx-auto mt-2 w-[calc(100%-2rem)] max-w-7xl rounded-2xl border border-candlelight/12 bg-night-forest/88 shadow-[0_18px_42px_rgba(12,20,14,0.28)]"
              : "border-b border-candlelight/10 bg-night-forest/82"
          }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.targetId}
                type="button"
                onClick={() => scrollToSection(item.targetId)}
                className="rounded-xl px-3 py-2 text-left text-sm font-medium text-candlelight/84 transition-colors duration-200 hover:bg-candlelight/8 hover:text-aged-parchment focus-visible:outline-none focus-visible:bg-candlelight/8"
              >
                {item.label}
              </button>
            ))}

            <div className="mt-2 flex items-center justify-start gap-2">
              {SUPPORTED_LOCALES.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => switchLanguage(language)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none ${
                    locale === language
                      ? "border-candlelight/25 bg-candlelight/14 text-aged-parchment"
                      : "border-candlelight/16 bg-transparent text-candlelight/70 hover:bg-candlelight/8 hover:text-candlelight"
                  }`}
                >
                  {language === "en-GB" ? "EN" : "NL"}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
