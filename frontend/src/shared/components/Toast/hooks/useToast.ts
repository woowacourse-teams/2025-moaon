import { useSyncExternalStore } from "react";
import { toastStore } from "../store/toastStore";

export function useToast() {
  return useSyncExternalStore(
    toastStore.subscribe,
    () => toastStore.getState(),
    () => toastStore.getState()
  );
}
