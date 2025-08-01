import { useCallback, useState } from "react";

interface useSlideProps {
  imageUrls: string[];
}

export const useSlide = ({ imageUrls }: useSlideProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSlideNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  }, [imageUrls.length]);

  const handleSlidePrev = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + imageUrls.length) % imageUrls.length
    );
  }, [imageUrls.length]);

  return { currentImageIndex, handleSlideNext, handleSlidePrev };
};
