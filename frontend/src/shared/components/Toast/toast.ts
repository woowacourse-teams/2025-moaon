import { showToast } from "./store/toastActions";
import type { ToastCustomOptions } from "./types/toast.type";

export { useDistributedToasts, useToast } from "./hooks/useToast";

export { toastStore } from "./store/toastStore";

export const toast = {
  success: (message: string, options?: ToastCustomOptions) => showToast({ type: "success", message, ...options }),

  error: (message: string, options?: ToastCustomOptions) => showToast({ type: "error", message, ...options }),

  warning: (message: string, options?: ToastCustomOptions) => showToast({ type: "warning", message, ...options }),

  info: (message: string, options?: ToastCustomOptions) => showToast({ type: "info", message, ...options }),
} as const;
