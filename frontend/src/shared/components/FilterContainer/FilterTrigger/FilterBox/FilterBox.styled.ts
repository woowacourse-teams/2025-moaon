import styled from "@emotion/styled";

export const Container = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 3.125rem;
  left: 0;
  z-index: 998;
  min-width: 34.375rem;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.09);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  border: 1px solid #afafaf;

  animation: ${({ isOpen }) => (isOpen ? "dropdown-down" : "dropdown-up")} 0.3s
    cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @keyframes dropdown-down {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes dropdown-up {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-30px);
    }
  }
  @media screen and (max-width: 768px) {
    min-width: 22rem;
    padding: 1.25rem;
    gap: 1.25rem;
  }
  @media screen and (max-width: 480px) {
    left: 50%;
    transform: translateX(-50%);
    min-width: calc(100vw - 2rem);
    padding: 1rem;
    gap: 1rem;
    top: 2.75rem;
  }
`;

export const Wrap = styled.div``;

export const FilterResetButton = styled.button`
  font-size: 1rem;
  font-weight: 700;
  width: 3.125rem;
  color: #3f3f3f;
  position: relative;

  &:disabled {
    color: #bdbdbd;
    cursor: not-allowed;
  }
`;
