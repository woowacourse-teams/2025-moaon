import resetIcon from "@assets/icons/reset.svg";
import CardList from "./CardList/CardList";
import FilterContainer from "./FilterContainer/FilterContainer";
import { useFilterParams } from "./hooks/useFilterParams";
import useProjectList from "./hooks/useProjectList";
import * as S from "./ListPage.styled";
import SortList from "./SortList/SortList";

function ListPage() {
  const { resetFilter } = useFilterParams();
  const { refetch } = useProjectList();

  const handleFilterResetButtonClick = () => {
    resetFilter();
    refetch();
  };

  return (
    <S.Main>
      <S.Box>
        <S.Wrap>
          <FilterContainer />
          <S.ResetButton type="button" onClick={handleFilterResetButtonClick}>
            <S.ResetIcon src={resetIcon} alt="필터 초기화" />
          </S.ResetButton>
        </S.Wrap>
        <SortList />
      </S.Box>
      <CardList />
    </S.Main>
  );
}

export default ListPage;
