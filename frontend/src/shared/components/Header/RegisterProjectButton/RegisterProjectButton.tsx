import { toast } from "@shared/components/Toast/toast";
import { useNavigate } from "react-router";
import * as S from "./RegisterProjectButton.styled";

interface RegisterProjectButtonProps {
  isLoggedIn: boolean;
  close?: () => void;
}

function RegisterProjectButton({
  isLoggedIn,
  close,
}: RegisterProjectButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      toast.error("로그인 후 이용해주세요.");
      return;
    }

    navigate(`/register`);
    close?.();
  };

  return (
    <S.RegisterProjectButton type="button" onClick={handleClick}>
      프로젝트 등록
    </S.RegisterProjectButton>
  );
}

export default RegisterProjectButton;
