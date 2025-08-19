import { useDistributedToasts } from "../../hooks/useDistributedToasts";
import type { ToastPosition } from "../../types/toast.type";
import { ToastItem } from "../ToastItem/ToastItem";
import * as S from "./ToastContainer.styled";

export interface ToastContainerProps {
  position: ToastPosition;
  limit: number;
}

export const ToastContainer = ({ position, limit }: ToastContainerProps) => {
  const filteredToasts = useDistributedToasts(limit);

  return (
    <S.ToastContainer position={position}>
      {filteredToasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </S.ToastContainer>
  );
};
