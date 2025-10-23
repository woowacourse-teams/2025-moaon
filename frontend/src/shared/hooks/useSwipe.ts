import { useCallback, useRef } from "react";

interface SwipeHandlers {
  onSwipedLeft?: () => void;
  onSwipedRight?: () => void;
  onSwipedUp?: () => void;
  onSwipedDown?: () => void;
}

interface SwipeResult {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

const MIN_SWIPE_DISTANCE = 50;

export const useSwipe = (handlers: SwipeHandlers): SwipeResult => {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;

    const distanceX = touchStart.current.x - touchEnd.current.x;
    const distanceY = touchStart.current.y - touchEnd.current.y;

    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (distanceX > MIN_SWIPE_DISTANCE) {
        handlers.onSwipedLeft?.();
      } else if (distanceX < -MIN_SWIPE_DISTANCE) {
        handlers.onSwipedRight?.();
      }
    } else {
      if (distanceY > MIN_SWIPE_DISTANCE) {
        handlers.onSwipedUp?.();
      } else if (distanceY < -MIN_SWIPE_DISTANCE) {
        handlers.onSwipedDown?.();
      }
    }

    touchStart.current = null;
    touchEnd.current = null;
  }, [handlers]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
