import { TOAST_DEFAULT_DURATION_MS, TOAST_DEFAULT_TYPE, TOAST_MIN_DURATION_MS } from "../constants/toast.constants";
import type { ToastData, ToastOptions, ToastPosition, ToastsState } from "../types/toast.type";
import { toastStore } from "./toastStore";

export const getDistributedToasts = (state: ToastsState) => {
  const { toasts, defaultPosition, limit } = state;
  const pendingQueue: ToastData[] = [];
  const activeToasts: ToastData[] = [];
  const count: Partial<Record<ToastPosition, number>> = {};

  toasts.forEach((toast) => {
    const position = toast.position || defaultPosition;
    count[position] = count[position] || 0;
    count[position] += 1;

    if (count[position] <= limit) {
      activeToasts.push(toast);
    } else {
      pendingQueue.push(toast);
    }
  });

  return { filteredToasts: activeToasts, pendingQueue };
};

export const showToast = (options: ToastOptions) => {
  const { type = TOAST_DEFAULT_TYPE, duration = TOAST_DEFAULT_DURATION_MS, message, position } = options;

  const id = crypto.randomUUID();
  const toast: ToastData = {
    id,
    message,
    type,
    position,
    duration,
    createdAt: Date.now(),
  };

  if (duration < TOAST_MIN_DURATION_MS) {
    throw new Error("토스트 팝업은 최소 1초 이상 유지되어야 합니다.");
  }

  const currentState = toastStore.getState();

  const isDuplicate = currentState.toasts.some((current) => current.message === message && current.type === type);

  if (isDuplicate) {
    return id;
  }

  toastStore.setState({
    ...currentState,
    toasts: [...currentState.toasts, toast],
  });

  setTimeout(() => removeToast(id), duration);

  return id;
};

export const removeToast = (id: string) => {
  const currentState = toastStore.getState();
  const updatedToasts = currentState.toasts.filter((t) => t.id !== id);

  toastStore.setState({
    ...currentState,
    toasts: updatedToasts,
  });
};

export const updateToast = (id: string, updates: Partial<ToastData>) => {
  const currentState = toastStore.getState();
  const updatedToasts = currentState.toasts.map((toast) => (toast.id === id ? { ...toast, ...updates } : toast));

  toastStore.setState({
    ...currentState,
    toasts: updatedToasts,
  });
};

export const clearAllToasts = () => {
  toastStore.setState({
    ...toastStore.getState(),
    toasts: [],
  });
};
