import { useCallback, useEffect, useRef } from "react";

export function usePreservedCallback<
  Arguments extends any[] = any[],
  ReturnValue = unknown,
>(callback: (...args: Arguments) => ReturnValue) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: Arguments) => {
    return callbackRef.current(...args);
  }, []);
}
