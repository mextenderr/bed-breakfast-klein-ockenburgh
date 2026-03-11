import AreaSection from "@/components/AreaSection";
import AboutSection from "@/components/AboutSection";
import RoomSection from "@/components/RoomSection";
import ReservationModule from "@/components/ReservationModule";
import SellingPointsSection from "@/components/SellingPointsSection";
import GoogleMapsSection from "@/components/GoogleMapsSection";
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
      <GoogleMapsSection />

      <section
        id="reservation"
        className="scroll-mt-24 bg-card text-foreground"
      >
        <ReservationModule />
      </section>
    </>
  );
}
