import type { PropsWithChildren } from "react";
import * as S from "./Badge.styled";

interface BadgeProps {
  bgColor: string;
}

function Badge({ bgColor, children }: PropsWithChildren<BadgeProps>) {
  return (
    <S.BadgeContainer bgColor={bgColor}>
      <S.BadgeText>{children}</S.BadgeText>
    </S.BadgeContainer>
  );
}

export default Badge;
