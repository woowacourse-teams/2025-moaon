import SearchBar from "@/shared/components/SearchBar/SearchBar";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { FILTER_MAP, type FilterKindValue } from "../../FilterContainer";
import * as S from "./FilterBox.styled";
import FilterList from "./FilterList/FilterList";

interface FilterBoxProps {
  onClose: () => void;
  value: FilterKindValue;
}

function FilterBox({ onClose, value }: FilterBoxProps) {
  const addToSafeZone = useOutsideClick(onClose);

  return (
    <S.Container ref={addToSafeZone}>
      <SearchBar icon={{ size: 24, position: "right" }} />
      <FilterList items={FILTER_MAP[value]} value={value} />
    </S.Container>
  );
}

export default FilterBox;
