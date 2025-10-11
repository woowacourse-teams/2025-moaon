import { useFocusTrap } from "@shared/hooks/useFocusTrap";
import { useKeyDown } from "@shared/hooks/useKeyDown/useKeyDown";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import { type PropsWithChildren, useId, useRef } from "react";
import ReactDOM from "react-dom";
import { usePreventScroll } from "./hooks/usePreventScroll";
import * as S from "./Modal.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleId?: string;
  descriptionId?: string;
}

function Modal({
  isOpen,
  onClose,
  children,
  titleId,
  descriptionId,
}: PropsWithChildren<ModalProps>) {
  useKeyDown({ Escape: onClose });
  usePreventScroll(isOpen);

  const contentRef = useRef<HTMLDivElement>(null);
  useFocusTrap({ ref: contentRef, active: isOpen });

  const setOutsideClickRef = useOutsideClick(onClose);

  const generatedTitleId = useId();
  const generatedDescriptionId = useId();

  if (!isOpen) return null;

  const modalContent = (
    <S.Overlay role="presentation">
      <S.Content
        ref={(el) => {
          contentRef.current = el;
          setOutsideClickRef(el);
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId ?? generatedTitleId}
        aria-describedby={descriptionId ?? generatedDescriptionId}
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
