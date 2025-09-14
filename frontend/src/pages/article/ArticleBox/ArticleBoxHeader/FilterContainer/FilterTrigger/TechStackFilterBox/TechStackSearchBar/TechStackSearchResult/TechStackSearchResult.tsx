import type { TechStackKey } from "@domains/filter/techStack";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import { useRef } from "react";
import { useAutoScrollOnFocus } from "../hooks/useAutoScrollOnFocus";
import * as S from "./TechStackSearchResult.styled";

interface TechStackSearchResultProps {
  filterList: [TechStackKey, { imgUrl: string; label: string }][];
  closeSearchResult: () => void;
  keyboardFocusIndex: number;
  onTechStackSelect: (techStack: TechStackKey) => void;
}

function TechStackSearchResult({
  filterList,
  onTechStackSelect,
  closeSearchResult,
  keyboardFocusIndex,
}: TechStackSearchResultProps) {
  const addToSafeZone = useOutsideClick(closeSearchResult);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useAutoScrollOnFocus({
    focusIndex: keyboardFocusIndex,
    itemRefs,
  });

  if (filterList.length === 0) {
    return (
      <S.NotFountResult ref={addToSafeZone}>
        검색한 기술 결과를 찾지 못했어요
      </S.NotFountResult>
    );
  }

  return (
    <S.List ref={addToSafeZone}>
      {filterList.map(([key, { imgUrl, label }], index) => (
        <S.Item key={key}>
          <S.Button
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            type="button"
            onClick={() => onTechStackSelect(key)}
            isOver={keyboardFocusIndex === index}
          >
            <S.Icon src={imgUrl} alt={label} />
            {label}
          </S.Button>
        </S.Item>
      ))}
    </S.List>
  );
}

export default TechStackSearchResult;
