import styled from "@emotion/styled";

export const TagText = styled.span<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? "#ffffff" : "#555555")};
`;

export const TagBox = styled.li<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? "#007bff" : "#f2f4f6")};
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #007bff;

    & > ${TagText} {
      color: #fff;
    }
  }
`;
