import styled from "@emotion/styled";

export const CarouselContainer = styled.div`
  width: 100%;
  height: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  padding-bottom: 3rem;
  border-bottom: 1px solid #d4d4d4;
`;

const CarouselImage = styled.img`
  border-radius: 25px;
  background-color: black;
  object-fit: contain;

  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

export const Image = styled(CarouselImage)<{
  position: "current" | "next" | "prev" | "hidden";
  isSingleImage: boolean;
  noTransition?: boolean;
}>`
  position: absolute;
  transition: ${({ noTransition }) =>
    noTransition ? "none" : "all 0.5s ease-in-out"};

  ${({ position, isSingleImage }) => {
    switch (position) {
      case "current":
        return `
        width: 43.75rem;
        height: 23.75rem;
        opacity: 1;
        transform: translateX(${isSingleImage ? "0" : "-15rem"});
        z-index: 1;
      `;
      case "next":
        return `
        width: 27.5rem;
        height: 15.5rem;
        opacity: 0.5;
        transform: translateX(23rem);
        z-index: 1;
      `;
      case "prev":
        return `
        width: 27.5rem;
        height: 15.5rem;
        opacity: 0.5;
        transform: translateX(-12.5rem);
        z-index: 0;
      `;
      case "hidden":
        return `
        width: 27.5rem;
        height: 15.5rem;
        opacity: 0;
        transform: translateX(43.75rem);
        z-index: -1;
      `;
    }
  }}
`;

const MoveButton = styled.button`
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.875rem;
  height: 1.875rem;
  font-size: 1.5rem;
  background-color: #d9d9d9;
  color: #636b76;
  z-index: 5;

  &:hover {
    background-color: #a9a9a9;
  }
`;

export const NextButton = styled(MoveButton)`
  right: 0;
`;

export const PrevButton = styled(MoveButton)`
  left: 0;
`;
