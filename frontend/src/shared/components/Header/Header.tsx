import HeaderLogoImage from "@assets/images/header-logo.webp";
import { DESKTOP_BREAKPOINT } from "@shared/constants/breakPoints";
import { useWindowSize } from "@shared/hooks/useWindowSize";
import { getCookieValue } from "@shared/utils/getCookieValue";
import { useQuery } from "@tanstack/react-query";
import { authQueries } from "@/apis/login/auth.queries";
import GoogleLoginButton from "./GoogleLoginButton/GoogleLoginButton";
import * as S from "./Header.styled";
import MobileHeader from "./MobileHeader/MobileHeader";
import NavBar from "./NavBar/NavBar";
import RegisterProjectButton from "./RegisterProjectButton/RegisterProjectButton";
import UserMenu from "./UserMenu/UserMenu";

function Header() {
  const responseSize = useWindowSize();
  const token = getCookieValue("token");
  const { data: auth } = useQuery(authQueries.fetchAuth(token));

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
          {auth?.isLoggedIn ? (
            <UserMenu
              name={auth.name ?? "Anonymous"}
              onSelect={() => {
                window.location.href = "/";
              }}
            />
          ) : (
            <GoogleLoginButton />
          )}
        </S.Wrap>
      </S.HeaderBox>
    </S.Header>
  );
}

export default Header;
