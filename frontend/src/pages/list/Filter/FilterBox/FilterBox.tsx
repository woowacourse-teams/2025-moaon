import SearchBar from "@/shared/components/SearchBar/SearchBar";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import * as S from "./FilterBox.styled";
import FilterList from "./FilterList/FilterList";

interface FilterBoxProps {
  onClose: () => void;
}

function FilterBox({ onClose }: FilterBoxProps) {
  const addToSafeZone = useOutsideClick(onClose);

  return (
    <S.Container ref={addToSafeZone}>
      <SearchBar icon={{ size: 24, position: "right" }} />
      <FilterList />
    </S.Container>
  );
}

export default FilterBox;
