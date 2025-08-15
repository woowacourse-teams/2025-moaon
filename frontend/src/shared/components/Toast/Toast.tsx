import {
  clearAllToasts,
  hideToast,
  showToast,
  updateToast,
} from "./store/toastActions";
import type { ToastOptions } from "./types/toast.type";

export { useDistributedToasts, useToast } from "./hooks/useToast";

export { toastStore } from "./store/toastStore";

export const toast = {
  success: (
    message: string,
    options?: Omit<ToastOptions, "message" | "type">,
  ) => showToast({ message, type: "success", ...options }),

  error: (message: string, options?: Omit<ToastOptions, "message" | "type">) =>
    showToast({ message, type: "error", ...options }),

  warning: (
    message: string,
    options?: Omit<ToastOptions, "message" | "type">,
  ) => showToast({ message, type: "warning", ...options }),

  info: (message: string, options?: Omit<ToastOptions, "message" | "type">) =>
    showToast({ message, type: "info", ...options }),

  show: showToast,
  hide: hideToast,
  update: updateToast,
  clear: clearAllToasts,
} as const;
