import searchIcon from "@assets/icons/search.svg";
import type { ArticleSectorKey } from "@domains/filter/articleSector";
import {
  TECH_STACK_ENTRY,
  TECH_STACK_ICON_MAP,
  type TechStackKey,
} from "@domains/filter/techStack";
import { useKeyDown } from "@shared/hooks/useKeyDown/useKeyDown";
import { type ChangeEvent, useRef, useState } from "react";
import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import { getTechStackBySector } from "../../../../../../utils/sectorHandlers";
import { useListKeyboardNavigation } from "./hooks/useListKeyboardNavigation";
import * as S from "./TechStackSearchBar.styled";
import TechStackSearchResult from "./TechStackSearchResult/TechStackSearchResult";

const getFilteredListWithoutSelected = (
  keyword: string,
  selectedTechStacks: TechStackKey[],
  sector: ArticleSectorKey,
) => {
  const techStacks = getTechStackBySector(sector);
  const filteredList = techStacks.filter(([_, { label }]) =>
    label.toLowerCase().startsWith(keyword.toLowerCase()),
  );
  const selectedTechStackLabels = selectedTechStacks.map(
    (techStack) => TECH_STACK_ICON_MAP[techStack].label,
  );
  return filteredList.filter(
    ([_, { label }]) => !selectedTechStackLabels.includes(label),
  );
};

interface TechStackSearchBarProps {
  onSelect: () => void;
  sector: ArticleSectorKey;
}

function TechStackSearchBar({ onSelect, sector }: TechStackSearchBarProps) {
  const techStacks = getTechStackBySector(sector);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filterList, setFilterList] = useState<typeof techStacks>([]);
  const { techStacks: selectedTechStacks } = useFilterParams();
  const { updateTechStackParam } = useFilterParams();
  const inputRef = useRef<HTMLInputElement>(null);
  useKeyDown({
    Escape: () => setIsOpen(false),
  });

  const handleTechStackItemClick = (techStack: TechStackKey) => {
    updateTechStackParam(techStack);
    setValue("");
    setIsOpen(false);
    onSelect();
  };

  const handleArrowUp = () => {
    setIsOpen(false);

    if (inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  };

  const handleArrowDown = () => {
    setIsOpen(true);
  };

  const handleEnter = () => {
    if (!filterList[keyboardFocusIndex]) {
      return;
    }

    handleTechStackItemClick(filterList[keyboardFocusIndex][0]);
  };

  const { onKeyDown, focusIndex: keyboardFocusIndex } =
    useListKeyboardNavigation({
      handlers: {
        onArrowUp: handleArrowUp,
        onArrowDown: handleArrowDown,
        onEnter: handleEnter,
      },
      maxIndex: filterList.length - 1,
    });

  const handleFilterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setValue(keyword);

    if (keyword === "") {
      setFilterList([]);
      setIsOpen(false);
      return;
    }

    const filteredListWithoutSelected = getFilteredListWithoutSelected(
      keyword,
      selectedTechStacks,
      sector,
    );
    setFilterList(filteredListWithoutSelected);
    setIsOpen(true);
  };

  return (
    <S.Container>
      <S.SearchLabel htmlFor="filter-search">
        <S.SearchIcon src={searchIcon} alt="검색" />
        <S.SearchInput
          autoComplete="off"
          type="text"
          id="filter-search"
          placeholder="찾으시는 기술 스택을 입력해 주세요"
          value={value}
          ref={inputRef}
          onChange={handleFilterInputChange}
          onKeyDown={onKeyDown}
        />
      </S.SearchLabel>
      {isOpen && (
        <TechStackSearchResult
          filterList={filterList}
          closeSearchResult={() => setIsOpen(false)}
          onTechStackSelect={handleTechStackItemClick}
          keyboardFocusIndex={keyboardFocusIndex}
        />
      )}
    </S.Container>
  );
}

export default TechStackSearchBar;
