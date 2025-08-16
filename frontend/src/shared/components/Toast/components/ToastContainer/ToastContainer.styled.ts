import styled from "@emotion/styled";
import type { ToastPosition } from "../../types/toast.type";

const TOAST_POSITION_STYLES = {
  "top-left": {
    top: "1rem",
    left: "1rem",
  },
  "top-right": {
    top: "1rem",
    right: "1rem",
  },
  "top-center": {
    top: "1rem",
    left: "50%",
    transform: "translateX(-50%)",
  },
  "bottom-left": {
    bottom: "1rem",
    left: "1rem",
  },
  "bottom-right": {
    bottom: "1rem",
    right: "1rem",
  },
  "bottom-center": {
    bottom: "5rem",
    left: "50%",
    transform: "translateX(-50%)",
  },
} as const;

export const ToastContainer = styled.div<{ position: ToastPosition }>`
  position: fixed;
  z-index: 1002;
  max-width: 20rem;
  ${({ position }) => TOAST_POSITION_STYLES[position]};
`;
