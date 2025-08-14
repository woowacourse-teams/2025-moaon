import FilterBox from "../FilterBox/FilterBox";
import * as S from "./CategoryFilterBox.styled";
import CategoryFilterList from "./CategoryFilterList/CategoryFilterList";

interface CategoryFilterBoxProps {
  onSelect: () => void;
}

function CategoryFilterBox({ onSelect }: CategoryFilterBoxProps) {
  return (
    <FilterBox param="categories" onSelect={onSelect}>
      <S.Title>주제 선택</S.Title>
      <CategoryFilterList onSelect={onSelect} />
    </FilterBox>
  );
}

export default CategoryFilterBox;
