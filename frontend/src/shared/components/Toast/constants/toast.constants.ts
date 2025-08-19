import errorIcon from "@assets/icons/error.svg";
import infoIcon from "@assets/icons/info.svg";
import successIcon from "@assets/icons/successful.svg";
import warningIcon from "@assets/icons/warning.svg";

export const TOAST_DEFAULT_TYPE = "info";
export const TOAST_DEFAULT_POSITION = "bottom-center";
export const TOAST_DEFAULT_DURATION_MS = 4000;
export const TOAST_MIN_DURATION_MS = 1000;
export const TOAST_LIMIT = 3;
export const TOAST_ICONS = {
  success: successIcon,
  error: errorIcon,
  warning: warningIcon,
  info: infoIcon,
} as const;
export const TOAST_MILLISECONDS_IN_SECOND = 1000;
