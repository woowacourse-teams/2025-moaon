import { type KeyboardEvent, useState } from "react";

interface KeyboardHandlerCallbacks {
  onArrowUp: () => void;
  onArrowDown: () => void;
  onEnter: () => void;
}

interface KeyboardNavigationParams {
  handlers: KeyboardHandlerCallbacks;
  maxIndex: number;
}

export const useListKeyboardNavigation = ({
  handlers,
  maxIndex,
}: KeyboardNavigationParams) => {
  const { onArrowUp, onArrowDown, onEnter } = handlers;
  const [keyboardFocusIndex, setKeyboardFocusIndex] = useState(-1);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.code) {
      case "ArrowUp": {
        if (keyboardFocusIndex === 0) {
          onArrowUp();
          setKeyboardFocusIndex(-1);
          return;
        }

        setKeyboardFocusIndex((prev) => Math.max(prev - 1, 0));
        break;
      }

      case "ArrowDown": {
        onArrowDown();

        if (keyboardFocusIndex === maxIndex) {
          setKeyboardFocusIndex(0);
          return;
        }

        setKeyboardFocusIndex((prev) => Math.min(prev + 1, maxIndex));
        break;
      }

      case "Enter": {
        if (keyboardFocusIndex < 0) {
          return;
        }

        onEnter();
        break;
      }
    }
  };

  return { onKeyDown, focusIndex: keyboardFocusIndex };
};
