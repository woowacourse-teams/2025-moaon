import { useState } from "react";
import ArrowIcon from "@/shared/components/ArrowIcon/ArrowIcon";
import type { FilterKind } from "../FilterContainer";
import * as S from "./Filter.styled";
import FilterBox from "./FilterBox/FilterBox";

interface FilterProps {
  kind: FilterKind;
}

function Filter({ kind }: FilterProps) {
  const { label, value } = kind;
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen((prev) => !prev);
  };

  const closeFilter = () => {
    setIsOpen(false);
  };

  return (
    <S.Container>
      <S.FilterButton type="button" onClick={toggleFilter}>
        <S.FilterTitle>{label}</S.FilterTitle>
        <ArrowIcon direction="up" />
      </S.FilterButton>
      {isOpen && <FilterBox onClose={closeFilter} value={value} />}
    </S.Container>
  );
}

export default Filter;
