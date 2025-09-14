import type { TechStackKey } from "@domains/filter/techStack";
import { TECH_STACK_GROUPS } from "@domains/filter/techStack";
import IconBadgeList from "@shared/components/IconBadgeList/IconBadgeList";
import SectionTitle from "../SectionTitle";
import * as S from "./TechStacksSection.styled";

interface TechStacksSectionProps {
  techStacks: TechStackKey[];
}

function TechStacksSection({ techStacks }: TechStacksSectionProps) {
  return (
    <S.TechStacksSection>
      <SectionTitle title="기술 스택" />

      {Object.entries(TECH_STACK_GROUPS).map(([groupName, stackMap]) => {
        const groupStacks = techStacks.filter((stack) =>
          Object.keys(stackMap).includes(stack),
        );

        if (groupStacks.length === 0) return null;

        return (
          <S.GroupStacksWrapper key={groupName}>
            <S.GroupName>{groupName}</S.GroupName>
            <IconBadgeList iconBadges={groupStacks} />
          </S.GroupStacksWrapper>
        );
      })}
    </S.TechStacksSection>
  );
}

export default TechStacksSection;
