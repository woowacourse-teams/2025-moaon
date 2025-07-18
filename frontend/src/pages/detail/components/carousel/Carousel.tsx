import * as S from "./Carousel.styled";

function Carousel() {
  const images = [
    "https://picsum.photos/id/237/800/600",
    "https://picsum.photos/id/238/800/600",
    "https://picsum.photos/id/239/800/600",
    "https://picsum.photos/id/240/800/600",
    "https://picsum.photos/id/241/800/600",
  ];

  return (
    <S.CarouselContainer>
      <S.CurrentImage src={images[0]} alt="img" />
      <S.NextImage src={images[1]} alt="img" />
    </S.CarouselContainer>
  );
}

export default Carousel;
