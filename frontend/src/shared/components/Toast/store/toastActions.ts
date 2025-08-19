import { TOAST_DEFAULT_DURATION_MS, TOAST_DEFAULT_TYPE, TOAST_MILLISECONDS_IN_SECOND, TOAST_MIN_DURATION_MS } from "../constants/toast.constants";
import type { ToastData, ToastDataWithLimit, ToastOptions } from "../types/toast.type";
import { toastStore } from "./toastStore";

export const getDistributedToasts = ({ toasts, limit }: ToastDataWithLimit) => {
  const activeToasts = toasts.slice(0, limit);

  return { filteredToasts: activeToasts };
};

export const showToast = (options: ToastOptions) => {
  const { type = TOAST_DEFAULT_TYPE, duration = TOAST_DEFAULT_DURATION_MS, message } = options;

  const id = crypto.randomUUID();
  const toast: ToastData = {
    id,
    message,
    type,
    duration,
    createdAt: Date.now(),
  };

  if (duration < TOAST_MIN_DURATION_MS) {
    throw new Error(`토스트 팝업은 최소 ${TOAST_MIN_DURATION_MS / TOAST_MILLISECONDS_IN_SECOND}초 이상 유지되어야 합니다.`);
  }

  const currentState = toastStore.getState();

  const isDuplicate = currentState.some((current) => current.message === message && current.type === type);

  if (isDuplicate) {
    return id;
  }

  toastStore.setState([...currentState, toast]);

  return id;
};

export const removeToast = (id: string) => {
  const currentState = toastStore.getState();
  const updatedToasts = currentState.filter((t) => t.id !== id);

  toastStore.setState(updatedToasts);
};

export const updateToast = (id: string, updates: Partial<ToastData>) => {
  const currentState = toastStore.getState();
  const updatedToasts = currentState.map((toast) => (toast.id === id ? { ...toast, ...updates } : toast));

  toastStore.setState(updatedToasts);
};

export const clearAllToasts = () => {
  toastStore.setState([]);
};
