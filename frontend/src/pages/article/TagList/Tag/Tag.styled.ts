import styled from "@emotion/styled";

export const TagBox = styled.li<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? "#007bff" : "#f2f4f6")};
  border-radius: 1.5rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #007bff;

    & > .tag-text {
      color: #fff;
    }
  }
`;

export const TagText = styled.span<{ isSelected: boolean }>`
  font-size: 0.875rem;
  color: ${({ isSelected }) => (isSelected ? "#ffffff" : "#555555")};
`;
