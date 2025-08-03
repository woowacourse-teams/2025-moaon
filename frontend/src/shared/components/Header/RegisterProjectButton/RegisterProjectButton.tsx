import registerIcon from "@assets/icons/register.svg";
import * as S from "./RegisterProjectButton.styled";

function RegisterProjectButton() {
  const handleClick = () => {
    alert("프로젝트 등록은 추후에 추가될 예정입니다.");
  };

  return (
    <S.RegisterProjectButton type="button" onClick={handleClick}>
      프로젝트 등록
      <S.Icon src={registerIcon} alt="프로젝트 등록" />
    </S.RegisterProjectButton>
  );
}

export default RegisterProjectButton;
