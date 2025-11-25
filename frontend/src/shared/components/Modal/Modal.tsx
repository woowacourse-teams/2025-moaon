import CloseButtonIcon from "@shared/components/CloseButtonIcon/CloseButtonIcon";
import { useFocusReturn } from "@shared/hooks/useFocusReturn";
import { useFocusTrap } from "@shared/hooks/useFocusTrap/useFocusTrap";
import { useKeyDown } from "@shared/hooks/useKeyDown/useKeyDown";
import { useOutsideClick } from "@shared/hooks/useOutsideClick";
import { mergeRefs } from "@shared/utils/mergeRefs";
import { type PropsWithChildren, useId } from "react";
import { createPortal } from "react-dom";
import { usePreventScroll } from "./hooks/usePreventScroll";
import * as S from "./Modal.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  variant?: "default" | "image";
  disableCloseOnOverlayClick?: boolean;
}

function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  showCloseButton = false,
  variant = "default",
  disableCloseOnOverlayClick = false,
}: PropsWithChildren<ModalProps>) {
  const returnFocus = useFocusReturn({ opened: isOpen });
  const closeModal = () => {
    onClose();
    returnFocus();
  };

  useKeyDown({
    Escape: () => {
      if (!disableCloseOnOverlayClick) {
        closeModal();
      }
    },
  });
  const setOutsideClickRef = useOutsideClick(() => {
    if (!disableCloseOnOverlayClick) {
      closeModal();
    }
  });

  usePreventScroll(isOpen);
  const modalRef = useFocusTrap(isOpen);

  const titleId = useId();
  const descriptionId = useId();

  if (!isOpen) return null;

  const modalContent = (
    <S.Overlay role="presentation">
      <S.Content
        ref={mergeRefs(modalRef, setOutsideClickRef)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        variant={variant}
      >
        {showCloseButton && (
          <S.CloseButtonWrapper>
            <CloseButtonIcon onClick={closeModal} iconSize={16} />
          </S.CloseButtonWrapper>
        )}
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
