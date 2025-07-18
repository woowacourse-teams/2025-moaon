import styled from "@emotion/styled";

export const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem
`;

export const CurrentImage = styled.img`
  width: 45rem;
  height: 25rem;
  border-radius: 25px;
  background-color: black;
  object-fit: contain;
`;

export const NextImage = styled.img`
  width: 27.5rem;
  height: 15.5rem;
  border-radius: 25px;
  background-color: black;
  object-fit: contain;
  opacity: 0.5;
`;
