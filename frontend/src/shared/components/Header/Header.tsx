import HeaderLogoImage from "@assets/images/header-logo.webp";
import { DESKTOP_BREAKPOINT } from "@shared/constants/breakPoints";
import { useWindowSize } from "@shared/hooks/useWindowSize";
import { getCookieValue } from "@shared/utils/getCookieValue";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authQueries } from "@/apis/login/auth.queries";
import { toast } from "../Toast/toast";
import GoogleLoginButton from "./GoogleLoginButton/GoogleLoginButton";
import * as S from "./Header.styled";
import MobileHeader from "./MobileHeader/MobileHeader";
import NavBar from "./NavBar/NavBar";
import RegisterProjectButton from "./RegisterProjectButton/RegisterProjectButton";

function Header() {
  const navigate = useNavigate();
  const responseSize = useWindowSize();
  const token = getCookieValue("token");

  const { data: auth } = useQuery(authQueries.fetchAuth(token));

  if (responseSize.width < DESKTOP_BREAKPOINT) {
    return <MobileHeader />;
  }

  const handleRegisterClick = () => {
    if (auth?.isLoggedIn) {
      navigate(`/register`);
      return;
    }

    toast.info("프로젝트 등록은 로그인 후에 가능합니다.");
  };

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
          <RegisterProjectButton onClick={handleRegisterClick} />
          {auth?.isLoggedIn ? (
            <S.UserName>{`${auth.name}님 환영합니다.`}</S.UserName>
          ) : (
            <GoogleLoginButton />
          )}
        </S.Wrap>
      </S.HeaderBox>
    </S.Header>
  );
}

export default Header;
