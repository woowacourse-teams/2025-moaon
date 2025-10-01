import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as S from "./OverviewSection.styled";

interface OverviewSectionProps {
  overview?: string;
}

function OverviewSection({ overview = "" }: OverviewSectionProps) {
  return (
    <S.OverviewSectionContainer>
      <S.OverviewContent>
        <Markdown remarkPlugins={[remarkGfm]}>{overview}</Markdown>
      </S.OverviewContent>
    </S.OverviewSectionContainer>
  );
}

export default OverviewSection;
