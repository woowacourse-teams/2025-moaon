import type { ToastData, ToastOptions, ToastsState } from "../types/toast.type";
import { toastStore } from "./toastStore";

let toastIdCounter = 0;
const generateId = () => `toast-${++toastIdCounter}-${Date.now()}`;

const getDistributedToasts = (state: ToastsState) => {
  const { toasts, defaultPosition, limit } = state;
  const queue: ToastData[] = [];
  const activeToasts: ToastData[] = [];
  const count: Record<string, number> = {};

  toasts.forEach((toast) => {
    const position = toast.position || defaultPosition;
    count[position] = count[position] || 0;
    count[position] += 1;

    if (count[position] <= limit) {
      activeToasts.push(toast);
    } else {
      queue.push(toast);
    }
  });

  return { filteredToasts: activeToasts, queue };
};

export const showToast = (options: ToastOptions) => {
  const { message, type = "info", position, duration = 4000 } = options;

  const id = generateId();
  const toast: ToastData = {
    id,
    message,
    type,
    position,
    duration,
    createdAt: Date.now(),
  };

  const currentState = toastStore.getState();

  const isDuplicate = currentState.toasts.some((t) => t.message === message && t.type === type);

  if (isDuplicate) return id;

  toastStore.setState({
    ...currentState,
    toasts: [...currentState.toasts, toast],
  });

  if (duration > 0) {
    setTimeout(() => hideToast(id), duration);
  }

  return id;
};

export const hideToast = (id: string) => {
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
  const { queue } = getDistributedToasts(state);

  if (queue.length > 0) {
    const nextToast = queue[0];
    setTimeout(() => {
      showToast({
        message: nextToast.message,
        type: nextToast.type,
        position: nextToast.position,
        duration: nextToast.duration,
      });
    }, 100);
  }
};

export { getDistributedToasts };
