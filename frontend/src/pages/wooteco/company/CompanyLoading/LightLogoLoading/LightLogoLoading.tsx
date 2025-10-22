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
  const [firstLoading, setFirstLoading] = useState(true);

  const firstLoadingEnd = () => {
    setFirstLoading(false);
  };

  return (
    <S.Background bgColor="#111">
      <S.ShineBox>
        {firstLoading ? (
          <S.ShineImage
            onAnimationEnd={firstLoadingEnd}
            src={`https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/${company}-text.svg`}
            alt=""
          />
        ) : (
          <S.SecondImage
            onAnimationEnd={onLoadingComplete}
            src={`https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/${company}-text.svg`}
            alt=""
          />
        )}
      </S.ShineBox>
    </S.Background>
  );
}

export default LightLogoLoading;
