import { useNavigate } from "react-router";
import * as S from "./RegisterProjectButton.styled";

interface RegisterProjectButtonProps {
  onclick?: () => void;
}

function RegisterProjectButton({ onclick }: RegisterProjectButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/register`);
  };

  return (
    <S.RegisterProjectButton type="button" onClick={onclick ?? handleClick}>
      프로젝트 등록
    </S.RegisterProjectButton>
  );
}

export default RegisterProjectButton;
