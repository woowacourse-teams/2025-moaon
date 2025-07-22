import Carousel from "./components/carousel/Carousel";
import TitleSection from "./components/TitleSection/TitleSection";
import OverviewSection from "./components/OverviewSection/OverviewSection";

function DetailPage() {
  return (
    <div>
      <TitleSection />
      <Carousel />
      <OverviewSection />
    </div>
  );
}

export default DetailPage;
