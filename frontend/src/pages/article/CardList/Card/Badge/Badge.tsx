import * as S from "./Badge.styled";

interface BadgeProps {
  text: string;
  bgColor?: string;
}

function Badge({ text, bgColor = "#d9d9d9" }: BadgeProps) {
  return (
    <S.BadgeContainer bgColor={bgColor}>
      <S.BadgeText>{text}</S.BadgeText>
    </S.BadgeContainer>
  );
}

export default Badge;
