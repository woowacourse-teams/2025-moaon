import styled from "@emotion/styled";

export const TagText = styled.span<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? "#ffffff" : "#555555")};
`;

export const TagBox = styled.li<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? "#007bff" : "#f2f4f6")};
  border-radius: 1.5rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;

  &:hover {
    ${({ isSelected }) => !isSelected && "background-color: #49a0fcff;"}

    & > ${TagText} {
      color: #fff;
    }
  }
`;
