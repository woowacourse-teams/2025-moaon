import * as S from "./Badge.styled";

interface BadgeProps {
  bgColor: string;
  children: React.ReactNode;
}

function Badge({ bgColor, children }: BadgeProps) {
  return (
    <S.BadgeContainer bgColor={bgColor}>
      <S.BadgeText>{children}</S.BadgeText>
    </S.BadgeContainer>
  );
}

export default Badge;
