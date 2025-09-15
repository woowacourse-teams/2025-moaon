import MoveTop from "@shared/components/MoveTop/MoveTop";
import FeatureSection from "./components/FeatureSection/FeatureSection";
import HeroSection from "./components/HeroSection/HeroSection";
import LandingBannerSection from "./components/LandingBannerSection/LandingBannerSection";
import WhoSection from "./components/WhoSection/WhoSection";

function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeatureSection />
      <WhoSection />
      <LandingBannerSection />
      <MoveTop />
    </main>
  );
}

export default LandingPage;
