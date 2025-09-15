import MoveTop from "@shared/components/MoveTop/MoveTop";
import FeatureSection from "./components/FeatureSection/FeatureSection";
import HeroSection from "./components/HeroSection/HeroSection";
import WhoSection from "./components/WhoSection/WhoSection";

function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeatureSection />
      <WhoSection />
      <MoveTop />
    </main>
  );
}

export default LandingPage;
