import { useKeyDown } from "@shared/hooks/useKeyDown/useKeyDown";
import { type PropsWithChildren, useEffect } from "react";
import * as S from "./Modal.styled";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function Modal({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) {
  useKeyDown({
    Escape: () => {
      onClose();
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Content onClick={(e) => e.stopPropagation()}>{children}</S.Content>
    </S.Overlay>
  );
}

export default Modal;
