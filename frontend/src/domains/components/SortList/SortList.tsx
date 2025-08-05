import { Separated } from "@shared/components/Separated/Separated";
import useSearchParams from "@shared/hooks/useSearchParams";
import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";
import { useState } from "react";
import useProjectList from "../../../pages/list/hooks/useProjectList";
import SortItem from "./SortItem/SortItem";
import * as S from "./SortList.styled";

interface SortListProps {
  sortMap: Record<string, string>;
}

function SortList({ sortMap }: SortListProps) {
  const params = useSearchParams({
    key: "sort",
    mode: "single",
  });
  const [selectedSort, setSelectedSort] = useState(
    sortMap[params.get()[0]] ?? Object.values(sortMap)[0],
  );
  const { refetch } = useProjectList();

  const handleSelectedSort = (sortKey: string, sortValue: string) => {
    setSelectedSort(sortValue);
    params.update(sortKey);
    refetch();
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
