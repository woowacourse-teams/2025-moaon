import ArrowIcon from "@shared/components/ArrowIcon/ArrowIcon";
import Modal from "@shared/components/Modal/Modal";
import { useState } from "react";
import * as S from "./Carousel.styled";
import { useArrowKey } from "./hooks/useArrowKey";
import { useSlide } from "./hooks/useSlide";

function Carousel({ imageUrls }: { imageUrls: string[] }) {
  const { currentImageIndex, handleSlidePrev, handleSlideNext } = useSlide({
    imageUrls,
  });
  useArrowKey({ handlePrev: handleSlidePrev, handleNext: handleSlideNext });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

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
            isSingleImage={imageUrls.length === 1}
            onClick={() => openModal(image)}
          />
        );
      })}
      {imageUrls.length > 1 && (
        <>
          <S.PrevButton onClick={handleSlidePrev}>
            <ArrowIcon direction="left" />
          </S.PrevButton>
          <S.NextButton onClick={handleSlideNext}>
            <ArrowIcon direction="right" />
          </S.NextButton>
        </>
      )}

      {selectedImage && (
        <Modal onClose={closeModal}>
          <S.ModalImage src={selectedImage} alt="확대 이미지" />
        </Modal>
      )}
    </S.CarouselContainer>
  );
}

export default Carousel;
