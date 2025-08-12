import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import TechStackFilterList from "../TechStackFilterList/TechStackFilterList";

interface SelectedTechStackProps {
  onSelect: () => void;
}

function SelectedTechStack({ onSelect }: SelectedTechStackProps) {
  const { techStacks: selectedTechStacks } = useFilterParams();

  return (
    <TechStackFilterList
      title="선택된 기술 스택"
      techStacks={selectedTechStacks}
      onSelect={onSelect}
    />
  );
}

export default SelectedTechStack;
