import Carousel from "./components/Carousel/Carousel";
import useProjectDetail from "./components/hooks/useProjectList";
import OverviewSection from "./components/OverviewSection/OverviewSection";
import PlatformSection from "./components/PlatformSection/PlatformSection";
import TechStacksSection from "./components/TechStacksSection/TechStacksSection";
import TitleSection from "./components/TitleSection/TitleSection";

function DetailPage() {
  const projectDetail = useProjectDetail(1);

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
