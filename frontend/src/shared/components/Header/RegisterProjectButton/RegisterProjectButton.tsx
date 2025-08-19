import { toast } from "@shared/components/Toast/toast";
import * as S from "./RegisterProjectButton.styled";

function RegisterProjectButton() {
  const handleClick = () => {
    toast.info("프로젝트 등록은 추후에 추가될 예정입니다.");
  };

  return (
    <S.RegisterProjectButton type="button" onClick={handleClick}>
      프로젝트 등록
    </S.RegisterProjectButton>
  );
}

export default RegisterProjectButton;
