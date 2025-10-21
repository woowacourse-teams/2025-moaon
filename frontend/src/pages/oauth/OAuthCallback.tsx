import { toast } from "@shared/components/Toast/toast";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function OAuthCallback() {
  const navigate = useNavigate();
  const { result } = useParams();

  useEffect(() => {
    const returnTo = sessionStorage.getItem("oauthReturnTo") || "/";
    sessionStorage.removeItem("oauthReturnTo");

    if (result === "success") {
      toast.success("로그인에 성공했어요.");
      navigate(returnTo, { replace: true });
      return;
    }

    toast.error("로그인에 실패했어요. 다시 시도해주세요.");
    navigate(returnTo, { replace: true });
  }, [navigate, result]);

  return null;
}

export default OAuthCallback;
