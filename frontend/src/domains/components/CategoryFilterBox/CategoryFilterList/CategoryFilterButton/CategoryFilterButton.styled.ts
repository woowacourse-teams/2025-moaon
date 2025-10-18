import styled from "@emotion/styled";

export const Button = styled.button<{ isSelected: boolean }>`
  display: flex;
  background-color: ${({ isSelected }) => (isSelected ? "#007BFF" : "#F4F4F4")};
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#000")};
  border-radius: 16px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
`;
