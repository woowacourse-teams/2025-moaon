import { useEffect } from "react";

export const usePreventScroll = (active: boolean) => {
  useEffect(() => {
    if (!active) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [active]);
};
