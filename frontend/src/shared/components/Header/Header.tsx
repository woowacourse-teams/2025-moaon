import HeaderLogoImage from "@assets/images/header-logo.webp";
import { useEffect, useState } from "react";
import MobileHeader from "../MobileHeader/MobileHeader";
import GoogleLoginButton from "./GoogleLoginButton/GoogleLoginButton";
import * as S from "./Header.styled";
import NavBar from "./NavBar/NavBar";
import RegisterProjectButton from "./RegisterProjectButton/RegisterProjectButton";
import { useQuery } from "@tanstack/react-query";
import { authQueries } from "@/apis/auth/auth.queries";

const MOBILE_BREAKPOINT = 1024;

function Header() {
  const token =
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")
      .slice(1)
      .join("=") ?? "";
  const [isMobileLike, setIsMobileLike] = useState<boolean>(() =>
    typeof window === "undefined"
      ? false
      : window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const onResize = () =>
      setIsMobileLike(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { data: auth } = useQuery({
    ...authQueries.fetchAuth(token),
  });

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
          {auth?.isLoggedIn ? (
            <div>{auth.name}님 환영합니다.</div>
          ) : (
            <GoogleLoginButton />
          )}
        </S.Wrap>
      </S.HeaderBox>
    </S.Header>
  );
}

export default Header;
