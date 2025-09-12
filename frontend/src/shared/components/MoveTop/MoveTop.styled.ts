import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface MoveTopButtonProps {
  isVisible: boolean;
}

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const MoveTopButton = styled.button<MoveTopButtonProps>`
  display: flex;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 5;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  padding-bottom: 0.25rem;
  border-radius: 50%;
  border: 1.5px solid #e4e4e4;
  background-color: #fff;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.85)"};
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    animation: ${bounceAnimation} 1.2s ease-in-out infinite;
    background-color: #f9f9f9;
  }
`;

export const MoveTopIcon = styled.img`
  width: 1.5rem;
  height: 1.4rem;
  margin-top: 0.2rem;
`;
