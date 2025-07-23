import type { PropsWithChildren } from "react";
import * as S from "./GlobalLayout.styled";

function GlobalLayout({ children }: PropsWithChildren) {
  return <S.GlobalLayout>{children}</S.GlobalLayout>;
}

export default GlobalLayout;
