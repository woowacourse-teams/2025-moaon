import { useEffect, useState } from "react";

interface UseCarouselButtonVisible {
  currentIndex: number;
  maxIndex: number;
  isCarouselScrollable: boolean;
}

export const useCarouselButtonVisible = ({
  currentIndex,
  maxIndex,
  isCarouselScrollable,
}: UseCarouselButtonVisible) => {
  const [buttonVisible, setButtonVisible] = useState({
    prev: false,
    next: true,
  });

  useEffect(() => {
    if (!isCarouselScrollable) {
      setButtonVisible({
        prev: false,
        next: false,
      });
      return;
    }

    if (currentIndex === 0) {
      setButtonVisible({
        prev: false,
        next: true,
      });
      return;
    }

    if (currentIndex === maxIndex) {
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
  }, [currentIndex, maxIndex, isCarouselScrollable]);

  return { buttonVisible };
};
