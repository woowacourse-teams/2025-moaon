import HeaderLogoImage from "@assets/images/header-logo.webp";
import { toast } from "@shared/components/Toast/toast";
import { getCookieValue } from "@shared/utils/getCookieValue";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authQueries } from "@/apis/login/auth.queries";
import CloseButtonIcon from "../../CloseButtonIcon/CloseButtonIcon";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import NavBar from "../NavBar/NavBar";
import RegisterProjectButton from "../RegisterProjectButton/RegisterProjectButton";
import UserMenu from "../UserMenu/UserMenu";
import * as S from "./MobileHeader.styled";

function MobileHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const token = getCookieValue("token");
  const { data: auth } = useQuery(authQueries.fetchAuth(token));
  const { mutate: logout } = useMutation(authQueries.logout());

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

  const handleRegisterClick = () => {
    if (auth?.isLoggedIn) {
      navigate(`/register`);
      close();
      return;
    }

    toast.info("프로젝트 등록은 로그인 후에 가능합니다.");
  };
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
          <S.HamburgerButtonLine />
          <S.HamburgerButtonLine />
          <S.HamburgerButtonLine />
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
          <S.DrawerTitle>메뉴 살펴보기</S.DrawerTitle>
          <CloseButtonIcon onClick={close} />
        </S.DrawerHeader>
        <S.DrawerContent onClick={close}>
          <NavBar />
        </S.DrawerContent>
        <S.DrawerFooter>
          <RegisterProjectButton onClick={handleRegisterClick} />
          {auth?.isLoggedIn ? (
            <UserMenu
              name={auth.name ?? "Anonymous"}
              direction="up"
              onSelect={async () => {
                await logout();
                getCookieValue("token")
                  ? toast.error("로그아웃에 실패했어요. 다시 시도해주세요.")
                  : toast.success("로그아웃에 성공했어요.");
                navigate("/");
              }}
            />
          ) : (
            <GoogleLoginButton />
          )}
        </S.DrawerFooter>
      </S.Drawer>
    </S.Header>
  );
}

export default MobileHeader;
