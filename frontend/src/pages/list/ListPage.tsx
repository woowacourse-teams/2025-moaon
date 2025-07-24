import ResetIcon from "@assets/icons/reset.svg";
import { useState } from "react";
import { flushSync } from "react-dom";
import { useSearchParams } from "react-router";
import CardList from "./CardList/CardList";
import FilterContainer from "./FilterContainer/FilterContainer";
import useProjectList from "./hooks/useProjectList";
import * as S from "./ListPage.styled";
import SortList from "./SortList/SortList";

function ListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterRender, setIsFilterRender] = useState(true);
  const { refetch } = useProjectList();

  const handleFilterResetButtonClick = () => {
    flushSync(() => setIsFilterRender(false));

    const sortParams = searchParams.get("sort");
    sortParams ? setSearchParams({ sort: sortParams }) : setSearchParams({});

    setIsFilterRender(true);
    refetch();
  };

  return (
    <S.Main>
      <S.Box>
        <S.Wrap>
          {isFilterRender && <FilterContainer />}
          <S.ResetButton type="button" onClick={handleFilterResetButtonClick}>
            <S.ResetIcon src={ResetIcon} alt="필터 초기화 아이콘" />
            필터 초기화
          </S.ResetButton>
        </S.Wrap>
        <SortList />
      </S.Box>
      <CardList />
    </S.Main>
  );
}

export default ListPage;
