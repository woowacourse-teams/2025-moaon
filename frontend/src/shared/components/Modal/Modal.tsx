import { useFocusTrap } from "@shared/hooks/useFocusTrap";
import { useKeyDown } from "@shared/hooks/useKeyDown/useKeyDown";
import { type PropsWithChildren, useRef } from "react";
import { usePreventScroll } from "./hooks/usePreventScroll";
import * as S from "./Modal.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) {
  const contentRef = useRef<HTMLDivElement>(null);

  useKeyDown({ Escape: onClose });
  usePreventScroll(isOpen);
  useFocusTrap({ ref: contentRef, active: isOpen });

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Content ref={contentRef} onClick={(e) => e.stopPropagation()}>
        {children}
      </S.Content>
    </S.Overlay>
  );
}

export default Modal;
