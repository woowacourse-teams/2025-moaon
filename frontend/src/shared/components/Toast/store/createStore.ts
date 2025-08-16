type StoreSubscriber<T> = (state: T) => void;

export interface Store<T> {
  getState: () => T;
  setState: (value: T | ((prev: T) => T)) => void;
  subscribe: (callback: StoreSubscriber<T>) => () => void;
}

export const createStore = <T>(initialState: T): Store<T> => {
  let state = initialState;
  const listeners = new Set<StoreSubscriber<T>>();

  return {
    getState: () => state,
    setState: (value) => {
      state = value instanceof Function ? value(state) : value;
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
  };
};
