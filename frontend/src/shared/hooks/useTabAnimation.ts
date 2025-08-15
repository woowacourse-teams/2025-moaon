import { useCallback, useLayoutEffect, useRef, useState } from "react";

export const useTabAnimation = (selectedIndex: number) => {
  const elementRefs = useRef<(HTMLElement | null)[]>([]);
  const [selectedStyle, setSelectedStyle] = useState({
    translateX: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    const targetRef = elementRefs.current[selectedIndex];
    if (targetRef) {
      const { offsetLeft, clientWidth } = targetRef;
      setSelectedStyle({ translateX: offsetLeft, width: clientWidth });
    }
  }, [selectedIndex]);

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
