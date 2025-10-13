import { useCallback, useState } from "react";

interface OverlayController {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const useOverlay = (): OverlayController => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, open, close };
};
