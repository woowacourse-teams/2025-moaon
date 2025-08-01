import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import { useState } from "react";
import ArrowIcon from "@/shared/components/ArrowIcon/ArrowIcon";
import type { FilterKind } from "../FilterContainer";
import FilterBox from "./FilterBox/FilterBox";
import * as S from "./FilterTrigger.styled";

interface FilterProps {
  kind: FilterKind;
}

function FilterTrigger({ kind }: FilterProps) {
  const { label, param, hasSearchBar } = kind;
  const [isOpen, setIsOpen] = useState(false);
  const addToSafeZone = useOutsideClick(() => setIsOpen(false));

  const toggleFilter = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <S.Container ref={addToSafeZone}>
      <S.FilterButton type="button" onClick={toggleFilter}>
        <S.FilterTitle>{label}</S.FilterTitle>
        <ArrowIcon direction="up" />
      </S.FilterButton>
      {isOpen && <FilterBox param={param} hasSearchBar={hasSearchBar} />}
    </S.Container>
  );
}

export default FilterTrigger;
