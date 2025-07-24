import styled from "@emotion/styled";

export const List = styled.ul`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export const Item = styled.li``;

export const Button = styled.button<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? "#000" : "#aaa")};
  font-size: 1.125rem;
`;

export const Separator = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #aaa;
`;
