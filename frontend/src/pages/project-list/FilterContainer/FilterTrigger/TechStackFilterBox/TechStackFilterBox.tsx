import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import FilterBox from "../FilterBox/FilterBox";
import RecommendTechStack from "./RecommendTechStack/RecommendTechStack";
import SelectedTechStack from "./SelectedTechStack/SelectedTechStack";
import TechStackSearchBar from "./TechStackSearchBar/TechStackSearchBar";

function TechStackFilterBox() {
  const { techStacks: selectedTechStacks } = useFilterParams();

  return (
    <FilterBox param="techStacks">
      <TechStackSearchBar />
      {selectedTechStacks.length > 0 ? (
        <SelectedTechStack techStacks={selectedTechStacks} />
      ) : (
        <RecommendTechStack />
      )}
    </FilterBox>
  );
}

export default TechStackFilterBox;
