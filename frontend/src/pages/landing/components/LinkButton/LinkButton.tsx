import type { PropsWithChildren } from "react";
import * as S from "./LinkButton.styled";

interface LinkButton {
  href: string;
}

function LinkButton({ children, href }: PropsWithChildren<LinkButton>) {
  return <S.LinkButton to={href}>{children}</S.LinkButton>;
}

export default LinkButton;
