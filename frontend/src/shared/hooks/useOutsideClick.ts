import { useEffect, useRef } from "react";

export const useOutsideClick = (callback: () => void) => {
  const elementSetRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    const handleDocumentClick = ({ target }: MouseEvent) => {
      const elements = Array.from(elementSetRef.current);

      const isOutsideClick = elements.every(
        (element) => !element.contains(target as Node)
      );

      if (isOutsideClick && elements.length > 0) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [callback]);

  return (element: HTMLElement | null) => {
    if (!element) {
      return;
    }

    elementSetRef.current.add(element);

    return () => {
      elementSetRef.current.delete(element);
    };
  };
};
