import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { BP_768 } from "@/styles/global.styled";

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const CarouselContainer = styled.div`
  overflow: hidden;
`;

export const Carousel = styled.ul<{ translateX: number }>`
  padding: 0.5rem 0 1.5rem;
  display: flex;
  gap: 1rem;
  transform: translateX(${({ translateX }) => translateX}px);
  transition: transform 0.75s ease;
`;

export const CardItem = styled.div`
  min-width: 292px;
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

  ${BP_768} {
    display: none;
  }
`;
