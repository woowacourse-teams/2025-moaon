import type { TechStackKey } from "@domains/filter/techStack";

import TechStackFilterList from "../TechStackFilterList/TechStackFilterList";

interface SelectedTechStackProps {
  techStacks: TechStackKey[];
  onSelect: () => void;
}

function SelectedTechStack({ techStacks, onSelect }: SelectedTechStackProps) {
  return (
    <TechStackFilterList
      title="선택된 기술 스택"
      techStacks={techStacks}
      onSelect={onSelect}
    />
  );
}

export default SelectedTechStack;
