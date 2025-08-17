import { getDistributedToasts } from "../store/toastActions";
import { useToast } from "./useToast";

export function useDistributedToasts() {
  const { toasts, defaultPosition, limit } = useToast();
  const { filteredToasts, pendingQueue } = getDistributedToasts({ toasts, defaultPosition, limit });

  return {
    limit,
    filteredToasts,
    pendingQueue,
    allToasts: toasts,
    defaultPosition: defaultPosition,
  };
}
