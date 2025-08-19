import type { ToastData, ToastsState } from "../types/toast.type";

type StoreSubscriber = (state: ToastsState) => void;

export interface Store {
  getState: () => ToastsState;
  setState: (value: ToastData[]) => void;
  subscribe: (callback: StoreSubscriber) => () => void;
}

export const createStore = (initialState: ToastsState): Store => {
  let state = initialState;
  const listeners = new Set<StoreSubscriber>();

  return {
    getState: () => state,
    setState: (value) => {
      state = { ...state, toasts: value };
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
  };
};
