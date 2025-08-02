import { SwitchCase } from "@shared/components/SwitchCase/SwitchCase";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useState } from "react";
import ArrowIcon from "@/shared/components/ArrowIcon/ArrowIcon";
import type { FilterLabel, FilterParam } from "../FilterContainer";
import CategoryFilterBox from "./CategoryFilterBox/CategoryFilterBox";
import * as S from "./FilterTrigger.styled";

interface FilterProps {
  label: FilterLabel;
  param: FilterParam;
}

function FilterTrigger({ label, param }: FilterProps) {
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
        <ArrowIcon direction="up" />
      </S.FilterButton>
      {isOpen && (
        <SwitchCase
          value={label}
          caseBy={{
            주제: () => <CategoryFilterBox />,
            "기술 스택": () => <div>b</div>,
          }}
        />
      )}
    </S.Container>
  );
}

export default FilterTrigger;
