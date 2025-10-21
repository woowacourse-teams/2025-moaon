import HeaderLogoImage from "@assets/images/header-logo.webp";
import { useEffect, useState } from "react";
import NavBar from "../Header/NavBar/NavBar";
import RegisterProjectButton from "../Header/RegisterProjectButton/RegisterProjectButton";
import * as S from "./MobileHeader.styled";
import { useQuery } from "@tanstack/react-query";
import { authQueries } from "@/apis/auth/auth.queries";
import GoogleLoginButton from "../Header/GoogleLoginButton/GoogleLoginButton";

function MobileHeader() {
  const [open, setOpen] = useState(false);
  const token =
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")
      .slice(1)
      .join("=") ?? "";

  const { data: auth } = useQuery({
    ...authQueries.fetchAuth(token),
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const close = () => setOpen(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <S.Header>
      <S.TopBar>
        <S.LogoLink to="/" onClick={close}>
          <img src={HeaderLogoImage} alt="모아온 로고" />
        </S.LogoLink>
        <S.HamburgerButton
          aria-label="메뉴 열기"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={toggle}
        >
          <span />
          <span />
          <span />
        </S.HamburgerButton>
      </S.TopBar>
      <S.Overlay
        $open={open}
        onClick={close}
        aria-hidden={!open}
        data-open={open}
      />
      <S.Drawer id="mobile-drawer" role="dialog" aria-modal="true" $open={open}>
        <S.DrawerHeader>
          <S.DrawerTitle>메뉴</S.DrawerTitle>
          <S.CloseButton aria-label="메뉴 닫기" onClick={close}>
            ×
          </S.CloseButton>
        </S.DrawerHeader>

        <S.DrawerContent onClick={close}>
          <NavBar />
        </S.DrawerContent>

        <S.DrawerFooter>
          <RegisterProjectButton />
          {auth?.isLoggedIn ? (
            <S.UserName>{`${auth.name}님 환영합니다.`}</S.UserName>
          ) : (
            <GoogleLoginButton />
          )}
        </S.DrawerFooter>
      </S.Drawer>
    </S.Header>
  );
}

export default MobileHeader;
