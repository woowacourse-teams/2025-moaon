import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import useSearchParams from "@shared/hooks/useSearchParams";
import { typeSafeObjectEntries } from "@shared/utils/typeSafeObjectEntries";
import { useState } from "react";
import ArrowIcon from "@/shared/components/ArrowIcon/ArrowIcon";
import * as S from "./SortDropdown.styled";

interface SortDropdownProps<T extends Record<string, string>> {
  sortMap: T;
  onSelect: () => void;
  initialValue: keyof T;
  excludeKeys?: (keyof T)[];
}

function SortDropdown<T extends Record<string, string>>({
  sortMap,
  onSelect,
  initialValue,
  excludeKeys = [],
}: SortDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useSearchParams({ key: "sort", mode: "single" });

  const rawSortParams = params.get()[0];
  const sortParams = rawSortParams ?? initialValue;

  const selectedLabel = sortMap[sortParams as keyof T] ?? sortMap[initialValue];

  const addToSafeZone = useOutsideClick(() => setIsOpen(false));

  const handleSelect = (sortKey: string) => {
    params.update(sortKey, { replace: true });
    onSelect();
    setIsOpen(false);
  };

  const filteredSortEntries = typeSafeObjectEntries(sortMap).filter(
    ([sortKey]) => !excludeKeys.includes(sortKey),
  );

  return (
    <S.DropdownContainer ref={addToSafeZone}>
      <S.DropdownHeader
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="sort-dropdown-list"
        aria-label="정렬 선택"
      >
        {selectedLabel}
        <ArrowIcon direction={isOpen ? "up" : "down"} />
      </S.DropdownHeader>
      {isOpen && (
        <S.DropdownList
          id="sort-dropdown-list"
          role="listbox"
          aria-label="정렬 목록"
        >
          {filteredSortEntries.map(([sortKey, sortValue]) => (
            <S.DropdownItem
              key={sortValue}
              onClick={() => handleSelect(sortKey.toString())}
              role="option"
              aria-selected={sortParams === sortKey}
              id={`sort-item-${String(sortKey)}`}
            >
              {sortValue}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
}

export default SortDropdown;
