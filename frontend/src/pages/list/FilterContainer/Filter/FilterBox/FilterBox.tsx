import SearchBar from "@/shared/components/SearchBar/SearchBar";
import { FILTER_MAP, type FilterKindValue } from "../../FilterContainer";
import * as S from "./FilterBox.styled";
import FilterList from "./FilterList/FilterList";

interface FilterBoxProps {
  value: FilterKindValue;
}

function FilterBox({ value }: FilterBoxProps) {
  return (
    <S.Container>
      <SearchBar icon={{ size: 24, position: "right" }} />
      <FilterList items={FILTER_MAP[value]} value={value} />
    </S.Container>
  );
}

export default FilterBox;
