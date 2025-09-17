import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import TechStackFilterList from "../TechStackFilterList/TechStackFilterList";
import { getTechStackBySector } from "../utils/getTechStackBySector";

interface RecommendTechStackProps {
  onSelect: () => void;
  sector: string | null;
}

function RecommendTechStack({ onSelect, sector }: RecommendTechStackProps) {
  const { techStacks: selectedTechStacks } = useFilterParams();
  const techStackEntry = getTechStackBySector(sector);
  const filteredTechStacks = techStackEntry
    .filter(([techStack, _]) => !selectedTechStacks.includes(techStack))
    .map(([label, _]) => label);

  const limitedTechStacks = filteredTechStacks.slice(0, 10);

  return (
    <TechStackFilterList
      title="추천 기술 스택"
      techStacks={limitedTechStacks}
      onSelect={onSelect}
      emptyText="추천 기술 스택이 모두 선택되었습니다."
    />
  );
}

export default RecommendTechStack;
