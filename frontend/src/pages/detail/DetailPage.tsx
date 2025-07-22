import Carousel from "./components/Carousel/Carousel";
import PlatformSection from "./components/PlatformSection/PlatformSection";
import TechStacksSection from "./components/TechStacksSection/TechStacksSection";

function DetailPage() {
  return (
    <div>
      <Carousel />
      <TechStacksSection techStacks={["react"]} />
      <PlatformSection platforms={["web"]} />
    </div>
  );
}

export default DetailPage;
