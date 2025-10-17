import ArrowIcon from "@shared/components/ArrowIcon/ArrowIcon";
import Modal from "@shared/components/Modal/Modal";
import { useOverlay } from "@shared/hooks/useOverlay";
import { useSwipe } from "@shared/hooks/useSwipe";
import { useEffect, useState } from "react";
import * as S from "./Carousel.styled";
import { useArrowKey } from "./hooks/useArrowKey";
import { useSlide } from "./hooks/useSlide";

const MOBILE_BREAKPOINT = 480;

function Carousel({ imageUrls }: { imageUrls: string[] }) {
  const { currentImageIndex, handleSlidePrev, handleSlideNext, goToIndex } =
    useSlide({
      imageUrls,
    });
  useArrowKey({ handlePrev: handleSlidePrev, handleNext: handleSlideNext });

  const swipeHandlers = useSwipe({
    onSwipedLeft: handleSlideNext,
    onSwipedRight: handleSlidePrev,
  });

  const imageModal = useOverlay();

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    imageModal.open();
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    imageModal.close();
  };

  const getImagePosition = (index: number) => {
    const nextIndex = (currentImageIndex + 1) % imageUrls.length;
    const prevIndex =
      (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;

    if (index === currentImageIndex) return "current";
    if (index === nextIndex) return "next";
    if (index === prevIndex) return "prev";
    return "hidden";
  };

  const [isMobileLike, setIsMobileLike] = useState<boolean>(() =>
    typeof window === "undefined"
      ? false
      : window.innerWidth <= MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const onResize = () =>
      setIsMobileLike(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <S.CarouselContainer {...swipeHandlers}>
      {imageUrls.map((image, index) => {
        const imagePosition = getImagePosition(index);

        return (
          <S.Image
            key={image}
            src={image}
            alt={`슬라이드 ${index + 1}`}
            position={imagePosition}
            noTransition={imagePosition === "hidden"}
            isSingleImage={imageUrls.length === 1}
            onClick={() => handleImageClick(index)}
          />
        );
      })}

      {imageUrls.length > 1 && isMobileLike ? (
        <S.Indicators>
          {imageUrls.map((url, index) => (
            <S.Indicator
              key={`indicator-${url}`}
              $active={index === currentImageIndex}
              onClick={() => goToIndex(index)}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </S.Indicators>
      ) : (
        <>
          <S.PrevButton onClick={handleSlidePrev}>
            <ArrowIcon direction="left" />
          </S.PrevButton>
          <S.NextButton onClick={handleSlideNext}>
            <ArrowIcon direction="right" />
          </S.NextButton>
        </>
      )}

      <Modal isOpen={imageModal.isOpen} onClose={handleCloseModal}>
        {selectedImageIndex !== null && (
          <S.ModalImage src={imageUrls[selectedImageIndex]} alt="" />
        )}
      </Modal>
    </S.CarouselContainer>
  );
}

export default Carousel;
