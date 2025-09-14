import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import TechStackFilterList from "../TechStackFilterList/TechStackFilterList";
import { getTechStackBySector } from "../utils/getTechStackBySector";

interface RecommendTechStackProps {
  onSelect: () => void;
  sector: string | null;
}

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function RecommendTechStack({ onSelect, sector }: RecommendTechStackProps) {
  const { techStacks: selectedTechStacks } = useFilterParams();
  const techStacks = getTechStackBySector(sector);
  const filteredTechStacks = shuffleArray(
    [...techStacks]
      .filter((techStack) => !selectedTechStacks.includes(techStack[0]))
      .map(([label, _]) => label),
  ).slice(0, 10);
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
