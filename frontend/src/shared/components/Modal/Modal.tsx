import { useFocusTrap } from "@shared/hooks/useFocusTrap";
import { useKeyDown } from "@shared/hooks/useKeyDown/useKeyDown";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import { type PropsWithChildren, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { usePreventScroll } from "./hooks/usePreventScroll";
import * as S from "./Modal.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
}: PropsWithChildren<ModalProps>) {
  useKeyDown({ Escape: onClose });
  usePreventScroll(isOpen);

  const contentRef = useRef<HTMLDivElement>(null);
  useFocusTrap({ ref: contentRef, active: isOpen });

  const setOutsideClickRef = useOutsideClick(onClose);

  const titleId = useId();
  const descriptionId = useId();

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
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
      >
        {title && <S.Title id={titleId}>{title}</S.Title>}
        {description && (
          <S.Description id={descriptionId}>{description}</S.Description>
        )}
        {children}
      </S.Content>
    </S.Overlay>
  );

  const modalRoot = document.querySelector("body");
  if (!modalRoot) return null;

  return createPortal(modalContent, modalRoot);
}

export default Modal;
