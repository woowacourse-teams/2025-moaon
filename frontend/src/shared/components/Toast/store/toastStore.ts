import { DEFAULT_POSITION, TOAST_LIMIT } from "../constants/toast.constants";
import type { ToastsState } from "../types/toast.type";
import { createStore } from "./createStore";

export const toastStore = createStore<ToastsState>({
  toasts: [],
  defaultPosition: DEFAULT_POSITION,
  limit: TOAST_LIMIT,
});
