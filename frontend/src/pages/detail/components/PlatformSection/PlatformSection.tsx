import IconBadgeList from "@shared/components/IconBadgeList/IconBadgeList";
import SectionTitle from "../SectionTitle";
import * as S from "./PlatformSection.styled";

interface PlatformSectionProps {
  platforms: string[];
}

function PlatformSection({ platforms }: PlatformSectionProps) {
  return (
    <S.PlatformSection>
      <SectionTitle text="플랫폼" />
      <IconBadgeList iconBadges={platforms} />
    </S.PlatformSection>
  );
}

export default PlatformSection;
