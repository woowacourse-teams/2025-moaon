import type { PropsWithChildren } from "react";
import Header from "../Header/Header";
import * as S from "./GlobalLayout.styled";

function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <S.GlobalLayout>{children}</S.GlobalLayout>
    </>
  );
}

export default GlobalLayout;
