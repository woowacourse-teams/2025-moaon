import { useParams } from "react-router";
import Carousel from "./components/Carousel/Carousel";
import useProjectDetail from "./components/hooks/useProjectDetail";
import OverviewSection from "./components/OverviewSection/OverviewSection";
import PlatformSection from "./components/PlatformSection/PlatformSection";
import TechStacksSection from "./components/TechStacksSection/TechStacksSection";
import TitleSection from "./components/TitleSection/TitleSection";

function DetailPage() {
  const { id } = useParams();

  const { projectDetail, isLoading, error } = useProjectDetail(Number(id));

  if (isLoading || !projectDetail) return <div>로딩 중...</div>;
  if (error) return <div>비상!</div>;

  return (
    <div>
      <TitleSection projectDetail={projectDetail} />
      <Carousel imageUrls={projectDetail.imageUrls} />
      <OverviewSection overview={projectDetail.description} />
      <TechStacksSection techStacks={projectDetail.techStacks} />
      <PlatformSection platforms={projectDetail.platforms} />
    </div>
  );
}

export default DetailPage;
