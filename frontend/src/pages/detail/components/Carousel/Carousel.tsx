import ArrowIcon from "@shared/components/ArrowIcon/ArrowIcon";
import * as S from "./Carousel.styled";
import { useArrowKey } from "./hooks/useArrowKey";
import { useSlide } from "./hooks/useSlide";

function Carousel({ imageUrls }: { imageUrls: string[] }) {
  const { currentImageIndex, handleSlidePrev, handleSlideNext } = useSlide({
    imageUrls,
  });
  useArrowKey({ handlePrev: handleSlidePrev, handleNext: handleSlideNext });

  const getImagePosition = (index: number) => {
    const nextIndex = (currentImageIndex + 1) % imageUrls.length;
    const prevIndex =
      (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;

    if (index === currentImageIndex) return "current";
    if (index === nextIndex) return "next";
    if (index === prevIndex) return "prev";
    return "hidden";
  };

  return (
    <S.CarouselContainer>
      {imageUrls.map((image, index) => {
        const imagePosition = getImagePosition(index);

        return (
          <S.Image
            key={image}
            src={image}
            alt={`슬라이드 ${index + 1}`}
            position={imagePosition}
            noTransition={imagePosition === "hidden"}
            length={imageUrls.length}
          />
        );
      })}
      {imageUrls.length > 1 && (
        <>
          <S.PrevButton onClick={handleSlidePrev}>
            <ArrowIcon direction="right" />
          </S.PrevButton>
          <S.NextButton onClick={handleSlideNext}>
            <ArrowIcon direction="left" />
          </S.NextButton>
        </>
      )}
    </S.CarouselContainer>
  );
}

export default Carousel;
