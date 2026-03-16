import AreaSection from "@/components/AreaSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";
import RoomSection from "@/components/RoomSection";
import ReservationSection from "@/components/ReservationSection";
import SellingPointsSection from "@/components/SellingPointsSection";
import TarievenSection from "@/components/TarievenSection";
import HeroHeader from "@/components/HeroHeader";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <>
      <Topbar />
      <HeroHeader />
      <SellingPointsSection />
      <AboutSection />
      <RoomSection />
      <AreaSection />
      <TarievenSection />
      <ReservationSection />
      <FooterSection />
    </>
  );
}
