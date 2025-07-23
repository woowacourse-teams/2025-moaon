import IconBadgeList from "@shared/components/IconBadgeList/IconBadgeList";
import type { PlatformKey } from "@/shared/components/IconBadgeList/constants/iconMap";
import SectionTitle from "../SectionTitle";
import * as S from "./PlatformSection.styled";

interface PlatformSectionProps {
  platforms: PlatformKey[];
}

function PlatformSection({ platforms }: PlatformSectionProps) {
  return (
    <S.PlatformSection>
      <SectionTitle title="플랫폼" />
      <IconBadgeList iconBadges={platforms} />
    </S.PlatformSection>
  );
}

export default PlatformSection;
