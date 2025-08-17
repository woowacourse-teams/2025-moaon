import { useCallback } from "react";
import {
  DEFAULT_DURATION_MS,
  MILLISECONDS_IN_SECOND,
  TOAST_ICONS,
} from "../../constants/toast.constants";
import { hideToast } from "../../store/toastActions";
import type { ToastData } from "../../types/toast.type";
import * as S from "./ToastItem.styled";

interface ToastItemProps {
  toast: ToastData;
}

export function ToastItem({ toast }: ToastItemProps) {
  const { duration: customDuration, type, message, id } = toast;
  const duration = customDuration ?? DEFAULT_DURATION_MS;

  const handleRemoveToast = useCallback((id: string) => {
    hideToast(id);
  }, []);

  return (
    <S.ToastItem
      type={type}
      duration={duration / MILLISECONDS_IN_SECOND}
      onClick={() => handleRemoveToast(id)}
    >
      <S.ToastIcon src={TOAST_ICONS[type]} />
      <S.ToastMessage>{message}</S.ToastMessage>
    </S.ToastItem>
  );
}
