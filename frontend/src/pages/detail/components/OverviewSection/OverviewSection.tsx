import SectionTitle from "../SectionTitle";
import * as S from "./OverviewSection.styled";

interface OverviewSectionProps {
  overview?: string;
}

function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <S.OverviewSectionContainer>
      <SectionTitle title="프로젝트 개요" />
      <S.OverviewContent>{overview || null}</S.OverviewContent>
    </S.OverviewSectionContainer>
  );
}

export default OverviewSection;
