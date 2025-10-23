import GoogleIcon from "@assets/icons/google.svg";
import { toast } from "@shared/components/Toast/toast";
import * as S from "./GoogleLoginButton.styled";

function GoogleLoginButton() {
  const handleClick = () => {
    const googleAuthUrl = process.env.GOOGLE_AUTH_URL;
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (!googleAuthUrl) {
      toast.error(
        "구글 로그인 주소가 설정되지 않았습니다. 환경변수 GOOGLE_AUTH_URL을 확인하세요."
      );
      return;
    }

    if (!googleClientId) {
      toast.error(
        "구글 클라이언트 ID가 설정되지 않았습니다. 환경변수 GOOGLE_CLIENT_ID를 확인하세요."
      );
      return;
    }

    if (!googleRedirectUri) {
      toast.error(
        "구글 리디렉트 URI가 설정되지 않았습니다. 환경변수 GOOGLE_REDIRECT_URI를 확인하세요."
      );
      return;
    }

    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    sessionStorage.setItem("oauthReturnTo", currentUrl);

    const state = encodeURIComponent(
      JSON.stringify({
        redirectBase: window.location.origin,
      })
    );

    const url = new URL(googleAuthUrl);
    url.searchParams.set("client_id", googleClientId);
    url.searchParams.set("redirect_uri", googleRedirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "openid email profile");
    url.searchParams.set("state", state);

    // 필요 시 아래 옵션 추가
    // url.searchParams.set("access_type", "offline");
    // url.searchParams.set("prompt", "consent");

    window.location.href = url.toString();
  };

  return (
    <S.GoogleLoginButton type="button" onClick={handleClick}>
      <S.Icon src={GoogleIcon} alt="" />
      구글 로그인
    </S.GoogleLoginButton>
  );
}

export default GoogleLoginButton;
