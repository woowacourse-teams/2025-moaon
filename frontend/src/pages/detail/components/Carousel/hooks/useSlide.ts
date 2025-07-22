import { useCallback, useState } from "react";

interface useSlideProps {
  images: string[];
}

export const useSlide = ({ images }: useSlideProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSlideNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handleSlidePrev = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  return { currentImageIndex, handleSlideNext, handleSlidePrev };
};
