import { useFullPageSlide } from "@shared/components/FullPageSlide/useFullPageSlide";
import type { PropsWithChildren } from "react";
import * as S from "./FullPageSlide.styled";

interface FullPageSlideProps {
  totalIndex: number;
  threshold?: number;
  excludedHeight?: number; // 헤더 높이 등 제외할 높이(px)
}

function FullPageSlide({
  totalIndex,
  threshold,
  excludedHeight = 0,
  children,
}: PropsWithChildren<FullPageSlideProps>) {
  const { currentIndex, callbackRef, onScrollEnd } = useFullPageSlide({
    totalIndex,
    threshold,
  });

  return (
    <S.Container ref={callbackRef} excludedHeight={excludedHeight}>
      <S.Wrap currentIndex={currentIndex} onTransitionEnd={onScrollEnd}>
        {children}
      </S.Wrap>
    </S.Container>
  );
}

export default FullPageSlide;
