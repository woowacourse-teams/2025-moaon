import MoveTop from "@shared/components/MoveTop/MoveTop";
import FeatureSection from "./components/FeatureSection/FeatureSection";
import HeroSection from "./components/HeroSection/HeroSection";
import LandingBannerSection from "./components/LandingBannerSection/LandingBannerSection";
import TargetUsersSection from "./components/WhoSection/TargetUsersSection";

function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeatureSection />
      <TargetUsersSection />
      <LandingBannerSection />
      <MoveTop />
    </main>
  );
}

export default LandingPage;
