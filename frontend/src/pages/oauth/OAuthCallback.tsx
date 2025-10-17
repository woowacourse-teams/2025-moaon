import { toast } from "@shared/components/Toast/toast";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const loginSuccess = url.searchParams.get("success");
    const message = url.searchParams.get("message");

    const returnTo = sessionStorage.getItem("oauthReturnTo") || "/";
    sessionStorage.removeItem("oauthReturnTo");

    if (loginSuccess === "true") {
      toast.success("로그인에 성공했어요.");
      navigate(returnTo, { replace: true });
      return;
    }

    toast.error(message || "로그인에 실패했어요. 다시 시도해주세요.");
    navigate(returnTo, { replace: true });
  }, [navigate]);

  return null;
}

export default OAuthCallback;
