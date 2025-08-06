import styled from "@emotion/styled";

interface MoveTopButtonProps {
  isVisible: boolean;
}

export const MoveTopButton = styled.button<MoveTopButtonProps>`
  display: flex;
  position: fixed;
  bottom: 2.5rem;
  right: 5rem;
  z-index: 5;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background-color: #d4d4d4;
  gap: 0.25rem;
  padding: 0.3125rem;
  border: none;
  cursor: pointer;

  /* 애니메이션 속성 */
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.9)"};
  transition: all 0.3s ease-in-out;

  :hover {
    background-color: #bdbdbd;
    transform: ${({ isVisible }) =>
      isVisible
        ? "translateY(-2px) scale(1.05)"
        : "translateY(10px) scale(0.9)"};
  }
`;
