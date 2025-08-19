import { TOAST_DEFAULT_POSITION, TOAST_LIMIT } from "../constants/toast.constants";
import { createStore } from "./createStore";

export const toastStore = createStore({
  toasts: [],
  defaultPosition: TOAST_DEFAULT_POSITION,
  maxVisibleToasts: TOAST_LIMIT,
});
