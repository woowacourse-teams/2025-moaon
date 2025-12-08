import * as S from "./AnimationPlayer.styled";

export default function AnimationPlayer() {
  return (
    <S.AnimationPlayer
      autoplay
      keepLastFrame
      src={`${process.env.S3_BASE_URL}/wooteco-event/checked.json`}
      translateY={5}
    />
  );
}
