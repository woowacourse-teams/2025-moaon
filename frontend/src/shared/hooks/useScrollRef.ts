import { useRef } from "react";
import { usePreservedCallback } from "./usePreservedCallback";

export const useScrollRef = (callback: () => void) => {
  const scrollCallback = usePreservedCallback(callback);
  const ticking = useRef(false);

  return (node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    let rafId: number;

    const handleScroll = () => {
      if (!ticking.current) {
        rafId = window.requestAnimationFrame(() => {
          scrollCallback();
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    node.addEventListener("scroll", handleScroll);

    return () => {
      node.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  };
};
