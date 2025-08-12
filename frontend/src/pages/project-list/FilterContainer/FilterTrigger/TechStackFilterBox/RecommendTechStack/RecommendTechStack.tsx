import type { TechStackKey } from "@domains/filter/techStack";
import { useFilterParams } from "@/pages/project-list/hooks/useFilterParams";
import TechStackFilterList from "../TechStackFilterList/TechStackFilterList";

const RECOMMEND_TECH_STACKS = [
  "react",
  "typescript",
  "nextjs",
  "mysql",
  "spring",
  "aws",
  "redis",
  "java",
  "docker",
  "kotlin",
] as TechStackKey[];

interface RecommendTechStackProps {
  onSelect: () => void;
}

function RecommendTechStack({ onSelect }: RecommendTechStackProps) {
  const { techStacks: selectedTechStacks } = useFilterParams();

  const filteredTechStacks = RECOMMEND_TECH_STACKS.filter(
    (techStack) => !selectedTechStacks.includes(techStack),
  );

  return (
    <TechStackFilterList
      title="추천 기술 스택"
      techStacks={filteredTechStacks}
      onSelect={onSelect}
    />
  );
}

export default RecommendTechStack;
