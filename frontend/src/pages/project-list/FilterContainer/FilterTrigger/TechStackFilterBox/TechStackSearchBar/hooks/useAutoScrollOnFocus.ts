import { type RefObject, useEffect } from "react";

interface UseAutoScrollOnFocusParams {
  focusIndex: number;
  itemRefs: RefObject<(HTMLElement | null)[]>;
  options?: ScrollIntoViewOptions;
}

export const useAutoScrollOnFocus = ({
  focusIndex,
  itemRefs,
  options = { block: "nearest", behavior: "smooth" },
}: UseAutoScrollOnFocusParams) => {
  useEffect(() => {
    if (focusIndex < 0) {
      return;
    }

    if (!itemRefs.current) {
      return;
    }

    itemRefs.current[focusIndex]?.scrollIntoView(options);
  }, [focusIndex, itemRefs, options]);
};
