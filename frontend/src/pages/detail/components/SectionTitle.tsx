import * as S from "./SectionTitle.styled";

interface SectionTitleProps {
  title: string;
}

function SectionTitle({ title }: SectionTitleProps) {
  return <S.SectionTitle>{title}</S.SectionTitle>;
}

export default SectionTitle;
