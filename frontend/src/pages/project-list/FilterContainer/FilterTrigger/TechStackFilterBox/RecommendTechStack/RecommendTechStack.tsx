import type { TechStackKey } from "@domains/filter/techStack";

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

function RecommendTechStack() {
  return (
    <TechStackFilterList
      title="추천 기술 스택"
      techStacks={RECOMMEND_TECH_STACKS}
    />
  );
}

export default RecommendTechStack;
