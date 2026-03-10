import AreaSection from "@/components/AreaSection";
import ReservationModule from "@/components/ReservationModule";
import HeroHeader from "@/components/HeroHeader";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <>
      <Topbar />
      <HeroHeader />
      <AreaSection />

      <section
        id="reservation"
        className="scroll-mt-24 bg-card text-foreground"
      >
        <ReservationModule />
      </section>
    </>
  );
}
