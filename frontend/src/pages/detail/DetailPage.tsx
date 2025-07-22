import Carousel from "./components/carousel/Carousel";
import TitleSection from "./components/TitleSection/TitleSection";
import OverviewSection from "./components/OverviewSection/OverviewSection";
import Carousel from "./components/Carousel/Carousel";
import TechStacksSection from "./components/TechStacksSection/TechStacksSection";

function DetailPage() {
  return (
    <div>
      <TitleSection />
      <Carousel />
      <OverviewSection />
      <TechStacksSection
        techStacks={[
          "1",
          "2",
          "3",
          "4",
          "1",
          "2",
          "3",
          "4",
          "1",
          "2",
          "3",
          "4",
          "1",
          "2",
          "3",
          "4",
        ]}
      />
    </div>
  );
}

export default DetailPage;
