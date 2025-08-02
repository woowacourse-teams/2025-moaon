import type { TechStackKey } from "@domains/filter/techStack";

import TechStackFilterList from "../TechStackFilterList/TechStackFilterList";

const RECOMMEND_TECH_STACKS = [
  "react",
  "nodejs",
  "aws",
  "kotlin",
  "swift",
  "flutter",
  "mysql",
  "python",
  "express",
  "typescript",
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
