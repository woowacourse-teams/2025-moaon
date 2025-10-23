import SortDropdown from "@domains/components/SortDropdown/SortDropdown";
import SortList from "@domains/components/SortList/SortList";
import { useSearchSort } from "@domains/hooks/useSearchSort";
import { ARTICLE_SORT_MAP } from "@domains/sort/article";
import FilterContainer from "@shared/components/FilterContainer/FilterContainer";
import { useGetSectorLocation } from "../../../../domains/hooks/useGetSectorLocation";
import * as S from "./ArticleBoxHeader.styled";
import { useUpdateSectorParams } from "./hooks/useUpdateSectorParams";
import SectorDropdown from "./SectorDropdown/SectorDropdown";
import SectorTab from "./SectorTab/SectorTab";
import { getArticleFilterList } from "./utils/getArticleFilterList";

interface ArticleBoxHeaderProps {
  totalCount: number;
  isLoading: boolean;
  onSelectSort: () => void;
  initialSort: keyof typeof ARTICLE_SORT_MAP;
}

function ArticleBoxHeader({
  totalCount,
  onSelectSort,
  initialSort,
}: ArticleBoxHeaderProps) {
  const shouldShowSort = totalCount > 0;
  const updateSectorParams = useUpdateSectorParams();
  const sector = useGetSectorLocation();
  const filterList = getArticleFilterList(sector);

  const { hasSearch, excludeKeys } = useSearchSort<
    keyof typeof ARTICLE_SORT_MAP
  >({
    excludeKeysWhenNoSearch: ["relevance"],
  });

  return (
    <S.ArticleHeader>
      <S.SectorTabContainer>
        <SectorTab onSelect={updateSectorParams} />
      </S.SectorTabContainer>
      <S.SectorDropdownContainer>
        <SectorDropdown onSelect={updateSectorParams} />
      </S.SectorDropdownContainer>
      <S.FilterAndSortContainer>
        <FilterContainer filterList={filterList} onSelect={onSelectSort} />
        {shouldShowSort && (
          <>
            <S.SortListContainer>
              <SortList
                sortMap={ARTICLE_SORT_MAP}
                onSelect={onSelectSort}
                initialValue={hasSearch ? "relevance" : initialSort}
                excludeKeys={excludeKeys}
              />
            </S.SortListContainer>
            <S.SortDropdownContainer>
              <SortDropdown
                sortMap={ARTICLE_SORT_MAP}
                onSelect={onSelectSort}
                initialValue={hasSearch ? "relevance" : initialSort}
                excludeKeys={excludeKeys}
              />
            </S.SortDropdownContainer>
          </>
        )}
      </S.FilterAndSortContainer>
      <S.ArticleHeaderBox>
        <S.ArticleIntro tabIndex={0} aria-hidden="true">
          {totalCount > 0 && (
            <>
              <S.ArticleIntroText>
                {totalCount.toLocaleString()}개
              </S.ArticleIntroText>
              의 아티클이 모여있어요.
            </>
          )}
        </S.ArticleIntro>
      </S.ArticleHeaderBox>
    </S.ArticleHeader>
  );
}

export default ArticleBoxHeader;
