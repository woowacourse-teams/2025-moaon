import { useGetSectorLocation } from "@domains/hooks/useGetSectorLocation";
import { getRecommendTechStackBySector } from "@domains/utils/sectorHandlers";
import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import TechStackFilterList from "../TechStackFilterList/TechStackFilterList";

interface RecommendTechStackProps {
  onSelect: () => void;
}

function RecommendTechStack({ onSelect }: RecommendTechStackProps) {
  const { techStacks: selectedTechStacks } = useFilterParams();
  const sector = useGetSectorLocation();
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
