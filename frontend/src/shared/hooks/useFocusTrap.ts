import { type RefObject, useEffect, useRef } from "react";
import { useKeyDown } from "./useKeyDown/useKeyDown";

interface UseFocusTrapProps {
  ref: RefObject<HTMLElement | null>;
  active: boolean;
}

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const isFocusable = (el: HTMLElement) =>
  !el.hasAttribute("disabled") &&
  el.getAttribute("aria-hidden") !== "true" &&
  el.tabIndex !== -1 &&
  el.offsetParent !== null;

const getFocusableElements = (container: HTMLElement) => {
  const nodes = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  );
  const visible = nodes.filter(isFocusable);

  const radioGroups = new Set<string>();
  const filtered: HTMLElement[] = [];

  for (const el of visible) {
    if (el.tagName === "INPUT" && (el as HTMLInputElement).type === "radio") {
      const name = (el as HTMLInputElement).name;
      if (name && radioGroups.has(name)) continue;
      if (name) radioGroups.add(name);
    }
    filtered.push(el);
  }

  return filtered;
};

export const useFocusTrap = ({ ref, active }: UseFocusTrapProps) => {
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    lastFocusedElement.current = document.activeElement as HTMLElement;
    const container = ref.current;
    const focusable = getFocusableElements(container);

    (focusable[0] || container).focus();

    return () => {
      lastFocusedElement.current?.focus();
    };
  }, [active, ref]);

  useKeyDown({
    Tab: (e) => {
      if (!active || !ref.current) return;

      const container = ref.current;
      const focusable = getFocusableElements(container);

      if (focusable.length <= 1) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;

      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    },
  });
};
