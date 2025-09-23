import type { ArticleSectorKey } from "@domains/filter/articleSector";
import { SwitchCase } from "@shared/components/SwitchCase/SwitchCase";
import UnmountAfterAnimation from "@shared/components/UnmountAnimation/UnmountAnimation";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import useSearchParams from "@shared/hooks/useSearchParams";
import { useState } from "react";
import ArrowIcon from "@/shared/components/ArrowIcon/ArrowIcon";
import type { FilterLabel, FilterParam } from "../FilterContainer";
import FilterBox from "./FilterBox/FilterBox";
import * as S from "./FilterTrigger.styled";
import TechStackFilterBox from "./TechStackFilterBox/TechStackFilterBox";
import TopicFilterBox from "./TopicFilterBox/TopicFilterBox";

interface FilterProps {
  label: FilterLabel;
  param: FilterParam;
  onSelect: () => void;
  sector: ArticleSectorKey;
}

function FilterTrigger({ label, param, onSelect, sector }: FilterProps) {
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
          <SwitchCase
            value={label}
            caseBy={{
              주제: () => (
                <TopicFilterBox onSelect={onSelect} sector={sector} />
              ),
              "기술 스택": () => (
                <TechStackFilterBox onSelect={onSelect} sector={sector} />
              ),
            }}
          />
        </FilterBox>
      </UnmountAfterAnimation>
    </S.Container>
  );
}

export default FilterTrigger;
