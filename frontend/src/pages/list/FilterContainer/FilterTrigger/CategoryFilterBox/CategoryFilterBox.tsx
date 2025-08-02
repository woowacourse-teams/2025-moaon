import * as S from "./CategoryFilterBox.styled";
import CategoryFilterList from "./CategoryFilterList/CategoryFilterList";

function CategoryFilterBox() {
  return (
    <S.Container>
      <S.Wrap>
        <S.Title>주제 선택</S.Title>
        <CategoryFilterList />
      </S.Wrap>
      <S.FilterResetButton type="button">초기화</S.FilterResetButton>
    </S.Container>
  );
}

export default CategoryFilterBox;
