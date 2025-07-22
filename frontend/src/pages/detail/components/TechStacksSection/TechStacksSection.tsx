import SectionTitle from "../SectionTitle";
import TechStackBadge from "./TechStackBadge/TechStackBadge";
import * as S from "./TechStacksSection.styled";

interface TechStacksSectionProps {
  techStacks: string[];
}

function TechStacksSection({ techStacks }: TechStacksSectionProps) {
  return (
    <S.TechStacksSection>
      <SectionTitle text="기술 스택" />
      <S.TechStackBadgeList>
        {techStacks.map((techStack) => (
          <TechStackBadge key={techStack} text="React" />
        ))}
      </S.TechStackBadgeList>
    </S.TechStacksSection>
  );
}

export default TechStacksSection;
