import * as S from "./SectionTitle.styled";

interface SectionTitleProps {
  text: string;
}

function SectionTitle({ text }: SectionTitleProps) {
  return <S.SectionTitle>{text}</S.SectionTitle>;
}

export default SectionTitle;
