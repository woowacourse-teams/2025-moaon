import { useState } from "react";
import * as S from "./AnimationPlayer.styled";

interface Animation {
  src: string;
  translateY: number;
}

export default function AnimationPlayer() {
  const [animation, setAnimation] = useState<Animation>({
    src: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/ball.json",
    translateY: -50,
  });

  const handleAnimationEnd = () => {
    setAnimation({
      src: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/gift-box.json",
      translateY: 0,
    });
  };

  return (
    <S.AnimationPlayer
      autoplay
      loop={false}
      keepLastFrame={true}
      src={animation.src}
      translateY={animation.translateY}
      onEvent={(event) => {
        if (event === "complete") {
          handleAnimationEnd();
        }
      }}
    />
  );
}
