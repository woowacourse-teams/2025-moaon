import { getDistributedToasts } from "../store/toastActions";
import { useToast } from "./useToast";

export function useDistributedToasts() {
  const { toasts, defaultPosition, maxVisibleToasts } = useToast();
  const { filteredToasts, pendingQueue } = getDistributedToasts({ toasts, defaultPosition, maxVisibleToasts: limit });

  return {
    maxVisibleToasts,
    filteredToasts,
    pendingQueue,
    allToasts: toasts,
    defaultPosition: defaultPosition,
  };
}
