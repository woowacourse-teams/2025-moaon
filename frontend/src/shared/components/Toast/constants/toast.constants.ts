import errorIcon from "@assets/icons/error-icon.svg";
import infoIcon from "@assets/icons/info-icon.svg";
import successIcon from "@assets/icons/successful-icon.svg";
import warningIcon from "@assets/icons/warning-icon.svg";

export const DEFAULT_TYPE = "info";
export const DEFAULT_POSITION = "bottom-center";
export const DEFAULT_DURATION_MS = 4000;
export const TOAST_LIMIT = 3;
export const TOAST_ICONS = {
  success: successIcon,
  error: errorIcon,
  warning: warningIcon,
  info: infoIcon,
} as const;
export const MILLISECONDS_IN_SECOND = 1000;
