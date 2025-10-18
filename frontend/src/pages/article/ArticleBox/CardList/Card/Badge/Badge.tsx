import type { PropsWithChildren } from "react";
import * as S from "./Badge.styled";

function Badge({ children }: PropsWithChildren) {
  return (
    <S.BadgeContainer>
      <S.BadgeText>{children}</S.BadgeText>
    </S.BadgeContainer>
  );
}

export default Badge;
