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

    node.playbackRate = 2;
  };

  return (
    <S.Container>
      <S.Video onEnded={onLoadingComplete} muted autoPlay ref={ref}>
        <source
          src={`${process.env.S3_BASE_URL}/wooteco-event/${company}-motion.mp4`}
          type="video/mp4"
        />
      </S.Video>
    </S.Container>
  );
}

export default MotionLogoLoading;
