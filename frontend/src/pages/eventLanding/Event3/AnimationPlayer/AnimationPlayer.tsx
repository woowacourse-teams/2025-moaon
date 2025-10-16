import type { Player } from "@lottiefiles/react-lottie-player";
import { useRef, useState } from "react";
import * as S from "./AnimationPlayer.styled";

interface Animation {
  src: string;
  translateY: number;
}

const INITIAL_ANIMATION: Animation = {
  src: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/ball.json",
  translateY: -50,
};

export default function AnimationPlayer() {
  const [animation, setAnimation] = useState<Animation>(INITIAL_ANIMATION);
  const playerRef = useRef<Player>(null);

  const handleAnimationEnd = () => {
    if (animation.src === INITIAL_ANIMATION.src) {
      setAnimation({
        src: "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/gift-box.json",
        translateY: 0,
      });
      return;
    }

    playerRef.current?.pause();
  };

  const ref = (node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playerRef.current?.setSeeker(0);
          playerRef.current?.play();
        } else {
          playerRef.current?.stop();
          setAnimation(INITIAL_ANIMATION);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  };

  return (
    <div ref={ref}>
      <S.AnimationPlayer
        ref={playerRef}
        autoplay={true}
        keepLastFrame={true}
        src={animation.src}
        translateY={animation.translateY}
        onEvent={(event) => {
          if (event === "complete") {
            handleAnimationEnd();
          }
        }}
      />
    </div>
  );
}
