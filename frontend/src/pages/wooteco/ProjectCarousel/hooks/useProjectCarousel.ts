import { useRef, useState } from "react";
import { useCarouselButtonVisible } from "./useCarouselButtonVisible";

const calculateSlideWidth = (container: HTMLElement) => {
  if (!container.firstElementChild) {
    return 0;
  }

  const firstSlide = container.firstElementChild as HTMLElement;
  const slideRect = firstSlide.getBoundingClientRect();
  const slideWidth = slideRect?.width ?? 0;

  const style = window.getComputedStyle(container);
  const gapStr =
    style.getPropertyValue("gap") ||
    style.getPropertyValue("column-gap") ||
    "0px";
  const gapPx = parseFloat(gapStr);

  return slideWidth + gapPx;
};

export const useProjectCarousel = (totalSlides: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideWidthRef = useRef(0);
  const maxWidthRef = useRef(0);
  const visibleCountRef = useRef(4);
  const { buttonVisible } = useCarouselButtonVisible({
    currentIndex,
    maxIndex: Math.floor(totalSlides / visibleCountRef.current),
    isCarouselScrollable: totalSlides > visibleCountRef.current,
  });
  const xCoordinate = useRef(0);

  const scrollNext = () => {
    const maxIndex = Math.floor(totalSlides / visibleCountRef.current);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const scrollPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handlePointerDown = (e: PointerEvent) => {
    xCoordinate.current = e.clientX;
  };

  const handlePointerUp = (e: PointerEvent) => {
    const xDiff = xCoordinate.current - e.clientX;

    if (xDiff === 0) {
      return;
    }

    if (xDiff > 0) {
      scrollNext();
      return;
    }

    scrollPrev();

    xCoordinate.current = 0;
  };

  const translateX = Math.max(
    -(slideWidthRef.current * currentIndex * visibleCountRef.current),
    -maxWidthRef.current
  );

  const ref = (node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    const { clientWidth, scrollWidth } = node;
    maxWidthRef.current = scrollWidth - clientWidth;
    slideWidthRef.current = calculateSlideWidth(node);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        if (width >= 1280) {
          visibleCountRef.current = 4;
        } else if (width >= 1024) {
          visibleCountRef.current = 3;
        } else if (width >= 768) {
          visibleCountRef.current = 2;
        } else {
          visibleCountRef.current = 1;
        }

        const maxIndex = Math.floor(totalSlides / visibleCountRef.current);
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
      }
    });

    resizeObserver.observe(node);
    node.addEventListener("pointerdown", handlePointerDown);
    node.addEventListener("pointerup", handlePointerUp);

    return () => {
      resizeObserver.disconnect();
      node.removeEventListener("pointerdown", handlePointerDown);
      node.removeEventListener("pointerup", handlePointerUp);
    };
  };

  return {
    currentIndex,
    scrollNext,
    scrollPrev,
    translateX,
    buttonVisible,
    ref,
  };
};
