"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";

const SUPPORTED_LOCALES = ["nl-NL", "en-GB"] as const;

function getHeaderOffset() {
  const topbar = document.querySelector<HTMLElement>("[data-topbar]");
  return topbar ? topbar.getBoundingClientRect().bottom + 8 : 72;
}

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
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-4 transition-all duration-400 sm:px-6 ${
          isScrolled
            ? "mt-2 h-16 rounded-xl border border-forest-green/60 bg-night-forest/80 shadow-lg shadow-black/25 backdrop-blur-md"
            : "h-20 bg-black/30 backdrop-blur-sm"
        }`}
      >
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="inline-flex items-center transition-transform duration-300 hover:scale-[1.01]"
          aria-label={t("brand")}
        >
          <Image
            src="/logo.png"
            alt={t("brand")}
            width={160}
            height={48}
            priority
            className={`w-auto rounded-full transition-all duration-300 ${
              isScrolled ? "h-10" : "h-12"
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
                className="text-sm font-medium transition-opacity hover:opacity-80 hover:cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div
            className="inline-flex overflow-hidden rounded border border-forest-green"
            aria-label={t("languageLabel")}
          >
            {SUPPORTED_LOCALES.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => switchLanguage(language)}
                className={`px-2 py-1 text-xs font-semibold ${
                  locale === language
                    ? "bg-forest-green/60"
                    : "bg-transparent hover:cursor-pointer"
                }`}
              >
                {language === "en-GB" ? "EN" : "NL"}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-forest-green md:hidden"
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
          className={`px-4 py-3 backdrop-blur-sm transition-all md:hidden ${
            isScrolled
              ? "mx-auto mt-2 w-[calc(100%-2rem)] max-w-7xl rounded-xl border border-forest-green/60 bg-night-forest/90"
              : "border-b border-forest-green bg-black/80"
          }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.targetId}
                type="button"
                onClick={() => scrollToSection(item.targetId)}
                className="rounded px-2 py-2 text-left text-sm font-medium transition-colors hover:bg-forest-green/30"
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
                  className={`rounded border px-3 py-1 text-xs font-semibold ${
                    locale === language
                      ? "border-aged-parchment bg-forest-green/45"
                      : "border-forest-green bg-transparent"
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
