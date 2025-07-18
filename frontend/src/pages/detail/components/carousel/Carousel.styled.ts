import styled from "@emotion/styled";

export const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  position: relative;
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

const MoveButton = styled.button`
  position: absolute;
  top: 50%;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  background-color: #6a6a6aff;
  color: #fff;
  
  &:hover {
    background-color: #1f1f1fff;
  }
`;

export const NextButton = styled(MoveButton)`
  right: 3.125rem;
`;

export const PrevButton = styled(MoveButton)`
  left: 3.125rem;
`;
