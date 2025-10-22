import styled from "@emotion/styled";

export const CharacterCount = styled.div<{ isError: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: ${({ isError }) => (isError ? "#ef4444" : "#6b7280")};
`;

export const CountText = styled.span`
  margin-left: auto;
`;
