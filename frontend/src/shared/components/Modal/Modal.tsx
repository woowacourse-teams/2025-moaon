import { useKeyDown } from "@shared/hooks/useKeyDown/useKeyDown";
import type { PropsWithChildren } from "react";
import * as S from "./Modal.styled";

type ModalProps = {
  onClose: () => void;
};

function Modal({ onClose, children }: PropsWithChildren<ModalProps>) {
  useKeyDown({
    Escape: () => {
      onClose();
    },
  });

  return (
    <S.Overlay onClick={onClose}>
      <S.Content onClick={(e) => e.stopPropagation()}>{children}</S.Content>
    </S.Overlay>
  );
}

export default Modal;
