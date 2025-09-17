import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import { getRecommendTechStackBySector } from "../../../../../../utils/sectorHandlers";
import TechStackFilterList from "../TechStackFilterList/TechStackFilterList";

interface RecommendTechStackProps {
  onSelect: () => void;
  sector: string | null;
}

function RecommendTechStack({ onSelect, sector }: RecommendTechStackProps) {
  const { techStacks: selectedTechStacks } = useFilterParams();
  const recommendTechStacks = getRecommendTechStackBySector(sector);
  const filteredTechStacks = recommendTechStacks.filter(
    (techStack) => !selectedTechStacks.includes(techStack),
  );

  return (
    <TechStackFilterList
      title="추천 기술 스택"
      techStacks={filteredTechStacks}
      onSelect={onSelect}
      emptyText="추천 기술 스택이 모두 선택되었습니다."
    />
  );
}

export default RecommendTechStack;
