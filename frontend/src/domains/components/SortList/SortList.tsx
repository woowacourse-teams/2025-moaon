import { Separated } from "@shared/components/Separated/Separated";
import useSearchParams from "@shared/hooks/useSearchParams";
import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";
import SortItem from "./SortItem/SortItem";
import * as S from "./SortList.styled";

interface SortListProps<T extends Record<string, string>> {
  sortMap: T;
  onSelect: () => void;
  initialValue: keyof T;
  excludeKeys?: (keyof T)[];
}

function SortList<T extends Record<string, string>>({
  sortMap,
  onSelect,
  initialValue,
  excludeKeys = [],
}: SortListProps<T>) {
  const params = useSearchParams({
    key: "sort",
    mode: "single",
  });

  const rawSortParams = params.get()[0];
  const sortParams = rawSortParams ?? initialValue;
  const handleSelectedSort = (sortKey: string) => {
    params.update(sortKey, { replace: true });
    onSelect();
  };

  const filteredSortEntries = typeSafeObjectEntries(sortMap).filter(
    ([sortKey]) => !excludeKeys.includes(sortKey),
  );

  return (
    <S.List>
      <Separated by={<S.Separator />}>
        {filteredSortEntries.map(([sortKey, sortValue]) => (
          <SortItem
            key={sortValue}
            isSelected={sortParams === sortKey}
            onSelect={() => handleSelectedSort(sortKey.toString())}
          >
            {sortValue}
          </SortItem>
        ))}
      </Separated>
    </S.List>
  );
}

export default SortList;
