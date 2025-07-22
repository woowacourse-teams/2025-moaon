import Carousel from "./components/Carousel/Carousel";
import TitleSection from "./components/TitleSection/TitleSection";
import OverviewSection from "./components/OverviewSection/OverviewSection";
import PlatformSection from "./components/PlatformSection/PlatformSection";
import TechStacksSection from "./components/TechStacksSection/TechStacksSection";

function DetailPage() {
  return (
    <div>
      <TitleSection />
      <Carousel />
      <OverviewSection />
      <TechStacksSection techStacks={["react"]} />
      <PlatformSection platforms={["web"]} />
    </div>
  );
}

export default DetailPage;
