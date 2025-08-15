import type { ToastsState } from "../types/toast.type";
import { createStore } from "./createStore";

export const toastStore = createStore<ToastsState>({
  toasts: [],
  defaultPosition: "bottom-center",
  limit: 3,
});
