import { useNavigate } from "react-router";
import * as S from "./RegisterProjectButton.styled";

interface RegisterProjectButtonProps {
  close?: () => void;
}

function RegisterProjectButton({ close }: RegisterProjectButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
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
