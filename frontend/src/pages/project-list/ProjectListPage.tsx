import resetIcon from "@assets/icons/reset.svg";
import { PROJECT_SORT_MAP } from "@domains/sort/project";
import SortList from "../../domains/components/SortList/SortList";
import CardList from "./CardList/CardList";
import FilterContainer from "./FilterContainer/FilterContainer";
import { useFilterParams } from "./hooks/useFilterParams";
import useProjectList from "./hooks/useProjectList";
import * as S from "./ProjectListPage.styled";
import ProjectSearchBar from "./ProjectSearchBar/ProjectSearchBar";

function ProjectListPage() {
  const { techStacks, categories, resetFilter } = useFilterParams();
  const { refetch } = useProjectList();

  const handleFilterResetButtonClick = () => {
    resetFilter();
    refetch();
  };

  const handleSelect = () => {
    refetch();
  };

  const isSelected = techStacks.length > 0 || categories.length > 0;
  return (
    <S.Main>
      <S.MainBox>
        <S.TitleBox>
          <S.MainTitle>프로젝트 탐색</S.MainTitle>
          <S.MainDescription>
            다양한 개발자들의 프로젝트를 탐색하고 학습하세요
          </S.MainDescription>
        </S.TitleBox>
        <ProjectSearchBar />
      </S.MainBox>
      <S.Box>
        <S.Wrap>
          <FilterContainer />
          {isSelected && (
            <S.ResetButton type="button" onClick={handleFilterResetButtonClick}>
              <S.ResetIcon src={resetIcon} alt="필터 초기화" />
            </S.ResetButton>
          )}
        </S.Wrap>
        <SortList
          sortMap={PROJECT_SORT_MAP}
          onSelect={handleSelect}
          initialValue="createdAt"
        />
      </S.Box>
      <CardList />
    </S.Main>
  );
}

export default ProjectListPage;
