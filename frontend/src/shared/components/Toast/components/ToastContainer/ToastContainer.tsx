import { TOAST_DEFAULT_POSITION } from "../../constants/toast.constants";
import { useDistributedToasts } from "../../hooks/useDistributedToasts";
import { ToastItem } from "../ToastItem/ToastItem";
import * as S from "./ToastContainer.styled";

export const ToastContainer = () => {
  const { filteredToasts } = useDistributedToasts();

  return (
    <S.ToastContainer position={TOAST_DEFAULT_POSITION}>
      {filteredToasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </S.ToastContainer>
  );
};
