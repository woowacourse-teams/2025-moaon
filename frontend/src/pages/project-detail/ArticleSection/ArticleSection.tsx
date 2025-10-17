import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import Dropdown from "@shared/components/Dropdown/Dropdown";
import SearchBar from "@shared/components/SearchBar/SearchBar";
import Tab from "@shared/components/Tab/Tab";
import { toast } from "@shared/components/Toast/toast";
import type { QueryObserverResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type {
  ProjectArticle,
  ProjectArticleCount,
  ProjectArticlesResponse,
} from "@/apis/projectArticles/projectArticles.type";
import SectionTitle from "../SectionTitle/SectionTitle";
import * as S from "./ArticleSection.styled";
import CardList from "./CardList/CardList";
import EmptyArticleList from "./EmptyArticleList/EmptyArticleList";
import { useArticleSector } from "./hooks/useArticleSector";
import useProjectArticleSearch from "./hooks/useProjectArticleSearch";

const DEFAULT_ARTICLE_CATEGORY_TYPE = "all";
const SEARCH_INPUT_MAX_LENGTH = 50;

interface ArticleSectionProps {
  articles: ProjectArticle[];
  sectorCounts: ProjectArticleCount[];
  refetch: () => Promise<QueryObserverResult<ProjectArticlesResponse, Error>>;
  isRefetching: boolean;
  isLoading: boolean;
}

const MOBILE_BREAKPOINT = 1280;

function ArticleSection({
  articles,
  sectorCounts,
  refetch,
}: ArticleSectionProps) {
  const { selectedSector, updateSector } = useArticleSector(
    DEFAULT_ARTICLE_CATEGORY_TYPE,
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

  const onSearchSubmit = async (value: string) => {
    handleSearchSubmit(value);
    const result = await refetch();
    if (result.isError) toast.warning(result.error.message);
  };

  const hasArticles = articles.length > 0;
  const shouldShowSearchBar = hasArticles || searchValue !== undefined;

  const [isMobileLike, setIsMobileLike] = useState<boolean>(() =>
    typeof window === "undefined"
      ? false
      : window.innerWidth <= MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const onResize = () =>
      setIsMobileLike(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <S.ArticleSectionContainer>
      <SectionTitle title="프로젝트 아티클" />
      {isMobileLike ? (
        <Dropdown
          items={articleSectors}
          onSelect={handleTabSelect}
          selected={selectedSector}
        />
      ) : (
        <Tab
          items={articleSectors}
          onSelect={handleTabSelect}
          selected={selectedSector}
          width={100}
        />
      )}

      {shouldShowSearchBar && (
        <S.SearchHeader hasArticles={hasArticles}>
          {hasArticles && (
            <S.ArticleDescriptionText>
              <S.ArticleIntroText>{articles.length}개</S.ArticleIntroText>의
              아티클이 모여있어요.
            </S.ArticleDescriptionText>
          )}
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

      {hasArticles ? (
        <CardList articles={articles} />
      ) : (
        <EmptyArticleList
          variant={searchValue ? "searchEmpty" : "initialEmpty"}
        />
      )}
    </S.ArticleSectionContainer>
  );
}

export default ArticleSection;
