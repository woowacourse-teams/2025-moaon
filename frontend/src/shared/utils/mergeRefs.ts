import type { Ref, RefCallback } from "react";

type StrictRef<T> = NonNullable<Ref<T>>;
type RefCleanup<T> = ReturnType<RefCallback<T>>;

const assignRef = <T>(ref: StrictRef<T>, value: T | null): RefCleanup<T> => {
  if (typeof ref === "function") {
    return ref(value);
  }

  ref.current = value;
};

export const mergeRefs = <T>(
  ...refs: Array<Ref<T> | undefined>
): RefCallback<T> => {
  const availableRefs = refs.filter((ref) => ref != null);
  const cleanupMap = new Map<StrictRef<T>, Exclude<RefCleanup<T>, void>>();

  return (value) => {
    for (const ref of availableRefs) {
      const cleanup = assignRef(ref, value);
      if (cleanup) {
        cleanupMap.set(ref, cleanup);
      }
    }

    return () => {
      for (const ref of availableRefs) {
        const cleanup = cleanupMap.get(ref);
        if (cleanup && typeof cleanup === "function") {
          cleanup();
          continue;
        }

        assignRef(ref, null);
      }

      cleanupMap.clear();
    };
  };
};
