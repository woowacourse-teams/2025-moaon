import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import Dropdown from "@shared/components/Dropdown/Dropdown";
import SearchBar from "@shared/components/SearchBar/SearchBar";
import Tab from "@shared/components/Tab/Tab";
import useDebounce from "@shared/hooks/useDebounce";
import useSearchParams from "@shared/hooks/useSearchParams";
import type { QueryObserverResult } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
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

const DEFAULT_ARTICLE_CATEGORY_TYPE = "all";
const SEARCH_INPUT_MAX_LENGTH = 50;
const MOBILE_BREAKPOINT = 1280;

interface ArticleSectionProps {
  articles: ProjectArticle[];
  sectorCounts: ProjectArticleCount[];
  refetch: () => Promise<QueryObserverResult<ProjectArticlesResponse, Error>>;
  isRefetching: boolean;
  isLoading: boolean;
}

function ArticleSection({
  articles,
  sectorCounts,
  refetch,
}: ArticleSectionProps) {
  const { selectedSector, updateSector } = useArticleSector(
    DEFAULT_ARTICLE_CATEGORY_TYPE,
  );

  const params = useSearchParams({ key: "search", mode: "single" });
  const urlSearchValue = params.get()[0];
  const searchValue = urlSearchValue ?? "";
  const [inputValue, setInputValue] = useState(searchValue);

  const debouncedValue = useDebounce({
    value: inputValue,
    delay: 400,
  });

  const paramsRef = useRef(params);
  const refetchRef = useRef(refetch);

  useEffect(() => {
    paramsRef.current = params;
    refetchRef.current = refetch;
  }, [params, refetch]);

  useEffect(() => {
    const currentParam = paramsRef.current.get()[0] ?? "";

    if (currentParam === debouncedValue) return;

    if (debouncedValue.trim() === "") {
      if (currentParam !== "") {
        paramsRef.current.deleteAll({ replace: true });
        refetchRef.current();
      }
      return;
    }

    paramsRef.current.update(debouncedValue, { replace: true });
    refetchRef.current();
  }, [debouncedValue]);

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

  const hasArticles = articles.length > 0;
  const shouldShowSearchBar = hasArticles || urlSearchValue !== undefined;

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
              value={inputValue}
              onChange={setInputValue}
              maxLength={SEARCH_INPUT_MAX_LENGTH}
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
