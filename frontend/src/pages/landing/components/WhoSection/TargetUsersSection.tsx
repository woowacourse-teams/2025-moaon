import * as S from "./TargetUsersSection.styled";

function TargetUsersSection() {
  return (
    <S.TargetUsersSection aria-label="Target users Section">
      <S.Inner>
        <S.Badge>누구에게 필요한 서비스일까요?</S.Badge>
        <S.SubCopy>
          취준생, 주니어 개발자, 그리고 실무자까지.
          <br />
          관심 있는 주제의 프로젝트를 찾고,
          <br />
          자신의 고민에 대한 해답을 얻을 수 있어요.
        </S.SubCopy>
        <S.Emphasis>
          인기 프로젝트, 최신 프로젝트, 기술 스택 동향까지
          <br />
          <S.Kicker>탐색을 넘어, 개발 생태계의 흐름</S.Kicker>을 읽을 수 있어요.
        </S.Emphasis>
      </S.Inner>
    </S.TargetUsersSection>
  );
}

export default TargetUsersSection;
