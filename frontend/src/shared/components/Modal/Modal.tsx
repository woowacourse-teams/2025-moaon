import { useFocusTrap } from "@shared/hooks/useFocusTrap";
import { useKeyDown } from "@shared/hooks/useKeyDown/useKeyDown";
import { type PropsWithChildren, useRef } from "react";
import ReactDOM from "react-dom";
import { usePreventScroll } from "./hooks/usePreventScroll";
import * as S from "./Modal.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) {
  useKeyDown({ Escape: onClose });
  usePreventScroll(isOpen);

  const contentRef = useRef<HTMLDivElement>(null);
  useFocusTrap({ ref: contentRef, active: isOpen });

  if (!isOpen) return null;

  const modalContent = (
    <S.Overlay onClick={onClose}>
      <S.Content ref={contentRef} onClick={(e) => e.stopPropagation()}>
        {children}
      </S.Content>
    </S.Overlay>
  );

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(modalContent, modalRoot);
}

export default Modal;
