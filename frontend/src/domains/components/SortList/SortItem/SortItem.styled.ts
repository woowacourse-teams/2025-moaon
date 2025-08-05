import styled from "@emotion/styled";

export const Item = styled.li``;

export const Button = styled.button<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? "#000" : "#aaa")};
  font-size: 1.125rem;
`;
