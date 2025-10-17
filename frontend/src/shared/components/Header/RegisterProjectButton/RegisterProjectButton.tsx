import { useNavigate } from "react-router";
import * as S from "./RegisterProjectButton.styled";

function RegisterProjectButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/register`);
  };

  return (
    <S.RegisterProjectButton type="button" onClick={handleClick}>
      프로젝트 등록
    </S.RegisterProjectButton>
  );
}

export default RegisterProjectButton;
