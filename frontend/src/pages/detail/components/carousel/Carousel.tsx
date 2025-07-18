import * as S from "./Carousel.styled";
import { useArrowKey } from "./hooks/useArrowKey";
import { useSlide } from "./hooks/useSlide";

export const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
];

function Carousel() {
  const { currentImageIndex, handleSlidePrev, handleSlideNext } = useSlide({
    images,
  });
  useArrowKey({ handlePrev: handleSlidePrev, handleNext: handleSlideNext });

  return (
    <S.CarouselContainer>
      <S.CurrentImage src={images[currentImageIndex]} alt="img" />
      <S.NextImage
        src={images[(currentImageIndex + 1) % images.length]}
        alt="img"
      />
      <S.PrevButton onClick={handleSlidePrev}>❮</S.PrevButton>
      <S.NextButton onClick={handleSlideNext}>❯</S.NextButton>
    </S.CarouselContainer>
  );
}

export default Carousel;
