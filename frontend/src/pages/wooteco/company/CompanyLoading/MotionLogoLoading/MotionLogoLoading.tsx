import * as S from "./MotionLogoLoading.styled";

interface MotionLogoLoadingProps {
  company: "toss" | "line";
  onLoadingComplete: () => void;
}

function MotionLogoLoading({
  company,
  onLoadingComplete,
}: MotionLogoLoadingProps) {
  const ref = (node: HTMLVideoElement | null) => {
    if (!node) {
      return;
    }

    node.playbackRate = company === "toss" ? 1.75 : 1.5;
  };

  return (
    <S.Container>
      <S.Video onEnded={onLoadingComplete} muted autoPlay ref={ref}>
        <source
          src={`https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/${company}-motion.mp4`}
          type="video/mp4"
        />
      </S.Video>
    </S.Container>
  );
}

export default MotionLogoLoading;
