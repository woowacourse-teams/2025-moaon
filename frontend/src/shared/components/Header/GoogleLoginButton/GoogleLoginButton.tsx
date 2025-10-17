import { toast } from "@shared/components/Toast/toast";
import * as S from "./GoogleLoginButton.styled";

function GoogleLoginButton() {
  const handleClick = () => {
    const googleAuthUrl = process.env.GOOGLE_AUTH_URL;
    const redirectPath = process.env.GOOGLE_REDIRECT_PATH || "/oauth/callback";

    if (!googleAuthUrl) {
      toast.error(
        "구글 로그인 주소가 설정되지 않았습니다. 환경변수 GOOGLE_AUTH_URL을 확인하세요.",
      );
      return;
    }

    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    sessionStorage.setItem("oauthReturnTo", currentUrl);

    const redirectUri = `${window.location.origin}${redirectPath}`;
    const url = new URL(googleAuthUrl, window.location.origin);
    if (!url.searchParams.has("redirect_uri")) {
      url.searchParams.set("redirect_uri", redirectUri);
    }

    window.location.href = url.toString();
  };

  return (
    <S.GoogleLoginButton type="button" onClick={handleClick}>
      구글 로그인
    </S.GoogleLoginButton>
  );
}

export default GoogleLoginButton;
