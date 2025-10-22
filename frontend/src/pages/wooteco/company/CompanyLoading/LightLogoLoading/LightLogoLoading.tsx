import * as S from "./LightLogoLoading.styled";

interface LightLogoLoadingProps {
  company: "naver" | "kakao" | "woowa" | "dangn";
  onLoadingComplete: () => void;
}

function LightLogoLoading({
  company,
  onLoadingComplete,
}: LightLogoLoadingProps) {
  const refCallback = (element: HTMLElement | null) => {
    if (!element) {
      return;
    }

    const animations = element.getAnimations({ subtree: true });
    Promise.all(animations.map((animation) => animation.finished))
      .then(() => onLoadingComplete())
      .catch(() => onLoadingComplete());
  };

  return (
    <S.Background bgColor="#111">
      <S.ShineBox ref={refCallback}>
        <S.ShineImage
          src={`https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/${company}-text.svg`}
          alt=""
        />
      </S.ShineBox>
    </S.Background>
  );
}

export default LightLogoLoading;
