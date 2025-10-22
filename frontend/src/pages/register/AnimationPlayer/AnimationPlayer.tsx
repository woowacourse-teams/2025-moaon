import * as S from "./AnimationPlayer.styled";

export default function AnimationPlayer() {
  return (
    <S.AnimationPlayer
      autoplay
      loop
      keepLastFrame
      src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/checked.json"
      translateY={5}
    />
  );
}
