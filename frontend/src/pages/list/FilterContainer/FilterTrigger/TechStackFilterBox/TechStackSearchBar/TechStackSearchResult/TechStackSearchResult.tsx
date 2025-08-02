import type { TechStackKey } from "@domains/filter/techStack";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import { useFilterParams } from "@/pages/list/hooks/useFilterParams";
import * as S from "./TechStackSearchResult.styled";

interface TechStackSearchResultProps {
  filterList: [TechStackKey, { imgUrl: string; label: string }][];
  resetSearchInput: () => void;
  closeSearchResults: () => void;
}

function TechStackSearchResult({
  filterList,
  resetSearchInput,
  closeSearchResults,
}: TechStackSearchResultProps) {
  const { updateTechStackParam } = useFilterParams();
  const addToSafeZone = useOutsideClick(closeSearchResults);

  const handleFilterItemClick = (techStack: TechStackKey) => {
    updateTechStackParam(techStack);
    resetSearchInput();
  };

  if (filterList.length === 0) {
    return (
      <S.NotFountResult ref={addToSafeZone}>
        검색한 기술 결과를 찾지 못했어요
      </S.NotFountResult>
    );
  }

  return (
    <S.List ref={addToSafeZone}>
      {filterList.map(([key, { imgUrl, label }]) => (
        <S.Item key={key}>
          <S.Button type="button" onClick={() => handleFilterItemClick(key)}>
            <S.Icon src={imgUrl} alt={label} />
            {label}
          </S.Button>
        </S.Item>
      ))}
    </S.List>
  );
}

export default TechStackSearchResult;
