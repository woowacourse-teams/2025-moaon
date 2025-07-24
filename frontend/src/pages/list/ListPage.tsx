import CardList from "./CardList/CardList";
import FilterContainer from "./FilterContainer/FilterContainer";
import * as S from "./ListPage.styled";
import Sort from "./Sort/Sort";

function ListPage() {
  return (
    <S.Main>
      <S.Box>
        <FilterContainer />
        <Sort />
      </S.Box>
      <CardList />
    </S.Main>
  );
}

export default ListPage;
