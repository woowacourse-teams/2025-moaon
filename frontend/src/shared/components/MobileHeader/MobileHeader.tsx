import HeaderLogoImage from "@assets/images/header-logo.webp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CloseButtonIcon from "../CloseButtonIcon/CloseButtonIcon";
import NavBar from "../Header/NavBar/NavBar";
import RegisterProjectButton from "../Header/RegisterProjectButton/RegisterProjectButton";
import * as S from "./MobileHeader.styled";

function MobileHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
    navigate(`/register`);
    close();
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
          <RegisterProjectButton onclick={handleRegisterClick} />
        </S.DrawerFooter>
      </S.Drawer>
    </S.Header>
  );
}

export default MobileHeader;
