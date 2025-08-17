import { DEFAULT_DURATION_MS, DEFAULT_TYPE } from "../constants/toast.constants";
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
  const { type = DEFAULT_TYPE, duration = DEFAULT_DURATION_MS, message, position } = options;

  const id = crypto.randomUUID();
  const toast: ToastData = {
    id,
    message,
    type,
    position,
    duration,
    createdAt: Date.now(),
  };

  const currentState = toastStore.getState();

  const isDuplicate = currentState.toasts.some((current) => current.message === message && current.type === type);

  if (isDuplicate) {
    return id;
  }

  toastStore.setState({
    ...currentState,
    toasts: [...currentState.toasts, toast],
  });

  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }

  return id;
};

export const removeToast = (id: string) => {
  const currentState = toastStore.getState();
  const updatedToasts = currentState.toasts.filter((t) => t.id !== id);

  toastStore.setState({
    ...currentState,
    toasts: updatedToasts,
  });

  processQueue();
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

const processQueue = () => {
  const state = toastStore.getState();
  const { pendingQueue } = getDistributedToasts(state);

  if (pendingQueue.length > 0) {
    const { message, type, position, duration } = pendingQueue[0];
    setTimeout(() => {
      showToast({
        message,
        type,
        position,
        duration,
      });
    }, 10000);
  }
};
