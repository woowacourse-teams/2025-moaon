import { useParams } from "react-router";
import Carousel from "./components/Carousel/Carousel";
import useProjectArticles from "./components/hooks/useProjectArticles";
import useProjectDetail from "./components/hooks/useProjectDetail";
import OverviewSection from "./components/OverviewSection/OverviewSection";
import SectionTitle from "./components/SectionTitle";
import TechStacksSection from "./components/TechStacksSection/TechStacksSection";
import TitleSection from "./components/TitleSection/TitleSection";

function ProjectDetailPage() {
  const { id } = useParams();

  const { projectDetail, isLoading, error } = useProjectDetail(Number(id));
  const { projectArticles } = useProjectArticles(Number(id));
  if (isLoading || !projectDetail) return <div>로딩 중...</div>;
  if (error) return <div>비상!</div>;

  return (
    <div>
      <TitleSection projectDetail={projectDetail} />
      <TechStacksSection techStacks={projectDetail.techStacks} />
      {projectDetail.imageUrls.length > 0 && (
        <Carousel imageUrls={projectDetail.imageUrls} />
      )}
      <OverviewSection overview={projectDetail.description} />
      <SectionTitle title="프로젝트 아티클" />
    </div>
  );
}

export default ProjectDetailPage;
