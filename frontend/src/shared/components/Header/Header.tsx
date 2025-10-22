import HeaderLogoImage from "@assets/images/header-logo.webp";
import { DESKTOP_BREAKPOINT } from "@shared/constants/breakPoints";
import { useWindowSize } from "@shared/hooks/useWindowSize";
import MobileHeader from "../MobileHeader/MobileHeader";
import * as S from "./Header.styled";
import NavBar from "./NavBar/NavBar";
import RegisterProjectButton from "./RegisterProjectButton/RegisterProjectButton";

function Header() {
  const responseSize = useWindowSize();

  if (responseSize.width < DESKTOP_BREAKPOINT) {
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
