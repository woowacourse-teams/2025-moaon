import styled from "@emotion/styled";

export const Item = styled.li``;

export const Button = styled.button<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? "#000" : "#aaa")};
  font-size: 1.0625rem;
  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.9375rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
`;
