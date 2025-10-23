import type { PropsWithChildren } from "react";
import { useLocation } from "react-router";
import Header from "../Header/Header";
import * as S from "./GlobalLayout.styled";

function GlobalLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <Header />}
      <S.GlobalLayout isLandingPage={isLandingPage}>{children}</S.GlobalLayout>
    </>
  );
}

export default GlobalLayout;
