import { type MouseEvent, useEffect, useRef, useState } from "react";

export const useProjectCardCarousel = () => {
  const carouselRef = useRef<HTMLElement>(null);
  const [buttonVisible, setButtonVisible] = useState({
    prev: false,
    next: true,
  });
  const xDown = useRef(0);
  const xUp = useRef(0);

  useEffect(() => {
    if (!carouselRef.current) {
      return;
    }

    const { scrollWidth, clientWidth } = carouselRef.current;
    const isContentFullyVisible = scrollWidth <= clientWidth;
    if (isContentFullyVisible) {
      setButtonVisible({
        prev: false,
        next: false,
      });
    }
  }, []);

  const handleScroll = () => {
    if (!carouselRef.current) {
      return;
    }
    console.log("a");
    const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;

    const maxScrollLeft = scrollWidth - clientWidth; // 최대 스크롤 위치
    const isStart = scrollLeft === 0;
    const isEnd = scrollLeft >= maxScrollLeft - 10;

    if (isStart) {
      setButtonVisible({
        prev: false,
        next: true,
      });
      return;
    }

    if (isEnd) {
      setButtonVisible({
        prev: true,
        next: false,
      });
      return;
    }

    setButtonVisible({
      prev: true,
      next: true,
    });
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleMove = () => {
    const xDiff = xDown.current - xUp.current;
    if (xDiff === 0 || !carouselRef.current) {
      return;
    }

    if (xDiff > 0) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
      return;
    }

    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: "smooth",
    });

    xDown.current = 0;
    xUp.current = 0;
  };

  const handleMouseDown = (e: MouseEvent) => {
    xDown.current = e.clientX;
  };

  const handleMouseUp = (e: MouseEvent) => {
    xUp.current = e.clientX;
    handleMove();
  };

  return {
    buttonVisible,
    carouselRef,
    scrollPrev,
    scrollNext,
    handleScroll,
    handleMouseDown,
    handleMouseUp,
  };
};
