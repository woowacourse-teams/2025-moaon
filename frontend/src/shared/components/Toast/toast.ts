import { showToast } from "./store/toastActions";
import type { ToastCustomOptions } from "./types/toast.type";

export { useDistributedToasts, useToast } from "./hooks/useToast";

export { toastStore } from "./store/toastStore";

export const toast = {
  success: (message: string, options?: ToastCustomOptions) =>
    showToast({ message, type: "success", ...options }),

  error: (message: string, options?: ToastCustomOptions) =>
    showToast({ message, type: "error", ...options }),

  warning: (message: string, options?: ToastCustomOptions) =>
    showToast({ message, type: "warning", ...options }),

  info: (message: string, options?: ToastCustomOptions) =>
    showToast({ message, type: "info", ...options }),
} as const;
