import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useIsMounted } from "./useIsMounted";

interface TabAnimationParams {
  selectedIndex: number;
  duration: number;
}

export const useTabAnimation = ({
  selectedIndex,
  duration,
}: TabAnimationParams) => {
  const elementRefs = useRef<(HTMLElement | null)[]>([]);
  const [selectedStyle, setSelectedStyle] = useState({
    translateX: 0,
    width: 0,
    duration: 0,
  });
  const isMounted = useIsMounted();

  useLayoutEffect(() => {
    const targetRef = elementRefs.current[selectedIndex];
    if (!targetRef) {
      return;
    }

    const { offsetLeft, clientWidth } = targetRef;

    setSelectedStyle({
      translateX: offsetLeft,
      width: clientWidth,
      duration: isMounted() ? duration : 0,
    });
  }, [selectedIndex, duration, isMounted]);

  const setTabElementsRef = useCallback(
    (element: HTMLElement | null, index: number) => {
      if (!element) {
        return;
      }

      elementRefs.current[index] = element;

      return () => {
        elementRefs.current[index] = null;
      };
    },
    []
  );

  return { setTabElementsRef, selectedStyle };
};
