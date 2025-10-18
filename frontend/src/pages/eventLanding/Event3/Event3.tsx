import AnimationPlayer from "./AnimationPlayer/AnimationPlayer";
import * as S from "./Event3.styled";

function Event3() {
  return (
    <>
      <S.Title>모아온 피드백 이벤트</S.Title>
      <S.Description>
        피드백을 작성해시주면 추첨을 통해 10분을 선정하여 <br /> 소정의 상품을
        증정하도록 하겠습니다.
      </S.Description>
      <AnimationPlayer />
      <S.ButtonBox>
        <S.LinkButton to="/event">피드백 하러가기</S.LinkButton>
      </S.ButtonBox>
    </>
  );
}

export default Event3;
