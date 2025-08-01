import CloseIcon from "@assets/icons/close.svg";
import ResetIcon from "@assets/icons/reset.svg";
import { CATEGORY_MAP, type CategoryKey } from "@domains/filter/category";
import {
  TECH_STACK_ICON_MAP,
  type TechStackKey,
} from "@domains/filter/techStack";
import CardList from "./CardList/CardList";
import FilterContainer from "./FilterContainer/FilterContainer";
import { useFilterParams } from "./hooks/useFilterParams";
import useProjectList from "./hooks/useProjectList";
import * as S from "./ListPage.styled";
import SortList from "./SortList/SortList";

const converterFilterItems = (
  techStacks: TechStackKey[],
  categories: CategoryKey[],
) => {
  return [
    ...techStacks.map((item) => ({
      key: "techStacks",
      label: TECH_STACK_ICON_MAP[item].label,
      value: item,
    })),
    ...categories.map((item) => ({
      key: "categories",
      label: CATEGORY_MAP[item].label,
      value: item,
    })),
  ];
};

function ListPage() {
  const { techStacks, categories, deleteFilter, resetFilter } =
    useFilterParams();
  const selectedFilterItems = converterFilterItems(techStacks, categories);
  const { refetch } = useProjectList();

  const handleFilterResetButtonClick = () => {
    resetFilter();
    refetch();
  };

  const handleUnselectFilterItem = (key: string, value: string) => {
    deleteFilter(key, value);
    refetch();
  };

  return (
    <S.Main>
      <S.Box>
        <S.Wrap>
          <FilterContainer />
          <S.ResetButton type="button" onClick={handleFilterResetButtonClick}>
            <S.ResetIcon src={ResetIcon} alt="필터 초기화 아이콘" />
            필터 초기화
          </S.ResetButton>
        </S.Wrap>
        <SortList />
      </S.Box>
      <S.SelectedBox>
        <S.SelectedList>
          {selectedFilterItems.map(({ key, value, label }) => (
            <S.SelectedItem
              key={value}
              onClick={() => handleUnselectFilterItem(key, value)}
            >
              {label}
              <img src={CloseIcon} alt="필터 삭제" />
            </S.SelectedItem>
          ))}
        </S.SelectedList>
      </S.SelectedBox>
      <CardList />
    </S.Main>
  );
}

export default ListPage;
