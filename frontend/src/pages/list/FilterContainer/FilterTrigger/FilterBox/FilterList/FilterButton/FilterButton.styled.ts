import styled from "@emotion/styled";

export const Button = styled.button<{ isSelected: boolean }>`
  display: flex;
  background-color: ${({ isSelected }) => (isSelected ? "#e0f7fa" : "#fff")};
  border-radius: 30px;
`;
