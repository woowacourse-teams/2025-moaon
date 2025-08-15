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
  const state = useToast();
  const { filteredToasts, queue } = getDistributedToasts(state);

  return {
    allToasts: state.toasts,
    filteredToasts,
    queue,
    defaultPosition: state.defaultPosition,
    limit: state.limit,
  };
}
