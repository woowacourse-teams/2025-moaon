import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import type { ToastType } from "../../types/toast.type";

const TOAST_TYPE_STYLES = {
  success: {
    backgroundColor: "#f0fdf4",
    color: "#166534",
  },
  error: {
    backgroundColor: "#fef2f2",
    color: "#bb4141ff",
  },
  warning: {
    backgroundColor: "#fffbeb",
    color: "#fe731cff",
  },
  info: {
    backgroundColor: "#eff6ff",
    color: "#1e40af",
  },
} as const;

const progressShrink = keyframes`
  from { width: 100%; }
  to { width: 0%; }
`;

export const ToastItem = styled.div<{ type: ToastType; duration: number }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  transform: scale(1);
  cursor: pointer;
  color: #fff;
  ${({ type }) => TOAST_TYPE_STYLES[type]}

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: currentColor;
    width: 100%;
    animation: ${progressShrink} ${({ duration }) => duration}s linear forwards;
  }
`;

export const ToastIcon = styled.img`
  width: 1.5rem;
`;

export const ToastMessage = styled.span`
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;
