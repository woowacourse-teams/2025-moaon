import FilterBox from "../FilterBox/FilterBox";
import * as S from "./CategoryFilterBox.styled";
import CategoryFilterList from "./CategoryFilterList/CategoryFilterList";

function CategoryFilterBox() {
  return (
    <FilterBox>
      <S.Title>주제 선택</S.Title>
      <CategoryFilterList />
    </FilterBox>
  );
}

export default CategoryFilterBox;
