import resetIcon from "@assets/icons/reset.svg";
import TechStackFilterBox from "@domains/components/TechStackFilterBox/TechStackFilterBox";
import { META_TITLE_PREFIX } from "@domains/constants/meta";
import { useSearchSort } from "@domains/hooks/useSearchSort";
import { PROJECT_SORT_MAP } from "@domains/sort/project";
import FilterContainer from "@shared/components/FilterContainer/FilterContainer";
import { useMeta } from "@shared/hooks/useMeta";
import MoveTop from "@/shared/components/MoveTop/MoveTop";
import CategoryFilterBox from "../../domains/components/CategoryFilterBox/CategoryFilterBox";
import SortList from "../../domains/components/SortList/SortList";
import CardList from "./CardList/CardList";
import { useFilterParams } from "./hooks/useFilterParams";
import useProjectList from "./hooks/useProjectList";
import * as S from "./ProjectListPage.styled";
import ProjectSearchBar from "./ProjectSearchBar/ProjectSearchBar";

const DEFAULT_SORT_TYPE = "createdAt";
const PROJECT_LIST_PAGE_DESCRIPTION =
  "다양한 개발자들의 프로젝트를 탐색하고 학습하세요";

function ProjectListPage() {
  const { techStacks, categories, resetFilter } = useFilterParams();
  const { refetch, totalCount } = useProjectList();

  const { hasSearch, excludeKeys } = useSearchSort<
    keyof typeof PROJECT_SORT_MAP
  >({
    excludeKeysWhenNoSearch: ["relevance"],
  });

  useMeta({
    title: `${META_TITLE_PREFIX}프로젝트 탐색`,
    description: PROJECT_LIST_PAGE_DESCRIPTION,
  });

  const handleFilterResetButtonClick = () => {
    resetFilter();
    refetch();
  };

  const handleSelect = () => {
    refetch();
  };

  const isSelected = techStacks.length > 0 || categories.length > 0;
  const shouldShowSort = totalCount > 0;

  return (
    <S.Main>
      <S.MainBox>
        <S.TitleBox>
          <S.MainTitle>프로젝트 탐색</S.MainTitle>
          <S.MainDescription>{PROJECT_LIST_PAGE_DESCRIPTION}</S.MainDescription>
        </S.TitleBox>
        <ProjectSearchBar />
      </S.MainBox>
      <S.Box>
        <S.Wrap>
          <FilterContainer
            filterList={[
              {
                label: "기술 스택",
                param: "techStacks",
                render: (onSelect: () => void) => (
                  <TechStackFilterBox onSelect={onSelect} />
                ),
              },
              {
                label: "주제",
                param: "categories",
                render: (onSelect: () => void) => (
                  <CategoryFilterBox onSelect={onSelect} />
                ),
              },
            ]}
            onSelect={handleSelect}
          />
          {isSelected && (
            <S.ResetButton type="button" onClick={handleFilterResetButtonClick}>
              <S.ResetIcon src={resetIcon} alt="필터 초기화" />
            </S.ResetButton>
          )}
        </S.Wrap>
        {shouldShowSort && (
          <SortList
            sortMap={PROJECT_SORT_MAP}
            onSelect={handleSelect}
            initialValue={hasSearch ? "relevance" : DEFAULT_SORT_TYPE}
            excludeKeys={excludeKeys}
          />
        )}
      </S.Box>
      <CardList />
      <MoveTop />
    </S.Main>
  );
}

export default ProjectListPage;
