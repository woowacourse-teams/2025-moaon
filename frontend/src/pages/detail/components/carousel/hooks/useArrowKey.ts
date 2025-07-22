import { useEffect } from "react";

interface useArrowKeyProps {
  handlePrev: () => void;
  handleNext: () => void;
}

export const useArrowKey = ({ handlePrev, handleNext }: useArrowKeyProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);
};
