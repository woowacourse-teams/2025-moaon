import GoogleLoginButton from "../Header/GoogleLoginButton/GoogleLoginButton";
import Modal from "../Modal/Modal";
import * as S from "./LoginModal.styled";

function LoginModal({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={close} showCloseButton={true}>
      <S.LoginModalContainer>
        <S.LoginModalTitle>
          모아온 로그인 후<br />
          프로젝트를 등록해보세요!
        </S.LoginModalTitle>
        <S.LoginModalInfo>
          <S.LoginModalInfoLine />
          <S.LoginModalInfoText>SNS 계정으로 간편로그인</S.LoginModalInfoText>
          <S.LoginModalInfoLine />
        </S.LoginModalInfo>
        <GoogleLoginButton />
      </S.LoginModalContainer>
    </Modal>
  );
}

export default LoginModal;
