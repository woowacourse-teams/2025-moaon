import { showToast } from "./store/toastActions";
import type { ToastStyleOptions } from "./types/toast.type";

export const toast = {
  success: (message: string, options?: ToastStyleOptions) => showToast({ type: "success", message, ...options }),

  error: (message: string, options?: ToastStyleOptions) => showToast({ type: "error", message, ...options }),

  warning: (message: string, options?: ToastStyleOptions) => showToast({ type: "warning", message, ...options }),

  info: (message: string, options?: ToastStyleOptions) => showToast({ type: "info", message, ...options }),
} as const;
