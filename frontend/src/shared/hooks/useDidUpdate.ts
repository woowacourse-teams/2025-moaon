import { type DependencyList, type EffectCallback, useEffect } from "react";
import { useIsMountedRef } from "./useIsMountedRef";
import { usePreservedCallback } from "./usePreservedCallback";

export const useDidUpdate = (effect: EffectCallback, deps: DependencyList) => {
  const mountedRef = useIsMountedRef();
  const effectCallback = usePreservedCallback(effect);

  useEffect(() => {
    if (!mountedRef.isMounted) {
      return;
    }

    return effectCallback();
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, deps);
};
