import CardList from "./CardList/CardList";
import FilterContainer from "./FilterContainer/FilterContainer";
import * as S from "./ListPage.styled";
import Sort from "./Sort/Sort";

function ListPage() {
  return (
    <>
      <S.Box>
        <FilterContainer />
        <Sort />
      </S.Box>
      <CardList />
      <div style={{ height: "2000px", backgroundColor: "#fff" }} />
    </>
  );
}

export default ListPage;
