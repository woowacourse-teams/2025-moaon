import { useServiceWorker } from "@shared/hooks/useServiceWorker";
import type { PropsWithChildren } from "react";
import { useLocation } from "react-router";
import Header from "../Header/Header";
import UpdateBanner from "../UpdateBanner/UpdateBanner";
import * as S from "./GlobalLayout.styled";

function GlobalLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const isLandingPage =
    location.pathname === "/" || location.pathname === "/test";
  const { handleUpdate, handleDismiss, showUpdateBanner } = useServiceWorker();

  return (
    <>
      {showUpdateBanner && (
        <UpdateBanner onUpdate={handleUpdate} onDismiss={handleDismiss} />
      )}
      {/* {!isLandingPage && <Header />} */}
      <S.GlobalLayout isLandingPage={isLandingPage}>{children}</S.GlobalLayout>
    </>
  );
}

export default GlobalLayout;
