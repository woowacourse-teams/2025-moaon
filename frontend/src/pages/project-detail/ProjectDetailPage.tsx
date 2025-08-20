import { useParams } from "react-router";
import ArticleSection from "./components/ArticleSection/ArticleSection";
import Carousel from "./components/Carousel/Carousel";
import useProjectArticles from "./components/hooks/useProjectArticles";
import useProjectDetail from "./components/hooks/useProjectDetail";
import OverviewSection from "./components/OverviewSection/OverviewSection";
import TechStacksSection from "./components/TechStacksSection/TechStacksSection";
import TitleSection from "./components/TitleSection/TitleSection";

function ProjectDetailPage() {
  const { id } = useParams();

  const { projectDetail, isLoading, error } = useProjectDetail(Number(id));
  const { projectArticles, refetch, isRefetching } = useProjectArticles(
    Number(id),
  );

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
      <ArticleSection
        articles={projectArticles}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    </div>
  );
}

export default ProjectDetailPage;
