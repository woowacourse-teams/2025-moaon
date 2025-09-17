import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import Tab from "@shared/components/Tab/Tab";
import type {
  ProjectArticle,
  ProjectArticleCount,
} from "@/apis/projectArticles/projectArticles.type";
import ArticleCard from "@/pages/article/ArticleBox/CardList/Card/ArticleCard";
import { useArticleSector } from "@/pages/article/hooks/useArticleSector";
import SectionTitle from "../SectionTitle";
import * as S from "./ArticleSection.styled";

const DEFAULT_ARTICLE_CATEGORY_TYPE = "all";

interface ArticleSectionProps {
  articles: ProjectArticle[];
  sectorCounts: ProjectArticleCount[];
  refetch: () => void;
  isRefetching: boolean;
  isLoading: boolean;
}

function ArticleSection({
  articles,
  sectorCounts,
  refetch,
  isLoading,
}: ArticleSectionProps) {
  const { selectedSector, updateSector } = useArticleSector(
    DEFAULT_ARTICLE_CATEGORY_TYPE,
  );

  const articleSectors = ARTICLE_SECTOR_ENTRY.map(([sector, { label }]) => ({
    key: sector,
    label,
    count: sectorCounts.find((item) => item.sector === sector)?.count ?? 0,
  }));

  const handleTabSelect = (key: ArticleSectorKey) => {
    if (key !== selectedSector) {
      updateSector(key);
      refetch();
    }
  };

  const hasResult =
    (selectedSector !== "all" && articles.length > 0) || !isLoading;

  return (
    <>
      {hasResult && (
        <S.ArticleSectionContainer>
          <SectionTitle title="프로젝트 아티클" />
          <Tab
            items={articleSectors}
            onSelect={handleTabSelect}
            selected={selectedSector}
            width={100}
          />
          <S.CardListContainer>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </S.CardListContainer>
        </S.ArticleSectionContainer>
      )}
    </>
  );
}

export default ArticleSection;
