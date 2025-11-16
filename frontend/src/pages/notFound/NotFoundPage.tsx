import * as S from "./NotFoundPage.styled";

function NotFoundPage() {
  return (
    <S.Main>
      <S.Container>
        <S.ErrorCode>404</S.ErrorCode>
        <S.Title>페이지를 찾을 수 없습니다</S.Title>
        <S.Description>
          찾으시는 페이지가 더 이상 존재하지 않거나,
          <br />
          이동되었을 수 있습니다.
        </S.Description>
        <S.ButtonContainer>
          <S.HomeButton type="button" to="/">
            홈으로 돌아가기
          </S.HomeButton>
        </S.ButtonContainer>
      </S.Container>
    </S.Main>
  );
}

export default NotFoundPage;
