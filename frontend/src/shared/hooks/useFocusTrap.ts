import { type RefObject, useEffect, useRef } from "react";
import { useKeyDown } from "./useKeyDown/useKeyDown";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface UseFocusTrapProps {
  ref: RefObject<HTMLElement | null>;
  active: boolean;
}

export const useFocusTrap = ({ ref, active }: UseFocusTrapProps) => {
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    lastFocusedElement.current = document.activeElement as HTMLElement;
    const element = ref.current;

    const focusable = element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      element.setAttribute("tabindex", "-1");
      element.focus();
    }

    return () => {
      lastFocusedElement.current?.focus();
    };
  }, [active, ref]);

  useKeyDown({
    Tab: (e) => {
      if (!active || !ref.current) return;

      const focusable =
        ref.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
  });
};
