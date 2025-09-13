import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import EmptyState from "@shared/components/EmptyState/EmptyState";
import Tab from "@shared/components/Tab/Tab";
import type { Article } from "@/apis/articles/articles.type";
import Card from "@/pages/article/ArticleBox/CardList/Card/Card";
import { useArticleCategory } from "@/pages/article/hooks/useArticleCategory";
import SectionTitle from "../SectionTitle";
import * as S from "./ArticleSection.styled";

const DEFAULT_ARTICLE_CATEGORY_TYPE = "all";

interface ArticleSectionProps {
  articles: Article[];
  refetch: () => void;
  isRefetching: boolean;
  isLoading: boolean;
}

function ArticleSection({
  articles,
  refetch,
  isRefetching,
  isLoading,
}: ArticleSectionProps) {
  const { selectedCategory, updateCategory } = useArticleCategory(
    DEFAULT_ARTICLE_CATEGORY_TYPE,
  );

  const articleCategories = ARTICLE_SECTOR_ENTRY.map(([key, { label }]) => ({
    key,
    label,
  }));

  const handleTabSelect = (key: ArticleSectorKey) => {
    if (key !== selectedCategory) {
      updateCategory(key);
      refetch();
    }
  };

  const showEmpty = articles.length <= 0 && !isRefetching;
  const hasResult =
    (selectedCategory !== "all" && articles.length > 0) || !isLoading;

  return (
    <>
      {hasResult && (
        <S.ArticleSectionContainer>
          <SectionTitle title="프로젝트 아티클" />
          <Tab
            items={articleCategories}
            onSelect={handleTabSelect}
            selected={selectedCategory}
            width={100}
          />
          <S.CardListContainer>
            {showEmpty ? (
              <S.EmptyContainer>
                <EmptyState
                  title="해당 카테고리의 아티클이 없어요."
                  description=""
                />
              </S.EmptyContainer>
            ) : (
              articles.map((article) => (
                <Card key={article.id} article={article} />
              ))
            )}
          </S.CardListContainer>
        </S.ArticleSectionContainer>
      )}
    </>
  );
}

export default ArticleSection;
