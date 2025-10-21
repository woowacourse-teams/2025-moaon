import HeaderLogoImage from "@assets/images/header-logo.webp";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { authQueries } from "@/apis/login/auth.queries";
import MobileHeader from "../MobileHeader/MobileHeader";
import GoogleLoginButton from "./GoogleLoginButton/GoogleLoginButton";
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

  const { data: auth } = useQuery(authQueries.fetchAuth());

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
          <RegisterProjectButton isLoggedIn={auth?.isLoggedIn ?? false} />
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
