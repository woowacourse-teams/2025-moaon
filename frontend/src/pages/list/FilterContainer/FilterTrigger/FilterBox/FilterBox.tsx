import { useState } from "react";
import SearchBar from "@/shared/components/SearchBar/SearchBar";
import { FILTER_MAP, type FilterKindParam } from "../../FilterContainer";
import * as S from "./FilterBox.styled";
import FilterList from "./FilterList/FilterList";

interface FilterBoxProps {
  param: FilterKindParam;
  hasSearchBar: boolean;
}

type FilterListType = Array<(typeof FILTER_MAP)[FilterKindParam][number]>;

function FilterBox({ param, hasSearchBar }: FilterBoxProps) {
  const [filterList, setFilterList] = useState<FilterListType>(
    FILTER_MAP[param],
  );

  const changeFilterList = (keyword: string) => {
    const filteredList = FILTER_MAP[param].filter(([_, { label }]) =>
      label.toLowerCase().startsWith(keyword.toLowerCase()),
    );

    setFilterList(filteredList);
  };

  return (
    <S.Container>
      {hasSearchBar && (
        <SearchBar
          icon={{ size: 24, position: "right" }}
          onChange={changeFilterList}
        />
      )}
      <FilterList list={filterList} param={param} />
    </S.Container>
  );
}

export default FilterBox;
