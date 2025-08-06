import { Separated } from "@shared/components/Separated/Separated";
import useSearchParams from "@shared/hooks/useSearchParams";
import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";
import SortItem from "./SortItem/SortItem";
import * as S from "./SortList.styled";

interface SortListProps {
  sortMap: Record<string, string>;
  onSelect: () => void;
  initialValue: string;
}

function SortList({ sortMap, onSelect, initialValue }: SortListProps) {
  const params = useSearchParams({
    key: "sort",
    mode: "single",
  });

  const [rawSortParams] = params.get();
  const sortParams = rawSortParams ?? initialValue;
  const handleSelectedSort = (sortKey: string) => {
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
            isSelected={sortParams === sortKey}
            onSelect={() => handleSelectedSort(sortKey)}
          />
        ))}
      </Separated>
    </S.List>
  );
}

export default SortList;
