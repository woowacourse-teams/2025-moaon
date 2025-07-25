import { Separated } from "@shared/components/Separated/Separated";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useState } from "react";
import useProjectList from "../hooks/useProjectList";
import SortItem from "./SortItem/SortItem";
import * as S from "./SortList.styled";

export const SORT_MAP = {
  createdAt: "게시일순",
  views: "조회순",
  loves: "좋아요순",
} as const;

export type SortKey = keyof typeof SORT_MAP;
export type SortValue = (typeof SORT_MAP)[SortKey];

function SortList() {
  const params = useSearchParams({
    key: "sort",
    mode: "single",
  });
  const [selectedSort, setSelectedSort] = useState<SortValue>(
    SORT_MAP[params.get()[0] as SortKey] ?? "게시일순",
  );
  const { refetch } = useProjectList();

  const handleSelectedSort = (sortKey: SortKey, sortValue: SortValue) => {
    setSelectedSort(sortValue);
    params.update(sortKey);
    refetch();
  };

  return (
    <S.List>
      <Separated by={<S.Separator />}>
        {Object.entries(SORT_MAP).map(([sortKey, sortValue]) => (
          <SortItem
            key={sortValue}
            sortValue={sortValue}
            isSelected={selectedSort === sortValue}
            onSelect={() => handleSelectedSort(sortKey as SortKey, sortValue)}
          />
        ))}
      </Separated>
    </S.List>
  );
}

export default SortList;
