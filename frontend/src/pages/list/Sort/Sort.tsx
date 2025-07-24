import { Separated } from "@shared/components/Separated/Separated";
import { useState } from "react";
import * as S from "./Sort.styled";

const SORT_MAP = {
  게시일순: "createdAt",
  조회순: "views",
  좋아요순: "loves",
};

type SortKey = keyof typeof SORT_MAP;

function Sort() {
  const [selectedSort, setSelectedSort] = useState<SortKey>("게시일순");

  const handleSelectedSort = (sortKey: SortKey) => {
    setSelectedSort(sortKey);
  };

  return (
    <S.List>
      <Separated by={<S.Separator />}>
        {Object.keys(SORT_MAP).map((sortKey) => (
          <S.Item key={sortKey}>
            <S.Button
              type="button"
              onClick={() => handleSelectedSort(sortKey as SortKey)}
              isSelected={selectedSort === sortKey}
            >
              {sortKey}
            </S.Button>
          </S.Item>
        ))}
      </Separated>
    </S.List>
  );
}

export default Sort;
