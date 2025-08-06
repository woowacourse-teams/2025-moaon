import { Separated } from "@shared/components/Separated/Separated";
import useSearchParams from "@shared/hooks/useSearchParams";
import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";
import { useState } from "react";
import SortItem from "./SortItem/SortItem";
import * as S from "./SortList.styled";

interface SortListProps {
  sortMap: Record<string, string>;
  onSelect: () => void;
}

function SortList({ sortMap, onSelect }: SortListProps) {
  const params = useSearchParams({
    key: "sort",
    mode: "single",
  });

  const sortParamValue = params.get()[0];
  const defaultSortValue = Object.values(sortMap)[0];
  const [selectedSort, setSelectedSort] = useState(
    sortParamValue ?? defaultSortValue,
  );

  const handleSelectedSort = (sortKey: string, sortValue: string) => {
    setSelectedSort(sortValue);
    params.update(sortKey);
    onSelect();
  };

  return (
    <S.List>
      <Separated by={<S.Separator />}>
        {typeSafeObjectEntries(sortMap).map(([sortKey, sortValue]) => (
          <SortItem
            key={sortValue}
            sortValue={sortValue}
            isSelected={selectedSort === sortValue}
            onSelect={() => handleSelectedSort(sortKey, sortValue)}
          />
        ))}
      </Separated>
    </S.List>
  );
}

export default SortList;
