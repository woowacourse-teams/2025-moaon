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
            src={`${process.env.S3_BASE_URL}/wooteco-event/${company}-text.svg`}
            alt=""
          />
        ) : (
          <S.SecondImage
            onAnimationEnd={onLoadingComplete}
            src={`${process.env.S3_BASE_URL}/wooteco-event/${company}-text.svg`}
            alt=""
          />
        )}
      </S.ShineBox>
    </S.Background>
  );
}

export default LightLogoLoading;
