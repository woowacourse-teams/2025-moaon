import { isInRange } from "@shared/utils/isInRange";
import { useRef, useState } from "react";

interface UseFullPageSlideOptions {
  totalIndex: number;
  threshold?: number;
}

export const useFullPageSlide = ({
  totalIndex,
  threshold = 50,
}: UseFullPageSlideOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSlidingRef = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const goToPage = (page: number) => {
    if (
      isSlidingRef.current ||
      page === currentIndex ||
      !isInRange(page, 0, totalIndex)
    ) {
      return;
    }

    isSlidingRef.current = true;
    setCurrentIndex(page);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (e.deltaY > 0) {
      goToPage(currentIndex + 1);
    } else if (e.deltaY < 0) {
      goToPage(currentIndex - 1);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current) {
      return;
    }

    const distance = touchStartY.current - touchEndY.current;
    const isUpSwipe = distance > threshold;
    const isDownSwipe = distance < -threshold;

    if (isUpSwipe) {
      goToPage(currentIndex + 1);
    } else if (isDownSwipe) {
      goToPage(currentIndex - 1);
    }

    touchStartY.current = null;
    touchEndY.current = null;
  };

  const callbackRef = (node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    node.addEventListener("wheel", handleWheel);
    node.addEventListener("touchstart", handleTouchStart);
    node.addEventListener("touchmove", handleTouchMove);
    node.addEventListener("touchend", handleTouchEnd);

    return () => {
      node.removeEventListener("wheel", handleWheel);
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchmove", handleTouchMove);
      node.removeEventListener("touchend", handleTouchEnd);
    };
  };

  const onSlideEnd = () => {
    isSlidingRef.current = false;
  };

  return {
    currentIndex,
    callbackRef,
    onScrollEnd: onSlideEnd,
    goToPage,
  };
};
