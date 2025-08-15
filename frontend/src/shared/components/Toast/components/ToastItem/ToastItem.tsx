import errorIcon from "@assets/icons/error-icon.svg";
import infoIcon from "@assets/icons/info-icon.svg";
import successIcon from "@assets/icons/successful-icon.svg";
import warningIcon from "@assets/icons/warning-icon.svg";
import type { ToastData } from "../../types/toast.type";
import * as S from "./ToastItem.styled";

interface ToastItemProps {
  toast: ToastData;
  onRemove: (id: string) => void;
}

export function ToastItem({ toast, onRemove }: ToastItemProps) {
  const { type, duration, message, id } = toast;

  const getIcon = () => {
    switch (type) {
      case "success":
        return successIcon;
      case "error":
        return errorIcon;
      case "warning":
        return warningIcon;
      default:
        return infoIcon;
    }
  };

  return (
    <S.ToastItem
      type={type}
      duration={duration ? duration / 1000 : 4}
      onClick={() => onRemove(id)}
    >
      <S.ToastIcon src={getIcon()} />
      <S.ToastMessage>{message}</S.ToastMessage>
    </S.ToastItem>
  );
}
