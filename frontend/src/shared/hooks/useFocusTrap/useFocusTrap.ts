import { type RefCallback, useCallback } from "react";
import { scopeTab } from "./scopeTab";
import { FOCUS_SELECTOR, focusable, tabbable } from "./tabbable";

const focusNode = (node: HTMLElement) => {
  let focusElement: HTMLElement | null = node.querySelector("[data-autofocus]");

  if (!focusElement) {
    const children = Array.from<HTMLElement>(
      node.querySelectorAll(FOCUS_SELECTOR),
    );

    focusElement = children.find(tabbable) ?? children.find(focusable) ?? null;

    if (!focusElement && focusable(node)) {
      focusElement = node;
    }
  }

  if (focusElement) {
    focusElement.focus({ preventScroll: true });
  }
};

export const useFocusTrap = (
  active = true,
): RefCallback<HTMLElement | null> => {
  return useCallback(
    (node: HTMLElement | null) => {
      if (!active) {
        return;
      }

      if (node === null) {
        return;
      }

      setTimeout(() => {
        if (node.getRootNode()) {
          focusNode(node);
        }
      });

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Tab") {
          scopeTab(node, event);
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [active],
  );
};
