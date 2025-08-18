export type ToastType = "success" | "error" | "warning" | "info";

export type ToastPosition = "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  position?: ToastPosition;
  duration?: number;
  createdAt: number;
}

export interface ToastsState {
  toasts: ToastData[];
  defaultPosition: ToastPosition;
  maxVisibleToasts: number;
}

export interface ToastStyleOptions {
  position?: ToastPosition;
  duration?: number;
}

export interface ToastOptions extends ToastStyleOptions {
  message: string;
  type?: ToastType;
}
