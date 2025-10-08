import * as S from "./MotionLogoLoading.styled";

interface MotionLogoLoadingProps {
  company: "toss" | "line";
  onLoadingComplete: () => void;
}

function MotionLogoLoading({
  company,
  onLoadingComplete,
}: MotionLogoLoadingProps) {
  return (
    <S.Container>
      <S.Video onEnded={onLoadingComplete} muted autoPlay>
        <source
          src={`https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/${company}-motion.mp4`}
          type="video/mp4"
        />
      </S.Video>
    </S.Container>
  );
}

export default MotionLogoLoading;
