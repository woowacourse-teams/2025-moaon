import searchIcon from "@assets/icons/search.svg";
import {
  TECH_STACK_ENTRY,
  TECH_STACK_ICON_MAP,
  type TechStackKey,
} from "@domains/filter/techStack";
import { type ChangeEvent, useState } from "react";
import { useFilterParams } from "@/pages/list/hooks/useFilterParams";
import * as S from "./TechStackSearchBar.styled";
import TechStackSearchResult from "./TechStackSearchResult/TechStackSearchResult";

const getFilteredListWithoutSelected = (
  keyword: string,
  selectedTechStacks: TechStackKey[],
) => {
  const filteredList = TECH_STACK_ENTRY.filter(([_, { label }]) =>
    label.toLowerCase().startsWith(keyword.toLowerCase()),
  );
  const selectedTechStackLabels = selectedTechStacks.map(
    (techStack) => TECH_STACK_ICON_MAP[techStack].label,
  );
  return filteredList.filter(
    ([_, { label }]) => !selectedTechStackLabels.includes(label),
  );
};

function TechStackSearchBar() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [filterList, setFilterList] = useState(TECH_STACK_ENTRY);
  const { techStacks: selectedTechStacks } = useFilterParams();

  const handleFilterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setValue(keyword);

    const filteredListWithoutSelected = getFilteredListWithoutSelected(
      keyword,
      selectedTechStacks,
    );
    setFilterList(filteredListWithoutSelected);
    setIsOpen(true);
  };

  const handleFilterInputFocus = () => {
    if (value) {
      setIsOpen(true);
    }
  };

  const resetSearchInput = () => {
    setValue("");
  };

  const closeSearchResults = () => {
    setIsOpen(false);
  };

  const isSearchResultVisible = value && isOpen;
  return (
    <S.Container>
      <S.SearchLabel htmlFor="filter-search">
        <S.SearchIcon src={searchIcon} alt="검색" />
        <S.SearchInput
          type="text"
          id="filter-search"
          placeholder="찾으시는 기술 스택을 입력해 주세요"
          value={value}
          onChange={handleFilterInputChange}
          onFocus={handleFilterInputFocus}
        />
      </S.SearchLabel>
      {isSearchResultVisible && (
        <TechStackSearchResult
          filterList={filterList}
          resetSearchInput={resetSearchInput}
          closeSearchResults={closeSearchResults}
        />
      )}
    </S.Container>
  );
}

export default TechStackSearchBar;
