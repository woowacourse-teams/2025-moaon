import {
  DEFAULT_DURATION_MS,
  MILLISECONDS_IN_SECOND,
  TOAST_ICONS,
} from "../../constants/toast.constants";
import type { ToastData } from "../../types/toast.type";
import * as S from "./ToastItem.styled";

interface ToastItemProps {
  toast: ToastData;
  onRemove: (id: string) => void;
}

export function ToastItem({ toast, onRemove }: ToastItemProps) {
  const { type, duration, message, id } = toast;

  return (
    <S.ToastItem
      type={type}
      duration={
        duration
          ? duration / MILLISECONDS_IN_SECOND
          : DEFAULT_DURATION_MS / MILLISECONDS_IN_SECOND
      }
      onClick={() => onRemove(id)}
    >
      <S.ToastIcon src={TOAST_ICONS[type]} />
      <S.ToastMessage>{message}</S.ToastMessage>
    </S.ToastItem>
  );
}
