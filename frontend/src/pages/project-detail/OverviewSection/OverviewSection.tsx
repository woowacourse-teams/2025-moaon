import Markdown from "react-markdown";
import * as S from "./OverviewSection.styled";

interface OverviewSectionProps {
  overview?: string;
}

function OverviewSection({ overview = "" }: OverviewSectionProps) {
  console.log(overview);
  return (
    <S.OverviewSectionContainer>
      <S.OverviewContent>
        <Markdown>{overview}</Markdown>
      </S.OverviewContent>
    </S.OverviewSectionContainer>
  );
}

export default OverviewSection;
