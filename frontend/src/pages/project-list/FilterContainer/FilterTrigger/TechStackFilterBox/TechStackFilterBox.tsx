import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import FilterBox from "../FilterBox/FilterBox";
import RecommendTechStack from "./RecommendTechStack/RecommendTechStack";
import SelectedTechStack from "./SelectedTechStack/SelectedTechStack";
import TechStackSearchBar from "./TechStackSearchBar/TechStackSearchBar";

interface TechStackFilterBoxProps {
  onSelect: () => void;
}

function TechStackFilterBox({ onSelect }: TechStackFilterBoxProps) {
  const { techStacks: selectedTechStacks } = useFilterParams();

  return (
    <FilterBox param="techStacks" onSelect={onSelect}>
      <TechStackSearchBar />
      {selectedTechStacks.length > 0 ? (
        <SelectedTechStack
          techStacks={selectedTechStacks}
          onSelect={onSelect}
        />
      ) : (
        <RecommendTechStack onSelect={onSelect} />
      )}
    </FilterBox>
  );
}

export default TechStackFilterBox;
