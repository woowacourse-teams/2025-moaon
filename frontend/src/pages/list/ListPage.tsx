import CloseIcon from "@assets/icons/close.svg";
import ResetIcon from "@assets/icons/reset.svg";
import { CATEGORY_MAP, type CategoryKey } from "@domains/filter/category";
import { PLATFORM_ICON_MAP, type PlatformKey } from "@domains/filter/platform";
import {
  TECH_STACK_ICON_MAP,
  type TechStackKey,
} from "@domains/filter/techStack";
import { useState } from "react";
import { flushSync } from "react-dom";
import { useSearchParams } from "react-router";
import CardList from "./CardList/CardList";
import FilterContainer from "./FilterContainer/FilterContainer";
import { useFilterParams } from "./hooks/useFilterParams";
import useProjectList from "./hooks/useProjectList";
import * as S from "./ListPage.styled";
import SortList from "./SortList/SortList";

const getSelectedItems = (searchParams: URLSearchParams) => {
  const techStacks = (searchParams.get("techStacks")?.split(",") ||
    []) as TechStackKey[];
  const platforms = (searchParams.get("platforms")?.split(",") ||
    []) as PlatformKey[];
  const categories = (searchParams.get("categories")?.split(",") ||
    []) as CategoryKey[];

  return {
    techStacks: techStacks.map((item) => ({
      key: "techStacks",
      label: TECH_STACK_ICON_MAP[item].label,
      value: item,
    })),
    platforms: platforms.map((item) => ({
      key: "platforms",
      label: PLATFORM_ICON_MAP[item].label,
      value: item,
    })),
    categories: categories.map((item) => ({
      key: "categories",
      label: CATEGORY_MAP[item].label,
      value: item,
    })),
  };
};

function ListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterRender, setIsFilterRender] = useState(true);
  const { refetch } = useProjectList();
  const { deleteFilter } = useFilterParams();
  const { techStacks, categories, platforms } = getSelectedItems(searchParams);

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
      <S.SelectedBox>
        <S.SelectedList>
          {[...techStacks, ...categories, ...platforms].map(
            ({ key, value, label }) => (
              <S.SelectedItem
                key={value}
                onClick={() => {
                  deleteFilter(key, value);
                  refetch();
                }}
              >
                {label}
                <img src={CloseIcon} alt="필터 삭제" />
              </S.SelectedItem>
            ),
          )}
        </S.SelectedList>
      </S.SelectedBox>
      <CardList />
    </S.Main>
  );
}

export default ListPage;
