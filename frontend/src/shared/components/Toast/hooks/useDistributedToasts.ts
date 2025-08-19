import { getDistributedToasts } from "../store/toastActions";
import { useToast } from "./useToast";

export function useDistributedToasts(limit: number) {
  const toasts = useToast();
  const { filteredToasts } = getDistributedToasts({ toasts, limit });

  return filteredToasts;
}
