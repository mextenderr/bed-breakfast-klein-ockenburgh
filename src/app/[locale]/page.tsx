import { getTranslations } from "next-intl/server";
import AreaSection from "@/components/AreaSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";
import DroneVideoSection from "@/components/DroneVideoSection";
import RoomSection from "@/components/RoomSection";
import ReservationSection from "@/components/ReservationSection";
import SellingPointsSection from "@/components/SellingPointsSection";
import TarievenSection from "@/components/TarievenSection";
import HeroHeader from "@/components/HeroHeader";
import Topbar from "@/components/Topbar";
import { getSiteUrl, siteConfig } from "@/lib/site";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BedAndBreakfast",
    name: siteConfig.name,
    description: t("description"),
    url: new URL(`/${locale}`, siteUrl).toString(),
    image: new URL(siteConfig.image, siteUrl).toString(),
    email: siteConfig.email,
    areaServed: "The Hague",
    availableLanguage: siteConfig.locales,
    sameAs: [siteConfig.bedAndBreakfastListingUrl],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Breakfast included" },
      { "@type": "LocationFeatureSpecification", name: "Free parking on site" },
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi" },
      { "@type": "LocationFeatureSpecification", name: "Private bathroom" },
      { "@type": "LocationFeatureSpecification", name: "Air conditioning" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Topbar />
      <HeroHeader />
      <SellingPointsSection />
      <AboutSection />
      <DroneVideoSection />
      <RoomSection />
      <AreaSection />
      <TarievenSection />
      <ReservationSection />
      <FooterSection />
    </>
  );
}
