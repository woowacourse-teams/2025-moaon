export type ToastType = "success" | "error" | "warning" | "info";

export type ToastPosition = "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  createdAt: number;
}

export interface ToastStyleOptions {
  duration?: number;
}

export interface ToastOptions extends ToastStyleOptions {
  message: string;
  type?: ToastType;
}

export interface ToastDataWithLimit {
  toasts: ToastData[];
  limit: number;
}
