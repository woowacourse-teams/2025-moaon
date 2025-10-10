import { useFocusTrap } from "@shared/hooks/useFocusTrap";
import { useKeyDown } from "@shared/hooks/useKeyDown/useKeyDown";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";
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

  const setOutsideClickRef = useOutsideClick(onClose);

  if (!isOpen) return null;

  const modalContent = (
    <S.Overlay>
      <S.Content
        ref={(el) => {
          contentRef.current = el;
          setOutsideClickRef(el);
        }}
      >
        {children}
      </S.Content>
    </S.Overlay>
  );

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(modalContent, modalRoot);
}

export default Modal;
