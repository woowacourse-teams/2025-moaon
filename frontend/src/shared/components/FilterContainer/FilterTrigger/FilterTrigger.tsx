import type { ArticleSectorKey } from "@domains/filter/articleSector";
import UnmountAfterAnimation from "@shared/components/UnmountAfterAnimation/UnmountAnimation";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import useSearchParams from "@shared/hooks/useSearchParams";
import { type PropsWithChildren, useState } from "react";
import ArrowIcon from "@/shared/components/ArrowIcon/ArrowIcon";
import FilterBox from "./FilterBox/FilterBox";
import * as S from "./FilterTrigger.styled";

interface FilterProps {
  label: string;
  param: string;
  onSelect: () => void;
  sector: ArticleSectorKey;
}

function FilterTrigger({
  label,
  param,
  onSelect,
  children,
}: PropsWithChildren<FilterProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const addToSafeZone = useOutsideClick(() => setIsOpen(false));
  const searchParams = useSearchParams({ key: param, mode: "multi" });
  const selectedCount = searchParams.get().length;

  const toggleFilter = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <S.Container ref={addToSafeZone}>
      <S.FilterButton type="button" onClick={toggleFilter}>
        <S.FilterTitle>
          {label}
          <S.FilterSelectedCount>
            {selectedCount ? selectedCount : ""}
          </S.FilterSelectedCount>
        </S.FilterTitle>
        <ArrowIcon direction={isOpen ? "up" : "down"} />
      </S.FilterButton>
      <UnmountAfterAnimation visible={isOpen}>
        <FilterBox param={param} onSelect={onSelect} isOpen={isOpen}>
          {children}
        </FilterBox>
      </UnmountAfterAnimation>
    </S.Container>
  );
}

export default FilterTrigger;
