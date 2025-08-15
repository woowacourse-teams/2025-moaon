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
  limit: number;
}

export interface ToastOptions {
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
}
