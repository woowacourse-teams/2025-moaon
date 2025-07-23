import IconBadgeList from "@shared/components/IconBadgeList/IconBadgeList";
import type { TechStackKey } from "@/shared/components/IconBadgeList/constants/iconMap";
import SectionTitle from "../SectionTitle";
import * as S from "./TechStacksSection.styled";

interface TechStacksSectionProps {
  techStacks: TechStackKey[];
}

function TechStacksSection({ techStacks }: TechStacksSectionProps) {
  return (
    <S.TechStacksSection>
      <SectionTitle title="기술 스택" />
      <IconBadgeList iconBadges={techStacks} />
    </S.TechStacksSection>
  );
}

export default TechStacksSection;
