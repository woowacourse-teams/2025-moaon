import { useState } from "react";
import SearchBar from "@/shared/components/SearchBar/SearchBar";
import { FILTER_MAP, type FilterKindParam } from "../../FilterContainer";
import * as S from "./FilterBox.styled";
import FilterList from "./FilterList/FilterList";

interface FilterBoxProps {
  param: FilterKindParam;
}

type FilterListType = Array<
  [string, { readonly label: string; readonly imgUrl: string }]
>;

function FilterBox({ param }: FilterBoxProps) {
  const [filterList, setFilterList] = useState<FilterListType>(
    FILTER_MAP[param].sort((a, b) => a[1].label.localeCompare(b[1].label)),
  );

  const changeFilterList = (keyword: string) => {
    const filteredList = FILTER_MAP[param]
      .filter(([_, { label }]) =>
        label.toLowerCase().startsWith(keyword.toLowerCase()),
      )
      .sort((a, b) => a[1].label.localeCompare(b[1].label));
    setFilterList(filteredList);
  };

  return (
    <S.Container>
      <SearchBar
        icon={{ size: 24, position: "right" }}
        onChange={changeFilterList}
      />
      <FilterList list={filterList} param={param} />
    </S.Container>
  );
}

export default FilterBox;
