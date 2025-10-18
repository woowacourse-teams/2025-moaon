import MoveTop from "@shared/components/MoveTop/MoveTop";
import FeatureSection from "./FeatureSection/FeatureSection";
import HeroSection from "./HeroSection/HeroSection";
import LandingBannerSection from "./LandingBannerSection/LandingBannerSection";
import TargetUsersSection from "./TargetUsersSection/TargetUsersSection";

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
