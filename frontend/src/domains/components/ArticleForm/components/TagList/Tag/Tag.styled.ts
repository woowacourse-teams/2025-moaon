import styled from "@emotion/styled";

export const Tag = styled.li`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 16px;
  overflow: hidden;
`;

export const TagButton = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: ${({ isActive }) => (isActive ? "#007BFF" : "transparent")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#000")};
`;
