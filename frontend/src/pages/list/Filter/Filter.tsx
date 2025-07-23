import { useState } from "react";
import ArrowIcon from "@/shared/components/ArrowIcon/ArrowIcon";

import * as S from "./Filter.styled";
import FilterBox from "./FilterBox/FilterBox";

function Filter() {
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
        <span>단체</span>
        <ArrowIcon direction="up" />
      </S.FilterButton>
      {isOpen && <FilterBox onClose={closeFilter} />}
    </S.Container>
  );
}

export default Filter;
