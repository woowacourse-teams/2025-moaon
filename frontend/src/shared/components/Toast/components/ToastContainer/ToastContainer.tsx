import { memo, useCallback } from "react";
import { DEFAULT_POSITION } from "../../constants/toast.constants";
import { useDistributedToasts } from "../../hooks/useToast";
import { hideToast } from "../../store/toastActions";
import type { ToastData, ToastPosition } from "../../types/toast.type";
import { ToastItem } from "../ToastItem/ToastItem";
import * as S from "./ToastContainer.styled";

export const ToastContainer = memo(function ToastContainer() {
  const { filteredToasts } = useDistributedToasts();

  const handleRemove = useCallback((id: string) => {
    hideToast(id);
  }, []);

  const groupedToasts = filteredToasts.reduce(
    (groups: Record<ToastPosition, ToastData[]>, toast: ToastData) => {
      const position = toast.position || DEFAULT_POSITION;
      if (!groups[position]) groups[position] = [];
      groups[position].push(toast);
      return groups;
    },
    {} as Record<ToastPosition, ToastData[]>,
  );

  return (
    <>
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <S.ToastContainer key={position} position={position as ToastPosition}>
          {(positionToasts as ToastData[]).map((toast: ToastData) => (
            <ToastItem key={toast.id} toast={toast} onRemove={handleRemove} />
          ))}
        </S.ToastContainer>
      ))}
    </>
  );
});
