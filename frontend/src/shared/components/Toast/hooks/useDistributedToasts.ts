import { getDistributedToasts } from "../store/toastActions";
import { useToast } from "./useToast";

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
