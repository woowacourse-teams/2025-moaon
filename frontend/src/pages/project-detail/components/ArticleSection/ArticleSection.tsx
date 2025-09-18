import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import EmptyState from "@shared/components/EmptyState/EmptyState";
import SearchBar from "@shared/components/SearchBar/SearchBar";
import Tab from "@shared/components/Tab/Tab";
import type {
  ProjectArticle,
  ProjectArticleCount,
} from "@/apis/projectArticles/projectArticles.type";
import ArticleCard from "@/pages/article/ArticleBox/CardList/Card/ArticleCard";
import { useArticleSector } from "@/pages/article/hooks/useArticleSector";
import useProjectArticleSearch from "../hooks/useProjectArticleSearch";
import SectionTitle from "../SectionTitle";
import * as S from "./ArticleSection.styled";

const DEFAULT_ARTICLE_CATEGORY_TYPE = "all";
const SEARCH_INPUT_MAX_LENGTH = 50;

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
    DEFAULT_ARTICLE_CATEGORY_TYPE
  );
  const { handleSearchSubmit, searchValue } = useProjectArticleSearch();

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

  const onSearchSubmit = (value: string) => {
    handleSearchSubmit(value);
    refetch();
  };

  const hasResult =
    (selectedSector !== "all" && articles.length > 0) || !isLoading;

  const hasArticles = articles.length > 0;
  const isInitialEmpty = searchValue === undefined && !hasArticles;
  const isSearchEmpty = searchValue !== undefined && !hasArticles;
  const shouldShowSearchBar = hasArticles || searchValue !== undefined;

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

          {shouldShowSearchBar && (
            <S.SearchHeader>
              <S.ArticleDescriptionText>
                {hasArticles && (
                  <>
                    <S.ArticleIntroText>{articles.length}개</S.ArticleIntroText>
                    의 아티클이 모여있어요.
                  </>
                )}
              </S.ArticleDescriptionText>
              <S.SearchBarBox>
                <SearchBar
                  size="small"
                  placeholder="아티클 제목, 내용을 검색해보세요"
                  maxLength={SEARCH_INPUT_MAX_LENGTH}
                  onSubmit={onSearchSubmit}
                  defaultValue={searchValue}
                />
              </S.SearchBarBox>
            </S.SearchHeader>
          )}

          {isSearchEmpty && (
            <EmptyState
              description="검색어를 바꿔 다시 시도해 보세요."
              title="검색된 아티클이 없어요."
            />
          )}
          {isInitialEmpty && (
            <EmptyState
              description=""
              title="프로젝트에 등록된 아티클이 없어요."
            />
          )}

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
