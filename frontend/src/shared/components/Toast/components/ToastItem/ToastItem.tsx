import { useCallback, useEffect } from "react";
import {
  TOAST_DEFAULT_DURATION_MS,
  TOAST_ICONS,
  TOAST_MILLISECONDS_IN_SECOND,
} from "../../constants/toast.constants";
import { removeToast } from "../../store/toastActions";
import type { ToastData } from "../../types/toast.type";
import * as S from "./ToastItem.styled";

interface ToastItemProps {
  toast: ToastData;
}

export function ToastItem({ toast }: ToastItemProps) {
  const { duration: customDuration, type, message, id } = toast;
  const duration = customDuration ?? TOAST_DEFAULT_DURATION_MS;

  const handleRemoveToast = useCallback((id: string) => {
    removeToast(id);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration]);

  return (
    <S.ToastItem
      type={type}
      duration={duration / TOAST_MILLISECONDS_IN_SECOND}
      onClick={() => handleRemoveToast(id)}
    >
      <S.ToastIcon src={TOAST_ICONS[type]} />
      <S.ToastMessage>{message}</S.ToastMessage>
    </S.ToastItem>
  );
}
