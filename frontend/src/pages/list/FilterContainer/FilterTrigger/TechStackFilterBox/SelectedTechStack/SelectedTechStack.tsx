import type { TechStackKey } from "@domains/filter/techStack";

import TechStackFilterList from "../TechStackFilterList/TechStackFilterList";

interface SelectedTechStackProps {
  techStacks: TechStackKey[];
}

function SelectedTechStack({ techStacks }: SelectedTechStackProps) {
  return (
    <TechStackFilterList title="선택된 기술 스택" techStacks={techStacks} />
  );
}

export default SelectedTechStack;
