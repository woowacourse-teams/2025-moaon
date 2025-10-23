import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useState } from "react";
import ArrowIcon from "@/shared/components/ArrowIcon/ArrowIcon";
import * as S from "./SectorDropdown.styled";

function SectorDropdown({
  onSelect,
}: {
  onSelect: (sector: ArticleSectorKey) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useSearchParams({ key: "sector", mode: "single" });
  const rawSelectedParams = params.get()[0] ?? ARTICLE_SECTOR_ENTRY[0][0];
  const selectedLabel = ARTICLE_SECTOR_ENTRY.find(
    ([key]) => key === rawSelectedParams,
  )?.[1].label;

  const addToSafeZone = useOutsideClick(() => setIsOpen(false));

  const handleSelect = (key: ArticleSectorKey) => {
    onSelect(key);
    setIsOpen(false);
  };

  return (
    <S.DropdownContainer ref={addToSafeZone}>
      <S.DropdownHeader
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="sector-dropdown-list"
        aria-label="섹터 선택"
      >
        {selectedLabel}
        <ArrowIcon direction={isOpen ? "up" : "down"} />
      </S.DropdownHeader>
      {isOpen && (
        <S.DropdownList
          id="sector-dropdown-list"
          role="listbox"
          aria-label="섹터 목록"
        >
          {ARTICLE_SECTOR_ENTRY.map(([key, { label }]) => (
            <S.DropdownItem
              key={key}
              onClick={() => handleSelect(key)}
              role="option"
              aria-selected={rawSelectedParams === key}
              id={`sector-item-${String(key)}`}
            >
              {label}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
}

export default SectorDropdown;
