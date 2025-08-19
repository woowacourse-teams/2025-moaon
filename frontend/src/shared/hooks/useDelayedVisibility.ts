import { useCallback, useEffect, useRef, useState } from "react";

interface UseDelayedVisibilityOptions {
  delayMs?: number;
}

const useDelayedVisibility = (
  isActive: boolean,
  options?: UseDelayedVisibilityOptions
) => {
  const { delayMs = 300 } = options ?? {};
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isActive) {
      setVisible(false);
      return clearTimer;
    }

    if (timerRef.current != null) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      setVisible(true);
      timerRef.current = null;
    }, delayMs);

    return clearTimer;
  }, [isActive, delayMs, clearTimer]);

  return visible;
};

export default useDelayedVisibility;
