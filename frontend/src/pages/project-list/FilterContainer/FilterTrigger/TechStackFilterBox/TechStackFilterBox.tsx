import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import RecommendTechStack from "./RecommendTechStack/RecommendTechStack";
import SelectedTechStack from "./SelectedTechStack/SelectedTechStack";
import TechStackSearchBar from "./TechStackSearchBar/TechStackSearchBar";

interface TechStackFilterBoxProps {
  onSelect: () => void;
}

function TechStackFilterBox({ onSelect }: TechStackFilterBoxProps) {
  const { techStacks: selectedTechStacks } = useFilterParams();

  return (
    <>
      <TechStackSearchBar onSelect={onSelect} />
      {selectedTechStacks.length > 0 ? (
        <SelectedTechStack
          techStacks={selectedTechStacks}
          onSelect={onSelect}
        />
      ) : (
        <RecommendTechStack onSelect={onSelect} />
      )}
    </>
  );
}

export default TechStackFilterBox;
