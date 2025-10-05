import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const CarouselContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const CardsWrapper = styled.ul`
  padding: 0.25rem 0;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CardItem = styled.div`
  flex: 0 0 calc((100% - 3rem) / 4);
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const NavButton = styled.button<{ direction: "left" | "right" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  border: 1px solid #d2d2d2;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  user-select: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ direction }) => (direction === "left" ? "-1.5rem" : "auto")};
  right: ${({ direction }) => (direction === "right" ? "-1.5rem" : "auto")};
  animation: ${fadeIn} 0.5s ease-in-out;
`;
