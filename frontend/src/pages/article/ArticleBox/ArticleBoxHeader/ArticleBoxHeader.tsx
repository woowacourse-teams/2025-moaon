import SortList from "@domains/components/SortList/SortList";
import { ARTICLE_SORT_MAP } from "@domains/sort/article";
import { useUpdateSectorParams } from "../../hooks/useUpdateSectorParams";
import * as S from "./ArticleBoxHeader.styled";
import FilterContainer from "./FilterContainer/FilterContainer";
import SectorTab from "./SectorTab/SectorTab";

interface ArticleBoxHeaderProps {
  totalCount: number;
  isLoading: boolean;
  onSelectSort: () => void;
  initialSort: keyof typeof ARTICLE_SORT_MAP;
}

function ArticleBoxHeader({
  totalCount,
  isLoading,
  onSelectSort,
  initialSort,
}: ArticleBoxHeaderProps) {
  const shouldShowSort = isLoading || totalCount > 0;
  const updateSectorParams = useUpdateSectorParams();

  return (
    <S.ArticleHeader>
      <SectorTab onSelect={updateSectorParams} />
      <FilterContainer onSelect={onSelectSort} />
      <S.ArticleHeaderBox>
        <S.ArticleIntro>
          {totalCount > 0 && (
            <>
              <S.ArticleIntroText>{totalCount}개</S.ArticleIntroText>의 아티클이
              모여있어요.
            </>
          )}
        </S.ArticleIntro>
        {shouldShowSort && (
          <SortList
            sortMap={ARTICLE_SORT_MAP}
            onSelect={onSelectSort}
            initialValue={initialSort}
          />
        )}
      </S.ArticleHeaderBox>
    </S.ArticleHeader>
  );
}

export default ArticleBoxHeader;
