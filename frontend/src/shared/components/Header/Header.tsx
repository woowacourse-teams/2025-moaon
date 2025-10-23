import HeaderLogoImage from "@assets/images/header-logo.webp";
import { DESKTOP_BREAKPOINT } from "@shared/constants/breakPoints";
import { useOverlay } from "@shared/hooks/useOverlay";
import { useWindowSize } from "@shared/hooks/useWindowSize";
import { getCookieValue } from "@shared/utils/getCookieValue";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authQueries } from "@/apis/login/auth.queries";
import LoginModal from "../LoginModal/LoginModal";
import { toast } from "../Toast/toast";
import * as S from "./Header.styled";
import MobileHeader from "./MobileHeader/MobileHeader";
import NavBar from "./NavBar/NavBar";
import RegisterProjectButton from "./RegisterProjectButton/RegisterProjectButton";
import UserMenu from "./UserMenu/UserMenu";

function Header() {
  const navigate = useNavigate();
  const responseSize = useWindowSize();
  const token = getCookieValue("token");
  const { data: auth } = useQuery(authQueries.fetchAuth(token));
  const { open, close, isOpen } = useOverlay();

  const { mutate: logout } = useMutation(authQueries.logout());

  if (responseSize.width < DESKTOP_BREAKPOINT) {
    return <MobileHeader />;
  }

  const handleRegisterClick = () => {
    if (auth?.isLoggedIn) {
      navigate("/register", { state: { reset: true }, replace: true });
      return;
    }
    toast.info("프로젝트 등록은 로그인 후에 가능합니다.");
    open();
  };

  return (
    <S.Header>
      <S.HeaderBox>
        <S.Wrap>
          <S.LogoLink to="/" aria-label="모아온 홈페이지로 이동">
            <img src={HeaderLogoImage} alt="모아온 로고" />
          </S.LogoLink>
          <NavBar />
        </S.Wrap>
        <S.Wrap>
          <RegisterProjectButton onClick={handleRegisterClick} />
          {auth?.isLoggedIn && (
            <UserMenu
              name={auth.name ?? "Anonymous"}
              onSelect={() => {
                logout();
                getCookieValue("token")
                  ? toast.error("로그아웃에 실패했어요. 다시 시도해주세요.")
                  : toast.success("로그아웃에 성공했어요.");
                navigate("/");
              }}
            />
          )}
        </S.Wrap>
      </S.HeaderBox>
      <LoginModal isOpen={isOpen} close={close} />
    </S.Header>
  );
}

export default Header;
