import { useSyncExternalStore } from "react";
import { getDistributedToasts } from "../store/toastActions";
import { toastStore } from "../store/toastStore";

export function useToast() {
  return useSyncExternalStore(
    toastStore.subscribe,
    () => toastStore.getState(),
    () => toastStore.getState()
  );
}

export function useDistributedToasts() {
  const { toasts, defaultPosition, limit } = useToast();
  const { filteredToasts, queue } = getDistributedToasts({ toasts, defaultPosition, limit });

  return {
    allToasts: toasts,
    filteredToasts,
    queue,
    defaultPosition: defaultPosition,
    limit: limit,
  };
}
