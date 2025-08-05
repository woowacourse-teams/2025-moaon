import styled from "@emotion/styled";

export const TagBox = styled.li`
  background-color: #f2f4f6;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #007bff;

    & > .tag-text {
      color: #fff;
    }
  }
`;

export const TagText = styled.span`
  color: #555555;
`;
