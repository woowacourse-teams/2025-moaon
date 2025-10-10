import { useCallback, useState } from "react";

interface OverlayController<T = void> {
  open: (data?: T) => void;
  close: () => void;
  isOpen: boolean;
  data: T | null;
}

export function useOverlay<T = void>(): OverlayController<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback((overlayData?: T) => {
    setIsOpen(true);
    if (overlayData !== undefined) {
      setData(overlayData);
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return { isOpen, open, close, data };
}
