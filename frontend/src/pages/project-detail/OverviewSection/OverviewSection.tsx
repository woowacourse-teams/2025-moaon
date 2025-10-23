import Markdown from "@shared/components/Markdown/Markdown";
import * as S from "./OverviewSection.styled";

interface OverviewSectionProps {
  overview?: string;
}

function OverviewSection({ overview = "" }: OverviewSectionProps) {
  return (
    <S.OverviewSectionContainer>
      <S.OverviewContent tabIndex={0}>
        <Markdown text={overview} />
      </S.OverviewContent>
    </S.OverviewSectionContainer>
  );
}

export default OverviewSection;
