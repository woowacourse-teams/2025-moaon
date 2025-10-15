import { useState } from "react";
import * as S from "./LightLogoLoading.styled";

interface LightLogoLoadingProps {
  company: "naver" | "kakao" | "woowa" | "dangn";
  onLoadingComplete: () => void;
}

function LightLogoLoading({
  company,
  onLoadingComplete,
}: LightLogoLoadingProps) {
  const [isFirstAnimating, setIsFirstAnimating] = useState(true);

  if (isFirstAnimating) {
    return (
      <S.Background bgColor="#111">
        <S.ShineBox>
          <S.ShineImage
            src={`https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/${company}-text.svg`}
            alt=""
            onAnimationEnd={() => setIsFirstAnimating(false)}
          />
        </S.ShineBox>
      </S.Background>
    );
  }

  const refCallback = (element: HTMLElement | null) => {
    if (!element || isFirstAnimating) {
      return;
    }

    const animations = element.getAnimations({ subtree: true });

    Promise.all(animations.map((animation) => animation.finished))
      .then(() => onLoadingComplete())
      .catch(() => onLoadingComplete());
  };

  return (
    <S.Background bgColor="#121212">
      <S.LogoBox ref={refCallback}>
        <S.LogoGlow />
        <S.LogoImage
          src={`https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/${company}-3d.svg`}
          alt=""
        />
      </S.LogoBox>
    </S.Background>
  );
}

export default LightLogoLoading;
