import HeaderLogoImage from "@assets/images/header-logo.webp";
import { useEffect, useState } from "react";
import MobileHeader from "../MobileHeader/MobileHeader";
import * as S from "./Header.styled";
import NavBar from "./NavBar/NavBar";
import RegisterProjectButton from "./RegisterProjectButton/RegisterProjectButton";

const MOBILE_BREAKPOINT = 1024;

function Header() {
  const [isMobileLike, setIsMobileLike] = useState<boolean>(() =>
    typeof window === "undefined"
      ? false
      : window.innerWidth <= MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const onResize = () =>
      setIsMobileLike(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (isMobileLike) {
    return <MobileHeader />;
  }
  return (
    <S.Header>
      <S.HeaderBox>
        <S.Wrap>
          <S.LogoLink to="/">
            <img src={HeaderLogoImage} alt="모아온 로고" />
          </S.LogoLink>
          <NavBar />
        </S.Wrap>
        <S.Wrap>
          <RegisterProjectButton />
        </S.Wrap>
      </S.HeaderBox>
    </S.Header>
  );
}

export default Header;
