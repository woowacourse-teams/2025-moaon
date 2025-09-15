import { useMeta } from "@shared/hooks/useMeta";
import { useParams } from "react-router";
import ArticleSection from "./components/ArticleSection/ArticleSection";
import Carousel from "./components/Carousel/Carousel";
import useProjectDetailData from "./components/hooks/useProjectDetailData";
import OverviewSection from "./components/OverviewSection/OverviewSection";
import TechStacksSection from "./components/TechStacksSection/TechStacksSection";
import TitleSection from "./components/TitleSection/TitleSection";

function ProjectDetailPage() {
  const { id } = useParams();

  const {
    projectDetail,
    projectArticles,
    projectArticleRefetch,
    isProjectArticleRefetching,
    isProjectArticleLoading,
  } = useProjectDetailData(Number(id));

  useMeta({
    title: projectDetail
      ? `${projectDetail?.title} | 프로젝트 상세`
      : "프로젝트 상세",
    description:
      projectDetail?.summary || "프로젝트와 관련된 상세 정보를 확인하세요",
  });

  return (
    <div>
      <TitleSection projectDetail={projectDetail} />
      <TechStacksSection techStacks={projectDetail.techStacks} />
      {projectDetail.imageUrls.length > 0 && (
        <Carousel imageUrls={projectDetail.imageUrls} />
      )}
      <OverviewSection overview={projectDetail.description} />
      <ArticleSection
        articles={projectArticles.articles}
        sectorCounts={projectArticles.counts}
        refetch={projectArticleRefetch}
        isRefetching={isProjectArticleRefetching}
        isLoading={isProjectArticleLoading}
      />
    </div>
  );
}

export default ProjectDetailPage;
