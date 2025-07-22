import styled from "@emotion/styled";

export const CarouselContainer = styled.div`
  width: 100%;
  height: 31.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  position: relative;
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
  noTransition?: boolean;
}>`
  position: absolute;
  transition: ${({ noTransition }) =>
    noTransition ? "none" : "all 0.5s ease-in-out"};

  ${({ position }) => {
    switch (position) {
      case "current":
        return `
        width: 45rem;
        height: 25rem;
        opacity: 1;
        transform: translateX(-15rem);
        z-index: 1;
      `;
      case "next":
        return `
        width: 27.5rem;
        height: 15.5rem;
        opacity: 0.5;
        transform: translateX(24rem);
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
  width: 3.125rem;
  height: 3.125rem;
  font-size: 1.5rem;
  background-color: #6a6a6aff;
  color: #fff;
  z-index: 999;

  &:hover {
    background-color: #1f1f1fff;
  }
`;

export const NextButton = styled(MoveButton)`
  right: -1.25rem;
`;

export const PrevButton = styled(MoveButton)`
  left: -1.25rem;
`;
