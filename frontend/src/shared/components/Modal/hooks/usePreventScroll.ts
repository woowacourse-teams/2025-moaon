import { useEffect } from "react";

export function usePreventScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}
