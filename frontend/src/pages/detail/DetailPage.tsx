import Carousel from "./components/Carousel/Carousel";
import TechStacksSection from "./components/TechStacksSection/TechStacksSection";

function DetailPage() {
  return (
    <div>
      <Carousel />
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
