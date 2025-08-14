import { useEffect, useRef, useState } from "react";

interface UseDelayedVisibilityOptions {
  delayMs?: number;
}

/**
 * 일정 시간 이상 로딩이 지속될 때만 true를 반환합니다.
 * 짧은 로딩(깜빡임)에서는 스켈레톤/로딩 UI를 노출하지 않기 위함입니다.
 */
function useDelayedVisibility(
  isActive: boolean,
  options?: UseDelayedVisibilityOptions
) {
  const { delayMs = 300 } = options ?? {};
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      if (timerRef.current != null) return;
      timerRef.current = window.setTimeout(() => {
        setVisible(true);
        timerRef.current = null;
      }, delayMs);
    } else {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setVisible(false);
    }

    return () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, delayMs]);

  return visible;
}

export default useDelayedVisibility;
