import {
  ARTICLE_CATEGORY_ENTRY,
  type ArticleCategoryKey,
} from "@domains/filter/articleCategory";
import EmptyState from "@shared/components/EmptyState/EmptyState";
import Tab from "@shared/components/Tab/Tab";
import type { ProjectArticle } from "@/apis/projectArticles/projectArticles.type";
import Card from "@/pages/article/ArticleBox/CardList/Card/Card";
import { useArticleCategory } from "@/pages/article/hooks/useArticleCategory";
import SectionTitle from "../SectionTitle";
import * as S from "./ArticleSection.styled";

const DEFAULT_ARTICLE_CATEGORY_TYPE = "all";

interface ArticleSectionProps {
  projectArticles: ProjectArticle[];
  refetch: () => void;
  isRefetching: boolean;
}

function ArticleSection({
  projectArticles,
  refetch,
  isRefetching,
}: ArticleSectionProps) {
  const { selectedCategory, updateCategory } = useArticleCategory(
    DEFAULT_ARTICLE_CATEGORY_TYPE,
  );

  const articleCategories = ARTICLE_CATEGORY_ENTRY.map(([key, { label }]) => ({
    key,
    label,
  }));

  const handleTabSelect = (key: ArticleCategoryKey) => {
    if (key !== selectedCategory) {
      updateCategory(key);
      refetch();
    }
  };

  const showEmpty = projectArticles.length <= 0 && !isRefetching;
  const emptyResult = selectedCategory === "all" && projectArticles.length <= 0;

  return (
    <>
      {!emptyResult && (
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
              projectArticles.map((article) => (
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
