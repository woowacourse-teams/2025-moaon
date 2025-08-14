import { useEffect } from "react";
import type { KeyboardEventKey } from "./useKeyDown.type";

type KeyEventHandler = Partial<
  Record<KeyboardEventKey, (event: KeyboardEvent) => void>
>;

export const useKeyDown = (keyEventsHandler: KeyEventHandler) => {
  useEffect(() => {
    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      const key = event.key as KeyboardEventKey;
      const eventHandler = keyEventsHandler[key];

      if (eventHandler) {
        eventHandler(event);
      }
    };

    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [keyEventsHandler]);
};
