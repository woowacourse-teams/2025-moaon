import styled from "@emotion/styled";
import { BP_480, BP_768, BP_1024, BP_1280 } from "@/styles/global.styled";

export const CarouselContainer = styled.div`
  width: 100%;
  height: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  margin: 2rem 0;

  ${BP_1024} {
    height: 20rem;
    gap: 1rem;
  }

  ${BP_768} {
    height: 16rem;
    margin: 1.5rem 0 2rem;
  }

  ${BP_480} {
    height: 12rem;
    margin: 1rem 0 1.5rem;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  border: 2px solid #ddd;
  background-color: #fff;
  object-fit: contain;

  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

export const Image = styled(CarouselImage)``;

export const ImageWrapper = styled.div<{
  position: "current" | "next" | "prev" | "hidden";
  isSingleImage: boolean;
  noTransition?: boolean;
}>`
  position: absolute;
  cursor: pointer;
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

        ${BP_1280} {
          width: 90vw;
          height: 100%;
          transform: translateX(0);
        }
      `;
      case "next":
        return `
        width: 27.5rem;
        height: 15.5rem;
        opacity: 0.5;
        transform: translateX(23rem);
        z-index: 1;

        ${BP_1280} {
          display: none;
        }
      `;
      case "prev":
        return `
        width: 27.5rem;
        height: 15.5rem;
        opacity: 0.5;
        transform: translateX(-12.5rem);
        z-index: 0;

        ${BP_1280} {
          display: none;
        }
      `;
      case "hidden":
        return `
        width: 27.5rem;
        height: 15.5rem;
        opacity: 0;
        transform: translateX(43.75rem);
        z-index: -1;

        ${BP_1280} {
          display: none;
        }
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
  transition: all 0.2s ease;

  &:hover {
    background-color: #a9a9a9;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  ${BP_768} {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
    background-color: rgba(217, 217, 217, 0.9);
  }

  ${BP_480} {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1rem;
  }
`;

export const NextButton = styled(MoveButton)`
  right: 0;

  ${BP_768} {
    right: 0.5rem;
  }

  ${BP_480} {
    right: 0.25rem;
  }
`;

export const PrevButton = styled(MoveButton)`
  left: 0;

  ${BP_768} {
    left: 0.5rem;
  }

  ${BP_480} {
    left: 0.25rem;
  }
`;

export const ModalImage = styled.img`
  max-width: min(80dvw, 1200px);
  max-height: 80dvh;
  min-width: 25dvw;
  min-height: 25dvw;
  object-fit: contain;

  ${BP_768} {
    max-width: 90dvw;
    max-height: 85dvh;
    min-width: auto;
    min-height: auto;
  }

  ${BP_480} {
    max-width: 95dvw;
    max-height: 90dvh;
  }
`;

export const Indicators = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;

  ${BP_1280} {
    bottom: -2rem;
    gap: 0.35rem;
  }
`;

export const Indicator = styled.button<{ $active: boolean }>`
  width: 0.6rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 1px solid #007bff;
  background: ${({ $active }) => ($active ? "#007bff" : "#fff")};
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    transform: scale(1.2);
  }
`;
